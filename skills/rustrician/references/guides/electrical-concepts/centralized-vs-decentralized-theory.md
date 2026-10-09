# Electrical Concepts: Centralized vs Decentralized Theory

## Centralized vs Decentralized Theory

When discussing **centralized** or **decentralized** theory, we are referring to two distinct aspects:

- The **physical placement** of components throughout a base
- The **flow of power** from generation to the circuits that consume it

A **fully centralized system** places all core components, such as batteries, switches, logic, and distribution in a single physical location. Power is collected, stored, routed, and managed through one central circuit.

A **fully decentralized system** assigns electrical responsibility to multiple locations throughout the base. Each area or subsystem maintains its own independent circuit, complete with a dedicated power source, battery, and logic. These circuits function autonomously and are typically not aware of or connected to one another.

Both approaches exist on opposite ends of a spectrum. Most bases will fall somewhere in between — using a mix of centralized infrastructure for critical systems and decentralized elements for redundancy or physical reach.

There is no single “best” layout. The ideal approach depends on:

- Server settings and component limits
- Wipe frequency
- Group size and playstyle
- Base footprint and vulnerability
- Functionality vs redundancy
- Personal comfort with Rustricity design

The **best circuit** is the one that does **what** it needs to — **when** it needs to — in the **way** that was needed.

This section begins by exploring the **physical placement** of electrical infrastructure, followed by how these principles apply to circuit layout and power flow.

### Physical Locations

When discussing centralized or decentralized locations, we are not referring to the placement of all electrical components throughout the base. This section does **not** cover:

- Auto Turrets mounted on roofs
- Heaters placed throughout Arctic bases
- The placement of Ceiling Lights in a farm

Instead, the focus is on the **core infrastructure** — the systems that collect, store, control, and distribute electricity across the base. This includes:

- Collection points from **power sources**
- Placement of **battery backups**
- Locations for **distribution logic**
- Control centers for automation and monitoring

In essence, it’s about where a Windmill sends its power, or where the wire powering an Auto Turret originates. These placements shape the survivability, security, and scalability of a base’s electrical network.

- A **well-planned location strategy** is just as important as circuit design. Where these systems are placed can determine whether they resist raids or are taken out with a single breach of a wall.

#### Centralized Locations

A fully **centralized location** refers to a single room or compact area that houses all of the base’s core electrical components, including batteries, logic circuits, collection and distribution systems. This location serves as the **nerve center** of the electrical network. In real-world infrastructure, this would be called a **Main Distribution Frame (MDF),** a central node where power is received, stored, routed, and managed. Due to the nature of its critical role, it deserves protection **equal to or greater than** that of the Tool Cupboard.

Centralizing components in one location offers major convenience. It’s easier to build honeycomb, add doors and traps, and reinforce one high-value room. However, this comes with a tradeoff: **when raiders break into this room, a single rocket will disable every system at once.**

Where this room (MDF) is placed must be **intentional and pre-planned**, not improvised. A well-designed base doesn’t sacrifice bedrooms or loot rooms just to make last-minute space for electrical infrastructure. Planning ahead ensures that this high-value room has both the security and space it needs and that wires can reliably reach the systems they’re meant to power without compromising layout or protection.

For protection, it’s not just about adding walls. Location matters. Positioning the room deep within the core adds raw durability through layered protection and honeycomb. Placing it within the China Wall or in a Gatehouse floor offers protection through misdirection and raiders may overlook it entirely. Regardless of the method, the key is building these locations into the base from the start. They are not just utility rooms, they are critical infrastructure and deserve thoughtful placement from the beginning.

No matter the location, **concealing wires** is essential. This is not about keeping wires clean and tidy. It's about hiding them from other rustricians so they cannot trace them back to their origin.

- Avoid running wires on the exterior of the base, such as the roof. Bring the wire through the floor and into the interior of the base before routing towards the central location (MDF).
- When running wires along the ground or foundations, take advantage of Wire Slack. Sink them into the foundations or ground and hide them from sight.
- Wires can be 30 meters long, don't be afraid to use the whole amount. Utilize decoy paths or route wires through multiple entry points into the MDF if necessary. Avoid having all wires taking the same path, pointing at the single room.

Wire length is a natural constraint. In small bases, most devices can be reached directly but in large bases, **wire extension components** may be required. These components must be placed securely. For instance:

