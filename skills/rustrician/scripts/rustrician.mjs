#!/usr/bin/env node
// Rustrician circuit toolkit. Builds rustrician.io-importable XML from a JSON circuit spec,
// validates circuit XML, and decompiles XML back into an editable spec.
// Dependency-free: runs on Node.js 18+, Bun, or Deno (`deno run -A`).
//
//   node rustrician.mjs build <spec.json|-> [-o circuit.xml]
//   node rustrician.mjs check <circuit.xml|->
//   node rustrician.mjs decompile <circuit.xml|share-token|url|-> [-o spec.json]
//   node rustrician.mjs info <type> [type...]
//   node rustrician.mjs list [filter]
//   node rustrician.mjs items <filter>

import { readFileSync, writeFileSync, realpathSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ID_RE = /^[A-Za-z0-9_-]+$/;
const COLOR_RE = /^#[0-9a-fA-F]{6}$/;
const ROTATIONS = [0, 90, 180, 270];
const HIDDEN_PORT_TYPES = new Set(["dummy", "odummy"]);
const MEDIUM = { in: "power", out: "power", fin: "water", fout: "water", iin: "industrial", iout: "industrial" };
const TEXT_STYLES = { large: "text-large", small: "text-small" };
// Max wires from a root source to a Root Combiner before "Short Circuit / Max Depth"
// (simulator traces at most 15 wires; the handbook states it as 16 components including the source).
const MAX_COMBINER_DEPTH = 15;
// Loops of this many components or fewer short circuit in-game.
const SHORT_CIRCUIT_LOOP = 8;

export class CircuitError extends Error {
  constructor(errors) {
    super(errors.join("\n"));
    this.errors = errors;
  }
}

export function loadData(dir = join(HERE, "..", "assets")) {
  return {
    catalog: JSON.parse(readFileSync(join(dir, "catalog.json"), "utf8")),
    items: JSON.parse(readFileSync(join(dir, "items.json"), "utf8")),
  };
}

// ---------- lookups ----------

const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
const isOut = (type) => type.endsWith("out");
const side = (p) => (p.y >= 1 ? "bottom" : p.y < 0 ? "top" : p.x < 0 ? "left" : p.x >= 1 ? "right" : "center");

function indexes(data) {
  if (data._idx) return data._idx;
  const byKey = new Map();
  for (const c of data.catalog.components) {
    for (const k of [c.cmpid, c.alias, c.name]) if (k && !byKey.has(norm(k))) byKey.set(norm(k), c);
  }
  const items = new Map();
  for (const it of data.items) {
    items.set(it.id, it);
    if (!items.has(norm(it.name))) items.set(norm(it.name), it);
  }
  const allowed = new Set(data.catalog.connections.map(([a, b]) => `${a}>${b}`));
  return (data._idx = { byKey, items, allowed });
}

function suggest(query, names) {
  const q = norm(query);
  const hits = names.filter((n) => norm(n).includes(q) || q.includes(norm(n)));
  return hits.length ? ` Did you mean: ${hits.slice(0, 6).join(", ")}?` : "";
}

export function findComponent(data, type) {
  return indexes(data).byKey.get(norm(type)) ?? null;
}

function findItem(data, query) {
  const idx = indexes(data).items;
  return idx.get(String(query)) ?? idx.get(norm(query)) ?? null;
}

function itemCraft(it) {
  const craft = {};
  for (const part of (it.craft || "").split("||")) {
    const [k, v] = part.split("|");
    if (k && v !== undefined) craft[k.replace(/ /g, "_")] = Number(v);
  }
  return craft;
}

// ---------- XML writing ----------

const esc = (v) =>
  String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\r?\n/g, "&#10;")
    .replace(/\t/g, "&#9;");

function el(tag, attrs = {}, children = []) {
  const a = Object.entries(attrs)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(([k, v]) => ` ${k}="${esc(v)}"`)
    .join("");
  return children.length ? `<${tag}${a}>${children.join("")}</${tag}>` : `<${tag}${a}/>`;
}

// Mirrors mxCodec: primitives become attributes, objects <Object>, arrays <Array>, booleans "1"/"0".
function encodeValue(value, as) {
  if (Array.isArray(value)) return el("Array", { as }, value.map((v) => encodeValue(v)));
  if (value && typeof value === "object") {
    const prims = {};
    const kids = [];
    for (const [k, v] of Object.entries(value)) {
      if (v && typeof v === "object") kids.push(encodeValue(v, k));
      else if (v !== undefined && v !== null) prims[k] = typeof v === "boolean" ? (v ? "1" : "0") : v;
    }
    return el("Object", { ...prims, as }, kids);
  }
  return el("add", { value: typeof value === "boolean" ? (value ? "1" : "0") : value });
}

const flag = (b) => (b ? "1" : "0");

// ---------- props ----------

