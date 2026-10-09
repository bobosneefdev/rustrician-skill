# Components: Defense

Port labels are case-sensitive in exported XML (the build script matches them case-insensitively).
Side = where the port sits on the 64×64 component. Back to the [component index](../components.md).

## SAM Site

Type `samsite` · item -1009359066

A surface to air rocket site.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Invert Mode` | in | power | top |  |
| `Has Target` | out | power | right |  |
| `Low Ammo` | out | power | right |  |
| `No Ammo` | out | power | right |  |
| `Passthrough` | out | power | bottom |  |

Properties (`props` in a spec):
- `Defender Mode` — bool, default `false`. Enable to set Defender Mode as the default.
- `Has Target` — bool, default `true` *(simulator-only setting)*. Enable to output power to Has Target.
- `Low Ammo` — bool, default `true` *(simulator-only setting)*. Enable to output power to Low Ammo.
- `No Ammo` — bool, default `true` *(simulator-only setting)*. Enable to output power to No Ammo.

Simulator: consumption 25 rW.

- Do not place near a Wind Turbine to avoid destruction
- Requires 25 power to operate and 26 power for aux ports to output
- Has 3 auxillary outputs: Has Target, Low Ammo, and No Ammo (each output 1 power)

**Functionality** (handbook)

- Automatically detects and fires at airborne threats, including:
  - MLRS Rockets
  - Minicopters, Scrap Helicopters, Hot Air Balloons, Attack Helicopters and Parachutes.
- Does not differentiate between friend or foe; all aircraft are targeted unless in Defender Mode.
- Defender Mode and Attack Mode can be enabled or disabled by looking at the SAM Site and holding Use (E):
  - **Defender Mode**: the SAM Site will only target incoming MLRS Rockets.
  - **Attack Mode**: the SAM Site will attack all flying modes of transportation.
- Range of 150 meters (1 grid square).
- Best used in clusters to maximize defense against MLRS attacks.
  - **Recommended**: 3 SAM Sites on the side of the base closest to the Abandoned Military Base.
  - Build them as high as the base itself to intercept rockets effectively.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**
  - **Power In**: Needs 25rW here to power the SAM Site.
  - **Invert Mode**: When power is applied, the SAM Site will change to the opposite mode
    - **Example**: If the SAM is in Attack Mode, for as long as power is applied to Invert Mode, the SAM will remain in Defender Mode. When power is removed, the SAM will return to Attack Mode.
  - **Outputs**: Has Target, Low Ammo, No Ammo, Passthrough
- **Power Consumption**: 25rW
- **Active Usage**: 25
- **Power Output**: 1rW
- **Power Passthrough**: Input power minus 25
- **Has Target Output**: Constant 1rW while locked onto a target.
- **Low Ammo Output**: Outputs 1rW when 10 or fewer SAM Ammo remain, stops when depleted.
- **No Ammo Output**: Outputs 1rW constantly when out of ammo.

**Placement Considerations** (handbook)

- Must be placed on floors or foundations.
- Can be rotated before placement using Reload (R).
- Will not target anything below its own height.
- Avoid placement where they can be baited into damaging surrounding structures.

**Notes** (handbook)

- Looking at the SAM Site will show its health.
- Auto-repairs over time with resources from the Tool Cupboard.

## Auto Turret

Type `autoturret` · item -2139580305

The Auto Turret is a fully automatic entry denial device that is used for defense.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Has Target` | out | power | right |  |
| `Low Ammo` | out | power | right |  |
| `No Ammo` | out | power | right |  |

Properties (`props` in a spec):
- `Has Target` — bool, default `true` *(simulator-only setting)*. Enable to output power to Has Target.
- `Low Ammo` — bool, default `true` *(simulator-only setting)*. Enable to output power to Low Ammo.
- `No Ammo` — bool, default `true` *(simulator-only setting)*. Enable to output power to No Ammo.

Simulator: consumption 10 rW.
Craft: 10 High Quality Metal, 1 Targeting Computer, 1 CCTV Camera.

