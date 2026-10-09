# Components: Utilities

Port labels are case-sensitive in exported XML (the build script matches them case-insensitively).
Side = where the port sits on the 64×64 component. Back to the [component index](../components.md).

## Door Controller

Type `doorcontroller` · item -502177121

A Door Controller. Will manipulate the state of the closest door when it receives power.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | bottom |  |
| `Open` | in | power | right |  |
| `Close` | in | power | right |  |
| `Passthrough` | out | power | top |  |

Simulator: consumption 1 rW.
Craft: 75 Metal Fragments.

- Use the passthrough power to detect when the door has been destroyed

**Functionality** (handbook)

- Used to open and close doors, shutters, and gates, including:
  - Single and double doors
  - Garage doors
  - Window shutters
  - Wooden shop fronts
  - Prison cell gates
  - Chainlink fence gates
  - Ladder hatches
  - High external wooden and stone gates
- Deploys directly onto the door or window shutter, except for the wooden shop front.
- Can be placed on either side of a door, but each door is limited to one controller.
- Shutters can have up to two controllers.
- When powered through Power In, the door opens; when power is removed, it closes.
  - When power is sent to it to open the door, the bottom light will turn green.
  - When no power is sent to it, the bottom light will turn off.
- Open and Close inputs allow direct control, but the controller itself must be powered to use them.

**Pairing** (handbook)

- When deployed, it will automatically pair with the door and the top light will turn green.
  - When the Tool Cupboard is destroyed, the controller will unpair and the top light will turn red.
  - When the controller must be paired to use it to the door for it to control the door. When it becomes unpaired, the door will remain in its current state, open or closed.
  - The controller can be paired manually by looking at it and pressing Use(E) to pair to the door.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In, Open, Close
  - **Outputs**: Passthrough
- **Power Consumption**: 1rW
- **Active Usage**: 1
- **Power Output**: Input power minus 1rW
- **Input Priority Behavior**
  - No priority between Open and Close inputs—whichever is powered last determines the state.
  - Open/Close inputs have priority over Power In.
  - **Example Scenarios**
    - If Open is receiving power and the door is open, removing power from Power In will not close the door.
    - If Close is receiving power and the door is closed, applying power to Power In will not open the door.
    - If Close is receiving power and the door is open, applying power to Power In will cause the door to close.
  - When sending power to Power In on a Door Controller with its Passthrough output connected to its Close input, a closed door will remain closed.

**Placement Considerations** (handbook)

- Must be attached directly to the door or shutter.
- Can be placed on either side of a door but is limited to one controller per door except for the Window Shutter that can have 2.
- Cannot be rotated.

## Audio Alarm

Type `audioalarm` · item 2100007442

A speaker which will emit a loud warning alarm when powered.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |

Simulator: consumption 1 rW · rotatable (0/90/180/270).
Craft: 75 Metal Fragments.

- Useful for audible alerts and can be heard several building blocks away
- Can be rotated before placing by pressing R in-game, or by pressing R after placing in the simulator

**Functionality** (handbook)

- Emits a loud alarm sound when powered, alerting players in the vicinity.
- Commonly used for base security, warning of intrusions, breaches, or raid attempts.
- Can be integrated with sensors or switches for automatic activation.
- Has a fixed volume and cannot be adjusted.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In
- **Power Consumption**: 1rW
- **Active Usage**: 1

**Placement Considerations** (handbook)

- Can only be placed on floors, foundations, or the ground.
- Can be rotated before placement using Reload (R).
- **Sound travel distance**
  - **Unobstructed**: ~14 foundations (~42 meters).
  - Behind 1 wall: ~11 foundations (~33 meters).
  - Additional walls do not reduce sound range further

**Notes** (handbook)

- Displays health when looked at with a Hammer.
- Auto-repairs over time with resources from the Tool Cupboard.

## Igniter

Type `igniter` · item -44876289

Ignites nearby objects such as furnaces and campfires when power is received.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |

Properties (`props` in a spec):
- `Health Amount` — float, default `250`. Enter the amount of component health.
- `Show Time Remaining` — bool, default `true` *(simulator-only setting)*. Enable to display the remaining time until decay in seconds.

Simulator: consumption 2 rW · rotatable (0/90/180/270).
Craft: 75 Metal Fragments.