function normalizeProp(def, raw, where) {
  const t = def.type;
  if (t === "bool") {
    if (raw === true || raw === "true") return "true";
    if (raw === false || raw === "false") return "false";
    throw `${where}: "${def.name}" must be true or false`;
  }
  if (t === "text") {
    if (typeof raw !== "string") throw `${where}: "${def.name}" must be a string`;
    const max = Number(def.maxlen || 4096);
    if (raw.length > max) throw `${where}: "${def.name}" exceeds ${max} characters`;
    return raw;
  }
  if (t === "int" || t === "float") {
    const s = String(raw).trim();
    const ok = t === "int" ? /^\d+$/.test(s) : /^\d*\.?\d*$/.test(s) && s !== "" && s !== ".";
    if (!ok) throw `${where}: "${def.name}" must be a non-negative ${t === "int" ? "integer" : "number"}`;
    const max = Number(def.maxlen || (t === "int" ? 6 : 11));
    if (s.length > max) throw `${where}: "${def.name}" may have at most ${max} characters`;
    const n = Number(s);
    const lo = Number(def.minval || 0);
    const hi = Number(def.maxval || 0);
    if (lo > 0 && n < lo) throw `${where}: "${def.name}" must be >= ${lo}`;
    if (hi > 0 && n > hi) throw `${where}: "${def.name}" must be <= ${hi}`;
    return String(n);
  }
  throw `${where}: "${def.name}" has unsupported property type ${t}`;
}

// ---------- analysis shared by build and check ----------

// model: { comps: [{key, label, cmpid, def}], wires: [{from:{comp,port}, to:{comp,port}}] }
function analyze(model, data) {
  const errors = [];
  const warnings = [];
  const sources = new Set(data.catalog.combinerSources);
  const power = model.wires.filter((w) => MEDIUM[w.from.port.type] === "power");
  const preds = new Map(model.comps.map((c) => [c.key, []]));
  const succs = new Map(model.comps.map((c) => [c.key, []]));
  for (const w of power) {
    preds.get(w.to.comp.key).push(w.from.comp);
    succs.get(w.from.comp.key).push(w.to.comp);
    if (w.to.comp.cmpid === "combiner" && !sources.has(w.from.comp.cmpid)) {
      errors.push(
        `${w.from.comp.label} -> ${w.to.comp.label}.${w.to.port.label}: a Root Combiner only accepts root power ` +
          `(${data.catalog.combinerSources.join(", ")}); the simulator rejects this wire ("Invalid Input / Root Power Only")`,
      );
    }
  }

  // Loops (Tarjan SCC over power wires).
  let index = 0;
  const stack = [];
  const meta = new Map();
  const sccs = [];
  const strong = (v) => {
    meta.set(v, { index, low: index, on: true });
    index++;
    stack.push(v);
    for (const w of succs.get(v).map((c) => c.key)) {
      if (!meta.has(w)) {
        strong(w);
        meta.get(v).low = Math.min(meta.get(v).low, meta.get(w).low);
      } else if (meta.get(w).on) meta.get(v).low = Math.min(meta.get(v).low, meta.get(w).index);
    }
    if (meta.get(v).low === meta.get(v).index) {
      const scc = [];
      let w;
      do {
        w = stack.pop();
        meta.get(w).on = false;
        scc.push(w);
      } while (w !== v);
      if (scc.length > 1 || succs.get(v).some((c) => c.key === v)) sccs.push(scc);
    }
  };
  for (const c of model.comps) if (!meta.has(c.key)) strong(c.key);
  const label = new Map(model.comps.map((c) => [c.key, c.label]));
  for (const scc of sccs) {
    warnings.push(
      `feedback loop through ${scc.length} component(s): ${scc.map((k) => label.get(k)).join(", ")}. ` +
        `In-game, loops of ${SHORT_CIRCUIT_LOOP} or fewer components are cut off as "Short Circuit"; loops never add power. ` +
        `Fine if intentional (clocks, latches) and long enough`,
    );
  }

  // Max depth from a root source to each Root Combiner (only meaningful without loops).
  if (!sccs.length) {
    // depth(c) = most wires between any root source and c (-Infinity when no source reaches it).
    const memo = new Map();
    const depth = (c) => {
      if (memo.has(c.key)) return memo.get(c.key);
      const ps = preds.get(c.key);
      const d = ps.length ? Math.max(...ps.map(depth)) + 1 : c.def?.attrs?.isroot === "1" ? 0 : -Infinity;
      memo.set(c.key, d);
      return d;
    };
    for (const c of model.comps) {
      if (c.cmpid !== "combiner") continue;
      const d = depth(c);
      if (d > MAX_COMBINER_DEPTH) {
        warnings.push(
          `${c.label}: longest path from a power source is ${d} wires (limit ${MAX_COMBINER_DEPTH}); ` +
            `expect "Short Circuit / Max Depth". Combine closer to the sources`,
        );
      }
    }
  }

  // Components with input ports but nothing wired in (root sources and container adaptors excluded).
  const fed = new Set(model.wires.map((w) => w.to.comp.key));
  for (const c of model.comps) {
    if (!c.def || c.def.attrs?.isroot === "1" || c.cmpid === "storage_adapter" || fed.has(c.key)) continue;
    if (c.def.ports.some((p) => p.type === "in" || p.type === "fin" || p.type === "iin")) {
      warnings.push(`${c.label}: no input is connected, so it will never do anything`);
    }
  }
  return { errors, warnings };
}

// ---------- build ----------

