# Electrical Concepts: Power Theory and Efficiency › Basic Dive into Modern Active Usage and Power Consumption

### Basic Dive into Modern Active Usage and Power Consumption

**When defining Active Usage, it says:**

- Active Usage is always Consumed Power, but Consumed Power is not always Active Usage.

Let’s break down what this means with two clear demonstrations.

**⚙️ Active Usage is Always Consumed Power**

Take an Auto Turret that is powered, has locked onto a target, but is out of ammo. To use any of its three outputs (Has Target, Low Ammo, No Ammo), it must be given 11rW, 10rW for the turret itself and 1rW for output functionality.

Internally, the turret generates 2rW of Free Power (1rW from 2 outputs if given 11rW). If all three outputs are connected to Industrial Lights, each light will consume 1rW and create 1 Active Usage.

If this setup is powered by a battery, the total Active Usage shown will be 13:

- 10rW for the turret
- 1rW for the first light
- 2rW from the lights consuming the free power

Even if the turret is powered through an Electrical Branch set to 11rW, the result is the same. The turret still generates 2rW of Free Power. The Electrical Branch limits the flow of power to the turret, but it does not limit the Active Usage passed back to the battery. So, the battery still shows 13 Active Usage, despite consuming only 11rW from the branch.

This shows that Active Usage is always tied to power being consumed, even when that power is created internally.

**⚠️ Consumed Power is Not Always Active Usage**

Now consider a SAM Site configured to "Attack All," with a Smart Switch controlling its Invert Mode input.

- The SAM Site itself requires 25rW.
- The Invert Mode input (to switch behavior) requires 1rW.

So, in total, the setup consumes 26rW. However, when powered by a battery, only 25 Active Usage is shown. This happens because the 1rW sent to Invert Mode is consumed but does not contribute to Active Usage. The battery doesn't count that part of the load, even though it's necessary for the circuit to function correctly.

**This illustrates the second half of the principle:** Power can be consumed by a components auxiliary inputs without generating Active Usage, which is why it can also be said when defining Consumed Power that Consumed Power includes all energy used for functionality, regardless of whether or not it registers as Active usage on a battery.

To dive deeper into the different power types, how they interact with each other and how players can leverage one against another, the following examples are used to help demonstrate what players should be considering when designing a circuit or selecting a battery backup.
