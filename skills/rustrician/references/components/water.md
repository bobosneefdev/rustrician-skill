# Components: Water

Port labels are case-sensitive in exported XML (the build script matches them case-insensitively).
Side = where the port sits on the 64×64 component. Back to the [component index](../components.md).

## Large Water Catcher

Type `watercatcher_large` · item -1100168350

Collects drinkable water from the air via rain and dew.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Water In` | in | water | left |  |
| `Water Out` | out | water | right |  |

Properties (`props` in a spec):
- `Capacity` — float, default `25000` *(simulator-only setting)*. Enter the capacity in mL.
- `Show Time Remaining` — bool, default `true` *(simulator-only setting)*. Enable to display the remaining fluid while flowing.
- `Show Active Usage` — bool, default `false` *(simulator-only setting)*. Enable to display the active usage while flowing.

Simulator: consumption 0 rW · root power source · accepted by Root Combiner · can block battery discharge.
Craft: 500 Wood, 200 Metal Fragments, 2 Tarp.

- Can be chained to other water sources

**Functionality** (handbook)

- The Large Water Catcher is a passive water collection device that gathers fresh water from rain and dew over time.
- The water it catches is always Fresh Water, usable for drinking or irrigation.
- The catcher cannot be given Salt or Radioactive water.
- Water can be transferred manually or through connected water IO.
- Look at the catcher and hold Use (E) to open the menu.
  - **To transfer water**: Hold Give or Take for automatic transfer.
- Players can also fill handheld containers by holding the container and holding Right-Click while looking at the catcher.
- Auto-repairs over time.

**Water Mechanics** (handbook)

- **Capacity**: Stores up to 50,000mL of water.
- **Water Connections**
  - **Inputs**: Water In
  - **Outputs**: Water Out
  - **Water Output Rate**: 12mL per second
- **Collection Rate**
  - **BaseRate**: The base level collection rate is 7.5ml per minute but depending on the weather and biome, collection rates will change.
  - The catcher contains 1mL by default upon placement.
  - Collection rate is affected by the Biome, Rain Level and Fog Level:
    - For every 0.1 increase in Rain Level:
      - **Temperate**: +1500mL/min
      - **Jungle**: +1500mL/min
      - **Desert**: +750mL/min
      - **Arctic**: +1.5mL/min
    - For every 0.1 increase in Fog Level:
      - **All biomes**: +6mL/min
    - **Biome Multipliers**
      - Temperate = 1
      - Jungle = 1
      - Desert = 0.5
      - Arctic = 0.001
    - Use the following formula to calculate the collection rate:
    - Collection Rate = Ceil(BaseRate + (Rain Level × (15000mL × Biome)) + (Fog Level × 60mL))
    - Ceil = Round up to the nearest whole number

**Placement Considerations** (handbook)

- Requires an area of approximately 2x2 foundations.
- Must be placed on the ground.
- Can be built around and encapsulated with a ceiling height of at least 1.5 floors. When built inside, the collection rate is reduced to only the base rate.
- Cannot be placed on Icebergs.
- Can be rotated before placement with Reload (R).

**Notes** (handbook)

- Auto-repairs over time with resources from the Tool Cupboard.
- Shows their health when looked at with a Hammer. After enough damage, the health becomes visible without the hammer.

## Small Water Catcher

Type `watercatcher_small` · item -132247350

Collects drinkable water from the air via rain and dew.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Water In` | in | water | left |  |
| `Water Out` | out | water | right |  |

Properties (`props` in a spec):
- `Capacity` — float, default `10000` *(simulator-only setting)*. Enter the capacity in mL.
- `Show Time Remaining` — bool, default `true` *(simulator-only setting)*. Enable to display the remaining fluid while flowing.
- `Show Active Usage` — bool, default `false` *(simulator-only setting)*. Enable to display the active usage while flowing.

Simulator: consumption 0 rW · root power source · accepted by Root Combiner · can block battery discharge.
Craft: 100 Wood, 50 Metal Fragments, 1 Tarp.

- Can be chained to other water sources

**Functionality** (handbook)

- The Small Water Catcher is a passive water collection device that gathers fresh water from rain and dew over time.
- Water is always Fresh Water, usable for drinking or irrigation.
- The catcher cannot be given Salt or Radioactive water.
- Water can be transferred manually or through connected water IO.
- Look at the catcher and hold Use (E) to open the menu.
  - **To transfer water**: Hold Give or Take for automatic transfer.
