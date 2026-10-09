# Components: Industrial

Port labels are case-sensitive in exported XML (the build script matches them case-insensitively).
Side = where the port sits on the 64×64 component. Back to the [component index](../components.md).

## Electric Furnace

Type `electric_furnace` · item -1196547867

An electrical version of a furnace that uses power instead of a fuel source.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | top |  |

Simulator: consumption 3 rW.
Craft: 5 High Quality Metal, 200 Metal Fragments.

**Functionality** (handbook)

- A powered alternative to traditional furnaces that requires electricity instead of wood.
- Smelts ores and cans into usable materials like metal fragments, sulfur, and high quality metal.
- Cannot burn wood and produces no charcoal.
- Smelts faster than the Small Furnace by approximately 66%.
- Holding a Hammer and looking at the furnace will show its health.
- Auto-repairs over time.

**Inventory System** (handbook)

- **Input Slots**: 2 slots for raw ores or empty cans. Only items that can be smelted can be inserted into these slots. There is no way to remove items from these slots other than manual removal.
- **Output Slots**: 3 slots for smelted materials. Items must be removed manually or via Industrial Out on a Storage Adapter.

**Industrial Mechanics** (handbook)

- Is not required but supports up to 2 Storage Adapters for integration with an industrial network.
- Players can load and unload the furnace manually. It is recommended to place a switch nearby to turn the furnace on and off.

**Power Mechanics** (handbook)

- **Electrical Inputs**: Power In
- **Power Consumption**: 3rW
- **Active Usage**: 3
- When the furnace receives power, it turns on and will start smelting. Removing power turns it off.

**Placement Considerations** (handbook)

- Must be placed on foundations or floors.
- Can be rotated before placement using Reload (R).
- Cannot be used with component snapping.

## Hopper

Type `hopper` · item 1428574144

Will suck up any dropped items in its radius while powered

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Industrial In` | in | industrial | left |  |
| `Industrial Out` | out | industrial | right |  |
| `Power In` | in | power | top |  |

Simulator: consumption 8 rW.
Craft: 200 Metal Fragments, 1 Gears.

- The radius is 1.5 meters
- Can only be placed on Large Wood Boxes and Storage Barrels

**Functionality** (handbook)

- Sucks up any dropped items within a 1 foundation (3 meter) radius when powered.
- Can automatically harvest animal and player corpses, collecting all loot.
  - Does not suck up loot bags from destroyed storage containers.
- Items are deposited directly into the connected container.
- Can be placed on top of Large Storage Boxes and Barrels.
- Prevents one Storage Adapter from being placed on Large Storage Boxes.

**Power Mechanics** (handbook)

- **Electrical Input**: Power In
- **Power Consumption**: 8rW
- **Active Usage**: 8

**Industrial Mechanics** (handbook)

- **Industrial Connections**
  - **Input**: Industrial In
  - **Output**: Industrial Out
- Functions similarly to a Storage Adapter in industrial systems just with an added feature.

**Placement Considerations** (handbook)

- Must be attached to a Large Storage Box or Barrel.
- Cannot pull items through walls, doors, floors, strengthened glass, or window shutters.
- Can pull through chainlink fences, prison cells, window bars, rugs, vending machines, lockers, workbenches, and out of Camper Modules interior.
- Requires line of sight to function. Things like the bars on window bars can block line of sight.
- **Bug/Feature**: When daisy chaining adapters on the same storage container.
  - Hopper > Adapter > Adapter > Adapter = 4 adapters seen by the Conveyor.
  - Adapter > Adapter > Adapter > Hopper = only 1 adapter seen.

**Notes** (handbook)

- Auto-repairs over time with resources from the Tool Cupboard.
- Shows their health when looked at with a Hammer.

## Industrial Combiner

Type `industrial_combiner` · item 1538126328

Combines three separate industrial connections into one connection.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Industrial In 1` | in | industrial | right |  |
| `Industrial In 2` | in | industrial | right |  |
| `Industrial In 3` | in | industrial | right |  |
| `Industrial Out` | out | industrial | left |  |

Simulator: consumption 0 rW · rotatable (0/90/180/270).
Craft: 75 Metal Fragments.

- Can be rotated before placing by pressing R in-game, or by pressing R after placing in the simulator

**Functionality** (handbook)

- It merges up to 3 industrial connections into a single connection.
- No items are transferred through the combiner itself. It acts as a junction point between Conveyors and Storage Adapters allowing them to see each other.