export function build(spec, data) {
  const errors = [];
  const { catalog } = data;
  const { allowed } = indexes(data);
  if (!spec || typeof spec !== "object" || Array.isArray(spec)) throw new CircuitError(["spec must be a JSON object"]);
  const comps = Array.isArray(spec.components) ? spec.components : [];
  if (!Array.isArray(spec.components)) errors.push(`"components" must be an array`);
  const wiresIn = spec.wires ?? [];
  const groupsIn = spec.groups ?? [];
  const notesIn = spec.notes ?? [];
  for (const [k, v] of [["wires", wiresIn], ["groups", groupsIn], ["notes", notesIn]]) {
    if (!Array.isArray(v)) errors.push(`"${k}" must be an array`);
  }
  if (errors.length) throw new CircuitError(errors);

  const ids = new Set();
  const claimId = (id, where) => {
    if (typeof id !== "string" || !ID_RE.test(id)) {
      errors.push(`${where}: id must be a string of letters, digits, "_" or "-" (got ${JSON.stringify(id)})`);
      return false;
    }
    if (ids.has(id)) {
      errors.push(`${where}: duplicate id "${id}"`);
      return false;
    }
    ids.add(id);
    return true;
  };
  const num = (v, where, field) => {
    if (v === undefined) return undefined;
    if (typeof v !== "number" || !Number.isFinite(v)) errors.push(`${where}: "${field}" must be a number`);
    return v;
  };

  // Components.
  const nodes = new Map();
  comps.forEach((c, i) => {
    const where = `components[${i}]${c?.id ? ` (${c.id})` : ""}`;
    if (!c || typeof c !== "object") return errors.push(`${where}: must be an object`);
    if (!claimId(c.id, where)) return;
    let def;
    let item;
    if (norm(c.type) === "item") {
      item = findItem(data, c.item ?? "");
      if (!item) return errors.push(`${where}: unknown item ${JSON.stringify(c.item)}.${suggest(c.item ?? "", data.items.map((x) => x.name))}`);
    } else {
      def = findComponent(data, c.type ?? "");
      if (!def) {
        return errors.push(
          `${where}: unknown component type ${JSON.stringify(c.type)}.` +
            suggest(c.type ?? "", catalog.components.flatMap((x) => [x.cmpid, x.name])),
        );
      }
    }
    const attrs = def ? structuredClone(def.attrs) : { cmpid: `item_${item.id}` };
    const props = def ? def.props.map(({ tip, alert, ...p }) => ({ ...p })) : [];
    for (const [name, raw] of Object.entries(c.props ?? {})) {
      const p = props.find((x) => norm(x.name) === norm(name));
      if (!p) {
        errors.push(`${where}: unknown property "${name}". Available: ${props.map((x) => x.name).join(", ") || "none"}`);
        continue;
      }
      try {
        p.value = normalizeProp(p, raw, where);
        if (p.sync_attr) attrs[p.sync_attr] = p.value;
      } catch (e) {
        errors.push(String(e));
      }
    }
    let style = `cmp_${attrs.cmpid}`;
    if (c.rotation !== undefined && c.rotation !== 0) {
      if (!def || Number(def.attrs.rotatable) !== 1) errors.push(`${where}: ${def?.name ?? item.name} cannot be rotated`);
      else if (!ROTATIONS.includes(c.rotation)) errors.push(`${where}: rotation must be one of ${ROTATIONS.join(", ")}`);
      else {
        attrs.rotation = c.rotation;
        style += `_${c.rotation}`;
      }
    }
    nodes.set(c.id, {
      kind: "component",
      id: c.id,
      key: c.id,
      label: c.id,
      cmpid: attrs.cmpid,
      def,
      name: def ? def.name : item.name,
      attrs,
      props,
      craft: def ? structuredClone(def.craft ?? {}) : itemCraft(item),
      style,
      x: num(c.x, where, "x"),
      y: num(c.y, where, "y"),
      w: catalog.sizes.component[0],
      h: catalog.sizes.component[1],
      ports: (def?.ports ?? []).map((p) => ({ ...p })),
    });
  });

  notesIn.forEach((n, i) => {
    const where = `notes[${i}]`;
    if (!n || typeof n !== "object" || typeof n.text !== "string") return errors.push(`${where}: needs a "text" string`);
    const id = n.id ?? `note_${i + 1}`;
    if (!claimId(id, where)) return;
    const style = TEXT_STYLES[n.size ?? "large"];
    if (!style) errors.push(`${where}: "size" must be "large" or "small"`);
    nodes.set(id, {
      kind: "note",
      id,
      text: n.text,
      style,
      x: num(n.x, where, "x"),
      y: num(n.y, where, "y"),
      w: num(n.width, where, "width") ?? catalog.sizes.text[0],
      h: num(n.height, where, "height") ?? catalog.sizes.text[1],
    });
  });

  // Wires.
  const wires = [];
  const used = new Map();
  const endpoint = (ref, where, wantOut) => {
    if (typeof ref !== "string" || !ref.includes(".")) {
      errors.push(`${where}: endpoint must be "componentId.Port Label" (got ${JSON.stringify(ref)})`);
      return null;
    }
    const dot = ref.indexOf(".");
    const comp = nodes.get(ref.slice(0, dot));
    const portName = ref.slice(dot + 1);
    if (!comp || comp.kind !== "component") {
      errors.push(`${where}: no component with id "${ref.slice(0, dot)}"`);
      return null;
    }
    const visible = comp.ports.filter((p) => !HIDDEN_PORT_TYPES.has(p.type));
    const port = visible.find((p) => norm(p.label) === norm(portName));
    if (!port) {
      errors.push(
        `${where}: ${comp.name} (${comp.id}) has no port "${portName}". Ports: ` +
          (visible.map((p) => `"${p.label}" (${p.type})`).join(", ") || "none"),
      );
      return null;
    }
    if (isOut(port.type) !== wantOut) {
      errors.push(`${where}: "${comp.id}.${port.label}" is an ${isOut(port.type) ? "output" : "input"}; wires go from an output to an input`);
      return null;
    }
    return { comp, port };
  };
  wiresIn.forEach((w, i) => {
    const where = `wires[${i}]`;
    const spec_ = Array.isArray(w) ? { from: w[0], to: w[1] } : w;
    if (!spec_ || typeof spec_ !== "object") return errors.push(`${where}: must be [from, to] or {from, to}`);
    const from = endpoint(spec_.from, where, true);
    const to = endpoint(spec_.to, where, false);
    if (!from || !to) return;
    if (!allowed.has(`${from.port.type}>${to.port.type}`)) {
      return errors.push(
        `${where}: cannot connect ${MEDIUM[from.port.type]} output "${spec_.from}" to ${MEDIUM[to.port.type]} input "${spec_.to}"`,
      );
    }
    for (const e of [from, to]) {
      const k = `${e.comp.id}.${e.port.label}`;
      if (used.has(k)) {
        errors.push(
          `${where}: port "${k}" already has a wire (${used.get(k)}). Each port takes exactly one wire; ` +
            `use a Splitter/Electrical Branch (or fluid/industrial splitter) to fan out and a combiner or logic gate to fan in`,
        );
      } else used.set(k, where);
    }
    if (spec_.color !== undefined && !COLOR_RE.test(spec_.color)) errors.push(`${where}: color must look like "#ff0000"`);
    const points = spec_.points ?? [];
    if (!Array.isArray(points) || points.some((p) => !Array.isArray(p) || p.length !== 2 || p.some((n) => typeof n !== "number" || !Number.isFinite(n)))) {
      errors.push(`${where}: points must be [[x, y], ...]`);
    }
    wires.push({ from, to, color: spec_.color, points: Array.isArray(points) ? points : [] });
  });

  // Groups.
  const groups = new Map();
  groupsIn.forEach((g, i) => {
    const where = `groups[${i}]`;
    if (!g || typeof g !== "object") return errors.push(`${where}: must be an object`);
    if (!claimId(g.id, where)) return;
    if (!Array.isArray(g.members) || !g.members.length) return errors.push(`${where}: "members" must be a non-empty array of ids`);
    groups.set(g.id, { kind: "group", id: g.id, label: String(g.label ?? g.id), members: g.members });
  });
  const parentOf = new Map();
  for (const g of groups.values()) {
    for (const m of g.members) {
      if (!nodes.has(m) && !groups.has(m)) errors.push(`group "${g.id}": unknown member "${m}"`);
      else if (m === g.id) errors.push(`group "${g.id}": cannot contain itself`);
      else if (parentOf.has(m)) errors.push(`"${m}" is in both group "${parentOf.get(m)}" and "${g.id}"`);
      else parentOf.set(m, g.id);
    }
  }
  for (const g of groups.values()) {
    const seen = new Set([g.id]);
    for (let p = parentOf.get(g.id); p; p = parentOf.get(p)) {
      if (seen.has(p)) {
        errors.push(`groups form a cycle through "${g.id}"`);
        break;
      }
      seen.add(p);
    }
  }
  if (spec.name !== undefined && typeof spec.name !== "string") errors.push(`"name" must be a string`);
  for (const [k, v] of Object.entries(spec.environment ?? {})) {
    const max = k === "speed" ? 20 : 100;
    if (!(k in catalog.defaults.environment)) errors.push(`environment: unknown key "${k}"`);
    else if (!Number.isInteger(v) || v < 0 || v > max) errors.push(`environment.${k} must be an integer 0-${max}`);
  }
  for (const [k, v] of Object.entries(spec.colors ?? {})) {
    if (!(k in catalog.defaults.colors)) errors.push(`colors: unknown key "${k}"`);
    else if (!COLOR_RE.test(v)) errors.push(`colors.${k} must look like "#d3d3d3"`);
  }
  if (errors.length) throw new CircuitError(errors);

  // Layout, then group bounds (all coordinates absolute until written).
  autoLayout([...nodes.values()], wires);
  const pad = catalog.sizes.groupPadding;
  const boundsCache = new Map();
  const bounds = (id) => {
    if (boundsCache.has(id)) return boundsCache.get(id);
    const n = nodes.get(id);
    let b;
    if (n) b = { x: n.x, y: n.y, w: n.w, h: n.h };
    else {
      const bs = groups.get(id).members.map(bounds);
      const x = Math.min(...bs.map((m) => m.x)) - pad;
      const y = Math.min(...bs.map((m) => m.y)) - pad;
      b = { x, y, w: Math.max(...bs.map((m) => m.x + m.w)) + pad - x, h: Math.max(...bs.map((m) => m.y + m.h)) + pad - y };
    }
    boundsCache.set(id, b);
    return b;
  };

  // Emit.
  let next = 2;
  const cellId = new Map();
  const cells = [];
  const parentCell = (id) => (parentOf.has(id) ? cellId.get(parentOf.get(id)) : "1");
  const origin = (id) => (parentOf.has(id) ? bounds(parentOf.get(id)) : { x: 0, y: 0 });
  const geom = (id, b) => {
    const o = origin(id);
    return el("mxGeometry", { x: b.x - o.x, y: b.y - o.y, width: b.w, height: b.h, as: "geometry" });
  };
  const depthOf = (id) => {
    let d = 0;
    for (let p = parentOf.get(id); p; p = parentOf.get(p)) d++;
    return d;
  };
  for (const g of [...groups.values()].sort((a, b) => depthOf(a.id) - depthOf(b.id))) {
    cellId.set(g.id, String(next++));
    cells.push(el("mxCell", { id: cellId.get(g.id), value: g.label, style: "group", vertex: "1", parent: parentCell(g.id) }, [geom(g.id, bounds(g.id))]));
  }
  for (const n of nodes.values()) {
    const id = String(next++);
    cellId.set(n.id, id);
    if (n.kind === "note") {
      cells.push(el("mxCell", { id, value: n.text, style: n.style, vertex: "1", connectable: "0", parent: parentCell(n.id) }, [geom(n.id, bounds(n.id))]));
      continue;
    }
    cells.push(
      el("mxCell", { id, value: n.name, style: n.style, vertex: "1", connectable: "0", parent: parentCell(n.id) }, [
        geom(n.id, bounds(n.id)),
        encodeValue(n.attrs, "attrs"),
        encodeValue(n.props, "props"),
        encodeValue(n.craft, "craft"),
      ]),
    );
    for (const p of n.ports) {
      p.cell = String(next++);
      const pstyle =
        (p.x >= 1 || p.x < 0 ? "port" : "portv") +
        (p.warning ? "r" : "") +
        (!p.warning && MEDIUM[p.type] === "water" ? "f" : "") +
        (!p.warning && MEDIUM[p.type] === "industrial" ? "i" : "");
      cells.push(
        el(
          "mxCell",
          {
            id: p.cell,
            value: p.label,
            style: pstyle,
            vertex: "1",
            parent: id,
            type: p.type,
            consumable: flag(p.consumable),
            reconsumable: flag(p.reconsumable),
            delayed: flag(p.delayed),
            direct: flag(p.direct),
            warning: flag(p.warning),
          },
          [el("mxGeometry", { x: p.x, y: p.y, width: catalog.sizes.port[0], height: catalog.sizes.port[1], relative: "1", as: "geometry" })],
        ),
      );
    }
  }
  for (const w of wires) {
    const pts = w.points.length ? [el("Array", { as: "points" }, w.points.map(([x, y]) => el("mxPoint", { x, y })))] : [];
    cells.push(
      el(
        "mxCell",
        { id: String(next++), value: "0", edge: "1", disabled: "0", hovered: "0", parent: "1", source: w.from.port.cell, target: w.to.port.cell, color: w.color },
        [el("mxGeometry", { relative: "1", as: "geometry" }, pts)],
      ),
    );
  }
  const root = el(
    "mxCell",
    { id: "1", parent: "0", version: catalog.simulatorVersion, tags: spec.tags ?? "", name: sanitizeName(spec.name ?? "Untitled Circuit") },
    [
      encodeValue({ ...catalog.defaults.colors, ...spec.colors }, "colors"),
      encodeValue(Object.fromEntries(Object.entries({ ...catalog.defaults.environment, ...spec.environment }).map(([k, v]) => [k, String(v)])), "environment"),
    ],
  );
  const xml = `<mxGraphModel><root><mxCell id="0"/>${root}${cells.join("")}</root></mxGraphModel>\n`;

  const model = {
    comps: [...nodes.values()].filter((n) => n.kind === "component"),
    wires: wires.map((w) => ({ from: w.from, to: w.to })),
  };
  const result = analyze(model, data);
  if (result.errors.length) throw new CircuitError(result.errors);
  return { xml, warnings: result.warnings };
}