- Automatically heals itself when under building privilege
- Ignites almost a 1-block radius
- Full health is 250 and decays 1/4 health per sec of operation until broken
- Can be rotated before placing by pressing R in-game, or by pressing R after placing in the simulator

**Functionality** (handbook)

- Used to ignite various fire-based objects, including:
  - Barbeque, Beancan Grenade, Camp Fire, Candles, Carvable Pumpkin, Chinese Lantern, Confetti Cannon, Fireplace, Fireworks, Hobo Barrel, Jack O' Lanterns, Lanterns, Large Furnace, Skull Fire Pit, Sky Lanterns, Small Furnace, Small Oil Refinery, Satchel Charge, Torch in a holder, Tuna Can Lamp, Firebomb, and Propane Explosive Bomb.
- Has an ignition diameter of about 3 meters or 1 square foundation.
- Takes damage when active but has enough health to last 16 to 17 minutes.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In
- **Power Consumption**: 2rW
- **Active Usage**: 2 or 0
- **Power Behavior**
  - When connected directly to a battery, consumes 2rW and shows an Active Usage of 2.
  - If connected through an Electrical Branch set to 2, the Igniter still functions but the battery’s Active Usage reads 0.

**Placement Considerations** (handbook)

- Can be placed on any angled building surface and the ground.
- Can be rotated before placement using Reload (R).

**Notes** (handbook)

- Displays health when looked at.
- Auto-repairs over time with resources from the Tool Cupboard.

## CCTV Camera

Type `cctv_camera` · item 634478325

A CCTV Camera system can be used for realtime surveillance and security around your base when powered and paired with the Computer Station.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | bottom |  |

Simulator: consumption 3 rW.

- Building privilege is required to set the ID of the camera
- `<a href="https://www.reddit.com/r/rustrician/comments/fe032p/cctv_fixed_locations_and_identifiers/" target="_blank">`Camera ID Reference`</a>`

**Functionality** (handbook)

- Provides remote surveillance capabilities but has a fixed position (no pan, tilt, or zoom).
- Requires pairing with a unique ID to be accessible from Computer Stations and Rust+.
- TC authorization is required to set an ID.
- Can be viewed via Computer Stations by entering the assigned camera ID.
- Can be accessed via Rust+ but requires the player to disconnect from the server first.
- Pre-placed cameras exist at some monuments and can be accessed through the current Camera List in Uncategorized under Concepts.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Unnamed Input
- **Power Consumption**: 3rW
- **Active Usage**: 3

**Placement Considerations** (handbook)

- Can only be placed on vertical surfaces.
- Cannot be rotated.
- **To aim the camera**: Stand in the direction you want the camera to face, hold a Hammer, and press Use (E) to adjust its position.
- To pick up the camera, hold Use (E).

**Usage Instructions** (handbook)

- **Assigning an ID**
  - Gain TC authorization.
  - Look at the camera and press Use (E) to Set ID (maximum 31 characters).
- **Viewing the Camera via Computer Station**
  - Mount a Computer Station.
  - Add the camera's ID in the bottom left field.
  - Select the camera from the list to begin viewing.
- Viewing the Camera via Rust+:
  - Add the camera ID in the Rust+ app.
  - The player must disconnect from the server before remote access is allowed.
- **Security Considerations**
  - Anyone can add any camera to any Computer Station, so use unique names for IDs.

**Notes** (handbook)

- Displays health when looked at with a Hammer.
- Auto-repairs over time with resources from the Tool Cupboard.

## PTZ CCTV Camera

Type `ptz_cctv_camera` · item 140006625

A CCTV Camera system can be used for realtime surveillance and security when paired with the Computer Station. This camera has pan, tilt, and zoom capability.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | bottom |  |

Simulator: consumption 3 rW.
Craft: 150 Metal Fragments, 1 CCTV Camera.

- Building privilege is required to set the ID of the camera

**Functionality** (handbook)

- Provides remote surveillance capabilities with pan, tilt, and zoom controls.
- Requires pairing with a unique ID to be accessible from Computer Stations and Rust+.
- TC authorization is required to set an ID by looking at it and pressing Use(E).
- Can be viewed via Computer Stations by entering the assigned camera ID.
- Can be accessed via Rust+ but requires the player to disconnect from the server first.
- Pre-placed cameras exist at some monuments and can be accessed. Find their IDs in the Camera ID List.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In
- **Power Consumption**: 3rW
- **Active Usage**: 3

