# Electrical Concepts: Power Theory and Efficiency › Electrical Branch and Splitter Prioritizations

### Electrical Branch and Splitter Prioritizations

Prioritization describes what gets power first and what loses it first when the supply starts to decline. These two components implement it in different ways:

- **Splitter:** Hands power to Output 1, then 2, then 3. When input falls, it removes power in the same order. It divides whatever power is available across its outputs. Each output receives roughly “input ÷ number of outputs.” If the share for any output drops below what a load needs, that load turns off, but because all shares drop together, multiple loads often fail at once.
- **Electrical Branch:** Always reserves power for Branch Out even though Power Out will send out power first before Branch Out. In a chain of branches, the earlier branch has higher priority than the later one. It allocates fixed amounts rather than equal shares, reserving a set amount for each load. The first branch is filled first, then any remainder is passed downstream. If supply falls, later branches lose power first while earlier, higher‑priority branches keep running.

**Comparative Example - Equal Share vs Fixed Allocation**

Lets say there is a target of 30rW for three 10rW loads. Lets say the loads are 3 Auto Turrets.

- **Splitter:** With 30rW in, the Splitter divides the input so each output is 10rW and all three turrets turn on. Now lets say the input falls to 20rW. Each output will now drop below their 10rW requirement and all three turrets will turn off. This is a simultaneous failure when experiencing a power deficit.
- **Electrical Branches:** Chain two branches together so there are three effective outputs (Power Out of the first into Power In of the second). Set Branch Out on both to 10. With 30rW in, the first branch supplies 10rW to Turret A and forwards the remaining 20rW to the second branch. The second supplies 10rW to Turret B and forwards the last 10rW to Turret C. If power input falls to 20rW, Turret A and B continue to receive 10rW each, while Turret C receives 0rW and turns off. This is ordered power shedding that preserves higher priority loads longer.

**Principle:** Splitters equalize and tend to fail everything at once when input is insufficient. Electrical Branch chains allocate fixed amounts in order and shed lower priority loads first.

**Application Guidance**

Prioritization matters when a circuit can operate under partial power. If the design drops straight to 0rW on failure, priority settings cannot buy time. If the circuit design preserves some power delivery, priority decides which loads stay online and the order in which others shed. The notes below map that logic for common backup types.

- **Classic Inline Backup:** When the single inline battery depletes or is destroyed, output falls to 0rW immediately. There is no partial power phase to allocate, so prioritization adds material cost without runtime benefit. For nine turrets, four Splitters (4 × 100 Metal Fragments = 400 Metal Fragments) are cheaper than eight Branches (8 × 75 Metal Fragments = 600 Metal Fragments).
- **Bypass Backups and Battery-Checked Backups:** These designs continue to pass Root Power even if the local battery is depleted or destroyed. When partial Root Power remains, Electrical Branch prioritization keeps higher‑priority loads online and sheds lower‑priority loads in order, extending useful uptime and avoiding a full blackout.
- **Series Batteries:** When two or more batteries are wired in series on the same electrical path, loss of one does not disable the others. A surviving battery can still deliver some power, so prioritization with Electrical Branches will keep higher priority loads online until the remaining output is exhausted.

**Design Rules of Thumb**

- Use Splitters when loads are equal in priority and an all or nothing outcome is acceptable.
- Use Electrical Branch chains when loads need a strict priority order or when partial power is expected.
- Set Electrical Branch values to the exact rW needed per load and place the most important load on the earliest branch.
- If input reaches 0rW, neither device helps. Everything turns off.