**Industrial Mechanics** (handbook)

- **Industrial Connections**
  - **Inputs**: Industrial In 1, Industrial In 2, Industrial In 3
  - **Output**: Industrial Out
- Prioritizes input connections in the order: Industrial In 1 > Industrial In 2 > Industrial In 3.
- If items being pulled cannot be split evenly, the remainder will come from the highest priority input.
- Adds to the industrial depth on either side of a Conveyor.

**Placement Considerations** (handbook)

- Can be placed on all building blocks including angled and flat surfaces, as well as the ground.
- Can be rotated with Reload (R) before placement.

**Notes** (handbook)

- Auto-repairs over time with resources from the Tool Cupboard.
- Shows their health when looked at with a Hammer.
- This is generally the easiest component to extend a pipe connection with since it takes minimal space.

## Industrial Splitter

Type `industrial_splitter` · item 742745918

Splits an industrial connection into three separate connections.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Industrial In` | in | industrial | top |  |
| `Industrial Out 1` | out | industrial | left | divides input evenly |
| `Industrial Out 2` | out | industrial | bottom | divides input evenly |
| `Industrial Out 3` | out | industrial | right | divides input evenly |

Simulator: consumption 0 rW · rotatable (0/90/180/270).
Craft: 75 Metal Fragments.

- Can be rotated before placing by pressing R in-game, or by pressing R after placing in the simulator

**Functionality** (handbook)

- It splits 1 industrial connection into three industrial connections.
- No items are transferred through the splitter itself. It acts as a junction point between Conveyors and Storage Adapters allowing them to see each other.
- Can be stacked on a variety of components including: Industrial Lights, Blockers, Electrical Branch, Memory Cell, and the RAND Switch.

**Industrial Mechanics** (handbook)

- **Industrial Connections**
  - **Inputs**: Industrial In
  - **Outputs**: Industrial Out 1, Industrial Out 2, Industrial Out 3
- Adds to the depth of a circuit on either side of a Conveyor.
- If pipes are split into a number of storage adapters that does not divide evenly into 60, Conveyors will pull fewer than 60 items per group per stack. (60 ÷ # of Storage Adapters, rounded down)

**Placement Considerations** (handbook)

- Can be placed on all building blocks including angled and flat surfaces, as well as the ground.
- Can be rotated with Reload (R) before placement.

**Notes** (handbook)

- Auto-repairs over time with resources from the Tool Cupboard.
- Shows their health when looked at with a Hammer.

## Industrial Conveyor

Type `industrial_conveyor` · item 610102428

Moves an item from one container to another.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Industrial In` | in | industrial | left |  |
| `Power In` | in | power | top |  |
| `Turn On` | in | power | top |  |
| `Turn Off` | in | power | top |  |
| `Passthrough` | out | power | top |  |
| `Filter Pass` | out | power | bottom |  |
| `Filter Fail` | out | power | bottom |  |
| `Industrial Out` | out | industrial | right |  |

Properties (`props` in a spec):
- `Filter Pass` — bool, default `true` *(simulator-only setting)*. Enable to output power to Filter Pass.
- `Filter Fail` — bool, default `true` *(simulator-only setting)*. Enable to output power to Filter Fail.
- `JSON Filter` — text, default `""`. Enter the JSON Filter text.

Simulator: consumption 1 rW · rotatable (0/90/180/270).
Craft: 75 Metal Fragments.

- Can only see the first 32 containers it encounters before reaching max input
- Cannot push or pull items from other conveyors, a Storage Adaptor must be in-between
- Can be rotated before placing by pressing R in-game, or by pressing R after placing in the simulator
- Requires 1 power to operate and 2 power for aux ports to output
- Has 2 aux outputs: Filter Pass and Filter Fail (each output 1 power)

**Functionality** (handbook)

