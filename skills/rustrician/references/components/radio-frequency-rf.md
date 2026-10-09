# Components: Radio Frequency (RF)

Port labels are case-sensitive in exported XML (the build script matches them case-insensitively).
Side = where the port sits on the 64×64 component. Back to the [component index](../components.md).

## RF Broadcaster

Type `rf_broadcaster` · item -1044468317

An RF Broadcaster.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |

Properties (`props` in a spec):
- `Frequency` — int, default `55` (min 1). Enter the RF frequency.
- `Show Frequency` — bool, default `true` *(simulator-only setting)*. Enable to display the frequency.

Simulator: consumption 1 rW.
Craft: 150 Metal Fragments.

- The RF signal broadcasted is map-wide (global)

**Functionality** (handbook)

- The RF Broadcaster transmits an RF signal to all RF Receivers and Pagers tuned to the same frequency.
- It continuously sends an RF signal as long as it receives power.
- Look at the Broadcaster and press Use(E) to set its frequency.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In
- **Power Consumption**: 1rW
- **Active Usage**: 1
- **Power Output**: None (wireless transmission only)

**Placement Considerations** (handbook)

- Can be placed on most flat surfaces, including:
  - Workbenches, Tool Cupboards, and even a Splitter.
  - Placing RF Broadcasters on top of locked Tool Cupboard will prevent raiders from ever acquiring the RF frequency.
- Can be rotated with Reload (R).
- Does not work with component snapping.
- Looking at the broadcaster will show its health.
- Auto-repairs over time with resources from the Tool Cupboard.

## RF Receiver

Type `rf_receiver` · item 888415708

An RF Receiver.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Power Out` | out | power | right |  |

Properties (`props` in a spec):
- `Frequency` — int, default `55` (min 1). Enter the RF frequency.
- `Show Frequency` — bool, default `true` *(simulator-only setting)*. Enable to display the frequency.

Simulator: consumption 1 rW · can block battery discharge.
Craft: 150 Metal Fragments.

- The RF signal received is map-wide (global)
- Can be used to block the output of a battery
- Small Oil Rig Frequency: 4765
- Large Oil Rig Frequency: 4768
- Excavator Frequency: 4777

**Functionality** (handbook)

- The RF Receiver listens for an RF signal from an RF Broadcaster or RF Transmitter tuned to the same frequency.
- When it receives a signal, it outputs power and will continue doing so until it stops receiving a signal.
- Look at the Receiver and press Use (E) to set its frequency.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In
  - **Outputs**: Power Out
- **Power Consumption**: 1rW
- **Active Usage**: 1
- **Power Output**: Input power minus 1rW

**Placement Considerations** (handbook)

- Can be placed on most flat surfaces, including:
  - Repair Bench, the top of Large Storage Boxes, the Wall Shelves, and the ground.
- Can be rotated with Reload (R).
- Does not work with component snapping.

**Notes** (handbook)

- Looking at the Receiver will show its health.
- Auto-repairs over time with resources from the Tool Cupboard.

## RF Transmitter

Type `rf_transmitter` · item 596469572

A hand held RF signal broadcaster.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| (no wireable ports) | | | | |

Properties (`props` in a spec):
- `Frequency` — int, default `55` (min 1). Enter the RF frequency.
- `Show Frequency` — bool, default `true` *(simulator-only setting)*. Enable to display the frequency.

Simulator: consumption 0 rW.
Craft: 100 Metal Fragments.

- The RF signal transmitted is map-wide (global)

**Functionality** (handbook)

- The RF Transmitter is a handheld tool that sends an RF signal as long as the button is pressed.
- Used for remote triggering of electrical circuits.
- While triggering the transmitter to broadcast, jumping will stop transmission until the player lands, before starting to transmit again.

**Frequency Adjustment** (handbook)

- **The frequency can be changed in two ways**
  - Select it in your hotbar and hold the right mouse button.
  - Select it in your inventory and press Set Frequency.
- Takes 0.5 damage when changing frequencies.

## RF Pager

Type `rf_pager` · item -566907190

An RF Pager.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| (no wireable ports) | | | | |

Properties (`props` in a spec):
- `Frequency` — int, default `55` (min 1). Enter the RF frequency.
- `Show Frequency` — bool, default `true` *(simulator-only setting)*. Enable to display the frequency.

Simulator: consumption 0 rW.
Craft: 100 Metal Fragments.

- The RF signal received is map-wide (global)
- Small Oil Rig Frequency: 4765
- Large Oil Rig Frequency: 4768
- Excavator Frequency: 4777

**Functionality** (handbook)

- The RF Pager is a handheld item that alerts the player when it receives an RF signal on a matching frequency.
- When activated, the pager will beep and vibrate upon receiving a signal.
- It can be placed in Silent Mode to prevent sound alerts.
- **Volume Control**: The pager's sound volume is controlled only by the Master Volume setting in the game options.

**Usage & Storage** (handbook)

- The Pager can be carried in a player's inventory or stored in a storage container.