- Requires 10 power to operate and 11 power for aux ports to output
- Has 3 outputs: Has Target, Low Ammo, and No Ammo (each output 1 power)

**Functionality** (handbook)

- Automatically detects and engages enemy players and threats.
- Requires a weapon and ammunition to function.
  - Supports weapons that use Pistol Bullets, 5.56 Ammo, Shotgun Ammo, Nails, Arrows and the Trumpet.
- **Can be placed into two modes**
  - Attack All (Default Mode) – Fires at any unauthorized player in range. This mode is required for remote control.
  - Peacekeeper Mode – Only engages unauthorized players if they display aggression. Disables remote control.
- Has a 180-degree detection arc.
- The turret range is 30 meters or roughly 10 square foundations. Before placing, a bubble will show its area of effect.
- Can be remotely controlled via Computer Station or Rust+ App when an ID is set.
- Looking at the turret will display its health.

**Turret Interference** (handbook)

- Interference restricts how many turrets can be active in an area. This does not limit the number of turrets that can be placed, just the number of ones that are turned on at 1 time.
- Each turret has its own 40 meter, or 13.5 square foundation, radius where it is checking to see how many powered turrets it can see.
- The maximum number of active turrets in a 40-meter radius is 12. The 13th turret will not activate and will display a sparkling animation.
- When a player selects the turret in their hotbar, the icon will display how many active turrets it can see within its 40m range, plus the one in hand. That means this image shows 5 active turrets with the 6th being the one the player is holding.
- This is not an indication of whether or not the turret will experience interference when powered, when the player has placed more than 12 turrets, just not all within the range of the new turret getting placed.
- After an Auto Turret is placed and powered, holding a Wire Tool and looking at it will display the Interference Counter, but it only shows the number of active turrets within this turret’s 40m range. If it experiences interference like the image below and shows a number lower than 12, this means that of the 6 turrets shown to be active, one of the other 5 turrets in range already has its max of 12, within its 40m range.
- Unless the turret’s icon before placing was already showing 13/12, there is not enough information displayed to know if the turret will experience interference.
- The only way to know, will be to go to each of the 5 active turrets and check to see what their Interference Counter is. If any 1 of those 5 turrets have already reached their 12/12 limit, any new turret powered within its range will experience interference, even though the new turret is under its limit.
- When trying to cover a large area with turrets that are always on, it will be important to plan their locations to avoid too many turrets overlapping one another. In the image below, each dot represents an Auto Turret. Each circle is 40 meters in diameter, each circle has 7 turrets inside with 6 on the perimeter for a total of 43 turrets that can be active all the time.
- Keeping no less than 11.6 meters between auto turrets will help prevent issues with interference.
- Use the Wire Tool to check spacing. Attach a wire to any IO connection on one turret and run over to another Auto Turret. It is recommended to stay closer to 12 meters because it is difficult to get exact spacing using this method.
- **Bug/Feature**: When a turret with a maxed out Interference Counter gets power down, and a new turret is installed and powered on, when the original turret attempts to turn back on, it will be disabled and experience interference because it is now forced to exceed the interference limit.

**Operation & Control** (handbook)

- A player must be authorized to open the turret menu. Authorize by looking at a turned off turret and press Use(E). Open the menu by holding Use(E).
- **Turret Menu Options**
  - Open – Access inventory to place a weapon and ammo.
  - Peacekeeper Mode – Enables Peacekeeper Mode (disables remote control).
  - Attack All – Default mode, allows remote control.
  - Rotate – Rotates the turret 180 degrees.
  - Authorize Friend – Add specific players to authorization.
  - Clear Authorization List – Removes all authorized players.
  - Deauthorize – Removes the player selecting the option from authorization.
  - Set ID – Assign an ID for remote control via Computer Station or Rust+ App.
- After giving the turret a name, enter that name into a Computer Station or the Rust+ app and take control. Move the turret around with the mouse and left click to shoot.
- When remotely controlled, anything within the visual range can be shot. The visual range is approximately 63 meters or 21 square foundations.
- Anyone can add the ID to any Computer Station and take control. Make the ID something other players won’t guess. Restrict access to any Computer Station with these IDs to trusted individuals only. IDs are limited to 31 characters.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In
  - **Outputs**: Has Target, Low Ammo, No Ammo
