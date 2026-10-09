---
name: rustrician
description: "Design, build, validate and explain Rust (the Facepunch survival game) electrical, water/fluid and industrial (conveyor, crafter, storage adaptor) circuits as rustrician.io schematics. Produces importable rustrician.io circuit XML from a JSON spec, checks existing XML for wiring mistakes, decompiles shared circuits, and explains power mechanics (root power, batteries, active usage, splitters vs branches, logic gates, timers, memory cells, Root Combiner depth, short circuits) using the Rust Electrical Handbook. Use whenever the user mentions Rust electricity, rustricity, rustrician, wiring, turrets, batteries, solar/wind power, automation, sorting, auto smelting, or a rustrician.io circuit link or XML."
compatibility: Needs Node.js 18+ (or Bun / Deno) to run scripts/rustrician.mjs; network access only for decompiling shared circuit links.
metadata:
  source: "https://rustrician.io/"
  simulator-version: "1337.369"
  handbook-build: "September 09, 2026"
  generated: "2026-10-09"
  source-hash: "52da3ac240dfba82"
---

# Rustrician circuit designer

[rustrician.io](https://rustrician.io/) is the community simulator for Rust's electricity, water and industrial systems.
Circuits are mxGraph XML documents that users paste into the simulator's **Import** dialog. This skill turns a
circuit design into that XML, checks it, and grounds every design decision in the
[Rust Electrical Handbook](https://rustrician.io/handbook/) (build September 09, 2026).

Generated automatically from rustrician.io (simulator 1337.369); component data is exact, never guess it.

## Workflow

1. **Understand the goal.** Pin down loads (what must turn on, when), triggers (players, sensors, timers, Rust+),
   power budget (sources, battery backup, uptime) and constraints (PC vs console, materials, raid resilience).
2. **Look up every component you plan to use.** Exact port labels, properties and behavior:
   `node scripts/rustrician.mjs info <type> [...]` or [references/components.md](references/components.md).
   Read the relevant [concept guide](#concept-guides) for anything beyond simple wiring.
3. **Do the power math** (below) before wiring. State it to the user.
4. **Plan the layout** like the physical base: core in the middle, peripherals where they sit (see [Layout](#layout)).
5. **Write a circuit spec** (JSON, format below) and build it:
   `node scripts/rustrician.mjs build circuit.json -o circuit.xml`
   Fix every `error:` and read every `warning:` (loops, unfed components, Max Depth).
6. **Deliver** the XML file (or its contents) plus a short explanation: what each part does, the power numbers,
   and how to test it. Tell the user: *rustrician.io → Import → paste → Import*. Mention simulator-only settings
   (marked in the reference) that have no in-game equivalent.

To change an existing circuit, `decompile` it (file, 32-char share token, or `?circuit=` URL) into a spec, edit,
and rebuild. To audit XML someone else made, run `check`.

## Toolkit: `scripts/rustrician.mjs`

Run with `node` (or `bun`, or `deno run -A`). No dependencies.

| Command | Purpose |
|---|---|
| `build <spec.json\|-> [-o out.xml]` | Spec → importable XML. Validates everything; exits 1 with all errors listed. |
| `check <file.xml\|->` | Validate circuit XML (ports, wire media, one wire per port, combiner inputs, loops, depth). |
| `decompile <file\|token\|url\|-> [-o spec.json]` | XML or a shared circuit → editable spec. |
| `info <type> [...]` | Ports, properties, consumption and tips for components. |
| `list [filter]` | All component types (`cmpid`, name, category). |
| `items <filter>` | Generic Rust items (boxes, furnaces, TC…) for industrial circuits. |

## Circuit spec format

```json
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
```

- `type`: a `cmpid`, alias, or display name (`"Electrical Branch"` works). `"item"` + `item` (name or ID)
  places a generic Rust item; items have no ports and connect only through a Storage Adaptor placed next to them.
- `x`,`y`: absolute top-left in px (y grows **downward**, negatives allowed); components are 64×64.
  Always place components deliberately (see [Layout](#layout)). Omitted coordinates fall back to plain
  left-to-right columns, which is only acceptable for throwaway drafts.
- `props`: by property name (case-insensitive), values validated against type and limits. Unset props keep defaults.
- `rotation`: 0/90/180/270, only for rotatable components; visual only, port labels never change.
- Wires go **output → input**: `"componentId.Port Label"`. Optional `color` (`#rrggbb`) and `points` waypoints.
- `groups` draw labelled boxes around members (components, notes, nested groups); `notes` are free text.
- `environment` drives simulated sun/wind/water (0–100) and speed (0–20); defaults {"sun":100,"wind":50,"water":50,"speed":10}.

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
- Use one `group` per physical area, labelled by place and purpose ("Core / MDF", "North compound turrets").
  Nest groups for rooms within areas. Keep 300+ px between clusters so wires between them are easy to follow.

**2. Arrange each cluster (micro)** by port side, so power flows one way without crossing wires. Run
`info` to see each component's port sides.
- Power in at the **bottom**, out at the **top**, so chains flow **upward**: Electrical Branch, Root Combiner, OR Switch, AND Switch, XOR Switch, Blocker, Memory Cell, Timer, RAND Switch, Counter, Switch, Door Controller.
- Power in at the **top**, out at the **bottom**, so chains flow **downward**: Splitter.
- Power in at the **left**, out at the **right**, so chains flow **left to right**: Large Rechargeable Battery, Auto Turret, SAM Site, Ceiling Light, Button, HBHF Sensor, RF Receiver.
- Power in and out both at the **top**; feed and continue the chain from that side: Industrial Conveyor, Storage Adaptor.
- Control inputs (Toggle, Set/Reset, Open/Close, Block Passthrough, Turn On/Off) sit on a different side from
  main power, usually the right; run `info` for the exact side. Bring control wires in from that side so they
  never cross the main power path.
- Spacing: about 160–200 px between connected components, 120–140 px between parallel rows. Snap to multiples of 20.
- Rotation turns a component's icon but its port labels stay the same; check port positions in the simulator
  before relying on rotation to straighten a flow.

**3. Route the trunks.** Long wires between clusters get `points` waypoints at right angles (one corner per turn)
and a `color` per subsystem (e.g. red turrets, blue doors, yellow lights) so a bundle can be traced at a glance.

**4. Annotate.** Add a `note` per cluster with its power budget and what it does. If a wire would be long
in-game, note it: wires reach about 30 m (10 foundations), and any component added to extend one also counts
toward Max Depth.

Example skeleton for a core-plus-compound base (only coordinates shown):

```text
core battery + brain      (0, 0)        north turrets  (-200..200, -700)
roof solar / wind        (0, -350)      south turrets  (-200..200,  700)
east turrets           (700, -200..200) west turrets   (-700, -200..200)
```

## Hard wiring rules (enforced by the simulator)

- Only these connections exist: power out → power in (wire), water out → water in (hose), industrial out →
  industrial in (pipe). Never mix media.
- **One wire per port.** Fan out with a Splitter (equal shares) or Electrical Branch (fixed amount); fan in with a
  Root Combiner (root power only), OR/AND/XOR switch, or fluid/industrial combiner.
- A **Root Combiner** input must come straight from: `solarpanel_large`, `generator_wind`, `generator_water`, `fuelgenerator_small`, `testgenerator_small`, `battery_large`, `battery_medium`, `battery_small`, `pressurepad`, `reactivetarget`, `watercatcher_large`, `watercatcher_small`, `waterbarrel`, `waterpump`, `waterpurifier`, `waterpurifier_simple`, `2mod_fueltank`, another `combiner`, or a `splitter`.
  Anything else is rejected ("Invalid Input / Root Power Only").
- **Max Depth:** at most 15 wires (16 components including the source) between a power source and a Root
  Combiner. Combine near the sources, pyramid-style.
- **Short circuit:** a power loop of 8 or fewer components is cut off; loops never create power.
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
  **Electrical Branch**: reserves `Branch` rW for Branch Out, rest to Power Out; chain branches for strict priority/load shedding.
- **Root Combiner** in series: every combined battery sees the full load as active usage. Prefer separate battery
  circuits over combining batteries in inline backups.
- **Logic**: OR/AND pass the higher input (A wins ties); XOR passes only when exactly one input is powered; Blocker =
  NOT on its side input; Memory Cell = latch/flip-flop (Set > Reset > Toggle, default Inverted Output); Timer passes
  power for `Duration` s after Toggle On (main input must be powered first); RAND Switch 50 % on Set; Counter
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

- [references/components.md](references/components.md) — index of all 119 simulator components (type, ports, consumption), linking to one file per category with properties, crafting and full handbook behavior.
- [references/example-circuits.md](references/example-circuits.md) — 32 community circuits linked from the handbook (decompile to study real designs).
- [references/handbook-items-not-in-simulator.md](references/handbook-items-not-in-simulator.md) — tools, fireworks and other items the simulator cannot place.
- `assets/catalog.json` (machine-readable component definitions) and `assets/items.json` (generic items); used by the toolkit.

### Concept guides

- [The Rust Electrical Handbook](references/guides/the-rust-electrical-handbook.md) — This handbook now covers both versions of the game (PC and Console) and tries to point out the differences where known.
- [Component Details](references/guides/component-details.md) — Here is a complete list of all the electrical related components.
- [Tools](references/guides/tools.md) — These are all the hand tools a player will need to be able to work with all aspects of the electrical and related systems.
- [Power Sources](references/guides/power-sources.md) — There is no way around this. Most electrical circuits, if they are going to function, power must be generated somehow.
- [Batteries](references/guides/batteries.md) — Storing power for use at a later time is a great way at preventing circuits from going offline when the main power source reduces or stops…
- [Distribution](references/guides/distribution.md) — After electricity is generated, it must be efficiently directed.
- [Switches](references/guides/switches.md) — Switches are components that, for the most part, require a player to Use(E).
- [Sensors](references/guides/sensors.md) — These are passive components that do not require a player to Use(E).
- [Logic](references/guides/logic.md) — Logic components are used to control power flow based on specific conditions.
- [Radio Frequency (RF)](references/guides/radio-frequency-rf.md) — RF Components allow for wireless communication and remote activation within electrical circuits.
- [Lights](references/guides/lights.md) — Lights are electrical components that provide illumination and visual feedback.
- [Smart](references/guides/smart.md) — Smart components can be paired with the Rust+ app, allowing players to interact with in-game devices remotely while not logged in.
- [Utilities](references/guides/utilities.md) — Utility components add functional and environmental features that improve base management and gameplay.
- [Defense](references/guides/defense.md) — Defense components are automated security devices that protect bases and airspace.
- [Water](references/guides/water.md) — The Water system lets players collect, store, move, and distribute water through water components using water IO.
- [Industrial](references/guides/industrial.md) — The Industrial System is an automated network using industrial components, pipes, and power to move items, craft, and smelt.
- [Voice Props Pack DLC](references/guides/voice-props-pack-dlc.md) — The Voice Props Pack DLC, released July 2, 2021, adds audio and visual components that let players record, play, and broadcast sounds,…
- [Exhibit Decor Pack DLC](references/guides/exhibit-decor-pack-dlc.md) — Light up your base with the Exhibit Decor Pack.
- [Fireworks](references/guides/fireworks.md) — The Fireworks system in Rust provides players with a fun and visual way to celebrate, signal, or simply decorate their bases.
- [Electrical Concepts: Getting Started with Rustricity](references/guides/electrical-concepts/getting-started-with-rustricity.md) — Whether encountering Rustricity for the first time or revisiting it after a break, this section provides a structured foundation for…
- [Electrical Concepts: The Structure of a Base Circuit](references/guides/electrical-concepts/the-structure-of-a-base-circuit.md) — Designing electrical circuits in Rust begins with understanding that all base circuits, no matter their size or complexity, follow the same…
- [Electrical Concepts: Centralized vs Decentralized Theory](references/guides/electrical-concepts/centralized-vs-decentralized-theory.md) — When discussing centralized or decentralized theory, we are referring to two distinct aspects:
- [Electrical Concepts: Power Theory and Efficiency › Introduction](references/guides/electrical-concepts/power-theory-and-efficiency/introduction.md) — Understanding Rust’s electrical system isn’t just about knowing what components do, it’s about mastering how power flows, what gets…
- [Electrical Concepts: Power Theory and Efficiency › Key Definitions](references/guides/electrical-concepts/power-theory-and-efficiency/key-definitions.md) — Modern circuitry relies on more than just connecting wires, it requires an understanding of how power behaves across different systems.
- [Electrical Concepts: Power Theory and Efficiency › Where Past Meets Present](references/guides/electrical-concepts/power-theory-and-efficiency/where-past-meets-present.md) — Now that the different types of power have been defined, the next step is to demonstrate how they interact and how misunderstanding these…
- [Electrical Concepts: Power Theory and Efficiency › Electrical Branch and Splitter Prioritizations](references/guides/electrical-concepts/power-theory-and-efficiency/electrical-branch-and-splitter-prioritizations.md) — Prioritization describes what gets power first and what loses it first when the supply starts to decline.
- [Electrical Concepts: Power Theory and Efficiency › Root Combiner Behavior](references/guides/electrical-concepts/power-theory-and-efficiency/root-combiner-behavior.md) — When combining batteries using a Root Combiner, the resulting behavior might not be what one would expect unless being familiar with wiring…
- [Electrical Concepts: Power Theory and Efficiency › Basic Dive into Modern Active Usage and Power Consumption](references/guides/electrical-concepts/power-theory-and-efficiency/basic-dive-into-modern-active-usage-and-power-consumption.md) — Active Usage is always Consumed Power, but Consumed Power is not always Active Usage.
- [Electrical Concepts: Power Theory and Efficiency › Example: Backup Turrets Using A Splitter](references/guides/electrical-concepts/power-theory-and-efficiency/example-backup-turrets-using-a-splitter.md) — This example demonstrates how a circuit that consumes a lot of power can leverage Active Usage to reduce overall Root Power demand,…
- [Electrical Concepts: Power Theory and Efficiency › Example: Flipping Flop Turrets](references/guides/electrical-concepts/power-theory-and-efficiency/example-flipping-flop-turrets.md) — This example demonstrates how circuits with high baseline power consumption but a lower Active Usage may be more efficiently powered by…
- [Electrical Concepts: Power Theory and Efficiency › Example: Automatic Sprinklers](references/guides/electrical-concepts/power-theory-and-efficiency/example-automatic-sprinklers.md) — This example demonstrates how a circuit can benefit from the player’s understanding of Control Power, power used for logic and timing that…
- [Electrical Concepts: Power Theory and Efficiency › Example: Automatic Furnace](references/guides/electrical-concepts/power-theory-and-efficiency/example-automatic-furnace.md) — This circuit demonstrates how circuits that don’t need to operate continuously can benefit from smart management of Stored Power.
- [Electrical Concepts: Power Theory and Efficiency › Example: The Simple Trap](references/guides/electrical-concepts/power-theory-and-efficiency/example-the-simple-trap.md) — This example demonstrates how circuits triggered by basic player inputs can greatly benefit from using Free Power for Control Power to…
- [Electrical Concepts: Power Theory and Efficiency › Power Waste and Circuit Efficiency](references/guides/electrical-concepts/power-theory-and-efficiency/power-waste-and-circuit-efficiency.md) — All circuits can result in some level of wasted electricity.
- [Electrical Concepts: Power Theory and Efficiency › Summary](references/guides/electrical-concepts/power-theory-and-efficiency/summary.md) — This section redefines how players evaluate and build circuits in Rust.
- [Electrical Concepts: Power Generation](references/guides/electrical-concepts/power-generation.md) — This section covers the concepts behind components that generate Root Power in Rust.
- [Electrical Concepts: Power Storage › Battery Backup](references/guides/electrical-concepts/power-storage/battery-backup.md) — A battery backup system in Rust is a circuit designed to automatically supply power when the primary power source fails.
- [Electrical Concepts: Power Storage › Batteries: Parallel vs Series](references/guides/electrical-concepts/power-storage/batteries-parallel-vs-series.md) — Understanding how batteries function in different configurations is critical for optimizing power systems.
- [Electrical Concepts: Power Storage › Types of Battery Backups › Direct Delivery](references/guides/electrical-concepts/power-storage/types-of-battery-backups/direct-delivery.md) — Direct Delivery refers to a circuit where the power source is connected directly to the components without the use of a battery.
- [Electrical Concepts: Power Storage › Types of Battery Backups › Inline Backup](references/guides/electrical-concepts/power-storage/types-of-battery-backups/inline-backup.md) — The Inline Backup derives its name from the location where it exists within the circuit, in line
- [Electrical Concepts: Power Storage › Types of Battery Backups › The Kore](references/guides/electrical-concepts/power-storage/types-of-battery-backups/the-kore.md) — The Kore is named after its creator, Korrektor, a highly respected member of the Rust community for his contributions to advanced circuit…
- [Electrical Concepts: Power Storage › Types of Battery Backups › Dual-Cell](references/guides/electrical-concepts/power-storage/types-of-battery-backups/dual-cell.md) — The Dual-Cell Battery Backup was optimized and popularized by Korrektor.
- [Electrical Concepts: Power Storage › Types of Battery Backups › OR/Blocker](references/guides/electrical-concepts/power-storage/types-of-battery-backups/or-blocker.md) — The OR/Blocker Battery Backup is one of the earliest and previously most well-known battery backups in Rust.
- [Electrical Concepts: Power Storage › Types of Battery Backups › Nih Core](references/guides/electrical-concepts/power-storage/types-of-battery-backups/nih-core.md) — The Nih Core was named by the Rust community in honor of its creator, Nih.
- [Electrical Concepts: Power Storage › Types of Battery Backups › BCN Core](references/guides/electrical-concepts/power-storage/types-of-battery-backups/bcn-core.md) — The BCN Core stands for Battery-Checked Nih Core.
- [Electrical Concepts: Power Storage › Types of Battery Backups › NEXUS](references/guides/electrical-concepts/power-storage/types-of-battery-backups/nexus.md) — Coming Soon
- [Electrical Concepts: Power Storage › Types of Battery Backups › Secondary Battery Backup](references/guides/electrical-concepts/power-storage/types-of-battery-backups/secondary-battery-backup.md) — A Secondary Battery Backup provides an extra layer of protection for a base's most critical circuits after the primary backup system fails.
- [Electrical Concepts: Power Storage › Types of Battery Backups › HazCore (Updating)](references/guides/electrical-concepts/power-storage/types-of-battery-backups/hazcore-updating.md) — HazCore is named after Hazdr, who helped popularize the design through practical use and iteration.
- [Electrical Concepts: Power Storage › Types of Battery Backups › PPCore (Push-Pull Core)](references/guides/electrical-concepts/power-storage/types-of-battery-backups/ppcore-push-pull-core.md) — Coming Soon
- [Electrical Concepts: Distribution of Power › Power Bus Theory](references/guides/electrical-concepts/distribution-of-power/power-bus-theory.md) — In the real world, a power bus is a common electrical conductor, or group of conductors, that collects and distributes electrical power…
- [Electrical Concepts: Distribution of Power › Short Circuit / Max Depth](references/guides/electrical-concepts/distribution-of-power/short-circuit-max-depth.md) — The Short Circuit / Max Depth error is a single in-game warning message that appears when certain rules are violated in the electrical,…
- [Electrical Concepts: Distribution of Power › Circuit Delay and Power Flow](references/guides/electrical-concepts/distribution-of-power/circuit-delay-and-power-flow.md) — Rust evaluates power via queues. This section covers two effects of queue‑based execution:
- [Logic 101 (Needs Work)](references/guides/logic-101-needs-work.md) — This section should dive into logic gates and how to use them.
- [Industrial Concepts (Needs Work)](references/guides/industrial-concepts-needs-work.md) — The industrial system lets players utilize electricity to replace several menial tasks.
- [Turret Systems](references/guides/turret-systems.md) — Misc Turret Info (Holding Area); Backup Turrets; Flip-Flip Turrets; Useful Videos
- [Historical Archive](references/guides/historical-archive.md) — The original handbook (RIP 2019); Handbook 2.0 (RIP 2024); Nih Capacitor; Side Inputs
- [Useful Circuits](references/guides/useful-circuits.md) — (Most will likely be out of date. Review Needed)
