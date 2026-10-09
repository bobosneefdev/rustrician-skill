# Electrical Concepts: Power Theory and Efficiency › Example: The Simple Trap

### Example: The Simple Trap

This example demonstrates how circuits triggered by basic player inputs can greatly benefit from using Free Power for Control Power to reduce Root Power requirements.

The goal of this trap base is simple: trap an intruder between two doors. When the victim steps on a Pressure Pad, one door shuts behind them, and another opens ahead, exposing a deadly room full of Shotgun Traps. A Memory Cell handles the power switching between the two doors. To reset the trap, the base owner presses a Button, but only if they’re detected by the HBHF Sensor, which prevents outsiders from resetting the system.

Power enters a series of 3 Electrical Branches:

- Branch 1 ( Set to 1)
  - Branch Out: 1rW to the Pressure Pad → Sends pulse to SET on the Memory Cell
  - Power Out: Feeds Branch 2
- Branch 2 (Set to 1)
  - Branch Out: 1rW to a Smart Switch → Keeps the Memory Cell Input powered
  - Power Out: Feeds Branch 3
- Branch 3 (Set to 2)
  - Branch Out: 2rW to the HBHF Sensor (set to authorized players only)
  - Power Out: 1rW to the Button

The Button and HBHF Sensor outputs are wired into an AND Switch. When both inputs are active, the AND Switch sends 1rW to the RESET input of the Memory Cell, flipping it back. This provides players with a 2 factor authentication system.

The Output and Inverted Output of the Memory Cell are each connected to a Door Controller, ensuring only one door is powered (and therefore open) at a time.

**⚡ Solving for Efficiency**

At first, this circuit appears fairly lightweight, it only draws 5rW. A closer inspection shows that only the Door Controller (whichever is currently active) and the HBHF Sensor actually generate Active Usage. That means we could place the entire system on an Inline backup, and only see 2 Active Usage, requiring just 3rW input to remain neutral, already a 40% power savings compared to using Root Power directly.

But things can go further.

Two of the components, the Pressure Pad and the Button, generate Free Power when activated. The Pressure Pad sends a free 1rW pulse to SET, removing the need for an Electrical Branch. Likewise, the Button generates 2rW when pressed, just enough to both power the HBHF Sensor (which needs 1rW) and pass the second 1rW to RESET on the Memory Cell. Now the logic circuit is entirely self-powered, the circuit will only need 1rW to keep the Smart Switch (and by extension, the Memory Cell’s Input) constantly powered.

That’s an 80% reduction in Root Power requirements, from 5rW down to 1rW, all by understanding the components and leveraging Free Power. In larger circuits, small reductions like this can add up fast.

🔍 Pro Tip: The Reactive Target also produces 1rW of Free Power when shot down with no input power, offering another creative input option for similar designs.

This example illustrates how a circuit that relies on player input can do it at zero cost to Root Power. From turning on a Strobe Light, activating fireworks at a distance or calling an Elevator, there are many situations where simple traps or logic systems can be optimized drastically by utilizing these components. Even circuits with low power requirements benefit from minimizing Root Power dependency. Components like the Button and Pressure Pad are not just inputs, they are power sources, and when used wisely, they can eliminate the need for continuous power input entirely in parts of a circuit.
