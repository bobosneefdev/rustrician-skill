# Components: Voice Props Pack DLC

Port labels are case-sensitive in exported XML (the build script matches them case-insensitively).
Side = where the port sits on the 64×64 component. Back to the [component index](../components.md).

## Boom Box

Type `boombox` · item -1113501606

A large speaker to play recorded cassette tapes which can also stream audio from the internet. Open the settings to change audio options.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | top |  |
| `Toggle Play` | in | power | right |  |
| `Audio Out` | out | power | top |  |

Simulator: consumption 10 rW.
Craft: 200 Wood, 100 Metal Fragments, 20 Cloth.

- Requires 10+ input power for Audio Out to have power
- Can be connected to other audio components

**Functionality** (handbook)

- Plays music from cassette tapes or internet radio streams.
- **Accepts cassettes of all three lengths**: 10s, 20s, and 30s.
- Internet radio stations can be selected through the Boom Box UI.
- Can be used with reactive components like the Sound Light, Laser Light, Disco Floor or Connected Speaker to enhance a player's audio and visual experience.
- Creates an Audio ID for reactive components to bind to. When multiple Boom Boxes connect to the same reactive components, Audio IDs are prioritized based on wiring order and connection timing (see Audio System Overview).
- Can be activated manually or with electricity.
- Anyone can turn the Boom Box on and off.
- TC Authorization is required to access the UI. Look at the speaker and hold Use (E) to access Radio Settings or Open.
  - Open allows for a cassette to be inserted.
  - Radio Settings access the list of radio stations.
  - Server owners can add radio stations to their server using (BoomBox.ServerUrlList "RustricityWorkshopRadio,https://radio.rustrician.io/listen") in the console.
- Can be picked up with a Hammer, but not while a cassette is still inside. Picking it up does not cause damage.
- Audio range is 30 meters (10 square foundations).
- Best placed in central or visible areas for audio and aesthetic impact.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Inputs**: Power, Toggle Play
  - **Output**: Audio Out
- **Toggle Play**: Needs constant power to function. When power is removed, the Boom Box will stop playing.
- **Power Consumption**: 10rW
- **Active Usage**: 10rW
- **Power Output**: Input power minus 10rW
- Power needs to receive power before Toggle Play if players want the Boom Box to turn on.

**Audio Output Behavior** (handbook)

- When an Audio Source, Boom Boxes and Microphone Stands, are the ones to give power to Reactive Components, things work as expected.
- Reactive Components (e.g., Disco Floor, Sound Light, Laser Light and Connected Speaker) need to be powered via the Audio Out output on an Audio Source to enable audio and visual light syncing.
- Audio Sources create an Audio ID that is used by Reactive Components to synchronize audio or visual effects. This ID is transferred along wires connected to their Audio Out output.
- When multiple Audio Sources are connected through OR/XOR Switches, to Reactive Components, things do not work as expected.
  - Reactive Components will bind to the first Audio ID detected after receiving power. This is not always the case when using OR/XOR Switches.
  - **Binding Priorities with OR/XOR Switches**
    - **Sound Light / Laser Light/ Disco Floor**
    - When 2 Audio Sources are connected, the one connected to Input A, takes priority. It doesn't matter if Input B is the one to be powered or play music first, Input A has priority.
    - The Audio Source connected to Input B, will only take priority when power and audio is passed through it first, before Input A is physically connected.
    - Once Input B loses power, Input A will bind even if power is restored to Input B.
    - **Connected Speaker**
    - It will take the Audio ID from either input, as long as the previous Audio Source is turned off first.
    - If it doesn't rebind to the new Audio Source, try turning it off and on again.
  - **Binding Reset**
    - To reset a binding, detach and reattach the Reactive Component from the circuit allowing it to power off.
    - Turn the Audio Source off and on again.

**Placement Considerations** (handbook)

- Can be placed on horizontal building blocks, the ground, and some deployables (e.g., Work Benches, Tables).
- Can be rotated with Reload (R) before placement.

