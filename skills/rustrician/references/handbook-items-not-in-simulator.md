# Handbook items the simulator cannot place

These appear in the Rust Electrical Handbook but have no rustrician.io component (tools, fireworks, items placed by other means).
Mention them in notes when a design needs them in-game; do not put them in a circuit spec.

## Wire Tool

Category: Tools · Item ID: -144417939

A tool used to create electrical connections between components. Essential for wiring electrical circuits in Rust.

**Functionality**

- The Wire Tool allows players to connect electrical components and view the status of batteries and auto-turrets.
- To create a wire connection, left-click on the input/output (IO) of one component, then left-click again on the input/output (IO) of another component.
- Using multiple Wire Tools in the hot bar, players can run multiple wires at the same time. Each Wire Tool can also be set to its own wire color.
- It can be stored in a Tool Cupboard.

**Wire Mechanics**

- **Wire Length**: Approximately 30 meters (10 building foundations) before needing to be reconnected to a component.
- **Wire Anchors**: A single wire can be attached or anchored to a building block up to 16 times before it needs to be connected to another component.
- **Color Coding**: Players can cycle through different wire colors by holding Reload(R) before placing a wire. After a wire is placed, recolor the wire by selecting the color and tapping Reload(R) on an IO connection.
- **Removing Wires**: To remove a wire, look at the IO connection and tap Right-Click once to pick up the wire. Holding Right-Click will delete the entire wire.
- **Undoing Placement**: If a mistake is made, tap Right-Click and it will undo the last placement or anchor point.
- **Wire Slack**: To adjust wire slack, hold Sprint(Left Shift) and scroll the mouse wheel. Scrolling down will increase the amount of slack, and scrolling up will decrease slack, with no slack being the default. The amount of slack available is inversely proportionate to the length between anchor points. (A short wire can have lots of slack and a long wire will have barely any.) The amount of slack is not reset after use.
- **Wire Snapping**: Hold Sprint (Left Shift) to snap wires at 90 degree angles.
- **IO Port Snapping**: By default, the wire will want to snap to IO ports. Hold Head Look(Left Alt) to stop the snap when placing wires near IO ports.
- **Component Snapping**: Holding Sprint(Left Shift) allows players to snap electrical components in line with each other. This works for components above and below each other as well as side-to-side. Once two components are placed close together, either side-by-side or above/below, as players continue to place more components in that line, the game will try to match the spacing created between the first two.
- **Wire Tracing**: To trace an existing wire, left-click the IO connection point. This action will prompt a wire animation for the selected connection only. Note: You need to have TC Auth to trace wires.

**Notes**

- Does not work on fluid or industrial connections.
- When wires are placed on walls and the wall is destroyed, the wires will remain in place.
- Wear Diving Fins to get cleaner and straighter wire placement. They force the player to move slower, allowing for better accuracy when strafing left and right.
- To increase or decrease the range of the auto snap when getting close to an IO connection, in the F1 console, change client.lookatradius from 0.2 to 0.05. This lets anchor points be placed closer to IO connections without them snapping to the connection.
- Once players have started running a wire, it is possible to switch to another hotbar slot (to place an electrical component or ladder, for example) and switch back to the Wire Tool without losing the progress on the wire that was being run. However, if the Wire Tool is removed from the hotbar in the middle of a wire run, the wire is deleted and must be restarted.

## Hose Tool

Category: Tools · Item ID: 363163265

A tool used to create water connections between components. Essential for moving water in Rust.

**Functionality**

- The Hose Tool allows players to connect water components only.
- To create a hose connection, left-click on the input/output (IO) of one component, then left-click again on the input/output (IO) of another component.
- Using multiple Hose Tools in the hot bar, players can run multiple hoses at the same time, and each Hose Tool can be set to its own hose color.
- It can be stored in a Tool Cupboard.

**Hose Mechanics**

