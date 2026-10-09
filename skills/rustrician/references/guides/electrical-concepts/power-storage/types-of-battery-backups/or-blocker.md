# Electrical Concepts: Power Storage › Types of Battery Backups › OR/Blocker

#### OR/Blocker

The **OR/Blocker** Battery Backup is one of the earliest and previously most well-known battery backups in Rust. Often mistakenly called "Infinite Power Loop", this circuit dates back to Rust’s 2019 electrical system, where batteries could either charge or discharge, but not both. In that era, batteries lacked Active Usage tracking and always pushed out maximum power. The so-called "Infinite Power Loop" was a real exploit back then, just not this one. This circuit simply offered the first bypass battery backup, not unlimited power.

Today, the OR/Blocker method may be obsolete, but it can still function as a basic bypass battery backup, where the main power source feeds the circuit, and excess power charges the battery. When the main power source fails or drops too low, the system automatically switches to battery power to keep everything running. While considered outdated due to newer mechanics, the OR/Blocker can still be found in use today.

**✅ Benefits**

- Easy to build using minimal components
- It does work for centralizing power and battery backup for larger circuits.
- Was designed to support circuits 200rW and above using root-combined batteries
- Automatic switching without any player interaction

**❌ Limitations**

- Outdated logic that ignores modern battery mechanics allowing for simultaneous charging and discharging
- Uses outdated mechanics of the OR Switch requiring a Blocker. Today, the OR Switch has the ability to block the inactive input.
- Without modernization, it causes power flicker when switching from main source to battery
- Wastes power during battery discharge because main power continues flowing through the first Branch Out, but is no longer used.
- Not optimized for circuits under 100rW. Those are better served by an Inline Backup or The Kore.

**How It Works**

The OR/Blocker Battery Backup was the traditional bypass design where an attached circuit is normally powered by Root Power from the main power source. Excess power is used to charge a battery, which only activates when the main source drops below a usable threshold. A Blocker was used to prevent battery discharge during normal operation, while an OR Switch provides a seamless transition between main power and battery power during outages.

While this circuit today will get the job done, its structure does not take advantage of Rust’s modern electrical mechanics resulting in significant power waste during periods of low production.

The detailed logic and wiring order for this setup are outlined below.

**Power Flow Logic**

- **Main Power Source → Electrical Branch 1
- **Splits power into two directions:
  - Branch Out → OR Switch → Circuit
  - Remaining power → Electrical Branch 2
- **Electrical Branch 2**
  - Branch Out: Sends 1rW to the Blocker to keep the battery output blocked
  - Remaining Power: Sent to the battery to charge it
- **Battery → Blocker → OR Switch**
  - Battery is prevented from discharging while the Blocker is powered
  - When Blocker loses power, battery output flows to the OR Switch and powers the circuit

The nature of this system reserves power for the main circuit with the first Electrical Branch. That power during low production periods of time is just sitting there getting wasted. At the time, a flicker was caused but could be mitigated by modifying the system but at best, that will make this setup better suited as a secondary battery backup, which is covered in its own section.

**Design Considerations**

- It was designed for high-demand, centralized circuits.
- Works best when paired with multiple root-combined Large Batteries, allowing for 200rW or more to be delivered.
- The Splitter is the best way to get as close to even charging across all batteries.
- **Active Usage is irrelevant. **This setup was designed to get around the batteries single state design, but today it could be used as just another bypass backup. Bypass backs should only be relying on the batteries less than 20% of the time allowing players to ignore any Active Usage considerations.
- **The minimum runtime** of the battery would be 4 hours, assuming it has a full charge and an Active Usage of 100.
- **It was not recommended for circuits under 100rW.** There are simpler and more efficient options like the Inline or Kore which are preferred.
- **This circuit only serves as a stepping stone** toward more advanced bypass backups like the Nih Core, which are capable of recovering the wasted power and preventing flicker while offering sustained, dynamic backup behavior.