**Notes** (handbook)

- Holding a hammer and looking at the Boom Box will show its health.
- It will auto-repair over time using resources from the Tool Cupboard.

## Connected Speaker

Type `connectedspeaker` · item 968421290

A small speaker that will play any audio from a connected Boom Box.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power/Audio In` | in | power | right |  |
| `Audio Passthrough` | out | power | left |  |

Simulator: consumption 1 rW.
Craft: 75 Metal Fragments.

- Can be connected to other audio components

**Functionality** (handbook)

- Relays and plays audio from Boom Boxes or Microphone Stands using their Audio Out connection.
- Will only bind to one Audio ID at a time. When connected to multiple sources, it prioritizes based on wiring order and connection timing.
- Designed to extend audio coverage over larger areas.
- Produces the same sound as the original source but with slightly lower audio quality.
- Has an approximate audio range of 30 meters (10 square foundations).
- Audio Passthrough allows daisy-chaining of additional reactive components.

**Audio Output Behavior** (handbook)

- When an Audio Source, Boom Boxes and Microphone Stands, are the ones to give power to Reactive Components, things work as expected.
- Reactive Components (e.g., Disco Floor, Sound Light, Laser Light and Connected Speaker) need to be powered via the Audio Out output on an Audio Source to enable audio and visual light syncing.
- Audio Sources create an Audio ID that is used by Reactive Components to synchronize audio or visual effects. This ID is transferred along wires connected to their Audio Out output.
- When multiple Audio Sources are connected through OR/XOR Switches, to Reactive Components, things do not work as expected.
  - Reactive Components will bind to the first Audio ID detected after receiving power. This is not always the case when using OR/XOR Switches.
  - **Binding Priorities with OR/XOR Switches**
    - **Sound Light / Laser Light/ Disco Floor**
    - When 2 Audio Sources are connected, the one connected to Input A, takes priority. It doesn't matter if Input B is the one to be powered or play music first, Input A has priority.
    - The Audio Source connected to Input B, will only take priority when power and audio is passed through it first, before Input A is physically connected.
    - Once Input B loses power, Input A will bind even if power is restored to Input B.
    - **Connected Speaker**
    - It will take the Audio ID from either input, as long as the previous Audio Source is turned off first.
    - If it doesn't rebind to the new Audio Source, try turning it off and on again.
  - **Binding Reset**
    - To reset a binding, detach and reattach the Reactive Component from the circuit allowing it to power off.
    - Turn the Audio Source off and on again.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Input**: Power/Audio In
  - **Output**: Passthrough
- **Power Consumption**: 1rW
- **Active Usage**: 1
- **Power Output**: Input power minus 1rW

**Placement Considerations** (handbook)

- Can be placed on horizontal or angled building blocks.
- Can be rotated with Reload (R), but rotation is currently bugged and will cause the speaker to clip into the wall.

**Notes** (handbook)

- Holding a Hammer while looking at the speaker will show its health.
- Will auto-repair over time using resources from the Tool Cupboard.

## Disco Ball

Type `discoball` · item 1895235349

Get groovy with this stunning disco ball.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power/Audio In` | in | power | right |  |
| `Audio Passthrough` | out | power | left |  |

Simulator: consumption 1 rW.
Craft: 50 Metal Fragments.

- Can be connected to other audio components

**Functionality** (handbook)

- Spins and reflects light to simulate a disco party effect when powered.
- Functions as a light source, and does not require a Boom Box or Microphone Stand to operate.
- Can be used in combination with other visual components like the Music Light, Laser Light, or Disco Floor to create full light shows.
- Does not react to audio or bind to Audio IDs, it's purely visual.
- The visual shimmer effect passes through walls, making it ideal for atmospheric lighting even in enclosed areas.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Input**: Power
  - **Output**: Passthrough
- **Power Consumption**: 1rW
- **Active Usage**: 1
- **Power Output**: Input power minus 1rW

**Placement Considerations** (handbook)