- **Hose Length**: Approximately 30 meters (10 building foundations) before needing to be reconnected to a component.
- **Hose Anchors**: A single hose can be attached or anchored up to 16 times before it needs to be connected to another component.
- **Color Coding**: Players can cycle through different hose colors by holding Reload(R) before placing a hose. After a hose is placed, it can be recolored by selecting the color and tapping Reload(R) on an IO connection.
- **Removing Hoses**: To remove a hose, look at the IO connection and tap Right-Click once to pick up the hose. Holding Right-Click will delete the entire hose.
- **Undoing Placement**: If a mistake is made, tap Right-Click and it will undo the last placement or anchor point.
- **Hose Slack**: To adjust hose slack, hold Sprint(Left Shift) and scroll the mouse wheel. The amount of slack available is inversely proportionate to the length between anchor points. (A short hose can have much slack and a long hose will have barely any.) The amount of slack is not reset after use.
- **Hose Snapping**: Hold Sprint (Left Shift) to snap hoses at 90 degree angles.
- **IO Port Snapping**: By default, the hose will want to snap to IO ports. Hold Head Look(Left Alt) to stop the snap when placing hoses near IO ports.
- **Component Snapping**: Holding Sprint(Left Shift) allows players to snap water components in line with each other. This works for components above and below each other as well as side-to-side. Once two components are placed close together, either side-by-side or above/below, as players continue to place more components in that line, the game will try to match the spacing created between the first two.
- **Hose Tracing**: To trace an existing hose, left-click the connection point. This action will prompt a hose animation for the selected connection only. Note: Players need to have TC Auth to trace hoses.

**Notes**

- Does not work on electrical or industrial connections.
- When hoses are placed on walls and the wall is destroyed, the hose will remain in place.
- Wear Diving Fins to get cleaner and straighter hose placement. They force the player to move slower, allowing for better accuracy when strafing left and right.
- To increase or decrease the range of the auto snap when getting close to an IO connection, in the F1 console, change client.lookatradius from 0.2 to 0.05. This lets anchor points be placed closer to IO connections without them snapping to the connection.
- Once players have started running a hose, it is possible to switch to another hotbar slot (to place a fluid component or ladder, for example) and switch back to the Hose Tool without losing the progress on the hose that was being run. However, if the Hose Tool is removed from the hotbar in the middle of a hose run, the hose is deleted and must be restarted.

## Pipe Tool

Category: Tools · Item ID: -144513264

A tool used to create industrial connections between components, allowing for automated item transfer in Rust.

**Functionality**

- The Pipe Tool allows players to connect industrial components only.
- To create a pipe connection, left-click on the input/output (IO) of one component, then left-click again on the input/output (IO) of another component.
- Using multiple Pipe Tools in the hot bar, players can run multiple pipes at the same time and each have their own colour.
- It can be stored in a Tool Cupboard.

**Pipe Mechanics**

- **Pipe Routing**: Pipes cannot pass through player built structures, like walls and floors. They must pass through openings, like doors, hatches, windows, prison cells and chainlink. They cannot pass through rocks or the ground.
- **Pipe Anchors**
  - A single pipe can be attached or anchored up to 16 times before it needs to be connected to another component.
  - Holding Head Look(Left Alt) allows placement of anchor points on deployed entities like boxes or chairs.
- **Pipe Length**: Approximately 30 meters (10 building foundations) before needing to be reconnected to a component.
- **Color Coding**: Players can cycle through different pipe colors by holding Reload(R) before placing a pipe. After a pipe is placed, you can recolor it by selecting the color and tapping Reload(R) on an IO connection.
- **Removing Pipes**: To remove a pipe, look at the IO connection and tap Right-Click once to pick up the pipe. Holding Right-Click will delete the entire pipe.
- **Undoing Placement**: If a mistake is made, tap Right-Click and it will undo the last placement or anchor point.
- **Pipe Snapping**: Hold Sprint (Left Shift) to snap pipes at 90 degree angles.
- **IO Port Snapping**: By default, the pipe will want to snap to IO ports. Hold Head Look(Left Alt) to stop the snap when placing pipes near IO ports.
- Pipes break if the surface they are attached to is destroyed. Sometimes pipes have been known to break when altering the surface it is attached to (e.g., upgrading a wall).

**Notes**

- Does not work on electrical or water connections.
- The Pipe Tool is not consumed on use, meaning it can be used indefinitely once crafted.
- Wear Diving Fins to get cleaner and straighter pipe placement. They force the player to move slower, allowing for better accuracy when strafing left and right.
- To increase or decrease the range of the auto snap when getting close to an IO connection, in the F1 console, change client.lookatradius from 0.2 to 0.05. This lets anchor points be placed closer to IO connections.
- Once players have started running a pipe, it is possible to switch to another hotbar slot (to place an industrial component or ladder, for example) and switch back to the Pipe Tool without losing the progress on the pipe that was being run. However, if the Pipe Tool is removed from the hotbar in the middle of a pipe run, the pipe is deleted and must be restarted.

## Hammer

Category: Tools · Item ID: 200773292

