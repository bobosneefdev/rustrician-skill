# Electrical Concepts: Power Generation

## Power Generation

This section covers the concepts behind components that generate **Root Power** in Rust. Power generation is the starting point of every electrical system and determines the upper limits of what a circuit can support.

Rather than focusing on individual build recipes, this section explains how generation sources behave, what constraints they impose, and how their characteristics influence downstream design choices such as storage, distribution, redundancy, and efficiency.

Each generation method is treated as a system with strengths, weaknesses, and predictable failure modes. Understanding these properties allows players to select the right source, or combination of sources, for a given circuit goal.

### Wind Power

Wind turbines are the most common source of large-scale electricity in Rust. They are capable of producing anywhere from **0rW to 150rW** of Root Power and, when properly placed, are among the most reliable generation methods available. Their output is influenced primarily by **height above buildable ground** and **physical obstructions** in the path of the wind.

Unlike fixed-output generators, wind turbines produce **variable power**. Their strength lies not in constant output, but in high potential capacity combined with predictable statistical behavior over time.

#### Turbine Clearance and Obstruction Rules

Wind turbines are large deployables and require significant clearance. Any obstruction that blocks the wind path will cause the turbine to stop spinning and produce **0rW** until the wind direction changes.

The critical distance is **15 meters**, or **5 square foundations**, measured outward from the turbine.

The shape should be a circle but squares are just easier to work with in game. Building outside this zone is always safe. Building inside it is possible, but requires understanding how obstruction checks work.

#### The Wind Beam

Each wind turbine emits an invisible, narrow "wind beam" from the front of the turbine at the intersection of the blades. This beam:

- Extends **15 meters (5 foundations)** outward
- Is aligned with the horizontal drive shaft
- Sits slightly above **2 floors high**

If this beam is obstructed by terrain, building pieces, or deployables, the turbine will stop producing power. Because the beam is thin, structures can be built below it without interference. Walls and floors placed beneath the beam do not block power generation.

- Angled roofs on the **second floor** will block the beam, as they extend just high enough into the third-floor space.
- Where the Double Door Frame exists, not the empty space inside it, will also block the wind beam.

The following items **do not** block the beam when placed inside a double door frame:

- Chainlink Fence
- Netting
- Open Garage Door

#### Fully Enclosing a Wind Turbine

It is possible to fully enclose a turbine within a structure if two conditions are met:

- The **third floor** must be completely free of obstructions out to **5 square foundations**.
  - Due to stability issues, this is impossible and Double Door Frames are needed. They will block the wind sometimes.
- The space **directly above the turbine** must be clear for **7 floors**.

Meeting these conditions allows turbines to be protected without sacrificing too much power output.

#### Turbine Rotation

A wind turbine always rotates **clockwise** and completes a full 360-degree rotation approximately **once per hour**. This rotation is not cosmetic and helps illustrate changing wind direction and where it is checking for obstructions.

#### Height and Average Power Output

Knowing how close to the Wind Turbine structures and deployables can be placed is the first step. The next part is knowing how high they need to be built. Turbine height is measured as the vertical distance between the turbine and the **buildable ground below it**, not elevation above sea level. A turbine placed six floors above ground at the beach will produce the same average power as one placed six floors above ground on a mountain.

Players typically measure height by counting floors down to the foundation, which is sufficiently accurate for design purposes. For precise calculations, foundation height can be included.

The higher a turbine is placed, the higher its **average power output** and the more frequently it reaches its maximum of **150rW**.

#### Power Fluctuation and Averages

Wind strength varies continuously, causing turbine output to fluctuate over time. Because of this variability, turbines are described using **average output** rather than instantaneous values.

At any height:

- Output can temporarily reach **0rW** (rare)
- Output can reach **150rW** (more frequent at higher elevations)

Over long observation periods, most fluctuations fall within approximately **±50rW** of the average. To help illustrate this, in the picture below, the blue line shows the amount of power a turbine at ground level was producing over the period of a random hour. It consists of approximately 180 data points. The red line is what is said to be the average output for a turbine at ground level. During this hour, the turbine's max output was only 113rW and its lowest output was 39rW. If this graph was stretched out to 100+ hours, it would show that the most common fluctuations are about 50rW + or - the average output.

