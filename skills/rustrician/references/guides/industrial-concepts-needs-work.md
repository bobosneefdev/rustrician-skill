# Industrial Concepts (Needs Work)

The industrial system lets players utilize electricity to replace several menial tasks. It is now possible to replace the manual labor of maintaining Tool Cupboards, sorting boxes, smelting ore or even crafting items with a few components and some rustricity. The details of the different industrial components can be found in the Industrial section under Component Details. It is recommended to be familiar with the different components before reviewing the different systems.

## Automated Tool Cupboard Extension

One of many menial tasks of daily base operations is topping up the Tool Cupboard to prevent the base decaying. If the base is small enough, the TC might be able to hold several days or more of upkeep, but as bases grow in size, it can quickly get out of control. With only a few components and a couple rust watts, players can reduce or even remove the need to spend any time focusing on the Tool Cupboard keeping it topped off. Like most things with Rustricity, there is more than 1 way to accomplish this task, all with different levels of complexity and functionality.

### Basic

Starting with this basic example, we are using the Conveyor to pull resources from 1 storage container to put into the Tool Cupboard, effectively tripling the number of inventory slots available to the Tool Cupboard. A player will still need to put resources into the box, but not as often as compared to without it.

Adding a Small Battery to the system will help to increase the amount of time the TC will continue to get filled should something happen to the main power supply and backup system. The drain on the battery is only 1rW so the lowest amount of power it needs to be given is 2rW.

Utilizing the MAX filter setting, the Conveyor will try to keep that amount of each resource in the Tool Cupboard at all times. Sending power from its Passthrough output to its Turn ON input will ensure it always turns on after a server restart. The Conveyor should never be turned off. Note that the MAX values do not need to fill the TC all the way. Values can be set to a lower amount if the player desires.

**Example:** The upkeep cost of a base is 3978 Stone and 100 Wood. The MAX filter for Stone could be set to 23,000 and for Wood it can be 1000. This will provide over 5 days of upkeep in the TC alone. As upkeep is consumed, the Conveyor will move resources in. If the box has 46,000 Stone, that is enough resources to last roughly 17 days. Add 2000 Wood to the box and the player would only need to worry about the Stone, eventually.

With the added benefit of only needing 4 components and 2rW of power to maintain, this is a very simple setup to help reduce the amount of time restocking the Tool Cupboard. 2rW is not a lot of power, but this example is not necessarily the most efficient way to use it. The Conveyor only needs to turn on when resources need to be transferred. Adding a couple more components and a few more wires, players can easily increase the functionality of those 2rW in highly beneficial ways.

### Basic+

With this example, the Conveyor is used to pull resources from 3 storage containers to put into the Tool Cupboard, effectively multiplying the number of inventory slots available to the Tool Cupboard by 6 times. A player will still need to put resources into the boxes, but not as often as compared to with only 1 container.

The addition of the Storage Monitor allows the Conveyor to be turned off when the Tool Cupboard is full. The power that the Conveyor was always consuming from the prior example, is now used by the Storage Monitor. The drain on the battery is still only 1. The Storage Monitor will pulse 1 power to the Conveyors Turn ON input when an inventory slot in the Tool Cupboard is emptied.

The Conveyor will use the MAX filter setting to check to see what, if any, resources are needed to be transferred. If some do, Filter Pass will output power tuning on the light (or any 1rW component). Once the TC is full again, the Conveyor will output power from Filter Fail turning off both the light and itself. If the light doesn't turn off, the storage boxes are out of resources. Note that the MAX values do not need to fill the TC all the way. Values can be set to a lower amount if the player desires.

**Example:** The upkeep cost of a base is 3978 Stone and 100 Wood. The MAX filter for Stone could be set to 23,000 and for Wood it can be 1000. This will provide over 5 days of upkeep in the TC alone. As upkeep is consumed, the Stone will be used faster than the Wood. Each time an inventory slot frees up, the Conveyor is turned on by the monitor and resources are transferred. When the TC is full again, the Conveyor will turn off. If each of the boxes has 47,000 Stone and 1000 Wood, that is enough resources to last a wipe.

