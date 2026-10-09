# Components: Batteries

Port labels are case-sensitive in exported XML (the build script matches them case-insensitively).
Side = where the port sits on the 64×64 component. Back to the [component index](../components.md).

## Large Rechargeable Battery

Type `battery_large` · item 553270375

A Large Rechargeable Battery. Must have a minimum of 5 seconds to discharge. Can be wired in series. Charging rate is dependent on power in, with a maximum of 80% efficiency.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Power Out` | out | power | right |  |
| `Fully Charged` | out | power | top |  |

Properties (`props` in a spec):
- `Capacity` — float, default `200` *(simulator-only setting)*. Enter the capacity in rWm (rust Watt minutes).
- `Show Charge Remaining` — bool, default `true` *(simulator-only setting)*. Enable to display the remaining charge while discharging.
- `Show Active Usage` — bool, default `false` *(simulator-only setting)*. Enable to display the active usage while discharging.

Simulator: consumption 0 rW · root power source · accepted by Root Combiner · can block battery discharge.
Craft: 10 High Quality Metal, 2 Tech Trash.

- Provides root power with an output of 100 power
- Has a maximum storage capacity of 27,000 rWm
- Can be combined with the Root Combiner
- Maximum charge input is 400 (4x output rate)
- Charges with 80% efficiency (20% loss of input amount)
- Can only be blocked (prevent discharge) using a Blocker, Switch, or RF Receiver

**Functionality** (handbook)

- Stores large amounts of electricity for later use.
- Can be charged while simultaneously providing power.
- Some deployables can be attached to the battery. The small sign being one of the most handy.

**Battery Mechanics** (handbook)

- **Power Capacity**: 24,000rWm
- **Default Charge**: Starts with 200rWm
- **Battery Caused Active Usage**: 400 (4x the output power, defines max power consumption and charging rate)
- **Power Consumption**: The battery will consume a max of 400rW. Supplying more than that will not speed up charging.
- **Efficiency Loss**: Batteries are only 80% efficient meaning that more power must be given to it than the Active Usage to sustain a positive charging rate.
- **Charge Retention**: Holds charge indefinitely if no power is being consumed.
- **Pickup Penalty**: Picking up the battery reduces its health by 20%, but retains its charge.

**Power Output Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In
  - **Outputs**: Power Output, Fully Charged
- **Power Output**: 100rW
- **Fully Charged**: Outputs 1rW when the battery’s capacity reaches 24,000rWm.
  - If the 1rW is consumed by something that generates Active Usage, the battery will show 1 Active Usage.
- **Discharge Time**: 4 hours at max Active Usage.
- **Total Active Usage Supported**: 100 (due to 100rW max output).
- **Active Usage Calculation**: Determines battery drain rate. View usage by holding a Wire Tool and looking at the battery with TC authorization.
- **Charging Formula**: Input Power = Active Usage / 0.8 to determine the minimum input power needed for sustained charging.
- **Recharge Delay**: Upon depletion, no power is output until it charges up for a couple seconds. If the battery is still not receiving enough power, it will deplete in a second and the process repeats.
  - If the circuit after a battery is turning on and off, there is not enough incoming power to maintain a positive charge.

**Placement Considerations** (handbook)

- Can be placed on horizontal building blocks or the ground.
- Requires 2 square meters (2 foundation squares) of floorspace.
- Can be rotated with Reload (R) before placement.
- Keeps charge when picked up with a Hammer, but loses 20% health.

## Medium Rechargeable Battery

Type `battery_medium` · item 2023888403

A Medium Rechargeable Battery. Must have a minimum of 5 seconds to discharge. Can be wired in series. Charging rate is dependent on power in, with a maximum of 80% efficiency.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Power Out` | out | power | right |  |
| `Fully Charged` | out | power | top |  |

Properties (`props` in a spec):
- `Capacity` — float, default `100` *(simulator-only setting)*. Enter the capacity in rWm (rust Watt minutes).
- `Show Charge Remaining` — bool, default `true` *(simulator-only setting)*. Enable to display the remaining charge while discharging.
- `Show Active Usage` — bool, default `false` *(simulator-only setting)*. Enable to display the active usage while discharging.

Simulator: consumption 0 rW · root power source · accepted by Root Combiner · can block battery discharge.
Craft: 5 High Quality Metal, 1 Tech Trash.

- Provides root power with an output of 50 power
- Has a maximum storage capacity of 9,000 rWm
- Can be combined with the Root Combiner
- Maximum charge input is 200 (4x output rate)
- Charges with 80% efficiency (20% loss of input amount)
- Can only be blocked (prevent discharge) using a Blocker, Switch, or RF Receiver

**Functionality** (handbook)

- Stores moderate amounts of electricity for later use.
- Can be charged while simultaneously providing power.
- Some deployables can be attached to the battery. The small sign being one of the most handy.

**Battery Mechanics** (handbook)

