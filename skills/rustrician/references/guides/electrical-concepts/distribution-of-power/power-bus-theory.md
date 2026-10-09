# Electrical Concepts: Distribution of Power › Power Bus Theory

This section explains how electricity actually moves through a circuit: how power propagates, the order components process it, how delays and depth limits affect behavior, where short circuits occur, and the rules that govern how power flows and fails.

### Power Bus Theory

In the real world, a power bus is a common electrical conductor, or group of conductors, that collects and distributes electrical power into multiple circuits or devices. In Rust, power also needs to be collected and distributed into multiple circuits or devices. The real world has things like a Slack Bus, PV Bus, PQ Bus and so on, each serving a specific purpose or role. In Rust, there are recurring distribution circuits players use, each with a specific purpose or role, but have never been recognized as Rust's version of a power bus.

When power needs to be moved from point A to point B, most players already know how to do it instinctively and without putting too much thought into it. The purpose with this section is to **name, define, explain and formalize these patterns** players are already using, but without realizing it.

Over time, players naturally combine branches, splitters, and logic components in repeatable ways. Power Bus Theory gives those patterns clear names and definitions, so they can be easily discussed, compared, and reasoned about without re-explaining the wiring every time.

By assigning names to common power flow structures, it allows experienced players to communicate designs quickly and helps newer players understand why a branch is used instead of a splitter, or why one structure scales better than another.

The goal is shared language and clearer thinking:

- A way to describe common power layouts quickly
- A framework for deciding which structure fits the job
- A bridge between intuitive building and intentional design

**Power Bus Theory** turns “stuff players wire automatically” into tools players can analyze and optimize.

In any circuit, electricity must need to get from point A to point B and more. Typically travelling from places like a power source (Wind Turbine, Solar Panel, Generator) to components that need it (turrets, lights, doors, automation systems). A Power Bus provides the structure and organization to manage this flow of power. It controls how much power goes where, in what order, and under what conditions.

A **Power Bus **can be as simple as a single component or as complex as a multi-component distribution system. Its job is to direct power in a way that matches the needs of the circuits it supplies.

Think of a Power Bus like the electrical breaker or fuse panel in a real home:

- It splits power into different circuits (kitchen, furnace, lights).
- It limits how much power each circuit can draw (10A, 15A, 125A).
- It keeps everything organized, efficient, and safe.

In Rust, instead of breakers or fuses, players will use Electrical Branches, Splitters, Root Combiners and Memory Cells to collect and distribute power. Choosing when to use each bus is entirely situational and depends heavily on circuit type, function, and priorities. Here are key questions players should ask:

- How critical is the circuit or component?
- Does it need strict prioritization?
- What is the primary power source?
- Is Active Usage a concern?
- Is the circuit always active or event-driven?
- What is the best way to simply reduce demand?
- Will this circuit be expanded later?
- Is material cost a concern?
- Is simplicity or resilience more important?
- What happens if part of the bus is destroyed?
- What combination of buses is needed to best serve a circuit's needs?

**At its core, a Power Bus helps manage:**

- **Capacity**: How much power is delivered.
- **Priority**: What gets power first during shortages.
- **Resilience**: How the system behaves if power drops or components fail.
- **Efficiency**: How much Root Power must be produced to meet needs.

#### Fixed Bus (F-Bus)

A **Fixed Bus**, or **F-Bus** is a Power Bus where specific, fixed amounts of power are reserved for each connected circuit or component. It guarantees that each destination always receives the same amount of power, regardless of whether or not that circuit is actively consuming power. It is the most stable and predictable form of power distribution, sometimes trading efficiency for reserved power delivery and strict prioritization.

In an F-Bus, each output is set to a specific value, providing an exact amount of power to each circuit or device. This power is reserved and always held, regardless of whether the downstream device is online, idle, damaged, or destroyed, the bus will still send the configured power.

It’s equally useful for both end devices (like turrets or lights) and for powering logic components (like splitting signal paths or sending reset triggers). Any time an Electrical Branch is used to explicitly control power levels to a specific location, an F-Bus is created. This simple mechanism becomes a powerful way to control power flow.

##### Core Structure

When players start working with components that have **multiple outputs**, it's very important to know the order in which they output power.

