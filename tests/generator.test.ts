// Tests the generator's pure pieces and the committed skill output.
import { describe, expect, test } from "bun:test";
import { join } from "node:path";
import { fingerprint, normalizeIndex } from "../scripts/sources.ts";
import { extractComponents } from "../scripts/extract.ts";
import { inline } from "../scripts/render.ts";
import { readSkillDir, validateSkill } from "../scripts/validate.ts";

describe("sources", () => {
  test("live Discord counts do not change the fingerprint", () => {
    const base = { handbookHtml: "h", scripts: { "js/app.min.js": "a" }, itemList: "{}" };
    const a = fingerprint({ ...base, indexHtml: "<span>3,823 Online 16,131 Members</span>" });
    const b = fingerprint({ ...base, indexHtml: "<span>4,001 Online 16,200 Members</span>" });
    expect(a.combined).toBe(b.combined);
    expect(fingerprint({ ...base, indexHtml: "<span>changed</span>" }).combined).not.toBe(a.combined);
    expect(normalizeIndex("1 Online")).toBe("N Online");
  });
});

describe("extract", () => {
  test("reads component definitions statically without executing them", () => {
    const js = `var components=[],craftingMap=[{id:"mf",text:"Metal Fragments"}];function initComponents(t){
      ${Array.from({ length: 60 }, (_, i) => `components.push({item:"${i}",name:"C${i}",info:"",tips:[],attrs:{cmpid:"c${i}",rotatable:1},funcs:[{func:function(){throw 1}}],ports:[{label:"Power In",type:"in",consumable:!0,x:-.15,y:.4}],props:[],craft:{mf:75},consume:f,cat:"electrical"});`).join("")}
      components.push({attrs:{cmpid:"item_"+b.id}});}`;
    const { components, craftingNames } = extractComponents(js);
    expect(components).toHaveLength(60);
    expect(components[0]!.ports[0]).toEqual({ label: "Power In", type: "in", consumable: true, x: -0.15, y: 0.4 });
    expect(craftingNames).toEqual({ mf: "Metal Fragments" });
  });
});

describe("render", () => {
  test("converts handbook inline HTML to markdown", () => {
    expect(inline('<strong>Bold</strong> &amp; <em>it</em> <a href="https://x.io">link</a>')).toBe("**Bold** & *it* [link](https://x.io)");
    expect(inline('<span style="color:red">a</span>&#x27;b')).toBe("a'b");
  });
});

describe("committed skill", () => {
  test("is valid per the Agent Skills spec and has no broken links", () => {
    const dir = join(import.meta.dir, "..", "skills", "rustrician");
    expect(validateSkill("rustrician", readSkillDir(dir))).toEqual([]);
  });

  test("validator catches spec violations", () => {
    const md = (fm: string) => new Map([["SKILL.md", `---\n${fm}\n---\n# x\n[a](missing.md)\n`]]);
    const errs = validateSkill("rustrician", md("name: Rust--x\ndescription: ''\nfoo: 1"));
    expect(errs.some((e) => e.includes("unexpected frontmatter fields: foo"))).toBe(true);
    expect(errs.some((e) => e.includes("lowercase"))).toBe(true);
    expect(errs.some((e) => e.includes("must match directory"))).toBe(true);
    expect(errs.some((e) => e.includes("description"))).toBe(true);
    expect(errs.some((e) => e.includes("broken link"))).toBe(true);
  });
});
