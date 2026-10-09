# Logic 101 (Needs Work)

This section should dive into logic gates and how to use them.

We need to discuss and show things like encoders and decoders. Shift Registers and Memory. Half-Adders, Adders, and the rest of subtraction, multiplication and division. Discussions on Flip-Flops. The logic behind probabilities.

🔐 Encoders & Decoders

Overview

Encoders and decoders convert signals between binary-coded values and one-hot (one-line-at-a-time) signals.

Decoder: Converts binary input into exactly one active output line

Encoder: Converts one active input line into binary output

These circuits appear in memory addressing, instruction decoding, multiplexing, display scanning, and input processing.

🎚 Decoder (Binary → One Active Output)

A decoder has n binary inputs and 2ⁿ outputs. Only one output is asserted at a time (one-hot).

Example: 2-to-4 Decoder

Inputs: A, B

Outputs: O0, O1, O2, O3

Truth Table

A B O0 O1 O2 O3

0 0 1 0 0 0

0 1 0 1 0 0

1 0 0 0 1 0

1 1 0 0 0 1

Boolean Expressions

O0 = ¬A ⋅ ¬B

O1 = ¬A ⋅ B

O2 = A ⋅ ¬B

O3 = A ⋅ B

General Formula

For an n-to-2ⁿ decoder:

Output k = 1 when Input = binary(k); otherwise 0

A decoder can be made with simple AND gates and NOT gates like in the picture below.

as an extra note when looking at wiring diagrams visualize the dot connections in the wire as branches or splitters for RUST purposes.

Decoders can also be made by using other methods such as using the weighted sum of the input power. We can do this by setting up the input voltage levels to be the amount equal to the binary weight of that position. For example, from right to left switch 1 would be 1 RUST watt, switch 2 would be 2 RUST watts, switch 3 would be 4 RUST watts… and so on. For example you can reference the circuit in the link below or you can reference this video guide on how to make them which goes over the wiring of both digital and analog decoders step by step. If you are on the rustrician server you can also do (/paste 2to4decoders) to interact with a copy of the circuits.

2to4 decoder - <https://www.rustrician.io/?circuit=955cce153e1cc9f59027f7bb87779d7b>

3to8 decoder - <https://www.rustrician.io/?circuit=f540899e6a6d3c16e9410aa6b669dda1>

<https://www.youtube.com/watch?v=fz_Fc0GVo0U>

🎛 Encoder (One Active Input → Binary)

An encoder performs the inverse operation: it outputs the binary code corresponding to the position of the active input.

Example: 4-to-2 Encoder

Inputs: I0–I3 (only one is expected to be active)

Outputs: B1, B0

Truth Table

I3 I2 I1 I0 B1 B0

0 0 0 1 0 0

0 0 1 0 0 1

0 1 0 0 1 0

1 0 0 0 1 1

Boolean Expressions

B0 = I1 + I3

B1 = I2 + I3

(+ = OR, ⋅ = AND, ¬ = NOT)

Encoders can be made by using OR gates alone like in the picture below. All you have to do is just make sure to wire them to do the exact opposite a decoder would do. 1 input equals a combination of different outputs.

⚠ Priority Encoders

Standard encoders assume only one input is ever active. If multiple inputs may be active, a priority encoder assigns precedence.

Example Rule

If I3=1 → output 11

Else if I2=1 → output 10

Else if I1=1 → output 01

Else output 00

Priority encoders are used in interrupt controllers, bus arbitration, and input systems where the highest-order event must dominate.

Being that priority encoders add priority to which input is receiving power they are a little more complex to make than a regular encoder using a combination of OR, AND, and NOT gates like in the picture below.

🔁 Shift Registers

A shift register is a digital circuit that stores several bits (1s and 0s) and moves them one position every time the clock pulses. You can imagine it like a row of containers; each clock tick pushes whatever is inside each container to the next one. If it holds 4 bits, it has 4 storage positions, each storing a single 1 or 0.

What Shift Registers Are Used For

Shift registers are common in many digital systems because they are useful for:

• Converting data between serial (1 bit at a time) and parallel (many bits at once)

• Adjusting the timing of when signals appear

• Driving LED or pixel displays row-by-row or column-by-column

• Helping with communication systems such as UART and SPI

• Providing data buffering while other parts of a circuit finish working

• Creating patterns or random-looking sequences (with extra logic)

The Four Main Types

All shift registers store and move bits, but the way they accept and output data is different:

Type Meaning How it works

SISO Serial In → Serial Out Bits enter one at a time and exit one at a time

SIPO Serial In → Parallel Out Bits enter one at a time, but after shifting, the circuit outputs all stored bits at once

PISO Parallel In → Serial Out Loads all bits at once, then shifts them out one by one

PIPO Parallel In → Parallel Out Loads multiple bits at once and outputs them all at once

Serial = 1 bit per clock over one path.

Parallel = multiple bits transferred together.

SISO Example (Serial In → Serial Out)

Suppose we have a 4-bit shift register starting empty: 0000. Now we shift in these bits one at a time: 1, then 0, then 1, then 1. After each clock pulse, the stored value becomes:

Clock Stored Bits

Start 0000

1st bit = 1 0001

2nd bit = 0 0010

3rd bit = 1 0101

4th bit = 1 1011

