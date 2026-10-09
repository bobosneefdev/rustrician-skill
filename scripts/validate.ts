// Agent Skills spec checks (https://agentskills.io/specification), mirroring the reference `skills-ref validate`,
// plus link and size checks. Used before writing generated files and by `bun run validate`.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, posix, relative } from "node:path";

const ALLOWED = new Set(["name", "description", "license", "allowed-tools", "metadata", "compatibility"]);

export function validateSkill(dirName: string, files: Map<string, string>): string[] {
  const errors: string[] = [];
  const md = files.get("SKILL.md");
  if (!md) return ["SKILL.md is missing"];
  const m = md.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) return ["SKILL.md must start with YAML frontmatter delimited by ---"];
  let fm: Record<string, unknown>;
  try {
    fm = Bun.YAML.parse(m[1]!) as Record<string, unknown>;
  } catch (e) {
    return [`frontmatter is not valid YAML: ${(e as Error).message}`];
  }
  if (!fm || typeof fm !== "object" || Array.isArray(fm)) return ["frontmatter must be a mapping"];
  const extra = Object.keys(fm).filter((k) => !ALLOWED.has(k));
  if (extra.length) errors.push(`unexpected frontmatter fields: ${extra.join(", ")}`);

  const name = fm.name;
  if (typeof name !== "string" || !name.trim()) errors.push("name must be a non-empty string");
  else {
    if (name.length > 64) errors.push("name exceeds 64 characters");
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) errors.push("name must be lowercase letters/digits with single inner hyphens");
    if (name !== dirName) errors.push(`name "${name}" must match directory "${dirName}"`);
  }
  const desc = fm.description;
  if (typeof desc !== "string" || !desc.trim()) errors.push("description must be a non-empty string");
  else if (desc.length > 1024) errors.push(`description is ${desc.length} characters (max 1024)`);
  if ("compatibility" in fm && (typeof fm.compatibility !== "string" || fm.compatibility.length < 1 || fm.compatibility.length > 500)) {
    errors.push("compatibility must be a 1-500 character string");
  }
  if ("license" in fm && typeof fm.license !== "string") errors.push("license must be a string");
  if ("allowed-tools" in fm && typeof fm["allowed-tools"] !== "string") errors.push("allowed-tools must be a space-separated string");
  if ("metadata" in fm) {
    const meta = fm.metadata;
    if (!meta || typeof meta !== "object" || Array.isArray(meta)) errors.push("metadata must be a mapping");
    else for (const [k, v] of Object.entries(meta)) if (typeof v !== "string") errors.push(`metadata.${k} must be a string`);
  }

  const lines = md.split("\n").length;
  if (lines > 500) errors.push(`SKILL.md has ${lines} lines (spec recommends under 500)`);

  // Every relative markdown link must resolve to a file in the skill.
  for (const [path, text] of files) {
    if (!path.endsWith(".md")) continue;
    for (const link of text.matchAll(/\]\(([^)\s]+)\)/g)) {
      const target = link[1]!.split("#")[0]!;
      if (!target || /^[a-z]+:/i.test(target)) continue;
      const resolved = posix.normalize(posix.join(posix.dirname(path), target));
      if (!files.has(resolved)) errors.push(`${path}: broken link to ${link[1]}`);
    }
  }
  return errors;
}

export function readSkillDir(dir: string): Map<string, string> {
  const files = new Map<string, string>();
  const walk = (d: string) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name);
      if (e.isDirectory()) walk(p);
      else files.set(relative(dir, p).split("\\").join("/"), readFileSync(p, "utf8"));
    }
  };
  walk(dir);
  return files;
}

if (import.meta.main) {
  const root = join(import.meta.dir, "..", "skills");
  const dirs = existsSync(root) ? readdirSync(root, { withFileTypes: true }).filter((e) => e.isDirectory()) : [];
  if (!dirs.length) {
    console.error("no skills found under skills/");
    process.exit(1);
  }
  let failed = false;
  for (const d of dirs) {
    const errors = validateSkill(d.name, readSkillDir(join(root, d.name)));
    for (const e of errors) console.error(`skills/${d.name}: ${e}`);
    if (errors.length) failed = true;
    else console.log(`skills/${d.name}: valid`);
  }
  process.exit(failed ? 1 : 0);
}
