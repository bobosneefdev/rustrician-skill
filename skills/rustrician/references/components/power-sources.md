# Components: Power Sources

Port labels are case-sensitive in exported XML (the build script matches them case-insensitively).
Side = where the port sits on the 64×64 component. Back to the [component index](../components.md).

## Solar Panel

Type `solarpanel_large` · item 2090395347

A solar panel which converts sunlight into energy. The amount of energy generated is dependent on the sun's intensity and angle to the panel.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power Out` | out | power | right |  |

Properties (`props` in a spec):
- `Amount` — int, default `20` *(simulator-only setting)*. Enter the amount of power to output.
- `Range Min` — int, default `0` *(simulator-only setting)*. Enter the minimum amount of power for range power output.
- `Range Max` — int, default `20` *(simulator-only setting)*. Enter the maximum amount of power for range power output.
- `Enable Sun Simulation` — bool, default `true`. Enable to link the output amount to the sun simulation amount.

Simulator: consumption 0 rW · root power source · accepted by Root Combiner.
Craft: 5 High Quality Metal, 1 Tech Trash.

- Root power producer with an output range of 0 - 20 power
- Position panels facing east / west for optimal placement
- Can be combined with the Root Combiner
- Generates less power when damaged

**Power Output Mechanics** (handbook)

- **Power Connections**
  - **Outputs**: Power Out
- **Power Output**: 0-20rW

**Solar Cycle Mechanics** (handbook)

- 24 hours in-game is 1 hour in real time.
- 1 in-game year is roughly 15 real days.
- The Sun will change locations in the sky throughout an in-game year.
- There is a summer and winter solstice, and there are roughly 7.5 real days between solstices.
- The Sun will start in the North at the beginning of the wipe. It will move a little further North before it starts to make its way South. It will make it to its more Southern point in roughly 8 real days before heading North again.

**Placement Considerations** (handbook)

- Can be placed on the ground or flat building structures.
- Can be rotated with Reload(R).
- Large Solar Panels output electricity only during the day when the face of the panel can see the Sun.
- They will produce less power if they are damaged or the Sun is not making it to the entire panel's face.
- The ground, cliffs, trees and building blocks can all block the Sun.
- Deployables do not appear to block the Sun.

**Notes** (handbook)

- Holding a hammer while looking at the panel will show its health.
- It will auto repair over time with resources from the Tool Cupboard.

## Wind Turbine

Type `generator_wind` · item -1819763926

Converts kinetic energy harvested from the wind into electricity. Amount generated will vary depending on wind speed. Higher altitudes will yield stronger winds.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power Out` | out | power | right |  |

Properties (`props` in a spec):
- `Amount` — int, default `150` *(simulator-only setting)*. Enter the amount of power to output.
- `Range Min` — int, default `0` *(simulator-only setting)*. Enter the minimum amount of power for range power output.
- `Range Max` — int, default `150` *(simulator-only setting)*. Enter the maximum amount of power for range power output.
- `Enable Wind Simulation` — bool, default `true`. Enable to link the output amount to the wind simulation amount.

Simulator: consumption 0 rW · root power source · accepted by Root Combiner.
Craft: 10 High Quality Metal, 3 Gears, 3 Sheet Metal, 500 Wood.

- Root power producer with an output range of 0 - 150 power
- Position turbine at least 8 - 12 floors above ground for optimal placement
- Can be combined with the Root Combiner

**Functionality** (handbook)

- The Wind Turbine generates power based on its elevation above buildable ground.
- Placement at higher elevations above the buildable ground increases power output, while lower elevations reduce efficiency.
- Power output fluctuates due to wind variability, making output inconsistent over time.
- Vulnerable to explosives.
- A small area at the base of the turbine, on some sheet metal, allows placement of components.

**Power Output Mechanics** (handbook)

- **Power Connections**
  - **Outputs**: Power Out
- Operates during both day and night.
- **Power Output**: Varies between 0 and 150rW, depending on elevation above the buildable ground and wind conditions.
- Wind Speed & Elevation:
  - Wind speed becomes greater and more consistent the higher the turbine is built above the buildable ground.
  - Structures built on beaches, mountaintops or icebergs experience the same wind behavior.
- **Optimal Height**: While placing a Wind Turbine at maximum build height provides the highest power output, it significantly increases building upkeep costs due to the required support structure. A mid-range height (8–12 floors above terrain) may offer a better balance between power efficiency and resource consumption.
- **Fluctuations**: Power generation is not constant and will change over time.

**Placement Considerations** (handbook)

- Obstructions (trees, rock formations, walls, player-built objects) affect power generation.
- Requires a minimum of 15 meters (5 foundations) distance between turbines or other obstructions to prevent wind blockage.
- Can only be placed on foundations or floors. Requires a single square or 2 triangles to be placed on.
- Cannot be placed in water or within caves.
- Can be rotated with Reload (R) before placing.
- Cannot be picked up but can be destroyed by hammer within 10 minutes of placement. No resources are refunded.

**Notes** (handbook)

- Holding a hammer while looking at the turbine will show its health.
- Will auto-repair over time using resources from the Tool Cupboard.
- It’s the largest renewable power source in Rust, but inconsistent.
- Works well with Large Batteries to store fluctuating power for stable output.
- Does not require fuel or upkeep once placed.
- Multiple turbines can be used with Root Combiners to centralize the power supplies.
- Wind speed fluctuates and is not constant.

## Water Wheel

Type `generator_water` · item -379403794

Converts kinetic energy harvested from flowing water into electricity.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power Out` | out | power | right |  |