#### Reliability Thresholds

Beyond averages, turbine data can be analyzed to determine how often a turbine produces at least a specific amount of power.

For example:

- If a circuit requires **60rW** with a minimum **92% uptime**, data shows that a turbine built **six floors or higher** will reliably meet that requirement.

- If a circuit requires **80rW** with a minimum **85% uptime**, data shows that a turbine built **9 floors or higher** will reliably meet that requirement.

- If a circuit requires **120rW** only **6% of the time**, data shows that a turbine built on the **second floor **will meet the requirement.

This type of analysis allows players to design circuits based on **guaranteed minimum output**, rather than optimistic peak values.

#### Design Implications

Understanding wind behavior allows players to work in both directions:

- Given a circuit’s power requirement, determine how many turbines and what height are needed
- Given limited space or turbine count, determine how large a circuit can be supported reliably

This knowledge reduces overbuilding, prevents brownouts, and improves overall efficiency.

### Solar Power

For Console players, face your panels North, for PC players, keep reading.

Solar panels generate Root Power based on direct line of sight to the sun. Unlike wind power, solar output follows a **predictable daily and seasonal cycle**, making it a reliable but time-limited generation source.

#### Seasons and the Rust Year

Rust’s island is located in the **southern hemisphere**, meaning seasonal behavior is inverted compared to what most players will expect.

- **Winter Solstice (June)**:
  - It is the shortest day of the year.
  - The Sun will travel its most Northern path.
  - Sunrise is the latest.
  - Sunset is the earliest.
  - During the winter months, solar panels have the lowest total solar production.
- **Summer Solstice (December)**:
  - It is the longest day of the year.
  - The Sun will travel its most Southern path.
  - Sunrise is the earliest.
  - Sunset is the latest.
  - During the summer months, solar panels have the highest total solar production.

Only an admin can get the exact date and time. This is what players cannot see.

Watching where the Sun rises and sets on the horizon can give a player an idea of the time of year. Some modded servers will have a plugin that gives players a clock and might show the sun up and down times. Some might even show the date.

#### Sun Path and Panel Orientation

A full Rust day lasts **1 real hour**, and a full Rust year spans roughly **15 real days**. Over that year, the sun’s path gradually shifts north and south, changing both sunrise/sunset times and the sun’s angle in the sky.

Solar panels generate power only when the **face of the panel has line of sight to the sun**, and because the sun’s seasonal path changes, panel orientation needs to be a design choice.

- The sun rises in the **East** and sets in the **West**
- Panels ramp up power after sunrise, peak when the sun is high, and ramp down toward sunset
- Wipe day is May 20th 2024 1200h(12pm)

For short wipes of 5 days or less, face the panel North and walk away. If players are not joining on wipe day but are still only playing for a few days, orienting panels toward the dominant sun path is very acceptable.

For longer wipes, the most reliable configuration is to place **paired panels**, with one facing East and one facing West. This approach minimizes the need to reposition panels as the year progresses.

Here is a graph showing roughly how much power a panel was able to collect based on its orientation over the course of an in-game year. Breaking it apart, it shows:

- A North facing panel from the start of wipe and through the first 3 real life days, can collect around 640rWm of power each in a game day.
- A South facing panel won’t start to collect more than 100rWm an in game day for nearly 3 real life days. It will eventually peak with 650rWm collected, but only for 1 real day, and that’s only 7.5 real days after wipe started.
- A West facing panel starts the wipe collecting around 440rWm of power each game day. Over the next 7.5 real days, the amount it collects will increase and peak around 500rWm a game day.
- In an attempt to not clutter the graph, it is implied that the panel directions not shown here are the inverse of their opposites. Meaning:
  - Northeast is the inverse of Northwest
  - Southeast is the inverse of Southwest
  - East is the inverse of West

#### Obstructions and Line of Sight

Solar panels require an unobstructed view of the sun.

The following **block solar output**:

- terrain and ground
- cliffs and hills
- trees
- building blocks

Deployable items do not appear to block sunlight.