- Players can also fill handheld containers by holding Right-Click while looking at the catcher.

**Water Mechanics** (handbook)

- **Capacity**: Stores up to 10,000mL of water.
- **Water Connections**
  - **Inputs**: Water In
  - **Outputs**: Water Out
  - **Water Output Rate**: 6mL per second
- **Collection Rate**
  - **BaseRate**: The base level collection rate is 2.5ml per minute but depending on the weather and biome, collection rates will change.
  - The catcher contains 1mL by default upon placement.
  - Collection rate is affected by the Biome, Rain Level and Fog Level:
    - For every 0.1 increase in Rain Level:
      - **Temperate**: +500mL/min
      - **Jungle**: +500mL/min
      - **Desert**: +250mL/min
      - **Arctic**: +0.5mL/min
    - For every 0.1 increase in Fog Level:
      - **All biomes**: +2mL/min
    - **Biome Multipliers**
      - Temperate = 1
      - Jungle = 1
      - Desert = 0.5
      - Arctic = 0.001
    - Use the following formula to calculate the collection rate:
    - Collection Rate = Ceil(BaseRate + (Rain Level × (5000mL × Biome)) + (Fog Level × 20mL))
    - Ceil = Round up to the nearest whole number

**Placement Considerations** (handbook)

- Can be placed on the ground or floor tiles.
- Can be built indoors using floor frames and grills above them.
  - Requires 3.5 floors of clearance above before placing a ceiling.
- Can be rotated before placement with Reload (R).

**Notes** (handbook)

- Auto-repairs over time with resources from the Tool Cupboard.
- Shows their health when looked at with a Hammer. After enough damage, the health becomes visible without the hammer.

## Water Barrel

Type `waterbarrel` · item -1863559151

A storage container for water.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Water In` | in | water | left |  |
| `Water Out` | out | water | right |  |

Properties (`props` in a spec):
- `Capacity` — float, default `10000` *(simulator-only setting)*. Enter the capacity in mL.
- `Show Time Remaining` — bool, default `true` *(simulator-only setting)*. Enable to display the remaining fluid while flowing.
- `Show Active Usage` — bool, default `false` *(simulator-only setting)*. Enable to display the active usage while flowing.

Simulator: consumption 0 rW · root power source · accepted by Root Combiner · can block battery discharge.
Craft: 250 Wood, 1 Tarp.

- Can be chained to other water sources

**Functionality** (handbook)

- Use it to make a reservoir to hold large amounts of water.
- Can hold any type of water (Fresh, Salt, or Radioactive)
- Does not generate or convert water but is treated as a source within a water network.
- Can be manually filled or connected to water networks with the Hose Tool.
- Look at the barrel's spigot on the front and hold Use (E) to open the menu.
  - **To transfer water**: Hold Give or Take for automatic transfer.

**Water Mechanics** (handbook)

- **Capacity**: 20,000 mL
- **Water Inputs/Outputs**
  - **Input**: Water In
  - **Output**: Water Out
  - **Output Rate**: Up to 12mL/second

**Placement Considerations** (handbook)

- Can be placed on floors or the ground.
- Can be rotated before placement using Reload (R).
- There is room for a small box underneath the barrel for extra storage.
- Placing them on a floor above where the water is used, allows players to take advantage of gravity and reduce the electrical demand of a farm.

**Notes** (handbook)

- Auto-repairs over time with resources from the Tool Cupboard.
- Shows their health when looked at with a Hammer. After enough damage, the health becomes visible without the hammer.

## Water Pump

Type `waterpump` · item -1284169891

Can be placed in a water source to collect that water while powered. Can be connected to other Water entities.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Water Output` | out | water | right |  |

Properties (`props` in a spec):
- `Capacity` — float, default `1000` *(simulator-only setting)*. Enter the capacity in mL.
- `Show Time Remaining` — bool, default `true` *(simulator-only setting)*. Enable to display the remaining fluid while flowing.
- `Show Active Usage` — bool, default `false` *(simulator-only setting)*. Enable to display the active usage while flowing.

Simulator: consumption 5 rW · root power source · accepted by Root Combiner · rotatable (0/90/180/270) · can block battery discharge.
Craft: 250 Wood, 200 Metal Fragments, 1 Gears.