By adding the light (or any 1rW component like an Industrial Light or Audio Alarm), it gives players an easy visual or audible way to know when the Tool Cupboard is getting stocked or low on resources. Even better is the addition of the Storage Monitor giving players the ability to pair their Tool Cupboard with Rust+. No longer will they need to visit the TC to check on the amount of remaining resources. These were some simple modifications allowing more functionality at no additional cost to the amount of power used. Things don't have to stop here if players are willing to step up the complexity of the circuit.

### Intermediate

A step up in complexity, this example is going to pull resources from a general representation of a storage system rather than having dedicated boxes just for the Tool Cupboard. This can further reduce the time spent on keeping the TC stocked.

Continuing with the trend of using a Storage Monitor, it will pulse 1rW every time an inventory slot is emptied. That pulse is used to turn on a Check Conveyor to control the timing of resource transfers.

A Check Conveyor uses the filtered items MIN value to check the Tool Cupboard and see if there are more or less of this set value. If there is more than the MIN amount, the Check Conveyor will turn itself off. When there is less, it will turn on the Transfer Conveyor. Using a Check Conveyor in this way allows players to set how few resources the TC can get down to before restocking it.

When the Transfer Conveyor is moving items, it will turn on the light (or any 1rW component). It will transfer resources until it reaches each item's MAX filter value. Once these values are reached, the Transfer Conveyor will turn itself off. During the transferring of resources, the Check Conveyors MIN values will be surpassed allowing it to also turn itself off. Note that the MAX values do not need to fill the TC all the way. Values can be set to a lower amount if the player desires, it just needs to be higher than the Check Conveyors MIN values.

**Example:** The upkeep cost of a base is 24,000 Stone. The MIN filter for Stone in the Check Conveyor could be set to 6000, and the MAX filter for Stone in the Transfer Conveyor could be set to 12,000. This will provide no more than half a day's upkeep but no less than 6 hours. Each time an inventory slot is emptied, the Check Conveyor will turn on look to see if more or less than 6000 Stone is present. If there are 6000 or more, the Check Conveyor turns itself off. If less, it will turn on the Transfer Conveyor. The Transfer Container will move Stone from the general storage until 12,000 Stone is present before turning off.

By adding the light (or any 1rW component like an Industrial Light or Audio Alarm), it gives players an easy visual or audible way to know when the Tool Cupboard is getting stocked or low on resources. The convenience of the Storage Monitor gives players the ability to pair their Tool Cupboard with Rust+ so no longer will they need to visit the TC to check on the amount of remaining resources.

These were some more simple modifications allowing even more functionality at no additional cost to the amount of power used over any other example shown. If players still want to delay the transfer, and don't want to use a Check Conveyor, a Counter could be used instead.

### Intermediate+

This example accomplishes the same task as the previous one, but with a few extra components. It is still going to pull resources from a general representation of a storage system rather than having dedicated boxes just for the Tool Cupboard. This will further reduce the time spent on stocking the TC.

Again, continuing with the trend of using a Storage Monitor, it will pulse 1rW every time an inventory slot is emptied. That pulse is used to count up once on a Counter and it is the Counter that controls the timing of resource transfers.

The Counter gets set to the number of inventory slots that will need to be emptied. Each slot that is emptied, a pulse from the Storage Monitor counts up by 1 on the Counter. When the Counters set value is reached, it will output power to turn on the Conveyor. The Counter does not consume power, so using the batteries Fully Charged output for this operation is actually free. While the Conveyor is running, the battery will drain a bit. The battery needs to be fully charged before the Counter gets back to the set value number.

When the Conveyor is turned on, it's going to transfer resources until it reaches their filters MAX value. When it starts to transfer, it can turn on a light or other 1rW components, to indicate that it is transferring or that the system is low on resources. Once the MAX values are reached, the Conveyor will both reset the Counter and turn itself off to conserve power.

**Example:** The upkeep cost of a base is 24,000 Stone. The MAX filter for Stone in the Conveyor could be set to 24,000 providing up to a day's upkeep. If the Counter was set to 12, the Tool Cupboard will consume 12 stacks or half a day’s upkeep, before turning on the Conveyor to refill the TC.

