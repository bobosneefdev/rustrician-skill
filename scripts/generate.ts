#!/usr/bin/env bun
// Regenerates skills/rustrician from rustrician.io when the site's HTML/JS changes.
//   bun run generate            regenerate only if sources changed since the last generation
//   bun run generate --force    regenerate regardless
// Prints `changed=true|false` (also appended to $GITHUB_OUTPUT when set).
import { appendFileSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { extract } from "./extract.ts";
import { fetchSources, fingerprint } from "./sources.ts";
import { render, SKILL_NAME } from "./render.ts";
import { validateSkill } from "./validate.ts";

const ROOT = join(import.meta.dir, "..");
const SKILL_DIR = join(ROOT, "skills", SKILL_NAME);
const STATE_FILE = join(ROOT, "sources.lock.json");
// Hand-written files inside the skill directory that generation must never delete.
const KEEP = new Set(["scripts/rustrician.mjs"]);

const force = process.argv.includes("--force");

function output(changed: boolean) {
  console.log(`changed=${changed}`);
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `changed=${changed}\n`);
}

function walk(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));
}

const sources = await fetchSources();
const fp = fingerprint(sources);
const previous = existsSync(STATE_FILE) ? await Bun.file(STATE_FILE).json() : null;

if (!force && previous?.combined === fp.combined) {
  console.log(`rustrician.io unchanged since ${previous.generatedAt} (${fp.combined.slice(0, 12)})`);
  output(false);
  process.exit(0);
}

const changedFiles = Object.keys(fp.files).filter((k) => previous?.files?.[k] !== fp.files[k]);
console.log(previous ? `changed sources: ${changedFiles.join(", ") || "(none, forced)"}` : "first generation");

const generatedAt = new Date().toISOString().slice(0, 10);
const files = render(extract(sources), { generatedAt, sourceHash: fp.combined.slice(0, 16) });

// Build into memory, validate, then swap: a failed run never leaves a half-written skill behind.
const problems = validateSkill(SKILL_NAME, files);
if (problems.length) {
  console.error(problems.map((p) => `invalid skill: ${p}`).join("\n"));
  process.exit(1);
}

let written = 0;
for (const path of walk(SKILL_DIR)) {
  const rel = relative(SKILL_DIR, path);
  if (!KEEP.has(rel) && !files.has(rel)) rmSync(path);
}
for (const [rel, text] of files) {
  const path = join(SKILL_DIR, rel);
  mkdirSync(dirname(path), { recursive: true });
  const old = existsSync(path) ? await Bun.file(path).text() : null;
  if (old !== text) {
    await Bun.write(path, text);
    written++;
  }
}
// Remove directories emptied by deletions.
for (const dir of walk(SKILL_DIR).map(dirname).concat(SKILL_DIR)) if (existsSync(dir) && !readdirSync(dir).length) rmSync(dir, { recursive: true });

await Bun.write(STATE_FILE, JSON.stringify({ generatedAt, combined: fp.combined, files: fp.files }, null, 2) + "\n");
console.log(`wrote ${written} of ${files.size} generated files to ${relative(ROOT, SKILL_DIR)}`);
output(true);