- **Electrical Branch:** Power Out updates first, then Branch Out. Removal of power follows the same order.

An F-Bus can be a **single Electrical Branch** or a **chain of them**. As each Electrical Branch receives power, it will reserve power for the Branch Out connection, pass along the rest via Power Out, and then release the reserved power out Branch Out. Assuming there is constant power, this structure ensures consistent delivery of power, regardless of how many components are active or inactive.

**Example structure:**

Source of Power → Electrical Branch (Branch Out: 11) → Turret 1

└ Power Out → Electrical Branch (Branch Out: 30) → Lights

└ Power Out → Electrical Branch (Branch Out: 3) → CCTV

##### Prioritization & Load Shedding

**Load shedding is** the ability to control what parts of a circuit shut down first to maintain the run times of more important areas during periods of low power. The F-Bus does this through **prioritization**. By reserving power first before passing on the rest, the first Electrical Branch to receive power has the highest priority. The last Electrical Branch has the lowest. When the input power starts to decrease, branches with the lowest priorities will lose power first. The highest-priority circuits at the beginning of the F-Bus will stay powered as long as enough power is available. Once a Branch Out value equals or exceeds incoming power, lower-priority Electrical Branches past it will brown out.

**Benefits**

- **Efficient power delivery**: circuits and components receive only their needed amount of power.
- **Prioritization**: branches towards the beginning maintain power longer during shortages.
- **Predictable behavior**: makes power degradation graceful, not sudden.
- **Great for critical defense systems**: support specific and predictable power delivery.
- **Supports scaling**: can be extended with additional branches or chained buses.

**Limitations**

- **Inefficient for idle or event-driven circuits**: power is reserved even when the circuit is unused.
- **Higher baseline power demand**: total power production must cover all reserved Branch Outs.
- **Material costs per output**: each Electrical Branch costs 75 Metal Fragments for 2 outputs.
- **Does not limit battery Active Usage**: reserved power does not limit the Active Usage that an Inline system can experience.
- **Material and wiring complexity**: large F-Bus chains can become harder to manage.

#### Dynamic Bus (D-Bus)

A **Dynamic Bus**, or **D-Bus**, is a type of Power Bus where incoming power is automatically and evenly distributed across all connected outputs.

It is built using one or more Splitters and is ideal for circuits where each connected device or component needs the same amount of power and power shedding prioritization is either unnecessary or undesirable.

A D-Bus is dynamically responsive. As input power levels change, or as devices are added, removed, and destroyed, the Splitters automatically adjust how power is divided.

##### Core Structure

When players start working with components that have **multiple outputs**, it's very important to know the order in which they output power.

- **Splitter:** Power Out 1 updates, then Power Out 2, then Power Out 3. Removal follows the same order.

The D-Bus is built using the **Splitter**, either as a standalone unit or in groups. Each output receives an equal portion of the available power, making this bus ideal when every connected component needs the same amount of power.

**A common D-Bus pattern is a pyramid or cascade:**

- One Splitter → Two Splitters → Six outputs.

This is ideal when identical devices need to be powered, such as turrets, water pumps and batteries wired in series.

- All outputs should receive roughly equal power (within 1rW of each other when dealing with odd amounts of power).
- It makes the division of power easily predictable.
- **Beware:** this reduces available power per output quickly if power is limited.

**An uncommon D-Bus pattern is a chain:**

- Output 3 of Splitter A → Input of Splitter B → Output 3 of Splitter B → Input of Splitter C
- **Beware:** Each link in the chain further reduces the available power at the final outputs.

Each chained Splitter is splitting up to 1/3rd of original power, by up to 3 times. This significantly reduces available power the further down the chain the Splitter is placed, and removes the ability for future expansion. This wiring is **not recommended** unless extremely low draw circuits are being powered or the player has a solid understanding of the dynamics of this method.

##### Load Shedding & Priority Behavior

**Load shedding** i**s** the ability to control what parts of a circuit shut down first to maintain the run times of more important areas during periods of low power. The D-Bus does not allow for easy management of load shedding. Once there is not enough input power, the connected outputs will cease to function, even if there is enough total power remaining to maintain 1 or 2 of the connected circuits or components.