If a **Blocker** is used to extend a wire to a Turret, the Blocker should not be easier to destroy than the Turret itself.

Any passthrough-capable component can serve this function. Items like the Blocker, OR Switch, Memory Cell, Smart Switch are excellent choices because they do not consume any power and they cause no extra Active Usage on batteries. If these components cannot be adequately secured, players can consider components that can camouflage but consume a little bit of power. For instance, the Industrial Light is a reliable alternative. They make a great choice due to their low crafting cost and their ability to stealthy camouflage as just another light on the base.

#### Decentralized Locations

Fully **decentralized locations** spread power infrastructure across multiple rooms, making electrical networks more resilient during a raid or just easier to run wires. A decentralized layout distributes core electrical components across two, three or more rooms. Each of these rooms serve as a regional hub that is designed to manage its own power generation, storage, and logic.

In real-world infrastructure, each of these would be called **Main Distribution Frames (MDFs)**. They are central nodes where power is received, stored, routed, and managed for a specific zone or area. They operate completely independently without any interconnections between one another.

- Think of each MDF as a self-contained, localized circuit room, producing and regulating its own power for a specific zone, like the North, South, East and West sides of a base.

However, in some bases, each decentralized room may be interconnected with one another within the overall circuit design. When it does, these decentralized rooms will function as **Intermediate Distribution Frames (IDFs)**. These are secondary distribution hubs linked to a central **Main Distribution Frame (MDF)**. However, whether a room qualifies as an IDF is determined by its electrical role and interconnection, not merely by the fact that multiple rooms exist.

💡 A common example is placing an **IDF** room near the roof as a collection point for Root Power from wind and solar before forwarding it to a secure **MDF** deeper inside the base for backup and distribution.

These rooms should be intentionally integrated into the base design, not added as an afterthought, to ensure they're both secure and functional. These locations deserve the same planning and protection as a Tool Cupboard.

They should also be:

- Hard to locate and/or heavily protected
- Placed in areas raiders wouldn’t expect or prioritize, eg. in the floor
- Distributed in a way that reduces the impact if a single one of them is breached

The more spread out these locations are, the better their **resilience,** especially when a base is large. With very large bases, raiders often "cut a base in half" with rockets. With decentralized locations, even if one room is lost, the others should continue to operate without interruption.

Decentralization also brings **efficiency by saving time**. By placing power near where it’s used, players reduce the need for long, complicated routes needing lots of running back and forth and/or the use of wire extensions. It can simplify circuit planning by helping eliminate extra components just for distance.

💡 Turrets above the gatehouse don’t need to be powered from deep inside the base. They can be powered by a **fully independent MDF** built into the gatehouse. This room would include its own power generation, battery backup, turret control logic, and sensors, operating completely separate from the main base infrastructure.

Each decentralized location should avoid drawing attention through visible wiring. **Wire concealment** is critical. Distribute entry points and leverage full wire lengths creatively.

- Avoid running wires on the exterior of the base, such as the roof. Bring the wire through the floor and into the interior of the base before routing towards the MDF.
- When running wires along the ground or foundations, take advantage of Wire Slack to hide them from sight.
- Wires can be 30 meters long, don't be afraid to use the whole amount. Utilize decoy paths or route wires through multiple entry points into the IDF if necessary. Avoid having all wires take the same path, pointing at these rooms.

Decentralization offers more than just safety, it delivers smart efficiency. With power already positioned near where it's needed, circuits require fewer passthrough components, fewer exposed wires, and fewer compromises. In large bases, these small advantages add up to a major difference.

### Circuit Design

When discussing centralized, decentralized, or hybrid circuits, what’s really being described is how electricity moves from power sources to the systems that need it. This isn’t about physical placement of components, it’s about whether everything runs through **one single circuit** or gets split across **multiple smaller ones**.

A **centralized circuit** sends all power into one system that handles everything: battery backup, turrets, sensors, lights, and more. There’s one set of batteries, one set of logic, and one set of wires feeding the whole base. This creates a single, unified circuit.

A **decentralized circuit** splits things up. Each area or subsystem gets its own power source, battery backup, and logic. These areas or subsystems run independently from one another without relying on a single power core.