A tool used to repair, upgrade, and pick up deployable items and building structures in Rust. Essential for base maintenance and modifications.

**Functionality**

- The Hammer allows players to repair damaged structures and deployables using the required materials from their inventory.
- It can be used to upgrade building pieces to stronger materials if the player has the necessary resources. Hold Right-Click to bring up the radial menu when looking at a building surface.
- To pick up components, with TC authorization and a hammer in hand, look at the component then press and hold Use(E).
- Can be stored in a Tool Cupboard.

**Hammer Mechanics**

- **Repairing**: Left-click on a damaged structure or deployable to repair it using available materials.
- **Upgrading**: Hold Right-click to open the upgrade menu and select the desired building tier (Wood, Stone, Metal, or Armored).
  - In the same menu, if the player owns building skins, they can use E or Q to select a skin.
- **Picking Up Items**
  - To pick up components, gain tool cupboard authorization and with a hammer in hand, look at the component then press and hold Use(E).
  - All components can be picked up except for the Windmill.
  - Most components take no damage when picked up. However, the following items do take damage when picked up: Laser Light, Sound Light, Connected Speaker, Snow Machine, Fogger-3000, Spooky Speaker, Strobe Light, Fridge, Auto Turret, SAM Site, Small Generator, and Batteries.
  - Be cautious when holding the hammer, as accidental pickups can and will happen.

**Notes**

- Essential for base building, upkeep, repairing and modifications.
- When upgrading building blocks, all existing attachments (like doors and locks) remain intact.

## Garry’s Mod Tool Gun

Category: Tools · Item ID: 1803831286

A tool similar to the Hammer but with extended range, used for repairing, upgrading, and picking up deployable items and building structures in Rust.

**Functionality**

- Requires owning and playing for 30 minutes before use.
- Functions identically to the Hammer, allowing players to repair, upgrade, and pick up deployables and structures.
- Features an extended range of up to 2 meters, making it easier to interact with structures from a distance.
- Displays the name of the item it is pointed at on the small LCD screen.
- Can be stored in a Tool Cupboard.

**Tool Gun Mechanics**

- **Repairing**: Left-click on a damaged structure or deployable to repair it using available materials.
- **Upgrading**: Hold Right-click to open the upgrade menu and select the desired building tier (Wood, Stone, Metal, or Armored).
- **Picking Up Items**
  - To pick up components, with TC authorization and the Tool Gun in hand, look at the component then press and hold Use(E).
  - All components can be picked up except for the Windmill.
  - Most components take no damage when picked up. However, the following items do take damage when picked up: Laser Light, Sound Light, Connected Speaker, Snow Machine, Fogger-3000, Spooky Speaker, Strobe Light, Fridge, Auto Turret, SAM Site, Small Generator, and Batteries.
  - Be cautious when holding the gun, as accidental pickups can and will happen.

**Notes**

- Works exactly like the Hammer but with a slightly longer range.
- When upgrading structures, all existing attachments (like doors and locks) remain intact.
- The F1 console command "toolgun.classiceffects true" or "toolgun.classiceffects false" will change the color of the beam. False is the default orange color but True is blue like it is in Gmod.

## Spray Can

Category: Tools · Item ID: -596876839

A tool used to change the appearance of certain deployable items and components.

**Functionality**

- Anyone can craft and use the Spray Can.
- Allows players to reskin Industrial Lights, Reactive Targets, Fridges, and other skinable deployables.
- Allows players to spray tags or free draw with different colors.
- Comes with 1 default tag and the ability to reskin items.
- Players need to purchase the Graffiti DLC to unlock 8 additional tags and the ability to free spray.
- Can be stored in a Tool Cupboard.

**Spray Can Mechanics**

- **Skinning Items**
  - Aim at a compatible item.
  - Right-click to open the skin selection window.
  - Select a skin by left-clicking it to apply.
- **Spray Tagging Mechanics**
  - Hold Reload(R) to access the radial menu to select a tag or Free Spray.
  - There are 9 tags to choose from.
  - 25 tags can be sprayed before the first one is removed.
  - 1 Spray Can will tag 40 times before it breaks.
  - Free Sprays have a max length of roughly 150 meters or 50 square foundations before the start of the spray starts to disappear.
  - There are 5 colors to choose from.
  - Paint can be removed by holding a Water Gun, looking at the spray paint and pressing Use(E) to wash it away. Spraying or splashing water from other containers will also remove the paint.

**Notes**

