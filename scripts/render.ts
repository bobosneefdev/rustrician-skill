// Renders extracted rustrician.io data into the skill directory contents (path -> file text).
import type { Component, Extracted, Guide, GuideBlock, HandbookEntry, HandbookItem, Port } from "./extract.ts";
import { skillMd } from "./skill-md.ts";

export const SKILL_NAME = "rustrician";
const HANDBOOK = "https://rustrician.io/handbook/";
// Chapters longer than this (in markdown characters) are split into one file per top-level section.
const SPLIT_CHAPTER_AT = 40_000;

const MEDIUM: Record<string, string> = { in: "power", out: "power", fin: "water", fout: "water", iin: "industrial", iout: "industrial" };
const HIDDEN = new Set(["dummy", "odummy"]);

export const slug = (s: string) =>
  s
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "section";

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", middot: "·" };

// Handbook text is a small HTML subset (strong/em/u/span/a). Unknown tags are literal text like "<item_name>".
export function inline(html: string): string {
  return html
    .replace(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, text) => {
      const t = inline(text).trim();
      return t && t !== href ? `[${t}](${href})` : `<${href}>`;
    })
    .replace(/<\/?(strong|b)>/gi, "**")
    .replace(/<\/?(em|i)>/gi, "*")
    .replace(/<\/?u>/gi, "")
    .replace(/<\/?span\b[^>]*>/gi, "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/\*\*(\s*)\*\*/g, "$1")
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) =>
      e[0] === "#" ? String.fromCodePoint(e[1]!.toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)) : (ENTITIES[e.toLowerCase()] ?? m),
    )
    .replace(/[ \t]+/g, " ")
    .trim();
}

// Escape bare angle brackets (e.g. "<item_name>") without touching autolinks we produced.
const safeText = (s: string) => s.replace(/<(?!https?:\/\/)([^>]*)>/g, "`<$1>`");

function blocksMd(blocks: GuideBlock[]): string {
  const out: string[] = [];
  let inList = false;
  for (const b of blocks) {
    if (b.type === "img") continue; // images live on the website; their captions are usually adjacent text
    const text = safeText(inline(b.text ?? ""));
    if (!text) continue;
    if (b.type === "li") {
      if (!inList) out.push("");
      out.push(`${"  ".repeat(b.level ?? 0)}- ${text}`);
      inList = true;
    } else {
      out.push("", text);
      inList = false;
    }
  }
  return out.join("\n").trim();
}

function entriesMd(entries: HandbookEntry[]): string {
  return entries
    .filter((e) => e.type !== "img")
    .map((e) => {
      const pad = "  ".repeat(e.level ?? 0);
      if (e.type === "kv") {
        const v = safeText(inline(e.value ?? ""));
        return `${pad}- **${safeText(inline(e.label ?? ""))}**${v ? `: ${v}` : ""}`;
      }
      return `${pad}- ${safeText(inline(e.text ?? ""))}`;
    })
    .join("\n");
}

const portSide = (p: Port) => (p.y >= 1 ? "bottom" : p.y < 0 ? "top" : p.x < 0 ? "left" : p.x >= 1 ? "right" : "center");

// ---------- handbook <-> simulator matching ----------

const key = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
// Handbook names that differ from simulator names.
const NAME_ALIASES: Record<string, string> = {
  largesolarpanel: "solarpanel_large",
  greenindustriallight: "industrial_wall_light_green",
  redindustriallight: "industrial_wall_light_red",
  blueindustrialwalllight: "industrial_wall_light_blue",
  industrialwalllight: "industrial_wall_light",
};

export function matchHandbook(x: Extracted): Map<string, HandbookItem> {
  const byCmp = new Map<string, HandbookItem>();
  const byName = new Map(x.components.map((c) => [key(c.name), c]));
  const byCmpid = new Map(x.components.map((c) => [c.cmpid, c]));
  // Names first (handbook item IDs contain typos and shared IDs), then item IDs for anything left.
  for (const h of x.handbook.items) {
    const c = byCmpid.get(NAME_ALIASES[key(h.name)] ?? "") ?? byName.get(key(h.name));
    if (c && !byCmp.has(c.cmpid)) byCmp.set(c.cmpid, h);
  }
  const taken = new Set([...byCmp.values()].map((h) => h.id));
  for (const c of x.components) {
    if (byCmp.has(c.cmpid)) continue;
    const h = x.handbook.items.find((i) => !taken.has(i.id) && i.itemId === c.item);
    if (h) {
      byCmp.set(c.cmpid, h);
      taken.add(h.id);
    }
  }
  return byCmp;
}

// ---------- components reference ----------

