# Components: Sensors

Port labels are case-sensitive in exported XML (the build script matches them case-insensitively).
Side = where the port sits on the 64×64 component. Back to the [component index](../components.md).

## HBHF Sensor

Type `hbhfsensor` · item -1507239837

A Heartbeat, Breathing, Humidity and Footstep sensor. Passthrough is equal to the number of humans detected in a 10 m radius with line of sight.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Power Out` | out | power | right |  |

Properties (`props` in a spec):
- `Detected` — int, default `1` *(simulator-only setting)*. Enter the detected amount.

Simulator: consumption 1 rW · rotatable (0/90/180/270).
Craft: 75 Metal Fragments.

- Requires at least 2 power to output 1 power while detecting a player (scales with power input / players detected)
- Can be rotated before placing by pressing R in-game, or by pressing R after placing in the simulator

**Functionality** (handbook)

- The HBHF Sensor detects awake players, NPCs, and scientists within its detection range. (Does not detect sleepers)
- **Detection Range**: Roughly 11 meters (approximately 3.5 square foundations).
- **Line of Sight Required**
  - The sensor must have an unobstructed view of the target to detect them.
  - Most deployables do not obstruct the sensor's line of sight.
  - Crouching under a half-height floor does not prevent detection from above.
  - The sensor can be built in ways that allow it to see through walls, floors, and roofs.
- **Deployables that do block the HBHF Sensor**
  - Rustigé Egg - White
  - Vending Machines
  - Chippy Machine
  - Large Water Catcher
  - Oil Refinery
  - Deck of the Large Pool
- **Configuration Settings**
  - Can be set to detect Authorized and Unauthorized players.
  - Sensor range can be set from 1 to 10 meters
  - If TC authorized, look at the sensor and press Use (E) to toggle settings.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Input**: Power In
  - **Output**: Power Out
- **Power Consumption**: 1rW
- **Active Usage**: 1
- **Power Output**
  - 1rW per person detected.
  - If connected to a Counter set to Show Passthrough, it will display the number of people the sensor detects.
- **Scientist Detection**
  - Detects all scientist types, including those riding in the CH-47 Chinook.

**Placement Considerations** (handbook)

- Can be placed on all angled surfaces and the ground.
- Can be rotated with Reload (R) before placement.

## Seismic Sensor

Type `seismicsensor` · item -948291630

A small device that detects vibrations within a set range. Will let power pass through depending on the explosive type detected, ideal to know when your time has come.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | bottom |  |
| `Passthrough` | out | power | top |  |

Properties (`props` in a spec):
- `Detected` — int, default `1` *(simulator-only setting)*. Enter the detected amount.

Simulator: consumption 1 rW.
Craft: 3 High Quality Metal, 1 Tech Trash.

- Only requires 1 power to output 1 - 3 power after detecting an explosion

**Functionality** (handbook)

- The Seismic Sensor is designed to detect explosions within a maximum radius of 30.5 meters (10 foundations).
- When an explosion occurs within range, the sensor outputs power for 3 seconds, with the amount of power depending on the explosion type.
- If placed within Tool Cupboard (TC) range, it will auto-repair over time using TC resources.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Input**: Power In
  - **Output**: Power Out
- **Power Consumption**: 1rW
- **Active Usage**: 1
- **Power Output**
  - 1rW, 2rW, or 3rW, depending on the explosion type and amount of available input power.
  - **Output Duration**: 3 seconds per explosion detected.
- Explosion Detection & Power Output
- Outputs 1rW for:
  - Beancan Grenade
  - F1 Grenade
  - Smoke Rocket
  - Incendiary Rocket
  - High Velocity Rocket
  - Homing Missile
  - SAM Ammo
  - Exploding Minicopter
  - Exploding Transport Helicopter
  - Exploding Attack Helicopter
  - Homemade Landmine
  - Patrol Helicopter (Rocket)
  - Bradley APC (Main Cannon)
  - Exploding Flame Turret
  - Firebomb
- Outputs 2rW for:
  - Explosive 5.56 Ammo
  - Satchel Charge
  - 40mm HE Grenade
  - Torpedo
  - Propane Explosive Bomb
  - Battering Ram
  - Hammerhead Bolt
- Outputs 3rW for:
  - Rocket
  - MLRS Rocket
  - Timed Explosive Charge

**Output Power Separation** (handbook)

- When the sensor outputs power, the question is often raised about how to identify which explosion was detected. One simple way is to wire a series of Electrical Branches all set to 1. With a large enough explosion, power will go into all 3 lights. The lights are just a representation of the signal. Players can choose what to do with the 1rW.
- If players only want to trigger 1 thing instead of all 3, some Memory Cells can be introduced.

**Placement Considerations** (handbook)

- Can be placed on the ground and all building structures.
- Cannot be rotated.

## Laser Detector

Type `laserdetector` · item -798293154

A gate which allows power to flow while a player is in the beam.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Power Out` | out | power | right |  |