So after four clock pulses, the shift register holds 1011. below is a link for a reference to how to make a Serial in Serial out shift register.

<https://www.rustrician.io/?circuit=cb640593c328c98e699f04f12028f9cd>

SIPO (Serial In → Parallel Out)

Same shifting idea as above, but instead of only reading the last bit, we read all bits at once after shifting. This is useful when a system receives data slowly but needs to use the entire value together, such as reading a complete number.

PISO (Parallel In → Serial Out)

This version has a load control. When load is activated, the register fills all positions at once. After loading, each clock pulse shifts data out one bit at a time. This is useful for sending multiple bits of information through a single connection wire.

Bidirectional Shift Registers

Some shift registers can move data in either direction, depending on a direction control signal. This is helpful for:

• Scrolling text or images

• Animation effects in displays

• Certain multiplication/division procedures in digital systems

Below is a link to a bi directional shift register like the one Philievers RUST used in his Tetris video. (this circuit is doesn't have some things hooked up to keep the website from lagging too much but it is color coded so you can see what goes where.)

<https://www.rustrician.io/?circuit=b4877e5c9fc0b16a087cfc6527d0e10d>

Universal Shift Registers

A universal shift register can:

• Load data all at once (parallel)

• Shift left or shift right

• Hold and do nothing (retain contents)

• Output data in serial or parallel form

Universal shift registers are very flexible and often appear in more advanced digital logic.

Common Real Uses

Shift registers are used in:

• LED/pixel display scanning

• Serial communication interfaces

• Keyboard and controller button scanning

• Delaying signals or buffering them

• Random pattern generators and security/encryption circuits (LFSRs)

One-Sentence Summary

A shift register stores bits and moves them one position each time the clock pulses, letting data enter or exit one bit at a time or all at once depending on the design.

➕ Half Adders & Full Adders (Binary Addition Logic)

Adders are circuits that let digital systems perform binary addition. They are the foundation of arithmetic units, counters, CPUs, ALUs, checksum systems, and many other logic designs. Binary addition works like normal addition, except each column can only be 0 or 1, and when a column exceeds 1, it produces a carry into the next column.

Half Adder (Adds two bits)

A half adder adds two single bits, called A and B, and produces:

• SUM → the result of the addition for that bit position

• CARRY → the overflow bit that moves to the next position

Think of it like adding two coins:

If you add 0+0 → sum is 0, no carry

0+1 → sum is 1, no carry

1+0 → sum is 1, no carry

1+1 → sum is 0, but carry is 1 because we exceeded 1

A B SUM CARRY

0 0 0 0

0 1 1 0

1 0 1 0

1 1 0 1

Key idea: SUM shows the bit for this position, CARRY tells the next column that we rolled over past 1.

(The logic behind it, only explained in words: SUM compares whether A and B are different, and CARRY only happens when both are 1.)

Full Adder (Adds A, B, and an incoming carry)

A full adder does everything a half adder does, except it also handles a carry input from a previous addition. It adds:

• A

• B

• Carry-in (Cin)

And produces:

• SUM

• Carry-out (Cout) → sent to the next bit position

This is how multi-bit numbers get added.

A B Cin SUM Cout

0 0 0 0 0

0 0 1 1 0

1 0 0 1 0

0 1 0 1 0

1 1 0 0 1

1 0 1 0 1

0 1 1 0 1

1 1 1 1 1

Behavior summary:

SUM flips whenever an odd number of inputs are 1.

Cout becomes 1 whenever two or more of the inputs are 1.

We can make full adders by wiring two half adders together like in the picture below.

Building Bigger Adders (Ripple Adders)

To add multi-bit numbers (like 4-bit or 8-bit values), full adders are chained together:

Bit0 FA → Bit1 FA → Bit2 FA → Bit3 FA → (etc.)

Carry-out from each stage becomes the carry-in of the next stage.

This is called a ripple carry adder, because the carry “ripples” through each stage. It is simple and common, though not the fastest when many bits are used.

There are different ways to make full adder not just by what's in the commonly used diagrams.

One example is by using the weighted sum of input voltage or RUST watts. we can imitate what's called threshold gates (we can cover that later but all you have to know for now is that threshold gates use the sum of weights to determine its output) below is a link to a circuit that is designed to do just that and solves one of the issues that RUST has with some real life interpretations of circuits because of how branches and gates split and combine power.

We solve that by using root combiners as a makeshift OR gate and adding in the extra XOR logic and AND logic later. so feel free to think outside the box a little when making your own.

ARC-F(Fast analog Ripple Carry Adder) 4 bit

<https://www.rustrician.io/?circuit=e718ca2ca942953fb93590e87bd92a46>

Another adder type that is widely used is called a CCA adder or Carry Cancel adder because it handles the carry more effeciently than a ripple

CCA - <https://www.rustrician.io/?circuit=709eabfb50201af1dd1aae41df10a81f>

Where Adders Are Used

Adders show up in many digital systems, including:

• Arithmetic Logic Units (ALUs) in CPUs

• Counters and timers

• Address generators and program counters

• Checksum, parity, and error detection circuits

• Digital signal processing

• Multiplication and division logic

One-Sentence Summary

A half adder adds two bits, and a full adder adds two bits plus a carry from earlier, enabling multi-bit binary addition when chained together.
