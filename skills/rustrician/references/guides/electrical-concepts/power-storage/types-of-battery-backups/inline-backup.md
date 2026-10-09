# Electrical Concepts: Power Storage › Types of Battery Backups › Inline Backup

#### Inline Backup

**About the Name

**The **Inline Backup** derives its name from the location where it exists within the circuit, in line

between the source and destination.

It's a power delivery method where electricity from a power source is routed through a battery before reaching any connected components. This is the most common and straightforward way to implement a battery backup in Rust. It offers simplicity, reliability, and fast setup, especially in early and mid-game environments.

Inline backups are most effective when fast deployment and minimal setup are prioritized. Their simplicity makes

**✅ Benefits**

- Simple to wire and build with minimal components.
- Fast to deploy, especially during early games.
- Reliable for low-power circuits (<100rW) when managing their discharge.
- No power flicker due to the battery always being active.
- Ideal for easy decentralized circuit design when ignoring long term efficiency loss.

**❌ Limitations**

- Always subject to 80% efficiency loss when supplying power, even under normal operating conditions.
- Power waste increases with each additional inline battery, making this method inefficient in large-scale systems unless properly managed and controlled.
- Requires understanding of Active Usage to prevent undercharging or overproducing power.
- Combining batteries in inline setups is inefficient unless used for high burst output, not constant load.
- Provides no built-in redundancy if the battery is destroyed.

**How It Works**

**When a power source is directly connected to a battery:**

- 100% of the power is used to charge the battery.
- Batteries are 80% efficient, meaning more power must be supplied than is being consumed.
- Once a battery is fully charged, any input beyond the required maintenance level becomes unused power (waste).

**When the battery is connected to a circuit:**

- The battery makes power continuously available but only discharges when components draw power.
- If the power source stops producing electricity (due to wind speed, nightfall, or destruction), the battery continues powering the circuit until it is empty or destroyed.
- No switching logic is required, so there is no risk of power flicker, which refers to brief circuit shutdowns when power switches from one source to another.

**Calculating Power Needs**

**To determine how much input power is required to sustain a battery without draining:**

Input Power = Active Usage ÷ 0.8 or Input Power = Active Usage × 1.25

**For example, if a Large Battery shows 100 Active Usage, then:**

100 ÷ 0.8 = 125rW

125rW is the amount required to keep the battery in a neutral state where it neither drains or charges. However, this is not sufficient to build usable capacity. If the battery has just been placed or is in any way partially discharged, it will not fill unless it receives more than the neutral amount.

Providing only a small amount of excess power (e.g., 126rW) will result in extremely slow charging, too slow to be practical within a single wipe. Supplying more (e.g., 150rW) speeds up charging considerably, but also leads to more power being wasted once the battery is full unless the extra is redirected or removed.

- It is recommended to charge batteries to at least 3000rWm before connecting them to active circuits.
- Players using Wind Turbines, Solar Panels or Small Generators should expect downtime periods and ensure batteries are charged enough to survive through low production cycles and recharge after.

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

**Example:** Small Battery (Idle)

- **Input Power:** 25rW
- **Power Capacity:** 400rWm

Charge Time = Power Capacity ÷ (Input Power × 0.8)

Charge Time = 400rWm ÷ (25rW × 0.8)

Charge Time = 400rWm ÷ (20rWm)

Charge Time = 20 minutes

The Small Battery will fully charge in 20 minutes if it receives 25rW continuously and has no output load.

**Charging While In Use**

If the battery is powering a circuit while charging, subtract the power required to support the current load (Active Usage ÷ 0.8) from the input power. The remainder is the surplus, which determines how fast the battery will charge.

Surplus Power = Input Power - (Active Usage ÷ 0.8)

Charge Time = Capacity ÷ (Surplus Power × 0.8)

- **Capacity: **(Power Capacity - Current Capacity)
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
- **Active Usage: **100
- **Current Capacity:** 3200rWm

**Step 1:** Calculate how much power is available for charging.

Surplus Power = Input Power - (Active Usage ÷ 0.8)

Surplus Power = 130rW - (100 ÷ 0.8)

Surplus Power = 130rW - 125rW

Surplus Power = 5rW of power available for charging.

**Step 2:** Calculate the remaining charge time until full.

Charge Time = Capacity ÷ (Surplus Power × 0.8)

Charge Time = (Power Capacity - Current Capacity) ÷ (Surplus Power × 0.8)

Charge Time = (24000rWm - 3200rWm) ÷ (5rW × 0.8)

Charge Time = (20,800rWm) ÷ (4rW)

Charge Time = 5200 minutes

Charge Time = 5200 minutes ÷ 60 minutes

Charge Time = 86.6 hours

With only 5rW of surplus power, it would take 3 days, 14 hours and 40 minutes of real-time to fully charge the Large Battery with a current capacity of 3200rWm.

**Step 3(Optional): **To figure out how much time a given capacity will run for, with no input power and outputting a specific amount of power, we use the following equations:

**Seconds =** (Current Capacity ÷ Active Usage = Minutes) × 60

**Minutes = **Current Capacity ÷ Active Usage

**Hours =** (Current Capacity ÷ Active Usage = Minutes) ÷ 60