By adding the light (or any 1rW component like an Industrial Light or Audio Alarm), it gives players an easy visual or audible way to know when the Tool Cupboard is getting stocked or low on resources. The convenience of the Storage Monitor gives players the ability to pair their Tool Cupboard with Rust+ so no longer will they need to visit the TC to check on the amount of remaining resources.

This was another way to allow the same functionality at no additional cost to the amount of power used over any other example shown. If players want to take what has been shown here so far to the next level, combining everything is the only logical way forward.

### Advanced

This example is a combination of what is shown is both the Basic and Intermediate examples, for no additional power cost. It is not unreasonable to expect that players would be using a fully automated sorting system complete with Drop Boxes. Players should be spending any time moving loot around for Tool Cupboard upkeep. Go farm, dump it in the Drop Box and the system should take care of the rest.

The Storage Monitor will pulse 1rW of power every time an inventory slot is emptied. Every pulse is used to count up on a Counter that is in control of when resources will be transferred.

The Counter gets set to the number of inventory slots that will need to be emptied. Each slot that is emptied, a pulse from the Storage Monitor counts up by 1 on the Counter. When the Counters set value is reached, it will output power to turn on the Transfer Conveyor. The Counter does not consume power, so using the batteries Fully Charged output for this operation is actually free. While the Transfer Conveyor is running, the battery will drain a bit. The battery needs to be fully charged before the Counter gets back to the set value number.

When the Transfer Conveyor is turned on, it's going to transfer resources until it reaches their filters MAX value. When it starts to transfer, it can turn on a light or other 1rW components, to indicate that it is transferring or that the system is low on resources. Once the MAX values are reached, the Transfer Conveyor will both reset the Counter and turn itself off to conserve power.

A Check Conveyor uses the filtered items MIN value to check the Tool Cupboard and see if there are more or less of this set value. If there is more than the MIN amount, the Check Conveyor will turn itself off. When there is less, it will turn on the Smart Alarm, or any 1rW components. Using a Check Conveyor in this way gives the player a backup way to know when resources have reached a critically low level.

**Example:** The upkeep cost of a base is 24,000 Stone. The MAX filter for Stone in the Transfer Conveyor could be set to 24,000 providing up to a day's upkeep. The MIN filter for Stone in the Check Conveyor could be set to 6000. If the Counter was set to 12, the Tool Cupboard will consume 12 stacks or half a day’s upkeep, before turning on the Transfer Conveyor to refill the Tool Cupboard back to 24,000 Stone. While it transfers resources, the light will turn on. Each time an inventory slot is emptied, the Check Conveyor will turn on to see if there is more or less than 6000 Stone. It should never get this low with the Counter in place, but maybe resources are just not available. The light not turning off should be the first indication something is wrong. If there are less than 6000 Stone, the Check Conveyor will turn on the Smart Alarm to notify the player in a more direct way.

These systems are not limited to what has been shown. These are just some of the most efficient ways to accomplish automating the Tool Cupboards upkeep, freeing a player from the mundane task. If players want to take upkeep to the next level, they can experiment with the decay and healing rates of both interior and exterior walls.

### Advanced+

This final circuit in the Tool Cupboard Extension series goes beyond simply automating upkeep delivery. It introduces a strategic method for reducing the total amount of resources consumed by taking advantage of Rust's decay and repair mechanics.

Unlike exterior building blocks, interior blocks decay at only 10% the normal rate — but when upkeep is consumed, they are repaired just as fast as exterior walls to fully restore their health. When properly configured, this allows players to delay upkeep just long enough for damage to occur and then allow the Tool Cupboard to repair it at full efficiency. The result is a potential 90% reduction in upkeep cost for core structures built with Armored building blocks.

The purpose of this system is twofold:

- Automate the replenishment of Tool Cupboard resources at fixed intervals
- Calculate the optimal amount of resources to be transferred — and how often — based on acceptable building block health loss.

By using mathematical formulas based on decay cycles and repair behavior, players can precisely tune their setup. This system benefits solo players and large teams alike by minimizing farming, maximizing efficiency, and ensuring a base remains protected with minimal overhead.

**🧠 How It Works**

This circuit uses a fully charged Small Battery as a power source to drive a Conveyor at regular intervals. Unlike traditional battery-backed circuits, the logic here leverages the batteries Fully Charged output for a Timer and the Conveyor’s Filter Fail output to automate shutdown and schedule the next transfer.

