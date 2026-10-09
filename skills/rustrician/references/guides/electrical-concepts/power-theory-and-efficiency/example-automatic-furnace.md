# Electrical Concepts: Power Theory and Efficiency › Example: Automatic Furnace

### Example: Automatic Furnace

This circuit demonstrates how circuits that don’t need to operate continuously can benefit from smart management of Stored Power. While it’s commonly said that a battery needs Active Usage × 1.25 to stay charged, that formula assumes continuous operation. If a circuit is only active part of the day, the player can input less power, as long as the battery has enough downtime to recover its capacity.

This design uses 6 Electric Furnaces managed by two Conveyors and a filtering system. The furnaces will only activate when Ore is detected. The first Conveyor detects ore and activates the Switch. When both Conveyors detect no items, they trigger an AND Switch that turns the furnaces off. The goal is to minimize energy usage while maintaining full automation.

Power In → Conveyor 1 → Conveyor 2 → Switch → Splitter

- Splitter → 2 additional Splitters → 6 Electric Furnaces

Conveyor 1:

- Checks the Input Box
- If Ore is present, sends Filter Pass → Switch Turn On
- If Ore is absent, sends Filter Fail → AND Switch

Conveyor 2:

- Transfers items as needed
- If smelted ore is absent, sends Filter Fail → AND Switch

When both conveyors signal completion, the AND Switch sends a pulse to the Turn Off input on the Switch, deactivating the furnaces.

This circuit is already intelligently designed by placing the furnaces after the Conveyors. Normally, if a conveyor is going to use an output, it needs to be given 2rW. The exception is when they are passing power through, they will only use 1rW.

**⚡ Solving for Efficiency**

This system has two clear power states:

- Active: 20rW required (furnaces on + conveyors)
- Idle: 2rW required (just conveyors monitoring)

Powering this from Root Power would require reserving 20rW at all times, whether the furnaces are active or not. Powering from a battery and always supplying 25rW to overcome Active Usage (20 × 1.25) would also be overkill if the system isn’t always running.

If a player can estimate the duration of usage per day, we can calculate the exact Root Power required to keep a battery neutral across that period. For example, let’s say the furnaces are active for 11 hours per day and idle for 13 hours.

**📈 Step 1: Calculate Total Daily Capacity Use**

**Formula:**

DailyCapacity = (ActiveUsageActive × MinutesActive) + (ActiveUsageIdle × MinutesIdle)

**Legend:**

- **DailyCapacity:** Total rust watt minutes (rWm) used in 24 hours
- **ActiveUsageActive:** Power draw during activity
- **MinutesActive:** Minutes the system is on
- **ActiveUsageIdle:** Power draw during standby
- **MinutesIdle:** Minutes the system is idle

**Example:**

DailyCapacity = (20 × 660) + (2 × 780)

= 13,200 + 1,560

= 14,760rWm

Therefore 14,760rWm of capacity will be consumed over a 24 hour period.

**🔋 Step 2: Calculate Input Power to Stay Neutral**

**Formula:**

RequiredInput = DailyCapacity ÷ (1440 × 0.8)

**Legend:**

- **RequiredInput:** Minimum Root Power input in rW to keep battery neutral
- **1440:** Minutes in a day
- **0.8:** Battery efficiency

**Example:**

RequiredInput = 14,760 ÷ (1440 × 0.8)

= 14,760 ÷ 1152

≈ 12.8rW ➞ rounded up to 13rW

By inputting just 13rW constantly into the battery, the system will break even over the day.

**📊 Step 3: Check Battery Capacity Requirements**

This step verifies if the battery can survive the discharge cycle.

**Formula:**

NetLoss = (ActiveUsageActive × MinutesActive) - ((RequiredInput × MinutesActive) × 0.8)

**Legend:**

- **NetLoss:** Total rWm lost from battery during activity
- **ActiveUsageActive:** Power draw during activity
- **MinutesActive:** Minutes the system is on
- **RequiredInput:** Minimum Root Power input in rW to keep battery neutral
- **0.8:** Battery efficiency

**Example:**

NetLoss = (20 × 660) - ((13 × 660) × 0.8)

= 13,200 - 6864

NetLoss = 6,336rWm

This means the battery will lose 6,336rWm over the 11 hours of operation. A Medium Battery (9,000rWm) would be more than enough to handle the load.

**✅ Alternate Example (Quick and Dirty Method)**

RequiredInput = ((PowerRequiredActive - PowerRequiredInactive) × (MinutesUsed ÷ 1440) + PowerRequiredInactive) × 1.25

**Legend:**

- **RequiredInput:** Minimum Root Power input in rW to keep battery neutral
- **PowerRequiredActive:** The amount of power the circuit needs to fully function
- **PowerRequiredInactive:** The amount of power the circuit needs in when not being used
- **MinutesUsed:** The number of minutes in a day the circuit will be active for
- **1440:** The number of minutes in 24 hours
- **× 1.25:** Battery efficiency

Example: Let’s assume the circuit uses 20rW for 11 hours a day and 2rW the rest of the time it is in standby.

RequiredInput = ((20 - 2) × (660 ÷ 1440) + 2) × 1.25

= ((18) × (0.46) + 2) × 1.25

= (8.28 + 2) × 1.25

= (10.28) × 1.25

RequiredInput = 12.85rW ➞ rounded up to 13rW

**Note: **This equation does not take into account how much capacity will be consumed during the active time. Not taking this into consideration can lead to the battery becoming depleted.

This balance of charge/discharge is key. It allows players to operate high-drain systems intermittently without needing large-scale power generation. This strategy is ideal for automated systems that react to player input or inventory states. Perfect for furnaces, doors, alarms, or anything event-triggered.

- Reduces constant power draw from 20rW → 13rW, a 35% reduction in Root Power
- Introduces flexibility to scale up without needing more Root Power
- By balancing discharge with recharge cycles, the battery can sustain operations efficiently.
- Smart use of Stored Power can significantly reduce Root Power demands.