function componentMd(c: Component, x: Extracted, h: HandbookItem | undefined): string {
  const L: string[] = [`### ${c.name}`, ""];
  const ids = [`\`${c.cmpid}\``, c.alias ? `alias \`${c.alias}\`` : "", `item ${c.item}`].filter(Boolean).join(" · ");
  L.push(`Type ${ids}${c.smart ? " · Rust+ smart device" : ""}`);
  if (c.info) L.push("", safeText(c.info));
  const ports = c.ports.filter((p) => !HIDDEN.has(p.type));
  L.push("", "| Port | Dir | Medium | Side | Notes |", "|---|---|---|---|---|");
  for (const p of ports) {
    const notes = [p.direct && "divides input evenly", p.delayed && "updates after other outputs", p.reconsumable && "re-consumable", p.warning && "buggy in-game, avoid"].filter(Boolean).join("; ");
    L.push(`| \`${p.label}\` | ${p.type.endsWith("out") ? "out" : "in"} | ${MEDIUM[p.type]} | ${portSide(p)} | ${notes} |`);
  }
  if (!ports.length) L.push("| (no wireable ports) | | | | |");
  if (c.props.length) {
    L.push("", "Properties (`props` in a spec):");
    for (const p of c.props) {
      const lim = [p.minval && `min ${p.minval}`, p.maxval && `max ${p.maxval}`].filter(Boolean).join(", ");
      const sim = p.alert?.includes("simulator-only") ? " *(simulator-only setting)*" : "";
      L.push(`- \`${p.name}\` — ${p.type}, default \`${p.value === "" ? '""' : p.value}\`${lim ? ` (${lim})` : ""}${sim}${p.tip ? `. ${safeText(p.tip)}` : ""}`);
    }
  }
  const a = c.attrs;
  const facts = [
    `consumption ${a.consumption ?? "0"} rW`,
    a.isroot === "1" ? "root power source" : "",
    x.combinerSources.includes(c.cmpid) ? "accepted by Root Combiner" : "",
    Number(a.rotatable) === 1 ? "rotatable (0/90/180/270)" : "",
    a.blockable === "1" ? "can block battery discharge" : "",
  ].filter(Boolean);
  L.push("", `Simulator: ${facts.join(" · ")}.`);
  const craft = Object.entries(c.craft).map(([k, v]) => `${v} ${x.craftingNames[k] ?? k}`);
  if (craft.length) L.push(`Craft: ${craft.join(", ")}.`);
  if (c.tips.length) L.push("", ...c.tips.map((t) => `- ${safeText(t)}`));
  if (h) {
    for (const sec of h.sections) {
      if (sec.title === "Item Details") continue;
      const body = entriesMd(sec.entries);
      if (body) L.push("", `**${safeText(sec.title)}** (handbook)`, "", body);
    }
  }
  return L.join("\n");
}

const categoryOf = (c: Component, matched: Map<string, HandbookItem>) =>
  matched.get(c.cmpid)?.category ?? { fluid: "Water", industrial: "Industrial" }[c.simCategory] ?? "Other";