Properties (`props` in a spec):
- `Amount` — int, default `60` *(simulator-only setting)*. Enter the amount of power to output.
- `Range Min` — int, default `0` *(simulator-only setting)*. Enter the minimum amount of power for range power output.
- `Range Max` — int, default `60` *(simulator-only setting)*. Enter the maximum amount of power for range power output.
- `Enable Water Simulation` — bool, default `true`. Enable to link the output amount to the water simulation amount.

Simulator: consumption 0 rW · root power source · accepted by Root Combiner.
Craft: 3 Gears, 1 Sheet Metal, 500 Wood.

- Root power producer with an output range of 0 - 60 power
- Requires human interaction to generate over 30 power
- Can be combined with the Root Combiner

**Functionality** (handbook)

- When placed in water, it can generate power.
  - Rivers are the most reliable place to build the wheel for constant power generation.
  - Wheels built in the ocean can produce power, but it's not the full amount and it will fluctuate all the way to 0rW from time to time.
  - Inland lakes have no flowing water so they cannot be used to generate power.
- When placed on land, it requires a player to run inside it to generate power.
  - Mount the wheel by looking at it and pressing Use(E).
  - Dismount the wheel by pressing the Jump(Spacebar).
  - Sprinting in the wheel does not produce more power.

**Power Output Mechanics** (handbook)

- **Power Connections**
  - **Outputs**: Power Out
- The IO connection will not allow any connections if it is below the water line.
- **Power Output**
  - **Oceans and Rivers**: 0rW - 30rW (dependent on placement)
  - **Land**: 60rW
- **Fluctuations**: When properly placed in a river, there are no fluctuations.
  - Fluctuations are most likely to happen when using the wheel in the Ocean.
  - When built in a river at an angle other than parallel to the shoreline can cause fluctuations.

**Placement Considerations** (handbook)

- When building in the water, ensure the IO connection is not below the water line.
- The optimal place to get constant power generation is in a river and it should be placed parallel to the shoreline.
  - If it is not placed parallel with the shoreline, it will produce less than 30rW and begin to fluctuate.
  - Placing the wheel at 90 degrees to the shoreline will produce 0rW.
- Placing the wheel in the Ocean will cause power to fluctuate up and down and never produce a full 30rW.
- When building in the water, it will require a building block to be placed on.

**Notes** (handbook)

- Holding a hammer while looking at the wheel will show its health.
- –Will auto-repair over time using resources from the Tool Cupboard–
- By using water or people, it's the only hybrid power source in the game.
- Does not require fuel or upkeep once placed.
- Multiple turbines can be used with Root Combiners to centralize the power sources.

## Small Generator

Type `fuelgenerator_small` · alias `gen_small` · item 1849887541

A small electric generator powered by Low Grade Fuel that outputs 40 power.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Force Start` | in | power | bottom |  |
| `Force Stop` | in | power | bottom |  |
| `Power Out` | out | power | right |  |

Properties (`props` in a spec):
- `Fuel Amount` — float, default `500`. Enter the amount of fuel to input.
- `Output Amount` — int, default `40` *(simulator-only setting)*. Enter the amount of power to output.
- `Show Run-time` — bool, default `true` *(simulator-only setting)*. Enable to display the remaining run-time in seconds.

Simulator: consumption 0 rW · root power source · accepted by Root Combiner.
Craft: 5 High Quality Metal, 2 Gears.

- Root power producer with an output of 40 power
- Can be combined with the Root Combiner
- Can be started and stopped with the power inputs
- Run-time calculation with a maximum input of 500 fuel: (input / 4) * 60

**Functionality** (handbook)

- Small Generators will output electricity when they are turned on.
- You can Start and Stop them manually or use one of the electrical inputs.
- The last input to receive power is the function that is activated, even if power is still being applied to the opposite.
- They still produce max power when damaged.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**
    - Force Start - Turns the generator on.
    - Force Stop - Turns the generator off.
  - **Outputs**: Power Out
- **Fuel Consumption**: 500 Low Grade Fuel / 2 hours
- **Power Output**: 40rW

**Placement Considerations** (handbook)

- Must be placed on floors, foundations, or the ground.
- Can be rotated with Reload(R).
- They can be picked up with a hammer but lose 20% health.

**Notes** (handbook)

- Holding a hammer while looking at the generator will show its health.

## Test Generator

Type `testgenerator_small` · alias `generator_small` · item -295829489

An alternative source of power to the Wind Turbine and Solar Panels. This item must be spawned in.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power Output 1` | out | power | right |  |
| `Power Output 2` | out | power | right |  |
| `Power Output 3` | out | power | right |  |

Properties (`props` in a spec):
- `Amount` — int, default `100` *(simulator-only setting)*. Enter the amount of power to output.

Simulator: consumption 0 rW · root power source · accepted by Root Combiner · rotatable (0/90/180/270).

- Root power producer with an output of 100 power or 300 power combined
- Can be combined with the Root Combiner
- Can only be spawned in
- Can be rotated before placing by pressing R in-game, or by pressing R after placing in the simulator

**Functionality** (handbook)

- Only available to admins or creative mode users
- Can be damaged and destroyed
- Provides a constant 300rW of power

**Power Output Mechanics** (handbook)

- **Power Connections**
  - **Outputs**: Power Output 1, Power Output 2, Power Output 3
  - **Power Output**: 100rW per output
- Unlike other power sources, it does not require fuel, elevation, or specific placement conditions.

**Placement Considerations** (handbook)

- Can be placed on any flat building block and the ground
- Cannot be placed underwater
- Can be picked up once placed
- Can be rotated with Reload(R)