- Requires power to pump water in (generate fluid)
- Pumps (generates) 85 mL of fluid every 10 seconds
- Can be chained to other water sources
- Can be rotated before placing by pressing R in-game, or by pressing R after placing in the simulator

**Functionality** (handbook)

- The Water Pump collects water from external bodies like rivers, swamps, or the ocean.
- It acts as both a source and pumping unit within a water network.
- It includes a small internal reservoir of up to 2,000 mL.
- The pump pushes water against gravity and into connected containers or irrigation systems.
- Look at a connected water container and hold Use (E) to open the menu.
  - **To transfer water**: Hold Give or Take for automatic transfer.
- Players can also fill handheld containers by holding Right-Click while looking at the pump.

**Water Mechanics** (handbook)

- **Collection Rate**: 8.5mL/second
- **Capacity**: 2,000 mL
- **Water Inputs/Outputs**
  - **Input**: Power In
  - **Output**: Water Out
  - **Output Rate**: Up to 12mL/second
- **Power Consumption**: 5rW
- **Active Usage**: 5
- It will pump water out of itself to water a barrel, against gravity with no power required, but needs manual filling.

**Placement Considerations** (handbook)

- Must be placed partially submerged in a valid water source (river, swamp, or ocean).
- **Placement depth matters**: too deep or too shallow will prevent deployment.
- Can be placed under wooden foundations.
- Can be rotated before placement with Reload (R).

**Notes** (handbook)

- Auto-repairs over time with resources from the Tool Cupboard.
- Shows their health when looked at with a Hammer. After enough damage, the health becomes visible without the hammer.

## Powered Water Purifier

Type `waterpurifier` · item -365097295

A device that converts salt water to fresh water while powered.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | top |  |
| `Water In` | in | water | left |  |
| `Water Out` | out | water | right |  |

Properties (`props` in a spec):
- `Capacity` — float, default `1000` *(simulator-only setting)*. Enter the capacity in mL.
- `Show Time Remaining` — bool, default `true` *(simulator-only setting)*. Enable to display the remaining fluid while flowing.
- `Show Active Usage` — bool, default `false` *(simulator-only setting)*. Enable to display the active usage while flowing.

Simulator: consumption 5 rW · root power source · accepted by Root Combiner · can block battery discharge.
Craft: 100 Wood, 300 Metal Fragments, 20 Cloth.

- Does not require power to flow out fluids
- Can be chained to other water sources
- Purifies salt water at a 2:1 loss, meaning 50% of the fluid is lost during purification

**Functionality** (handbook)

- Converts Salt Water into Fresh Water using electricity.
- Requires salt water input via the black tank and produces fresh water in the blue tank.
- The purifier will operate automatically when powered and supplied with salt water.
- Look at either tank and hold Use (E) to open the menu.
  - **To transfer water**: Hold Give or Take for automatic transfer.
- Players can also fill handheld containers by holding the container and holding Right-Click while looking at the tank.

**Water Mechanics** (handbook)

- **Conversion Rate**: 62.5mL/second (at a 2:1 ratio of saltwater to freshwater)
- Can purify incoming salt water from up to 7 pumps.
- Does not purify radioactive water.
- **Fresh Water Output**: 12mL/second
- **Capacity**: 10,000 mL total (5,000 mL salt water in the black tank and 5,000 mL fresh water in the blue tank.)
- **Water Inputs/Outputs**
  - **Input**: Water In
  - **Output**: Water Out

**Power Mechanics** (handbook)

- **Input**: Power In
- **Power Consumption**: 5rW
- **Active Usage**: 5

**Placement Considerations** (handbook)

- Must be placed on floors, foundations, or the ground.
- Can be rotated before placement using Reload (R).

**Notes** (handbook)

- Auto-repairs over time with resources from the Tool Cupboard.
- Shows their health when looked at with a Hammer. After enough damage, the health becomes visible without the hammer.

## Water Purifier

Type `waterpurifier_simple` · item 2114754781

