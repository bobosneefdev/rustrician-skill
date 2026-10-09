# Components: Lights

Port labels are case-sensitive in exported XML (the build script matches them case-insensitively).
Side = where the port sits on the 64×64 component. Back to the [component index](../components.md).

## Flasher Light

Type `flasherlight` · item -939424778

A flashing blue light.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Passthrough` | out | power | right |  |

Simulator: consumption 1 rW · rotatable (0/90/180/270).
Craft: 120 Metal Fragments.

- Has a passthrough power output
- Can be rotated before placing by pressing R in-game, or by pressing R after placing in the simulator

**Functionality** (handbook)

- The Flasher Light emits a blinking blue light in a 3-fast-pulse pattern followed by a pause.
- Used for signaling, alerts, and hazard warnings.
- The light can be seen across 2 grid squares, making it highly visible at night or in dark environments.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In
  - **Outputs**: Passthrough
- **Power Consumption**: 1rW
- **Active Usage**: 1
- **Power Output**: Input power minus 1rW

**Placement Considerations** (handbook)

- Can be placed on all building blocks and the ground.
- Can be rotated with Reload (R).

## Siren Light

Type `sirenlight` · item 762289806

A spinning siren light.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Passthrough` | out | power | right |  |

Simulator: consumption 1 rW · rotatable (0/90/180/270).
Craft: 120 Metal Fragments.

- Has a passthrough power output
- Can be rotated before placing by pressing R in-game, or by pressing R after placing in the simulator

**Functionality** (handbook)

- The Siren Light emits two red lights positioned 180 degrees apart that spin in a clockwise circle.
- Commonly used for alarm systems, hazard indicators, and base security alerts.
- The light is highly visible and can be seen across 2 grid squares.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In
  - **Outputs**: Passthrough
- **Power Consumption**: 1rW
- **Active Usage**: 1
- **Power Output**: Input power minus 1rW

**Placement Considerations** (handbook)

- Can be placed on all building blocks and the ground.
- Can be rotated with Reload (R) before placement.

## Ceiling Light

Type `ceilinglight` · item 1142993169

A ceiling light.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Passthrough` | out | power | right |  |

Simulator: consumption 2 rW.
Craft: 50 Metal Fragments.

- Has a passthrough power output

**Functionality** (handbook)

- The Ceiling Light provides consistent, bright illumination when powered.
- Best used for indoor lighting in bases, compounds, or roleplay settings.
- This is 1 of 2 lights that can be used for growing plants.
- Players that own the Exhibit Decor Pack DLC can select the Ceiling Fluorescent Light to craft instead.
- Can be controlled with switches, sensors, and timers for automation.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In
  - **Outputs**: Passthrough
- **Power Consumption**: 2rW
- **Active Usage**: 2
- **Power Output**: Input power minus 2rW

**Placement Considerations** (handbook)

- Can only be placed on ceilings.
- It cannot be rotated.
- Hanging this at 1.5 floors allows the light to cover more area.
- Looking at the light will show its health.
- The skin of the light cannot be changed with a Spray Can after placing. Players can use a Repair Bench before placing them to change the type of light.

## Simple Light

Type `simplelight` · item -282113991

A simple debugging light.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Passthrough` | out | power | right |  |

Simulator: consumption 1 rW · rotatable (0/90/180/270).

- Has a passthrough power output
- Can only be spawned in
- Can be rotated before placing by pressing R in-game, or by pressing R after placing in the simulator

**Functionality** (handbook)

- Can only be spawned in by admins and people with access to the F1 menu.
- Provides a consistent, static white light when powered.
- Commonly used for hallways, small rooms, or decorative lighting.
- Takes no damage but will be destroyed if the wall it is attached to is destroyed.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In
  - **Outputs**: Passthrough
- **Power Consumption**: 1rW
- **Active Usage**: 1
- **Power Output**: Input power minus 1rW

**Placement Considerations** (handbook)

- Can be placed on all building blocks and the ground.
- Can be rotated with Reload (R).

## Deluxe Christmas Lights

Type `xmas_lightstring` · item -151387974