This decision impacts how the base is built. A well-designed circuit avoids wasting power, losing everything to one rocket, or needing extra rooms just to stretch wires. Understanding the difference early makes it easier to plan circuits that match the layout, power demand, and playstyle.

#### Centralized Circuit (Image needed)

In a base, a centralized circuit is one in which all power sources, storage, logic, and distribution are combined into a single unified system. Every electrical component in the base, from turrets and sensors to lighting and water pumps, receives power through this one single circuit.

Power sources such as Wind Turbines, Solar Panels, and Generators feed into a single battery-backed core, typically an Inline Backup (The Kore) or a Bypass Backup (BCN Core). These cores provide built-in double redundancy where if the sources are destroyed, the battery will continue to supply power, or if the battery is lost, direct source power may continue supplying all or part of the circuit. No matter the situation, they will avoid selecting a power path that is supplying 0rW.

Despite this redundancy, centralized circuits have an inherent vulnerability, a single point of failure. In a standard Inline backup, the battery is the point of failure. In modern backups, like the Kore or BCN Core, it’s the final OR Switch that connects the 2 halves of the power core to the distribution system. If this OR Switch is destroyed the entire base circuit goes offline. No subsystems will continue functioning, regardless of battery charge or available source power.

**Power Capacity Limits**

While centralized circuits can support substantial power loads, they are typically limited to around 1600rW. This limitation arises from 2 sources:

- The mechanics of the Root Combiner, which has a maximum depth of 16 components between it and any connected power source.

AND

- The amount of power sources needed to produce this much power.

If a centralized core is designed to support 1600rW worth of battery backup, that requires combining 16 Large Batteries together using multiple Root Combiners. These, along with the batteries, additional components in the Power Core and the combiners for the power sources, all add to the circuit’s total depth.

In practice, this means a standard BCN Core powering 1600rW will be able to support roughly 16 power sources. These sources will need to be high-elevation Wind Turbines to provide the sustained output needed to maintain such a large centralized system.

This is typically more than enough power for nearly all use cases, but it also marks the practical ceiling for centralized circuits. Beyond this point, circuit depth, wire clutter, and repair difficulty begin to outweigh the simplicity of a single system.

**Key Traits**

- All power sources are combined into one core
- A single circuit powers every system, subsystem, and device
- Distribution is centralized through a single bus
- No electrical independence between subsystems
- Best suited to small bases or tight, compact layouts

**Advantages**

- Simplified wiring design
- Efficient power use, no duplicate systems
- Quick to deploy and easy to monitor
- Compact and ideal for limited space

**Disadvantages**

- Single point of failure at the OR Switch
- Poor scalability in large bases
- Only 1 power core. If it fails, all systems go offline
- Challenging to route wires across long distances without IDF (Intermediate Distribution Frame) closets or wire extensions

Centralized circuits are ideal for smaller bases or self-contained systems where all devices are in close proximity and easy to wire. As base size or power requirements grow, the limitations of a single unified circuit often outweigh its simplicity.

#### Decentralized Circuits (Image needed)

Decentralizing circuits really comes down to how extreme a player wants to take it. The idea behind decentralizing is adding security and reliability by segmenting different systems and areas with their own independent power supplies and backups. Instead of all systems drawing power from a single unified system, power is divided across separate cores, each responsible for specific locations or functions.

Each decentralized unit is essentially a centralized circuit, complete with its own power source, battery backup, logic, and distribution, but scoped to a limited area or purpose. Basically, any base that is using 2 or more circuits is decentralizing.

For example, a base may have a dedicated circuit for each side, North, South, East, and West, plus an additional core for the roof. The base may dedicate a core to its industrial system, or one for a Farm. Each one operates independently and a breach or failure in one area does not affect the others.

**Key Traits**

- Composed of multiple self-contained circuits
- Each system has its own power, battery, and logic
- Designed around location, function, or both
- Systems do not rely on a central bus or core

**Advantages**

- Decentralized circuits offer high resilience, as there is no single point of failure that can bring down the base's entire electrical system.
- Each system has local control, with logic placed close to the devices it manages.
- These circuits scale more easily since new systems can be added without placing strain on a central power core.
- Their structure often aligns better with the physical layout of a base, such as organizing by region with one Main Distribution Frames(MDF) per area.

**Disadvantages**