A Water Purifier. Place overtop of a campfire. Will provide clean, drinkable water from salty, or stagnant water.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Water In` | in | water | left |  |
| `Water Out` | out | water | right |  |

Properties (`props` in a spec):
- `Capacity` — float, default `1000` *(simulator-only setting)*. Enter the capacity in mL.
- `Show Time Remaining` — bool, default `true` *(simulator-only setting)*. Enable to display the remaining fluid while flowing.
- `Show Active Usage` — bool, default `false` *(simulator-only setting)*. Enable to display the active usage while flowing.

Simulator: consumption 0 rW · root power source · accepted by Root Combiner · can block battery discharge.
Craft: 1 Empty Propane Tank, 15 Metal Fragments, 10 Cloth.

- Does not require a power source since the purifier uses a lit campfire for purification
- Can be chained to other water sources
- Purifies salt water at a 4:1 loss, meaning 75% of the fluid is lost during purification

**Functionality** (handbook)

- Converts Salt Water into Fresh Water using a Campfire.
- Requires salt water input via the propane tank and produces fresh water in the blue bucket.
- The purifier will operate as long as the campfire is burning wood and supplied with salt water.
- Look at the propane tank hold Use (E) to open the menu. This is where the salt water goes, however Fresh Water can be added for storage, just do not turn on the campfire.
- Look at the blue bucket hold Use (E) to open the menu. This is where the fresh water is collected.
  - **To transfer water**: Hold Give or Take for automatic transfer.
- Players can also fill handheld containers by holding the container and holding Right-Click while looking at the bucket or tank.

**Water Mechanics** (handbook)

- **Conversion Rate**: 16.7mL/second (at a 4:1 ratio of saltwater to freshwater)
- Can purify incoming salt water from up to 2 pumps.
- Does not purify radioactive water.
- **Fresh Water Output**: 12mL/second
- **Capacity**: 7,000 mL total (5,000 mL in the propane tank and 2,000 mL in the blue bucket)
- **Water Inputs/Outputs**
  - **Input**: Water In
  - **Output**: Water Out

**Placement Considerations** (handbook)

- Must be placed on a campfire.
- Cannot be rotated. Its rotation is based on the campfire.

**Notes** (handbook)

- Shows their health when looked at with a Hammer. After enough damage, the health becomes visible without the hammer.

## Fuel Tank Vehicle Module

Type `2mod_fueltank` · item 1186655046

Dual module large fuel tank.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Water In 1` | in | water | left |  |
| `Water In 2` | in | water | right |  |
| `Water Out 1` | out | water | left |  |
| `Water Out 2` | out | water | right |  |

Properties (`props` in a spec):
- `Capacity` — float, default `100000` *(simulator-only setting)*. Enter the capacity in mL.
- `Show Time Remaining` — bool, default `true` *(simulator-only setting)*. Enable to display the remaining fluid while flowing.
- `Show Active Usage` — bool, default `false` *(simulator-only setting)*. Enable to display the active usage while flowing.

Simulator: consumption 0 rW · root power source · accepted by Root Combiner · can block battery discharge.
Craft: 175 Metal Fragments, 100 Wood.

- Can be chained to other water sources
- Has two inputs and two outputs eliminating the need for a combiner or splitter

**Functionality** (handbook)

- Designed to be mounted on modular car chassis.
- Occupies 2 chassis sockets.
- Can store Fresh, Salt, or Radioactive Water.
- Safely transports Radioactive Water without exposing the player.
- Recommended to be stored on a Modular Car Lift to avoid decay.
- Look at the tank and hold Use (E) to open the menu.
  - **To transfer water**: Hold Give or Take for automatic transfer.
- Players can also fill handheld containers by holding the container and holding Right-Click while looking at the tank.

**Water Mechanics** (handbook)

- **Capacity**: 200,000 mL (200L)
- **Water Inputs/Outputs**
  - **Inputs**: 2x Fluid In (1 per side)
  - **Outputs**: 2x Fluid Out (1 per side)
  - **Output Rate**: Up to 500mL/second
  - When using both outputs, each output will be limited to 250ml each.

**Placement Considerations** (handbook)

- Must be mounted on a modular vehicle chassis.
- Can only be used when attached to a vehicle.
- Hoses break and are removed when the vehicle moves.

## Fluid Switch & Pump

Type `fluid_switch` · item 443432036

