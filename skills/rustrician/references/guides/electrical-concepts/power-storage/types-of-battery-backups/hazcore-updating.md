# Electrical Concepts: Power Storage › Types of Battery Backups › HazCore (Updating)

#### HazCore (Updating)

**About the Name

**HazCore is named after Hazdr, who helped popularize the design through practical use and iteration. In some communities this core is also known as a CPD (Central Power Distributor).

The **HazCore** is a Decentralized Nih Core that follows a very specific design philosophy. This means it is a bypass backup that supplies connected circuits with Root Power from the main power source most of the time, using the excess to charge decentralized batteries. When main power enters periods of low power production, the batteries will take over and the insufficient amount of power gets redirected towards the batteries slowing their discharge.

What makes this design a HazCore is how explicit it is in 3 key areas:

- How much power gets allocated per circuit or subsystem.
- What power bus is used to distribute the Root Power to each circuit or subsystem.
- What power bus is used to charge the batteries with the excess power.

**✅ Benefits**

- Combines centralized power efficiency with decentralized backup resilience
- Guarantees fixed, predictable Root Power delivery per circuit
- Prevents over-allocation by hard-limiting circuit size
- Prevents total system failure by decentralizing battery backups
- Extends backup runtime from roughly 4 hours to roughly 8 hours per circuit using large batteries
- Automatically redistributes charging power if a battery is destroyed
- Scales cleanly as subsystems are added or removed

**❌ Limitations**

- Requires strict adherence to 50rW per circuit
- More components than a basic Nih Core
- Higher planning overhead during initial design
- Inefficient if used for very small or low-importance circuits
- Not designed for use with large, shared battery banks

**How It Works**