// references/components.md (compact index of every component) + references/components/<category>.md (full detail).
function componentsReference(x: Extracted, matched: Map<string, HandbookItem>): Map<string, string> {
  const groups = new Map<string, Component[]>();
  for (const c of x.components) {
    const k = categoryOf(c, matched);
    groups.set(k, [...(groups.get(k) ?? []), c]);
  }
  const order = [...x.handbook.categoryOrder.filter((k) => groups.has(k)), ...[...groups.keys()].filter((k) => !x.handbook.categoryOrder.includes(k))];
  const files = new Map<string, string>();
  const index = [
    "# Component index",
    "",
    `Every component the rustrician.io simulator supports (version ${x.simulatorVersion}). Each category file has exact port labels,`,
    `properties, consumption, crafting and the full in-game behavior from the [Rust Electrical Handbook](${HANDBOOK}).`,
    "`node scripts/rustrician.mjs info <type>` prints the same port/property data for one component.",
    "",
    "Ports below are `in` / `out` labels; (w) = water hose, (i) = industrial pipe, otherwise power wire.",
  ];
  for (const k of order) {
    const path = `references/components/${slug(k)}.md`;
    index.push("", `## [${k}](components/${slug(k)}.md)`, "", "| Type | Name | Inputs | Outputs | rW |", "|---|---|---|---|---|");
    const detail = [
      `# Components: ${k}`,
      "",
      "Port labels are case-sensitive in exported XML (the build script matches them case-insensitively).",
      "Side = where the port sits on the 64×64 component. Back to the [component index](../components.md).",
    ];
    for (const c of groups.get(k)!) {
      const ports = c.ports.filter((p) => !HIDDEN.has(p.type));
      const fmt = (ps: Port[]) => ps.map((p) => `${p.label}${MEDIUM[p.type] === "water" ? " (w)" : MEDIUM[p.type] === "industrial" ? " (i)" : ""}`).join(", ") || "—";
      index.push(`| \`${c.cmpid}\` | [${c.name}](components/${slug(k)}.md#${slug(c.name)}) | ${fmt(ports.filter((p) => !p.type.endsWith("out")))} | ${fmt(ports.filter((p) => p.type.endsWith("out")))} | ${c.attrs.consumption ?? (c.attrs.isroot === "1" ? "source" : "0")} |`);
      detail.push("", componentMd(c, x, matched.get(c.cmpid)).replace(/^### /, "## "));
    }
    files.set(path, detail.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n");
  }
  files.set("references/components.md", index.join("\n") + "\n");
  return files;
}

function unsupportedReference(x: Extracted, matched: Map<string, HandbookItem>): string {
  const used = new Set([...matched.values()].map((h) => h.id));
  const rest = x.handbook.items.filter((h) => !used.has(h.id));
  const L = [
    "# Handbook items the simulator cannot place",
    "",
    "These appear in the Rust Electrical Handbook but have no rustrician.io component (tools, fireworks, items placed by other means).",
    "Mention them in notes when a design needs them in-game; do not put them in a circuit spec.",
  ];
  for (const h of rest) {
    L.push("", `## ${h.name}`, "", `Category: ${h.category}${h.itemId ? ` · Item ID: ${h.itemId}` : ""}`);
    if (h.desc) L.push("", safeText(inline(h.desc)));
    for (const sec of h.sections) {
      if (sec.title === "Item Details") continue;
      const body = entriesMd(sec.entries);
      if (body) L.push("", `**${safeText(sec.title)}**`, "", body);
    }
  }
  return L.join("\n").trim() + "\n";
}

// ---------- guides ----------

type Doc = { path: string; title: string; summary: string; body: string };

type Section = Guide["sections"][number];

// First sentence (or word-boundary cut) of some handbook text, for index summaries.
function blurb(html: string, max = 140): string {
  const t = inline(html).replace(/[*`]/g, "").replace(/\s+/g, " ").trim();
  // Whole sentences until the blurb says something (>= 40 chars), e.g. skip "There is no way around this."
  let sentence = "";
  for (const m of t.matchAll(/[^.!?]+(?:[.!?]+|$)/g)) {
    sentence = `${sentence} ${m[0].trim()}`.trim();
    if (sentence.length >= 40) break;
  }
  if (sentence.length <= max) return sentence;
  return sentence.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

// One markdown file per guide; any file over SPLIT_CHAPTER_AT is split by its next heading level, recursively.
function guideDocs(g: Guide): Doc[] {
  const headed = g.sections.filter((s) => s.heading);
  const min = Math.min(...headed.map((s) => s.level), 9);
  const heading = (s: Section) => `${"#".repeat(Math.min(6, s.level - min + 2))} ${safeText(inline(s.heading!))}`;
  const sectionMd = (s: Section) => [heading(s), "", blocksMd(s.blocks)].join("\n").trim();
  const introMd = g.sections.filter((s) => !s.heading).map((s) => blocksMd(s.blocks)).filter(Boolean).join("\n\n");
  // First substantive sentence: skips captions and in-text labels such as "About the Name".
  const firstText = (secs: Section[]) => {
    const texts = secs.flatMap((s) => s.blocks).filter((b) => b.type !== "img").map((b) => b.text ?? "");
    return texts.find((t) => inline(t).replace(/[*`]/g, "").length >= 40) ?? texts.find((t) => inline(t)) ?? "";
  };
  const summarize = (secs: Section[]) => {
    const top = Math.min(...secs.map((s) => s.level));
    const heads = secs.filter((s) => s.level === top).map((s) => inline(s.heading!));
    return heads.length > 1 ? heads.join("; ") : blurb(firstText(secs));
  };
  const used = new Set<string>();
  const unique = (base: string) => {
    let p = `${base}.md`;
    for (let i = 2; used.has(p); i++) p = `${base}-${i}.md`;
    used.add(p);
    return p;
  };
  const split = (title: string, base: string, secs: Section[], intro: string, depth: number): Doc[] => {
    const md = [intro, ...secs.map(sectionMd)].filter(Boolean).join("\n\n");
    if (md.length <= SPLIT_CHAPTER_AT || secs.length <= 1) {
      const intros = g.sections.filter((s) => !s.heading);
      const own = depth === 0 ? blurb(firstText(intros)).replace(/^Nothing entered.*$/i, "") : "";
      const summary = own || (secs.length ? summarize(secs) : blurb(intro));
      return [{ path: unique(base), title, summary, body: `# ${title}\n\n${md}` }];
    }
    const top = Math.min(...secs.map((s) => s.level));
    const chunks: Section[][] = [];
    for (const s of secs) {
      if (s.level === top || !chunks.length) chunks.push([s]);
      else chunks[chunks.length - 1]!.push(s);
    }
    if (chunks.length === 1) {
      // A single section with sub-sections: its own text becomes the intro and its children are split.
      const [head, ...rest] = chunks[0]!;
      return split(title, base, rest, [intro, blocksMd(head!.blocks)].filter(Boolean).join("\n\n"), depth);
    }
    const docs = chunks.flatMap((ch) => split(depth ? `${title} › ${inline(ch[0]!.heading!)}` : `${title}: ${inline(ch[0]!.heading!)}`, `${base}/${slug(inline(ch[0]!.heading!))}`, ch, "", depth + 1));
    if (intro) docs[0]!.body = docs[0]!.body.replace(/\n\n/, `\n\n${intro}\n\n`);
    return docs;
  };
  return split(g.title, `references/guides/${slug(g.title)}`, headed, introMd, 0);
}

// ---------- examples ----------

function exampleCircuits(x: Extracted): { token: string; label: string; where: string }[] {
  const seen = new Map<string, { token: string; label: string; where: string }>();
  for (const g of x.handbook.guides) {
    let where = g.title;
    for (const s of g.sections) {
      if (s.heading) where = `${g.title} › ${inline(s.heading)}`;
      for (const b of s.blocks) {
        for (const m of (b.text ?? "").matchAll(/href="https?:\/\/(?:www\.)?rustrician\.io\/\?circuit=([0-9a-f]{32})"[^>]*>([\s\S]*?)<\/a>/g)) {
          const label = inline(m[2]!);
          if (!seen.has(m[1]!)) seen.set(m[1]!, { token: m[1]!, label: /^https?:/.test(label) ? "" : label, where });
        }
      }
    }
  }
  return [...seen.values()];
}

// ---------- assemble ----------

export function render(x: Extracted, meta: { generatedAt: string; sourceHash: string }): Map<string, string> {
  const files = new Map<string, string>();
  const matched = matchHandbook(x);
  const guides = x.handbook.guides.filter((g) => g.sections.some((s) => s.blocks.some((b) => b.type !== "img")));
  const docs = guides.flatMap(guideDocs).filter((d) => d.body.split("\n").length > 2);
  for (const d of docs) files.set(d.path, d.body.replace(/\n{3,}/g, "\n\n").trim() + "\n");
  for (const [p, t] of componentsReference(x, matched)) files.set(p, t);
  files.set("references/handbook-items-not-in-simulator.md", unsupportedReference(x, matched));

  const examples = exampleCircuits(x);
  const ex = [
    "# Example circuits from the handbook",
    "",
    "Real circuits published by the Rustricity community and linked from the handbook. Open one in the simulator with",
    "`https://www.rustrician.io/?circuit=<token>`, or pull it into an editable spec to study or adapt it:",
    "",
    "```sh",
    "node scripts/rustrician.mjs decompile <token> -o example.json",
    "```",
    "",
    "Several are marked out of date by the handbook; always `check` and re-reason about anything you adapt.",
    "",
    "| Circuit | Linked from | Token |",
    "|---|---|---|",
    ...examples.map((e) => `| ${e.label ? `[${e.label.replace(/\|/g, "\\|")}](https://www.rustrician.io/?circuit=${e.token})` : `[open](https://www.rustrician.io/?circuit=${e.token})`} | ${e.where.replace(/\|/g, "\\|")} | \`${e.token}\` |`),
  ];
  files.set("references/example-circuits.md", ex.join("\n") + "\n");

  const catalog = {
    source: "https://rustrician.io/",
    simulatorVersion: x.simulatorVersion,
    connections: x.connections,
    combinerSources: x.combinerSources,
    defaults: x.defaults,
    sizes: x.sizes,
    limits: x.limits,
    craftingNames: x.craftingNames,
    components: x.components.map((c) => ({
      cmpid: c.cmpid,
      ...(c.alias ? { alias: c.alias } : {}),
      name: c.name,
      item: c.item,
      category: categoryOf(c, matched),
      info: c.info,
      tips: c.tips,
      attrs: c.attrs,
      ports: c.ports,
      props: c.props,
      craft: c.craft,
    })),
  };
  files.set("assets/catalog.json", JSON.stringify(catalog, null, 1) + "\n");
  files.set("assets/items.json", JSON.stringify(x.items) + "\n");

  const guideIndex = docs.map((d) => `- [${d.title}](${d.path})${d.summary ? ` — ${d.summary.length > 200 ? d.summary.slice(0, 200).replace(/[;,]?\s+\S*$/, "") + "…" : d.summary}` : ""}`);
  files.set(`SKILL.md`, skillMd({ x, guideIndex, generatedAt: meta.generatedAt, sourceHash: meta.sourceHash, exampleCount: examples.length }));
  return files;
}