- Consumes durability with each spray.
- Cannot be repaired even though it is consumed.
- Cannot be used on electrical wiring, hoses, or pipes.
- Useful for customizing base aesthetics and distinguishing different areas.

## Cable Tunnel

Category: Distribution · Item ID: 1835946060

Allows wires to pass through walls.

**Functionality**

- The Cable Tunnel is an admin-spawned item and was designed to allow wires to pass through walls when the idea existed to prevent direct wire placement through building blocks. This is clearly not the case today so this component is no longer used.
- When placed, the player-facing side provides four inputs, while the opposite side of the wall provides four matching outputs.
- The Cable Tunnel has no hit points, meaning it cannot be destroyed.
- Supports up to four independent connections, each with a matching input/output pair.

**Power Mechanics**

- **Power Connections**
  - **Inputs**: Tunnel 1 In, Tunnel 2 In, Tunnel 3 In, Tunnel 4 In
  - **Outputs**: Tunnel 1 Out, Tunnel 2 Out, Tunnel 3 Out, Tunnel 4 Out
- **Active Usage**: 1 per Input
- **Power Consumption**: 1rW per Input
- **Power Output**: Input minus 1

**Placement Considerations**

- Can be placed on all building blocks.
- Cannot be rotated.
- Once placed, it cannot be picked up with a Hammer, making its placement permanent.
- It does not support component snapping.

## Timed Explosive Charge

Category: Radio Frequency (RF) · Item ID: 1248356124

A high-explosive charge designed for destroying walls, doors, and deployables.

**Functionality**

- The Timed Explosive Charge (C4) is a sticky explosive that attaches to walls, doors, deployables, and vehicles.
- **Explosion Control Modes**
  - **Delay Mode**: Throw the charge with Left Click. The red light will turn on, and it will beep for 10 seconds before exploding.
  - **RF Mode**: Enable RF in your inventory, set a frequency, and throw the charge with Left Click. The green light will turn on, and after 10 seconds the charge will remain armed until an RF Broadcaster or RF Transmitter sends a signal to detonate.
- Anyone can pick it up after the beeping stops by looking at it and holding Use (E).
- Does not disappear on server restarts.

**Damage Mechanics**

- **Damage Output**: 550
- **Explosion Radius**: 4 meters
- Does not deal splash damage to other walls but will kill a player standing to close.
- **Building Damage**
  - **Metal Doors**: Require 1 C4.
  - **Armored Doors**: Require 3 C4.
  - **Stone Walls**: Require 2 C4.
  - **Metal Walls**: Require 4 C4.
  - **Armored Walls**: Require 8 C4.

**Placement Considerations**

- Can only be placed on surfaces, not thrown like grenades.
- Decays after 24 hours when outside the TC range of the person who threw it.
- RF Broadcasters and Transmitters take 0.5 damage when changing frequencies due to the introduction of RF Mode.

## Drone

Category: Utilities · Item ID: 1588492232

A remote-controlled drone.

**Functionality**

- Remotely controlled using a Computer Station.
- Capable of free flight within a limited range (Approximately 600 meters or 4 grid squares).
- Easily damaged from impacts.
- Loses control and falls to the ground if the player disconnects mid-flight.
- Contains 1 inventory slot to transport or drop items.
- Can ping positions for team members.

**Operation & Control**

- **To assign an ID**
  - Deploy the Drone on the ground.
  - Look at it, press and hold Use (E) to set an ID (31-character limit).
  - Hold Use (E) to pick up the Drone.
- **To control the Drone**
  - Mount a Computer Station.
  - Add the Drone’s ID in the bottom left field.
  - Select the Drone from the list and start flying.
    - **Ping**: Click the middle mouse wheel to place an attack point for team members to see.
- **Flight Controls**
  - W, A, S, D: Move forward, left, back, and right.
  - **Mouse**: Look around.
  - **Shift**: Ascend.
  - **Ctrl**: Descend.
- **Inventory Control**
  - Press and hold Use(E) while looking at the Drone to access the inventory.
  - Primary Attack (Left Click) drops 1 item at a time from the inventory.
- Remote Control via Rust+:
  - Add the Drone’s ID to the Rust+ app.
  - The player must disconnect from the server before remote access is allowed.

**Power Mechanics**

- **Power Consumption**: None (requires zero electricity)

**Placement Considerations**

- Can be placed on the ground, flat, or angled building blocks.
- Can be detected by Pressure Pads and Lasers.
- Can be rotated before placement using Reload (R).

**Notes**