**The system operates as follows:**

- The Small Battery’s Fully Charged output powers a Timer.
- The Timer powers the Block Through input of a Blocker.
  - When the Timer is ON, the Blocker is blocked.
  - When the Timer is OFF, the Blocker passes power through.
- The Small Battery’s Power Output is connected to the Blocker’s input.
- The Blocker’s output powers a Conveyor.
- The Conveyor’s Passthrough is connected to its Turn On input, ensuring it self-triggers.
- Once the Conveyor finishes transferring resources, it activates its Filter Fail output.
- Filter Fail powers the Timer ON, restarting the Timer and blocking the circuit again.

This automation ensures that the Conveyor only runs at specific intervals and shuts off properly including after a server restart.

**⚠️ Important:** The Small Battery must remain fully charged. To ensure this, provide it with a constant 2rW of power after it is completely charged.

**🔄 Power Flow Logic**

**Power Source:**

- Small Battery
  - Fully Charged → Timer input
  - Power Output → Blocker input

**Main Circuit Flow:**

- Timer → Block Through (Blocker)
- Blocker Output → Conveyor Input
- Conveyor Passthrough → Conveyor Turn On
- Conveyor Filter Fail → Timer Toggle

**Cycle Behavior:**

- Timer OFF = Blocker allows power → Conveyor turns on → Transfer begins
- Conveyor completes transfer → Filter Fail triggers Timer ON → Blocker activates → Conveyor loses power
- Timer counts down again, cycle repeats

**🔄 Decay/Repair and Upkeep Mechanics**

**🕐 Upkeep Timing**

- After construction or upgrade, each building block starts its own 10-minute timer. At the end of that timer, the building block requires upkeep.
  - If supplied, there is no change to the building block.
  - If not supplied, the building block takes damage.
  - If supplied and the building block is damaged, it will be repaired.
- The TC checks every 10 seconds to see what building blocks have expired timers. At this time, any expired timers will either consume upkeep or inflict decay.

**📉 Default Decay/Repair Rates per Tier**

**Tier**

**Max HP**

**Total Time**

**# Intervals**

**HP lost / 10 min**

Twig

10

1h

6

1.67

Wood

250

3h

18

13.88

Stone

500

5h

30

16.67

Metal

1000

8h

48

20.83

Armored

2000

12h

72

27.78

- Interior building blocks decay at 10% of the normal rate, but they are repaired just as quickly as exterior blocks.
- This creates a huge opportunity to reduce upkeep cost by delaying repair for as long as health loss is acceptable — and then recovering full durability quickly and cheaply.

**📌 Tax Scaling**

Tool Cupboard upkeep is based not only on the materials used to build but also on the number of building blocks connected to a structure. Rust applies an upkeep tax percentage that increases as more blocks are added.

This tax is calculated using four brackets, each applying a different rate:

**Bracket**

**Block Range**

**Tax Rate**

0

1–15 blocks

10%

1

16–65 blocks

15%

2

66–190 blocks

20%

3

191+ blocks

33.3%

The final tax is an average across all blocks, not just a flat rate. Each building block contributes its own tax rate based on its bracket. The total upkeep is calculated by summing the taxed values of all blocks, then rounding up.

This cumulative system means that as base size increases, the average tax — and thus total upkeep — rises proportionally, encouraging compact and efficient designs.

**📀 Key Formulas**

These formulas allow players to calculate exactly how long to wait before sending resources to the Tool Cupboard, and how many to send based on desired damage tolerance, upkeep cost, and repair rate.

**1. ⏱️ Timer Delay (in minutes)**

Determines how long to set the Timer to. This is how long the system should wait before transferring upkeep resources to the Tool Cupboard.

TimerSeconds = ((HP_loss ÷ DecayRate) × 10) × 60

**Legend:**

- **TimerSeconds:** The amount of time to set the Timer to
- **HP_loss:** How much damage a player is willing to let blocks decay (eg. 200hp)
- **DecayRate:** HP lost per 10 minutes (based on building tier for interior building blocks)
  - **Armored:** 2.78
  - **Metal:** 2.08
  - **Stone:** 1.67
  - **Wood: **1.388
  - **Twig:** 0.167