- Can only be placed hanging from ceilings or angled roofs.
- Can be rotated with Reload (R) before placement.
- Best used in dark indoor areas to maximize light projection.

**Notes** (handbook)

- Holding a Hammer while looking at the Disco Ball will show its health.
- Will auto-repair over time using resources from the Tool Cupboard.

## Disco Floor

Type `discofloor` · item 1735402444

A vibrant flashing floor that pulses in time to music.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power/Audio In` | in | power | right |  |
| `Audio Passthrough` | out | power | left |  |

Simulator: consumption 1 rW.
Craft: 75 Metal Fragments.

- Can be connected to other audio components

**Functionality** (handbook)

- Lights up and pulses in sync with audio received from a Boom Box or Microphone Stand.
- Will only bind to one Audio ID at a time. When connected to multiple sources, it prioritizes based on wiring order and connection timing.
- Players with Tool Cupboard authorization can configure:
  - **Pattern**: Determines the animation style of the lights (sweeps, waves, pulses, etc.).
  - **Volume Sensitivity**: Controls how reactive the tiles are to audio volume. Higher sensitivity = stronger response.
  - **Speed**: Adjusts how fast the light pattern moves or flashes.
  - **Gradient**: Changes the color scheme and transition style of the lights.
- **There are two variants of Disco Floors**
  - One with larger tiles
  - One with smaller tiles
  - Select the one to make at the time of crafting.

**Audio Behavior** (handbook)

- When an Audio Source, Boom Boxes and Microphone Stands, are the ones to give power to Reactive Components, things work as expected.
- Reactive Components (e.g., Disco Floor, Sound Light, Laser Light and Connected Speaker) need to be powered via the Audio Out output on an Audio Source to enable audio and visual light syncing.
- Audio Sources create an Audio ID that is used by Reactive Components to synchronize audio or visual effects. This ID is transferred along wires connected to their Audio Out output.
- When multiple Audio Sources are connected through OR/XOR Switches, to Reactive Components, things do not work as expected.
  - Reactive Components will bind to the first Audio ID detected after receiving power. This is not always the case when using OR/XOR Switches.
  - **Binding Priorities with OR/XOR Switches**
    - **Sound Light / Laser Light/ Disco Floor**
    - When 2 Audio Sources are connected, the one connected to Input A, takes priority. It doesn't matter if Input B is the one to be powered or play music first, Input A has priority.
    - The Audio Source connected to Input B, will only take priority when power and audio is passed through it first, before Input A is physically connected.
    - Once Input B loses power, Input A will bind even if power is restored to Input B.
    - **Connected Speaker**
    - It will take the Audio ID from either input, as long as the previous Audio Source is turned off first.
    - If it doesn't rebind to the new Audio Source, try turning it off and on again.
  - **Binding Reset**
    - To reset a binding, detach and reattach the Reactive Component from the circuit allowing it to power off.
    - Turn the Audio Source off and on again.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Input**: Audio In
  - **Output**: Audio Passthrough
- **Power Consumption**: 1rW
- **Active Usage**: 1
- **Power Output**: Input power minus 1rW

**Placement Considerations** (handbook)

- Must be placed flat on the floor.
- Cannot be stacked or have other deployables placed on top.
- Can be rotated with Reload (R) before placement.

**Notes** (handbook)

- Will auto-repair over time using resources from the Tool Cupboard.

## Laser Light

Type `laserlight` · item 853471967

A small device that shoots out visible lasers in time to music.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power/Audio In` | in | power | left |  |
| `Audio Passthrough` | out | power | right |  |

Simulator: consumption 1 rW.
Craft: 100 Metal Fragments.

- Can be connected to other audio components

**Functionality** (handbook)

- Emits 3 lasers that move in response to audio from a Boom Box or Microphone Stand.
- Laser range is about 10 foundations or 30 meters.
- Will only bind to one Audio ID at a time. When connected to multiple sources, it prioritizes based on wiring order and connection timing (see Audio System Overview).
- Players with Tool Cupboard authorization can interact with it by pressing Use (E) to configure the following settings:
  - **Color**: Select from multiple preset laser colors.
  - **Volume Sensitivity**: Adjust how strongly the lasers respond to audio.
  - **Speed**: Select how fast or slow the laser will move around.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Input**: Power/Audio In
  - **Output**: Audio Passthrough