Although a D-Bus is generally "equal," Splitters have built-in **output priority**:

- **Power Out 1** is powered first.
- **Power Out 2** is powered next.
- **Power Out 3** is powered last.
- This order is the same when the Splitter loses power.

This order of **Power Flow** also generally means that after all 3 outputs send power, the component that is connected to Power Out 1 will be the next component to perform an action, followed by the component connected to Power Out 2 then Power Out 3.

This priority is also applied when splitting odd amounts of power. Any remaining power that cannot be divided equally between the connected outputs is given to Output 1 first, followed by Output 2.

This is important for signal-based circuits or sequenced activation.

It can be used to control the order of actions such as:

- Which Memory Cell is triggered first.
- Which door opens first.
- Which signal path activates last.

**Benefits**

- **Power efficient:** when all circuits require the same wattage
- **Automatically redistributes:** power when outputs are removed
- **Low material cost:** 1 Splitter = 100 metal fragments, 3 outputs
- **Great for identical devices:** or logic circuits with equal signals
- **Simple to design**: no need to configure individual output amounts
- **Easy signal sequencing**: using output order for logic circuits

**Limitations**

- **No load shedding prioritization**: all outputs are treated equally
- **All circuits fail together:** if input power drops below required threshold
- **Limited control:** over which outputs stay active under strain
- **Chaining splitters:** reduces output power quickly and may limit scalability

#### Configurable Bus (C-Bus)

A **C-Bus**, short for **Configurable Bus**, is a logic-based power distributor that only activates when power is specifically needed. It operates as a conditional bypass circuit that intelligently diverts and applies power to a circuit only when triggered, thereby saving energy during idle periods.

It is not a physical component like the Splitter or Electrical Branch, but rather a logic design that combines multiple components, specifically the **Memory Cell**, **Electrical Branch**, and **OR Switch**. Without the logic system in place, the bus does not exist.

The C-Bus can be thought of as an intelligent F-Bus. Instead of always reserving power like a traditional F-Bus, it reserves power only when activated, returning unused power back to the main line.

##### Core Structure

When players start working with components that have **multiple outputs**, it's very important to know the order in which they output power.

- **Memory Cell:** When switching from one output to the other, Output always reacts before Inverted Output. If the Memory Cell is in its default state (power coming from Inverted Output) and receives a pulse on Set, the Output will start sending power before Inverted Output stops sending power. If a pulse is then applied to Reset, the Output will stop sending power before the Inverted Output starts sending power. This means that when toggling states, there is a brief moment where both outputs will be active or inactive simultaneously before settling into the final state.

Every C-Bus consists of three components:

- **Memory Cell**: acting as the power path controller.
- **Electrical Branch**: regulates the amount of power delivered when active.
- **OR Switch:** merges bypass and active power paths.

At its core, every C-Bus has two paths:

- **Main Line** - default power flow
- **Circuit Path** - activated power flow

**Main Line (Default State):**

- Power passes from the Inverted Output of the Memory Cell to the OR Switch and continues on.
- The destination circuit remains unpowered.

**Circuit Path (Siphon State):**

- Memory Cell switches to the Output, which powers an Electrical Branch.
- The Branch Out is set to deliver a defined amount of power to the destination circuit.
- The remaining power flows through Power Out, merges via the OR Switch, and rejoins the main line.

This creates an on-demand power distributor with no wasted reserved power during idle periods. What controls the activation and deactivation is entirely dependent on the situation and player preference.

##### Operational Modes

C-Buses can operate in 4 distinct modes, depending on how the Memory Cell is controlled:

###### Auto Set Auto Reset (Fully Automatic)

- The Memory Cell is controlled via **SET** and **RESET** inputs.
- When the trigger (ex: HBHF Sensor) provides power to SET, the Circuit Path automatically activates.
- When the trigger stops sending power, RESET is automatically activated, returning flow to the Main Line.

**Behavior:** Circuit turns on when the trigger is present, turns off automatically when the trigger disappears.

This Auto Reset behavior can be achieved through another method. It doesn't need to use a second Electrical Branch as demonstrated.

