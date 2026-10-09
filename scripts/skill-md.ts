// SKILL.md template. Facts that come from rustrician.io are interpolated so they stay current.
import type { Extracted } from "./extract.ts";

export const DESCRIPTION =
  "Design, build, validate and explain Rust (the Facepunch survival game) electrical, water/fluid and industrial " +
  "(conveyor, crafter, storage adaptor) circuits as rustrician.io schematics. Produces importable rustrician.io " +
  "circuit XML from a JSON spec, checks existing XML for wiring mistakes, decompiles shared circuits, and explains " +
  "power mechanics (root power, batteries, active usage, splitters vs branches, logic gates, timers, memory cells, " +
  "Root Combiner depth, short circuits) using the Rust Electrical Handbook. Use whenever the user mentions Rust " +
  "electricity, rustricity, rustrician, wiring, turrets, batteries, solar/wind power, automation, sorting, auto " +
  "smelting, or a rustrician.io circuit link or XML.";

const SIDE = (p: { x: number; y: number }) => (p.y >= 1 ? "bottom" : p.y < 0 ? "top" : p.x < 0 ? "left" : p.x >= 1 ? "right" : "center");
// Commonly stacked components, grouped by where main power enters and leaves (read from the catalog, never hand-written).
const FLOW_IDS = ["branch", "splitter", "combiner", "switch_or", "switch_and", "switch_xor", "blocker", "memorycell", "timer", "switch_rand", "counter", "switch", "doorcontroller", "battery_large", "autoturret", "samsite", "ceilinglight", "button", "hbhfsensor", "rf_receiver", "industrial_conveyor", "storage_adapter", "waterpump", "fluid_switch"];
const WORD: Record<string, string> = { "bottom>top": "**upward**", "top>bottom": "**downward**", "left>right": "**left to right**", "right>left": "**right to left**" };

function flowLines(x: Extracted): string {
  const groups = new Map<string, string[]>();
  for (const id of FLOW_IDS) {
    const c = x.components.find((k) => k.cmpid === id);
    const pin = c?.ports.find((p) => p.type === "in" && /^Power( In)?$/.test(p.label)) ?? c?.ports.find((p) => p.type === "in");
    const pout = c?.ports.find((p) => p.type === "out");
    if (!c || !pin || !pout) continue;
    const key = `${SIDE(pin)}>${SIDE(pout)}`;
    groups.set(key, [...(groups.get(key) ?? []), c.name]);
  }
  return [...groups]
    .map(([k, names]) => {
      const [i, o] = k.split(">");
      if (i === o) return `- Power in and out both at the **${i}**; feed and continue the chain from that side: ${names.join(", ")}.`;
      return `- Power in at the **${i}**, out at the **${o}**, so chains flow ${WORD[k] ?? `${i} to ${o}`}: ${names.join(", ")}.`;
    })
    .join("\n");
}