- **Power Consumption**: 1rW
- **Active Usage**: 1
- **Power Output**: Input power minus 1rW

**Audio Behavior** (handbook)

- When an Audio Source, Boom Boxes and Microphone Stands, are the ones to give power to Reactive Components, things work as expected.
- Reactive Components (e.g., Disco Floor, Sound Light, Laser Light and Connected Speaker) need to be powered via the Audio Out output on an Audio Source to enable audio and visual light syncing.
- Audio Sources create an Audio ID that is used by Reactive Components to synchronize audio or visual effects. This ID is transferred along wires connected to their Audio Out output.
- When multiple Audio Sources are connected through OR/XOR Switches, to Reactive Components, things do not work as expected.
  - Reactive Components will bind to the first Audio ID detected after receiving power. This is not always the case when using OR/XOR Switches.
  - **Binding Priorities with OR/XOR Switches**
    - **Sound Light / Laser Light/ Disco Floor**
    - When 2 Audio Sources are connected, the one connected to Input A, takes priority. It doesn't matter if Input B is the one to be powered or play music first, Input A has priority.
    - The Audio Source connected to Input B, will only take priority when power and audio is passed through it first, before Input A is physically connected.
    - Once Input B loses power, Input A will bind even if power is restored to Input B.
    - **Connected Speaker**
    - It will take the Audio ID from either input, as long as the previous Audio Source is turned off first.
    - If it doesn't rebind to the new Audio Source, try turning it off and on again.
  - **Binding Reset**
    - To reset a binding, detach and reattach the Reactive Component from the circuit allowing it to power off.
    - Turn the Audio Source off and on again.

**Placement Considerations** (handbook)

- Can be placed on any angled building surface and the ground.
- Can be rotated with Reload (R) before placement.
- Best used in dark or open spaces to maximize laser visibility.
- Can be picked up with a Hammer, but doing so reduces health by 25%.

**Notes** (handbook)

- Will auto-repair over time using resources from the Tool Cupboard.

## Microphone Stand

Type `microphonestand` · item 39600618

A powered microphone that lets you broadcast your voice. Press [+reload] to change voice mode between high and low pitch.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power/Audio In` | in | power | bottom |  |
| `Audio Out` | out | power | bottom |  |

Simulator: consumption 5 rW.
Craft: 75 Metal Fragments.

- Can be connected to other audio components

**Functionality** (handbook)

- Allows players to speak into it and broadcast their voice to connected components.
- Tool Cupboard authorization is not required to use the mic. Look at it and press Use (E) to speak into the mic.
- Right-click while using to toggle voice pitch modes: Normal, High, and Low.
- Generates an Audio ID that Reactive Components like Disco Floor, Laser Light, and Sound Light will bind to.
- Can be connected to a Connected Speaker via Audio Out to amplify and project the voice over longer distances.

**Audio Behavior** (handbook)

- When an Audio Source, Boom Boxes and Microphone Stands, are the ones to give power to Reactive Components, things work as expected.
- Reactive Components (e.g., Disco Floor, Sound Light, Laser Light and Connected Speaker) need to be powered via the Audio Out output on an Audio Source to enable audio and visual light syncing.
- Audio Sources create an Audio ID that is used by Reactive Components to synchronize audio or visual effects. This ID is transferred along wires connected to their Audio Out output.
- When multiple Audio Sources are connected through OR/XOR Switches, to Reactive Components, things do not work as expected.
  - Reactive Components will bind to the first Audio ID detected after receiving power. This is not always the case when using OR/XOR Switches.
  - **Binding Priorities with OR/XOR Switches**
- **Sound Light / Laser Light/ Disco Floor**
    - When 2 Audio Sources are connected, the one connected to Input A, takes priority. It doesn't matter if Input B is the one to be powered or play music first, Input A has priority.
    - The Audio Source connected to Input B, will only take priority when power and audio is passed through it first, before Input A is physically connected.
    - Once Input B loses power, Input A will bind even if power is restored to Input B.
- **Connected Speaker**
    - It will take the Audio ID from either input, as long as the previous Audio Source is turned off first.
    - If it doesn't rebind to the new Audio Source, try turning it off and on again.
  - **Binding Reset**
    - To reset a binding, detach and reattach the Reactive Component from the circuit allowing it to power off.
    - Turn the Audio Source off and on again.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Input**: Power
  - **Output**: Audio Out
- **Power Consumption**: 5rW
- **Active Usage**: 5
- **Power Output**: Input power minus 1rW

**Placement Considerations** (handbook)

- Can be placed on the floor or the ground.
- Can be rotated with Reload (R) before placement.
- Best used in communal areas or bases where voice announcements are useful.

**Notes** (handbook)

- Will auto-repair over time using resources from the Tool Cupboard.

## Sound Light

Type `soundlight` · item -343857907

A light that will pulse in time to music when connected to a Boom Box.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power/Audio In` | in | power | right |  |
| `Audio Passthrough` | out | power | right |  |

