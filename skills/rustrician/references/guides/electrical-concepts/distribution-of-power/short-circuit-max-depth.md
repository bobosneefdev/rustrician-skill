# Electrical Concepts: Distribution of Power › Short Circuit / Max Depth

### Short Circuit / Max Depth

The **Short Circuit / Max Depth error** is a single in-game warning message that appears when certain rules are violated in the electrical, water, or industrial systems. It is displayed in red text when looking at an IO connection, but despite appearing as one message, this error actually represents two separate problems: a Short Circuit, or a Max Depth violation.

When players encounter this error, it will appear as red text when looking at an input or output connection of a component. However, the game does not tell players which of the two problems occurred, it’s up to the player to determine whether they’ve created a Short Circuit or exceeded the Max Depth.

This section of the handbook explains:

- What a **Short Circuit** is, why it happens, and how to resolve it
- What a **Max Depth** violation is, how it's triggered, and how to avoid it
- How these rules apply independently to the **electrical** system

#### Short Circuit

A **Short Circuit** occurs within the electrical system when power is wired into a loop and ends up feeding back into itself. This creates a recursive condition where power has no true destination, and instead endlessly cycles through the same path. Rust detects this and cuts the connection off.

**In short:** loops are invalid unless specifically structured to avoid this condition.

**Why Would Players Do This?**

In today’s Rust, **there is no valid reason yet to intentionally create a power loop**. However, this was not always the case. In the past, batteries behaved differently:

- They were either charging or discharging, not both.
- When discharging, they always output full power (e.g., 100rW for a Large Battery).
- This meant that the amount of Available Power players saw on an IO connection was actually draining from a battery.

Players discovered ways to reuse unused battery output by **feeding it back into the battery**, a trick known as the “Infinite Power Loop.” This was a real Infinite Power Loop, not the OR/Blocker battery backup from the past and worked until **Active Usage** was introduced.

**What Changed?**

Batteries now calculate **Active Usage**, meaning:

- A battery only discharges the amount of power a circuit actually needs.
- The number seen at an IO connection is showing Available Power that can be used and is not contributing to Active Usage.
- If the battery has no Active Usage, it does not drain and there is no wasted power to “loop-back”.

Additionally:

- Batteries today add their own Active Usage when charging. This value is 4x their max output. For a Large Battery, this is 400.
- Creating a loop now causes the battery to count the amount of power in the loop back as Active Usage, resulting in a 20% efficiency reduction with zero benefit.

**Feeding power back into a battery is not only useless, it actively harms power efficiency.**

**How to avoid a Short Circuit**

Rust automatically detects when a power path forms a loop. If the total number of components involved in the loop is **8 or fewer**, the game issues a **Short Circuit error**.

However, you **can bypass this** detection by increasing the loop size to **9 or more components**. While this removes the error, the loop still offers **no practical benefit**.

#### Max Depth

A **Max Depth violation** happens when the number of components from and** including a Power Source to a Root Combiner** exceeds a hardcoded limit of 16. This is one of the most common causes of confusion when players build advanced centralized power networks.

Despite showing the same **Short Circuit / Max Depth** error message, this is an entirely different issue than a Short Circuit.

**Understanding Max Depth**

When electricity travels from a **Power Source to a Root Combiner**, it may pass through many electrical components along the way, including branches, splitters, switches, lights, batteries, etc.

If the total number of components in that power path **exceeds 16**, the Root Combiner will stop functioning and display the Short Circuit / Max Depth error on one of its inputs.

- Power paths are not allowed to exceed 16 components between a Power Source and a Root Combiner. If this happens, the Root Combiner will reject the input entirely.

**This rule applies to every unique path.** This includes circuits that use multiple power sources and multiple Root Combiners, such as in RC-Bus, or circuits that create many possible routes for power, like C-Bus layouts. Rust checks each one individually, and only one needs to exceed the limit to break the system.

**Quick Tip: How to Count Components**

When checking Max Depth, every **electrical component** the power passes through counts as 1. Players don’t need to memorize examples, they just need to ask themselves:

“Does this component exist along the path power needs to take between the power source and the Root Combiner?”

If yes, it counts.

**Preventing Max Depth Errors**

There is no way to bypass the Max Depth limit, it is hardcoded. However, following best RC-Bus design practices, players can delay or eliminate the risk of hitting it:

- Use a **Pyramid** structure when combining power: pair sources into Root Combiners layer by layer.
- **Avoid** routing power through **non-essential components** before reaching the Root Combiner.
- Place Root Combiners closer to your power sources rather than centralizing too early.
- Take full advantage of **wire length** to prevent using another component to extend a wire.

Learn more about RC-Buses and Pyramid stacking in the Power Bus Theory section.

**Troubleshooting Max Depth Violations**

If a player is seeing a **Short Circuit / Max Depth** error and suspect it's due to Max Depth, here's how to narrow it down:

- Begin by identifying **which Root Combiner input is showing the error**.
- From that input, trace the **entire wire path back to the power source**.
- Count every component that power flows through, batteries, splitters, branches, etc. Include the power source.
- If **any single path** exceeds **16 components**, that path is invalid and will trigger the error.
- Repeat this process for **each power source** connected to the combiner. The error occurs if **only one** of them breaks the limit.

It’s always the **longest path** that matters, not the average, and not the shortest.

This becomes especially tricky in:

- Circuits where **power is split and re-merged** (like a C-Bus)
- Setups that combine **power from distant locations** using multiple RC-Buses
- Battery backups with **shared outputs** routed through combiners

These designs introduce multiple valid paths, making it harder to troubleshoot a Max Depth violation. Players must manually check each path to ensure compliance, or plan ahead, to avoid accidentally hitting the 16-component limit.
