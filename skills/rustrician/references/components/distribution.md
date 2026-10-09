# Components: Distribution

Port labels are case-sensitive in exported XML (the build script matches them case-insensitively).
Side = where the port sits on the 64×64 component. Back to the [component index](../components.md).

## Root Combiner

Type `combiner` · item -458565393

This object combines two root electrical sources into a single signal. Helpful for stringing together low energy batteries or solar panels to produce higher power output. Can be wired in series, can not be used with any non energy producing electrical components.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In 1` | in | power | bottom |  |
| `Power In 2` | in | power | bottom |  |
| `Power Out` | out | power | top |  |

Simulator: consumption 0 rW · accepted by Root Combiner · rotatable (0/90/180/270).
Craft: 75 Metal Fragments.

- Can be combined with other Root Combiners
- Can be rotated before placing by pressing R in-game, or by pressing R after placing in the simulator
- A limit of 15 chained Root Combiners is allowed before reaching Max Depth

**Functionality** (handbook)

- The Root Combiner allows multiple power sources and other components to be merged, increasing the total available power on a single output.
- **Maximum depth limitation**: There is a hard limit of 16 components between a power source and the Root Combiner.
  - When the limit is reached, the error "Short Circuit/Max Depth" will appear.
- Server owners can change the depth limitation with this command - ioentity.backtracking​ 8 - where 8 is the default.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Root Power 1, Root Power 2
  - **Output**: Combined Power Out
- **Power Consumption**: 0rW
- **Active Usage**: 0
- **Power Output**: Equal to the total input power (Root Power 1 + Root Power 2).
- **Power Sources that can be combined**
  - Wind Turbines
  - Large Solar Panels
  - Small Generators
  - Test Generators
- **Other Components that can be connected**
  - Batteries
  - Splitter
  - Reactive Target
  - Pressure Pad
- When batteries are combined using a Root Combiner, it is known as wiring them in series.
- Series wiring increases total Available Power on the line but does not increase battery capacity. This means the same load is applied to all connected batteries.
  - **Example**: If two batteries are connected through a Root Combiner to a circuit requiring 50rW, each battery will show 50 Active Usage, rather than splitting it 25/25.
- **Prevents power looping**: It will not recombine power that has already passed through itself, ensuring no unintended power storage occurs like the old Nih Capacitor.

**Placement Considerations** (handbook)

- Place in protected areas to prevent their destruction by an enemy, as losing them could disable your electrical system.
- Can be placed on all building blocks.
- Can be rotated with Reload (R) before placement.

## Electrical Branch

Type `branch` · item -1448252298

This object allows you to branch power off from a main line by a set amount.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | bottom |  |
| `Branch Out` | out | power | top | updates after other outputs |
| `Power Out` | out | power | top |  |

Properties (`props` in a spec):
- `Branch` — int, default `2` (min 1). Enter the branch amount.
- `Show Branch Amount` — bool, default `true` *(simulator-only setting)*. Enable to display the branch amount.

Simulator: consumption 0 rW · rotatable (0/90/180/270).
Craft: 75 Metal Fragments.

- Adjustable branch (or split) amount with a minimum of 1
- The Branch port is prioritized first when outputting power but is not powered first
- Can be rotated before placing by pressing R in-game, or by pressing R after placing in the simulator

**Functionality** (handbook)

- The Electrical Branch is used to allocate a specific amount of power to one output while passing the remainder through another.
- **Configurable output**: The Branch Out output can be adjusted to a set amount, while the Power Out output delivers whatever remains.
- Configured by pressing Use (E) while looking directly at the Branch.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Input**: Power In
  - **Outputs**: Branch Out, Power Out
- **Power Consumption**: 0rW
- **Active Usage**: 0
- **Power Output**
  - Branch Out = The configured power amount.
  - Power Out = Any remaining power after Branch Out allocation.
- **Minimum setting**: The lowest Branch Out value is 1rW, but it is pre-set to 2rW when placed.
- Power Pass-Through Order: When the branch receives power, it does not send out power right away. Before any power is sent out, it will first reserve power for Branch Out. After power is reserved, it will send power through Power Out first, then the reserved amount through the Branch Out output. Therefore the order of operation is as follows:
- Power In - reserve power - Power Out - Branch Out
- **Battery Interaction**
  - The Branch Out value determines the maximum power that can be consumed and therefore, under most circumstances, the max Active Usage that will register on a battery.
  - Active Usage can be registered through Branch Out and Power Out, but only the power actually consumed will register as Active Usage.
    - **Example**: If Branch Out is set to 15 but is connected to an Auto Turret that only needs 10rW, only 10rW will be consumed and only 10 Active Usage will be registered.
  - The Branch Out output doesn't actually limit Active Usage to its set value. If components past the Branch Out are powered by another source, the full Active Usage of those components will register through the Electrical Branch and back to a battery.
    - **Example**: 1 Electrical Branch is set to 5, connected to a Splitter and to a Root Combiner. The other Electrical Branch is set to 5, connected to a Splitter and to the Root Combiner. There is now 10rW going to the Search Light. Each battery has an Active Usage of 10, not 5 as we might expect.

**Placement Considerations** (handbook)

- Can be placed on all building block surfaces and the ground.
- Can be rotated with Reload (R) before placement.

## Splitter

Type `splitter` · item -563624462

Splits an electrical signal into 3 multiple signals. the amount passed through is equal to the input amount divided by the number of used output slots.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | top |  |
| `Power Out 1` | out | power | bottom | divides input evenly |
| `Power Out 2` | out | power | bottom | divides input evenly |
| `Power Out 3` | out | power | bottom | divides input evenly |

Simulator: consumption 0 rW · accepted by Root Combiner · rotatable (0/90/180/270).
Craft: 100 Metal Fragments.

- Evenly splits the input power to all connected outputs
- Extra power after the split is spread evenly across all connected outputs (left to right)
- Can be rotated before placing by pressing R in-game, or by pressing R after placing in the simulator

**Functionality** (handbook)

- The Splitter divides incoming power evenly between up to three connected outputs.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Input**: Power In
  - **Outputs**: Power Out 1, Power Out 2, Power Out 3
- **Power Consumption**: 0rW
- **Active Usage**: 0
- **Power Output**
  - Each output receives Input Power ÷ Number of Active Outputs.
- **Power distribution order**
  - When the Splitter receives power, it does not pass power through all outputs at the same time.
  - Power is distributed sequentially, starting with Output 1, then Output 2, and finally Output 3. When the Splitter loses power, it loses it in the same order, Output 1, then Output 2, and last is Output 3.
- **Dynamic redistribution**
  - If an output is destroyed or disconnected, the Splitter will automatically redistribute power between the remaining active outputs.
- **Uneven power distribution handling**
  - If the input power cannot be divided evenly, the remaining power is prioritized as follows:
    - Output 1 and Output 2 receive the extra power first.
    - If power still cannot be split evenly, Output 1 gets the remainder.
  - **Example**
    - 15rW input with 3 outputs → Each output gets 5rW.
    - 16rW input with 3 outputs → Output 1 = 6rW, Output 2 = 5rW, Output 3 = 5rW.

**Placement Considerations** (handbook)

- Can only be placed on vertical walls.
- Can be flipped with Reload (R) before placement.
- Outputs can be connected to the inputs of Root Combiners