- The goal is simply to have power applied to Reset for the system to automatically reset after activation.
- If players are already taking advantage of Control Batteries, like the one used in The Kore or a BCN Core, then the second Electrical Branch is not needed

###### Manual Toggle (Player Controlled)

- The Memory Cell is controlled via **TOGGLE** input.
- Players manually activate/deactivate the Circuit Path with a button (or any momentary signal).
- Outputs remain in the last state until toggled again.

**Behavior:** Circuit stays ON or OFF until the player manually changes it.

###### Auto Set Manual Reset (Hybrid Control)

- The Memory Cell is SET automatically by a trigger (ex: Laser Detector).
- RESET is controlled manually by the player (ex: Button).
- Useful for circuits that must be acknowledged or intentionally reset after an automatic activation.

**Behavior:** Automatically turns on when triggered, but requires player intervention to turn off.

###### Inverted Set Auto Reset (Failure Controlled)

In the previous methods, power was always bypassing the circuit until called upon. This is a more advanced variation where the Memory Cell is Set by default and only Resets when the circuit fails.

- Power flows through the circuit (ex. SAM Site) and Sets the Memory Cell
- Control Power is used to supply power to the Memory Cells Reset.
- If the circuit (ex. SAM Site) is destroyed, power it no longer applied to Set and Reset flips the power path.
- **Beware:** In its default state, the Memory Cell will not send power to the circuit (ex. SAM Site). That means Set will also not get power. Players will need to toggle the Memory Cell first, power the circuit and get power to Set before connecting Control Power to Reset.

**Behavior:** Automatically swaps the power path when there is a failure of the circuit.

**Benefits**

- **Power-efficient**: no energy waste when the target circuit is inactive.
- **Flexible**: supports manual, automatic, or hybrid logic triggers.
- **Perfect for situational circuits:** e.g., farms, traps, alarms.
- **Reduces standby power draw**: freeing power for higher-priority needs.
- **Can reintroduce unused power:** back into the grid via OR Switch.

**Limitations**

- **Requires more components:** than D- or F-Bus.
- **Complexity:** increases with each logic variation.
- **Requires understanding:** of Memory Cell behavior and logic principles.

#### Root Combiner Bus (RC-Bus)

An **RC-Bus**, or **Root Combiner Bus**, is a specialized wiring structure used to merge electricity from multiple sources into a single unified power line. It acts as a power aggregator, collecting electricity upstream before it is stored, regulated, or distributed.

Unlike output-focused bus types like the F-Bus or D-Bus, the RC-Bus does not route electricity to components. Instead, it gathers electricity from solar panels, wind turbines, generators, batteries, and other valid sources, and delivers it downstream through one clean, centralized line.

##### Core Structure

An RC-Bus is built entirely from Root Combiners. Each Root Combiner merges power from two sources, like Solar Panels, Wind Turbines, or Generators, into a single output.

- Each Root Combiner has two inputs and one output.
- To combine more than two sources, multiple Root Combiners are chained in tiers or pyramid formations.
- The final output becomes the main power line, typically sent to a battery bank or core system.

The RC-Bus performs no distribution, only collection. It is designed solely for upstream power merging.

**Two important factors must be considered when designing RC-Bus layouts:**

- **Max Depth Limit**: Each component in the power path contributes to signal depth. If any path from a power source to the final Root Combiner exceeds 16 components, it will trigger a Max Depth error. This includes sources, batteries, logic components, and combiners. For detailed examples, see the Max Depth & Short Circuit Errors section.
- **Battery Behavior**: When combining batteries through Root Combiners, each battery registers the full Active Usage of the circuit. This can cause excessive battery drain if not properly planned for. For a more detailed breakdown, see Root Combiner Behavior in Power Theory and Efficiency section.

###### Combiner Layouts

When building an RC-Bus, players must choose how to structure their Root Combiners. There are two main methods, and while both technically work, only one is recommended for long-term stability.

**Daisy Chain (Not Recommended)**

Most new players instinctively use this method due to its simplicity but it comes with hidden risks.

- **How it works**:
  - Connect Combiner 1 to two power sources.
  - Take the output of Combiner 1 and connect it to one input of Combiner 2.
  - Add a third power source to Combiner 2’s remaining input.
  - Continue this process in a linear chain: each new Combiner merges the previous output with one new source.
