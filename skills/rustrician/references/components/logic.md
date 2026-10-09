# Components: Logic

Port labels are case-sensitive in exported XML (the build script matches them case-insensitively).
Side = where the port sits on the 64×64 component. Back to the [component index](../components.md).

## Blocker

Type `blocker` · item -690968985

This object prevents passthrough while power is received through its second input.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | bottom |  |
| `Block Passthrough` | in | power | left |  |
| `Power Out` | out | power | top |  |

Simulator: consumption 0 rW · rotatable (0/90/180/270) · can block battery discharge.
Craft: 75 Metal Fragments.

- Can be used to block the output (prevent discharge) of a battery and allow it to charge
- Can be rotated before placing by pressing R in-game, or by pressing R after placing in the simulator

**Functionality** (handbook)

- The Blocker functions as a NOT gate when the ‘Block Passthrough’ input is powered.
- Here is the components truth table

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In, Block Passthrough
  - **Output**: Power Out
- **Power In**: The main power input.
- **Block Passthrough**: A side input that, when powered, prevents power from passing through to the output.
- **Power Consumption**: 0rW
- **Active Usage**: 0
- **Power Output**: Equal to input power unless blocked.

**Placement Considerations** (handbook)

- Can be placed on all building blocks and the ground.
- Can be rotated with Reload (R) before placement.

## Memory Cell

Type `memorycell` · item -746647361

A 1 bit storage component. SET input will set the value to 1 CLEAR input sets the value to 0. Output will provide connected power if value is 1, Inverted output will provide connected power if value is 0. This is also known as a D-Type Flip Flop.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | bottom |  |
| `Set` | in | power | right |  |
| `Reset` | in | power | right |  |
| `Toggle` | in | power | right |  |
| `Power Out Inverted` | out | power | top |  |
| `Power Out` | out | power | top |  |

Simulator: consumption 0 rW · rotatable (0/90/180/270).
Craft: 75 Metal Fragments.

- The only component that allows switched (redirected) output of power
- When Reset is powered, the Set port will toggle Output if powered and Inverted Output if not
- Can be rotated before placing by pressing R in-game, or by pressing R after placing in the simulator

**Functionality** (handbook)

- The Memory Cell functions as a Flip-Flop or a Latch, meaning it stores its power state until explicitly changed by an input. If it constantly receives power, it is a latch. If players only pulse power to it when they need a state change, it acts as a flip-flop.
  - The difference between a latch and flip-flop is the existence of a clock signal.
  - The Memory Cell only changes state when a Set, Reset, or Toggle signal is received, and will change states immediately but only if it is receiving power.
- Input Priority Order (Top to Bottom):
  - Set → Reset → Toggle
  - If power is applied to Set, and then Reset or Toggle, nothing changes and power flows through the right output (Output).
  - If power is applied to Reset, then Toggle, nothing changes and power flows through the left output (Inverted Output).
  - If power is applied to Reset, then Set, power is forced from the Inverted Output to Output.
- **Switching Behavior**
  - When switching from one output to the other, Output always reacts before Inverted Output.
  - If the Memory Cell is in its default state (power coming from Inverted Output) and receives a pulse on Set, the Output will start sending power before Inverted Output stops sending power.
  - If a pulse is then applied to Reset, the Output will stop sending power before the Inverted Output starts sending power.
  - This means that when toggling states, there is a brief moment where both outputs will be active or inactive simultaneously before settling into the final state.
- **Requires Power**
  - The Memory Cell must be powered for its side inputs to change its state.
  - If power is applied to one of the side inputs when the Memory Cell powers up, it will pass power through before changing state.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In, Set, Reset, Toggle
  - **Outputs**: Output(Right), Inverted Output(Left)
- **Power Consumption**: 0rW
- **Active Usage**: 0
- **Power Output**: Equal to input power
- **Default Output**: When powered on, the Memory Cell's default output is the Inverted Output.
- **Set Input**: Sends power through Output.
- **Reset Input**: Sends power through Inverted Output.
- **Toggle Input**: Flips the current output state between Output and Inverted Output.
  - **Toggle BUG/FEATURE**: This feature is used by applying constant power to the Toggle input. Every time the circuit is updated, the Memory Cell will switch outputs. Updates include power fluctuations from wind or solar power and the addition or removal of components from a connected circuit. To avoid this causing issues, pulse power to the Toggle input rather than applying constant power. This is the key mechanic for Component Destruction Detection.
  - **Short Circuit**: Currently the memory cell short circuits when it loops back into itself if there are less than 8 components.

**Placement Considerations** (handbook)

- Can be placed on all building blocks and the ground.
- Can be rotated with Reload (R) before placement.

## Timer

Type `timer` · item 665332906