Colored, Animated, Powered Lights. Requires 5 electricity.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Passthrough` | out | power | right |  |

Simulator: consumption 5 rW.
Craft: 50 Metal Fragments.

- Must be purchased from the Steam Market to obtain the blueprint

**Functionality** (handbook)

- The Deluxe Christmas Lights provide festive lighting with multiple effects.
- **They have five different lighting modes**
  - Steady, Flashing, Chasing, Fade, and Slow Glow.
- If the light bulb strand leaves the rendering distance to the base module, the black wire holding them together will fail to render.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In
  - **Outputs**: Passthrough
- **Power Consumption**: 5rW
- **Active Usage**: 5
- **Power Output**: Input power minus 5rW
- Power consumption remains the same regardless of strand length.

**Wire Mechanics** (handbook)

- **Wire Slack**: To adjust wire slack, hold Sprint(Left Shift) and scroll the mouse wheel. Scrolling down will increase the amount of slack, and scrolling up will decrease slack, with some slack being the default. The amount of slack available is inversely proportionate to the length between anchor points. (A short wire can have lots of slack and a long wire will have barely any.) The amount of slack is not reset after use.
- **Wire Anchors**: A single strand of lights can be attached or anchored an unlimited number of times.

**Placement Considerations** (handbook)

- Left-click to attach the base module to a building block.
  - Left click to attach the strand to surfaces. Right-click to undo placement. Select a different hotbar slot to end placement.
    - Once placement has ended, there is no way to continue the strand.
- Spanning a single square foundation will use 8ft of lights but foundations are typically 3 meters or 9.8ft.
- Can be crafted in stacks of 1,500ft, but when moved into an inventory, stacks are limited to 150ft.
- Can be placed on all building blocks and the ground. Strands can be run underwater.
- Looking at the light's base unit will show their health.

## Search Light

Type `searchlight` · item 2087678962

A Large, wide beam, aimable light source.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Passthrough` | out | power | right |  |

Simulator: consumption 10 rW.
Craft: 200 Metal Fragments, 500 Wood.

- Requires 10 power to operate

**Functionality** (handbook)

- The Search Light emits a powerful directional beam when given power, that can be manually rotated by a player.
- Used for scouting, security, and illuminating large areas.
- Use the light by looking at it and pressing Use (E). Requires TC authorization to manually operate.
  - Stop using the light by walking away or looking at it and selecting Stop Using.
- Has 360-degree rotation, allowing full coverage of an area.
- Maximum beam distance is 96 meters (32 foundations).
- The light will shine through walls if placed close enough to them.
- Can be controlled through ceilings and walls when positioned correctly.

**Anti-Flickering Behaviour:** (handbook)

- When receiving power, the light gradually increases in intensity. It takes about 5 seconds to reach max brightness.
- When losing power, the light gradually decreases in intensity. It takes about 5 seconds to fully turn off.
- When pulsing power to the light every 1 second or faster, the light will take 2.5 damage every pulse until it is destroyed.
- If players want to pulse these lights, they should pulse power on for 5 seconds then off for 5 seconds.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In
  - **Outputs**: Passthrough
- **Power Consumption**: 10rW
- **Active Usage**: 10
- **Power Output**: Input power minus 10rW

**Placement Considerations** (handbook)

- Can only be placed on foundations and floors.
- Can be rotated before placing with Reload (R).

**Notes** (handbook)

- Holding a hammer while looking at the light will show its health.
- It will auto-repair over time with resources from the Tool Cupboard.

## Small Neon Sign

Type `neonsign_small` · item 1305578813

A small neon sign!

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Passthrough` | out | power | right |  |

Simulator: consumption 2 rW.
Craft: 150 Metal Fragments.

- Requires 2 power to operate the sign

**Functionality** (handbook)

- The Small Neon Sign provides illuminated signage for bases, shops, and other structures.
- Anyone can paint the sign unless it is locked.
- Paint the sign by looking at it and pressing Use(E).
- With the help of plugins, it can display custom images or text with a maximum resolution of 128x128 pixels.
- Painted signs keep their edits when picked up and moved somewhere else.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Electric Input
  - **Outputs**: Passthrough
- **Power Consumption**: 2rW
- **Active Usage**: 2
- **Power Output**: Input power minus 2rW

**Placement Considerations** (handbook)

- Can be placed on vertical and angled building blocks.
- Can be placed underwater.
- It cannot be rotated.

**Notes** (handbook)

- Looking at the sign will show its health.

## Medium Neon Sign

Type `neonsign_medium` · item -1423304443

A medium neon sign!

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Passthrough` | out | power | right |  |