- Displays health when looked at with a Hammer.

## Mobile Phone

Category: Voice Props Pack DLC · Item ID: -20045316

A mobile phone that lets you take and place calls from anywhere.

**Functionality**

- Functions as a mobile communication device players can carry in their inventory.
- To open the phone dialer and contacts list, select the phone in your hotbar and Attack(Left-Click).
- Can be used to place or receive voice calls from anywhere on the map.
- When receiving a call, the phone rings and vibrates.
- Mute the ringer by selecting the phone in inventory and clicking "Silent ON".
- Each phone is automatically assigned a number.
- Phones can be renamed by the player. Names appear in the Directory.
- Maximum name length is 30 characters.
- Use the Directory to look up phone names and numbers, including monument phones and other players' phones.
- Add phones to the contacts list using their phone number or name.
- Calls are limited to 2 minutes by default unless changed by the server owner.
  - Server owners can use the command telephonemanager.maxcalllength X to adjust call duration.

**Power Mechanics**

- **Power Consumption**: None
- **Power Connections**: None

**Placement Considerations**

- It is not a deployable. It is a handheld item like guns or tools.
- Does not require electricity.
- Portable and usable on the move.

## Volcano Fireworks

Category: Fireworks · Item ID: Red: -454370658 Violet: -1538109120 White: 261913429

The Volcano Firework is a ground-based display that erupts in a colorful fountain of colorful sparks.

**Functionality**

- Emits a sustained vertical spray of colored sparks.
- Ideal for atmospheric effects or indoor firework shows.
- Does not shoot into the sky like other fireworks — it remains ground-bound.
- No shrapnel or explosion radius, it's purely visual.
- Makes a hissing/sizzling sound while active.
- **Available in three colors**: Red, Violet, and White.
- Foundations and floors provide 1 launch direction: straight up.
- Ramps provide 2 launch directions at different angles.

**Firework Timing**

- Has a startup time of 5 seconds before it starts erupting. Erupts for 35 seconds. Total active time is 40 seconds.

**Ignition Sources**

- Can be ignited with an Igniter, Torch, Flamethrower, or Fire Arrow.
- Compatible with Rustricity for automation and synchronized shows.
- Consider placing near an Igniter controlled by a Timer or Button for event sequences.

**Placement Considerations**

- Can be placed on flat ground, building blocks, and tugboats.
- Cannot be rotated after placement.
- Cannot be picked up once the fuse has started sparkling.
- The shower of sparks will come up through floors if the firework is placed underneath.

## Roman Candle

Category: Fireworks · Item ID: Blue: -515830359 Green: -1306288356 Red: -1486461488 Violet: -99886070

The Roman Candle Firework is a small, repeating firework that launches a sequence of colored balls into the sky. It provides a fast-paced, colorful display ideal for mid-sized shows or filler effects between larger boomer launches.

**Functionality**

- Launches 12 colorful projectiles into the air with timed intervals.
- **Available in four colors**: Blue, Green, Red, and Violet.
- Provides rapid visual and audio feedback with each shot.
- Designed for use in mid-scale or supplementary firework displays.

**Firework Timing**

- There is a 5 second start up time before it starts launching flares. There are 3 seconds between shots. Each shot takes 2 seconds to reach max height. There are a total of 12 shots. Total active time is 40 seconds.

**Ignition Sources**

- Can be ignited with an Igniter, Torch, Flamethrower, or Fire Arrow.
- Compatible with Rustricity for automation and synchronized shows.
- Consider placing near an Igniter controlled by a Timer or Button for event sequences.

**Placement Considerations**

- Can be placed on flat ground, building floors, foundations, and tugboats.
- Foundations/floors provide 1 launch direction, straight up.
- Ramps offer 3 launch directions at 2 different angles.
- Can shoot through ceilings and will not be blocked by above structures.
- Cannot be rotated after placement.
- Cannot be picked up once the fuse is sparkling.

## Boomer

Category: Fireworks · Item ID: Blue: 1744298439 Green: -656349006 Red: -1553999294 Violet: -280223496 Orange: -7270019

The Boomer Firework launches colorful explosions into the sky, making it one of the most dramatic firework types in Rust. It is best used for outdoor shows and is ideal for creating impressive aerial effects.

**Functionality**

- Launches a series of colorful explosions into the sky.
- **Available in five colors**: Blue, Green, Red, Violet, and Orange.
- Emits explosive sound effects and visual burst patterns.
- Designed for large-scale outdoor displays or coordinated shows.