- The component cost is higher, as each independent circuit requires its own batteries, switches, branches, and other components.
- The overall system becomes more complex and requires additional planning to maintain clear organization.
- Some logic may need to be duplicated across multiple circuits, leading to redundant setups.
- Monitoring becomes more difficult because each circuit operates independently and must be checked separately.

Decentralized circuits are often the only practical option in large or segmented bases. When distance, compartmentalization, or redundancy is important, decentralization offers greater reliability and flexibility.

#### Hybrid Circuits (Images needed)

Hybrid circuits centralize for convenience and decentralize for security. Root Power is managed by one part of the circuit and each subsystem or area has its own backup so a failure does not pull everything down.

**Recommended approach:** Centralize sources, decentralize backups. Root‑combine wind, solar, and generators into one feed and route it to charge or feed separate backups for different areas of the base (North, South, East, West) or systems (turrets, farm, industry, etc). Control stays simple. Risk stays isolated.

**Discouraged approach:** Decentralize sources, centralize backups. This approach works against both goals of hybridizing. As a thought exercise, let’s consider inline batteries.

- **Target:** 18 turrets = 180rW.
- **Combined inline backup (bad):** 2× Large Batteries, each with its own power supply, behind a combiner → each sees **100 Active Usage** → each battery needs **125rW** at 80% efficiency → for a total of **250rW** sustained production of Root Power.
- This approach requires larger amounts of power production and makes the circuit more vulnerable, not more secure.
- **Separate inline backup (good):** split turrets into 2 groups, 9/9 → batteries will only see **90 Active Usage** each → each battery only needs **114rW** at 80% efficiency → for a total of **228rW** sustained production of Root Power.

**Back to the recommended approach.** Centralize sources, decentralize backups, then pick an implementation path based on goals:

- **Inline (classic inline):** Fastest to set up, minimal components, just watch batteries Active Usage and ensure there is enough power production to sustain their loads.
- **Nih Core (non-battery-checked bypass):** Moderate complexity and built with a single core for collecting and routing Root Power, but each area or subsystem gets its own backup battery.
- **The Kore/BCN Core (battery-checked-backups):** Has the highest level of complexity and component count. Each area or subsystem has a complete Kore or BCN with a battery. Only the power sources are centralized before routing to each power core.

**Inline (classic inline)**

Inline hybrid keeps sources centralized and assigns one inline battery per area or subsystem. Each battery must receive an input equal to or greater than, Active Usage ÷ 0.8, to maintain a positive charge. If the priorities of the battery are equal and/or the amount of power each battery needs to receive is equal, use a Splitter to distribute power. When priorities or the amount of power each battery needs differs, use Electrical Branches to fix the amount of power and/or establish the batteries priorities. It’s simple wiring and a fast setup, but continuous operational costs more because every charged rW pays the 20% tax.

**Modern Nih Core (non-battery-checked bypass)**

Keep main power centralized and route it into a single Nih Core. Set the main Electrical Branch to a value that is needed to support the entire circuit's load. Give each area or subsystem its own OR Switch and battery, then establish the distribution paths for main power and battery charging.

- Send main power from the Memory Cell to either Splitters (even distribution) or to Electrical Branches (fixed power per area or subsystem).
- Feed main power into Input A of an OR Switch for each area or subsystem. This forms the bypass path.
- From the Nih Core’s battery-charge output (the OR Switch that charges the Nih Cores battery), distributes charge to each area or subsystem’s battery using either a Splitter (even) or Electrical Branches (priority).
- Send power from each battery into an Electrical Branch that is set to a value equal to or less than the amount of power getting delivered to Input A of the OR Switch. This prevents the battery from draining when Root Power is sufficient.
- Connect Branch Out from that battery branch to Input B of the area or subsystem’s OR Switch. This forms the battery-backup path.
- Use Control Power to RESET the Nih Cores Memory Cell.

When power production runs low, or a source is destroyed, the batteries for each area or subsystem will take over, and what little power is still getting produced will get routed to the batteries to slow their discharge. The only flaw with this approach is that if a battery is depleted or destroyed, the core will still try to let the battery take over when power production runs low.

**The Kore or BCN Core (battery-checked-backups)**