- The core component of the Industrial System. No items will move without at least one Conveyor.
- They work on a Pull/Push system. The conveyor will pull items from storage containers it can see, and push them into storage containers it can see.
- In order for the conveyor to see into a storage container, the container must be equipped with a Storage Adapter and the conveyor connected to it with a pipe.
- **Adapter ID**: Each adapter will create a new Adapter ID for the Conveyor to see. Multiple adapters on a single container turns that 1 container into multiple Adapter IDs.
- Storage containers are anything that a Storage Adapter can be applied to or the Industrial Crafter.
- Industrial Splitters and Industrial Combiners are used to expand the network allowing the conveyor to see into multiple storage containers.
- No items actually pass through conveyors, splitters, combiners or the pipes. Items are simply taken from one location to another when the conveyor says to do so. The pipes and other components are used to establish paths for the conveyor to see through.
- **Note**: Two conveyors cannot be connected to one another. They must be separated by a Storage Adapter or else nothing will transfer. They cannot see through each other.
- Conveyors do not need to transfer items to be useful. They can be used just to monitor a storage container. These are often referred to as Check Conveyors
  - **Note**: Check Conveyors only use 1 of its industrial connections to monitor a storage container's inventory.
  - Acts like an observer to allow for electrical automation based on inventory conditions using its Filter Pass and Filter Fail outputs.
  - Is not required but often uses different Filter Modes and Filter Options.
- If no filter is used, it will attempt to pull all items from the connected source and deposit them into any container it can see.
- Access the filter menu by looking at the conveyor and holding Use(E).
- Anyone can turn them on or off but only players with TC authorization can access the filters.
- Items are only moved if the destination has valid space for them and filter conditions are met.
- Using Industrial Splitters and Industrial Combiners can allow a single conveyor to see multiple containers or let multiple conveyors see a single container.
- The LCD display on the face of the Conveyor will display the images of the items currently being transferred.
- If the Conveyor has power and is on, it will remain on after a server restarts. If the Conveyor is turned on but has no power, after the server restarts, the Conveyor will default back to being turned off.

**Restricted Mode** (handbook)

  - Industrial conveyors can now switch to a restricted mode if they are taking too long and degrading server performance

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power In, Turn On, Turn Off
  - **Outputs**: Electrical Passthrough, Filter Fail, Filter Pass
- **Industrial Connections**
  - **Inputs**: Industrial Input
  - **Outputs**: Industrial Output
- **Power Consumption**: 1rW (2rW if using filter outputs)
- **Active Usage**: 1
- **Power Output**: Input power minus 1
- **Turn On Input**: Applying power will allow the transfer of items.
- **Turn Off Input**: Applying power will halt the transfer of items. This is its default state.
- Whichever input is the last to receive power is the input that dictates the state of the conveyor. There are no priorities between them.
- Power must reach Power In before the Turn On input for the Conveyor to activate.
- **Filter Output Behavior**
  - Filter Pass outputs 1rW when all filter conditions are met.
    - **No Filter**: Outputs power when it can transfer.
    - **MIN Filter**: Outputs power when greater than the set value.
    - **MAX Filter**: Outputs power when less than the set value.
  - Filter Fail outputs 1rW when filter conditions are not met.
    - **No Filter**: Outputs power when it cannot transfer.
    - **MIN Filter**: Outputs power when equal to, or less than the set value.
    - **MAX Filter**: Outputs power when equal to or greater than the set value.
  - Outputs refresh every 5 seconds. If conditions have not changed, power remains constant.
    - There are times where server performance can cause power to flip outputs and back again even though conditions never changed.
  - Will not function unless connected to at least 1 valid industrial input/output and has access to 2rW of power or more.
  - Powering passing through is only reduced by 1rW but because it is more than 2rW, the filter outputs will function making the Conveyor only consume 1rW.

**Industrial Mechanics** (handbook)

- **General Filters**: You can filter by specific items or by general filter groups:
  - Items, Ammo, Clothing, Components, Construction, Electrical, Food, Fun, Medical, Other, Resources, Tools, Traps, Weapons
- **Transfer Rate**: Up to 60 items per stack, from a max of 12 stacks, per 5 seconds, (60 items x 12 stacks = a max of 720 items per 5 seconds). If there is only 1 stack, a max of 60 will be transferred.
  - Each Storage Adapter added to the same container can allow a Conveyor to see the container an additional time.
  - **Example**: 4 adapters added on a large box, all connected together with a combiner or daisy chained, will let a Conveyor see said container 4 times.