- **× 10:** Converts intervals into real-world minutes
- **× 60: **Converts Minutes to Seconds for the Timer

**2. 🎚️ Conveyor Max Filter (Resource Quantity)**

Calculates how many resources to send to repair the defined damage.

MaxFilter = CEIL( (HP_loss ÷ RepairRate) × (Upkeep ÷ 144) )

**Legend:**

- **MaxFilter:** The amount to set the resources MAX filter setting to in the Conveyors filter list.
- **HP_loss:** Same value as above, how much damage a player is willing to let blocks decay( eg. 200hp)
- **RepairRate:** HP repaired per 10 minutes (based on building tier for exterior building blocks)
  - **Armored:** 27.78
  - ** Metal:** 20.83
  - **Stone:** 16.67
  - **Wood:** 13.88
  - **Twig:** 1.67
- **Upkeep:** The 24-hour upkeep value displayed in the Tool Cupboard
- **÷ 144:** Number of 10-minute intervals in 24 hours
- **CEIL:** After completing the equation, round up to the next closest full number (eg. 1.2 = 2, 7.01 = 8)

**Supporting Formulas**

These additional formulas help with broader upkeep planning and fine-tuning:

**3. 🔄 Calculate The Upkeep Cost Every 10 Minutes**

Upkeep10Min = Upkeep ÷ 144

**Legend:**

- **Upkeep10Min:** Resources consumed per 10-minute interval
- **Upkeep: **Daily upkeep cost shown in the Tool Cupboard
- **÷ 144:** Number of 10-minute intervals in 24 hours

**4. ⏳ Calculate The Amount Of Resources Consumed Over A Player Specified Time Period**

UpkeepTotal = (Upkeep ÷ 144) × (Minutes ÷ 10)

**Legend:**

- **UpkeepTotal:** Total resources consumed over custom time
- **Upkeep:** Daily upkeep cost shown in the Tool Cupboard
- **÷ 144:** Number of 10-minute intervals in 24 hours
- **Minutes:** Number of real-time minutes chosen by the player
- **÷ 10:** Converts minutes into intervals

**5. ⌛ Calculate How Many Minutes A Given Amount Of Resources Will Last?**

UpkeepMinutes = (Resources ÷ (Upkeep ÷ 144)) × 10

**Legend:**

- **UpkeepMinutes:** How many real-world minutes the resources will last
- **Resources:** The player chosen number of resources placed into the Tool Cupboard
- **Upkeep:** Daily upkeep cost shown in the Tool Cupboard
- **÷ 144:** Number of 10-minute intervals in 24 hours
- **× 10:** Converts upkeep intervals into real-world minutes

**6. 🔁 Calculate How Many Intervals A Given Amount Of Resources Will Last?**

Intervals = (Resources × 144) ÷ Upkeep

**Legend:**

- **Intervals:** Number of 10-minute cycles
- **Resources:** The player chosen number of resources placed into the Tool Cupboard
- **Upkeep:** Daily upkeep cost shown in the Tool Cupboard
- **× 144:** Number of 10-minute intervals in 24 hours

**7. 🧱 Calculate The Amount Of Decay Over A Players Given Number Of Minutes (Interior Walls Only)**

HP_loss = InteriorDecay × (Minutes ÷ 10)

**Legend:**

- **HP_loss:** Total health lost before a repair cycle begins
- **InteriorDecay:** HP lost per 10 minutes (based on interior walls — 10% of normal rate)
  - **Armored:** 2.78
  - **Metal:** 2.08
  - **Stone:** 1.67
  - **Wood:** 1.388
  - **Twig:** 0.167
- **Minutes:** Number of real-time minutes the player allows the walls to decay
- **÷ 10:** Converts minutes into 10-minute intervals

**8. 📏 Calculate The Number Of Intervals Required To Allow A Specific Amount Of Decay, or HP Loss (Interior Walls Only)**

Intervals = HP_loss ÷ InteriorDecay

**Legend:**

- **Intervals:** Number of 10-minute cycles
- **HP_loss:** How much damage a player is willing to let blocks decay (eg. 200)
- **InteriorDecay: **HP lost per 10 minutes (based on interior walls — 10% of normal rate)
  - **Armored:** 2.78
  - **Metal:** 2.08
  - **Stone:** 1.67
  - **Wood: **1.388
  - **Twig:** 0.167