Root‑combine power sources once for convenience, then build one core per area or subsystem so battery‑check logic remains accurate. Feed evenly, or branch for priority per area or subsystem. This achieves clean failover with battery verification, but increases work load for the player and component count. Given the per‑subsystem or area core requirement, centralizing sources is optional. Only centralize the power sources when shared monitoring and charge control outweigh the added wiring, otherwise stick with standard decentralization practices and run power sources to their local cores.

- Build a Kore or BCN for each area or subsystem.
- Deliver main power to each core’s main input. Use either Splitters for even distribution, or Electrical Branches for fixed or prioritized power per area or subsystem
- From each core’s main output, distribute power to the components the core is expected to support.

**Notes**

- **Space planning:** Each core will need 3 rooms. 1 room for the Root Power path, a second room for the battery backup path with a 3rd, and the most important room, for the OR Switch to combine the 2 sides together. Without the OR Switch, everything that core was powering will be offline. Treat each room as critical infrastructure.
- **Source centralization trade:** When every subsystem has its own Kore/BCN, centralizing sources is optional. It may be preferential to run power sources to their own local cores.

**Key Traits**

- Centralized Root Power, decentralized battery backups per area or subsystem.
- Minimal dependencies between areas to prevent a total failure.
- Inline batteries require Active Usage / 0.8 input to hold charge.
- Kore/BCN hybrids require one core per subsystem to preserve battery‑check behavior.
- Source centralization is optional when every subsystem has its own Kore/BCN.

**Advantages**

- Limits total system failures. One area or subsystem can fall without dropping the rest.
- Centralized power sources simplify distribution and growth.
- Shorter wire runs when backups and distribution live near their loads.

**Disadvantages**

- Higher component count and build time vs a purely centralized circuit.
- Inline hybrids pay 20% charge overhead and are inefficient for always-on loads.
- Battery-checked bypass hybrids are possible but add complexity that may not pay off for most bases.

If runtime and redundancy are the top goals, a hybrid circuit is not what the player is looking for. Instead, use a primary, centralized **BCN Core**, then attach **secondary backups** to every critical area or subsystem. The BCN provides verified failover and simple monitoring. The secondaries add local autonomy and extend battery-only operation when sources and the primary backup are down.

### Distribution (Images needed)

#### Introduction

At the most fundamental level, every electrical system in Rust has the same job: move power from a power source to an end device.

Everything that happens between those two points, batteries, branches, buses, logic, switches, and wiring paths, are all part of power distribution.

Distribution is not about how power is generated, and it is not about what the power is used for. It is about how power travels, what it must pass through, and what happens when that path is damaged or destroyed.

This section focuses on the two broad approaches to power distribution:

- Centralized distribution, where power flows through a single, shared path.
- Decentralized distribution, where multiple paths exist to keep devices online under damage.

Understanding the difference is less about building bigger systems and more about deciding where failure is allowed to occur.

#### Centralized Distribution

Centralized distribution is how 99.9% of Rust circuits are wired, not because it is optimal, but because it is the natural result of how players learn electricity.

All end devices or sub‑circuits are fed from a single source of power, typically protected by a single battery backup, and routed through one distribution path (usually a branch, splitter, or bus).

This means:

- Power reaches every end device through one path.
- There is one battery maintaining uptime.
- If the distribution path is broken, everything downstream loses power.

This approach concentrates control, logic, and power management into a single location. The tradeoff is simple and brutal: simplicity in exchange for a single point of failure.

Centralized distribution is material‑efficient, easy to reason about, and easy to expand. It is also fragile: one break can shut down an entire section of the base.

#### Decentralized Distribution

The goal of decentralized distribution is not efficiency. The goal is raw uptime when getting raided and taking heavy damage to a base.

At its simplest, decentralized distribution uses an OR Switch to feed a device or circuit. Imagine an Auto Turret with 2 power inputs.

An OR Switch allows:

- Two power inputs instead of one.
- Power to continue flowing as long as at least one input remains powered.

At the extreme end, this enables:

- Two power sources
- Two battery backups
- Two independent distribution paths

All feeding a single end device or circuit through the OR Switch.

This is not a common or recommended setup. It represents the upper bound of decentralization, included here to define the limits, not the baseline.

For decentralized distribution to matter, the OR Switch must be harder to destroy than the device or circuit it supports. Otherwise, it becomes the weakest link and defeats the purpose.