**Placement Considerations** (handbook)

- Can be placed on ceilings or the inside of roofs.
- Can be rotated before placement using Reload (R).
- **Aiming the camera**: Stand in the direction you want the camera to face, hold a Hammer, and press Use (E) to adjust its position.
- To pick up the camera, hold Use (E).

**Usage Instructions** (handbook)

- **Assigning an ID**
  - Gain TC authorization.
  - Look at the camera and press Use (E) to Set ID (maximum 31 characters).
- **Viewing the Camera via Computer Station**
  - Mount a Computer Station.
  - Add the camera's ID in the bottom left field.
  - Select the camera from the list to begin viewing.
- **Controlling the Camera**
  - **Mouse movement**: Pan and tilt the camera.
  - Left-click: Zoom in.
- Viewing the Camera via Rust+:
  - Add the camera ID in the Rust+ app.
  - The player must disconnect from the server before remote access is allowed.
- **Security Considerations**
  - Anyone can add any camera to any Computer Station, so use unique names for IDs.

**Notes** (handbook)

- Displays health when looked at with a Hammer.

## Electric Heater

Type `electricheater` · item -784870360

Provides warmth in a radius when on.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | bottom |  |
| `Passthrough` | out | power | bottom |  |

Simulator: consumption 3 rW.
Craft: 200 Metal Fragments.

- The warmth radius is 4 meters, or a little more than 2 square foundations
- Has a passthrough power output

**Functionality** (handbook)

- Provides heat and comfort in a spherical radius.
- Dries off players that are wet.
- Helps regulate crop temperatures, preventing freezing in cold areas.
- Can overheat plants in the desert biome during the day.
- Emits an orange glow when powered.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In
  - **Outputs**: Passthrough
- **Power Consumption**: 3rW
- **Active Usage**: 3
- **Power Output**: Input power minus 3rW

**Placement Considerations** (handbook)

- Can be placed on vertical building blocks and some vertical ground surfaces.
- Cannot be rotated.
- **Three Distinct Heat Zones**
  - **Player Heat Bubble**
    - Provides warmth to players and dries them off.
    - Creates a 2x2 diameter sphere in front of the heater. The heater is located on the edge of the sphere.
  - **Comfort Bubble**
    - Provides up to 50% comfort.
    - Located within the Player Heat Bubble, it is slightly smaller with a 4-meter (1⅓ foundations) diameter.
    - Players receive more comfort standing slightly back rather than directly on the heater.
  - **Plant Heat Bubble**
    - Helps regulate crop temperatures.
    - A visual bubble is created to show the area of effect.
    - Covers a 2x2 spherical area but the heater is at the center of the sphere.
    - In cold biomes it prevents freezing; in hot biomes, can overheat plants if not turned off during the day.

## Modular Car Lift

Type `modularcarlift` · item 1696050067

This allows you to modify modular vehicles.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | bottom |  |

Simulator: consumption 5 rW.
Craft: 200 Metal Fragments, 5 High Quality Metal, 1 Gears.

- Requires 5 power to operate

**Functionality** (handbook)

- Allows modification of modular cars by adding or removing modules.
- Requires power to access the user interface (UI). Look at the control stand and press Use (E).
- Storing cars on a powered lift prevents vehicle decay.
- Anyone can add or remove code locks. TC authorization is not required to access the UI.
- Using a HBHF Sensor to cut power to the lift when non-auth players are nearby can help prevent unauthorized access.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In
- **Power Consumption**: 5rW
- **Active Usage**: 5

**Placement Considerations** (handbook)

- Can only be placed on floors or foundations.
- Can be rotated before placement using Reload (R).
- The space it takes up is roughly equal to a 2x3 of square foundations.
- Best placed inside a garage or near roads for easy vehicle access.
- Can be picked up with a Hammer.

**Notes** (handbook)

- Displays health when looked at with a Hammer.
- Auto-repairs over time.

## Computer Station

Type `computerstation` · item -1588628467

A Computer station for remote control access

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |

Simulator: consumption 5 rW.
Craft: 5 High Quality Metal, 1 Targeting Computer, 1 RF Broadcaster, 1 RF Receiver.

- Requires 5 power to operate and only incurs active usage while in-use

**Functionality** (handbook)

