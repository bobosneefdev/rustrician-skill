# Electrical Concepts: Power Storage › Batteries: Parallel vs Series

### Batteries: Parallel vs Series

Understanding how batteries function in different configurations is critical for optimizing power systems. In real-life electrical systems, batteries can be wired in **series **or **parallel**, each offering different results in terms of power output and energy capacity. The same terminology can be applied to Rust, but with some differences due to the game’s simplified electrical mechanics.

#### Real-World Analogy

In real-world electrical systems, batteries have two terminals:

- **Positive (+)**
- **Negative (-)**

These terminals are used to connect batteries in either **series** or **parallel**, depending on the desired outcome.

Battery performance is measured using:

- **V (Volts):** Indicates power output (pressure).
- **Ah (Amp hours):** Indicates energy capacity (storage).

**🔗 Series Wiring (More Power, Same Runtime)**

- Batteries are connected by wiring the positive terminal (+) of one battery to the negative terminal (-) of the next.
- The remaining negative (-) and positive (+) terminals are used for the circuit’s input/output.
- This configuration adds voltage while keeping the capacity the same.
- **Example:** Two 6V 10Ah batteries in series = **12V, 10Ah**
- **Purpose:** Used when a system needs more power but does not require extended runtime.

**🔗 Parallel Wiring (Same Power, More Runtime)**

- Batteries are connected by joining all positive terminals together and all negative terminals together.
- This configuration keeps the voltage constant while adding capacity.
- **Example: **Two 6V 10Ah batteries in parallel = **6V, 20Ah**
- **Purpose: **Used to extend the runtime of a system without increasing power output.

#### Translating to Rust

In Rust, battery behavior is streamlined compared to real-life electronics. There are no positive or negative terminals, and there’s no concept of voltage and polarity. However, the concepts of power and capacity still exist, just in different terms. Instead, everything revolves around two values:

- **Rust Watts (rW):** This represents the power output, similar to **voltage (V)** in real life. It’s the amount of energy delivered to components.
- **Rust Watt Minutes (rWm):** This represents energy storage capacity, similar to **Amp-hours (Ah)**. It shows the total energy a battery is holding.

Each battery in Rust has only two terminals:

- **Power In:** Used to charge the battery.
- **Power Out:** Used to supply power to a circuit.

There are no positive or negative terminals, voltage and Amp-hours do not exist, but the two core functions of batteries are still the same, powering circuits and storing energy. So while Rust doesn’t let players literally wire batteries in parallel or series, they can mimic those configurations in terms of outcome by connecting their outputs with 1 of 2 components:

**🔗 Series Wiring in Rust (More Power, Same Capacity)**

- **Component Used:** Root Combiner
- **Effect:** Increases power output, maintains same capacity.
- **Example:** Two Large Batteries = **200rW output, 24000rWm capacity**

**🔗 Parallel Wiring in Rust (Same Power, More Capacity)**

- **Component Used:** OR Switch
- **Effect:** Keeps power output the same, doubles capacity.
- **Example:** Two Large Batteries = **100rW output, 48000rWm capacity**

So while players can’t physically “wire” batteries in series or parallel, the game still gives them the flexibility to design around the same trade-offs. Want more power all at once? Go series with a Root Combiner. Want to stretch your batteries to last longer? Design in parallel with the OR Switch. Want to get the most amount of power all at once and increase the battery life? Combine the two and make a hybrid.

Whether players have wired the batteries outputs into a serial or parallel configuration, they are joined in a way that leaves only a single output connection, just like any battery. The same must be achieved with the battery inputs and to do that, a charging solution is needed.

#### Applying Series in Rust

To wire two Large Batteries in series in Rust, connect the outputs of both batteries to a Root Combiner. This will merge their outputs into a single line capable of providing 200rW, double the output of one battery, while maintaining the same 24000rWm capacity.

Need more than 200rW? Keep adding:

- More **Batteries**
- More **Root Combiners**

**Charging & Performance Considerations**

All batteries wired in series should be of the same size. This ensures that the batteries will supply the full amount of power, the entire time they are draining. That said, intentionally using mismatched sizes can be done, as long as players are aware that the smaller batteries will drain first.

All batteries wired in series should be charged at the same rate to prevent imbalance. The Splitter will help keep power levels equal across all batteries. If one battery drains completely before the others, a portion of the circuit will lose power. For example, if there are 3 batteries in series and 1 of them empties, 33% of the circuit will go offline because one third of the power is gone.

