// Turns raw rustrician.io sources into structured data. Nothing fetched is ever executed:
// component definitions are read from the JS AST, handbook content from its embedded JSON.
import * as acorn from "acorn";
import { simple } from "acorn-walk";
import type { Sources } from "./sources.ts";

export type Port = { label: string; type: string; x: number; y: number; consumable?: boolean; reconsumable?: boolean; delayed?: boolean; direct?: boolean; warning?: boolean };
export type Prop = { name: string; type: string; value: string; tip?: string; alert?: string; minval?: string; maxval?: string; maxlen?: string; sync_attr?: string };
export type Component = {
  cmpid: string;
  alias?: string;
  name: string;
  item: string;
  info: string;
  tips: string[];
  simCategory: string;
  smart: boolean;
  attrs: Record<string, unknown>;
  ports: Port[];
  props: Prop[];
  craft: Record<string, number>;
  url?: string;
};
export type HandbookEntry = { type: "kv" | "bullet" | "img"; label?: string; value?: string; text?: string; level?: number };
export type HandbookItem = { id: string; name: string; category: string; itemId: string; stack: string; despawn: string; desc: string; sections: { title: string; entries: HandbookEntry[] }[] };
export type GuideBlock = { type: "p" | "li" | "img"; text?: string; level?: number };
export type Guide = { id: string; title: string; level: number; pos: number; sections: { heading: string | null; level: number; blocks: GuideBlock[] }[] };

export type Extracted = {
  simulatorVersion: string;
  components: Component[];
  craftingNames: Record<string, string>;
  connections: [string, string][];
  combinerSources: string[];
  defaults: { colors: Record<string, string>; environment: Record<string, string> };
  sizes: { component: [number, number]; text: [number, number]; port: [number, number]; groupPadding: number };
  limits: { maxTraceWires: number; shortCircuitLoop: number };
  handbook: { buildDate: string; buildTag: string; items: HandbookItem[]; guides: Guide[]; categoryOrder: string[] };
  items: { id: string; name: string }[];
};

function need<T>(value: T | null | undefined, what: string): T {
  if (value === null || value === undefined) throw new Error(`could not find ${what} in rustrician.io sources; the generator needs updating`);
  return value;
}

// Evaluates a literal AST node (objects, arrays, strings, numbers, !0/!1, negatives). Functions become undefined.
function literal(node: any): unknown {
  switch (node.type) {
    case "Literal":
      return node.value;
    case "ObjectExpression":
      return Object.fromEntries(
        node.properties.flatMap((p: any) => {
          if (p.type !== "Property" || p.computed) throw new Error("unsupported object syntax in component definition");
          const v = literal(p.value);
          return v === undefined ? [] : [[p.key.name ?? String(p.key.value), v]];
        }),
      );
    case "ArrayExpression":
      return node.elements.map(literal);
    case "UnaryExpression":
      if (node.operator === "!") return !literal(node.argument);
      if (node.operator === "-") return -(literal(node.argument) as number);
      break;
    case "FunctionExpression":
    case "ArrowFunctionExpression":
    case "Identifier": // references to local helper functions (consume/tip/debug callbacks)
      return undefined;
  }
  throw new Error(`unsupported ${node.type} in component definition`);
}

export function extractComponents(js: string): { components: Component[]; craftingNames: Record<string, string> } {
  const ast = acorn.parse(js, { ecmaVersion: "latest" });
  const components: Component[] = [];
  let crafting: { id: string; text: string }[] | undefined;
  simple(ast, {
    CallExpression(n: any) {
      const c = n.callee;
      if (c.type !== "MemberExpression" || c.object.name !== "components" || c.property.name !== "push") return;
      const arg = n.arguments[0];
      if (arg?.type !== "ObjectExpression") return;
      // Runtime-built generic items (cmpid "item_" + id) are not component definitions.
      const attrs = arg.properties.find((p: any) => p.key?.name === "attrs")?.value;
      const cmpidNode = attrs?.properties?.find((p: any) => p.key?.name === "cmpid")?.value;
      if (cmpidNode?.type !== "Literal") return;
      const o = literal(arg) as any;
      const cmpid = o?.attrs?.cmpid;
      if (typeof cmpid !== "string" || cmpid.startsWith("item_")) return; // generic items are built at runtime
      components.push({
        cmpid,
        alias: o.attrs.alias,
        name: o.name,
        item: String(o.item),
        info: o.info ?? "",
        tips: o.tips ?? [],
        simCategory: o.cat ?? "",
        smart: o.catsub === "smart",
        attrs: o.attrs,
        ports: o.ports ?? [],
        props: o.props ?? [],
        craft: o.craft ?? {},
        url: o.url,
      });
    },
    VariableDeclarator(n: any) {
      if (n.id.name === "craftingMap" && n.init?.type === "ArrayExpression") crafting = literal(n.init) as any;
    },
  });
  if (components.length < 50) throw new Error(`only ${components.length} components found in components.min.js; the generator needs updating`);
  const seen = new Set<string>();
  for (const c of components) {
    if (seen.has(c.cmpid)) throw new Error(`duplicate component id ${c.cmpid}`);
    seen.add(c.cmpid);
    for (const p of c.ports) if (typeof p.label !== "string" || typeof p.type !== "string") throw new Error(`malformed port on ${c.cmpid}`);
  }
  return { components, craftingNames: Object.fromEntries(need(crafting, "craftingMap").map((c) => [c.id, c.text])) };
}