- Allows players to remotely view and control surveillance devices.
- Compatible with CCTV Cameras, PTZ Cameras, Drones, and Auto Turrets.
- Displays the in-game time in the bottom right of the interface.
- IDs must be assigned to cameras, drones, or turrets to be accessed remotely.
- The maximum number of IDs that can be added has a total character count of 1024.

**Operation & Control** (handbook)

- **To add an ID for viewing or control**
  - Mount a Computer Station.
  - In the bottom left, enter an ID.
  - Cameras need to be powered to be added to the list; Auto Turrets do not.
  - Select the ID from the list on the left to begin viewing or controlling the device.
- **Compatible Devices**
  - CCTV Cameras & PTZ Cameras: Provides a live feed when powered.
  - **Drones**: Allows remote piloting via the interface.
  - **Auto Turrets**: Allows controlling of turrets and shooting people.
- Anyone can add any ID to any Computer Station.
- IDs are limited to 31 characters.
- Pre-placed cameras exist at certain monuments, and their IDs can be found under Uncategorized Concepts.

**Power Mechanics** (handbook)

- **Power Consumption**: None (requires zero electricity)

**Placement Considerations** (handbook)

- Can be placed on flat surfaces, the ground, and the tugboat.
- Can be rotated before placement using Reload (R).

**Notes** (handbook)

- Displays health when looked at with a Hammer.

## Elevator

Type `elevator` · item 1177596584

A powered elevator. Place another elevator above or below this to connect it. Requires power.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Call Elevator` | in | power | left |  |
| `Call Elevator Alt` | in | power | right |  |

Simulator: consumption 5 rW.
Craft: 200 Metal Fragments, 3 High Quality Metal, 1 Gears.

- There are two Call Elevator ports per floor

**Functionality** (handbook)

- Used to transport players, horses, and small vehicles vertically.
- Can be stacked up to 11 floors high, with each module adding to the upkeep cost.
- **Upkeep Cost Breakdown**
  - Floor 1: 1 High Quality Metal, 20 Metal Fragments
  - Floor 2: +20 Metal Fragments
  - Floor 3: +20 Metal Fragments
  - Floor 4: +1 High Quality Metal, +20 Metal Fragments
  - Floor 5: +20 Metal Fragments
  - Floor 6: +20 Metal Fragments
  - Floor 7: +1 High Quality Metal, +20 Metal Fragments
  - Floor 8: +20 Metal Fragments
  - Floor 9: +20 Metal Fragments
  - Floor 10: +20 Metal Fragments
  - Floor 11: +1 High Quality Metal, +20 Metal Fragments
- Two-part structure:
  - **Shaft**: Houses the motor and the call inputs.
  - **Carriage**: Moves between floors and contains player controls.
- **Control pad buttons on the carriage**
  - **Front buttons**: Move one floor up or down.
  - **Side buttons**: Move to the top or bottom floor.
- Each floor has 2 Call Elevator inputs for external control.
- Standing under the elevator when descending results in instant death.
- If a player stands on a half-floor beneath the shaft, they may be pulled through the floor when crushed.
- **Elevator Speed**: 5m/s.
- There are gaps in the shaft's chainlink that can be used to place components on walls around the shaft.
- Auto-repairs over time.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In, Call Elevator
- **Power Consumption**
  - **Power In**: 5rW
  - **Call Elevator Input**: 1rW
- **Active Usage**: 5
- Each level has 1 Power In. Only 1 of them per shaft needs to receive power. Players can send 5rW to each Power In but not necessary.
- Power must be given to the Power input first before sending power to a Call Elevator input. If power is not applied in this order, the carriage will not move.

**Placement Considerations** (handbook)

- Must be placed on square floors or foundations.
- Can be rotated before placement using Reload (R).
- **Elevators are subject to upkeep scaling**
  - 10% for the first 15 building blocks, 15% thereafter.
- Upkeep is based on the total number of elevator modules, not height (e.g., five 2-floor elevators have the same upkeep as one 10-floor elevator).
- Removing an elevator shaft from TC coverage resets upkeep to only the bottom floor, or 1 HQM and 20 Metal Fragments.
- Can be placed adjacent to another elevator, as long as carriages do not interfere with adjacent floors. Example images below.
- Placing 1 floor side by side is no problem.
- Building the shaft 1 floor higher prevents placing another shaft beside it. This is because the carriage in the first shaft is located on the second floor. It ‘comes into contact with’ the new shafts mechanical area.
- Dropping the carriage to the first floor now allows for placing a new elevator shaft next to it.

## Telephone

Type `telephone` · item 1234878710

Use the telephone to call other telephones on the island!

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Call Passthrough` | out | power | right |  |