If only 200rW is needed but there are 300rW worth of batteries, 1 of the batteries is redundant, meaning 1 battery can be destroyed and the main circuit will continue to function. This is a way to create redundancy but it's expensive and there are better and more efficient ways, such as Secondary Batteries.

**Series Wiring in Inline vs Bypass**

Batteries wired in series can be installed into both Inline and Bypass battery backups, but their performance differs significantly.

- **Inline Backups**:
  - To install batteries in series into an Inline backup, players will need to connect their power source to the Splitters that evenly divide power to all the batteries.
  - Inline Battery Backups are great backup solutions as long as Active Usage on the battery is properly managed.
  - If one Large Battery is fully utilized (100 Active Usage), it requires at least 125rW input to remain charged.
  - Each battery wired in series will have the same Active Usage. So two batteries in series now need 250+rW of Root Power just to stay neutral, and more to charge.
  - Four batteries wired in series used as an Inline Backup will need over 500rW of Root Power to maintain a positive charge.
  - An appropriate amount of Splitters are needed to evenly divide the incoming power to all the batteries.
  - This makes Inline setups highly inefficient when using series-wired batteries. The Active Usage tax removes the flexibility normally gained from inline control.
  - **Please, DO NOT do this.**
- **Bypass Backups**:
  - To install batteries in series into a BCN Core, players will need to connect the Splitters to the OR Switch that normally powers a single battery, and the Root Combiner from the batteries to the Electrical Branch that feeds power to the final OR Switch.
  - Since Bypass systems power circuits with Root Power directly, bypassing the batteries most of the time, **Active Usage consideration is irrelevant**.
  - The reason the batteries are wired in series to begin with is to provide more Available Power then 1 battery is able to. Because of that, it is reasonable to assume that the Active Usage on the batteries will be maxed out and we accept the fact that they will only run for a minimum of 4 hours.
  - A setup like the BCN Core using four Large Batteries in series can supply 399rW for a minimum of 4 hours, assuming all Root Power has been removed.
  - If there is still some Root Power but is no longer able to meet the required amount, the batteries take over, and any remaining Root Power is redirected to the battery bank to slow the discharge rate and get longer than 4 hours of backup time.
  - The minimum Root Power requirement to keep this running is about 440rW, making it much more manageable than the Inline equivalent.
  - Adding additional large batteries increases available power in 100rW chunks while only increasing power production by roughly 110rW (100 for the new output, 10 to maintain charge).

**Efficiency Notes**

Series wiring of batteries is only recommended in Bypass Backups because they remove taking Active Usage into consideration

- Bypassing Active Usage allows players to focus on efficient consumption of Root Power. Root Power can always be converted into Stored Power to leverage Active Usage later on with intelligent circuit design.
- But, if 200rW of battery power is available, circuit design should aim to use all 200rW, rather than leaving some power underutilized.
- If a circuit only needs 120rW, it might be more efficient to cut the circuit in half. Powering it from 2 independent power cores. At the very least, it will increase the runtime of the battery backup.

If a player chooses to use an Inline Backup, combining batteries to get 200rW to power a circuit that only generates 120 Active Usage, splitting the circuit into 2 independent systems will always be a more efficient option.

- Combining them to get 200rW is going to apply 100 Active Usage to both batteries and needs 250rW to maintain a positive charge.
- Splitting the circuit lets each battery take on 60 Active Usage, making the total power needed only 150rW. Simply by not combining the batteries, players will save roughly 100rW of power production. That's an entire Wind Turbine if it's built on the 8th floor.
- Never use batteries wired in series in an Inline Backup. Separate circuits into groups of 100rW or less.

**Be aware:** The Root Combiner has a maximum depth of 16 components from itself to the main power source. This theoretical maximum is covered in the Max Depth section under Power Distribution.

#### Applying Parallel in Rust

To wire two Large Batteries in parallel in Rust, simply connect each battery’s output to an OR Switch. This will merge the battery's outputs into a single line. The OR Switch prioritizes Input A over Input B or whichever has the higher power level and ensures only one battery is active at a time.

**How It Works:**

- While Battery 1 (Input A) has charge, it will fully power the circuit.
- Once Battery 1 depletes, the OR Switch automatically switches to Battery 2 (Input B) with no interruption to the circuit.
- This method effectively doubles total capacity allowing for twice the runtime, while maintaining the same output limit of 100rW.