Simulator: consumption 1 rW · rotatable (0/90/180/270).
Craft: 100 Metal Fragments.

- Can be connected to other audio components
- Can be rotated before placing by pressing R in-game, or by pressing R after placing in the simulator

**Functionality** (handbook)

- Reacts to music and audio by flashing and pulsing in sync with the sound.
- Players with Tool Cupboard authorization can interact with it by pressing Use (E) to configure the following settings:
  - **Color**: Choose from multiple preset color options.
  - **Volume Sensitivity**: Adjust how intensely the light reacts to audio.
  - **Speed**: Control how quickly the light pulses and moves.
- Light intensity is strongest when the player is close to the Sound Light.

**Audio Behavior** (handbook)

- When an Audio Source, Boom Boxes and Microphone Stands, are the ones to give power to Reactive Components, things work as expected.
- Reactive Components (e.g., Disco Floor, Sound Light, Laser Light and Connected Speaker) need to be powered via the Audio Out output on an Audio Source to enable audio and visual light syncing.
- Audio Sources create an Audio ID that is used by Reactive Components to synchronize audio or visual effects. This ID is transferred along wires connected to their Audio Out output.
- When multiple Audio Sources are connected through OR/XOR Switches, to Reactive Components, things do not work as expected.
  - Reactive Components will bind to the first Audio ID detected after receiving power. This is not always the case when using OR/XOR Switches.
  - **Binding Priorities with OR/XOR Switches**
- **Sound Light / Laser Light/ Disco Floor**
    - When 2 Audio Sources are connected, the one connected to Input A, takes priority. It doesn't matter if Input B is the one to be powered or play music first, Input A has priority.
    - The Audio Source connected to Input B, will only take priority when power and audio is passed through it first, before Input A is physically connected.
    - Once Input B loses power, Input A will bind even if power is restored to Input B.
- **Connected Speaker**
    - It will take the Audio ID from either input, as long as the previous Audio Source is turned off first.
    - If it doesn't rebind to the new Audio Source, try turning it off and on again.
  - **Binding Reset**
    - To reset a binding, detach and reattach the Reactive Component from the circuit allowing it to power off.
    - Turn the Audio Source off and on again.

**Power Mechanics** (handbook)

- **Power Connections**
  - **Input**: Power/Audio In
  - **Output**: Audio Passthrough
- **Power Consumption**: 1rW
- **Active Usage**: 1
- **Power Output**: Input power minus 1rW

**Placement Considerations** (handbook)

- Can be placed on vertical and angled surfaces.
- Can be rotated with Reload (R) before placement.
- Can be picked up with a Hammer, but doing so will reduce its hit points by 25%.

**Notes** (handbook)

- Will auto-repair over time using resources from the Tool Cupboard.
