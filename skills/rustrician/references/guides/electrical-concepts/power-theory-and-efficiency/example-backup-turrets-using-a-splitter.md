# Electrical Concepts: Power Theory and Efficiency › Example: Backup Turrets Using A Splitter

### Example: Backup Turrets Using A Splitter

This example demonstrates how a circuit that consumes a lot of power can leverage Active Usage to reduce overall Root Power demand, especially when switching between Bypass and Inline battery backup strategies.

In this setup, there are six Auto Turrets, each with its own backup turret hidden behind a door. When a turret is destroyed, a Door Controller opens the door and secondary turret powers on. This is achieved using the Splitter’s ability to redistribute power when an output is disconnected.

The structure of this circuit is built from two mirrored groups:

- Each group uses 1 Splitter to feed 3 additional Splitters.
- Each of those three outputs connects to:
  - Output 1: the primary Auto Turret
  - Output 2: an Electrical Branch set to 10
    - Branch Out powers the secondary Auto Turret
    - Power Out opens the Door Controller

Each group of turrets needs 57rW to function. Each of the 3 local Splitters receive 19rW. When splitting unevenly, Splitters distribute power with Output 1 prioritized over 2 and 3. 10rW is sent to the primary turret, and 9rW is passed to the Electrical Branch. Since the branch is set to 10, the secondary turret remains off because of insufficient power. When the primary turret is destroyed, the full 19rW flows to the Electrical Branch, activating the backup turret and opening the door.

This system powers 6 turrets + 6 backups = 12 turrets total, with a continuous demand of 114rW to keep all logic and primary turrets running.

**⚡Solving For Efficiency**

If powered using a BCN Core or similar Bypass battery backup, the full 114rW must be reserved at all times. That’s a significant amount of Root Power allocated just for turret logic and failover behavior. To get more than 100rW of power using an Inline Battery backup, like the Kore, 2 batteries would need to be combined and that is never recommended. So what's the solution?

Break the circuit into 2 parts and use two Large Batteries instead. One for each group of 3 turrets. The Active Usage per battery is only 30 (10 per active turret). The remaining 27rW used for logic is classified as Control Power and does not register Active Usage. Each battery, with 30 Active Usage, requires only 38rW of input to stay neutral. Using two batteries, this entire system can be maintained with just 76rW of Root Power instead of 114rW, a 33% savings.

- This example illustrates how introducing inline batteries, even when using a Bypass backup like the BCN Core can result in lower Root Power production requirements.

A bypass backup can benefit dramatically by adding an Inline Secondary battery backup. By placing a battery between the BCN Core’s distribution grid and the turret system, all the power that needed to be reserved for logic is offloaded onto the battery for free because it is Control Power and Control Power does not generate Active Usage. Not only is this a 33% reduction in Root Power requirements, it also added a 325% bonus in battery backup time. After the 4 hours of primary backup power, these turrets will have an additional 13 hours of backup time. This is a huge gain in efficiency.

This demonstrates the power of leveraging a battery to take advantage of Active Usage and Control Power. The more complex and logic driven systems are, the larger the benefit can be by taking advantage of Active Usage and offloading logic control to Control Power.