Simulator: consumption 4 rW.
Craft: 200 Metal Fragments.

- Requires 4 power to operate the sign

**Functionality** (handbook)

- The Medium Neon Sign provides a larger illuminated display compared to the Small Neon Sign.
- Anyone can paint the sign unless it is locked.
- Paint the sign by looking at it and pressing Use(E).
- With the help of plugins, it can display custom images or text with a maximum resolution of 256x128 pixels.
- Painted signs keep their customizations when powered off or picked up and moved.
- Commonly used for shops, base identification, and decorative lighting.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Electric Input
  - **Outputs**: Passthrough
- **Power Consumption**: 4rW
- **Active Usage**: 4
- **Power Output**: Input power minus 4rW

**Placement Considerations** (handbook)

- Can be placed on vertical and angled building blocks.
- Can be placed underwater.
- It cannot be rotated.

**Notes** (handbook)

- Looking at the sign will show its health.

## Medium Animated Neon Sign

Type `neonsign_medium_animated` · item 42535890

An animated medium neon sign!

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Frame 1` | in | power | bottom |  |
| `Frame 2` | in | power | bottom |  |
| `Frame 3` | in | power | bottom |  |
| `Passthrough` | out | power | right |  |

Simulator: consumption 5 rW.
Craft: 2 High Quality Metal, 300 Metal Fragments.

- Requires 5 power to operate the sign

**Functionality** (handbook)

- The Medium Animated Neon Sign provides a larger illuminated display compared to the Small Neon Sign.
- Can store and cycle through three pages of designs, allowing for animated signage.
- Anyone can paint the sign unless it is locked.
- Paint the sign by looking at it and pressing Use(E).
- Press and hold Use(E) to access the three speed options for animation: Slow, Medium, Fast.
- With the help of plugins, it can display custom images or text with a maximum resolution of 256x128 pixels.
- Painted signs keep their customizations when powered off or picked up and moved.
- Commonly used for shops, base identification, and decorative lighting.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In, Frame 1, Frame 2, Frame 3
  - **Outputs**: Passthrough
- **Power Consumption**: 5rW for any input
- **Active Usage**: 5
- **Power Output**: Input power minus 5
- When constant power is applied to Power In, the neon sign will cycle through the frames 1 at a time.
- When constant power is applied to Frame 1, 2 or 3, only that frame will show.
- If there is constant power applied to Power In, and power is applied to one of the frames, the sign will skip to that frame and start cycling from there.

**Placement Considerations** (handbook)

- Can be placed on vertical and angled surfaces.
- Cannot be rotated.
- Can be placed underwater.

**Notes** (handbook)

- Looking at the sign will show its health.

## Large Neon Sign

Type `neonsign_large` · item 866332017

A large neon sign!

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Passthrough` | out | power | right |  |

Simulator: consumption 6 rW.
Craft: 250 Metal Fragments.

- Requires 6 power to operate the sign

**Functionality** (handbook)

- The Medium Neon Sign provides a larger illuminated display compared to the Medium Neon Sign.
- Anyone can paint the sign unless it is locked.
- Paint the sign by looking at it and pressing Use(E).
- With the help of plugins, it can display custom images or text with a maximum resolution of 256x256 pixels.
- Painted signs keep their edits when picked up and moved somewhere else.
- Commonly used for decorative purposes, base identification, or advertisements.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Electric Input
  - **Outputs**: Passthrough
- **Power Consumption**: 6rW
- **Active Usage**: 6
- **Power Output**: Input power minus 6

**Placement Considerations** (handbook)

