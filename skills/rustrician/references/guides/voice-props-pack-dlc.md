# Voice Props Pack DLC

The **Voice Props Pack DLC**, released July 2, 2021, adds audio and visual components that let players record, play, and broadcast sounds, creating dynamic environments with music, voice, and lighting effects.

**How To Acquire: **The Voice Props Pack DLC must be purchased separately from the Rust base game. The DLC can be bought from the games store page on Steam or from the Item Store on the home screen of the game. Once purchased, items from the pack become available to craft and use in-game.

## Understanding the Audio System

The Audio System is a unique network, similar to the Water and Industrial systems. While those systems transport physical resources, the Audio System focuses on broadcasting sound and triggering visual effects based on audio signals. It integrates fully with the Electrical System and uses the Wire Tool to make connections.

**Key Features:**

- **Audio Devices:**
  - ***Cassette Recorder* and *Cassettes*:** Record and playback audio, including player voices and environmental sounds.​
  - ***Connected Speaker*:** Extend audio playback to multiple areas within your base.
  - ***Boom Box* and *Portable Boom Box*:** Play recorded cassettes or stream internet radio stations within the game.
  - ***Megaphone* and *Microphone Stand*:** Amplify your voice to project across distances or throughout your base.
  - ***Mobile Phone*:** Make and receive calls in-game, anywhere on the map. There is no voicemail service.
  - ***Modular Car Radio* (added in 2024):** Enhance vehicles with radio and audio playback capabilities. ​
- **Visual and Interactive Elements:**
  - ***Disco Floor* (multiple variants):** Create dance floors that react to in-game music.
  - ***Disco Ball*:** A rotating mirrored ball that adds dynamic reflections and lighting effects to your dance floors or event spaces.
  - ***Sound Lights* and *Laser Lights*:** Lighting elements that synchronize with audio for dynamic visual effects.​
  - ***Dance Gestures*:** Three new emotes to express yourself on the dance floor. ​

These components and abilities enable players to host in-game events, set up communication networks, and personalize their environments with music and lighting, adding depth and entertainment to the Rust experience.

**Core Functionality**

- This system allows for dynamic player-made content like clubs, events, or audio-triggered alerts.
- The system sends Audio through electrical IO connections and requires power to operate, kinda.
- Sound-producing devices generate audio signals that other components can respond to visually.

**Audio ID Binding**

- Audio Sources, Boom Boxes and Microphone Stands, create an Audio ID that is used by Reactive Components to synchronize audio or visual effects. This ID is transferred along wires connected to their Audio Out output.
- Reactive Components (Disco Floor, Sound Light, Laser Light and Connected Speaker) need to receive power that has passed through the Audio Out output on an Audio Source. This will enable audio and visual light syncing.
- Reactive Components can only bind to one Audio ID at a time and will bind to the one with the highest priority when more than 1 is available.
- When the Boom Box or Microphone Stand is providing the Reactive Components with their power directly, everything will work as expected.

**Binding Priorities with OR/XOR Switches**

When multiple Audio Sources (Boom Boxes and Microphone Stands) are connected to OR or XOR Switches, binding behavior becomes less predictable. Reactive Components (Disco Floor, Sound Light, Laser Light and Connected Speaker) only bind to a single Audio ID at one time, and their priority changes depending on the order of connections and power events.

**🟩 Sound Light, Laser Light, and Disco Floor:**

- **Input A has highest priority.
- **Even if Input B’s Boom Box receives power or starts playing music first, if both inputs are connected, the reactive component binds to the Audio Source on Input A of the OR/XOR switch.
- **Input B only binds if it’s first to play before Input A is physically connected.
- **If Input B's Audio Source provides power before Input A's Audio Source is physically connected at all, the bind will go to Input B. The bind will only swap to Input A once Input B is turned off.
- **Once bound to Input A, Reactive Components will only switch to Input B once Input A is physically disconnected.
- **Even if the Audio Source on Input A stops playing music or is powered off, the bind will not automatically switch to Input B. The connection to Input A must be removed before Input B receives power.

**🟦 Connected Speaker:**

- **More flexible binding behavior.
- **Unlike other reactive components, the Connected Speaker can rebind to a different Audio ID but only after both itself and the Audio Source are turned off or lose power.
- **Switching from 1 input to another.
- **If the Audio Source on Input A is active and you want to switch to the Audio Source on Input B, simply turn off the Audio Source connected to Input A before turning on the Audio Source connected to Input B. The speaker unbinds when it loses power allowing a new bind from a different input.
- **If rebinding doesn’t work right away, turn the speaker off and on again.
- **Try turning the Audio Source off and on again. If that doesn't work, detach and reattach the wire connected to Audio Out on the Audio Source.

**Binding Reset**

- **To reset a binding:**
  - **Power Off and On both the audio source and reactive component(s):** Ensure the Reactive Component is no longer powered before turning the Audio Source back on. When the Reactive Component loses power, it unbinds from the current Audio ID allowing a new bind when it powers back on. It will rebind to the Audio ID with the highest priority.
  - Priorities are assigned by OR/XOR Switches. Input A over Input B.
  - If the Reactive Component(s) can be powered by an alternative power source, disconnecting the Audio Source will not reset the bind.