Simulator: consumption 1 rW.
Craft: 100 Metal Fragments, 1 Tech Trash, 50 Wood.

- Requires at least 1 power to operate and 2 or more for passthrough

**Functionality** (handbook)

- This is a landline telephone sitting on top of a cassette tape answering machine.
- Used to place and receive calls with other phones on the map.
- Press Use (E) to interact with the phone or the answering machine.
- TC authorization is not required to rename the phone or access the cassette answering machine.
- Each phone is automatically assigned a number, and players can give it a custom name (max 30 characters).
- Renamed phones appear in the Directory.
- Use the Directory to find other phones including those at monuments, mobile phones or player bases.
- Phones can be added to the contacts list using the phone name or number.
- Calls are limited to 2 minutes by default unless changed by the server owner.
  - Server owners can use the command telephonemanager.maxcalllength X to adjust call duration.
- Call audio is two-way and occurs in real time.

**Answering Machine Mechanics** (handbook)

- Requires a cassette to enable answering machine functionality.
- Accepts Short (10s), Medium (20s), and Long (30s) cassettes.
- Use a Cassette Recorder to record messages onto a cassette.
- Insert the cassette into the answering machine by looking at it and pressing Use(E).
- After 3 rings, the answering machine begins to play the outgoing message.
- Callers can leave a voicemail by pressing Jump(Spacebar) during the message.
- To listen to voicemails, access the phone and select Voicemail at the bottom of the screen.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power
  - **Outputs**: Call Passthrough
- **Power Consumption**: 1rW
- **Active Usage**: 1
- **Power Output**: Input power minus 1rW
- While a call is active, the phone outputs power through Call Passthrough for the duration of the call.

**Placement Considerations** (handbook)

- Can be placed on horizontal building blocks and the ground.
- Rotatable with Reload (R) before placement.

**Notes** (handbook)

- Auto-repairs over time with resources from the Tool Cupboard.

## Digital Clock

Type `digitalclock` · item 1619039771

