# Component index

Every component the rustrician.io simulator supports (version 1337.369). Each category file has exact port labels,
properties, consumption, crafting and the full in-game behavior from the [Rust Electrical Handbook](https://rustrician.io/handbook/).
`node scripts/rustrician.mjs info <type>` prints the same port/property data for one component.

Ports below are `in` / `out` labels; (w) = water hose, (i) = industrial pipe, otherwise power wire.

## [Power Sources](components/power-sources.md)

| Type | Name | Inputs | Outputs | rW |
|---|---|---|---|---|
| `solarpanel_large` | [Solar Panel](components/power-sources.md#solar-panel) | — | Power Out | source |
| `generator_wind` | [Wind Turbine](components/power-sources.md#wind-turbine) | — | Power Out | source |
| `generator_water` | [Water Wheel](components/power-sources.md#water-wheel) | — | Power Out | source |
| `fuelgenerator_small` | [Small Generator](components/power-sources.md#small-generator) | Force Start, Force Stop | Power Out | source |
| `testgenerator_small` | [Test Generator](components/power-sources.md#test-generator) | — | Power Output 1, Power Output 2, Power Output 3 | source |

## [Batteries](components/batteries.md)

| Type | Name | Inputs | Outputs | rW |
|---|---|---|---|---|
| `battery_large` | [Large Rechargeable Battery](components/batteries.md#large-rechargeable-battery) | Power In | Power Out, Fully Charged | source |
| `battery_medium` | [Medium Rechargeable Battery](components/batteries.md#medium-rechargeable-battery) | Power In | Power Out, Fully Charged | source |
| `battery_small` | [Small Rechargeable Battery](components/batteries.md#small-rechargeable-battery) | Power In | Power Out, Fully Charged | source |

## [Distribution](components/distribution.md)

| Type | Name | Inputs | Outputs | rW |
|---|---|---|---|---|
| `combiner` | [Root Combiner](components/distribution.md#root-combiner) | Power In 1, Power In 2 | Power Out | 0 |
| `branch` | [Electrical Branch](components/distribution.md#electrical-branch) | Power In | Branch Out, Power Out | 0 |
| `splitter` | [Splitter](components/distribution.md#splitter) | Power In | Power Out 1, Power Out 2, Power Out 3 | 0 |

## [Switches](components/switches.md)

| Type | Name | Inputs | Outputs | rW |
|---|---|---|---|---|
| `switch` | [Switch](components/switches.md#switch) | Power In, Switch On, Switch Off | Power Out | 0 |
| `button` | [Button](components/switches.md#button) | Power In | Power Out | 0 |
| `reactivetarget` | [Reactive Target](components/switches.md#reactive-target) | Power In, Lower, Reset | Power Out | 1 |

## [Sensors](components/sensors.md)

| Type | Name | Inputs | Outputs | rW |
|---|---|---|---|---|
| `hbhfsensor` | [HBHF Sensor](components/sensors.md#hbhf-sensor) | Power In | Power Out | 1 |
| `seismicsensor` | [Seismic Sensor](components/sensors.md#seismic-sensor) | Power In | Passthrough | 1 |
| `laserdetector` | [Laser Detector](components/sensors.md#laser-detector) | Power In | Power Out | 1 |
| `pressurepad` | [Pressure Pad](components/sensors.md#pressure-pad) | Power In | Power Out | 0 |

## [Logic](components/logic.md)

| Type | Name | Inputs | Outputs | rW |
|---|---|---|---|---|
| `blocker` | [Blocker](components/logic.md#blocker) | Power In, Block Passthrough | Power Out | 0 |
| `memorycell` | [Memory Cell](components/logic.md#memory-cell) | Power In, Set, Reset, Toggle | Power Out Inverted, Power Out | 0 |
| `timer` | [Timer](components/logic.md#timer) | Power In, Toggle On | Power Out | 0 |
| `switch_rand` | [RAND Switch](components/logic.md#rand-switch) | Power In, Set, Reset | Power Out | 0 |
| `switch_or` | [OR Switch](components/logic.md#or-switch) | Power In 1, Power In 2 | Power Out | 0 |
| `switch_and` | [AND Switch](components/logic.md#and-switch) | Power In 1, Power In 2 | Power Out | 0 |
| `switch_xor` | [XOR Switch](components/logic.md#xor-switch) | Power In 1, Power In 2 | Power Out | 0 |
| `counter` | [Counter](components/logic.md#counter) | Power In, Increment Counter, Decrement Counter, Clear Counter | Passthrough | 0 |

## [Radio Frequency (RF)](components/radio-frequency-rf.md)

| Type | Name | Inputs | Outputs | rW |
|---|---|---|---|---|
| `rf_broadcaster` | [RF Broadcaster](components/radio-frequency-rf.md#rf-broadcaster) | Power In | — | 1 |
| `rf_receiver` | [RF Receiver](components/radio-frequency-rf.md#rf-receiver) | Power In | Power Out | 1 |
| `rf_transmitter` | [RF Transmitter](components/radio-frequency-rf.md#rf-transmitter) | — | — | 0 |
| `rf_pager` | [RF Pager](components/radio-frequency-rf.md#rf-pager) | — | — | 0 |

## [Lights](components/lights.md)

| Type | Name | Inputs | Outputs | rW |
|---|---|---|---|---|
| `flasherlight` | [Flasher Light](components/lights.md#flasher-light) | Power In | Passthrough | 1 |
| `sirenlight` | [Siren Light](components/lights.md#siren-light) | Power In | Passthrough | 1 |
| `ceilinglight` | [Ceiling Light](components/lights.md#ceiling-light) | Power In | Passthrough | 2 |
| `simplelight` | [Simple Light](components/lights.md#simple-light) | Power In | Passthrough | 1 |
| `xmas_lightstring` | [Deluxe Christmas Lights](components/lights.md#deluxe-christmas-lights) | Power In | Passthrough | 5 |
| `searchlight` | [Search Light](components/lights.md#search-light) | Power In | Passthrough | 10 |
| `neonsign_small` | [Small Neon Sign](components/lights.md#small-neon-sign) | Power In | Passthrough | 2 |
| `neonsign_medium` | [Medium Neon Sign](components/lights.md#medium-neon-sign) | Power In | Passthrough | 4 |
| `neonsign_medium_animated` | [Medium Animated Neon Sign](components/lights.md#medium-animated-neon-sign) | Power In, Frame 1, Frame 2, Frame 3 | Passthrough | 5 |
| `neonsign_large` | [Large Neon Sign](components/lights.md#large-neon-sign) | Power In | Passthrough | 6 |
| `neonsign_large_animated` | [Large Animated Neon Sign](components/lights.md#large-animated-neon-sign) | Power In, Frame 1, Frame 2, Frame 3, Frame 4, Frame 5 | Passthrough | 7 |
| `industrial_wall_light` | [Industrial Wall Light](components/lights.md#industrial-wall-light) | Power In | Passthrough | 1 |
| `industrial_wall_light_blue` | [Blue Industrial Wall Light](components/lights.md#blue-industrial-wall-light) | Power In | Passthrough | 1 |
| `industrial_wall_light_green` | [Green Industrial Wall Light](components/lights.md#green-industrial-wall-light) | Power In | Passthrough | 1 |
| `industrial_wall_light_red` | [Red Industrial Wall Light](components/lights.md#red-industrial-wall-light) | Power In | Passthrough | 1 |
| `strobelight` | [Strobe Light](components/lights.md#strobe-light) | Toggle, Turn On, Turn Off | — | 1 |
| `gunrack_horizontal` | [Horizontal Weapon Rack](components/lights.md#horizontal-weapon-rack) | Power In | Passthrough | 1 |
| `gunrack_tall_horizontal` | [Tall Weapon Rack](components/lights.md#tall-weapon-rack) | Power In | Passthrough | 1 |
| `gunrack_wide_horizontal` | [Wide Weapon Rack](components/lights.md#wide-weapon-rack) | Power In | Passthrough | 1 |

## [Smart](components/smart.md)

| Type | Name | Inputs | Outputs | rW |
|---|---|---|---|---|
| `smart_alarm` | [Smart Alarm](components/smart.md#smart-alarm) | Power In | Power Out | 1 |
| `smart_switch` | [Smart Switch](components/smart.md#smart-switch) | Power In, Switch On, Switch Off | Power Out | 0 |
| `storage_monitor` | [Storage Monitor](components/smart.md#storage-monitor) | Power In | Power Out, Passthrough | 1 |

## [Utilities](components/utilities.md)

| Type | Name | Inputs | Outputs | rW |
|---|---|---|---|---|
| `doorcontroller` | [Door Controller](components/utilities.md#door-controller) | Power In, Open, Close | Passthrough | 1 |
| `audioalarm` | [Audio Alarm](components/utilities.md#audio-alarm) | Power In | — | 1 |
| `igniter` | [Igniter](components/utilities.md#igniter) | Power In | — | 2 |
| `cctv_camera` | [CCTV Camera](components/utilities.md#cctv-camera) | Power In | — | 3 |
| `ptz_cctv_camera` | [PTZ CCTV Camera](components/utilities.md#ptz-cctv-camera) | Power In | — | 3 |
| `electricheater` | [Electric Heater](components/utilities.md#electric-heater) | Power In | Passthrough | 3 |
| `modularcarlift` | [Modular Car Lift](components/utilities.md#modular-car-lift) | Power In | — | 5 |
| `computerstation` | [Computer Station](components/utilities.md#computer-station) | Power In | — | 5 |
| `elevator` | [Elevator](components/utilities.md#elevator) | Power In, Call Elevator, Call Elevator Alt | — | 5 |
| `telephone` | [Telephone](components/utilities.md#telephone) | Power In | Call Passthrough | 1 |
| `digitalclock` | [Digital Clock](components/utilities.md#digital-clock) | Power In | Power Out | 1 |
| `fridge` | [Fridge](components/utilities.md#fridge) | Power In | — | 5 |
| `mini_fridge` | [Mini Fridge](components/utilities.md#mini-fridge) | Power In | — | 2 |
| `vending.machine` | [Vending Machine](components/utilities.md#vending-machine) | Power In | — | 5 |
| `commandblock` | [Command Block](components/utilities.md#command-block) | Power In | Passthrough | 1 |
| `fogmachine` | [Fogger-3000](components/utilities.md#fogger-3000) | Turn On, Toggle, Turn Off | — | 1 |
| `snowmachine` | [Snow Machine](components/utilities.md#snow-machine) | Toggle, Turn On, Turn Off | — | 1 |
| `spookyspeaker` | [Spooky Speaker](components/utilities.md#spooky-speaker) | Turn On, Turn Off | — | 1 |

## [Defense](components/defense.md)

| Type | Name | Inputs | Outputs | rW |
|---|---|---|---|---|
| `samsite` | [SAM Site](components/defense.md#sam-site) | Power In, Invert Mode | Has Target, Low Ammo, No Ammo, Passthrough | 25 |
| `autoturret` | [Auto Turret](components/defense.md#auto-turret) | Power In | Has Target, Low Ammo, No Ammo | 10 |
| `teslacoil` | [Tesla Coil](components/defense.md#tesla-coil) | Power In | — | 1 |

## [Water](components/water.md)

| Type | Name | Inputs | Outputs | rW |
|---|---|---|---|---|
| `watercatcher_large` | [Large Water Catcher](components/water.md#large-water-catcher) | Water In (w) | Water Out (w) | source |
| `watercatcher_small` | [Small Water Catcher](components/water.md#small-water-catcher) | Water In (w) | Water Out (w) | source |
| `waterbarrel` | [Water Barrel](components/water.md#water-barrel) | Water In (w) | Water Out (w) | source |
| `waterpump` | [Water Pump](components/water.md#water-pump) | Power In | Water Output (w) | 5 |
| `waterpurifier` | [Powered Water Purifier](components/water.md#powered-water-purifier) | Power In, Water In (w) | Water Out (w) | 5 |
| `waterpurifier_simple` | [Water Purifier](components/water.md#water-purifier) | Water In (w) | Water Out (w) | source |
| `2mod_fueltank` | [Fuel Tank Vehicle Module](components/water.md#fuel-tank-vehicle-module) | Water In 1 (w), Water In 2 (w) | Water Out 1 (w), Water Out 2 (w) | source |
| `fluid_switch` | [Fluid Switch & Pump](components/water.md#fluid-switch-pump) | Water In (w), Pump Power, Toggle | Water Out (w) | 0 |
| `fluid_combiner` | [Fluid Combiner](components/water.md#fluid-combiner) | Water In 1 (w), Water In 2 (w), Water In 3 (w) | Water Out (w) | 0 |
| `fluid_splitter` | [Fluid Splitter](components/water.md#fluid-splitter) | Water In (w) | Water Out 1 (w), Water Out 2 (w), Water Out 3 (w) | 0 |
| `sprinkler` | [Sprinkler](components/water.md#sprinkler) | Water In (w) | Passthrough (w) | 1 |

## [Industrial](components/industrial.md)

| Type | Name | Inputs | Outputs | rW |
|---|---|---|---|---|
| `electric_furnace` | [Electric Furnace](components/industrial.md#electric-furnace) | Power In | — | 3 |
| `hopper` | [Hopper](components/industrial.md#hopper) | Industrial In (i), Power In | Industrial Out (i) | 8 |
| `industrial_combiner` | [Industrial Combiner](components/industrial.md#industrial-combiner) | Industrial In 1 (i), Industrial In 2 (i), Industrial In 3 (i) | Industrial Out (i) | 0 |
| `industrial_splitter` | [Industrial Splitter](components/industrial.md#industrial-splitter) | Industrial In (i) | Industrial Out 1 (i), Industrial Out 2 (i), Industrial Out 3 (i) | 0 |
| `industrial_conveyor` | [Industrial Conveyor](components/industrial.md#industrial-conveyor) | Industrial In (i), Power In, Turn On, Turn Off | Passthrough, Filter Pass, Filter Fail, Industrial Out (i) | 1 |
| `industrial_crafter` | [Industrial Crafter](components/industrial.md#industrial-crafter) | Industrial In (i), Power In, Turn On, Turn Off, Toggle, Blueprints In (i) | Blueprint Out (i), Industrial Out (i) | 1 |
| `storage_adapter` | [Storage Adaptor](components/industrial.md#storage-adaptor) | Industrial In (i), Power In | Industrial Out (i), Passthrough | 1 |

## [Voice Props Pack DLC](components/voice-props-pack-dlc.md)

| Type | Name | Inputs | Outputs | rW |
|---|---|---|---|---|
| `boombox` | [Boom Box](components/voice-props-pack-dlc.md#boom-box) | Power In, Toggle Play | Audio Out | 10 |
| `connectedspeaker` | [Connected Speaker](components/voice-props-pack-dlc.md#connected-speaker) | Power/Audio In | Audio Passthrough | 1 |
| `discoball` | [Disco Ball](components/voice-props-pack-dlc.md#disco-ball) | Power/Audio In | Audio Passthrough | 1 |
| `discofloor` | [Disco Floor](components/voice-props-pack-dlc.md#disco-floor) | Power/Audio In | Audio Passthrough | 1 |
| `laserlight` | [Laser Light](components/voice-props-pack-dlc.md#laser-light) | Power/Audio In | Audio Passthrough | 1 |
| `microphonestand` | [Microphone Stand](components/voice-props-pack-dlc.md#microphone-stand) | Power/Audio In | Audio Out | 5 |
| `soundlight` | [Sound Light](components/voice-props-pack-dlc.md#sound-light) | Power/Audio In | Audio Passthrough | 1 |

## [Exhibit Decor Pack DLC](components/exhibit-decor-pack-dlc.md)

| Type | Name | Inputs | Outputs | rW |
|---|---|---|---|---|
| `bulbstringlights` | [Bulb String Lights](components/exhibit-decor-pack-dlc.md#bulb-string-lights) | Power In | Passthrough | 5 |
| `ceilingfluorescentlight` | [Ceiling Fluorescent Light](components/exhibit-decor-pack-dlc.md#ceiling-fluorescent-light) | Power In | Passthrough | 2 |
| `chandelier` | [Chandelier](components/exhibit-decor-pack-dlc.md#chandelier) | Power In | Passthrough | 4 |
| `tablelight` | [Electric Table Lamp](components/exhibit-decor-pack-dlc.md#electric-table-lamp) | Power In | Passthrough | 1 |
| `fairylights` | [Fairy Lights](components/exhibit-decor-pack-dlc.md#fairy-lights) | Power In | Passthrough | 5 |
| `fluorescentlight` | [Fluorescent Light](components/exhibit-decor-pack-dlc.md#fluorescent-light) | Power In | Passthrough | 1 |
| `spotlight` | [Spot Light](components/exhibit-decor-pack-dlc.md#spot-light) | Power In | Passthrough | 5 |
| `tripodspotlight` | [Tripod Spot Light](components/exhibit-decor-pack-dlc.md#tripod-spot-light) | Power In | Passthrough | 5 |
| `wallcabinet` | [Wall Cabinet](components/exhibit-decor-pack-dlc.md#wall-cabinet) | Power In | Passthrough | 1 |

## [Other](components/other.md)

| Type | Name | Inputs | Outputs | rW |
|---|---|---|---|---|
| `biofuelgenerator` | [Biofuel Generator](components/other.md#biofuel-generator) | Power In | Needs Stirring | 5 |
| `neonsigntr` | [Twitch Rivals Neon Sign](components/other.md#twitch-rivals-neon-sign) | Power In | Passthrough | 1 |
| `lightupframe_small` | [Light-Up Frame Small](components/other.md#light-up-frame-small) | Power In | Passthrough | 1 |
| `lightupframe_large` | [Light-Up Frame Large](components/other.md#light-up-frame-large) | Power In | Passthrough | 1 |
| `lightupframe_standing` | [Light-Up Frame Standing](components/other.md#light-up-frame-standing) | Power In | Passthrough | 1 |
| `lightupframe_xl` | [Light-Up Frame XL](components/other.md#light-up-frame-xl) | Power In | Passthrough | 1 |
| `lightupframe_xxl` | [Light-Up Frame XXL](components/other.md#light-up-frame-xxl) | Power In | Passthrough | 1 |
| `scrapframe_small` | [Shutter Frame Small](components/other.md#shutter-frame-small) | Power In | Passthrough | 1 |
| `scrapframe_large` | [Shutter Frame Large](components/other.md#shutter-frame-large) | Power In | Passthrough | 1 |
| `scrapframe_standing` | [Shutter Frame Standing](components/other.md#shutter-frame-standing) | Power In | Passthrough | 1 |
| `scrapframe_xl` | [Shutter Frame XL](components/other.md#shutter-frame-xl) | Power In | Passthrough | 1 |
| `scrapframe_xxl` | [Shutter Frame XXL](components/other.md#shutter-frame-xxl) | Power In | Passthrough | 1 |