A Timer switch, will pass power through for duration.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | bottom |  |
| `Toggle On` | in | power | right |  |
| `Power Out` | out | power | top |  |

Properties (`props` in a spec):
- `Duration` — int, default `10`. Enter the duration amount in seconds.
- `Show Countdown` — bool, default `true` *(simulator-only setting)*. Enable to display the time remaining in seconds.

Simulator: consumption 0 rW.
Craft: 75 Metal Fragments.

- Defaults to 30 seconds and has a minimum of 0.25 seconds
- Can be used as a push switch which auto-resets (with a 1-second timer)

**Functionality** (handbook)

- The Timer allows power to pass through for a configurable duration before automatically shutting off.
- **Activation Methods**
  - Can be manually activated by a player pressing Use (E).
  - Can be activated remotely by applying power to the Toggle On input.
- **Time Configuration**
  - To adjust the duration, look at the Timer and hold Use (E) to bring up the configuration menu.
  - **Default duration**: 10 seconds
  - **Minimum duration**: 0.25 seconds (may be too fast on some servers)
  - **Maximum tested duration**: At least 2 weeks of real time have been tested
  - Only Tool Cupboard (TC) authorized players can adjust the timer duration.
  - It does not need to be powered to set the duration.
- **Triggering Condition**
  - Power must reach Electric Input before the Toggle On input for the Timer to activate.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Electric Input, Toggle On
  - **Output**: Power Out
- **Power Consumption**: 0rW
- **Active Usage**: 0
- **Power Output**: Equal to input power for the configured duration

**Placement Considerations** (handbook)

- Can only be placed on vertical building blocks.
- Cannot be rotated.

## RAND Switch

Type `switch_rand` · item 492357192

This switch will allow passthrough based on a random number. Each time the 'Set' input receives power it will roll true or false to allow passthrough.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | bottom |  |
| `Set` | in | power | right |  |
| `Reset` | in | power | right |  |
| `Power Out` | out | power | top |  |

Simulator: consumption 0 rW · rotatable (0/90/180/270).
Craft: 75 Metal Fragments.

- When Set is powered, the component has a 50% chance to output power
- Useful for circuits requiring randomization
- Can be rotated before placing by pressing R in-game, or by pressing R after placing in the simulator

**Functionality** (handbook)

- This component is required when designing circuits that require randomness.
- **Probability Adjustments**
  - On its own, the RAND Switch offers a 50% chance (1/2 probability).
  - When combined with multiple RAND Switches and logic gates, probabilities can be adjusted to 1/3, 1/4, or beyond.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In, Set, Reset
  - **Output**: Power Out
- **Power Consumption**: 0rW
- **Active Usage**: 0
- **Power Output**: Equal to input power
- When first placed, the RAND Switch's default state is off, meaning it does not send power through.
- **Set Input**: When power is applied, there is a 50% chance the switch will change states.
  - If the switch is on, it has a 50% chance to turn off.
  - If the switch is off, it has a 50% chance to turn on.
- **Reset Input**: When power is applied, it forces the switch off.

**Placement Considerations** (handbook)

- Can be placed on all building blocks and the ground.
- Can be rotated with Reload (R).

## OR Switch

Type `switch_or` · item -1286302544

A logic gate that allows electrical passthrough if EITHER input receives power, passthrough amount is the greater of either power source.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In 1` | in | power | bottom |  |
| `Power In 2` | in | power | bottom |  |
| `Power Out` | out | power | top | re-consumable |

Simulator: consumption 0 rW.
Craft: 100 Metal Fragments.

- A component that accepts one or two powered inputs and outputs the greater power
- A minimum requirement of 9 components is required to loop-back power

**Functionality** (handbook)

- The OR Switch passes power through from either Input A or Input B, but only from the input with the higher power level.
- If both inputs have equal power, the switch prioritizes Input A over Input B.
- The inactive input is completely blocked, preventing unnecessary Active Usage on a connected battery.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Input A, Input B
  - **Output**: Power Out
- **Power Consumption**: 0rW
- **Active Usage**: 0
- **Power Output**: Equal to the higher power input

**Placement Considerations** (handbook)

- Can only be placed on vertical building blocks.
- Cannot be rotated.

## AND Switch

Type `switch_and` · item 1171735914

A logic gate that allows electrical passthrough if BOTH inputs receives power, passthrough amount is the greater of either power source.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In 1` | in | power | bottom |  |
| `Power In 2` | in | power | bottom |  |
| `Power Out` | out | power | top | re-consumable |

Simulator: consumption 0 rW.
Craft: 100 Metal Fragments.

- A component that requires two powered inputs and outputs the greater power

**Functionality** (handbook)