**Adding more batteries is straightforward:** just chain more OR Switches.

- For 3 batteries:
  - 2 batteries feed OR Switch 1.
  - The output of OR Switch 1 and the next battery feed OR Switch 2.
  - The final output goes to the circuit.
- For 4+ batteries: add a third OR Switch and repeat the pattern.

**Charging & Performance Considerations**

Parallel battery banks must be charged differently than series banks. In series, batteries should be charged simultaneously with a Splitter. In parallel, while a splitter can be used and is in some edge cases, it is highly typically inefficient. Instead, batteries should be charged sequentially, or one at a time.

To charge batteries sequentially, a Sequential Power Distributor is used. This basic charging system uses Memory Cells and the battery’s Fully Charged output to rotate charging between batteries:

- The Memory Cell starts by sending power to Battery 1 from its Inverted Output.
- When Battery 1 is fully charged, its Fully Charged output goes to Set on the Memory Cell. This will flip the Memory Cells outputs to begin charging Battery 2.
- A Control Battery constantly provides power to Reset on the Memory Cell, ensuring the system defaults back to the first battery or any battery that starts to drain.
- The number of Memory Cells needed is always 1 less than the number of batteries.
- 4 Large Batteries in parallel = 3 Memory Cells → results in 96,000rWm capacity (16 hours runtime at 100rW).

While this basic charging solution works, it assumes 2 things. The output power is 100rW, not less, and that no battery will be destroyed. If less than 100rW is needed or there is a concern that a battery might be destroyed, the charging solution needs some design changes.

**Advanced Charging **

If a circuit needs less than 100rW, or if there is a risk of a battery being destroyed (such as on a PvP server), the charging circuit requires some additional design features:

- If less than 100rW is needed, attach an Electrical Branch to the output of the battery and Branch Out the limited amount of power to the OR Switch. This ensures the output from the batteries will match the circuit’s demand.
- If there is a concern that a battery might get destroyed, a more intelligent design is needed.
- Attach an Electrical Branch to the output of the battery and Branch Out **up to** all but 1rW to the OR Switch.
- Power Out will send power through a Blocker to Set on the Memory Cell. This will tell the system if the battery is present and needs to be charged.
- When the battery is full, its Fully Charged output will go to Block Passthrough on the Blocker allowing the Memory Cell to flip outputs and charge another battery, or pass power to another Memory Cell.
- Reset on the Memory Cells get constant power from a Control Battery to constantly try and push power to the next battery in line. This is only achieved if a battery is full or missing.
- The last battery in parallel will get its power from the Inverted Output from the last Memory Cell. It doesn't need a blocker but does need an Electrical Branch set to the same value as the rest.
- This kind of intelligent design does require 1rW from each battery.

**This setup allows for:**

- Safe automatic charging
- Dynamic prioritization
- Resilient operation even if a battery is destroyed

**Parallel in Inline vs Bypass Systems**

- **Inline Backups**

Parallel wiring is an excellent choice to extend the runtime of Inline backups:

- The first battery that gets charged will be the battery that will constantly be actively draining.
- The power given to this system will need to be high enough to overcome the batteries Active Usage just like any Inline Backup.
- Once the first battery is fully charged, the charging system will begin charging the next battery. However, because the first battery is still the one connected to supply the circuit, it will continue to discharge. This causes the system to alternate between topping off the first battery and briefly charging the second, resulting in the Memory Cell flipping back and forth.
  - By merely switching which battery connects to which OR Switch input, players have full control over which battery drains first.
  - A common practice is to reverse the order the wires are connected to the OR Switch. Instead of left to right, wire them right to left. The bottom battery to the first input and the top battery to the last input on the OR Switches. At some point the battery that is draining and the one that is charging will be the same battery. Once it fills up and becomes full, the system will start charging the next battery and the Active Usage will be transferred to it.
  - This will help prevent the system from constantly flipping between batteries while in use.
- Once there is no Root Power supply, the batteries will drain one at a time, extending runtime.
- In the event a battery is destroyed, the next battery takes over seamlessly and any incoming power is automatically transferred to it. It would take destroying every battery before the inline power core would no longer be able to support the desired load.
- This allows for very efficient use of Root Power by charging as many batteries as a player wants.

**Bypass Backups**

Parallel wiring also works in Bypass systems, but with limitations:

