# Electrical Concepts: Power Storage › Types of Battery Backups › Dual-Cell

#### Dual-Cell

**About the Name**

The Dual-Cell Battery Backup was optimized and popularized by **Korrektor**. Its name reflects a deliberate design constraint: it is engineered to operate with **exactly two batteries**, not fewer, not more.

This is not an arbitrary limitation. Two batteries allow the system to alternate load and recovery in a controlled way that single-battery or traditional parallel systems cannot replicate efficiently.

The purpose of the **Dual-Cell** backup is to extend runtime and improve survivability using a single primary power source, while avoiding the inefficiencies and fragility of classic parallel battery designs.

Instead of keeping multiple batteries fully active at all times, the Dual-Cell backup time-slices the load, allowing one battery to actively support the circuit while the other rests and recharges. This creates longer effective runtime and preserves redundancy during partial base failure.

At any given moment:

- One battery is **actively supporting the circuit**
- The other battery is **charging and recovering**

A timing circuit continuously flips which battery is active. This oscillation is intentional and controlled. No battery is expected to sustain the full load indefinitely. This concept, **Alternating Load Cells**, is the defining characteristic of the Dual-Cell design.

**✅ Benefits**

- Uses a Splitter’s dynamic behavior to automatically redistribute power if one battery is destroyed
- Provides up to 10 hours of backup runtime under optimal conditions
- Enables battery redundancy while using a single Wind Turbine as the primary source
- Well-suited for decentralized base designs where partial destruction is expected

**❌ Limitations**

- Always subject to the 80% battery efficiency loss during normal operation
- Requires understanding of Active Usage to avoid undercharging or impractical charge cycles
- Hard-limited to roughly 80 Active Usage due to charge-versus-drain timing constraints
- Offers no redundancy if both batteries are destroyed

**How It Works**

The Dual-Cell Battery Backup is an inline, alternating-load backup built around a single primary power source. Rather than keeping both batteries active simultaneously, the system deliberately forces only one battery to carry the circuit at a time, while the other is allowed to recover.

A Wind Turbine mounted at optimal height (10th–11th floor) feeds a Splitter, which supplies both batteries continuously. However, the turbine alone does not provide enough power to sustain full load on both batteries at once. This is intentional.

A dedicated timing circuit periodically flips which battery is allowed to support the circuit. When Battery A is active, Battery B is charging. When Battery B becomes active, Battery A rests. This oscillation prevents either battery from being fully drained and dramatically increases total usable runtime.

The timing mechanism is crude by design but reliable:

- An intentionally empty small battery is trickle-charged.
- A Laser Detector applies a constant drain.
- When the small battery reaches the output threshold, it toggles a Memory Cell.
- The Memory Cell swap reverses which battery is permitted to feed the circuit.
- The Laser Detector immediately begins draining the small battery again.

This creates a self-resetting oscillation of roughly five seconds per cycle. No external timers are required, and the system naturally stabilizes as long as charge input exceeds drain during the recovery phase.

The key constraint is balance. Each large battery must:

- Lose power while active
- Gain more power while resting than it lost while active

With one Wind Turbine, this balance reliably caps out at roughly 80 Active Usage. Above that, recovery time becomes longer than drain time and the system collapses into slow death.

**Power Flow Logic**

- **Power Source → Splitter → Batteries**
- - Power from a single Wind Turbine is sent directly into a Splitter. Each Splitter output runs directly to one battery.
- - No wire extensions are allowed here. Extensions break the Splitter’s dynamic redistribution behavior, which is what allows the system to continue operating if one battery is destroyed.
- - If one battery is lost, the Splitter automatically reallocates all available power to the remaining battery without player intervention.
- Battery 1 → Memory Cell → OR Switch → Circuit
- Battery 1’s output is controlled by the Memory Cell.
- - The Inverted Output of the Memory Cell feeds Input A of the primary OR Switch.
- - The Normal Output is routed through an Electrical Branch set to burn 1rW, then into Input B of a secondary OR Switch.
- - That secondary OR Switch feeds back into Input B of the primary OR Switch.
- When the Memory Cell is in this state, Battery 1 is authorized to support the circuit and Battery 2 is effectively blocked.
- **Battery 2 → Electrical Branch → Timing Circuit
- **Battery 2 feeds the timing system.
- - An Electrical Branch set to 1rW trickle-charges a small, fully discharged battery.
- - The small battery feeds:
- - The Toggle input of the Memory Cell
- - A Laser Detector, which exists solely to drain it
- Once the small battery accumulates enough charge to output power, it toggles the Memory Cell. The Laser Detector immediately starts draining it again, resetting the cycle.
- This is the heartbeat of the Dual-Cell system.
- **Electrical Branch → OR Switch → Circuit
- **Battery 2’s remaining power (after feeding the timing circuit) is routed into Input A of the secondary OR Switch.
- When the Memory Cell flips, both inputs of the secondary OR Switch are energized, allowing Battery 2 to take over the circuit load while Battery 1 enters its recovery phase.
- The system then waits for the next flip.

**Design Considerations**

**Room Separation Is Mandatory

**This backup only achieves redundancy if it is physically separated:

- Battery 1 in its own room
- Battery 2 in its own room
- Timing and logic components in a third room

If raiders destroy one battery room, the other battery continues operating automatically. If everything is stacked in one place, you’ve built a very expensive single point of failure.

**Load Discipline Matters

**This design is hard-capped at approximately **80 Active Usage** with a single Wind Turbine. Pushing beyond that does not cause immediate failure, it causes slow, deceptive failure where batteries appear functional but never fully recover.

If more load is required:

- Add **East + West Solar Panels** to supplement turbine output
- Or introduce a second turbine **feeding a separate battery**, not merged upstream

Overproduction is acceptable. Underproduction kills the system quietly.

**Scalability Strategy

**For larger bases, multiple Dual-Cell backups can be deployed, each supporting its own circuit group. Three turbines can be combined and split across two Dual-Cell systems, improving resilience without wasting excess power.

Do not try to brute-force this design by stacking batteries. That defeats the entire point.

**This Is Not a Parallel System

**Treating this like a traditional parallel battery bank will lead to bad assumptions, bad math, and dead turrets. The Dual-Cell is about controlled alternation, not shared load.

If both batteries die, the system is done.