- The AND Switch requires both Input A and Input B to have power in order to pass power through.
- Only the input with the higher power level will be passed through. It is only through this input that power is consumed. Therefore it is through this input that Active Usage can be applied to a battery.
- If both inputs have equal power, the switch prioritizes Input A over Input B.
- Here is the truth table for the AND Switch.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Input A, Input B
  - **Output**: Power Out
- **Power Consumption**: 0rW
- **Active Usage**: 0
- **Power Output**: Equal to the higher power input

**Placement Considerations** (handbook)

- Can only be placed on vertical building blocks.
- Cannot be rotated.

## XOR Switch

Type `switch_xor` · item 1293102274

An exclusive-or logic gate that allows electrical passthrough if ONLY ONE input receives power, passthrough amount is whichever single input is active. if BOTH inputs receive power, passthrough will be zero.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In 1` | in | power | bottom |  |
| `Power In 2` | in | power | bottom |  |
| `Power Out` | out | power | top |  |

Simulator: consumption 0 rW.
Craft: 100 Metal Fragments.

- A component that accepts one or two powered inputs and will not output power while both inputs are powered
- A minimum requirement of 9 components is required to loop-back power

**Functionality** (handbook)

- The XOR Switch allows power to pass through only when one input is powered at a time.
- If both Input A and Input B receive power simultaneously, the switch will block power from passing through entirely.
- This is the truth table for the XOR Switch.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Input A, Input B
  - **Output**: Power Out
- **Power Consumption**: 0rW
- **Active Usage**: 0
- **Power Output**: Equal to the powered input

**Placement Considerations** (handbook)

- Can only be placed on vertical building blocks.
- Cannot be rotated.

## Counter

Type `counter` · item -216999575

A basic cathode ray tube screen combined with an incremental counter. Can display power received, or can count upwards and allow passthrough when a target is reached.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | bottom |  |
| `Increment Counter` | in | power | right |  |
| `Decrement Counter` | in | power | right |  |
| `Clear Counter` | in | power | right |  |
| `Passthrough` | out | power | top |  |

Properties (`props` in a spec):
- `Target` — int, default `10`. Enter the target value amount.
- `Reset` — int, default `0`. Enter the reset value amount.
- `Value` — int, default `0` *(simulator-only setting)*. Enter the value amount.
- `Show Passthrough` — bool, default `false`. Enable to display the passthrough amount.

Simulator: consumption 0 rW.
Craft: 75 Metal Fragments.

- Has a minimum value of 0 and a maximum value of 999
- Can also be used to display the passthrough amount

**Functionality** (handbook)

- The Counter tracks and stores a numerical value based on received power pulses.
- **Configuration**
  - To configure the Counter, use a Wire Tool, look at it, and hold Use (E).
  - **Set Target**: Allows programming a target number between 1 and 999. When the Counter reaches this number, power will pass through.
  - **Show Passthrough**: Displays the incoming power amount instead of the stored count.
- Holding a Hammer while looking at the Counter will display its health.
- Auto-repairs over time.
- **Counting Behavior**
  - **Increment Counter**: When powered, increases the stored value by 1.
  - **Decrement Counter**: When powered, decreases the stored value by 1.
  - **Clear Counter**: When powered, resets the stored value to 0.
- The Counter does not need power to increment, decrement, or reset.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In, Increment Counter, Decrement Counter, Clear Counter
  - **Output**: Passthrough
- **Power Consumption**: 0rW
- **Active Usage**: 0
- **Power Output**: Equal to input power

**Destruction Feature** (handbook)

- When a Counter is placed on the floor or ground, on their thin side, they self-destruct under certain conditions.
- **Yellow label**
- Danger
- High voltage
- **Orange label**
- WARNING
- DO NOT USE THIS PRODUCT IF YOU ARE SIMPLE. USE BY STUPID PERSONS MAY RESULT IN INJURY. IMPROPER USE MAY RESULT IN PAINFUL INJURY AND RIDICULOUS LAWSUITS, WHICH MAY LEAD TO RIDICULE AND CONTEMPT.
- Counters placed on their thin sides will disappear when nearby deployables (e.g., furnaces, sleeping bags) are removed within a 2-meter radius.
- Counters placed on their thin sides will disappear when a building structure is built or destroyed within a 3-meter radius.

**Placement Considerations** (handbook)

- Can be placed on vertical building blocks.
- Can be placed on horizontal surfaces and the ground using its thin side.
- Can be rotated with Reload (R).
- Certain items can be placed on top of a Counter, including: Lanterns, Jack-o-Lanterns, Carvable Pumpkins, Barricades, Pookie Bear, Twitch Trophy, Eggs, and Small Candle.
  - Multiple Counters can be combined to create a larger surface, allowing placement of larger items like Small Batteries.