export function skillMd(o: { x: Extracted; guideIndex: string[]; generatedAt: string; sourceHash: string; exampleCount: number }): string {
  const { x } = o;
  const env = x.defaults.environment;
  const sources = x.combinerSources.filter((c) => c !== "combiner" && c !== "splitter");
  return `---
name: rustrician
description: ${JSON.stringify(DESCRIPTION)}
compatibility: Needs Node.js 18+ (or Bun / Deno) to run scripts/rustrician.mjs; network access only for decompiling shared circuit links.
metadata:
  source: "https://rustrician.io/"
  simulator-version: "${x.simulatorVersion}"
  handbook-build: "${x.handbook.buildDate}"
  generated: "${o.generatedAt}"
  source-hash: "${o.sourceHash}"
---

# Rustrician circuit designer

[rustrician.io](https://rustrician.io/) is the community simulator for Rust's electricity, water and industrial systems.
Circuits are mxGraph XML documents that users paste into the simulator's **Import** dialog. This skill turns a
circuit design into that XML, checks it, and grounds every design decision in the
[Rust Electrical Handbook](https://rustrician.io/handbook/) (build ${x.handbook.buildDate}).

Generated automatically from rustrician.io (simulator ${x.simulatorVersion}); component data is exact, never guess it.

## Workflow

1. **Understand the goal.** Pin down loads (what must turn on, when), triggers (players, sensors, timers, Rust+),
   power budget (sources, battery backup, uptime) and constraints (PC vs console, materials, raid resilience).
2. **Look up every component you plan to use.** Exact port labels, properties and behavior:
   \`node scripts/rustrician.mjs info <type> [...]\` or [references/components.md](references/components.md).
   Read the relevant [concept guide](#concept-guides) for anything beyond simple wiring.
3. **Do the power math** (below) before wiring. State it to the user.
4. **Plan the layout** like the physical base: core in the middle, peripherals where they sit (see [Layout](#layout)).
5. **Write a circuit spec** (JSON, format below) and build it:
   \`node scripts/rustrician.mjs build circuit.json -o circuit.xml\`
   Fix every \`error:\` and read every \`warning:\` (loops, unfed components, Max Depth).
6. **Deliver** the XML file (or its contents) plus a short explanation: what each part does, the power numbers,
   and how to test it. Tell the user: *rustrician.io → Import → paste → Import*. Mention simulator-only settings
   (marked in the reference) that have no in-game equivalent.

To change an existing circuit, \`decompile\` it (file, 32-char share token, or \`?circuit=\` URL) into a spec, edit,
and rebuild. To audit XML someone else made, run \`check\`.

## Toolkit: \`scripts/rustrician.mjs\`

Run with \`node\` (or \`bun\`, or \`deno run -A\`). No dependencies.

| Command | Purpose |
|---|---|
| \`build <spec.json\\|-> [-o out.xml]\` | Spec → importable XML. Validates everything; exits 1 with all errors listed. |
| \`check <file.xml\\|->\` | Validate circuit XML (ports, wire media, one wire per port, combiner inputs, loops, depth). |
| \`decompile <file\\|token\\|url\\|-> [-o spec.json]\` | XML or a shared circuit → editable spec. |
| \`info <type> [...]\` | Ports, properties, consumption and tips for components. |
| \`list [filter]\` | All component types (\`cmpid\`, name, category). |
| \`items <filter>\` | Generic Rust items (boxes, furnaces, TC…) for industrial circuits. |

## Circuit spec format

\`\`\`json
{
  "name": "Auto turret with battery backup",
  "components": [
    { "id": "solar", "type": "solarpanel_large", "x": 0, "y": 0 },
    { "id": "bat", "type": "battery_large", "x": 200, "y": 0 },
    { "id": "branch", "type": "branch", "x": 400, "y": 0, "props": { "Branch": 10 } },
    { "id": "turret", "type": "autoturret", "x": 600, "y": -100 },
    { "id": "light", "type": "ceilinglight", "x": 600, "y": 100 },
    { "id": "box", "type": "item", "item": "Large Wood Box", "x": 0, "y": 300 }
  ],
  "wires": [
    ["solar.Power Out", "bat.Power In"],
    ["bat.Power Out", "branch.Power In"],
    { "from": "branch.Branch Out", "to": "turret.Power In", "color": "#ff0000", "points": [[520, -60]] },
    ["branch.Power Out", "light.Power In"]
  ],
  "groups": [{ "id": "defense", "label": "Defense", "members": ["branch", "turret", "light"] }],
  "notes": [{ "text": "Branch reserves 10 rW for the turret", "x": 380, "y": 120, "size": "small" }],
  "environment": { "sun": 100, "wind": 50, "water": 50, "speed": 10 }
}
\`\`\`

- \`type\`: a \`cmpid\`, alias, or display name (\`"Electrical Branch"\` works). \`"item"\` + \`item\` (name or ID)
  places a generic Rust item; items have no ports and connect only through a Storage Adaptor placed next to them.
- \`x\`,\`y\`: absolute top-left in px (y grows **downward**, negatives allowed); components are ${x.sizes.component.join("×")}.
  Always place components deliberately (see [Layout](#layout)). Omitted coordinates fall back to plain
  left-to-right columns, which is only acceptable for throwaway drafts.
- \`props\`: by property name (case-insensitive), values validated against type and limits. Unset props keep defaults.
- \`rotation\`: 0/90/180/270, only for rotatable components; visual only, port labels never change.
- Wires go **output → input**: \`"componentId.Port Label"\`. Optional \`color\` (\`#rrggbb\`) and \`points\` waypoints.
- \`groups\` draw labelled boxes around members (components, notes, nested groups); \`notes\` are free text.
- \`environment\` drives simulated sun/wind/water (0–100) and speed (0–20); defaults ${JSON.stringify(Object.fromEntries(Object.entries(env).map(([k, v]) => [k, Number(v)])))}.

## Layout

A schematic should read like the base it will be built in. Positions and wire lengths do not affect the
simulation, so lay out for the person who has to build and debug it in-game.

**1. Map the base (macro).** Decide where each subsystem physically lives, using the handbook's model in
*Centralized vs Decentralized Theory*:
- The **core** (batteries, distribution, logic "brain", the MDF) sits at the centre of the canvas, around (0, 0).
- **Power sources** go where they physically are: turbines and solar on the roof sit above the core.
- **Peripherals** go in the direction they sit in the base, further out the further away they are: north
  compound turrets above, south below, east right, west left; a gatehouse or China Wall ring surrounds the core.
- Decentralized subsystems (their own battery and logic) become their own clusters at their location.
- Use one \`group\` per physical area, labelled by place and purpose ("Core / MDF", "North compound turrets").
  Nest groups for rooms within areas. Keep 300+ px between clusters so wires between them are easy to follow.

**2. Arrange each cluster (micro)** by port side, so power flows one way without crossing wires. Run
\`info\` to see each component's port sides.
${flowLines(x)}
- Control inputs (Toggle, Set/Reset, Open/Close, Block Passthrough, Turn On/Off) sit on a different side from
  main power, usually the right; run \`info\` for the exact side. Bring control wires in from that side so they
  never cross the main power path.
- Spacing: about 160–200 px between connected components, 120–140 px between parallel rows. Snap to multiples of 20.
- Rotation turns a component's icon but its port labels stay the same; check port positions in the simulator
  before relying on rotation to straighten a flow.

**3. Route the trunks.** Long wires between clusters get \`points\` waypoints at right angles (one corner per turn)
and a \`color\` per subsystem (e.g. red turrets, blue doors, yellow lights) so a bundle can be traced at a glance.

**4. Annotate.** Add a \`note\` per cluster with its power budget and what it does. If a wire would be long
in-game, note it: wires reach about 30 m (10 foundations), and any component added to extend one also counts
toward Max Depth.

Example skeleton for a core-plus-compound base (only coordinates shown):

\`\`\`text
core battery + brain      (0, 0)        north turrets  (-200..200, -700)
roof solar / wind        (0, -350)      south turrets  (-200..200,  700)
east turrets           (700, -200..200) west turrets   (-700, -200..200)
\`\`\`

## Hard wiring rules (enforced by the simulator)

- Only these connections exist: power out → power in (wire), water out → water in (hose), industrial out →
  industrial in (pipe). Never mix media.
- **One wire per port.** Fan out with a Splitter (equal shares) or Electrical Branch (fixed amount); fan in with a
  Root Combiner (root power only), OR/AND/XOR switch, or fluid/industrial combiner.
- A **Root Combiner** input must come straight from: ${sources.map((c) => `\`${c}\``).join(", ")}, another \`combiner\`, or a \`splitter\`.
  Anything else is rejected ("Invalid Input / Root Power Only").
- **Max Depth:** at most ${x.limits.maxTraceWires} wires (16 components including the source) between a power source and a Root
  Combiner. Combine near the sources, pyramid-style.
- **Short circuit:** a power loop of ${x.limits.shortCircuitLoop} or fewer components is cut off; loops never create power.
- Ports marked *buggy in-game* in the reference exist but should not be used.

## Power fundamentals (from the handbook)

- Power is measured in rW (rust Watts); battery storage in rWm (rW-minutes). Most components draw their listed
  consumption from **Power In** and pass the rest out of **Passthrough/Power Out**.
- **Root power**: solar (0–20), wind (0–150, altitude dependent), water wheel (0–60), small generator (fuel),
  test generator (simulator/creative). Production not consumed is wasted.
- **Batteries** output at most small 15 / medium 50 / large 100 rW, charge at 80 % efficiency, and accept up to 4× output.
  Neutral input = *Active Usage ÷ 0.8*. Run time (min) = stored rWm ÷ draw.
- **Active Usage** is what a battery actually drains: only powered, working consumers count. **Control power**
  (1 rW signals into side inputs: Toggle, Set/Reset, Block Passthrough…) is consumed but adds no active usage, so a
  charged battery can run pure logic indefinitely.
- **Free power**: Button 2 rW pulse, Pressure Pad / Reactive Target 1 rW pulse. Ideal triggers without root power.
- **Splitter**: divides power evenly over connected outputs, remainder to outputs 1 then 2; all loads fail together on a deficit.
  **Electrical Branch**: reserves \`Branch\` rW for Branch Out, rest to Power Out; chain branches for strict priority/load shedding.
- **Root Combiner** in series: every combined battery sees the full load as active usage. Prefer separate battery
  circuits over combining batteries in inline backups.
- **Logic**: OR/AND pass the higher input (A wins ties); XOR passes only when exactly one input is powered; Blocker =
  NOT on its side input; Memory Cell = latch/flip-flop (Set > Reset > Toggle, default Inverted Output); Timer passes
  power for \`Duration\` s after Toggle On (main input must be powered first); RAND Switch 50 % on Set; Counter
  passes power when its count reaches Target.
- **Evaluation order is deterministic**: Branch → Power Out then Branch Out; Splitter → 1, 2, 3; Memory Cell → Output
  before Inverted Output. Use this to reason about races and pulses.

These are summaries. For anything non-trivial read the matching guide; it is the authority.

## Design checklist

- Every load has the power it needs at the point it is wired (subtract upstream consumption; Passthrough carries the remainder).
- Battery backup choice is deliberate (inline vs bypass, see *Power Storage*); compute neutral charge input and run time.
- Priority loads (turrets, doors) sit earliest on Electrical Branch chains when partial power is possible.
- Pulses vs constant signals are intentional (Memory Cell Toggle with constant power flips on every update).
- No combiner receives non-root power; no path exceeds Max Depth; no short loops.
- Layout mirrors the base: core in the middle, peripherals in their compass direction, one labelled group per
  physical area; within clusters, power flows with the ports (upward through branches/splitters/gates, rightward
  through loads); wire colors distinguish subsystems; every cluster has a note.
- Say what you could not verify (in-game behavior can differ from the simulator; the handbook flags these).

## Reference files

- [references/components.md](references/components.md) — index of all ${x.components.length} simulator components (type, ports, consumption), linking to one file per category with properties, crafting and full handbook behavior.
- [references/example-circuits.md](references/example-circuits.md) — ${o.exampleCount} community circuits linked from the handbook (decompile to study real designs).
- [references/handbook-items-not-in-simulator.md](references/handbook-items-not-in-simulator.md) — tools, fireworks and other items the simulator cannot place.
- \`assets/catalog.json\` (machine-readable component definitions) and \`assets/items.json\` (generic items); used by the toolkit.

### Concept guides

${o.guideIndex.join("\n")}
`;
}