- **Transfer Time**: Approximately 5 seconds for the first transfer and 3 to 5 seconds for subsequent transfers thereafter.
- **Filter Capacity**: Up to 30 individual items or grouped filters can be listed.
- **Filter Modes**
  - **Any Item**: This is the default setting. It will move all items unless there are Item Filters that have been applied.
  - **Require All**: All listed items must be present to begin transfer.
    - This filter works as expected when a conveyor can only see 1 storage container through 1 storage adapter to pull items from. Conveyors apply the filter to each adapter individually. Multiple adapters don’t get merged into a unified group.
    - This filter mode works by checking to see how many Positive IDs (PIDs) it gets and if it matches the number of filtered items, the transfer begins.
    - Each Storage Adapter creates a new Adapter ID.
    - **Adapter ID**: Each adapter will create a new Adapter ID for the Conveyor to see. Multiple adapters on a single container turns that 1 container into multiple Adapter IDs.
    - The conveyor will check each Adapter ID it sees for the item. If the item is present, that Adapter ID will return a Positive ID (PID). PIDs do not factor in the amount of the item present, just that the item is present. Only the Filter Options factor in the number of stacks or their sizes.
    - A Conveyor set to filter multiple items, only needs the exact number of Positive IDs to start the transfer. The number of Positive IDs are based on the number of items in the filter list. If there are 5 items in the list, the Conveyor only needs 5 Positive IDs. These PIDs do not need to be 1 from each item on the list, just that the Conveyor receives the correct number of Positive IDs.
    - Having too many Positive IDs (PIDs) is the same as not having enough.
      - Example 1: A Conveyor has 1 item filter set for Wood. The Conveyor will need 1 Positive ID before transferring. When it is connected to only 1 storage container with 1 Storage Adapter, or 1 Adapter ID, if any inventory slots have Wood, this will equal 1 Positive ID. Even if there are 10 slots with Wood, the Conveyor counts this as 1 Positive ID, not 10.
      - Example 2: A Conveyor has 1 item filter set for Wood. The Conveyor will need 1 Positive ID before transferring. When it can see 2 storage containers from 2 Storage Adapters, or 2 Adapter IDs, and there is Wood in both, the Conveyor will get 2 Positive IDs. When this happens, nothing will transfer. There are too many PIDs.
      - Example 3: A Conveyor has 1 item filter set for Wood. The Conveyor will need 1 Positive ID before transferring. When it can see the same storage container multiple times, like a Large Storage Box with 4 adapters daisy chained together, the Conveyor will get 4 Positive IDs, 1 from each Adapter ID. When this happens, nothing will transfer. There are too many PIDs.
    - If this filter mode is used in situations where a Conveyor can see multiple containers or the same container multiple times, or, it is used in situations where multiple items are set in the filter list, players will often come into contact with False Positive IDs (FPIDs) allowing the Conveyor to transfer when players think it shouldn’t.
      - Example 4: A Conveyor has 4 items in the filter list. Wood, Stone, Cloth and Sulfur. The Conveyor will need 4 Positive IDs before transferring can start. If it's pulling from a single storage container with a single adapter, so 1 Adapter ID, each item present will return 1 Positive ID. Therefore, at least 1 of each item will need to be in that container before transferring to begin.
      - Example 5: A Conveyor has 4 items in the filter list. Wood Stone, Cloth and Sulfur. The Conveyor will need 4 Positive IDs before transferring can start. When it is pulling from a single storage container with 4 adapters daisy chained together, it sees 4 different Adapter IDs. If all 4 items are present in the storage container, 16 Positive IDs are being returned. Nothing will transfer.
      - Example 6: A Conveyor has 4 items in the filter list. Wood Stone, Cloth and Sulfur. The Conveyor will need 4 Positive IDs before transferring can start. When it is pulling from a single storage container with 4 adapters daisy chained together, it sees 4 different Adapter IDs. If only 1 out of the 4 items on the list is present, the Conveyor will receive 4 Positive IDs, 1 from each Adapter ID. This matches the required number of PIDs to start the transfer and so it does, even though not all of the specific items are present. This is a False Positive ID.
      - Example 7: A Conveyor has 3 items in the filter list. Wood, Stone and Cloth. The Conveyor will need 3 Positive IDs before transferring can start. When it pulls from 2 different containers, the first container having Wood and Stone and the second container also has some Wood, 3 Positive IDs will be returned. 2 PIDs from the first Adapter ID plus 1 from the second. This totals the required 3 Positive IDs and transferring will begin, even though Cloth was not present. This is a False Positive ID.
  - **Exclude Listed Items**: Moves all items except the ones listed.
    - Items in the filter list will be prevented from transferring.
    - **Bug/Feature**: When more than 1 item is on the filter list, the Conveyor applies the exclusion to each item individually. This causes Filter Pass to output power, even when only the excluded items are present.
      - **Example**: A Conveyor has Wood and Stone on the list with this filter applied. The Wood filter says to move everything but the Wood. The Stone filter says to move everything but the Stone. They don’t tell each other to not move themselves. So the Wood tries to move the Stone and the Stone tries to move the Wood. This results in the Filter Pass to output power because each item filter thinks it should be moving the other.