- Can be placed on vertical and angled surfaces.
- Cannot be rotated after placement.
- Using a low or half wall above a window with bars or glass, you can pull one of these down over the window to cover it. When the sign is painted, you can't see through the front but can through the back acting like a one-way window.
- Can be placed underwater, making it ideal for underwater bases or aesthetic builds.

**Notes** (handbook)

- Looking at the sign displays its health for easy maintenance.

## Large Animated Neon Sign

Type `neonsign_large_animated` · item 1643667218

An animated large neon sign!

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Frame 1` | in | power | bottom |  |
| `Frame 2` | in | power | bottom |  |
| `Frame 3` | in | power | bottom |  |
| `Frame 4` | in | power | bottom |  |
| `Frame 5` | in | power | bottom |  |
| `Passthrough` | out | power | right |  |

Simulator: consumption 7 rW.
Craft: 5 High Quality Metal, 350 Metal Fragments.

- Requires 7 power to operate the sign

**Functionality** (handbook)

- The Large Animated Neon Sign provides a larger illuminated display compared to the Medium Animated Neon Sign.
- Can store and cycle through five(5) pages of designs, allowing for animated signage.
- Anyone can paint the sign unless it is locked.
- Paint the sign by looking at it and pressing Use (E).
- Press and hold Use(E) to access the three speed options for animation: Slow, Medium, Fast.
- With the help of plugins, it can display custom images or text with a maximum resolution of 256x256 pixels.
- Painted signs keep their customizations when powered off or picked up and moved.
- Commonly used for shops, base identification, and decorative lighting.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In, Frame 1, Frame 2, Frame 3, Frame 4, Frame 5
  - **Outputs**: Passthrough
- **Power Consumption**: 7rW for any input
- **Active Usage**: 7
- **Power Output**: Input power minus 7
- When constant power is applied to Power In, the neon sign will cycle through the frames 1 at a time.
- When constant power is applied to Frame 1, 2, 3, 4, or 5, only that frame will show.
- If there is constant power applied to Power In, and power is applied to one of the frames, the sign will skip to that frame and start cycling from there.

**Placement Considerations** (handbook)

- Can be placed on vertical and angled surfaces.
- Cannot be rotated.
- Can be placed underwater.
- Using a low or half wall above a window with bars or glass, you can pull one of these down over the window to cover it. When the sign is painted, you can't see through the front but can through the back acting like a one-way window.

**Notes** (handbook)

- Looking at the sign displays its health.

## Industrial Wall Light

Type `industrial_wall_light` · item 1623701499

A small light source.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | right |  |
| `Passthrough` | out | power | left |  |

Simulator: consumption 1 rW · rotatable (0/90/180/270).
Craft: 30 Metal Fragments.

- Has a passthrough power output
- Can be rotated before placing by pressing R in-game, or by pressing R after placing in the simulator
- Must be purchased from the Rust Item Store to obtain the blueprint

**Functionality** (handbook)

- Provides a consistent white light when powered.
- Casts light in a range of approximately 3 meters, effectively illuminating a room 1 foundation wide and 1 floor tall.
- All 4 Industrial Light colors have been combined into a single item in the crafting menu.
- Players select the color when crafting and can use the Spray Can to change colors after placement.
- Light retains color customization even after being picked up and placed elsewhere.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In
  - **Outputs**: Passthrough
- **Power Consumption**: 1rW
- **Active Usage**: 1
- **Power Output**: Input power minus 1

**Placement Considerations** (handbook)

- Can be placed on all building blocks and the ground.
- Can be rotated with Reload(R).

## Blue Industrial Wall Light

Type `industrial_wall_light_blue` · item 1268178466

A small blue light source.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | right |  |
| `Passthrough` | out | power | left |  |

Simulator: consumption 1 rW · rotatable (0/90/180/270).
Craft: 30 Metal Fragments.

- Has a passthrough power output
- Can be rotated before placing by pressing R in-game, or by pressing R after placing in the simulator
- Must be purchased from the Rust Item Store to obtain the blueprint

**Functionality** (handbook)

- Provides a consistent blue light when powered.
- Casts light in a range of approximately 3 meters, effectively illuminating a room 1 foundation wide and 1 floor tall.
- All 4 Industrial Light colors have been combined into a single item in the crafting menu.
- Players select the color when crafting and can use the Spray Can to change colors after placement.
- Light retains color customization even after being picked up and placed elsewhere.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In
  - **Outputs**: Passthrough
- **Power Consumption**: 1rW
- **Active Usage**: 1
- **Power Output**: Input power minus 1

**Placement Considerations** (handbook)

- Can be placed on all building blocks and the ground.
- Can be rotated with Reload(R).

## Green Industrial Wall Light

Type `industrial_wall_light_green` · item 1268178466

A small green light source.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | right |  |
| `Passthrough` | out | power | left |  |

Simulator: consumption 1 rW · rotatable (0/90/180/270).
Craft: 30 Metal Fragments.

- Has a passthrough power output
- Can be rotated before placing by pressing R in-game, or by pressing R after placing in the simulator
- Must be purchased from the Rust Item Store to obtain the blueprint

**Functionality** (handbook)

- Provides a consistent green light when powered.
- Casts light in a range of approximately 3 meters, effectively illuminating a room 1 foundation wide and 1 floor tall.
- All 4 Industrial Light colors have been combined into a single item in the crafting menu.
- Players select the color when crafting and can use the Spray Can to change colors after placement.
- Light retains color customization even after being picked up and placed elsewhere.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In
  - **Outputs**: Passthrough
- **Power Consumption**: 1rW
- **Active Usage**: 1
- **Power Output**: Input power minus 1

**Placement Considerations** (handbook)

- Can be placed on all building blocks and the ground.
- Can be rotated with Reload(R).

## Red Industrial Wall Light

Type `industrial_wall_light_red` · item -1160621614

A small red light source.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | right |  |
| `Passthrough` | out | power | left |  |

Simulator: consumption 1 rW · rotatable (0/90/180/270).
Craft: 30 Metal Fragments.

- Has a passthrough power output
- Can be rotated before placing by pressing R in-game, or by pressing R after placing in the simulator
- Must be purchased from the Rust Item Store to obtain the blueprint

**Functionality** (handbook)

- Provides a consistent red light when powered.
- Casts light in a range of approximately 3 meters, effectively illuminating a room 1 foundation wide and 1 floor tall.
- All 4 Industrial Light colors have been combined into a single item in the crafting menu.
- Players select the color when crafting and can use the Spray Can to change colors after placement.
- Light retains color customization even after being picked up and placed elsewhere.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In
  - **Outputs**: Passthrough
- **Power Consumption**: 1rW
- **Active Usage**: 1
- **Power Output**: Input power minus 1

**Placement Considerations** (handbook)

- Can be placed on all building blocks and the ground.
- Can be rotated with Reload(R).

## Strobe Light

Type `strobelight` · item 2104517339

A flashing light, 3 speeds. Causes seizures.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Toggle` | in | power | bottom |  |
| `Turn On` | in | power | bottom |  |
| `Turn Off` | in | power | bottom |  |