Simulator: consumption 1 rW · rotatable (0/90/180/270).
Craft: 75 Metal Fragments.

- The laser can be hidden with certain items such as the Refrigerator
- Can be rotated before placing by pressing R in-game, or by pressing R after placing in the simulator

**Functionality** (handbook)

- The Laser Detector projects a continuous laser beam that activates power when a player enters the beam.
- **Detection Range**
  - The laser extends just over 12 meters (4 foundations) and detects players across its full length.
- **Detection Mechanics**
  - Detects players approaching straight on.
  - Can be crouched under and jumped over to avoid detection.
- Deployable & Vehicle Interaction:
  - The laser is blocked by all deployables.
  - **The laser detects the following objects**
    - All Land, sea, and air vehicles (including NPC helicopters)
    - Horses by themselves are not detected. If a rider parks a horse in the beam, when the rider gets off the horse, it will continue to be detected until it is removed or dies.
    - Mounted Ballistas, Battering Rams, Catapults, Siege Towers, Supply Crates and Drones

**Power Mechanics** (handbook)

- **Power Connections**
  - **Input**: Power In
  - **Output**: Power Out
- **Power Consumption**: 1rW
- **Active Usage**: 1
- **Power Output**: Power input minus 1rW

**Placement Considerations** (handbook)

- Can be placed on all building structures.
- Can be rotated with Reload (R) before placement.
- Can be placed in floors before upgrading to detect players walking above.

## Pressure Pad

Type `pressurepad` · item -2049214035

A gate which allows power to flow while a player is standing on it.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Power Out` | out | power | right |  |

Simulator: consumption 0 rW · root power source · accepted by Root Combiner · rotatable (0/90/180/270).
Craft: 150 Wood, 1 Gears, 1 Metal Spring.

- The pad can be hidden with certain items such as the Rug
- The pad can output a pulse of 1 power while not powered
- Can be combined with the Root Combiner (when pulsing)
- Can be rotated before placing by pressing R in-game, or by pressing R after placing in the simulator

**Functionality** (handbook)

- The Pressure Pad is a trigger mechanism that detects movement when stepped on.
- Detects land, sea, and air vehicles, including:
  - Horses
  - Frankenstein’s Monster
- Can be triggered through half-height floors from below or ramps from above.
- Many deployable items can be placed on top of the pad without affecting its functionality, including:
  - Sleeping Bags, Chairs, Rugs, and Planter Boxes.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Input**: Power In
  - **Output**: Power Out
- **Power Consumption**: 0rW
- **Active Usage**: 0
- **Power Output**: Equal to input power
- Briefly generates 1rW when pressed, even without power input.
- If powered, the pad pulses 1rW first before outputting the incoming power.

**Placement Considerations** (handbook)

- Can only be placed on floors or foundations.
- Can be rotated with Reload (R) before placement.
- Can be connected to Root Combiners.
