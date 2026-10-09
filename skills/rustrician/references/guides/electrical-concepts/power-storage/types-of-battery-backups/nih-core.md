# Electrical Concepts: Power Storage › Types of Battery Backups › Nih Core

#### Nih Core

**About the Name

**The Nih Core was named by the Rust community in honor of its creator, Nih. Although Nih himself did not choose the name, it has been widely adopted as a sign of respect for his contributions to advanced Rust electricity design.

The **Nih Core** is the modern version of, and replacement for, the OR/Blocker. It allows circuits to be powered directly with Root Power from the main power source while using the excess to charge the backup battery. When the main power source enters periods of low production or is destroyed, the battery automatically takes over. Once the main power returns to sufficient output, the system switches back.

What makes it a Nih Core, and superior to older methods is its ability to take full advantage of a battery’s simultaneous charge and discharge capabilities. When the battery is powering the circuit, any insufficient power from the main source is redirected to the battery. This reduces battery drain and extends the runtime of backup power.

**✅ Benefits**

- Efficient modern bypass system using current Rust electrical mechanics
- Significantly reduces wasted power during battery discharge
- Automatically switches between power sources with no flicker
- Excellent for central power systems supporting over 100rW
- Designed to be compatible with multiple batteries using Root Combiners
- Will not attempt to switch to batteries if they are unable to support the required load

**❌ Limitations**

- Requires multiple components and a solid understanding of Power Flow
- The added complexity can be difficult to troubleshoot without a solid understanding of the logic
- If the battery depletes or is destroyed while active, main power must return to a sufficient level before power will be restored
- Not always suitable for small circuits under 100rW (Inline or Kore can often be better)
- Max Depth must be managed carefully when scaling with many batteries or power sources

**How It Works**

The Nih Core is a modern bypass-style battery backup system designed to solve the inefficiencies of older designs like the OR/Blocker and mitigate the over production of power often experienced by Inline backups. Its defining feature is the ability to redirect the flow of power to take advantage of a battery's ability to charge and discharge at the same time, while still maintaining full control over when the battery is actually used.

The system powers a circuit using Root Power from a main power source, typically a Wind Turbine or Solar Panel, and uses any excess power to charge one or more batteries. The battery is kept on standby and does not supply power unless the main source fails or produces insufficient output. This setup allows the battery to remain fully charged and unused until needed.

How power flows through the series of Electrical Branches will dictate the state of the Memory Cell, which will decide whether main or backup power should be used:

- Electrical Branch 1 is configured to match the circuit’s expected load (e.g., 99rW). If the main source can satisfy this Branch Out amount, the circuit is powered directly by the main source.
- If the main power source drops below the set value, power to the SET input on the Memory Cell is lost, causing it to flip outputs and activate battery backup through the OR Switch.

The battery itself is connected to its own Electrical Branch, which is also set to the same value as Electrical Branch 1 (e.g., 99rW). This is crucial:

- If the battery provided more than the expected load to the OR Switch, the OR Switch would prioritize the higher input (battery) even when main power is still producing enough, causing unnecessary battery drain.
- Matching the set values ensures the battery never overrides the main source unless it is truly needed.

During battery-powered operation, any partial power still coming in from the main source is automatically redirected to the battery for charging, helping slow down battery drain and extending backup time.

**Power Flow Logic**

Each Electrical Branch in this setup plays a critical role. The first branch is configured to match the expected circuit load (e.g., 99rW). When main power drops below this value, the system triggers the battery to take over. The Memory Cell's SET and RESET inputs are responsible for determining when this switch occurs, based on power availability.

- **Main Power Source → Electrical Branch 1 (Set to 99)**
  - Branch Out → Memory Cell Input - Root Power bypass
  - Power Out → Electrical Branch 2 - Excess power overflow
- **Electrical Branch 2 (Set to 1)**
  - Branch Out → Memory Cell SET input - Root Power is present signal
  - Power Out → OR Switch 2 Input A - Excess power powerflow
- **Memory Cell**
  - Output (Right) → OR Switch 1 Input A - Root Power primary route
  - Inverted Output (Left) → OR Switch 2 Input B - Root Power failover route
- **OR Switch 2**
  - Power Out → Battery input - Charging power
- **Battery → Electrical Branch 3 (Set to match circuit load, e.g., 99)**
  - Branch Out → OR Switch to Circuit - Battery backup power route
  - Power Out → Memory Cell RESET input - Flips output when SET loses power

Using the next image, it is possible to see where power exists and where it doesn’t when the Nih Core is running off of Main Power vs Battery Power.

- **Green Wires:** show the path of the power that is being used and/or consumed.
- **Red Wires:** show where there is no power.
- **Blue Wires:** shows power that is present and standing by from the battery, but not generating any Active Usage.

When power from the source is sufficient, the Memory Cell remains SET and uses the main power path to the circuit. The battery is charged passively in the background. When main power drops below the first Branch setting, SET loses power, and the Memory Cell flips, activating the battery via the top OR Switch no longer receiving power on Input A.