A simple switch that enables fluid to pass through. Can be switched on/off manually or via electricity. Can also pump water upwards to higher entities when powered.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Water In` | in | water | left |  |
| `Pump Power` | in | power | top |  |
| `Toggle` | in | power | top |  |
| `Water Out` | out | water | right |  |

Simulator: consumption 0 rW · rotatable (0/90/180/270) · can block battery discharge.
Craft: 150 Metal Fragments.

- Pump Power is required for the component to pump fluid upwards (overcome gravity)
- Can be rotated before placing by pressing R in-game, or by pressing R after placing in the simulator

**Functionality** (handbook)

- Acts as both a manual water switch and an electric-powered pump.
- When power is applied to Pump Power, water can be pumped upward against gravity.
- Gravity-fed systems do not require power, only toggle activation.
- Look at the fluid switch and press Use(E) to operate manually.
- TC authorization is not required to manually operate the switch.

**Water Mechanics** (handbook)

- **Water Inputs/Outputs**
  - **Input**: Fluid Input
  - **Outputs**: Fluid Output
- **Output Rate**: Unknown (likely no limitations)
- Water uses gravity to flow down towards the ground. It will need electricity to move away from the ground.

**Power Mechanics** (handbook)

- **Inputs**: Pump Power, Toggle
- **Power Consumption**: 1rW
- **Active Usage**: 0
- Applying power to Toggle will activate the switch.
- Removing power from Toggle will turn the switch off.
- Pump Power is only required when pushing water upward against gravity.

**Placement Considerations** (handbook)

- Can be placed on all angled building blocks and the ground.
- Can be rotated before placement using Reload (R).

**Notes** (handbook)

- Shows their health when looked at with a Hammer. After enough damage, the health becomes visible without the hammer.

## Fluid Combiner

Type `fluid_combiner` · item -265292885

Combines three separate fluid connections into one connection.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Water In 1` | in | water | top |  |
| `Water In 2` | in | water | top |  |
| `Water In 3` | in | water | top |  |
| `Water Out` | out | water | bottom |  |

Simulator: consumption 0 rW · rotatable (0/90/180/270).
Craft: 75 Metal Fragments.

- Can be combined with other water sources
- Can be rotated before placing by pressing R in-game, or by pressing R after placing in the simulator

**Functionality** (handbook)

- Combines input from up to 3 separate water sources into a single output stream.
- Does not require electricity to function.
- Useful for merging outputs from water catchers, barrels, or pumps.
- Cannot mix different water types (Fresh, Salt, Radioactive) simultaneously.
- **Water Type Priority**: Radioactive > Salt > Fresh. If multiple types are input at the same time, the highest priority is selected.

**Water Mechanics** (handbook)

- **Water Inputs/Outputs**
  - **Inputs**: Water In 1, Water In 2, Water In 3
  - **Output**: Water Out
- **Water Output**: Sum of all valid inputs
  - If given 12mL to each input, the output will be 36mL total.

**Placement Considerations** (handbook)

- Can be placed on all angled building blocks and the ground.
- Can be rotated before placement using Reload (R).
- **Max Depth Limit**: There is a max depth of 15 components between a water source and a Fluid Combiner.
  - **Bug**: Players will get a Max Depth error if there are more than 16 water or electrical components between a power source and the fluid combiner.

**Notes** (handbook)

- Shows their health when looked at with a Hammer. After enough damage, the health becomes visible without the hammer.

## Fluid Splitter

Type `fluid_splitter` · item -1166712463

Splits a fluid connection into three separate connections.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Water In` | in | water | top |  |
| `Water Out 1` | out | water | bottom | divides input evenly |
| `Water Out 2` | out | water | bottom | divides input evenly |
| `Water Out 3` | out | water | bottom | divides input evenly |

Simulator: consumption 0 rW · rotatable (0/90/180/270).
Craft: 75 Metal Fragments.

- Evenly splits the input fluid to all connected outputs
- A Fluid Switch & Pump is required for fluid to flow upwards (overcome gravity)
- Can be rotated before placing by pressing R in-game, or by pressing R after placing in the simulator

**Functionality** (handbook)

- Accepts a single water input and splits it into three outputs.
- Output water is divided evenly among connected outputs.
- **Examples**
  - 12mL input with 2 outputs = 6mL per output.
  - 36mL input with 3 outputs = 12mL per output.

**Water Mechanics** (handbook)

- **Inputs/Outputs**
  - **Input**: Water In
  - **Outputs**: Water Out 1, Water Out 2, Water Out 3
- **Water Output**: Input divided by up to 3 connected outputs
- **Uneven water distribution handling**
  - If the input water cannot be divided evenly, the remaining water is prioritized as follows:
    - Water Out 1 and Water Out 2 receive the extra water first.
    - If water still cannot be split evenly, Water Output 1 gets the remainder.
  - **Example**
    - 3mL input with 3 outputs → Each output gets 1mL.
    - 4mL input with 3 outputs → Water Out 1 = 2mL, Water Out 2 = 1mL, Water Out 3 = mL.

**Placement Considerations** (handbook)

- Can be placed on all building blocks, including the ground.
- Can be rotated before placement using Reload (R).

**Notes** (handbook)

- Shows their health when looked at with a Hammer. After enough damage, the health becomes visible without the hammer.

## Sprinkler

Type `sprinkler` · item -781014061

A small sprinkler that sprays water around it. Requires a hose connection to supply it with water.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Water In` | in | water | left |  |
| `Passthrough` | out | water | right |  |