- Since Bypass systems power circuits with Root Power directly (bypassing the batteries most of the time), **Active Usage consideration is irrelevant**.
- A single parallel battery bank in a BCN Core is treated no differently than if there was only a single battery in terms of the amount of Root Power needed.
- In a BCN Core, 1rW is needed from the battery bank to let it know batteries are still present. The intelligent design of the distributor also needs 1rW from each battery. This means using Large Batteries, only a max of 98rW is usable.
- When Root Power is not enough to support the circuit, the battery bank will take over but is limited to a maximum output of only 98rW using Large Batteries.
- If Root Power fails, parallel batteries take over seamlessly, one at a time extending runtime.
- The more batteries in parallel, the longer the backup time will last for.
- Bypass Backups are typically used for circuits that need more than 100rW. If more power and a larger capacity is needed, a hybrid solution (series + parallel) is required.

**Efficiency Considerations**

Parallel setups excel in both Inline and Bypass backup. No matter how many batteries are wired together, the entire bank of batteries is treated no differently than a single battery.

- Only one battery discharges at a time.
- Only one battery charges at a time.
- No additional Root Power is required to charge as many batteries as a player chooses.
- Uptime is greatly extended, ideal for critical circuits that must always stay online.

**Bottom Line:

**The OR Switch is a highly effective way to parallel batteries, it's just the charging solutions that adds a layer of complexity. When uptime is more important than raw power, Parallel wins. For larger circuits needing more than 100rW, players should explore Series or Hybrid configurations.

#### Applying Hybrid (Series+Parallel) in Rust

Hybrid battery wiring combines the power output advantages of Series with the extended capacity of Parallel. In Rust, this is possible using 2 different methods.

- **Method 1: **Parallel-Series Hybrid
- **Method 2: **Series-Parallel Hybrid

Both methods allow players to create extremely powerful, high-capacity battery systems, ideal for large, high-demand circuits that require extended backup run times. Although the outcome of each method is the same, their design philosophy and implantation and limitations differ.

- With **Method 1**, the only time it will not output 200 is when **all** of the batteries in 1 bank of parallel batteries are depleted or destroyed.
  - If a battery is depleted or destroyed, the next battery in the bank takes over.
  - Only once all of the batteries in a single bank are depleted or destroyed, will the output be limited to 100.
  - Do not place all batteries in 1 bank in the same physical location.
- With **Method 2**, the only time it will not output 200 is when 1 battery is depleted or destroyed in **each **of the series wired battery banks.
  - If a battery is depleted or destroyed, the next bank of series batteries will take over.
  - Only once 1 battery in all the banks are depleted or destroyed, will the output be limited to 100.
  - While still not recommended, it would be more acceptable to keep all batteries in 1 bank in the same location.
- **Method 1** has a higher component count compared to Method 2.
- **Method 1** relies on a bug/feature of the Splitter being allowed to connect to the Root Combiner.
- **Method 1** will be limited in size due to **Max Depth** before Method 2.
  - **Method 1** as shown has **3 components** before the Root Combiner.
  - **Method 2** as shown has **1 component** before the Root Combiner.
  - Therefore Method 2 is able to be designed to handle larger loads.

##### Parallel-Series Hybrid

**How It Works:**

- **Build Parallel Battery Banks first:**
  - Batteries are connected to OR Switches allowing one battery to be active at a time.
    - Input A is prioritized over Input B when power levels are the same, or whichever is higher.
  - Only the first battery in each Parallel Bank will carry 100% of the circuit's load and Active Usage.
  - If an Electrical Branch is used to limit a battery’s Available Power, it will not limit the Active Usage the battery could register.
  - The remaining batteries in each Parallel Bank will remain idle until the battery before is depleted or destroyed.
  - Each bank is treated as a single high capacity battery.
  - For example, 3 Large Batteries in Parallel = 100rW output, 72000rWm capacity.
- **Then wire these banks in Series using Root Combiners:**
  - Each bank of parallel batteries needs a Splitter to connect to the Root Combiner.
  - Each bank of high capacity batteries is combined to increase the available power.
  - Only 1 battery from each bank is active at a time.
  - Each bank of batteries needs to receive an equal charge to prevent 1 bank from depleting before the others.
  - This is functionally identical to Series behavior, but now multiplied by the number of batteries inside of each Parallel bank.
  - For example, 3 Parallel Banks in Series = 300rW output, 72000rWm capacity.

