# Electrical Concepts: Power Theory and Efficiency › Root Combiner Behavior

### Root Combiner Behavior

When combining batteries using a Root Combiner, the resulting behavior might not be what one would expect unless being familiar with wiring batteries in series. The output is increased but the capacity stays the same. This is different from running multiple separate batteries in parallel, giving the same output but increasing the capacity, and has important implications on Active Usage.

Each battery connected to a Root Combiner will register the full Active Usage of the connected circuit, there is no load sharing between batteries.

- 2 Large Batteries powering a 200rW circuit = 100 Active Usage per battery
- 2 Large Batteries powering a 60rW circuit = 60 Active Usage per battery

This is true regardless of how much power is actually being consumed by the circuit. The Root Combiner does not split or balance the load between the batteries, each one sees the full value.

This behavior is covered in greater detail in Batteries: Parallel vs Series, but for the purposes of understanding power efficiency here:

- If combining batteries, either fully utilize their combined output, or split the circuit and use separate batteries. Otherwise, the battery drain may be disproportionately high for what the circuit actually needs.

**⚠️ Avoid Combining Batteries in Inline Backups**

**Do not use a Root Combiner to combine batteries in a primary Inline backup.**

When batteries are wired in series (via Root Combiner), each one will register the full Active Usage of the circuit, even if more power is being supplied than needed.

- For example, a 200rW circuit powered by two Root Combined Large Batteries will result in 100 Active Usage per battery, requiring 252rW of Root Power just to stay neutral.
  - That’s 252rW produced for 200rW usable output, a net loss of efficiency.

Using a Bypass backup instead would allow the same 200rW circuit to run with only 220rW of Root Power, depending on how much power is needed to recharge the batteries.

**💡 Tip:** Two Large Batteries powering a 120rW circuit through a Root Combiner will still have 100 Active Usage per battery. This means they will last only 4 hours. If a circuit only needs 120rW and uptime is important, split the circuit across two 60rW segments powered by separate batteries to increase the runtime.

**Additional Root Combiner Rules**

While Root Combiners are powerful tools, there are two important rules that can impact their use in larger or more complex circuits:

- **Max Depth Limitation**: Root Combiners are subject to a 16-component Max Depth limit. If a power path exceeds 16 components between a Power Source and the Root Combiner, it will result in a Short Circuit / Max Depth error and power will not be delivered past this point. This becomes particularly relevant in pyramid-stacked RC-Bus systems and battery backups with long chains of components.
- **No Self-Feeding Power Loops**: A Root Combiner will not recombine power that has already passed through itself. If power is routed through a Root Combiner, used in a circuit, and then sent back into one of its inputs (intentionally or not), the combiner will ignore that power source. This fails silently — the Root Combiner simply refuses to recombine that recycled signal. This can occur in circuits with poor layout or in attempts to merge power that has already been merged before. Each input must be a clean, non-circular source.
