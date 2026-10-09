// Tests the circuit toolkit shipped inside the skill against the generated catalog.
import { describe, expect, test } from "bun:test";
import { join } from "node:path";
import { build, check, decompile, loadData, CircuitError } from "../skills/rustrician/scripts/rustrician.mjs";

const data = loadData(join(import.meta.dir, "..", "skills", "rustrician", "assets"));

const turret = {
  name: "Test",
  components: [
    { id: "solar", type: "solarpanel_large", x: 0, y: 0 },
    { id: "bat", type: "Large Rechargeable Battery", x: 200, y: 0 },
    { id: "branch", type: "branch", x: 400, y: 0, props: { Branch: 10 } },
    { id: "turret", type: "autoturret", x: 600, y: 0 },
  ],
  wires: [
    ["solar.Power Out", "bat.Power In"],
    ["bat.Power Out", "branch.Power In"],
    ["branch.branch out", "turret.Power In"],
  ],
  groups: [{ id: "g", label: "Defense", members: ["branch", "turret"] }],
};

const errorsOf = (spec: unknown): string[] => {
  try {
    build(spec, data);
    return [];
  } catch (e) {
    if (e instanceof CircuitError) return (e as any).errors;
    throw e;
  }
};

describe("build", () => {
  test("produces importable XML that checks clean and round-trips", () => {
    const { xml, warnings } = build(turret, data);
    expect(warnings).toEqual([]);
    expect(xml.startsWith('<mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"')).toBe(true);
    // Every component cell carries attrs, props and craft, which the simulator's import requires.
    expect(xml).toContain('<Object name="Branch" type="int" value="10" minval="1"/>');
    expect(xml.match(/as="props"/g)?.length).toBe(4);
    const r = check(xml, data);
    expect(r.errors).toEqual([]);
    expect(r.stats).toEqual({ components: 4, wires: 3 });
    const spec: any = decompile(xml, data);
    expect(spec.components.map((c: any) => c.type)).toEqual(["solarpanel_large", "battery_large", "branch", "autoturret"]);
    expect(spec.components[2].props).toEqual({ Branch: 10 });
    expect(spec.wires).toHaveLength(3);
    expect(build(spec, data).xml).toBe(xml); // decompile -> build is lossless
  });

  test("group children are positioned relative to the group", () => {
    const { xml } = build(turret, data);
    const group = xml.match(/value="Defense" style="group"[^>]*><mxGeometry x="([-\d.]+)" y="([-\d.]+)"/)!;
    expect(Number(group[1])).toBe(400 - 40);
    expect(xml).toMatch(/value="Electrical Branch"[^>]*parent="2"><mxGeometry x="40" y="40"/);
  });

  test("rejects wiring mistakes with actionable messages", () => {
    const errs = errorsOf({
      components: [
        { id: "a", type: "splitter" },
        { id: "b", type: "simplelight" },
        { id: "c", type: "simplelight" },
        { id: "p", type: "waterpump" },
        { id: "rc", type: "combiner" },
      ],
      wires: [
        ["a.Power Out 1", "b.Power In"],
        ["a.Power Out 2", "b.Power In"], // second wire on one port
        ["b.Power In", "c.Power In"], // input as source
        ["p.Water Output", "c.Power In"], // medium mismatch
        ["a.Nope", "c.Power In"], // unknown port
      ],
    });
    expect(errs.some((e) => e.includes("already has a wire"))).toBe(true);
    expect(errs.some((e) => e.includes("wires go from an output to an input"))).toBe(true);
    expect(errs.some((e) => e.includes("cannot connect water output"))).toBe(true);
    expect(errs.some((e) => e.includes('has no port "Nope"'))).toBe(true);
    // Semantic checks run once the structure is valid.
    const rc = errorsOf({
      components: [
        { id: "g", type: "testgenerator_small" },
        { id: "l", type: "simplelight" },
        { id: "rc", type: "combiner" },
      ],
      wires: [
        ["g.Power Output 1", "l.Power In"],
        ["l.Passthrough", "rc.Power In 1"],
      ],
    });
    expect(rc.some((e) => e.includes("Root Combiner only accepts root power"))).toBe(true);
  });

  test("validates props, types, rotation and ids", () => {
    const errs = errorsOf({
      components: [
        { id: "b", type: "branch", props: { Branch: 0, Bogus: 1 } },
        { id: "t", type: "timer", rotation: 90 },
        { id: "t", type: "nonexistent" },
        { id: "bad id", type: "timer" },
      ],
    });
    expect(errs.some((e) => e.includes('"Branch" must be >= 1'))).toBe(true);
    expect(errs.some((e) => e.includes('unknown property "Bogus"'))).toBe(true);
    expect(errs.some((e) => e.includes("cannot be rotated"))).toBe(true);
    expect(errs.some((e) => e.includes('duplicate id "t"'))).toBe(true);
    expect(errs.some((e) => e.includes("id must be"))).toBe(true);
  });

  test("warns about short loops and Max Depth", () => {
    const loop = build(
      {
        components: [
          { id: "g", type: "testgenerator_small" },
          { id: "or", type: "switch_or" },
          { id: "l", type: "simplelight" },
        ],
        wires: [
          ["g.Power Output 1", "or.Power In 1"],
          ["or.Power Out", "l.Power In"],
          ["l.Passthrough", "or.Power In 2"],
        ],
      },
      data,
    );
    expect(loop.warnings.some((w: string) => w.includes("feedback loop through 2"))).toBe(true);

    const chain = Array.from({ length: 16 }, (_, i) => ({ id: `l${i}`, type: "simplelight" }));
    const deep = build(
      {
        components: [{ id: "g", type: "testgenerator_small" }, ...chain, { id: "s", type: "splitter" }, { id: "rc", type: "combiner" }],
        wires: [
          ["g.Power Output 1", "l0.Power In"],
          ...chain.slice(1).map((c, i) => [`l${i}.Passthrough`, `${c.id}.Power In`]),
          ["l15.Passthrough", "s.Power In"],
          ["s.Power Out 1", "rc.Power In 1"],
        ],
      },
      data,
    );
    expect(deep.warnings.some((w: string) => w.includes("Max Depth"))).toBe(true);
  });

  test("places generic items and escapes text", () => {
    const { xml } = build({ name: "A & B <test>", components: [{ id: "box", type: "item", item: "Large Wood Box" }], notes: [{ text: 'line 1\n"quoted" <b>' }] }, data);
    expect(xml).toContain('style="cmp_item_833533164"');
    expect(xml).toContain('value="line 1&#10;&quot;quoted&quot; &lt;b&gt;"');
    expect(xml).toContain('name="A  B test"'); // simulator's own name filter
    expect(check(xml, data).errors).toEqual([]);
  });
});

describe("check", () => {
  test("flags XML the simulator cannot import", () => {
    const r = check('<mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="2" value="Timer" style="cmp_timer" vertex="1" parent="1"><mxGeometry x="0" y="0" width="64" height="64" as="geometry"/><Object cmpid="timer" as="attrs"/></mxCell></root></mxGraphModel>', data);
    expect(r.errors.some((e: string) => e.includes("missing <Array"))).toBe(true);
    expect(r.errors.some((e: string) => e.includes("no port cells"))).toBe(true);
    expect(check("<html></html>", data).errors[0]).toContain("mxGraphModel");
    expect(check("<mxGraphModel><root>", data).errors[0]).toContain("unclosed");
  });
});