While the battery powers the circuit, any remaining power from the main source is redirected to charge the battery, helping reduce the battery’s drain rate.

It is important to note that If the battery is ever depleted or destroyed, the circuit will avoid trying to switch to the battery and remain on the main source, even if it doesn't have enough incoming power to meet the set demand.

**Design Considerations**

- **Power scaling favors the Nih Core**. In an Inline setup, each Large Battery requires 125rW to stay neutral when powering 100rW of Active Usage. Adding more batteries (for 300rW, 400rW or 500rW) massively increases the baseline power generation needed 500rW for 400rW of load.
- **The Nih Core bypasses this scaling problem**. Circuits are powered directly by the main source most of the time, meaning batteries remain idle. Only a small amount of power is needed to charge the batteries during normal operation, rather than constantly feeding them.
- **Real-world example**:
  - A 400rW load using Inline backups would require over 500rW of power just to maintain battery charge.
  - The same 400rW load with a Nih Core can be sustained with as little as 421rW of production, 400rW for the circuit, 1rW for logic, and small surplus amounts (roughly 5rW per battery) for passive battery charging. At this rate, it will take a little more than 3 real life days to fully charge the batteries. Increase the surplus to increase the charging rate.
- **Efficiency increases the larger the circuit gets**, because batteries are not actively drained except during failover, and even then, any remaining power is redirected to slow the battery drain.
- **Flexibility during base growth**. Early on, players can temporarily lower Electrical Branch values (e.g., setting 99rW down to 50rW) to accelerate battery charging while the base's load is still small.
- **Battery sizes should be the same size** for consistent drain rates if using multiple batteries. If a player chooses to use different size batteries, they need to design their circuit by taking into account that when the smaller battery is empty, the circuit will have less power to function on. Using a Fixed Bus, ie Electrical Branches, to build in prioritization will be required to ensure the circuits with the highest priority get power first and the circuits with the lowest priority receive power last. When the smaller battery is depleted, only the circuits with the lowest priority will go offline.
- **Scaling requires attention to Max Depth**. Bases with many sources and batteries (e.g., 16 power sources and 16 batteries) can hit Rust’s Max Depth limitation, see **Short Circuit / Max Depth** for important planning details.

**Advanced Branch Configuration**

While setting Electrical Branch 1 and Electrical Branch 3 to matching values is standard, they do not have to be identical.

- The Electrical Branch connected to main power (Electrical Branch 1) can be set higher than the Electrical Branch connected to the battery’s output (Electrical Branch 3) to support additional non-critical circuits during normal operation. These extra circuits will automatically shut off during battery failover if the batteries cannot cover the full load.
- The battery branch (Electrical Branch 3) can be set lower if players want to conserve battery life and only power critical systems during failover.
- **Important**: The battery branch (Electrical Branch 3) must never be set higher than the main power branch (Electrical Branch 1), or the OR Switch will incorrectly prioritize the battery even when main power is available.

This flexibility allows players to prioritize what stays online based on available power without needing complex wiring changes.

**Nih Core Variants**

Like most things with rustricity, there are always more than 1 way to accomplish anything. The Nih Core is no different. The version that has been discussed in detail above is the recommended version specifically because it has the built in safety of not swapping to the battery if it is depleted or destroyed. These next 2 versions are not uncommon to see players use and more accurately replicate the original Nih Core, including its flaw of swapping to the battery when it was depleted or destroyed. However, they do have the benefit of not costing 1rW from the battery.

**Variant 1 - The Classic Nih Core** updated for post 04/2024 rustricity mechanics.

This variant of the Nih Core is the most similar to its original design that used a Splitter to control the logic, and a Blocker to stop the battery from draining. Today, the Splitter is replaced with an Electrical Branch to still control the logic, and either nothing replaces the Blocker or an Electrical Branch is used to limit power to the OR Switch if a player is working with power loads less than the batteries output. There is nothing wrong with using this version, as long as the player understands that when power production is running low, the core will flip to the battery, even if it is depleted or destroyed.

**Version 2 - The Updated Classic Nih Core**, utilizing Control Power, a new mechanic post 04/2024.

This variant acts exactly like the original design, including its flaw, but introduces the idea of Control Power with the Small Battery to RESET the Memory Cell. Control Power allows more of the power produced to be used for the main backup battery and powering the attached circuits. The original design used a Splitter to control the logic, and a Blocker to stop the battery from draining. Today, the Splitter is replaced with a Small Battery and 1rW from an Electrical Branch to still control the logic, and either nothing replaces the Blocker or an Electrical Branch is used to limit power to the OR Switch if a player is working with power loads less than the batteries output. There is nothing wrong with using this version, as long as the player understands the flaw in the original design. When power production is running low, the core will flip to the battery, even if it is depleted or destroyed. This is the reason the original BCN was created.
