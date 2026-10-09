# Electrical Concepts: Power Storage › Types of Battery Backups › BCN Core

#### BCN Core

**About the Name

**The BCN Core stands for Battery-Checked Nih Core. Created by SwiftCoyote, it enhances the original Nih Core by introducing battery health awareness just like The Kore.

The **BCN Core** is a direct upgrade to the Nih Core. It retains the same bypass and battery-charging mechanics, but introduces automatic fallback when backup batteries are destroyed or depleted while actively running on battery power.

In standard Nih Core designs, if batteries failed while active, the system would remain stuck waiting for main power to fully recover. The BCN Core corrects this by forcing an immediate return to whatever main power is available, even if it is insufficient to meet the original demand.

This makes the BCN Core more resilient for bases relying on centralized battery backup systems that are likely to be raided.

**✅ Benefits**

- Efficient modern bypass system using current Rust electrical mechanics
- Significantly reduces wasted power during battery discharge
- Automatically switches between power sources with no flicker
- Excellent for central power systems supporting over 100rW
- Designed to be compatible with multiple batteries using Root Combiners
- Automatically recovers to main power if batteries are destroyed or drained
- Prevents systems from becoming stuck waiting for main power recovery
- No manual reset or intervention needed after battery failure

**❌ Limitations**

- Wiring is slightly more complex than a standard Nih Core, requiring additional components and precise setup
- Requires an understanding of Power Theory to grasp the concept that allows the Small Battery to be used without giving it a charge, and then use it for more.
- Players must understand Power Flow, including the Memory Cell priorities and OR Switch input behavior affect power routing
- Efficient scaling requires understanding Max Depth rules to avoid max depth errors when centralizing large numbers of power sources and root combined batteries

**How It Works**

The BCN Core builds directly on the Nih Core's structure, maintaining the same bypass-first and passive battery-charging behavior during normal operation. Root Power supports the circuit directly most of the time, while excess or the remaining power charges the backup batteries.

If main power production falls below the reserved threshold, a blocker allows power from the battery to reach the Memory Cell’s SET input. This causes the Memory Cell to flip outputs, switching the circuit over to battery power through the top OR Switch.

While running on battery power, any remaining main power, the amount that was insufficient to fully run the circuit, is automatically redirected to help charge the batteries. This extends backup runtime and improves overall system efficiency during low production periods.

If the batteries are later destroyed or fully depleted while active, the Memory Cell automatically flips back to using whatever main power is available because of the power present on RESET. This fallback prevents circuits from remaining offline unnecessarily and ensures some continuous operation whenever possible.

A Small Battery is used as a representation of Control Power, and is used to power the Memory Cell RESET input. The side inputs do not generate Active Usage, the Small Battery does not drain during any operation, making it ideal for this role without needing to receive power. Players should make attempts to use Control Power where possible to help improve the efficiency of connected circuits.

During normal conditions, the BCN Core retains all the efficiency advantages of the Nih Core:

- Root Power supports the circuit directly most of the time allowing players to leverage other power types within connected circuits.
- Batteries remain idle and charge passively.
- Battery drain only happens during actual failover.

**Power Flow Logic**

- **Main Power Source → Electrical Branch 1 (Set to Circuit Load, e.g., 99)**
  - Branch Out → Memory Cell Input - Root Power bypass
  - Power Out → Electrical Branch 2 - Excess power overflow
- **Electrical Branch 2 (Set to 1)**
  - Branch Out → Block Passthrough on a Blocker - Root Power present signal
  - Power Out → OR Switch charging the battery - Excess power overflow
- **Memory Cell**
  - Output (Right) → OR Switch to Battery - Root Power primary route
  - Inverted Output (Left) → OR Switch to power a Circuit - Root Power failover route
- **Battery → Electrical Branch 3 (Set to match expected load, e.g., 99)**
  - Branch Out → OR Switch to Circuit - Battery backup power route
  - Power Out → Blocker Input - Battery presence signal
- **Blocker Output**
  - Output → Memory Cell SET input - Battery presence signal
- **Small Battery**
  - Connected → Memory Cell RESET input - Failover signal on battery failure

Using the following picture, it is possible to see where power exists and where it doesn’t when the BCN Core is running off of Main Power vs Battery Power.

- **Green Wires:** show the path of the power that is being used and/or consumed.
- **Red Wires:** show where there is no power.
- **Blue Wires:** shows power that is present and standing by from the battery, but not generating any Active Usage.

**When main power falls below the expected value:**

- SET gains power from the Large Battery.
- The Memory Cell flips, activating the battery through the top OR Switch.

**If the battery later becomes empty or destroyed while active:**

- SET loses power.
- The Memory Cell automatically flips back to main power — even if main power is still below the original threshold — preventing complete circuit failure.

**Advanced Branch Configuration**

While setting Electrical Branch 1 and Electrical Branch 3 to matching values is standard, they do not have to be identical.

- The Electrical Branch connected to main power (Electrical Branch 1) can be set higher than the Electrical Branch connected to the battery’s output (Electrical Branch 3) to support additional non-critical circuits during normal operation. These extra circuits will automatically shut off during battery failover if the batteries cannot cover the full load.
- The battery branch (Electrical Branch 3) can be set lower if players want to conserve battery life and prioritize only critical systems during backup operation.
- **Important**: The battery branch (Electrical Branch 3) must never be set higher than the main power branch (Electrical Branch 1), or the OR Switch will incorrectly prioritize the battery even when main power is available.

This flexibility allows players to fine-tune which systems stay operational based on power availability without needing to rewire the core.

**Design Considerations**

- **Power scaling favors the BCN Core.** In an Inline setup, each Large Battery requires 125rW to stay neutral when powering 100rW of Active Usage. Adding more batteries (for 200rW, 300rW, 400rW) massively increases the baseline power generation needed.
- **The BCN Core bypasses this scaling problem.** Circuits are powered directly with Root Power most of the time, meaning batteries remain idle. Only a small amount of power is needed to charge the batteries during normal operation, rather than constantly feeding them.
- **Real-world example:**
  - A 400rW load using Inline backups would require over 500rW of power just to maintain battery charge.
  - The same 400rW load with a BCN Core can be sustained with as little as 421rW of production, 400rW for the circuit, 1rW for logic, and small surplus amounts (roughly 5rW per battery) for passive battery charging. At this rate, it will take a little more than 3 real life days to fully charge the batteries. Players can increase the amount of excess power to decrease the charging time as needed.
- **Efficiency increases the larger the circuit gets**, because batteries are not actively drained except during failover, and even then, any remaining power is redirected to slow the battery drain.
- **Flexibility during base growth.** Early on, players can temporarily lower Electrical Branch values (e.g., setting a 99rW Branch down to 50rW) to accelerate battery charging while the base's load is still small.
- **Battery sizes should be the same size** for consistent drain rates if using multiple batteries. If a player chooses to use different size batteries, they need to design their circuit by taking into account that when the smaller battery is empty, the circuit will have less power to function on. Using a Fixed Bus, ie Electrical Branches, to build in prioritization will be required to ensure the circuits with the highest priority get power first and the circuits with the lowest priority receive power last. When the smaller battery is depleted, only the circuits with the lowest priority will go offline.
- **Scaling requires attention to Max Depth.** Bases with many sources and batteries (e.g., 16 power sources and 16 batteries) can hit the Root Combiners Max Depth limitation, see **Short Circuit / Max Depth** for important planning details.