A digital clock that displays the server time and lets you set alarms to pass power through when ringing. Ideal for synchronizing traps or timed events.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Power Out` | out | power | right |  |

Simulator: consumption 1 rW.
Craft: 100 Metal Fragments.

- Requires at least 1 power to operate and 2 or more for passthrough

**Functionality** (handbook)

- Displays the current in-game Rust time in hours and minutes.
  - Uses the 24-hour clock.
- Requires power to function. If power is lost, the display turns off.
- Players can set a max of 5 alarms to trigger at specific times.
- Can be used for coordination, especially for teams planning night/day activities.
- When an alarm is triggered, power will pass through, and the clock will start to beep.
- Emits a small orange glow, making it slightly visible in the dark.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In
  - **Outputs**: Power Out
- **Power Consumption**: 1rW
- **Active Usage**: 1
- **Power Output**: Input power minus 1rW

**Placement Considerations** (handbook)

- Can be placed on vertical and angled building blocks.
- Can also be placed on the ground, either flat or standing on its thin side.
- Cannot be rotated.

**Notes** (handbook)

- Displays health when looked at.
- Auto-repairs over time with resources from the Tool Cupboard.

## Fridge

Type `fridge` · item 1413014235

A fridge you can store food into!

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | right |  |

Simulator: consumption 5 rW.
Craft: 75 Metal Fragments.

- The Fridge requires 5 power to prevent food spoilage

**Functionality** (handbook)

- Provides 48 inventory slots for food and water storage.
- Prevents food from spoiling when powered. Applies a snowflake to the food items when active.
  - **Vegetables**: Normally spoils in 48 hours, but stops spoiling when inside a powered fridge.
  - **Raw Meat**: Normally spoils in 6 hours, but stops spoiling when inside a powered fridge.
  - **Cooked Meat**: Normally spoils in 24 hours, but stops spoiling when inside a powered fridge.
- Can be integrated into the Industrial System using a Storage Adapter attached to the top.
- Can be reskinned using the Spray Can.
- Displays health when looked at with a Hammer.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In
- **Power Consumption**: 5rW
- **Active Usage**: 5
- When receiving power, a green LED will appear on the front of the Fridge at the bottom.
- Power is not required in the arctic biome to keep food fresh.

**Placement Considerations** (handbook)

- Can be placed on floors and foundations.
- Can be rotated before placement using Reload (R).

**Notes** (handbook)

- Displays health when looked at with a Hammer.

## Mini Fridge

Type `mini_fridge` · item 1174484438

Ideal for preserving food and keeping items cool.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | right |  |

Simulator: consumption 2 rW.
Craft: 50 Metal Fragments.

- The Mini Fridge requires 2 power to prevent food spoilage

**Functionality** (handbook)

- Provides 18 inventory slots for food and water storage.
- Prevents food from spoiling when powered. Applies a snowflake to the food items when active.
  - **Vegetables**: Normally spoils in 48 hours, but stops spoiling when inside a powered fridge.
  - **Raw Meat**: Normally spoils in 6 hours, but stops spoiling when inside a powered fridge.
  - **Cooked Meat**: Normally spoils in 24 hours, but stops spoiling when inside a powered fridge.
- Can be integrated into the Industrial System using a Storage Adapter attached to the top.
- Displays health when looked at with a Hammer.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In
- **Power Consumption**: 2rW
- **Active Usage**: 2
- Power is not required in the arctic biome to keep food fresh.

**Placement Considerations** (handbook)

- Can be placed on floors and foundations.
- Can be rotated before placement using Reload (R).

**Notes** (handbook)

- Displays health when looked at with a Hammer.

## Vending Machine

Type `vending.machine` · item 198438816

Trade your goods with other players safely by creating sell and buy orders. If a raider gains access to the rear panel, they will have free reign over all of your goodies. Keep it safe.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | right |  |

Simulator: consumption 5 rW.
Craft: 75 Metal Fragments.

- The Vending Machine requires 5 power to prevent food spoilage

**Functionality** (handbook)

- Looking at the front of the machine, players can press Use(E) to enter the Shop UI. Here is where players can make purchases from the listed items for sale.
- Looking at the back of the machine, players can press and hold Use(E) to open a radial wheel to access:
  - **Open**: To access the storage container. Provides 30 inventory slots.
  - **Disable Broadcasting**: Disables broadcasting of the location of this object.
  - **Administrate**: Opens the administration panel.
- Prevents food from spoiling when powered. Applies a snowflake to food items when active.
  - **Vegetables**: Normally spoils in 48 hours, but stops spoiling when inside a powered fridge.
  - **Raw Meat**: Normally spoils in 6 hours, but stops spoiling when inside a powered fridge.
  - **Cooked Meat**: Normally spoils in 24 hours, but stops spoiling when inside a powered fridge.
- Can be integrated into the Industrial System using a Storage Adapter attached to the back.
- Can be reskinned using the Spray Can.

**Administration Panel** (handbook)

- The administration panel gives players the ability to configure and view several options and statistics.
- Customize the Vending Machines name. This is the name that will appear on the Map(G)
- Add Sell orders by searching for items and selecting their quantities. Click on the item's blueprint to the right of the item if wanting to buy or sell a blueprint.
- Existing orders will appear on the right side of the menu.
- At the top of the menu will inform the player if their machine Supports Drones, or not.
- Clicking on See Stats will show things like:
  - Total Sales - Tracks the total number of sales over the life of the machine.
  - Peak Sale Hour - Shows the players local time when the most sales were occurring.
  - Unique Customers - Tracks the number of first time purchasers.
  - Repeat Customers - Tracks the number of players that have returned to make 2 or more purchases.
  - Best Customer - I am not sure what this number means here and do not know how they are assigned.
  - Timescale - Allows players to select the time period of the statistics.
    - All Time
    - Last 24 Hours
    - Last 12 Hours
    - Last Hour
    - Last 30 Minutes
  - Stats tabs, including:
    - History - How many of what was sold, for how much it was sold, along with the local date and time.
    - Total Sold - Shows the total amount of sold items.
    - Total Revenue - Shows the total amount earned from each item.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: (Fridge) Power In
- **Power Consumption**: 5rW
- **Active Usage**: 5

**Placement Considerations** (handbook)

- Can be placed on floors and foundations.
- Can be snapped into single door frames.
- Can be rotated before placement using Reload (R).
- Can be rotated after placement by looking at its side and pressing Use(E)
  - Cannot be rotated after a Storage Monitor is applied to the top of it.

**Notes** (handbook)

- Displays health when looked at with a Hammer.

## Command Block

Type `commandblock` · item -1247485104

A block that runs commands.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | top |  |
| `Passthrough` | out | power | top |  |

Simulator: consumption 1 rW.

- Can only be spawned in by an admin

**Functionality** (handbook)

- This an admin only command block that will execute 1 server side command when powered.
- Server owners will need to enable the use of the blocks with the following commands:
  - Commandblock.commands_enabled True or False
    - Allows the use of the Command Block on the server.
    - **WARNING**: DO NOT, FOR ANY REASON, let normal players get access to your Command Blocks if they are enabled.
  - Commandblock.use_player True or False
    - Allows for the use of commands that affect the player that last enters a command.
- **Example Commands**
- inventory.giveto `<player_name_or_id>` `<item_name>` `<item_amount>`
  - inventory.giveto `<player_name_or_id>` scrap 20000
- say `<message>`
  - say hello - prints hello in global chat
- env.time `<0-24>`
  - env.time 12 - changes the time to 1200hrs
- entity.spawn `<entity>` `<position>`
  - entity.spawn minicopter 0,0,0 - spawns a minicopter at the center of the map
- spawnitem `<item>` `<position>`
  - spawnitem fun.guitar 0,0,0 - spawns an Acoustic Guitar at the center of the map
  - Check out more spawnable items on Corrosionhour (https://www.corrosionhour.com/rust-item-list/)
- killplayer `<player_name_or_id>`
  - killplayer SwiftCoyote - kills SwiftCoyote
- weather.load `<weather>`
  - **Weather options**
    - Clear
    - Dust
    - Fog
    - Overcast
    - RainHeavy
    - RainMild
    - Storm
  - Check out more weather commands on Corrosionhour (https://www.corrosionhour.com/rust-weather-command/)
- supply.call - calls a supply crate to the island
- heli.call - calls the attack heli to the island
- Commands that affect the last player to enter a command into the Command Block
- teleportpos 0,0,0 - teleports the player to the center of the map
- Sleep - puts the player to sleep
- eat 100 - feeds the player 100 hunger points

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In
  - **Outputs**: Passthrough
- **Power Consumption**: 1rW
- **Active Usage**: 0

**Placement Considerations** (handbook)

- Can be placed on floors, foundations and the top side of roofs.
- Can be placed underwater.
- It is not subject to stability.
- They can be stacked on themselves and other components.
- Can be rotated before placement using Reload (R).

## Fogger-3000

Type `fogmachine` · item -1973785141

A Fog machine which runs on low grade fuel. Can be set to fill an area with a dense fog or triggered by motion.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Turn On` | in | power | bottom |  |
| `Toggle` | in | power | bottom |  |
| `Turn Off` | in | power | bottom |  |

