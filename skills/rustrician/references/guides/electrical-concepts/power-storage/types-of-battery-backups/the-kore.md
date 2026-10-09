# Electrical Concepts: Power Storage › Types of Battery Backups › The Kore

#### The Kore

**About the Name**

The Kore is named after its creator, Korrektor, a highly respected member of the Rust community for his contributions to advanced circuit design. The name is a play on his name and the word "core," reflecting its importance as a foundational upgrade to traditional inline backup systems. (I'd personally like to rename it to the KorrektCore so it can still be a play on his name, but also the words correct and core, so it would be pronounced as the correct core)

**The Kore** is an upgraded Inline Backup and introduces battery health awareness. It retains all the speed and simplicity of a traditional inline design, while adding a crucial failover feature. If the battery is destroyed, the system automatically switches to the main power source, ensuring that the circuit remains powered.

Precisely because of its simplicity, players should upgrade their important or critical Inline Backups to a Kore as soon as they are able. The setup is easy, components are minimal, and it significantly improves resilience.

**✅ Benefits**

- Simple to build with minimal components
- Fast and reliable for decentralized circuit setups
- No flicker during normal operation
- Only switches if the battery is destroyed
- Maintains circuit uptime even if the battery is removed
- More resilient than a standard Inline backup

**❌ Limitations**

- Still subject to 80% battery efficiency loss when active
- Power waste increases with each additional Kore unit used
- Requires understanding of Active Usage for proper power budgeting
- Combining batteries in inline setups is inefficient unless used for high burst output, not constant load
- Only 99 of 100rW from a Large Battery is available to the circuit, due to 1rW being used to maintain SET on the Memory Cell

**How It Works**

**The Kore follows the core structure of a traditional Inline Backup:** The battery powers the circuit full-time, while the main power source charges the battery. The key upgrade is its ability to detect when the battery is destroyed and immediately switch over to the power source, without the need for manual interaction or external switching.

This is accomplished using a Memory Cell, a Small Battery, an Electrical Branch and an OR Switch, making it simple, efficient, and highly reliable. The Small Battery is used as a representation of Control Power, and is used to RESET the Memory Cell.

**Power Flow Logic**

- **Power Source → Memory Cell
- **Power from the main source (e.g., Wind Turbine) enters the Memory Cell through its main input.
- **Inverted Output → OR Switch → Circuit
- **The left output of the Memory Cell (Inverted Output) connects to an OR Switch that feeds into the circuit. This becomes the fallback power path if the battery is destroyed.
- **Normal Output → Large Battery
- **The right output (Output) sends power directly into a Large Battery, keeping it charged.
- **Battery Output → Electrical Branch → Memory Set + OR Switch**
  - Power from the battery is sent into an Electrical Branch.
  - 1rW is branched off to the SET input of the Memory Cell. This tells the system the battery is present.
  - The rest of the power is sent to the OR Switch, powering the circuit.
  - This means only 99 of the 100rW from a Large Battery is available for use.
- **Small Battery → RESET**
  - A Small Battery is connected to the RESET input of the Memory Cell. This is used to flip the system when the battery is no longer present.
  - Side ports do not contribute to Active Usage, so this battery never drains, and does not need to be recharged.

As long as the battery is functioning, SET receives power, and the Memory Cell continues to route power through its normal output. If the battery is destroyed, SET loses power while RESET continues to receive it. This causes the Memory Cell to flip, sending power through the Inverted Output and allowing the main power source to directly power the circuit.

This fallback ensures that some power, however limited, reaches the circuit instead of a complete loss.

**Calculating Power Needs**

**To determine how much input power is required to sustain a battery without draining:**

Input Power = Active Usage ÷ 0.8

**For example, if a Large Battery shows 99 Active Usage, then:**

99 ÷ 0.8 = 124rW

124rW is the amount required to keep the battery in a neutral state where it neither drains or charges. However, this is not sufficient to build usable capacity. If the battery has just been placed or is partially discharged, it will not fill unless it receives more than the neutral amount.

Providing only a small amount of excess power (e.g., 125rW) will result in extremely slow charging, too slow to be practical within a single wipe. Supplying more (e.g., 150rW) speeds up charging considerably, but also leads to more power being wasted once the battery is full unless the extra is redirected or removed.

- It is recommended to charge batteries to at least 3000rWm before connecting them to active circuits.
- Players using Wind Turbines, Solar Panels or Small Generators should expect downtime periods and ensure batteries are charged enough to survive these low production cycles and recharge after.

**This balance is essential: **Players must weigh charging speed against over-production, especially in inline systems where the power demand is constant. Early overproduction is acceptable if it ensures batteries reach capacity quickly and can later be scaled back or redistributed.

**Fun Fact:** Providing only 1rW to a Large Battery results in an estimated 34 real days, or 816 in game days to fully charge.

**Estimating Charge Time**

To estimate how long it will take to fully charge an empty battery, use the following formula:

Charge Time (minutes) = Power Capacity ÷ (Input Power × 0.8)

- **Power Capacity:**
  - Small Battery: 400rWm
  - Medium Battery: 9,000rWm
  - Large Battery: 24,000rWm
- **Input Power:** The amount of power being supplied to the battery (in rW)
- **0.8:** The battery's efficiency (80%)

**Example:** Medium Battery (Idle)

- **Input Power:** 80rW
- **Power Capacity:** 9000rWm

Charge Time = Power Capacity ÷ (Input Power × 0.8)

Charge Time = 9000rWm ÷ (80rW × 0.8)

Charge Time = 9000rWm ÷ (64rWm)

Charge Time = 141 minutes, or 2 hours and 21 minutes.

The Medium Battery will fully charge in 2 hours and 21 minutes if it receives 80rW continuously and has no output load.

**Charging While In Use**

If the battery is powering a circuit while charging, subtract the power required to support the current load (Active Usage ÷ 0.8) from the input power. The remainder is the surplus, which determines how fast the battery will charge.

Surplus Power = Input Power - (Active Usage ÷ 0.8)

Charge Time = Capacity ÷ (Surplus Power × 0.8)

- **Capacity: **Power Capacity - Current Capacity
- **Current Capacity:** The rWm value shown in a battery’s UI
- **Power Capacity:**
  - Small Battery: 400rWm
  - Medium Battery: 9,000rWm
  - Large Battery: 24,000rWm
- **Input Power:** The amount of power being supplied to the battery (in rW)
- **Active Usage:** The value shown in a battery’s UI
- **0.8:** The battery's efficiency (80%)

**Example:** Large Battery (Active Load)

- **Input Power:** 130rW
- **Active Usage: **99
- **Current Capacity:** 500rWm

**Step 1:** Calculate how much power is available for charging.

Surplus Power = Input Power - (Active Usage ÷ 0.8)

= 130rW - (99 ÷ 0.8)

= 130rW - 124rW

Surplus Power = 6rW of power available for charging.

**Step 2:** Calculate the remaining charge time until full.

Charge Time = Capacity ÷ (Surplus Power × 0.8)

= (Power Capacity - Current Capacity) ÷ (Surplus Power × 0.8)

= (24000rWm - 500rWm) ÷ (6rW × 0.8)

= (23,500rWm) ÷ (5rW)

Charge Time = 4700 minutes

= 4700 minutes ÷ 60 minutes

Charge Time = 78.3 hours

With only 6rW of surplus power, it would take 3 days, 6 hours, 20 minutes of real-time to fully charge the Large Battery with an Active Usage of 99 and a current capacity of 500rWm.

**Step 3(Optional): **To figure out how much time a given capacity will run for, with no input power and outputting a specific amount of power, we use the following equations:

**Seconds =** (Current Capacity ÷ Active Usage = Minutes) × 60

**Minutes = **Current Capacity ÷ Active Usage

**Hours =** (Current Capacity ÷ Active Usage = Minutes) ÷ 60
