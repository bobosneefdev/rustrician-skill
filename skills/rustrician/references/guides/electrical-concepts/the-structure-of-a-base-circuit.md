# Electrical Concepts: The Structure of a Base Circuit

## The Structure of a Base Circuit

Designing electrical circuits in *Rust* begins with understanding that all base circuits, no matter their size or complexity, follow the same core framework. Every circuit is built from **four main stages**, with an **optional fifth** that enhances monitoring and reliability. These stages form the structural foundation for nearly every electrical setup used in a base.

There are **four main stages**, plus an **optional fifth** that can be added when needed:

- **Power Source**
- **Battery Backup**
- **Distribution**
- **End Devices / Circuits**
- *(Optional)* **Component Destruction Detection**

To help illustrate how these parts connect, refer to the visual flowchart:

**Power Source**

This is the starting point of Root Power and the foundation of nearly all circuits. Without a source, nothing else functions. Although not all systems require Root Power directly, it remains the backbone of every sustained and efficient electrical network.

Available power sources include:

- **Wind Turbine** – Ideal for elevated bases with consistent output
- **Solar Panel** – Suited for daytime use and roof-based installations
- **Small Generator** – Fueled by Low Grade Fuel, dependable but requires maintenance
- **Test Generator** – Available only in creative mode

**Battery Backup**

After generating power, stability and redundancy becomes essential. A Battery Backup ensures circuit uptime by compensating for dips in power generation or temporary failures.

Options include:

- **Inline** – Directly powers circuits and recharges with surplus power
- **Bypass** – Activates only when Root Power is lost or insufficient
- **Direct Delivery** – Power can be routed directly to circuits without a battery, though this is not recommended for most use cases due to lack of redundancy

💡 **Tip**: Even a small battery can extend circuit uptime significantly.

**Distribution**

Once power is stabilized, it must be distributed to the appropriate systems and devices. Distribution is responsible for organizing how power is delivered from the Battery Backup to the rest of the base — including all logic, defense, automation, and utility circuits.

**Common methods:**

- **F-Bus** – Fixed outputs using Electrical Branches
- **D-Bus** – Dynamic load balancing with Splitters
- **C-Bus** – Configurable distribution via Memory Cells
- **H-Bus** – Hybrid logic for intelligent routing
- **Other Buses** – Including specialized and modular variations

The choice of distribution affects circuit responsiveness, power prioritization, and automation capabilities.

**End Devices / Circuits**

This stage contains the **functional goals** of the circuit — the systems that perform work or fulfill a specific purpose. These can include individual components or complete mini-circuits made up of sensors, logic, and supporting elements.

An end circuit is any configuration designed to perform a defined task, such as defense, automation, or environmental control.

**Examples include:**

- **Auto Turrets** with logic for flipping or authorization control
- **SAM Sites** with condition-based toggles
- **Interior and Exterior Lights** tied to time or occupancy sensors
- **Industrial and Water equipment** like **Conveyors** and **Water Pumps**, activated by conditions
- **CCTV Cameras** with selection and activation logic
- **Door Controllers** within secure access systems

These circuits determine the power demands of the base and inform design decisions upstream.

⚠️ **Tip**: Plan each end circuit as a small system. Knowing its components, logic, and power needs helps shape the entire base's electrical design.

**Optional: Component Destruction Detection**

Component Destruction Detection is used to monitor for problems in the circuit, such as:

- Destruction of downstream components
- Addition or removal of a component
- Changes to Electrical Branch values

This detection can be placed anywhere after the Power Source. A common placement is immediately after the Battery Backup for early warning and centralized monitoring.

With this structure in mind, circuits can be broken down into logical, manageable parts. Planning starts from the desired end devices and works backward to ensure the appropriate infrastructure is in place.