- **Filter Options**
  - **MAX**: conveyor will stop moving the item when all output containers reach this amount.
    - **Single Container Example**: There are 12 stacks of Wood and the Wood filter is set to a MAX of 1000. The first transfer will be 60 from all 12 stacks for 720. The second transfer will be 280 then the transfers will stop.
    - **Multi Container Example**: There are 12 stacks of Wood and the Wood filter is set to a MAX of 1000. The first transfer will be 60 from all 12 stacks for 720, divided by the number of containers. Each container will receive an equal amount. This will repeat until all the output containers have 1000 in each of them.
    - This filter does not care about input containers and only looks at output containers.
  - **MIN**: conveyor will only move items in excess of this amount from all input containers.
    - **Single Container Example**: Wood set to a MIN of 1000. If there are 1000 or less, no transfer happens. The conveyor will only transfer the wood when there is 1001 or more. 1 will be transferred.
    - **Multi Container Example**: Wood set to a MIN of 1000. Every container the conveyor can pull from will need to have 1001 or more. If there are 2 containers, and each has 900 in each. Even though there is 1800 total, the conveyor is not adding both containers together. It can only apply the filter to each adaptor individually, not as a collective.
    - This filter does not care about output containers and only looks at the input containers.
  - **BUFFER**: Conveyors will only move items in chunks of this size.
    - Each adapter will create a new Adapter ID for the Conveyor to see. Multiple adapters on a single container turns that 1 container into multiple Adapter IDs.
    - Conveyors will calculate the total number of items available by adding up the amount it can see from each Adapter ID.
      - Example 1: A Conveyor has a Buffer for Wood set to 100. It is connected to a single adaptor on a storage container so it only sees 1 Adapter ID. There is only 50 Wood available. Nothing gets transferred.
      - Example 2: A Conveyor has a Buffer for Wood set to 100. It is connected to a single storage container through 2 Storage Adapters. The Conveyor now sees 2 Adapter IDs. This causes the Conveyor to see the same 50 Wood 2 times. Now the Conveyor thinks there is 100 Wood available and will start to transfer.
    - Conveyors do have a limited transfer rate. 60 items from up to 12 stacks for a max 720 items per transfer. The BUFFER can be set higher or lower than this limit.
    - It will try to provide the BUFFER amount in the first transfer. If it can't, attempts will be made in the following transfers to provide the remainder. In the last transfer, only the required amount that is needed to meet the BUFFER value will be transferred before the process begins again.
      - **Low Buffer**: Wood has a BUFFER set to 15. The conveyor will move 15 Wood each transfer.
      - **High Buffer**: Wood has a BUFFER set to 135. If there is 1 stack of Wood available, the conveyor will move 60 Wood in the first transfer, 60 in the second and 15 in the third, before the process repeats.
    - **Buffer In Progress**: It is caused when the Conveyor cannot move the Buffers value in a single transfer. The remainder of what could not be moved is held in memory and will continue to be transferred on the cycle or when able to do so.
      - The Buffer In Progress can be viewed inside the Conveyors menu on the top left side. It will show the remaining amount left to be transferred to meet the Buffer value.
      - When Buffer is used in tandem with a MAX setting, if the Buffer exceeds the MAX number, it will cause a “Buffer In Progress”.
        - **Example**: A Conveyor has a Wood filter. Its MAX is set to 10 and the Buffer is set to 15. If the Conveyor is only connected to 1 Storage Adapter, in the first transfer, 10 Wood will be moved. This satisfies the MAX filter and transfers will stop. The 5 remaining will be held in the Buffer. When able to do so, the last 5 from the Buffer will be transferred and on the following cycle, only 5 more will move which once again satisfies the MAX filter. Now there will be 10 held in the Buffer.
      - When used in tandem with a MIN setting, from multiple Adapter IDs, if there is not enough of the item to be pulled, it will pull the max amount on the first transfer then get stuck causing a “Buffer In Progress”.
        - **Example**: A Conveyor has a Wood filter. Its MIN is set to 500 and the Buffer is set to 80. The Conveyor is connected to 1 storage container though 2 Storage Adapters, and in that container there is 1 stack of 570 Wood. The 2 adapters will cause 2 Adapters IDs for the 1 storage container. This makes the Conveyor see the 570 Wood twice. This will total 1140 Wood and so the Conveyor can transfer. The 2 adapters also means that up to 120 Wood can be moved per transfer. So in the first transfer, 70 Wood will be moved, dropping the total amount remaining in the container at 500. This will satisfy the MIN filter and nothing more will be transferred. The remaining 10 will be held in the Buffer.
    - The Conveyor can only evenly transfer into a number of Storage Adapters that are divisible by the maximum number of items that can be transferred which is determined by the number of stacks or Adapter IDs.
      - If there is 1 stack, a max of 60 can be pulled. Take 60 and divide it by the number of adapters the Conveyor is pushing into.
      - If there are 2 stacks, a max of 120 can be pulled. Take 120 and divide it by the number of adapters the Conveyor is pushing into.
      - If there is 1 stack but the container has 2 adapters, a max of 120 can be pulled. Take 120 and divide it by the number of adapters that the Conveyor is pushing into.
    - **Note**: Pulling from more than 1 stack or through more than 1 adapter, will result in increasing the max possible pull rate. The pull rate is what the Conveyor will use to calculate its division of materials when pushing in to more when 1 adapter.
    - If the Buffer value is set higher than, and/or, not evenly divisible by the pull rate and the number of Storage Adapters, it will skew the dividing of material across the connected adapters.
      - **Example**: A Conveyor filtered for wood, with a Buffer set to 135. It takes from 1 stack through 1 adaptor and splits between 7 storage containers with 1 adapter each. The Conveyor wants to take 60, the max it can pull from 1 stack, and divide that by the 7 adapters, 60 / 7 = 8.5. 8.5 items would need to be transferred to keep things even, but it can't, so it rounds down. 8.5 rounded down is 8. 8 will be transferred into each adapter. 8 items multiplied by the 7 adapters is 56, 8 x 7 = 56. Only 56 will be taken per transfer, not the 60 it wants to.
        - The first transfer will take the 56 and put 8 in each of the 7 adapters. (56/7) = 8/8/8/8/8/8/8. That leaves 79 of the 135 remaining in the Buffer.
        - The second transfer will take another 56 and put 8 more in each of the 7 adapters. (56/7) = 16/16/16/16/16/16/16. That now leaves 23 of the 135 remaining in the Buffer.
        - The third transfer will take the remaining 23 and still try to put 8 more in each adapter but fail. (56/7) = 24/24/23/16/16/16/16, That now leaves 0 of the 135 remaining in the Buffer.
        - The last transfer will still try to take 56 as well, but the buffer setting is limiting the transfer to the remaining 23. Since the conveyor is trying to split 56 by 7, the 2 first adaptors will get 8 each and the 3rd will get the remaining 7, leaving none remaining for the last 4 adaptors.
        - **Note**: Limiting the amount that is getting moved(23), compared to the amount the conveyor is realistically able to move(60), the splitting of the items gets skewed, and whatever material we transfer with a limited transfer, is dropped in the adaptors with the highest priority after it has been divided as if it were a full transfer(56/7).
