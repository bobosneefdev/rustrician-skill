# Historical Archive

Nothing entered here.

## The original handbook (RIP 2019)

Link: <https://www.rustrician.io/rust_electrical_handbook_(rev_j).pdf>

This is the link to the original handbook. Created by GlossyEyedGnome on Reddit in late 2018. It became obsolete in 2019 and there was no immediate replacement.

## Handbook 2.0 (RIP 2024)

Link: <https://www.rustrician.io/wiki_2.zip>

This is the link to the 2nd version of the handbook. It was created by SwiftCoyote in early 2023 but became obsolete in 2024.

## Nih Capacitor

This has been patched out on November 4th 2023 but remains here for the historical record. 🙁

The Nih Capacitor was first established by Nih, with assistance from SwiftCoyote, on September 11, 2022. A Capacitor is a set of components that accumulate power, much like rechargeable batteries. However, the method for assessing the amount of stored power differs.

For batteries, the stored power is represented as ‘Capacity,’ measured in Rust Watt Minutes (rWm).

Contrarily, in a Capacitor, we gauge the power storage by examining an Input/Output (IO) connection and observing a figure that is typically associated with ‘power,’ or the amount of power available for use. But within the Capacitor, this figure DOES NOT indicate the amount of power that can be utilized. Rather, this figure is what we call ‘Wire Capacity,’ symbolized as ‘Np’. For instance, in the image below, the displayed 6,492,076 is NOT the amount of power available. Instead, it represents 6,492,076Np of Wire Capacity.

Before going into the construction and operation of a Capacitor, it’s essential to understand the math conversions between Rust Watt Minutes (rWm) and Wire Capacity (Np). Both represent capacity, but they use different units of measurement depending on the energy storage container, be it a battery or a capacitor.

**The Maths**

rWm: rust watt minute

rW: rust watts (commonly referred to as “power”)

Np: Wire Capacity

∅: 7.5 (Trust Me Bro)

S: Seconds

τ: 60 (The number of seconds in a minute, and minutes in an hour)

M: Minutes

P: Max power output for 1 second

O: The amount of power you want to output

H: Hours

To convert rWm into Wire Capacity(Np), use the following equation:

(rWm × τ = P) × ∅ = Np

To convert Wire Capacity(Np) into rWm, use the following equation:

(Np ÷ ∅ = P) ÷ τ = rWm

To figure out how much time a given capacity will run for outputting a specific amount of power, use the following equations:

Seconds: (rWm ÷ O = M) × τ = S

Minutes: rWm ÷ O = M

Hours: (rWm ÷ O = M) ÷ τ = H

**Examples**

Using Capacity from the battery in the first picture, it is possible to figure out the number that would be seen if looking at an IO connection in a Capacitor to view Wire Capacity(Np).

(rWm × τ = P) × ∅ = Np

(271 × 60 = 16,260) × 7.5 = 121,950Np

Therefore a capacity of 271rWm when viewed on an IO connection is equal to 121,950Np. We can also see that if the Large Battery did not have an output limit of 100, it would be able to output 16,260rW of power for 1 second.

Using the IO connection to view Wire Capacity(Np) from the second picture, it is possible to figure out how much rWm of Capacity we would have if this was viewed on a battery.

(Np ÷ ∅ = P) ÷ τ = rWm

(6,492,076 ÷ 7.5 = 865,610.1333) ÷ 60 = 14,426rWm

Therefore a Wire Capacity of 6,492,076Np when viewed on a battery represented as Capacity, it is equal to 14,426rWm. Without a limited output, the Capacitor is capable of delivering 865,610rW of power for 1 second.

Using both of these examples, it's possible to calculate the length of time both the Battery and Capacitor would power a circuit for, given a set output. For our example, let's say the circuit needs 100 power.

Battery

(rWm ÷ O = M) × τ = S

(271÷ 100 = 2.71 Minutes) × 60 = 162 Seconds

Capacitor (you will need to convert from Np to rWm first)

(rWm ÷ O = M) × τ = S

(14,426 ÷ 100 = 144.26 Minutes) × 60 = 8,655 Seconds

OR

(rWm ÷ O = M) ÷ τ = H

