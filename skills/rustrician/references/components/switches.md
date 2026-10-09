# Components: Switches

Port labels are case-sensitive in exported XML (the build script matches them case-insensitively).
Side = where the port sits on the 64×64 component. Back to the [component index](../components.md).

## Switch

Type `switch` · item 1951603367

A simple electric switch.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | bottom |  |
| `Switch On` | in | power | right |  |
| `Switch Off` | in | power | right |  |
| `Power Out` | out | power | top |  |

Simulator: consumption 0 rW · can block battery discharge.
Craft: 100 Metal Fragments.

- A simple toggle switch; use the Timer for a push-button style switch
- Can be used to block the output of a battery

**Functionality** (handbook)

- The Switch allows players to control power flow manually by pressing Use (E) while looking at it.
- Anyone can operate the Switch, it does not require TC authorization.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Electric Input, Switch On, Switch Off
  - **Outputs**: Power Out
- **Power Consumption**: 0rW
- **Active Usage**: 0
- **Power Output**: Equal to input power when switched ON.
- **Power Control Inputs**
  - Power applied to "Switch On" will turn the Switch ON.
  - Power applied to "Switch Off" will turn the Switch OFF.
- **No Input Priority**
  - If power is applied to both Switch On and Switch Off, the last activated input determines the Switch's state.
  - **Example**: If "Switch On" is powered, and later "Switch Off" receives power, the switch will turn OFF, even if "Switch On" still has power.

**Placement Considerations** (handbook)

- Can only be placed on vertical surfaces.
- Can be rotated with Reload (R) before placement.

## Button

Type `button` · item -1778897469

A simple electric button.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Power Out` | out | power | right |  |

Properties (`props` in a spec):
- `Show Countdown` — bool, default `true` *(simulator-only setting)*. Enable to display the time remaining in seconds.

Simulator: consumption 0 rW · root power source · rotatable (0/90/180/270).
Craft: 75 Metal Fragments.

- The button will passthrough power for 1 second when activated with input power connected
- The button can output a pulse of 2 power for 0.25 seconds with no input power connected
- Can be rotated before placing by pressing R in-game, or by pressing R after placing in the simulator

**Functionality** (handbook)

- The Button is a momentary switch that pulses power for 0.25 seconds when pressed.
- It remains visually depressed for 1 second, but the power pulse duration is always 0.25 seconds.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Input**: Electric Input
  - **Output**: Power Out
- **Power Consumption**: 0rW
- **Active Usage**: 0
- **Power Output**
  - Minimum 2rW (if no input power is provided).
  - Equal to input power if greater than 2rW.
- **Minimum Power Output**
  - If pressed with no input power, it generates 2rW for 0.25 seconds.
  - If input power is greater than 2rW, it outputs the same power level as the input.

**Placement Considerations** (handbook)

- Can only be placed on vertical surfaces.
- Can be rotated with Reload (R) before placement.

## Reactive Target

Type `reactivetarget` · item -1736356576

A reactive target that knocks down when hit, can be reset.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Lower` | in | power | bottom |  |
| `Reset` | in | power | bottom |  |
| `Power Out` | out | power | right |  |

Simulator: consumption 1 rW · root power source · accepted by Root Combiner.
Craft: 150 Metal Fragments, 100 Wood, 1 Gears.

- Does not require input power to raise or lower the target
- The target can output a pulse of 1 power while not powered
- Can be combined with the Root Combiner (when pulsing)

**Functionality** (handbook)

- The Reactive Target is an interactive shooting target that can pass power through when shot down and automatically stands back up.
- It has electrical inputs to control the position of the target.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In, Reset, Lower
  - **Outputs**: Power Out
- **Power Consumption**: 1rW
- **Active Usage**: 1
- **Power Output**: Input power minus 1rW
- Reset & Lower Inputs:
  - **Reset**: Stands the target back up when powered.
  - **Lower**: Keeps the target down until reset.
  - No priority between Reset and Lower—whichever input is last powered determines the target's state.
- **Counter Interaction Issue**
  - If the Reactive Target’s output is connected to the side input of a Counter, a ghost pulse may cause it to count twice.
  - **Fix**: Either do not power the target or place one power-consuming component between the target and the Counter’s side input.
- **Free Power Behavior**
  - If no power is supplied and the target is lowered manually, it remains down and does not generate power.
  - If no power is supplied and the target is shot, it generates a 1rW pulse and remains down for 5 seconds before resetting to the upright position.
- **Powered Behavior**
  - If powered and lowered manually, it stays down and continuously outputs the incoming power.
  - If powered and shot, it outputs the incoming power for 5 seconds, then resets to the upright position.
- Attaching the Power Out to the Lower input will prevent the target from standing up until it either receives power to the Reset input or is manually reset.

**Placement Considerations** (handbook)

- Can be placed on floors, foundations, or the ground.
- Can be rotated with Reload (R) before placement.
- Takes damage when hit or shot so it will need to be repaired over time to maintain functionality.
- Health is displayed when looking at the target.
- Can be reskinned using the Spray Can tool.
- Can be connected to Root Combiners.