- **Splitting / Combining / Daisy Chaining**
- When an Adapter ID is added to a network that a Conveyor can see, each adapter is assigned a priority. Within each inventory, each slot is also prioritized top to bottom, left to right, from 1 to 48.
- Priorities are used by the Filter Options when trying to limit the Conveyor below its default Transfer Rate.
- **Daisy Chain Priority**
  - **Daisy In**
  - **Daisy Out**
  - The adapter with the highest priority is the one that is closest. The closest is the one directly connected to a Conveyor’s Input or Output. The furthest one, or the deepest one, is assigned the lowest priority.
- **Combining Priorities**
  - The adapter with the highest priority is connected in the order, Industrial In 1 > Industrial In 2 > Industrial In 3. Up to the maximum amount of an item will be taken first from the adapter connected to its first input, Industrial In 1. If more is required than the amount available from the first input, it will take what it can or needs from the next input, Industrial In 2. The process will repeat for input 3, Industrial In 3, if required.
  - Combining always prioritizes the first input and anything connected to it. This includes another combiner, which will then prioritize its inputs before returning back to the original combiners next input. If a third combiner happens to be connected to the second combiner, its inputs will be prioritized before the original combiners next input.
- **Splitting Priorities**
  - An attempt will be made to give each output an even amount. When a situation arises where an amount cannot be evenly shared, the remainder will be given to the adapters with the highest priority. Priorities are assigned in the order, Industrial Out 1 > Industrial Out 2 > Industrial Out 3.
  - Splitting always prioritizes the first output and anything connected to it. This includes another splitter, which will then prioritize its outputs before returning back to the original splitters next output. If a third splitter happens to be connected to the second splitter, its inputs will be prioritized before the original splitter's next output.
