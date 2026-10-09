# rustrician-skill

An [Agent Skill](https://agentskills.io/specification) that lets LLM agents design Rust (the game) electrical, water and industrial circuits as [rustrician.io](https://rustrician.io/) schematics: importable circuit XML, validation, and explanations grounded in the [Rust Electrical Handbook](https://rustrician.io/handbook/).

> **Credits.** rustrician.io is made by JaviteSoft. The Rust Electrical Handbook is created and maintained by
> @SwiftCoyote with the [Rustricity Workshop](https://discord.rustrician.io/) community. Most of the skill's
> reference material is their work, regenerated from their sites; see [NOTICE.md](NOTICE.md). This is an
> unofficial project, not affiliated with either.

```sh
npx skills add bobosneefdev/rustrician-skill
```

## What the agent gets

- `skills/rustrician/SKILL.md`: workflow, circuit spec format, the simulator's hard wiring rules and power fundamentals.
- `scripts/rustrician.mjs`: dependency-free toolkit (Node 18+, Bun or Deno) to `build` a JSON spec into XML, `check` XML, `decompile` shared circuits, and look up components (`info`, `list`, `items`).
- `references/`: every simulator component (ports, properties, consumption, handbook behavior), the full handbook concept guides, and community example circuits.
- `assets/`: machine-readable component catalog and item list used by the toolkit.

## How it stays current

Everything under `skills/rustrician/` except `scripts/rustrician.mjs` is generated from rustrician.io by `scripts/generate.ts`:

1. Fetches the homepage, `components.min.js`, `app.min.js`, the handbook and the item list.
2. Hashes them (ignoring the homepage's live Discord counters) and compares against `sources.lock.json`.
3. On change, reads component definitions from the JS AST and handbook content from its embedded JSON. Nothing fetched is executed. Every simulator rule it relies on is matched by an anchor, so a site restructure fails the run instead of producing a wrong skill.
4. Validates the result against the Agent Skills spec, then writes it.

`.github/workflows/update-skill.yml` runs this daily at 06:17 UTC (and on demand, with an optional force flag) and verifies the result with type checks, tests and the reference `skills-ref` validator. It never pushes generated content directly: when the output changes it opens (or updates) a pull request on the `auto/update-skill` branch for a maintainer to review, because the generated text reaches every agent that installs the skill.

GitHub disables scheduled workflows after 60 days without commits in a public repository. If the repository has been quiet for 50 days, the workflow commits a one-line `.github/heartbeat` timestamp to keep the schedule alive.

One-time repository setting the workflow needs: **Settings → Actions → General → Workflow permissions → Allow GitHub Actions to create and approve pull requests.**

## Development

```sh
bun install
bun run generate          # regenerate if rustrician.io changed (--force to always)
bun test                  # toolkit + generator tests
bun run typecheck
bun run validate          # Agent Skills spec + link checks
```
