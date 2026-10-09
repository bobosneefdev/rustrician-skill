# Electrical Concepts: Power Storage › Types of Battery Backups › Secondary Battery Backup

#### Secondary Battery Backup

A **Secondary Battery Backup** provides an extra layer of protection for a base's most critical circuits after the primary backup system fails. It acts as a backup for the backup making it rarely used, but essential when needed.

Although the chances of needing a Secondary Backup on a typical day are extremely low, the benefits can outweigh the added costs. Installing them provides a way to use excess power after the primary batteries are full, while adding critical redundancy to base defenses.

There are two versions of Secondary Backups, the Secondary Inline and the Secondary Bypass. Both can be integrated into any part of a circuit, but they are ideally used to protect smaller, high-priority sections. The type of primary backup in use will influence which secondary method is best suited.

With an Inline Primary Backup, a Secondary Bypass is preferred. With a Bypass Primary Backup, either Secondary Inline or Secondary Bypass can be used, but depending on the attached circuit, one of the two methods will always be more efficient over the other.

**✅ Benefits**

- Simple to make with minimal components.
- Great for creating redundant backups while improving decentralization within a centralized circuit.
- Adds extra survivability to bases without major cost after setup.
- No flicker of power when switching onto the backup.
- Efficient use of otherwise wasted power after primary backups are charged.
- No limitation to the number of secondaries that could be added.
- Secondary Inline can be leveraged over Root Power to increase efficiency in some use cases.

**❌ Limitations**

- Secondary Inline systems introduce a 20% efficiency loss.
- Secondary Bypass batteries should be fully charged before installation, else a recharging solution is needed.
- Adds more wiring complexity when integrating into existing circuits.
- Secondary Bypass backups require precise Electrical Branch configuration for proper failover.
- Requires a good understanding of Power Theory to understand when a secondary could be used to leverage power and increase efficiency.

**How It Works**

A Secondary Battery is designed to sit between a player's primary battery backup and a sub-circuit. There are 2 different methods, each with their own use case and functionality.

- **Secondary Inline Backup**
  - A battery is installed inline between the circuit's power source and the circuit itself.
    - **Image Example:** The Auto Turret is the circuit needing power and the Electrical Branch is its source of power.
  - The Electrical Branch will need to send just enough power to the battery to maintain a neutral charge. In this case it's 13rW to maintain the 10 Active Usage caused by the Auto Turret.
    - Due to the battery’s efficiency tax, this is a 20% efficiency loss and would not be recommended. Use a Bypass Secondary instead.
  - If the connected circuit was not an Auto Turret but a circuit where 20% or more of the power consumed did not generate Active Usage, efficiency gains can be dramatic.
    - **Image Example:** This is an example of a simple backup turret. When the one that's on is destroyed, the Splitter will redistribute power to turn the second one on. The thing to note is that it requires 19rW to make this circuit function, but only 10 Active Usage is generated. If the primary backup was providing Root Power, having to reserve 19 is a lot and a waste of power. Adding the inline here saves 6rW, a 31% increase in efficiency.
    - Combining this efficiency hack with a Secondary Bypass is not uncommon.
- **Secondary Bypass Backup**
  - An OR Switch is installed inline between the circuit’s power source and the circuit itself.
    - **Image Example: **The Auto Turret is the circuit needing power and the Electrical Branch is its source of power.
  - The source Electrical Branch only needs to send the amount of power the circuit needs to Input A on the OR Switch to be passed on to power the circuit.
  - A fully charged battery is connected to its own Electrical Branch with Branch Out connected to Input B of the OR Switch.
    - The branch value but be equal to the amount of power on Input A.
  - The OR Switch prioritizes power from Input A when both inputs receive the same amount of power. This allows the battery to sit idle and not drain unless the primary backup system fails.
  - Fully charged batteries are recommended to avoid having to install a charging system. This makes Secondary Backups cheaper to design, build and maintain. However, the NEXUS is a recharging solution players can explore.

**Important Wiring Behavior:**

- For a Secondary Bypass Backup, set both Electrical Branches (Main and Battery) to provide the exact amount needed (e.g., both set to 10rW for an Auto Turret).
- Secondary batteries should be pre-charged before being installed to avoid extremely long charging times in case of emergency.

**Power Flow Logic**

- **Secondary Inline Backup:**
  - Source of power → Inline Secondary Battery → Circuit that needs power
  - The battery is always active. Primary power needs to be enough to maintain the charge.
- **Secondary Bypass Backup:**
  - Source of power → Electrical Branch → OR Switch Input A → Circuit - The bypass route
  - Secondary Battery → Electrical Branch → OR Switch Input B → Circuit - The backup route
  - Main power takes priority. The battery remains idle unless the primary backup fails.

**Design Considerations**

- **Choose the right type:**
  - Players need a solid understanding of Power Theory and a working knowledge of the different types of power.
  - Use Secondary Inline backups whenever 30% or more of the circuits consumed power does not generate any Active Usage.
  - Use Secondary Bypass backups whenever it would require more power from the source then the circuit consumes to function.
  - Avoid stacking Primary Inline Backups + Secondary Inline backups due to excessive inefficiency. Stacking Inline backups only compounds the 20% efficiency loss and if not properly regulated.
- **Pre-charge the batteries:**
  - Charging a Large Battery with 1rW takes over 800 hours (34 days).
  - Pre-charging with 400rW can fully charge a Large Battery in about 75 minutes.
  - A battery’s max input = Output x 4
  - Installing fully charged batteries helps to mitigate a couple issues:
    - With Inlines, it prevents the need for players to increase the power they give to it at the start, and then forcing them to return later to reduce it.
    - With Bypass, it prevents the need for players to design and build a charging system for them. The goal is that if they are ever used, it’s a last resort, so how much effort is it worth?
  - If precharging is unattractive or not possible, increase the amount of power to the inline and build a charging system for the bypass.
- **Controlling Electrical Branch Values:**
  - For Secondary Bypass backups, ensure both inputs on the OR Switch are receiving the same amount of power to prioritize the primary power source over the backup.
  - Only set enough power to meet actual device needs and avoid unnecessary surplus.
  - For Secondary Inline backups, do the math on the Active Usage and give it only exactly what it needs to remain as efficient as possible.
- **Root Combining Secondary Batteries:**
  - When trying to combine multiple batteries, adding too many components between the Power Source and a Root Combiner can trigger the Max Depth wiring error. The depth at which a Secondary Backup will be used will exceed this limit. This should be avoided to prevent wiring headaches and stick to single battery solutions only.
- **Material Cost vs Survivability:**
  - Extra batteries and OR Switches increase material cost and require the additional space and time to install.
  - Yes, they offer massive uptime gains after system-wide failures, but what are the chances they will be needed, and does the player have the space to properly separate components?
