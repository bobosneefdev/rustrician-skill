# Electrical Concepts: Power Theory and Efficiency › Where Past Meets Present

### Where Past Meets Present

Now that the different types of power have been defined, the next step is to demonstrate how they interact and how misunderstanding these interactions can lead to inefficient circuit design and wasted electricity.

Historically, this section was called Active Usage vs Power Consumed and focused on the debate between Electrical Branch vs Splitter and the behavior of the Root Combiner. In earlier versions of Rust's electrical system, every component consumed power and generated Active Usage, even when turned off. Players needed to understand these mechanics to build power-efficient circuits, especially when selecting between Inline or Bypass Battery Backups.

Today, things are different. Most components no longer consume 1rW just for being connected, and Active Usage is only registered when a component is both powered and in use. This shift dramatically reduces baseline power requirements for most circuits but understanding how power is handled is still just as important.

**⚖️ Electrical Branch vs Splitter Debate**

In the past, comparing the **Electrical Branch** to the **Splitter** was central to understanding efficiency. Every component consumed 1rW and generated Active Usage, and the way those two components handled power had significant differences — especially with inline battery setups. Today, while most components no longer consume power for themselves or generate Active Usage by default, the legacy of that comparison still matters.

**⚡ Electrical Branch**

**Old Behavior:**

- Consumed 1rW for itself
- Registered 0 Active Usage for itself
- Forced Active Usage based on its Branch Out setting
- Blocked the Active Usage of downstream components (like turrets)

If players set the Branch Out to 10rW for an Auto Turret, the battery would see 10 Active Usage regardless of what was connected beyond it. This made Electrical Branches a popular choice for minimizing visible Active Usage, even if actual consumption was higher.

**Example:**

- 8 Electrical Branches each set to 10rW powering 9 turrets =
- 98rW consumed, 90 Active Usage.

**Today:**

- Consumes 0rW
- Has 0 Active Usage
- Does not force Active Usage based on Branch Out
- Does not block downstream Active Usage

Now, components connected to Branch Out must be powered on and actually consuming electricity in order to register any Active Usage. The branch simply limits the amount of power available — it no longer masks what’s happening after it. This makes the branch better suited for setting fixed power levels, not for reducing battery draw.

**Example:**

- 8 Electrical Branches each set to 10rW powering 9 turrets =
- 90rW consumed, 90 Active Usage

**🔀 Splitter**

**Old Behavior:**

- Consumed 1rW for itself
- Registered 1 Active Usage
- Divided input power evenly between its 3 outputs but discarded any odd amounts of power
- Did not dynamically adjust if outputs were destroyed

Players using 4 Splitters to power 9 turrets would have 94 Active Usage, and 94rW consumed. Compared to Electrical Branches, the Splitter cost 4 extra rW more drain to the battery.

**Today:**

- Consumes 0rW
- Has 0 Active Usage
- Divides input power evenly between its 3 outputs and adds any odd amounts of power to Outputs 1 and 2
- Redistributes power dynamically if an output is lost

Modern Splitters are highly efficient in the same 9-turret setup:

4 Splitters = 90rW consumed, 90 Active Usage

**🧠 Final Thoughts**

Today’s Electrical Branch vs Splitter discussion is no longer about which one uses less power, but rather:

- Which combination of components costs the least amount of resources? 8 Electrical Branches for 9 outputs is 600 Metal Fragments vs 4 Splitters for 9 outputs is only 400 Metal Fragments
- Do you need fixed power distribution with prioritization? → Use Electrical Branch
- Do you need an equally divided distribution that dynamically adjusts? → Use Splitter

Both components have zero overhead now, so the choice comes down to material cost and control vs flexibility. Understanding how they route power, how that interacts with Active Usage and how power is consumed remains essential for smart circuit design.
