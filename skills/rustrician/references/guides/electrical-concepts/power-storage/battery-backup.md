# Electrical Concepts: Power Storage › Battery Backup

### Battery Backup

A battery backup system in Rust is a circuit designed to automatically supply power when the primary power source fails. It ensures continuity for critical systems like turrets, traps, lights, or communication devices, especially during night cycles, periods of low wind, or fuel shortages. In real-world power infrastructure, similar systems are known as UPS (Uninterruptible Power Supplies) that keep essential devices operational during power outages. Rust may be a post-apocalyptic sandbox, but backup theory remains applicable.

#### Real-Life Inspiration: Rust vs UPS Systems

**In real-world power infrastructure, there are two major types of UPS configurations:**

- **Bypass (Line-Interactive) UPS**: These remain idle during normal operation and only activate when power loss is detected.
- **Inline (Double Conversion) UPS**: These always supply power through the battery, ensuring seamless delivery and built-in filtering against power fluctuations.

**Rust mirrors these designs with its own terms:**

**Real Life**

**Rust Equivalent**

**Description**

Line-Interactive UPS

**Bypass Backup**

Main power flows directly to the circuit. The battery is *bypassed* unless needed.

Double Conversion UPS

**Inline Backup**

All power flows *through* the battery first. The battery is always active.

Additionally, rustricians have introduced a third tier. Battery-Checked Backups which monitor the amount of power the battery bank can supply. If the batteries cannot provide the required amount of power, because some were destroyed or depleted, the circuit will begin feeding Root Power to the circuit, regardless of how much power is available. Some power is better than no power.

#### Types of Battery Backup Systems in Rust

There are three main styles of backup circuits, each with their own advantages and disadvantages.

**1. Inline Backup**

- **Example**: The Inline circuit.
- The battery is always active. It's simple to build and easy to set up.
- Efficiency loss scales poorly when multiple inline batteries are used due to the 80% efficiency rule.
- Best suited for short-term or for circuits that are made up of 30% or more logic components.

**2. Bypass Backup**

- **Example**: The Nih Core circuit.
- The battery is inactive unless needed. It's only used if primary power fails to meet the required demand. The power that cannot meet the demand is routed towards the battery to slow the drain and increase runtimes.
- Offers greater efficiency when scaling with multiple batteries. The 80% efficiency rule does not apply allowing for less power generation to remain stable as compared to an Inline backup.
- Best suited for large centralized systems supporting circuits in the multiple hundreds of power with a shared power infrastructure.

**3. Battery-Checked Backups**

- **Examples**: The Kore, BCN Core.
- These add logic to check if the battery is present and able to provide the required amount of power. If the battery cannot fulfil its obligations, the system will switch to providing whatever amount of power is available from the source.
- These offer a similar level of efficiency to their non battery checked counterparts but their complexity is slightly higher requiring a greater understanding of their core functions.
- Best suited as the modern replacement and upgrade for a standard Inline or Bypass battery backup. Defenders of a raid often claim their batteries get destroyed before their power sources. Advanced players will understand this is actually a flaw in base design so having the additional, built in redundancy is now highly recommended.

#### Power Waste and Backup Efficiency

All power cores result in some level of wasted electricity. Waste occurs whenever more power is generated than is actively being consumed or stored. The important consideration is not whether waste happens — **it is inevitable** — but rather where it happens and how much waste a player is willing to accept.

- **Inline Backups** waste power when batteries are fully charged. Any additional power that continues to be supplied, beyond what is needed to maintain a positive charge, serves no purpose. Minimize waste by not over producing.
- **Bypass Backups** waste power when batteries are fully charged but also can cause waste by supplying power to circuits that are turned off. Minimizing power waste relies on efficient use of Root Power.
- **Battery-Checked Backups** minimize waste more effectively when batteries are destroyed, but still waste power charging batteries that are full and on the conditional logic of circuits that are receiving powering.
- **Direct Delivery** is a clear example of visible waste. If a power source produces more power than the circuit requires, the excess is immediately lost because there is no storage.

There is no perfect system that avoids waste entirely. Efficient circuit design involves making informed choices. Players should focus on managing waste and deciding how much is acceptable in exchange for faster charging, longer uptime, or greater redundancy. **Efficiency is about balance — not total elimination of loss.**

#### Choosing the Right Backup

