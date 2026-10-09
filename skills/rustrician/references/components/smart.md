# Components: Smart

Port labels are case-sensitive in exported XML (the build script matches them case-insensitively).
Side = where the port sits on the 64×64 component. Back to the [component index](../components.md).

## Smart Alarm

Type `smart_alarm` · item -695978112

Sends a notifications to your phone when powered on.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Power Out` | out | power | right |  |

Simulator: consumption 1 rW.
Craft: 3 High Quality Metal, 1 Tech Trash.

- Can be paired with the `<a href="https://rust.facepunch.com/companion" target="_blank">`Rust+ companion app`</a>` for mobile alerts
- Can be paired with the `<a href="https://bot.rustplus.io/" target="_blank">`RustPlusBot`</a>` for team chat alerts
- Has a passthrough power output

**Functionality** (handbook)

- It sends a notification to Rust+ when activated.
- Pairs with Rust+ to receive pre-programmed messages when powered.
- TC authorization required to edit messages.
- Messages can be customized by looking at the alarm with a Wire Tool in hand and pressing Use (E).

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In
  - **Outputs**: Power Out
- **Power Consumption**: 1rW
- **Active Usage**: 1
- **Power Output**: Input power minus 1

**Placement Considerations** (handbook)

- Can only be placed on a flat building block or the ground.
- Can be rotated before placement using Reload (R).
- Does not work with component snapping.

**Notes** (handbook)

- Auto-repairs over time with resources from the Tool Cupboard.
- Displays health when looked at.

## Smart Switch

Type `smart_switch` · item 988652725 · Rust+ smart device

A smart electric switch.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | bottom |  |
| `Switch On` | in | power | right |  |
| `Switch Off` | in | power | right |  |
| `Power Out` | out | power | top |  |

Simulator: consumption 0 rW · can block battery discharge.
Craft: 3 High Quality Metal, 1 Tech Trash.

- Can be paired with the `<a href="https://rust.facepunch.com/companion" target="_blank">`Rust+ companion app`</a>` for mobile control
- Can be paired with the `<a href="https://bot.rustplus.io/" target="_blank">`RustPlusBot`</a>` for team chat control
- Can be used to block the output of a battery

**Functionality** (handbook)

- Operates as a switch with remote Rust+ integration.
- Requires TC authorization to operate in-game.
- Can be toggled manually or remotely via Rust+.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Electric Input, Switch On, Switch Off
  - **Outputs**: Output
- **Power Consumption**: 0rW
- **Active Usage**: 0
- **Power Output**: Equal to input power
- **Behavior**
  - Switch On and Switch Off inputs do not have priority over one another. Whichever input receives power last dictates the state of the switch.
  - Applying power to Switch On will turn the switch on.
  - Applying power to Switch Off will turn the switch off.

**Placement Considerations** (handbook)

- Can only be placed on vertical building blocks.
- Cannot be rotated.
- Pairs with Rust+, allowing remote activation and deactivation from outside the game.

## Storage Monitor

Type `storage_monitor` · item 1149964039 · Rust+ smart device

The Storage Monitor attaches to the Tool Cupboard and Large Storage Box to monitor the container contents. Output sends a pulse when the container is updated.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Power Out` | out | power | top |  |
| `Passthrough` | out | power | right |  |

Simulator: consumption 1 rW.
Craft: 3 High Quality Metal, 1 Tech Trash.

- Can be paired with the `<a href="https://rust.facepunch.com/companion" target="_blank">`Rust+ companion app`</a>` for mobile alerts
- Can be paired with the `<a href="https://bot.rustplus.io/" target="_blank">`RustPlusBot`</a>` for team chat alerts
- When input power is 2 or more, it will output 1 power when the storage container contents are changed

**Functionality** (handbook)

- Tracks inventory changes in connected storage containers.
- Pairs with Rust+ for remote inventory monitoring.
- Triggers a power pulse when any amount of inventory is added, removed, or moved.
- Compatible with Tool Cupboards, Large Boxes, Storage Barrels, and Vending Machines.
- Can be used on tugboats, making it functional for marine bases.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In
  - **Outputs**: Power Out, Passthrough
- **Power Consumption**: 1rW
- **Active Usage**: 1
- **Power Output**: 1rW pulse when triggered
- **Behavior**
  - The monitor does not require power to function as a smart device.
  - Power is only required if players want to utilize the IO connections to trigger electrical circuits.
  - When inventory is added, removed, or moved, the Storage Monitor pulses 1rW for 0.25 seconds from Power Out.
  - This occurs regardless of whether a single item or a full stack is moved.
  - When pulsing power from Power Out, 1 power is removed from Passthrough.

**Placement Considerations** (handbook)

- Must be attached to a supported storage unit to function.
- Can be used on tugboats without power, making it useful for naval bases.
- Pairs with Rust+ for inventory tracking outside the game.
