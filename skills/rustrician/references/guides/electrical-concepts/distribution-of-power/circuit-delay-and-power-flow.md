# Electrical Concepts: Distribution of Power › Circuit Delay and Power Flow

### Circuit Delay and Power Flow

Rust evaluates power via queues. This section covers two effects of queue‑based execution:

- **Circuit delay:** How long changes take to propagate.
- **Power flow:** The order in which devices act when supply changes.

Exact timings depend on server hardware and workload, so this section will describe relative behavior rather than talking in terms of fixed milliseconds.

#### Circuit Delay

Rustricity, aka Electricity, Fluid (water), and Industrial each maintain their own queue. Each queue is single threaded and therefore actions are handled one after another. The more items in a queue the greater the delay increases. The host machine’s hardware and workload determine how quickly these queues advance.

**Circuit delay** is specifically the time it takes components to receive, process and react. Under perfect conditions, each of these steps could be measured in single digit microseconds, but when considering all the other tasks that need CPU time, it is possible for a queue to become overwhelmed turning microseconds into milliseconds and even actual seconds. Turning things off is often faster than turning things on and a practical way to observe this delay is to pulse a chain of as many lights as possible and watch how long it takes for the chain to turn on and off.

To better conceptualize delay without using an absolute measurement of time, let’s call each advancement of the queue an Operational Step. It’s a relative unit, a movement through the queue, a component receiving power, a component processing the power, a component sending out power, not a fixed number of micro or milliseconds:

- **Pass-through Components:** Such as lights, have a single Input and Passthrough, or Power Out, and process at similar speed. From the moment a light receives power, turns on and sends power out is = 3 Operational Steps. Two lights in series = 6 Steps, three lights = 9 Steps.
- **Multi‑Output Devices:** Advance one additional step per output stage.
  - **Splitter:** Has 3 outputs and each is served one at a time. From input, dividing the power and the last output sending power = 5 Operational Steps.
  - **Electrical Branch:** Has 2 outputs where Power Out is served first, then Branch Out served second, but has to process how much power to reserve = 4 Steps.
  - **Memory Cell:** Has 2 outputs and must ensure its in the correct state = 4 Steps.

**Multi‑Input Devices:** Evaluate one input change at a time.

- **OR**, **XOR**, **AND**, and **Root Combiner** consume 2 operational steps when an input changes state. If two inputs change, they will consume 3 Steps across those changes.

As players begin building their circuits, expanding them to hundreds of components, the server ends up trying to work through thousands of components. Work only advances one step at a time through these queues, so the longer the chains, and more active the devices, will actively increase observable delay.

#### Power Flow

**Power flow** is the path electricity takes through a circuit and the order in which it happens. Due to the nature of rustricity, executing one operation at a time, the game establishes a deterministic order. What turns on first, what turns off first, and how multi‑output devices stage their outputs.

An easy way to visualize flow is to build a simple chain of lights. With a Switch feeding four lights in series, turning the Switch on powers Light 1, then Light 2, then Light 3, then Light 4. Turning it off removes power in the same order.

When players start working with components that have **multiple outputs**, it's very important to know the order in which they output power.

- **Electrical Branch:** Power Out updates first, then Branch Out. Removal of power follows the same order.
- **Splitter:** Power Out 1 updates, then Power Out 2, then Power Out 3. Removal follows the same order.
- **Memory Cell:** When switching from one output to the other, Output always reacts before Inverted Output. If the Memory Cell is in its default state (power coming from Inverted Output) and receives a pulse on Set, the Output will start sending power before Inverted Output stops sending power. If a pulse is then applied to Reset, the Output will stop sending power before the Inverted Output starts sending power. This means that when toggling states, there is a brief moment where both outputs will be active or inactive simultaneously before settling into the final state.

When **multi‑output devices** are used together, these per‑device rules compose into a predictable sequence. For example, an Electrical Branch connected to Splitters will update its outputs before any downstream Splitter updates its outputs, producing a numbered order through the chain, 1 - 8. This is both the order each output starts and stops outputting power.

The Memory Cell acts similarly to the Electrical Branch. 1 output will react before the other, the only difference is 1 output is losing power while the other is gaining power. Starting in the default position and flipping power from the Inverted Output to the Output, the process flow like this:

1 - Output will send out power first.

2 - Inverted Output will lose power next.

3, 4 and 5 - Will send out power one at a time in order, followed by

6, 7 and 8 - Losing power one at a time, in that order.

The order of operation is the exact same when flipping power back over to Inverted Output from Output.

When players start working with components that have **multiple inputs**, it's very important to know the order of reception (which input must be powered first). Some devices are agnostic to which input is powered first and others require the main input before any other input before changes will be recognized.