This approach can effectively double the amount of power being produced, stored, and routed to maintain uptime, but not necessarily.

#### Partial Decentralization

Full duplication is not required when wire extensions are used. What that means is a player with a single Kore or BCN Core can still decentralize distribution for a device such as an auto turret assuming a wire extension is required.

Example:

- Send 10rW from the core in two different directions.
- Route both paths to an OR Switch near the turret.

This creates redundancy at the distribution level, even though generation and storage remain centralized. If an extension is not required, no redundancy is created.

The turret remains powered as long as either path survives.

However, limitations apply.

#### When Decentralization Does Not Help

Decentralized distribution provides little or no benefit when:

- The distribution system (F‑Bus, D‑Bus, etc.), logic, and OR Switch are all in the same room and that room is destroyed.
- The OR Switch is easier to destroy than the device it supports.
- A single uninterrupted wire can already reach the destination without needing extension components.

In short: if all paths die in the same explosion, redundancy never existed.

In these cases, decentralization adds complexity without improving survivability.

#### Where Decentralization Shines

Decentralized distribution becomes valuable when:

- A wire must travel long distances and a wire‑extension component is required.
- The path is likely to be broken during a raid.

These scenarios usually occur during progressive raids, where attackers move through the base over time rather than deleting it instantly.

Any component used to extend a wire should be treated like the OR Switch:

- It should be better protected than the device or circuit it powers.

If one extension component is destroyed, a second path routed through the opposite side of the base can preserve uptime during a raid.

#### Failure Domains

A failure domain is the smallest damage event capable of disabling a device, circuit, or system.

For example:

- The group of Root Combiners near the roof in a single location, is a failure domain.
- Putting the Electrical Branches for a Kore or BCN Core in the same room as the power core is a large failure domain.
- An electrical closet housing components that control some local turrets is a failure domain.

Centralized distribution often creates large failure domains by placing all electrical components in the same location. A single rocket, C4, or explosive breach can remove power from everything downstream of the distribution point.

Decentralized distribution attempts to shrink or split failure domains by giving power multiple, physically separated paths. In other words, spreading things out into different locations to minimize the impact of any one single breach or failure.

The goal is not to prevent failure entirely, but to ensure that failure happens later, in smaller pieces, in a predictable way and on your terms.

#### False Redundancy

Not all redundancy is real redundancy.

The following look decentralized but provide little or no added resilience:

- Two independent distribution buses located in the same room, from 2 Power Source and Battery Backups.
- Two OR Switch inputs fed from paths that each require a wire extension, but are located in the same room**.**
- Two OR Switch inputs fed from the same distribution panel where the wires do not require a wire extension.

If multiple power paths share the same failure domain, the system is still centralized, just more expensive.

#### Decision Shortcut

Decentralized distribution is rarely needed. Before using it, ask three questions:

- Is the device or circuit raid‑critical?
- Can the power paths realistically be broken independently(wire extension)?
- Will keeping this system online change the outcome of the raid?

If the answer to all three is not yes, decentralized distribution is usually wasted effort.

#### Cost and Power Tradeoffs

Decentralized distribution always costs more power than centralized distribution.

Either:

- The player reserves double the power for decentralized devices using a single source and battery, or
- The player produces and stores double the power using multiple sources and batteries.

Decentralized distribution does not eliminate power waste, it turns it into redundancy. This is often over‑engineering but it does have practical applications, but only if the player is comfortable wasting power to do it.

Remember:

- Power waste is inevitable.
- The real decision is where the player is willing to waste it.

If power efficiency is the primary goal, centralized distribution with secondary battery backups almost always wins. Decentralized distribution is a raid‑resilience strategy, not an electrical optimization.

#### Conclusion

At the end of the day, all power distribution is about the same problem: getting power from the source to the device, and deciding what happens when something in between is destroyed.

- Centralized distribution accepts failure in exchange for simplicity. It is efficient, predictable, and sufficient for the majority of builds.
- Decentralized distribution trades efficiency for resilience. It accepts higher cost, higher power waste, and higher complexity in order to keep critical systems online longer during a raid.

Neither approach is strictly better. Each represents a different answer to the same question:

“Where am I willing to let power fail?”

Understanding distribution is not about copying advanced circuits. It is about making intentional decisions instead of accidental ones and building systems that fail the way you expect them to.
