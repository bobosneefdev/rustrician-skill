# Electrical Concepts: Power Theory and Efficiency › Example: Automatic Sprinklers

### Example: Automatic Sprinklers

This example demonstrates how a circuit can benefit from the player’s understanding of Control Power, power used for logic and timing that does not generate Active Usage. When 30% or more of a circuit’s power is used for logic rather than function, it may be possible to increase efficiency by isolating that portion of the circuit and offloading it onto a standalone battery that doesn’t need to be recharged.

This is a simple watering system for a farm. It contains four Ceiling Lights, four Sprinklers, and a basic timing circuit using two Timers. The left Timer turns the water on (short cycle), while the right Timer resets the loop (long cycle). Water is collected from a Large Water Catcher and delivered to the Sprinklers using a Fluid Switch & Pump.

The structure of the circuit is:

- Power In → Electrical Branch 1 (set to 8)
  - Branch Out → Switch → Ceiling Light 1 → 2 → 3 → 4
  - Power Out → Electrical Branch 2
- Power In → Electrical Branch 2 (set to 2)
  - Branch Out → Short Timer → Electrical Branch 4 (set to 1)
    - Branch Out → Toggle on Fluid Switch & Pump
    - Power Out → Pump Power input
  - Power Out → Electrical Branch 3
- Power In → Electrical Branch 3 (set to 1)
  - Branch Out → Long Timer → Block Passthrough input on Blocker
  - Power Out (sending 2rW) → Switch → Blocker
    - Blocker Output → Splitter
      - Power Out 1 → Toggle Short Timer
      - Power Out 2 → Toggle Long Timer

When the short timer starts, it enables the pump and Sprinklers. The long timer restarts the short timer and itself, keeping the cycle running. The lights remain on independently.

**⚡ Solving For Efficiency**

This circuit draws 13rW total:

- 8rW powers the four Ceiling Lights
- 5rW powers the logic system—timers, splitters, blockers, and the pump controller

This means that 38% of the circuit’s energy demand is tied to automation rather than functional components. Understanding how to handle this distribution can greatly improve overall efficiency depending on the power delivery method used. If connected to a Bypass Battery Backup, all 13rW must be provided constantly from Root Power. While this works, it’s not the most power-conscious setup.

By switching to an Inline Battery Backup, only the power that generates Active Usage matters. Since the lights are the only components that produce Active Usage, the battery sees just 8rW of drain. As a result of the battery’s 80% efficiency, only 10rW of power input is needed to maintain charge. This already provides a 3rW savings in Root Power, translating to a 23% improvement in power efficiency. This setup is great for small-scale farms powered by a dedicated solar panel or generator. If players actually use the Switches when they log off, power demand will drop to 0.

Players using a modern Bypass Backup System, like the BCN Core, and just want to leave the lights turned on all the time, can optimize even further by leveraging Control Power. Since the logic components in this circuit do not create Active Usage, they can be powered by a battery that doesn’t need recharging, resulting in zero drain on Root Power. If a modern BCN Core is being used, it already has a battery for Control Power that can be used to supply Control Power for a circuit like this.

In this setup:

- The Bypass Backup only needs to provide 8rW for the lights
- A Control Battery supplies the remaining 5rW for the logic system

This configuration reduces Root Power consumption by 38%, without compromising functionality.

This example highlights the importance of recognizing when a circuit’s automation or logic can be separated from its functional load. By offloading Control Power and understanding where Active Usage is actually generated, players can design systems that are more sustainable, more efficient, and better suited for expansion.
