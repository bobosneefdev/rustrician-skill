# Fireworks

Nothing entered yet.

## Fireworks Overview

The Fireworks system in Rust provides players with a fun and visual way to celebrate, signal, or simply decorate their bases. While fireworks are not inherently part of any utility or automation system, they can be integrated into Rustricity circuits using the Igniter, allowing for remote or timed detonation.

**Acquisition & DLC Requirements**

Fireworks are paid items and require purchasing from the Steam Market or in-game Item Store:

- **Small Fireworks Pack (Steam Market):**
  - Allows crafting of Volcano Fireworks and Roman Candles.
- **Large Fireworks Pack (Steam Market):**
  - Allows crafting of Boomers and Champagne Boomers.
- **Pattern Boomers:**
  - Must be purchased individually from the General tab in the Item Store in game.

Players must own the corresponding DLC or item in their Steam inventory in order to craft each firework type.

**General Firework Characteristics**

- Fireworks are non-recoverable after use.
- Once lit (manually or with an Igniter), fireworks cannot be turned off or stopped.
- Typically used for events, raids, celebrations, or base aesthetics.
- A firework is considered active when the fuse on the side is sparkling. While active, it cannot be picked up.
- The default number of Boomers, Patterns, and Champagnes that can be active at one time is 25 total, not 25 of each. If you pass this point, the fireworks will sparkle but never launch. This in turn starts to prevent fireworks from launching and players will need to wait for a server restart or get the admin involved to delete the bugged fireworks.
  - There is currently no limit on Roman Candles and Volcano Fireworks.

**Rustricity Integration**

- **Igniter Compatibility:** All fireworks can be triggered by electricity using the Igniter component.
  - When connected to power, the Igniter will activate and ignite nearby fireworks.
  - Fireworks must be placed close enough to the Igniter's flame to be lit.
- They can also be ignited with a lit Torch, Flamethrower, or Fire Arrows.

**Placement Considerations**

- Fireworks can be placed on flat ground, building floors, foundation surfaces, or tugboats.
- They can be oriented before placement but cannot be rotated after being placed.
- Ensure there is clear vertical space above to avoid obstruction.
- Place fireworks near Igniters if you intend to use electricity to activate them.
- They can be picked up with a Hammer unless the fuse is already sparkling.

**Usage Tips**

- Use Timers or Buttons with Igniters to synchronize fireworks for a coordinated show.
- Combine multiple types for more elaborate displays.

**Firework Timing Definitions**

- **Start Time:** The delay between the fuse starting to sparkle and the first projectile launching.
- **Launch Time:** The duration it takes a projectile to reach its maximum height.
- **Number of Shots:** How many projectiles the firework launches.
- **Time Between Shots:** Delay between each projectile's launch.
- **Active Time *(also called Duration)*:** Total time from activation to the final visual or explosion.