Simulator: consumption 1 rW.
Craft: 100 Metal Fragments, 30 Low Grade Fuel, 1 Metal Pipe.

- Must be purchased from the Rust Item Store to obtain the blueprint

**Functionality** (handbook)

- Emits a thick, localized fog when activated, reducing visibility in the surrounding area.
- Requires TC authorization to modify settings.
- **To change settings**: Look at the Fogger and hold Use (E) to access options for Activate, Open, or Motion Mode.
- **Has two modes**: Active and Motion.
  - **Active Mode**: Runs continuously, consuming 1 Low-Grade Fuel per minute.
  - **Motion Mode**: Triggers only when a non-authorized player moves nearby, emitting thicker fog every few seconds. Consumes 10 Low-Grade Fuel per minute.
- Fog covers an area of approximately a 2x2 foundation space and is thickest below half-height walls.
- Fog takes 5 seconds to fully form and 40 seconds to dissipate after deactivation.
- Multiple foggers increase fog density, with 4 blocking light from fires and 5 blocking electrical light.
- Fog falls and accumulates on horizontal surfaces, meaning higher placement results in a falling fog effect.

**Power & Fuel Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Turn On, Toggle, Turn Off
- **Power Consumption**: 1rW to trigger inputs
- **Active Usage**: 0
- **Fuel Capacity**: 500 Low-Grade Fuel
- **Fuel Consumption**
  - **Active Mode**: 1 Low-Grade Fuel per minute
  - **Motion Mode**: 10 Low-Grade Fuel per minute