**Agnostic to input order:**

- **Memory Cell** - It doesn't matter if the side inputs or the main input gets power first. Once the main input receives power, it will put itself into the correct configuration based on what side inputs are receiving power.
- **Counter** - Sending power to the side inputs, it will count up or down and clear with no power provided to the main input. Only once power is provided to the main input will the screen turn on to display the number. If the number shown is the same as the target number, power will be sent through.
- **RAND Switch** - Sending power to the side inputs will Set and Reset the RAND Switch with no power provided to the main input. Only once power is provided to the main input will power pass through or not depending on the state of the switch. The side inputs only react when they are provided with power. Having constant power on them when the main power is removed or received will not affect the switch and it will remain in the same state.
- **Blocker** - Sending power to the side input before sending power to the main input will block power from passing through. However, if power is sent to the main input first and the very next operation sends power to the side input, it should still block power from passing through. If the delay between sending power to the main input then to the side input is long enough, power will get sent through before it gets blocked.

**Requires main input first:**

- **Conveyor** - If players want to use the secondary inputs to turn the conveyor on or off, power must be sent to the main input first. If power is sent to the secondary input first, when the main input receives power, the conveyor will remain in whatever state it was in before the main input lost power.
- **Timer** - If players want to use the secondary input to toggle the timer on, power must first be sent to the main input. If power is sent to the secondary input first, when the main input receives power, the timer will not toggle on. This is the best component to use when troubleshooting a suspected power flow issue.
- **Boom Box** - If players want to use the secondary input to toggle the boom box on to play music, power must first be sent to the main input. If power is sent to the secondary input first, when the main input receives power, the boom box will not toggle on and not play music.
- **Elevator** - If players want to use the secondary inputs to call the elevator to a floor, power must first be sent to the main input. If power is sent to the secondary inputs first, when the main input receives power, the elevator will not be called to a floor.

That covers how power flow is shaped by components with multiple outputs and how some components will function or not based on the order power is received. It was also briefly discussed how flow is structured when multiple components get connected, but this next part is going to further expand on that. What you are looking at is an **outdated** Nih Core. It still works but you are not going to build this version today because the modern version is better and faster. However, for our purposes here, it can still be used to demonstrate power flow through a complex circuit. One thing to note is the Splitter. I cannot explain why other than the belief that outputs, like the Memory Cells Output, have a higher priority allowing it to interrupt another component's process.

The left side shows the order of operation when switching from battery backup to windmill power.

**Main Power:**

- The amount of power coming into the Nih Core rises above 106.
- Power is sent out Power Out to the next Electrical Branch.
- Power coming out of Branch Out to the Memory Cell rises to its set amount.
- Power is sent out Power Out to the OR Switch.
- Power is sent out Branch Out to the Splitter.
- Power is sent out to the Large Battery.
- Power is sent out to Set on the Memory Cell.
- Power is sent out the Memory Cells Output.
- Power is sent out to Reset on the Memory Cell.
- Power is sent out to Block Passthrough on the Blocker.
- Power stops coming out of Inverted Output on the Memory Cell.
- Power stops coming out of Power Out on the Blocker.
- Power from the Memory Cells Output is now the power passing through the OR Switch.
- The battery enters its Off state.

The right side is the order of operation when switching from windmill power on to battery backup.

**Battery Power:**

- The amount of power coming into the Nih Core drops below 106 triggering the flip but must drop below 101 for it to look like the example pictured.
- Power stops coming out of Branch Out to the next Electrical Branch.
- Power coming out of Branch Out to the Memory Cell drops below its set amount.
- Power stops coming out of Power Out to the OR Switch.
- Power stops coming out of Branch Out to the Splitter.
- Power stops coming out of the OR Switch to the Large Battery.
- Power stops going to Set on the Memory Cell.
- Power stops coming out of the Memory Cells Output.
- Power stops going to Reset on the Memory Cell.
- Power stops going to Block Passthrough on the Blocker.
- Power is sent out the Memory Cells Inverted Output.
- The battery enters its On state and sends power out to the Blocker.
- Power stops coming out of the OR Switch.
- Power is sent out the OR Switch to the Large Battery.
- Power is sent out the Blocker to the OR Switch.
- Power is sent out the OR Switch.

#### Summary

Queue-based execution is central to how Rust processes electrical, water, and industrial systems. Circuit delay emerges from the one-step-at-a-time progression of each queue, while power flow reflects the precise order in which components evaluate their inputs and update outputs. By understanding Operational Steps, output sequencing, and which components require main input first, players can predict and control the behavior of even the most complex circuits.
