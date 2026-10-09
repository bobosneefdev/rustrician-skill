# Water

**Water System Overview**

The Water system lets players collect, store, move, and distribute water through water components using water IO. Like electricity, it uses the Hose Tool and follows rules for depth, gravity, and water types. Once for farming, water can now be weaponized.

**Common Traits of Water Components**

- Tool Cupboard authorization is required to make water IO connections with the Hose Tool.
- All components can be rotated using Reload (R) before placement.
- Components show their health when looked at with a Hammer. After enough damage, the health becomes visible without the hammer.
- **Gravity matters**:
  - Water flows down freely, assisted by gravity.
  - To move water upward, you must use a powered pumping component like the Water Pump and the Fluid Switch & Pump.

**Water Types**

Different water types cannot be mixed. Cross contamination is restricted.

- **Fresh Water**
  - Found in rivers, ponds, and collecting rain.
  - Drinkable and used for plant growth.
  - Is the lowest priority water type.
- **Salt Water**
  - Found in the ocean.
  - Must be converted to Fresh Water before use.
  - If players drink Salt Water, they will take damage, lose hydration and hunger points.
  - When given to planters, it will dry out the soil and eventually kill the plants.
- **Radioactive Water**
  - Can only be found in Rad Town pools.
  - Can be collected in containers like the Jug or the Water Gun.
  - Players can safely carry up to 2499ml of Radiation Water. To carry more, players will need a minimum of 2 radiation protection.
  - Players will need an additional 2 radiation protection for every additional 8,865ml.
  - Works best when sprinkled from above rather than the side and does not from below.
  - Only 18 radiation protection is needed to overcome the radiation from sprinkled water.
  - When used on planters, it will delete the plants and dry out the soil.
  - It is the highest priority water type.

**System Limitations**

- 15-component limit between a water source or storage and a Fluid Combiner. Exceeding this causes a Short Circuit / Max Depth error.
- 15-component limit between an **Electrical Power Source** and the Sprinkler before it can no longer be used to fill planter boxes or pools with water.
  - Beyond this, water appears to function (sprinklers still animate and can wet players), but:
    - No water reaches planter boxes or pools.
    - No water is removed from the source.
    - This is referred to as "dead water."
  - Dead water can only be used for transferring into another water storage container or combining with a new water source to create “dark water”.
- 32-component maximum distribution limit for transferring water between storage containers.

**Player Interaction Tips**

- Hold Sprint (Left Shift) and Left Click to plant an entire planter box at once.
- Look at a water container and hold Use (E) to access the transfer menu:
  - Hold Give or Take to automatically transfer water, avoiding repeated clicks.