// Reads the facts the simulator hard-codes in app.min.js / components.min.js. Each regex is an anchor: if the
// site's code changes shape, generation fails instead of silently documenting stale rules.
function extractRules(app: string, comps: string, components: Component[]) {
  const simulatorVersion = need(app.match(/const appver="([^"]+)"/)?.[1], "appver");
  const parseObj = (src: string) => Object.fromEntries([...src.matchAll(/(\w+):"([^"]*)"/g)].map((m) => [m[1]!, m[2]!]));
  const colors = parseObj(need(app.match(/\.colors=\{(wire:"[^}]*)\}/)?.[1], "default wire colors"));
  const environment = parseObj(need(app.match(/\.environment=\{(sun:"[^}]*)\}/)?.[1], "default environment"));

  const validator = need(app.match(/validateConnection=function\(\w,\w\)\{return ([^}]*)\}/)?.[1], "connection validator");
  const connections = [...validator.matchAll(/"(\w+)"==\w\.type&&"(\w+)"==\w\.type/g)].map((m) => [m[2]!, m[1]!] as [string, string]);
  const valid = connections.filter(([from, to]) => from.endsWith("out") && to.endsWith("in"));
  if (valid.length !== 3 || connections.length !== 6) throw new Error("connection validator changed shape; the generator needs updating");

  const size = (re: RegExp, what: string) => {
    const m = need(app.match(re), what);
    return [Number(m[1]), Number(m[2])] as [number, number];
  };
  const sizes = {
    component: size(/insertVertex\(\w,null,\w,\w,\w,(\d+),(\d+),\w\),\w\.setConnectable\(!1\),\w\.attrs=/, "component size"),
    text: size(/insertVertex\(\w,null,\w,\w\.x,\w\.y,(\d+),(\d+),\w\),\w\.setConnectable\(!1\)/, "text size"),
    port: size(/insertVertex\(\w,null,\w\[\w\]\.label,\w\[\w\]\.x,\w\[\w\]\.y,(\d+),(\d+)/, "port size"),
    groupPadding: Number(need(app.match(/groupBorderSize=(\d+)/)?.[1], "group padding")),
  };

  // Root Combiner input rule (components.min.js, combiner consume()): the wire's source must be a root producer
  // or battery flagged combinable, another Root Combiner, or a Splitter.
  const combiner = need(comps.match(/cmpid:"combiner"[\s\S]*?components\.push/)?.[0], "Root Combiner definition");
  for (const anchor of ['indexOf("battery")', '"combinable"', '"splitter"==']) {
    if (!combiner.includes(anchor)) throw new Error(`Root Combiner input rule changed (missing ${anchor}); the generator needs updating`);
  }
  const combinerSources = [
    ...components.filter((c) => (c.attrs.isroot === "1" || c.cmpid.startsWith("battery")) && c.attrs.combinable === "1").map((c) => c.cmpid),
    "combiner",
    "splitter",
  ];
  const maxTraceWires = Number(need(comps.match(/traceWiresToRoot\(\w\)\),\w\.length>(\d+)\)return!1/)?.[1], "max depth"));
  return {
    simulatorVersion,
    connections: valid,
    combinerSources,
    defaults: { colors, environment },
    sizes,
    limits: { maxTraceWires, shortCircuitLoop: 8 },
  };
}

function extractHandbook(html: string) {
  const grab = (name: string) => {
    const m = html.match(new RegExp(`const ${name} = (\\[[\\s\\S]*?\\]|\\{[\\s\\S]*?\\});\\s*\\n\\s*const `));
    return JSON.parse(need(m?.[1], `handbook ${name}`));
  };
  const items: HandbookItem[] = grab("ITEMS");
  const guides: Guide[] = grab("GUIDES");
  const categoryOrder: string[] = grab("CATEGORY_ORDER");
  if (items.length < 50 || guides.length < 5) throw new Error("handbook data is unexpectedly small; the generator needs updating");
  const tag = html.match(/class="build-date" tag="(\d+)">([^<]*)</);
  return { buildTag: tag?.[1] ?? "", buildDate: (tag?.[2] ?? "").replace(/^Build Date:\s*/, ""), items, guides, categoryOrder: categoryOrder.filter((c) => c !== "All") };
}

export function extract(s: Sources): Extracted {
  const compJs = need(s.scripts["js/components.min.js"], "components.min.js");
  const appJs = need(s.scripts["js/app.min.js"], "app.min.js");
  const { components, craftingNames } = extractComponents(compJs);
  const items = (JSON.parse(s.itemList).items as { id: string; name: string }[])
    .filter((i) => i.id && i.name && !i.name.startsWith("#"))
    .map((i) => ({ id: String(i.id), name: i.name }))
    .sort((a, b) => a.name.localeCompare(b.name) || a.id.localeCompare(b.id));
  return { ...extractRules(appJs, compJs, components), components, craftingNames, handbook: extractHandbook(s.handbookHtml), items };
}