- **What’s the problem?**
  - Each Combiner in the chain adds one unit of depth between the final output and the earliest source.
  - The Root Combiner system in Rust has a Max Depth limit of 16 components.
  - Daisy Chains quickly reach this limit, especially when mixing in batteries or other logic components.
- **Result**:
  - A few extra devices or a battery backup can push your circuit over the limit, resulting in Max Depth / Short Circuit errors.
  - This layout becomes unstable and hard to expand or troubleshoot as a circuit grows.

**Pyramid (Recommended)**

A structured, layered layout that minimizes depth and supports larger builds.

- **How it works**:
  - Combine power sources in pairs, filling one Root Combiner at a time.
  - Once all sources are paired, combine their outputs into new Root Combiners.
  - Repeat the pairing process layer by layer, until all power is unified at the top of the pyramid.
- **Why it’s better**:
  - Only each layer adds to circuit depth, not each individual Combiner.
  - A pyramid that combines 8 sources only reaches 4 depth, compared to 8 depth for a daisy chain.
  - Much more scalable, reliable, and organized for large RC-Bus trees.
- **Design Tip**:
  - If one source remains unpaired at any layer, add another Combiner to merge it with the leftover from a previous layer.

**Benefits**

- **Efficient scaling**: supports many power sources
- **Clean consolidation:** reduces wire clutter by merging lines early into a single output
- **Compatible with all source types:** solar, wind, generators and batteries
- **Maximizes output control:** ideal for feeding into downstream bus systems like the BCN Core

**Limitations**

- **No load sharing for batteries:** batteries combined in series will each register the full Active Usage of the circuit
- **Subject to Max Depth:** chaining too many components or wiring inefficiently can break the circuit
- **One-way design:** does not allow for looping power through itself that has already passed through it once before
- **Requires planning:** depth, layout style, wire length and placement must be considered to avoid errors

#### Hybrid Bus (H-Bus)

A **Hybrid Bus**, or **H-Bus**, is a composite power distribution system that combines multiple bus strategies, Fixed (F-Bus), Dynamic (D-Bus), and Configurable (C-Bus), within a single architecture. The H-Bus is not a standalone design, but rather a philosophy and approach to solving complex power routing needs using the most effective bus type for each part of a circuit or subsystem.

Rather than sticking to a single distribution method, the H-Bus leverages the strengths of each individual bus style to balance efficiency, control, scalability, and reliability. This makes it the most flexible and capable bus system.

**Note**: While the H-Bus may sound advanced, many players already use hybrid strategies without realizing it. Connecting F-Bus segments for turrets, D-Bus cascades for Electric Furnaces, and C-Bus siphons for conditional systems, all within the same circuit, is an H-Bus in action.

##### Core Structure

The H-Bus is built around segmented power layers, with each segment powered and regulated by the bus style that best fits its function:

- **RC-Bus segments **collect power from multiple sources into a single usable line.
- **F-Bus segments** provide precise and reserved power where reliability, predictability and prioritization are required.
- **D-Bus segments** handle mass distribution where devices have the same draw and power can be evenly split.
- **C-Bus segments** dynamically provide power to systems as required.

The combined cluster of these segments is the H-Bus. It is often powered from a common source and is either directly attached to one another or separated by any number of components, including switches, logic components, batteries and lights, to isolate or synchronize operation.

Each segment can be debugged and modified independently, but overall performance is optimized through central planning.

**Benefits**

- **Maximum flexibility:** combine multiple bus types to suit each circuit's needs
- **Efficient power use:** minimizes waste by assigning the right distribution method per device group
- **Supports complex designs:** ideal for large or layered systems with varying power demands
- **Modular by design:** easy to expand, segment, or upgrade over time
- **Built-in prioritization and logic:** enables smart control, fallback behavior, and automation
- **High resiliency:** segments can continue functioning independently even if others fail

**Limitations**

- **High learning curve:** requires solid understanding of RC-Bus, F-Bus, D-Bus, and C-Bus behaviors
- **More complex wiring:** can be difficult to troubleshoot without labeling or documentation
- **Increased component usage**: typically uses more branches, switches, and logic parts