- **Input Behavior**
  - **Turn On Input**: Activates the fogger while power is applied.
  - **Turn Off Input**: Deactivates the fogger while power is applied.
  - **Toggle Input**: Turns the fogger on when power is received and off when power is removed.
  - If Turn On and Turn Off are both powered, the last input to receive power takes priority.

**Placement Considerations** (handbook)

- Can be placed on flat and angled building blocks, as well as the ground.
- Can be rotated before placement using Reload (R).
- Can be picked up with a Hammer but loses 10 HP.

**Notes** (handbook)

- Auto-repairs over time with resources from the Tool Cupboard.

## Snow Machine

Type `snowmachine` · item 1358643074

A machine which will blanket the surrounding terrain in snow.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Toggle` | in | power | bottom |  |
| `Turn On` | in | power | bottom |  |
| `Turn Off` | in | power | bottom |  |

Simulator: consumption 1 rW.
Craft: 125 Metal Fragments, 30 Low Grade Fuel, 1 Metal Pipe.

- Must be purchased from the Rust Item Store to obtain the blueprint

**Functionality** (handbook)

- Covers the surrounding terrain in snow when activated.
- Does not require electricity. It can be manually turned on and off.
- **To change settings**: Look at the machine and hold Use (E) to access options for Activate, Open, or Stop.
- Requires TC authorization to change settings.
- The snow pile has a radius of 3.5 square foundations.
- The snow pile takes 1 second to form and 2 minutes 45 seconds to disappear.
- The temperature within this area will drop and be similarly as cold as the Arctic Biome.
- Snow depth reaches up to a player's chin but does not increase with multiple machines.
- Items like Landmines and Snap Traps can be hidden under the snow.
- The visual snowfall effect reaches up to 3.5 floors high.

**Power & Fuel Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Toggle, Turn On, Turn Off
- **Power Consumption**: 1rW to trigger inputs
- **Active Usage**: 0
- **Fuel Capacity**: 500 Low Grade Fuel
- **Fuel Consumption**: 1 Low Grade Fuel per minute
- **Input Behavior**
  - The last input to receive power is the input that dictates the state of the machine.
  - **Toggle Input**: Turns the machine on when power is received and off when power is removed.
  - **Turn On Input**: Activates the Snow Machine.
  - **Turn Off Input**: Deactivates the Snow Machine.
  - When turned on, there is a 10 second window where it cannot be turned off.

**Placement Considerations** (handbook)

- Can only be placed on the ground.
- Can be rotated before placement using Reload (R).
- Can be picked up with a Hammer but loses 75 HP.

**Notes** (handbook)

- Displays health when looked at with a Hammer.
- Auto-repairs over time with resources from the Tool Cupboard.

## Spooky Speaker

Type `spookyspeaker` · item 1885488976

Frighten your guests with creepy and spooky halloween sounds!

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Turn On` | in | power | bottom |  |
| `Turn Off` | in | power | bottom |  |

Simulator: consumption 1 rW.
Craft: 100 Metal Fragments, 20 Cloth, 400 Wood.

- Must be purchased from the Rust Item Store to obtain the blueprint

**Functionality** (handbook)

- Plays creepy, eerie and spooky sounds when turned on.
- Does not require power to work. Can be manually turned on.
- Commonly used for psychological effects in PvP, base decoration, or traps.
- Cannot be crafted without owning the Steam item.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Turn On, Turn Off
- **Power Consumption**: 1rW
- **Active Usage**: 0
- **Power Behavior**
  - The last input to receive power is the input that dictates the state of the speaker.
  - Sending power to Turn On will activate the speaker.
  - Sending power to Turn Off will deactivate the speaker.

**Placement Considerations** (handbook)

- Can only be placed on floors, foundations, or the ground.
- Can be rotated before placement using Reload (R).
- **Sound travel distance**
  - **Unobstructed**: Approximately 14 foundations (Approximately 42 meters).
  - Behind 1 wall: Approximately 11 foundations (Approximately 33 meters).
  - Additional walls do not reduce sound range further.

**Notes** (handbook)

- Displays health when looked at with a Hammer.
- Auto-repairs over time with resources from the Tool Cupboard.