Simulator: consumption 1 rW.
Craft: 100 Metal Fragments, 2 High Quality Metal.

- Must be purchased from the Rust Item Store to obtain the blueprint

**Functionality** (handbook)

- Emits a pulsing strobe effect with adjustable speeds.
- Can be manually turned on. DOES NOT require power.
- Requires TC authorization to change settings.
- Look at the light and hold Use(E) to select between three strobe frequencies: 10Hz, 20Hz, and 40Hz.
- Best used for base alarms, party lighting, or tactical disorientation.
- Takes damage when active at a rate of 1 HP every 3 minutes and 42 seconds.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Toggle, Turn On, Turn Off
- **Power Consumption**: 1rW per input but none for itself
- **Active Usage**: 0

**Input Behavior** (handbook)

- **Turn On Input**: Receiving power will turn the light on. The light will remain on until another input is used.
- **Toggle Input**: Turns the light on when power is received and off when power is removed.
- **Turn Off Input**: Receiving power will turn the light off.
- The last input to receive power is the input that will dictate the state of the light.
  - **Example**: If Turn on has power or Toggle is powering the light and Turn Off receives power, the light turns off. When Turn Off power is removed, the light will not turn back on automatically.

**Placement Considerations** (handbook)

- Can be placed on flat and some angled surfaces, as well as the ground.
- Can be rotated before placement with Reload (R).
- Can be picked up with a hammer but loses 10 HP when doing so.