// Same character filter and length limit the simulator applies to circuit names on load.
function sanitizeName(name) {
  return String(name)
    .replace(/[^a-z0-9\\.,_\-()/!#'"\s]/gi, "")
    .replace(/^\s+|\s+$/gm, "")
    .slice(0, 100) || "Untitled Circuit";
}

// ponytail: longest-path layering, left-to-right, 200px per layer and 140px per row.
// Good enough for drafts; give explicit x/y for anything that should look hand-laid-out.
function autoLayout(nodes, wires) {
  const auto = nodes.filter((n) => n.x === undefined || n.y === undefined);
  if (!auto.length) return;
  const placed = nodes.filter((n) => n.x !== undefined && n.y !== undefined);
  const baseY = placed.length ? Math.max(...placed.map((n) => n.y + n.h)) + 160 : 0;
  const preds = new Map(nodes.map((n) => [n.id, []]));
  for (const w of wires) preds.get(w.to.comp.id).push(w.from.comp.id);
  const layer = new Map();
  const visiting = new Set();
  const layerOf = (id) => {
    if (layer.has(id)) return layer.get(id);
    if (visiting.has(id)) return 0;
    visiting.add(id);
    const l = Math.max(-1, ...preds.get(id).map(layerOf)) + 1;
    visiting.delete(id);
    layer.set(id, l);
    return l;
  };
  const rows = new Map();
  for (const n of auto) {
    const l = n.kind === "component" ? layerOf(n.id) : 0;
    const r = rows.get(l) ?? 0;
    rows.set(l, r + 1);
    n.x = l * 200;
    n.y = baseY + r * 140;
  }
}

// ---------- XML reading ----------

const ENT = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };
const unesc = (s) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) =>
    e[0] === "#" ? String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)) : (ENT[e.toLowerCase()] ?? m),
  );

