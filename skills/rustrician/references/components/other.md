# Components: Other

Port labels are case-sensitive in exported XML (the build script matches them case-insensitively).
Side = where the port sits on the 64×64 component. Back to the [component index](../components.md).

## Biofuel Generator

Type `biofuelgenerator` · item -1661343913

A large pot that can convert organic matter into fuel.

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | right |  |
| `Needs Stirring` | out | power | left |  |

Properties (`props` in a spec):
- `Needs Stirring` — bool, default `true` *(simulator-only setting)*. Enable to output power to Needs Stirring.

Simulator: consumption 5 rW.
Craft: 250 Metal Fragments, 150 Wood.

- Requires 5 power to operate and will output 1 power when stirring is needed
- Produces a maximum of 300 Low Grade Fuel per hour

## Twitch Rivals Neon Sign

Type `neonsigntr` · item 381595627

A Twitch Rivals Light-Up Neon Sign

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | right |  |
| `Passthrough` | out | power | left |  |

Simulator: consumption 1 rW · rotatable (0/90/180/270).
Craft: 150 Metal Fragments.

- Has a passthrough power output
- Can be rotated before placing by pressing R in-game, or by pressing R after placing in the simulator

## Light-Up Frame Small

Type `lightupframe_small` · item 1691223771

A small light-up frame

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Passthrough` | out | power | right |  |

Simulator: consumption 1 rW.
Craft: 150 Wood.

## Light-Up Frame Large

Type `lightupframe_large` · item 242421166

A large light-up frame

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Passthrough` | out | power | right |  |

Simulator: consumption 1 rW.
Craft: 150 Wood.

## Light-Up Frame Standing

Type `lightupframe_standing` · item 1950013766

A standing light-up frame

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Passthrough` | out | power | right |  |

Simulator: consumption 1 rW.
Craft: 150 Wood.

## Light-Up Frame XL

Type `lightupframe_xl` · item 1801656689

An extra large light-up frame

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Passthrough` | out | power | right |  |

Simulator: consumption 1 rW.
Craft: 150 Wood.

## Light-Up Frame XXL

Type `lightupframe_xxl` · item 1447138977

An extra extra large light-up frame

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Passthrough` | out | power | right |  |

Simulator: consumption 1 rW.
Craft: 150 Wood.

## Shutter Frame Small

Type `scrapframe_small` · item -498301781

A small shutter frame

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Passthrough` | out | power | right |  |

Simulator: consumption 1 rW.
Craft: 150 Wood.

## Shutter Frame Large

Type `scrapframe_large` · item -1094453063

A large shutter frame

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Passthrough` | out | power | right |  |

Simulator: consumption 1 rW.
Craft: 150 Wood.

## Shutter Frame Standing

Type `scrapframe_standing` · item -1774190142

A standing shutter frame

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Passthrough` | out | power | right |  |

Simulator: consumption 1 rW.
Craft: 150 Wood.

## Shutter Frame XL

Type `scrapframe_xl` · item -1244287686

An extra large shutter frame

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Passthrough` | out | power | right |  |

Simulator: consumption 1 rW.
Craft: 150 Wood.

## Shutter Frame XXL

Type `scrapframe_xxl` · item -1211801774

An extra extra large shutter frame

| Port | Dir | Medium | Side | Notes |
|---|---|---|---|---|
| `Power In` | in | power | left |  |
| `Passthrough` | out | power | right |  |

Simulator: consumption 1 rW.
Craft: 150 Wood.