**Charging Considerations**

Since this hybrid configuration is ultimately a combination of parallel and series wiring, charging the system requires two layers:

1️⃣ **Charging the Parallel Banks:**

- Each Parallel Bank needs its own Sequential Power Distributor (SPD).
- Inside each bank:
  - Only one battery is charged at a time.
  - Once a battery is full, the SPD ensures cycling to the next battery.

2️⃣ **Charging All Banks (Series Layer):**

- The Parallel Banks (now treated like single batteries) are then charged evenly using a Splitter:
  - The Splitter evenly divides input power to each SPD (one per Parallel Bank).
  - This balances charging across the entire hybrid stack.

**Inline Backups (Poor Fit)**

**Functionality**

- In an Inline system like **The Kore** pictured, circuits are directly supported by the battery. This will result in the first battery in all Parallel Banks supporting the circuit's load. This results in multiple batteries simultaneously draining at the same rate, forcing massive amounts of Root Power to be produced to keep the system functioning.
- If the Active Usage being generated by the circuit is greater than 100, 1 battery in each bank will drain at their maximum rate. Each active battery will require 125rW power input of Root Power production just to maintain its level of charge. More Root Power is needed if charging is desired, and it always is.
- Each parallel bank is designed to charge the top battery first but use the bottom battery first. At some point the battery that is draining and the one that is charging will be the same battery. Once it fills up and becomes full, the system will start charging the next battery and the Active Usage will be transferred to it. This will help prevent the system from constantly flipping between batteries while in use.
- In the event a battery is destroyed, the next battery in the Parallel Bank takes over seamlessly and any incoming power is automatically transferred to it. It would take destroying every battery in 1 of the banks before the inline power core would no longer be able to support the desired load.
- **Conclusion:** Do not use series batteries in Inline Backups. The result is extremely poor efficiency, far worse than running individual batteries or a bypass backup and leveraging Active Usage.

**Bypass Backups (Ideal Fit)**

**Functionality**

- In Bypass Backups (such as a BCN Core), the batteries are only called on when Root Power fails or falls below a set level. When enough Root Power is available, the batteries are charged with the excess power that is being produced. The batteries remain idle and no Active Usage is applied to them. This is the default state a Bypass Backup should be in 80+% of the time making Active Usage considerations irrelevant.
- When Root Power levels get too low, the hybrid battery bank seamlessly takes over **f**or an extended runtime thanks to the large Parallel capacity. Think of each Parallel Bank as just a 3x over-sized battery. At the same time as battery power taking over, the Root Power that is too low to support the circuit is redirected towards the batteries slowing their drain.
- Each parallel bank is designed to charge the top battery first before moving on to the next. When Root Power falls too low, the top battery in each bank will begin to support the circuit and be given an Active Usage to start draining. The redirected power now gets forwarded to the batteries which are actively draining to slow their drain and further extend their runtime.
- In the event a battery is destroyed, the next battery in the Parallel Bank takes over seamlessly and any incoming power is automatically transferred to it. It would take destroying every battery in 1 of the banks before the battery backup would no longer be able to support the desired load.
- The amount of Root Power that needs to be produced increases by approximately 110rW per 100rW of battery output. 100rW to cover the potential load and 10rW to charge the battery.
- **Conclusion:** It would be an efficient option in Bypass Backups, but due to Max Depth limitations, it scales very poorly.

##### Series-Parallel Hybrid

**How It Works:**

- **Build Series Battery Banks first:**
  - Batteries are connected to Root Combiners allowing for greater amounts of Available Power.
  - Each battery in the bank will need to be charged equally to prevent 1 battery from depleting before the other(s).
  - Only 1 Series Bank carries the circuit's load and Active Usage at a time. This means all the batteries in the bank will be active at this time.
  - Each bank is treated as a single battery with a larger amount of available power.
  - For example, 3 Large Batteries in Series = 300rW output, 24000rWm capacity.
- **Then wire these banks in Parallel using OR Switches:**
  - Each bank of series wired batteries are connected to OR Switches to control which bank is active. Input A is prioritized over Input B when power levels are the same, or whichever is higher.
  - Only 1 bank is active at a time, but all the batteries in that bank are active making it functionally identical to Series behavior, but now multiplied by the number of paralleled banks.
  - An Electrical Branch can be used between the Root Combiner and OR Switch if less power is needed. Even if an Electrical Branch is used to limit a bank's Available Power, it will not limit the Active Usage the bank could register.
  - Each bank of batteries will be charged one after another.
  - The remaining Series banks will remain idle until the battery bank before is depleted or destroyed.
  - For example, 3 Series Banks in Parallel = 300rW output, 72000rWm capacity.