**Notes** (handbook)

- Holding a hammer and looking at the light will show its health.
- Auto-repairs over time with resources from the Tool Cupboard.

## Horizontal Weapon Rack

Type `gunrack_horizontal` · item -246672609

Artfully display your arsenal with a handcrafted wall-mounted weapon rack.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Passthrough` | out | power | right |  |

Simulator: consumption 1 rW.
Craft: 120 Metal Fragments, 100 Wood.

- Must be purchased from the Rust Item Store to obtain the blueprint

**Functionality** (handbook)

- Allows weapons and tools to be mounted for display and quick access.
- Provides illumination, lighting up the board and a small area of the floor in front of it.
- Weapons and tools can be attached and removed by holding the item in your hand, looking at the rack, and pressing Use (E).
- Items can be rotated before placement by holding Sprint (Left Shift).
- Supports a 10x10 grid, enabling precise placement of displayed items.
- Can be used on tugboats, making it functional for maritime bases.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In
  - **Outputs**: Passthrough
- **Power Consumption**: 1rW
- **Active Usage**: 1

**Placement Considerations** (handbook)

- Can be placed on walls and roofs.
- Cannot be rotated.
- Does not use snapping mechanics, requiring manual alignment.

**Notes** (handbook)

- Looking at the board displays its health.
- Auto-repairs over time with resources from the Tool Cupboard.

## Tall Weapon Rack

Type `gunrack_tall_horizontal` · item 240752557

Artfully display your arsenal with a handcrafted wall-mounted weapon rack.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Passthrough` | out | power | right |  |

Simulator: consumption 1 rW.
Craft: 175 Metal Fragments, 100 Wood.

- Must be purchased from the Rust Item Store to obtain the blueprint

**Functionality** (handbook)

- Allows weapons and tools to be mounted for display and quick access.
- When powered it provides illumination, lighting up the board and a small area of the floor in front of it.
- Weapons and tools can be attached and removed by holding the item in your hand, looking at the rack, and pressing Use (E).
- Items can be rotated before placement by holding Sprint (Left Shift).
- Supports a 10x15 grid, enabling precise placement of displayed items.
- Can be used on tugboats but deletes the IO connections, making it semi-functional for marine bases.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In
  - **Outputs**: Passthrough
- **Power Consumption**: 1rW
- **Active Usage**: 1

**Placement Considerations** (handbook)

- Can be placed on walls and roofs.
- Cannot be rotated.
- Does not use snapping mechanics, requiring manual alignment.

**Notes** (handbook)

- Looking at the board displays its health.
- Auto-repairs over time with resources from the Tool Cupboard.

## Wide Weapon Rack

Type `gunrack_wide_horizontal` · item -96256997

Artfully display your arsenal with a handcrafted wall-mounted weapon rack.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Passthrough` | out | power | right |  |

Simulator: consumption 1 rW.
Craft: 175 Metal Fragments, 100 Wood.

- Must be purchased from the Rust Item Store to obtain the blueprint

**Functionality** (handbook)

- Allows weapons and tools to be mounted for display and quick access.
- When powered, it provides illumination, lighting up the board and a small area of the floor in front of it.
- Weapons and tools can be attached and removed by holding the item in your hand, looking at the rack, and pressing Use (E).
- Items can be rotated before placement by holding Sprint (Left Shift).
- Supports a 17x10 grid, enabling precise placement of displayed items.
- Can be used on tugboats but deletes the IO connections, making it semi-functional for marine bases.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In
  - **Outputs**: Passthrough
- **Power Consumption**: 1rW
- **Active Usage**: 1

**Placement Considerations** (handbook)

- Can be placed on walls and roofs.
- Cannot be rotated.
- Does not use snapping mechanics, requiring manual alignment.

**Notes** (handbook)

- Looking at the board displays its health.
- Auto-repairs over time with resources from the Tool Cupboard.