Simulator: consumption 1 rW · rotatable (0/90/180/270).
Craft: 75 Metal Fragments.

- A Fluid Switch & Pump is required for fluid to flow upwards (overcome gravity)
- When the passthrough output is used, the sprinker will consume double the water

**Functionality** (handbook)

- Primarily used for indoor plant farms using planter boxes or pots.
- Can also be used to defend against bees and is best placed above the player.
- Sprays water in a radius a little over 1 foundation or 3 meters. A visual aid appears before placing them to help show their area of effect. It is not a complete sphere. The water only makes it 1.5 floors below the Sprinkler.
- Will wet players, and extinguish nearby campfires, furnaces, lanterns, and other similar items.
- Does not extinguish fire from flamethrowers or Molotov cocktails.
- Automatically activates when receiving water.
- Sprinklers can still appear active when underpowered, though no water may be dispensed.

**Water Mechanics** (handbook)

- **Inputs/Outputs**
  - **Input**: Water In
  - **Output**: Passthrough
- **Water Consumption**: Average 2ml/sec
- **Water Output**: Average 3ml/sec

**Sprinkler Output Behavior** (handbook)

- Average consumption from a source is 120ml per minute +/- 2ml.
- Average output for a single planter is 180ml per minute +/- 15ml.
- Average output for a single pool is 120ml per minute +/- 10ml.
- Player entities within range are seen no differently than a pool or a planter.
- If multiple planter boxes, pools or players are in range, each will receive roughly an equal portion of water +/- 5ml.
  - **Example**: 1 sprinkler above a planter with a player in range, the planter will receive roughly 50% less water as compared to if the player was not present.
- **Cycle Duration**: Can be as fast as 2.55 seconds but on average are roughly 5 seconds, with approximately 12 cycles a minute, depending on server load.
  - Cycle times are how often water ticks up in a planter or a pool.
  - Single Planter Boxes gain 15ml per cycle.
  - Pools gain 10mL per cycle.
  - Sprinklers will take 2ml of water per second out of the water source or roughly 10 per cycle.
  - **Pulsing Sprinklers**: Can be used to decrease the watering time while also conserving the amount of water consumed.
    - **Warning**: Do not set timers shorter than 2.55 seconds. Doing so will result in water leaving the source but never reaching the planter or pool. Most servers cannot handle timers set this low. It is recommended timers should instead be kept to values that are divisible by 5 to avoid issues (e.g. 10, 20, 50, 85).
- Sprinklers given only 1mL/sec will still act as if given 2mL/sec.
- **BUG**: There is a max depth limitation of 15 components, water or electrical, between the Sprinkler and an Electrical Power Source. Past this limit, Sprinklers will still appear to function and get players wet, but will not fill a pool or planter with water.

**Water Types** (handbook)

- **Fresh Water**
  - Used for drinking and growing plants
- **Salt Water**
  - When applied to crops, it will dry out the soil
- **Radiation Water**
  - Works best when sprinkled from ceilings
  - Does not work when sprinkled from the floor
  - May work inconsistently when sprinkled from a wall
  - Creates a radiation zone that matches the wet radius and is strongest at the edges
  - Requires 18 Radiation Protection to avoid poisoning
  - Deletes crops and removes any existing water from planters
  - Radiation does not stack from multiple sprinklers

**Placement Considerations** (handbook)

- Can be placed on the ground or any building surface
- Can be rotated before placement using Reload ®

**Notes** (handbook)

- Auto-repairs over time with resources from the Tool Cupboard.
- Shows their health when looked at with a Hammer. After enough damage, the health becomes visible without the hammer.