- **Power Capacity**: 9000rWm
- **Default Charge**: Starts with 100rWm
- **Battery Caused Active Usage**: 200 (4x the output power, defines max power consumption and charging rate)
- **Power Consumption**: The battery will consume a max of 200rW. Supplying more than that will not speed up charging.
- **Efficiency Loss**: Batteries are only 80% efficient meaning that more power must be given to it than the Active Usage to sustain a positive charging rate.
- **Charge Retention**: Holds charge indefinitely if no power is being consumed.
- **Pickup Penalty**: Picking up the battery reduces its health by 20%, but retains its charge.

**Power Output Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In
  - **Outputs**: Power Output, Fully Charged
- **Power Output**: 50rW
- **Fully Charged**: Outputs 1rW when the battery’s capacity reaches 9000rWm.
  - If the 1rW is consumed by something that generates Active Usage, the battery will show 1 Active Usage.
- **Discharge Time**: 3 hours at max Active Usage.
- **Total Active Usage Supported**: 50 (due to 50rW max output).
- **Active Usage Calculation**: Determines battery drain rate. View usage by holding a Wire Tool and looking at the battery with TC authorization.
- **Charging Formula**: InputPower = Active Usage / 0.8 to determine the minimum input power needed for sustained charging.
- **Recharge Delay**: Upon depletion, no power is output until it charges up for a couple seconds. If the battery is still not receiving enough power, it will deplete in a second and the process repeats.
  - If the circuit after a battery is turning on and off, there is not enough incoming power to maintain a positive charge.

**Placement Considerations** (handbook)

- Can be placed on horizontal building blocks or the ground.
- Significantly larger than the Small Battery (1.25m wide × 0.75m deep) and fits under a half-height floor.
- Can be rotated with Reload (R) before placement.
- Keeps charge when picked up with a Hammer, but loses 20% health.

## Small Rechargeable Battery

Type `battery_small` · item -692338819

A Small Rechargeable Battery. Must have a minimum of 5 seconds to discharge. Can be wired in series. Charging rate is dependent on power in, with a maximum of 80% efficiency.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Power Out` | out | power | right |  |
| `Fully Charged` | out | power | top |  |

Properties (`props` in a spec):
- `Capacity` — float, default `37` *(simulator-only setting)*. Enter the capacity in rWm (rust Watt minutes).
- `Show Charge Remaining` — bool, default `true` *(simulator-only setting)*. Enable to display the remaining charge while discharging.
- `Show Active Usage` — bool, default `false` *(simulator-only setting)*. Enable to display the active usage while discharging.

Simulator: consumption 0 rW · root power source · accepted by Root Combiner · can block battery discharge.
Craft: 5 High Quality Metal.

- Provides root power with an output of 15 power
- Has a maximum storage capacity of 400 rWm
- Can be combined with the Root Combiner
- Maximum charge input is 60 (4x output rate)
- Charges with 80% efficiency (20% loss of input amount)
- Can only be blocked (prevent discharge) using a Blocker, Switch, or RF Receiver

**Functionality** (handbook)

- Stores small amounts of electricity for later use.
- Can be charged while simultaneously providing power.
- Some deployables can be attached to the battery. The small sign being one of the most handy.

**Battery Mechanics** (handbook)

- **Power Capacity**: 400rWm
- **Default Charge**: Starts with 37rWm.
- **Battery Caused Active Usage**: 60 (It is 4x the output power and is what the battery will apply to another battery. It also defines its max power consumption.)
- **Power Consumption**: The battery will consume a max of 60rW. Giving it more than that will not speed up charging.
- **Efficiency Loss**: Batteries are only 80% efficient meaning that more power must be given to it than the Active Usage to sustain a positive charging rate.
- **Charge Retention**: Holds charge indefinitely if no power is being consumed.
- **Pickup Penalty**: Picking up the battery reduces its health by 20%, but retains its charge.

**Power Output Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In
  - **Outputs**: Power Output, Fully Charged
- **Power Output**: 15rW
- **Fully Charged**: Outputs 1rW when the battery’s capacity reaches 400rWm.
  - If the 1rW is consumed by something that generates Active Usage, the battery will show 1 Active Usage.
- **Discharge Time**: 26 minutes with max Active Usage.
- **Total Active Usage Supported**: 15 (due to 15rW max output)
- **Active Usage**: View a battery's current usage by holding a Wire Tool and look at the battery with TC authorization. It is used to calculate the discharge rate (often called drain).
- **Charging Formula**: Input Power = Active Usage / 0.8 to determine the minimum input power needed for sustained charging.
- **Recharge Delay**: Upon depletion, no power is output until it charges up for a couple seconds. If the battery is still not receiving enough power, it will deplete in a second and the process repeats.
  - If the circuit after a battery is turning on and off, there is not enough incoming power to maintain a positive charge.

**Placement Considerations** (handbook)

- Can be placed on horizontal building blocks or the ground.
- Can be placed on deployables like workbenches, repair benches, and storage boxes.
- Can be rotated with Reload (R) before placement.
- Keeps charge when picked up with a Hammer, but loses 20% health.
