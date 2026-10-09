// Fetches the rustrician.io sources the skill is generated from and fingerprints them.
import { createHash } from "node:crypto";

export const BASE = "https://rustrician.io/";

// Scripts that define circuit semantics. The rest (mxGraph, analytics, layout splitters) never affect the skill.
const RELEVANT_SCRIPTS = ["js/components.min.js", "js/app.min.js"];

export type Sources = {
  indexHtml: string;
  handbookHtml: string;
  scripts: Record<string, string>; // path (no query string) -> source
  itemList: string; // item_list.php JSON (generic Rust items used as industrial containers)
};

async function get(url: string): Promise<string> {
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(url, { headers: { "user-agent": "rustrician-skill-generator (+https://github.com/bobosneefdev/rustrician-skill)" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const body = await res.text();
      if (!body.trim()) throw new Error("empty body");
      return body;
    } catch (e) {
      if (attempt >= 3) throw new Error(`GET ${url} failed: ${(e as Error).message}`);
      await Bun.sleep(2000 * attempt);
    }
  }
}

export async function fetchSources(): Promise<Sources> {
  const indexHtml = await get(BASE);
  const srcs = [...indexHtml.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]!);
  const scripts: Record<string, string> = {};
  for (const path of RELEVANT_SCRIPTS) {
    const src = srcs.find((s) => s.split("?")[0] === path);
    if (!src) throw new Error(`rustrician.io no longer loads ${path}; the generator needs updating`);
    scripts[path] = await get(new URL(src, BASE).href);
  }
  const handbookHtml = await get(new URL("handbook/", BASE).href);
  // The site appends the current date to bust caches; the content is not date dependent.
  const itemList = await get(new URL("item_list.php", BASE).href);
  return { indexHtml, handbookHtml, scripts, itemList };
}

// The homepage embeds live Discord member counts; strip them so only real changes alter the hash.
export function normalizeIndex(html: string): string {
  return html.replace(/[\d,]+ Online/g, "N Online").replace(/[\d,]+ Members/g, "N Members");
}

const sha = (s: string) => createHash("sha256").update(s).digest("hex");

export function fingerprint(s: Sources) {
  const files: Record<string, string> = {
    "index.html": sha(normalizeIndex(s.indexHtml)),
    "handbook/index.html": sha(s.handbookHtml),
    "item_list.php": sha(s.itemList),
  };
  for (const [k, v] of Object.entries(s.scripts)) files[k] = sha(v);
  const combined = sha(Object.keys(files).sort().map((k) => `${k}:${files[k]}`).join("\n"));
  return { combined, files };
}