export function parseXml(text) {
  const rootNode = { tag: "#root", attrs: {}, children: [] };
  const stack = [rootNode];
  const re = /<!--[\s\S]*?-->|<\?[\s\S]*?\?>|<!\[CDATA\[[\s\S]*?\]\]>|<!DOCTYPE[^>]*>|<(\/?)([A-Za-z_][\w:.-]*)((?:\s+[^\s=/>]+\s*=\s*(?:"[^"]*"|'[^']*'))*)\s*(\/?)>|([^<]+)|(<)/g;
  let m;
  while ((m = re.exec(text))) {
    if (m[7]) throw new Error(`malformed XML near offset ${m.index}`);
    if (m[6] !== undefined) {
      if (m[6].trim()) throw new Error(`unexpected text in XML near offset ${m.index}`);
      continue;
    }
    if (!m[2]) continue;
    if (m[1]) {
      const open = stack.pop();
      if (!open || open.tag !== m[2]) throw new Error(`mismatched </${m[2]}> near offset ${m.index}`);
      continue;
    }
    const attrs = {};
    for (const a of m[3].matchAll(/([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) attrs[a[1]] = unesc(a[2] ?? a[3]);
    const node = { tag: m[2], attrs, children: [] };
    stack[stack.length - 1].children.push(node);
    if (!m[4]) stack.push(node);
  }
  if (stack.length !== 1) throw new Error(`unclosed <${stack[stack.length - 1].tag}>`);
  return rootNode;
}

// mxCodec decoding of <Object>/<Array> into plain values (attribute values stay strings).
function decodeValue(node) {
  if (node.tag === "Array") return node.children.map(decodeValue);
  if (node.tag === "add") return node.attrs.value;
  const o = {};
  for (const [k, v] of Object.entries(node.attrs)) if (k !== "as") o[k] = v;
  for (const c of node.children) if (c.attrs.as) o[c.attrs.as] = decodeValue(c);
  return o;
}

function readCircuit(text, data) {
  const errors = [];
  const doc = parseXml(text);
  const model = doc.children.find((n) => n.tag === "mxGraphModel");
  if (!model) throw new CircuitError(["document element must be <mxGraphModel>"]);
  const rootEl = model.children.find((n) => n.tag === "root");
  if (!rootEl) throw new CircuitError(["<mxGraphModel> must contain <root>"]);
  const cells = new Map();
  for (const n of rootEl.children) {
    if (n.tag !== "mxCell") continue;
    const id = n.attrs.id;
    if (id === undefined) errors.push("an <mxCell> has no id");
    else if (cells.has(id)) errors.push(`duplicate cell id "${id}"`);
    const cell = { id, a: n.attrs, children: [] };
    for (const c of n.children) {
      if (c.tag === "mxGeometry") {
        cell.geom = Object.fromEntries(Object.entries(c.attrs).map(([k, v]) => [k, k === "as" || k === "relative" ? v : Number(v)]));
        const pts = c.children.find((x) => x.tag === "Array" && x.attrs.as === "points");
        cell.points = pts ? pts.children.map((p) => [Number(p.attrs.x), Number(p.attrs.y)]) : [];
      } else if (c.attrs.as) cell[c.attrs.as] = decodeValue(c);
    }
    if (id !== undefined) cells.set(id, cell);
  }
  if (!cells.has("0") || !cells.has("1")) errors.push(`missing root cells "0" and "1"`);
  for (const c of cells.values()) {
    if (c.id !== "0" && !cells.has(c.a.parent)) errors.push(`cell ${c.id}: parent "${c.a.parent}" does not exist`);
    else if (c.id !== "0") cells.get(c.a.parent).children.push(c);
  }
  return { cells, errors };
}

function circuitModel(text, data) {
  const { cells, errors } = readCircuit(text, data);
  const warnings = [];
  const { allowed } = indexes(data);
  const comps = [];
  const portCells = new Map();
  for (const c of cells.values()) {
    if (!c.attrs?.cmpid) continue;
    const cmpid = String(c.attrs.cmpid);
    const def = cmpid.startsWith("item_") ? null : data.catalog.components.find((x) => x.cmpid === cmpid);
    const label = `${c.a.value ?? cmpid} (cell ${c.id})`;
    if (!def && !(cmpid.startsWith("item_") && findItem(data, cmpid.slice(5)))) errors.push(`${label}: unknown component "${cmpid}"`);
    if (!Array.isArray(c.props)) errors.push(`${label}: missing <Array as="props"/> (the simulator fails to import this)`);
    if (!c.style?.startsWith?.("cmp_") && !String(c.a.style ?? "").startsWith("cmp_")) warnings.push(`${label}: style should be "cmp_${cmpid}"`);
    const comp = { key: c.id, label, cmpid, def, cell: c, ports: [] };
    for (const p of c.children) {
      if (!p.a.type) continue;
      const port = { label: p.a.value, type: p.a.type, cell: p.id };
      comp.ports.push(port);
      portCells.set(p.id, { comp, port });
    }
    if (def) {
      const want = def.ports.filter((p) => !HIDDEN_PORT_TYPES.has(p.type)).map((p) => p.label);
      const have = comp.ports.map((p) => p.label);
      if (want.length && !comp.ports.length) errors.push(`${label}: has no port cells (the simulator fails to import this)`);
      const extra = have.filter((l) => !def.ports.some((p) => p.label === l));
      if (extra.length) warnings.push(`${label}: unknown port(s) ${extra.join(", ")}`);
      for (const p of c.props ?? []) {
        const pd = def.props.find((x) => x.name === p.name);
        if (!pd) continue;
        try {
          normalizeProp(pd, p.value ?? "", label);
        } catch (e) {
          warnings.push(String(e));
        }
      }
    }
    comps.push(comp);
  }
  const wires = [];
  const used = new Map();
  for (const c of cells.values()) {
    if (c.a.edge !== "1") continue;
    const s = portCells.get(c.a.source);
    const t = portCells.get(c.a.target);
    if (!s || !t) {
      errors.push(`wire cell ${c.id}: source/target must both be component ports`);
      continue;
    }
    let [from, to] = isOut(s.port.type) ? [s, t] : [t, s];
    if (!allowed.has(`${from.port.type}>${to.port.type}`)) {
      errors.push(`wire cell ${c.id}: cannot connect ${from.comp.label}.${from.port.label} (${from.port.type}) to ${to.comp.label}.${to.port.label} (${to.port.type})`);
      continue;
    }
    for (const e of [from, to]) {
      if (used.has(e.port.cell)) errors.push(`${e.comp.label}.${e.port.label}: more than one wire on this port (cells ${used.get(e.port.cell)} and ${c.id})`);
      else used.set(e.port.cell, c.id);
    }
    wires.push({ from, to, cell: c });
  }
  return { cells, comps, wires, errors, warnings };
}

export function check(text, data) {
  let m;
  try {
    m = circuitModel(text, data);
  } catch (e) {
    return { errors: e instanceof CircuitError ? e.errors : [String(e.message ?? e)], warnings: [], stats: null };
  }
  const a = analyze(m, data);
  return {
    errors: [...m.errors, ...a.errors],
    warnings: [...m.warnings, ...a.warnings],
    stats: { components: m.comps.length, wires: m.wires.length },
  };
}

// ---------- decompile ----------

export function decompile(text, data) {
  const m = circuitModel(text, data);
  if (m.errors.length) throw new CircuitError(m.errors);
  const { cells } = m;
  const safe = (s) => String(s).replace(/[^A-Za-z0-9_-]+/g, "_");
  const keyOf = new Map();
  const abs = (cell) => {
    let x = cell.geom?.x ?? 0;
    let y = cell.geom?.y ?? 0;
    for (let p = cells.get(cell.a.parent); p && p.a.style === "group"; p = cells.get(p.a.parent)) {
      x += p.geom?.x ?? 0;
      y += p.geom?.y ?? 0;
    }
    return [x, y];
  };
  const rootCell = cells.get("1");
  const spec = { name: rootCell?.a.name ?? "Untitled Circuit" };
  if (rootCell?.a.tags) spec.tags = rootCell.a.tags;
  if (rootCell?.environment) {
    spec.environment = {};
    for (const [k, v] of Object.entries(rootCell.environment)) if (k in data.catalog.defaults.environment && Number.isFinite(Number(v))) spec.environment[k] = Number(v);
  }
  if (rootCell?.colors) {
    spec.colors = {};
    for (const [k, v] of Object.entries(rootCell.colors)) if (k in data.catalog.defaults.colors && COLOR_RE.test(v)) spec.colors[k] = v;
  }
  spec.components = [];
  for (const c of m.comps) {
    const cell = c.cell;
    const key = `${safe(c.cmpid.startsWith("item_") ? "item" : c.cmpid)}_${cell.id}`;
    keyOf.set(cell.id, key);
    const [x, y] = abs(cell);
    const out = { id: key };
    if (c.def) out.type = c.def.cmpid;
    else {
      out.type = "item";
      out.item = findItem(data, c.cmpid.slice(5))?.name ?? c.cmpid.slice(5);
    }
    out.x = round(x);
    out.y = round(y);
    const rot = Number(cell.attrs.rotation ?? 0);
    if (c.def && Number(c.def.attrs.rotatable) === 1 && ROTATIONS.includes(rot) && rot) out.rotation = rot;
    const props = {};
    for (const p of cell.props ?? []) {
      const pd = c.def?.props.find((d) => d.name === p.name);
      if (!pd || p.value === undefined || String(p.value) === String(pd.value)) continue;
      props[p.name] = pd.type === "bool" ? p.value === "true" || p.value === "1" : pd.type === "text" ? p.value : Number(p.value);
    }
    if (Object.keys(props).length) out.props = props;
    spec.components.push(out);
  }
  spec.wires = m.wires.map((w) => {
    const ref = (e) => `${keyOf.get(e.comp.cell.id)}.${e.port.label}`;
    const cell = w.cell;
    const parent = cells.get(cell.a.parent);
    const [ox, oy] = parent && parent.a.style === "group" ? abs(parent) : [0, 0];
    const out = { from: ref(w.from), to: ref(w.to) };
    if (cell.a.color && COLOR_RE.test(cell.a.color)) out.color = cell.a.color;
    if (cell.points?.length) out.points = cell.points.map(([px, py]) => [round(px + ox), round(py + oy)]);
    return out;
  });
  const notes = [];
  const groups = [];
  for (const c of cells.values()) {
    const st = c.a.style;
    if (st === "text-large" || st === "text-small" || st === "info-box") {
      const id = `note_${c.id}`;
      keyOf.set(c.id, id);
      const [x, y] = abs(c);
      notes.push({ id, text: (c.a.value ?? "").replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]*>/g, ""), x: round(x), y: round(y), size: st === "text-small" ? "small" : "large" });
    }
  }
  for (const c of cells.values()) {
    if (c.a.style !== "group") continue;
    keyOf.set(c.id, `group_${c.id}`);
  }
  for (const c of cells.values()) {
    if (c.a.style !== "group") continue;
    const members = c.children.map((k) => keyOf.get(k.id)).filter(Boolean);
    if (members.length) groups.push({ id: `group_${c.id}`, label: c.a.value ?? "", members });
  }
  if (groups.length) spec.groups = groups;
  if (notes.length) spec.notes = notes;
  return spec;
}

const round = (n) => Math.round(n * 100) / 100;

// ---------- describe ----------

export function describe(def, data) {
  const L = [`${def.name} — type "${def.cmpid}"${def.alias ? ` (alias "${def.alias}")` : ""}`];
  if (def.info) L.push(`  ${def.info}`);
  const ports = def.ports.filter((p) => !HIDDEN_PORT_TYPES.has(p.type));
  L.push("  ports:");
  for (const p of ports) L.push(`    ${isOut(p.type) ? "OUT" : "IN "} ${MEDIUM[p.type].padEnd(10)} "${p.label}" (${side(p)})`);
  if (!ports.length) L.push("    (none)");
  L.push("  props:");
  for (const p of def.props) {
    const lim = [p.minval && `min ${p.minval}`, p.maxval && `max ${p.maxval}`].filter(Boolean).join(", ");
    L.push(`    "${p.name}": ${p.type} = ${JSON.stringify(p.value)}${lim ? ` (${lim})` : ""}${p.alert ? " [simulator-only]" : ""}${p.tip ? ` — ${p.tip}` : ""}`);
  }
  if (!def.props.length) L.push("    (none)");
  const a = def.attrs;
  L.push(
    `  consumption: ${a.consumption ?? "0"} rW; rotatable: ${Number(a.rotatable) === 1 ? "yes" : "no"}; ` +
      `root source: ${a.isroot === "1" ? "yes" : "no"}; Root Combiner input allowed: ${data.catalog.combinerSources.includes(def.cmpid) ? "yes" : "no"}`,
  );
  for (const t of def.tips ?? []) L.push(`  - ${t}`);
  return L.join("\n");
}

// ---------- CLI ----------

async function readInput(arg) {
  if (!arg || arg === "-") {
    const chunks = [];
    for await (const ch of process.stdin) chunks.push(ch);
    return Buffer.concat(chunks).toString("utf8");
  }
  if (/^[0-9a-f]{32}$/i.test(arg) || /^https?:\/\//i.test(arg)) {
    const token = arg.match(/[?&]circuit=([0-9a-f]{32})/i)?.[1] ?? (/^[0-9a-f]{32}$/i.test(arg) ? arg : null);
    const url = token ? `https://rustrician.io/share_get.php?token=${token}` : arg;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`GET ${url}: HTTP ${res.status}`);
    const body = await res.text();
    if (!body.trim()) throw new Error(`${url} returned an empty body (unknown or private circuit?)`);
    return body;
  }
  return readFileSync(arg, "utf8");
}

function option(args, name) {
  const i = args.indexOf(name);
  if (i === -1) return undefined;
  const v = args[i + 1];
  args.splice(i, 2);
  return v;
}

async function main(argv) {
  const args = argv.slice();
  const cmd = args.shift();
  const out = option(args, "-o");
  const emit = (text) => (out ? writeFileSync(out, text) : process.stdout.write(text));
  const data = loadData();
  const report = (warnings) => warnings.forEach((w) => console.error(`warning: ${w}`));
  switch (cmd) {
    case "build": {
      const spec = JSON.parse(await readInput(args[0]));
      const { xml, warnings } = build(spec, data);
      report(warnings);
      emit(xml);
      if (out) console.error(`wrote ${out} (${spec.components.length} components, ${(spec.wires ?? []).length} wires)`);
      return 0;
    }
    case "check": {
      const r = check(await readInput(args[0]), data);
      r.errors.forEach((e) => console.error(`error: ${e}`));
      report(r.warnings);
      if (r.stats) console.error(`${r.stats.components} components, ${r.stats.wires} wires: ${r.errors.length} error(s), ${r.warnings.length} warning(s)`);
      return r.errors.length ? 1 : 0;
    }
    case "decompile": {
      emit(JSON.stringify(decompile(await readInput(args[0]), data), null, 2) + "\n");
      return 0;
    }
    case "info": {
      if (!args.length) throw new Error("usage: info <type> [type...]");
      for (const t of args) {
        const def = findComponent(data, t);
        if (!def) throw new Error(`unknown component "${t}".${suggest(t, data.catalog.components.flatMap((c) => [c.cmpid, c.name]))}`);
        console.log(describe(def, data) + "\n");
      }
      return 0;
    }
    case "list": {
      const q = args.join(" ");
      for (const c of data.catalog.components) {
        if (q && !norm(`${c.cmpid} ${c.name} ${c.category}`).includes(norm(q))) continue;
        console.log(`${c.cmpid.padEnd(28)} ${c.name.padEnd(32)} ${c.category}`);
      }
      return 0;
    }
    case "items": {
      const q = norm(args.join(" "));
      if (!q) throw new Error("usage: items <filter>");
      for (const it of data.items) if (norm(it.name).includes(q)) console.log(`${it.id.padEnd(12)} ${it.name}`);
      return 0;
    }
    default:
      console.error(readFileSync(fileURLToPath(import.meta.url), "utf8").split("\n").slice(1, 11).join("\n"));
      return cmd ? 2 : 0;
  }
}

const invoked = (() => {
  try {
    return process.argv[1] && pathToFileURL(realpathSync(process.argv[1])).href === import.meta.url;
  } catch {
    return false;
  }
})();
if (invoked) {
  main(process.argv.slice(2)).then(
    (code) => process.exit(code),
    (e) => {
      if (e instanceof CircuitError) e.errors.forEach((m) => console.error(`error: ${m}`));
      else console.error(`error: ${e.message ?? e}`);
      process.exit(1);
    },
  );
}