**🧰 Example Calculation — Optimizing Armored Core Upkeep**

A player has a base with a 2x2 core and honeycomb. The exterior is Stone, the interior is Armored with Metal floors. The Tool Cupboard shows a daily upkeep of 1843 Stone, 172 Metal, and 61 HQM. For this example, we will calculate only for HQM. The player is willing to allow 200 HP loss before repair begins.

**Step 1: Calculate the Timer Delay**

TimerSeconds = ((HP_Loss ÷ InteriorDecayRate) × 10) × 60

= ((200 ÷ 2.78) × 10) × 60

= (71.94 × 10) × 60

= 719.42 × 60 = 43,165 seconds (~12 hours)

**Step 2: Calculate Conveyor HQM Max Filter**

MaxFilter = CEIL((HP_Loss × UpkeepPerDay) ÷ (RepairRate × 144))

= CEIL((200 × 61) ÷ (27.78 × 144))

= CEIL(12,200 ÷ 3999.84)

= CEIL(3.05)

= 4

**✅ Final Setup:**

- **Timer Delay:** 43,165 seconds (~12 hours)
- **HQM Max Filter:** 4
- **Metal Max Filter:** 2000 (for multiple days of upkeep)
- **Stone Max Filter:** 20000 (for multiple days of upkeep)

This setup allows the player to reduce upkeep by letting the armored core decay intentionally, then repairing with only 4 HQM every 12 hours rather than spending 53 over the same time period.

**⚙️ Design and Efficiency Considerations**

- Players may optionally connect a Siren Light to the Filter Pass output of the Conveyor.
  - This provides a visual indicator that a transfer is occurring.
  - If the light remains on, it means the Conveyor is stuck trying to complete the transfer — likely due to insufficient resources to satisfy all filters.
  - This early warning can prevent silent TC failures.
- When using a Siren Light, the small battery must be given a constant 3rW:
  - This ensures that its Fully Charged output stays active at all times, keeping the light circuit functional and preventing unintended battery drain.
- This setup offers an intuitive and effective status alert for long-term bases with minimal monitoring needs.
- The feature is especially useful for low-frequency transfer systems (e.g., every 12+ hours) where failures might otherwise go unnoticed for a full decay cycle.

**📘 Recommended Reading**

**🔗 External References**