**Charging & Performance Considerations**

Since this hybrid configuration is ultimately a combination of parallel and series wiring, charging the system requires two layers:

1️⃣ **Charging the Series Banks:**

- Each series bank needs its own Dynamic-Bus for evenly charging the batteries.
- Inside each bank:
  - The Splitter is used to evenly divide power to each battery.
  - All batteries get charged evenly and at the same time.

2️⃣ **Charging All Banks (Parallel Layer):**

- The Series Banks (now treated like single batteries) are then charged with a Sequential Power Distributor (SPD):
  - The SPD will charge one bank of batteries at a time.
  - When one bank is full, it will transfer power to the next bank to charge it.

**Inline Backups (Poor Fit)**

**Functionality**

- In an Inline system like **The Kore** pictured, circuits are directly supported by the battery. This will result in the first bank of series batteries supporting the circuit's load. This results in multiple batteries simultaneously draining at the same rate, forcing massive amounts of Root Power to be produced to keep the system functioning.
- If the Active Usage being generated by the circuit is greater than 100, all of the batteries in the active bank will drain at their maximum rate. Each battery will require 125rW power input of Root Power production just to maintain their level of charge. More Root Power is needed if charging is desired, and it always is.
- Each series bank is designed to be charged left to right. Each series bank is designed to be drained right to left. At some point the battery bank that is draining and the one that is charging will be the same one. Once it fills up and becomes full, the system will start charging the next bank and the Active Usage will be transferred over to it. This will help prevent the system from constantly flipping between battery banks while in use.
- In the event a battery is destroyed, that bank will no longer need the required output and the next battery bank takes over seamlessly and any incoming power is automatically transferred to it. It would take destroying 1 battery in every bank before the inline power core would no longer be able to support the desired load.
- **Conclusion:** Do not use series batteries in Inline Backups. The result is extremely poor efficiency, far worse than running individual batteries or a bypass backup and leveraging Active Usage.

**Bypass Backups (Ideal Fit)**

**Functionality**

- In Bypass Backups (such as a BCN Core), the batteries are only called on when Root Power fails or falls below a set level. When enough Root Power is available, the batteries are charged with the excess power that is being produced. The batteries remain idle and no Active Usage is applied to them. This is the default state a Bypass Backup should be in 80+% of the time making Active Usage considerations irrelevant.
- When Root Power levels get too low, the hybrid battery bank seamlessly takes over **f**or an extended runtime thanks to the large Parallel capacity. Think of each Series Bank as just a single large battery but with 3x more Available Power. At the same time as battery power taking over, the Root Power that is too low to support the circuit is redirected towards the active batteries slowing their drain.
- Each series bank is designed to be charged left to right. When Root Power falls too low, the battery bank on the left will begin to support the circuit and be given an Active Usage to start draining. The redirected power now gets forwarded to the bank which is actively draining to slow its drain and further extend its runtime.
- In the event a battery is destroyed, that Series Bank will no longer meet the required output and the next series battery bank seamlessly takes over and any incoming power is automatically transferred to it. It would take destroying 1 battery in every bank before the inline power core would no longer be able to support the desired load.
- The amount of Root Power that needs to be produced increases by approximately 110rW per 100rW of battery output. 100rW to cover the potential load and 10rW to charge the battery.
- **Conclusion:** It would be an efficient option in Bypass Backups, but due to Max Depth limitations, it scales very poorly.

**Summary**

When it comes to extending the runtimes of over-sized battery banks, it can be done, but now it's up to the player to decide what method works best for them. What remains a constant is:

- **Inline Hybrid:** Often requires overproduction of power, not efficiently scalable and wasteful at scale.
- **Bypass Hybrid:** Efficient, scalable, and matches the design purpose of high-output, long-runtime backups.

**Design Tip:** Intelligent circuit design is more efficient than simply stacking batteries. Many players overbuild power cores and battery backups unnecessarily. **More power is not always more better.** Careful circuit planning, reducing power requirements and proper use of power types will always outperform raw power and battery volume.