To take full advantage of a Solar Panel, try to capture the Sun in the morning the moment it rises above the horizon, and all the way to the moment the Sun drops below the horizon at night. In order to accomplish this, line of sight to each horizon is required. The best chance of achieving line of sight to both horizons is by building on top of the highest mountain.

Otherwise, in the mornings, Eastward facing panels on the West side of the map will need to wait for the Sun to get high enough in the sky to clear the hills and mountains. The panels on the East side could catch the sun the moment it peaks above the horizon.

In the evenings, Westward facinging panels on the East side of the map will have the amount of time they could produce power cut short as the Sun moves behind the hills and mountains. The panels on the West side could catch the sun up to the moment it drops below the horizon.

#### Solstice Solar Yield and Specifics

If a pair of panels are placed so each could see either the East or West horizons, the following could reasonably be expected, within a reasonable margin or error.

**The Winter Solstice (June 20 2024):**

- Solar Panels facing East can start to capture the Sun around 7:10am.
  - Power levels will slowly increase until around 9:05 am when they will be producing a full 20rW.
  - This lasts until about 1:30pm. Around this time, it will slowly start decreasing power production until around 3:45pm when it stops.
- The panel facing West can start to capture the Sun around 11:40am.
  - A few minutes later at around 1:45pm, it will start producing a full 20rW.
  - Around 6:15pm the panel will start decreasing the amount of power produced until about 8:15pm when it stops.
- During the winter solstice, 2 combined panels, 1 facing East and 1 facing West, can collect around 940rWm of power.

**The Summer Solstice (December 21 2024):**

- Solar Panels facing East can start to capture the Sun around 6:30am.
  - Power levels will slowly increase until around 8:20am when they will be producing a full 20rW.
  - This lasts until about 2:30pm. Around this time, it will slowly start decreasing power production until around 4:15pm when it stops.
- The panel facing West can start to capture the Sun around 11am.
  - A few minutes later at around 1 pm, it will start producing a full 20rW. Around 7 pm the panel will start decreasing the amount of power produced until about 9 pm when it stops.
- During the summer solstice, 2 combined panels, 1 facing East and 1 facing West, can collect around 1075rWm of power.

#### Capacity Planning

When working with solar panels for a primary source of power, it is very helpful to know how to calculate how much capacity a circuit needs to last 1 in game day. Knowing the capacity will dictate how many panels are needed. Base the number of panels used on the lowest amount of power they will produce on the shortest day of the year.

**The Maths**

**rWm:** rust watt minutes (capacity)

**rW:** Rust Watt (aka power)

**S:** Seconds

**τ:** 60 (The number of minutes in an hour)

**M:** Minutes

**A:** The battery’s Active Usage

**H:** Hours

##### Required Capacity for a Constant Load

To figure out how much capacity is needed to support a circuit of a specific load, use the following equation:

A × τ = rWm

Example: A circuit with an Active Usage of 64rW.

A × τ = rWm

64 × 60 = 3840rWm

Therefore a circuit needing a constant 64rW over the course of 1 hour will consume 3840rWm worth of power.

##### Determining Panel Count

To figure out how many pairs of panels are needed to support a specific amount to power, use the following equation:

rWm ÷ 940rWm = Solar Panel pairs

Example: A circuit with an capacity requirement of 3840rWm

rWm ÷ 940rWm = Solar Panel pairs

3840rWm ÷ 940rWm = 4.08

Therefore 5 pairs of panels are needed to capture enough rWm to cover the power cost of a 64rW circuit. 2 solar panels make a pair, so 10 panels total.

##### Runtime Calculations

To figure out how much time a given capacity will run for, outputting a specific amount of power, we use the following equations:

**Seconds:** (rWm ÷ A = M) × τ = S

**Minutes:** rWm ÷ A = M

**Hours:** (rWm ÷ A = M) ÷ τ = H

#### Design Implications

Solar power excels in predictable, low-to-moderate load systems where space is available for panels and batteries. Its limitations are daylight dependence and seasonal variation.

By designing for the shortest day of the year and pairing panels to capture both horizons, solar systems can be made extremely reliable without constant adjustment.