Selecting the appropriate backup style depends on the application, available resources, circuit design preferences and the player's level of knowledge. The following examples illustrate common use cases:

- **Low-demand and fast decentralized deployment**:
- Inline backups are suitable for circuits with minimal power requirements or where setup speed and simplicity are prioritized over long-term efficiency. What makes them ideal is they use very few components, so their crafting cost is cheap, and the number of wires players will need to connect is minimal. The battery checked Inline, The Kore, is particularly effective as it allows fallback to the main power source if the battery is destroyed.
- **High power, centralized systems**:
- Bypass Battery Backups are effective for managing circuits with large power requirements (300–1000rW+), especially when used with multiple batteries and power sources. The bypass design significantly reduces the amount of Root Power that needs to be generated to power both the circuits and charge the batteries. Requiring as little as 425rW to support 400rW of output using four large batteries, their efficiency grows the bigger they get as compared to Inline backups. While bypass backups such as the Nih Core can technically be used in decentralized designs, doing so is generally not practical or recommended. Both from an efficiency and design standpoint, their component complexity and setup requirements make them better suited for centralized systems where multiple circuits share power infrastructure
- **Power-critical systems**:
- Battery-Checked Cores such as The Kore or the BCN Core, provide greater reliability by ensuring some level of power is present, assuming there is still a power source. The battery must be present and able to support the load. If it cannot, either before or after activation, the system will fall back to primary power, regardless of the amount being produced. These configurations are well-suited for defensive systems like traps, turrets, SAM Sites, communication systems, or other essential setups where complete power failure must be avoided.

Ultimately, the most effective battery backup system is one that performs reliably during a power failure. Regardless of size, complexity and cost, the defining qualities of a successful backup system are consistency and dependability. **The one that works, when the player needs it to work, is the best backup.**

#### Power Type Composition

Understanding when to use a Bypass or Inline battery backup is one of the most important decisions a player can make when designing a power-efficient circuit. While both backup types exist to provide battery-stored electricity, the types of power being used in a circuit it supports, especially Root Power, Active Usage, Consumed Power, and Control Power, will help determine which one is better suited for the task.

##### Inline Backups: Leverage Active Usage

Inline Battery Backups use a battery as the circuit’s primary power source. Root Power is supplied to the battery, which then distributes power to the components. Inline backups only require enough power input to overcome the battery’s Active Usage. Understanding the 80% battery efficiency can result in major Root Power savings by not overproducing:

**Power In = Active Usage ÷ 0.8

** or

**Power In = Active Usage × 1.25**

**✅ When to Use Inline Backups:**

- Circuits with intermittent usage
- Circuits that contain many logic components
- Circuits where the majority of power does not create Active Usage
- Systems that can benefit from Control Power (logic run from a battery with no drain)
- Circuits that can recharge batteries during idle periods (e.g., auto-smelters)

**⚠️ Drawbacks:**

- Inline batteries must be continuously charged
- If underpowered, they will drain and shut down the system
- Not ideal for circuits with constant, high Active Usage

##### Bypass Backups: Reserve for Consumption

Bypass Battery Backups use the battery as an emergency source only. Root Power is sent directly to the circuit and only routes through the battery if Root Power fails. The battery is kept fully charged in the background but is not the main source of power.

**✅ When to Use Bypass Backups:**

- Circuits with high power consumption that are always on
- Any system where battery drain is unacceptable
- Any system where battery Active Usage can be leveraged
- Where Root Power is readily available and consistent**

**⚠️ Drawbacks:**

- Must reserve full power for all components at all times
- Less efficient if the circuit doesn’t need to run continuously
- Requires a greater understanding of efficiency

##### Key Questions to Decide

- **Does this circuit run 24/7, or only sometimes?**
  - 24/7 → Bypass
  - Partial uptime → Inline
- **Does the circuit contain a lot of logic components?**
  - Yes → Inline (or Control-only)
  - No → Bypass
- **Can the circuit be split into functional and logic parts?**
  - Yes → Use Hybrid or add Control Battery
- **Is Root Power limited?**
  - Yes → Prioritize Bypass/Control and leverage Active Usage where possible

##### Summary

- Inline = best when logic dominates or systems run intermittently
- Bypass = best when uptime matters or systems are always active
- Don’t root combine batteries for Inline backups
- Separate functional power (Root/Consumed) from control logic (Control/Free)
- Use power efficiently and strategically to avoid over charging batteries