- [Automated Tool Cupboard Extensions](https://www.rustrician.io/?circuit=1e1ee758894ce7c070c80455dc024fff)

## Auto-Smelting

### Automatic Electric Furnace

## Auto Sorting

[The ONLY Rust Sorting System Tutorial You'll EVER Need (Beginner to GOD)](https://youtu.be/dHawUz3q-Oo?si=z6rAxipQzBlma86y)

- An important concept to note here when expanding your sorting system to more boxes is proper splitter expansion. The idea is to maximize the outputs while minimizing the depth count (see Industrial Conveyor section). This is done by working in multiples of 3, taking one splitter and using all three of its outputs to other splitters, thus giving you nine outputs. This can be thought of in a “tree/pyramid” format.
  - [Example](https://www.rustrician.io/?circuit=20ba1200370818821b65bb963bde6492)
    - The line on the left is daisy chained splitters. This gives you effectively 2 outputs per splitter, but will stop after 32 “levels” of splitters, effectively only giving you a maximum of 65 outputs from this before you run into component depth.
    - The line on the right utilizes the tree/pyramid expansion theory, only using 3 levels of depth (including the top example splitter) while giving 9 outputs, further expanded in the example below.
    - This example only uses 4 levels of component depth while having 81 outputs available, much below the 32 component depth limit.
      - The max amount of splitter outputs you can have while not exceeding component depth is as follows:
        - (# of splitter outputs)^(max component depth)
        - 3^32 = 1,853,020,188,851,841
      - Realistically, with 4 levels of depth having 81 outputs, 5 levels of depth having 243 outputs, and 6 levels of depth having 729 outputs, if done intelligently you should never run into depth in this manner
    - The main culprit of component depth would be something like in large lines of furnaces or buffer boxes. Technically you could run 32 furnaces in one line (conveyor to conveyor), but it has to come directly from and go directly into the conveyors, leaving you no room to extend the connections.
    - To alleviate this, you can split those lines into multiple conveyors (i.e. 4 groups of 25 furnaces, giving you 100 furnaces) or into multiple lines (i.e. 32 buffer boxes, split into groups of 11/11/10 and re-combined, giving you 13 component depth and 32 adapter limit).

## Condenser Conveyors

- These are intended to “condense” your loot into a certain set of adapters, most useful in larger systems where you have many boxes for loot (i.e. wood, charcoal), and don’t have room for it all in your main living area and don’t want it clogging your buffer boxes.
  - They can also be used for category buffer boxes, where you have your main buffer boxes, send an inclusion conveyor out to that category (resources, armor, weapons, wood, charcoal, etc), and then “condense” that category buffer box into your main living area loot boxes
  - These can also be useful for systems with check features that utilize the MIN/MAX values (i.e. charcoal farm, furnace system) to alleviate any issues of the conveyor reading multiple adapters

## Super Sucker

- This can be used to speed up the industrial transfer of items from one adapter to another, mainly used from drop boxes to buffer boxes. It works by taking one input, splitting it into multiple outputs (example below shows 3), and re-combining it, therefore 3x’ing the speed.
  - With the industrial conveyors running on an industrial cycle of about every 5sec, and moving stackable items at 60 items/cycle, you then create a system in the “Super Sucker” where the adapters on the input are seen 3x per cycle instead of 1x. Depending on what order the conveyors were powered in, they can all run slightly offset from each other, but per industrial cycle they will all trigger their own transfer.
    - There used to be a use case where you could add more adapters and multiply this speed even more, but this was patched in February 2026 with the Naval update.
  - Jattdaput Example Schematic: <https://www.rustrician.io/?circuit=16eb3302e34b14484327f50a3e663c34>

## Check Conveyors

- These can be used to monitor the content of the input (i.e. box) and trigger another behavior based on the conditions presented by using the Filter Pass/Fail signals. Generally these are left with an empty output, but that can be utilized in certain systems.
    - Example: For a small furnace circuit where you want to monitor the amount of wood in your wood box, leaving the MIN value, so you can run a check conveyor out of the wood box, and then the Filter Pass into the Turn On of the transfer conveyor, and the Filter Fail into the Turn off.
      - This ensures that you will transfer wood AND ore into your furnaces when both are present and you have a sufficient qty of wood for the MIN value, but it won’t send ore to your furnaces if there’s not enough wood present.

## Auto Lockers

- These are set up simply by taking the adapter outputs from your boxes w/ the desired locker contents and sending them into lockers, allowing them to autofill after taken (i.e. you can use a couple of syringes to heal up to full and they’ll refill so you can put them back into your hotbar)
    - With 3 adapters per locker (1 for each slot), you can put 3 different kits in the lockers.
      - Example:
        - Slot 1: Full Metal AK kit
        - Slot 2: Hazmat SMG kit
        - Slot 3: Supply kit
    - You can also include exclusion conveyors for those who have a hard time with tossing out their rocks & torches after they spawn.
      - You can copy & paste the exact same conveyor items as in your inclusion conveyor, but change the filter mode to “Exclude Listed Items”.
      - If your buffer boxes in your sorting system then get clogged with junk like rocks & torches, you can make a “junk conveyor” and send it to somewhere insignificant for junk storage.
  - In large systems, you may run into a scenario where you can’t combine all of your adapters for the input boxes (clothing, weapons, ammo, etc) without exceeding the 32 adapter limit. In this case, you can implement condenser conveyors to “reset” the adapter limit for each group (i.e. condense 6 AK boxes into 1, decreasing adapter count from 6 to 1) or run each set of kits into one conveyor instead of one line (i.e. full metal kit into one output, hazmat kit into one output, supply kit into one output).

## Auto Shops

- Following the same principles as above in Auto Lockers, the same is applied for vending machines, allowing you to keep a constant stock of items and move the sales back into your sorting system.
    - Be sure to set MIN values on your inclusion conveyors so it doesn’t run your boxes out of your product(s).

## Auto Crafting

Nothing entered here.