- **Power Consumption**: 10rW (+1rW if outputs are used)
- **Power Output**: 1rW
- **Has Target**: Outputs a constant 1rW while it locks a target and a ghost pulse is generated when it stops targeting. The ghost pulse effects counting up and down on a Counter.
- **Low Ammo**: Outputs 1rW when 50 or fewer rounds remain.
- **No Ammo**: Outputs 1rW constantly when out of ammo.
- When turrets run low on ammo, they will output 1rW from Low Ammo. When they run out of ammo, they will output 1rW from No Ammo, while continuing to output power from Low Ammo. This also applies to Has Target. The turret can output 1rW from all 3 outputs at the same time while only receiving a total of 11rW.
- The turret takes 2.1 seconds to fully turn on before it can lock a target. It takes 2.1 seconds to fully turn off. The turret doesn't need to fully turn off before getting turned back on.

**Placement Considerations** (handbook)

- Must be placed on floors or foundations.
- Can be rotated before placement using Reload (R).
- Try to position turrets where they cannot be baited or drained.
- Turrets can shoot through 20 layers of Chainlink Fence.

## Tesla Coil

Type `teslacoil` · item 1371909803

A Tesla Coil. Shocks nearby players using supplied input power with a damage cap of 25 hp/sec.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |

Properties (`props` in a spec):
- `Health Amount` — float, default `250`. Enter the amount of component health.
- `Show Time Remaining` — bool, default `true` *(simulator-only setting)*. Enable to display the remaining time until decay in seconds.

Simulator: consumption 1 rW · rotatable (0/90/180/270).
Craft: 3 High Quality Metal, 1 Tech Trash.

- Automatically heals itself when under building privilege
- Requires 1 power to operate
- Full health is 250 and decays 2 health per sec of operation until broken
- Damage dealt scales with input power supplied (input power * 1 = damage dealt per sec)
- Damage cap is set at 25 hp/sec
- Can be rotated before placing by pressing R in-game, or by pressing R after placing in the simulator

**Functionality** (handbook)

- Emits electrical arcs to damage nearby players and entities.
- Requires electricity to function.
- Damage scales based on power input.
  - Deals damage at a rate of 1.75 HP/second per Rust watt (rW), up to a maximum of 25rW.
  - **Example**: If powered with 4rW, it deals 7 HP damage per second (4 × 1.75 = 7).
  - If powered with 25rW, it deals 43.75 HP damage per second (25 × 1.75 = 43.75).
    - **Note**: Decimal values are calculated internally by the game, even if not visually reflected on the player’s health bar.
- **Tesla Coils damage in cycles**
  - Emits ¼ of the total input power every 250 ms over four pulses.
  - After four pulses (1 second total), it enters a 250 ms cooldown before repeating.
  - **Example**: 20rW input deals 7 damage per 0.25 seconds, totaling 28 damage per second.
- Tesla Coil damage stacks.
  - 100 Tesla Coils powered with 1rW each can instantly kill a player.
  - 12 Tesla Coils powered with 25rW each will instantly kill a player.
- **Range**: Has a radius of roughly 1 square foundation (3.5 meters).
- Does not discriminate between friendly and enemy players.
- Tesla Coils self-damage at a rate of 2 HP/second, regardless of power input.
- They automatically shut off at 25 HP and will not turn back on until repaired.
- Even when disabled, Tesla Coils will occasionally emit sparks, but will not deal damage.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In
- **Power Consumption**: 1-25rW
- **Active Usage**: 25rW maximum

**Placement Considerations** (handbook)

- Can be placed on all building blocks and the ground.
- Can be rotated before placement using Reload (R).
- Tesla Coils can damage enemies through walls, floors, and roofs using a building trick.
- Tesla Coils will damage enemies through deployables.

**Notes** (handbook)

- Looking at the coil will display its health.
- Auto-repairs over time with resources from the Tool Cupboard.