**Firework Timing**

- There is a 5 second start up time before it starts launching flares. There are 4 seconds between shots. Each shot takes 5 seconds to reach max height. There are a total of 10 shots. Total active time is 47 seconds.

**Ignition Sources**

- Can be ignited with an Igniter, Torch, Flamethrower, or Fire Arrow.
- Compatible with Rustricity for automation and synchronized shows.
- Consider placing near an Igniter controlled by a Timer or Button for event sequences.

**Placement Considerations**

- Can be placed on flat ground, building floors, foundations, and tugboats.
- Foundations/floors provide 1 launch direction, straight up.
- Ramps provide 2 launch directions at different angles.
- Steps provide 6 launch directions. 5 angles plus straight up.
- Cannot be rotated after placement.
- If placed under a ceiling, the firework will detonate against the ceiling instead of launching fully.
- Cannot be picked up once its fuse is sparkling.

## Champagne Boomer

Category: Fireworks · Item ID: 1324203999

The Champagne Boomer Firework is a large mortar-style firework that offers one of the longest and most dramatic displays in Rust. It launches a powerful champagne-colored burst followed by smaller orange starbursts, making it a centerpiece in any coordinated show.

**Functionality**

- Produces 3 large firework shots with champagne colored explosions.
- Offers a grand and spaced-out visual ideal for finales or key moments.
- **Only one color is available**: Champagne (yellow).

**Firework Timing**

- There is a 5 second start up time before it starts launching projectiles. There are 10 seconds between shots. Each shot takes 5 seconds to reach max height. There are a total of 3 shots. Total active time is 35 seconds.

**Ignition Sources**

- Can be ignited with an Igniter, Torch, Flamethrower, or Fire Arrow.
- Compatible with Rustricity for automation and synchronized shows.
- Consider placing near an Igniter controlled by a Timer or Button for event sequences.

**Placement Considerations**

- Can be placed on flat ground, building floors, foundations, and tugboats.
- Foundations/floors provide 1 launch direction, straight up.
- Ramps provide 2 launch directions at different angles.
- Steps provide 6 launch directions. 5 angles plus straight up.
- Cannot be rotated after placement.
- If placed under a ceiling, the firework will detonate against the ceiling instead of launching fully.
- Cannot be picked up once its fuse is sparkling.

## Pattern Boomer

Category: Fireworks · Item ID: -379734527

The Pattern Boomer Firework is a customizable large mortar-style firework that allows players to design their own aerial explosion patterns. It's a visual centerpiece used for creating coordinated and personalized firework displays.

**Functionality**

- Launches 3 large projectiles that explode into a pattern set by the player.
- If no custom pattern is created, a default pattern will be used.
- TC authorization is required to customize firework. Look at the firework and press USE(E) to Open Designer or change the Fuse type between Short, Medium and Long.
- Patterns can use up to 35 dots and one of 8 different colors (white, yellow, orange, red, green, teal, blue, pink).
- Players can save up to 5 patterns and name each for reuse.
- Customization requires Tool Cupboard authorization.
- If the firework is picked up, the saved pattern is lost.

**Firework Timing**

- **Short Fuse**
  - There is a 5 second start up time before it starts launching projectiles. There are 10 seconds between shots. Each shot takes 5 seconds to reach max height. There are a total of 3 shots. Total active time is 35 seconds.
- **Medium Fuse**
  - There is a 5 second start up time before it starts launching projectiles. There are 10 seconds between shots. Each shot takes 7 seconds to reach max height. There are a total of 3 shots. Total active time is 35 seconds.
- **Long Fuse**
  - There is a 5 second start up time before it starts launching projectiles. There are 10 seconds between shots. Each shot takes 10 seconds to reach max height. There are a total of 3 shots. Total active time is 35 seconds.

**Ignition Sources**

- Can be ignited with an Igniter, Torch, Flamethrower, or Fire Arrow.
- Compatible with Rustricity for automation and synchronized shows.
- Consider placing near an Igniter controlled by a Timer or Button for event sequences.

**Placement Considerations**

- Can be placed on flat ground, building floors, foundations, and tugboats.
- Foundations/floors provide 1 launch direction, straight up.
- Ramps provide 2 launch directions at different angles.
- Steps provide 6 launch directions. 5 angles plus straight up.
- Cannot be rotated after placement.
- If placed under a ceiling, the firework will detonate against the ceiling instead of launching fully.
- Cannot be picked up once its fuse is sparkling.