- **Filter Sharing**
  - Use Copy/Paste within the menu to copy filter settings and paste into multiple conveyors easily.
  - Holding Sprint (Shift) lets a user Copy(JSON). This can then be pasted into a text file allowing a player to share their conveyor filters outside of the game and between servers. Hold Sprint (Shift) to Paste(JSON).
    - **Example of copied JSON**

**]** (handbook)

    - The ‘Filter Mode’ does not get copied.
    - The line for "TargetItemName": "stones" can be modified to include any item in the F1 menu, including hidden items. Players can find a complete list of items and their shortnames from Corrosionhour (https://www.corrosionhour.com/rust-item-list/). Some items cannot be filtered for.
- **Limitations**
  - **Max Storage Adapters**: 32 is the most adapters the conveyor can see from either its Input or its Output, counted in parallel.
  - **Max Depth**: 32 components is the deepest a conveyor can see from either its Input or its Output. Adapters past this limit cannot be seen so nothing will move in or out of them, counted in series. This includes splitters and combiners as well.
    - Example (https://www.rustrician.io/?circuit=46076fdd946ba1c1f343ed0e399fc35e)
  - The Max Depth / Short Circuit error will appear but that is not always the case. It is best to learn how to count depth to avoid issues.
  - Unstackable items count as 1 stack each. A max of 12 can be moved per transfer.

**Placement Considerations** (handbook)

- Can be placed on all building blocks or the ground
- Can be rotated before placement using Reload ®

**Notes** (handbook)

- Holding a Hammer and looking at the conveyor shows its health.
- It will auto repair over time using resources from the Tool Cupboard.

## Industrial Crafter

Type `industrial_crafter` · item 1430085198

Attaches to a workbench to allow automated crafting.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Industrial In` | in | industrial | left |  |
| `Power In` | in | power | top |  |
| `Turn On` | in | power | top |  |
| `Turn Off` | in | power | top |  |
| `Toggle` | in | power | top |  |
| `Blueprint Out` | out | industrial | bottom |  |
| `Blueprints In` | in | industrial | bottom |  |
| `Industrial Out` | out | industrial | right |  |

Simulator: consumption 1 rW.
Craft: 3 High Quality Metal, 2 Tech Trash.

- You can place a maximum of two Industrial Crafters on a single workbench

**Functionality** (handbook)

- Installs directly onto Workbenches. Maximum of 2 per bench, only 1 on the Engineering Workbench.
- Allows automated crafting of items using blueprints and input materials.
- Can be operated manually by putting materials and blueprints in, then taking the crafted items out as well as manually turning the crafter on.
- Crafting speed is the same regardless of workbench type or tier.
- Items can only be crafted if the attached workbench matches or exceeds the blueprint's tier requirement.
- Only one blueprint can be crafted at a time per crafter.
- It cannot craft armor with plate slots. That can only be done by the player.
- Blueprints are prioritized from left to right when crafting from the same materials.
  - **Example**: There are 2 blueprints in order, High Velocity Rock and HV 5.56 Rifle Ammo. For items, there are a few metal pipes, a stack of gun powder and a few hundred metal fragments. The HV Rockets will be crafted first until it runs out of pipes before the HV 5.56 starts to be crafted.
- If the output container is full, crafting will not proceed.
- Anyone can turn the crafter on or off as well as access the inventory.

**Internal Inventory** (handbook)

- **Blueprint Slots**: Holds up to 4 blueprints and only blueprints.
- **Input Slots**: Has 5 inventory slots to hold crafting ingredients. Items can only go in. If items need to be removed, manual removal is required.
- **Output Slot**: Has 4 inventory slots to hold crafted items. Removal can be done manually or via a conveyor through the Industrial Out output.

**Power Mechanics** (handbook)

- **Electrical Inputs**
  - **Power In**: Enables the ability to craft.
  - **Turn On**: Forces crafting to begin.
  - **Turn Off**: Forces crafting to stop.
  - **Toggle**: Turns on while powered. Turns off when power is removed
- **Power Consumption**: 1rW
- **Active Usage**: 1

**Input Priority Behavior** (handbook)

- The last electrical input to receive power dictates the crafter’s behavior.
- Toggle is an exception. Removing power from Toggle turns the crafter off.

**Industrial Mechanics** (handbook)

- **Industrial Inputs**
  - **Industrial In**: Allows for the transfer of ingredients into the input slots.
  - **Blueprint In**: Allows for the transfer of blueprints into the blueprint slots.
- **Industrial Outputs**
  - **Industrial Out**: Allows for the removal of crafted items out of the output slots.
  - **Blueprint Out**: Allows for the removal of blueprints from the blueprint slots.

**Placement Considerations** (handbook)

- Must be placed on a Workbench (Tier 1, 2, or 3) or Engineering Workbench.
- The Engineering Workbench has 1 spot for the crafter. The other Workbenches have 2 spots for the crafter.
- Can be used on workbenches placed on Tugboats.

## Storage Adaptor

Type `storage_adapter` · item -1049172752

Attach to a storage container to allow industrial input/output connections.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Industrial In` | in | industrial | left |  |
| `Industrial Out` | out | industrial | right |  |
| `Power In` | in | power | top |  |
| `Passthrough` | out | power | top |  |

Simulator: consumption 1 rW · rotatable (0/90/180/270).
Craft: 100 Metal Fragments.

- Requires 1 input power to enable automatic storage contents sorting in the UI
- Most storage containers allow for multiple Storage Adaptors to be attached
- Can be rotated by pressing R after placing in the simulator

**Functionality** (handbook)

- These get installed onto containers like boxes, furnaces, fridges, lockers, etc., so a Conveyor can see and access their inventories.
- Allows for automated transfer of items into or out of the container by a conveyor.
- Can function as both input and output depending on the connected Conveyor.
- Some containers support multiple adapters.
- Each adapter will create a new Container ID for the Conveyor see. Multiple adapters on a single container turns that 1 container into 4 Container IDs.
- The number of items that a Conveyor can pull/push from a single container increases with the number of adapters:
  - 1 adapter = 60 items from 12 stacks.
  - 2 adapters = 120 items from 12 stacks.
  - etc., up to the maximum number of adapters on a container.
  - Conveyors see each adapter connected to a single container as a separate instance of the container.
- Conveyors can only see a maximum of 32 adapters from its input or its output.
- **Daisy Chaining**
  - Each container in the chain will receive approximately an equal portion pulled from it or pushed to it.
  - Each adapter in a daisy chain adds to the depth of the circuit.
  - Conveyors have a Max Depth of 32 components on either its input or output side.
- Holding a Hammer and looking at the adapter will show its health.

**Adapter Limits by Container** (handbook)

- **Fridge**: 1
- **Mini Fridge**: 1
- **Coffin**: 1
- **Small Box**: 2
- **Large Box**: 4
- **Small Furnace**: 1
- **Electric Furnace**: 2
- **Large Furnace**: 4
- **Refinery**: 1
- **Drop Box**: 1
- **Lockers**: 3
- **Vending Machine**: 1
- **Tool Cupboard**: 2
- **Abyss Storage Tanks**: 4
- **Wicker Barrels**: 4
- **Krieg Storage Barrel and Crate**: 4
- **Wall Cabinet**: 1

**Power Mechanics** (handbook)

- **Electrical Inputs**: Power In
- **Electrical Outputs**: Passthrough
- **Power Consumption**: 1rW
- **Active Usage**: 1
- When powered, it can be configured to automatically sort container contents. Containers with this functionality include:
  - Wood Storage Box
  - Large Wood Box
  - Storage Barrels
  - Abyss Storage Tanks
  - Wicker Barrels
  - Krieg Storage Barrel and Crate

**Industrial Mechanics** (handbook)

- **Industrial Connections**
  - **Industrial In**: Allows items to be transferred into the container.
  - **Industrial Out**: Allows items to be extracted out of the container.

**Placement Considerations** (handbook)

- Must be placed directly on the container.
- Building structures and other deployables can block placement.
- Health is separate from the container it is attached to.