(14,426 ÷ 100 = 144.26 Minutes) ÷ 60 = 2.40 Hours

Prior to constructing a capacitor, it’s crucial to understand its limitations and potential issues. This will clarify misconceptions such as the notion of ‘infinite power’ and help identify the appropriate contexts for its use.

- It doesn’t survive server restarts. Everytime the server restarts, all of the stored power will vanish, poof gone.
- When automating energy extraction, it is possible that a flicker will be created or worse, all the power vanishes, poof gone.
- It consumes power even when nothing is connected to it, unlike a battery that doesn’t lose power if nothing is connected to it.
- It is not portable.

Now, some of the advantages and benefits of the Capacitor

- The ability to release large amounts of power for short periods of time.

AND

- Can be used in conjunction with existing battery backup systems to stabilize incoming power.

## Side Inputs

The side ports have been changed to toggles as of November 2 2023. What remains below is for the historical record.

They are not bugged or broken, you just don’t know how to use them yet.

It is not uncommon for people to think of ‘Switch On’ and ‘Switch Off’ as a toggle like on the side of a Timer. They are not toggles, they are inputs with an added function. Just like the ‘Power In’ on the bottom, the side inputs also pass power through to the top. The function part only functions when power is received, removed or the amount of power is updated.

When ANY input on the Switch receives an ‘update’, the Switch will bind to that input for its source of power that passes through to the top. It will remain bound to that input until another input ‘updates’ which will force the switch to bind to the new input. An update is either losing power or receiving power, 0-1 or 1-0 or power levels change up or down.

The exception to this is when one input is receiving an amount of power and another input receives the same amount of power, the Switch will not recognize the new source and remain bound to the original input.

The following pictures will help illustrate how it works.

Starting off, we are using 3 Switches to provide 3 different amounts of power each input. Green wire is for Switch On. Red wire is for Switch Off. Black wire is for Electric Input on the bottom. Yellow lines mark the path power is taking. Red lines mark where power stops. In this first picture, we are sending power to the bottom input and the Switch sends it out the top, with the expected power loss.

Next, we leave power going into the bottom and then apply power to Switch Off. As we can see, the Switch will flip off.

If we manually flip the Switch back on, we can now see a new amount of power displaying on the counter.

This is because the Switch is now bound to the Switch Off input for the power that passes through to the top. The power going into the bottom input is completely ignored. For the next picture, we flip the Switch back off and then apply power to Switch On.

The Switch will now flip on and once again pass through a new amount of power to the counter. The power going to the bottom input or Switch Off input is now ignored and the Switch is bound to Switch On. In the next picture, we remove power from Switch On while keeping power applied to Switch Off and the bottom.

We can see here now that power was removed from Switch On, the Switch has no power. The green light turns off and the Switch is still in the on position. Even though the other 2 inputs have power, the Switch is bound to Switch On for its source of power, which was removed. If we restore power to Switch On, the Switch will start passing power though again like the previous picture. With power restored, for the next picture we will remove power from Switch Off.

We restored power to Switch On before removing power from Switch Off. The green light turns off when power is removed and the Switch binds to the Switch Off. This is because that input received an update from ‘having power’ to ‘not having power’, from 1 to 0. For the next picture, we restore power to Switch Off.

Restoring power to the Switch Off input, the red light turns on and the Switch flips to the off position. When we manually flip it on we can see the new amount of power passing through.

Seeing that we only have 28 power showing on the counter, it is clear power is coming through the Switch Off input. When we remove power from the bottom input, the Switch loses power.

It loses power because the bottom input was updated, from 1 to 0, so the Switch is bound to it. Now bound to the bottom input and not receiving power, the green light turns off and no power passes through. Restoring power to the bottom input, the green light turns back on and the new power amount is displayed on the counter.

Seeing the power level on the counter confirming power is coming into the bottom, we will now adjust the Electrical Branch to send more power to Switch On.

After increasing the amount of power, we can see an instant change on the counter to reflect that the Switch changed the input it was bound to from the bottom input to Switch On.

In conclusion, whichever is the last input to receive an update is the input the Switch will bind to for its source of power. Adding power, removing power or a change in power levels will update the Switches input. When moving power from one input to another, it is important
