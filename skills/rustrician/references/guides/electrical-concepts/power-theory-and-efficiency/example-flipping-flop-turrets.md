# Electrical Concepts: Power Theory and Efficiency › Example: Flipping Flop Turrets

### Example: Flipping Flop Turrets

This example demonstrates how circuits with high baseline power consumption but a lower Active Usage may be more efficiently powered by Root Power directly, rather than through a battery.

In this setup, a group of six Auto Turrets is powered for a period of time, then turned off while a second group of six turrets is powered. The system flips between these two groups using a Memory Cell, creating a rotating turret defense that stays under the turret interference limit while extending coverage.

A Timer triggers the Memory Cell to flip outputs every X seconds, alternating power between the two turret groups. If a turret in the active group locks onto a target, its Has Target output disables the timer, freezing the cycle until the threat is cleared. This ensures defense presence is maintained without flipping turrets unnecessarily during a raid.

The structure of this circuit is built from two mirrored groups:

- Memory Cell Output or Inverted Output → Electrical Branch 1 (set to 3)
  - Branch Out → Blocker (used to disable the timer system if any turret has an active target)
  - Power Out → Electrical Branch 2 (set to 11)
    - Branch Out → Turret 1
    - Power Out → Electrical Branch 3 (set to 11)
      - Branch Out → Turret 2
      - Power Out → Electrical Branch 4 (set to 11)
        - Branch Out → Turret 3
        - Power Out → Electrical Branch 5 (set to 11)
          - Branch Out → Turret 4
          - Power Out → Electrical Branch 6 (set to 11)
            - Branch Out → Turret 5
            - Power Out → Turret 6
- All Has Target outputs → OR Switch network → Block Passthrough input on Blocker
- Blocker Input → Power from Electrical Branch 1 (Branch Out)
- Blocker Output → Splitter
  - Power Out 1 → Timer
  - Power Out 2 → Timer Toggle
  - Power Out 3 → Blocker (which controls SET/RESET of Memory Cell)

When the Splitter receives power, it triggers the Timer and blocks the Blocker. When the Timer ends, it sends power through the final Blocker to SET or RESET the Memory Cell, flipping turret groups.

**⚡ Solving For Efficiency**

This turret system needs 69rW to function. 60rW is used to power the six turrets, while the remaining 9rW supports the logic that flips turret groups back and forth. That includes the Memory Cell, Timer, OR Switches, and Blockers.

If a player powers this setup with a Bypass Battery Backup, the logic will need Root Power to function, the full 69rW must be produced and supplied at all times. The battery is bypassed entirely, and while this means there’s no charging overhead, it also means no potential savings. Every bit of Root Power must be generated.

On the other hand, an Inline Battery Backup changes the equation slightly. Here, the battery only “sees” the six turrets and registers 60 Active Usage, and because batteries are only 80% efficient, the battery now needs 75rW of input power just to break even.

Even though the logic portion doesn’t create any Active Usage, the battery still needs more Root Power than the bypass setup, about 6rW more, just to hold its charge. That’s not a huge difference on its own, and might be with the cost for an additional 6 hours and 40 minutes of uptime, but this system is designed to scale. If each group was to be increased to 10 or more turrets, and powered by batteries, the gap grows by 25rW or more and that’s significant.

This is a perfect example of when produced Root Power is the better choice. When a circuit’s power demand is primarily functional (e.g., Auto Turrets), there is little efficiency benefit to routing power through an Inline battery. Offloading control logic to a battery works best when that logic makes up a larger portion of the circuit’s power cost. This is not one of those cases.

- Produced Power is ideal for direct-use, high-drain components.
- Inline batteries should be reserved for circuits that benefit from Active Usage scaling or Control Power offloading.

When logic overhead is low and component demand is high, Root Power offers better scalability and efficiency. Not every system benefits from leveraging Control Power or Inline backups. Sometimes, direct Root Power is the smartest approach.
