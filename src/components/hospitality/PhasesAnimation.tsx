"use client";
import { useEffect, useRef, useState } from "react";
import { boxFaces, iso, isoXY, type Pal, type Pt3 } from "../bim-consultancy/RibaAnimation";
import styles from "./PhasesAnimation.module.css";

/**
 * An isometric hotel walked through its six phases. It shares the projection
 * of the BIM consultancy RIBA drawing, but the building is a hotel: a podium
 * with a pool terrace and a slab of rooms on top.
 *
 *   0 concept          the plot, the podium and the room tower as an envelope
 *   1 brand approval   massing closed; a standard room pulled out for review
 *                      and the placeholder of the rooftop sign
 *   2 technical design bays and floors gridded, dimension lines around
 *   3 FF&E/purchasing  the top floor opened: rooms in plan, beds dropping in
 *   4 construction     scaffolding on the façade and a tower crane at work
 *   5 opening          windows lit, sign up, pool and parasols on the terrace
 *
 * Desktop: the scene is pinned and scrolling walks the phases; the list on
 * the left marks the current one and shows its line. Compact screens (phones
 * in either orientation, and any short window): it plays in a loop, a caption
 * replaces the list and a row of dots jumps to a phase. With reduced motion
 * it does not loop; it rests on the finished hotel and the dots step through.
 */

/* Keep in sync with the compact block of PhasesAnimation.module.css. */
const COMPACT_MQ = "(max-width: 768px), (max-height: 640px)";
/* How long a tapped phase holds before the loop carries on, in ms. */
const TAP_HOLD_MS = 5000;

/* Keyframed parameters, one value per phase. */
const KF: Record<string, number[]> = {
  site: [1.0, 0.4, 0.4, 0.25, 0.4, 0.0],
  mass: [0.9, 1.0, 1.0, 1.0, 1.0, 1.0],
  ghost: [1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  tower: [0.0, 1.0, 1.0, 1.0, 1.0, 1.0],
  mod: [0.0, 1.0, 0.0, 0.0, 0.0, 0.0],
  deck: [0.0, 1.0, 1.0, 1.0, 1.0, 1.0],
  tech: [0.0, 0.0, 1.0, 0.0, 0.0, 0.0],
  lift: [0.0, 0.0, 0.0, 1.0, 0.0, 0.0],
  works: [0.0, 0.0, 0.0, 0.0, 1.0, 0.0],
  win: [0.0, 0.0, 0.0, 0.0, 1.0, 1.0],
  open: [0.0, 0.0, 0.0, 0.0, 0.0, 1.0],
};
/* [time, phase]: holds at both ends, eased in between. */
const ANCHORS: [number, number][] = [
  [0.0, 0], [0.4, 0], [1.4, 1], [2.4, 2], [3.4, 3], [4.4, 4], [5.4, 5], [7.4, 5],
];
const SCROLL_MAX_T = 5.4;
const MOBILE_LOOP_T = 7.4;
/* The time at which phase i is fully on screen and held. */
const phaseTime = (i: number) => (i === 0 ? 0.2 : 0.4 + i);

function paramsAt(t: number): Record<string, number> {
  let i = 0;
  while (i < ANCHORS.length - 2 && t > ANCHORS[i + 1][0]) i++;
  const [ta, sA] = ANCHORS[i];
  const [tb, sB] = ANCHORS[i + 1];
  const f = Math.max(0, Math.min(1, (t - ta) / Math.max(1e-6, tb - ta)));
  const e = f * f * (3 - 2 * f);
  const P: Record<string, number> = { stagePos: sA + (sB - sA) * e };
  for (const k in KF) P[k] = KF[k][sA] + (KF[k][sB] - KF[k][sA]) * e;
  return P;
}

/* ── palette: blues and beiges only ───────────────────── */
const INK = "#0E1B30";
const DEEP = "#0B172C";
const MID = "#2F4868";
const PALE = "#8CA0BC";
const BEIGE = "#ECE6E3";
const BLUE: Pal = { top: "#5B7699", left: "#33506E", right: "#152A44", stroke: INK };
const SAND: Pal = { top: "#F4EEE9", left: "#DCCFC6", right: "#C4B5AB", stroke: INK };
const LIT = "#F5EBDD";

/* ── the hotel, in plot units (the plot is 4 × 4) ─────── */
const TZ = 0.8; // podium height: where the tower starts
const FH = 0.52; // floor height
const NF = 5; // floors of rooms
const TD = 1.7; // tower depth
const BAY = 0.8; // room width
const NB = 5; // rooms per floor
const TOP = TZ + NF * FH;
const CUT = TOP - FH; // floor level of the top floor
const WALL = 0.2; // height the top floor is cut at when opened

/* ── drawing primitives, painted in the order they are pushed ── */
type Item =
  | { t: "f"; points: string; fill: string; stroke: string; sw: number; op: number }
  | { t: "l"; points: string; stroke: string; w: number; dash: string; cap: "butt" | "round"; op: number }
  | { t: "x"; x: number; y: number; text: string; op: number };

const pts3 = (p: Pt3[]) => p.map((v) => iso(v[0], v[1], v[2])).join(" ");
function quad(p: Pt3[], fill: string, op = 1, sw = 0.75, stroke = INK): Item {
  return { t: "f", points: pts3(p), fill, stroke, sw, op };
}
function box(o: number[], pal: Pal, op = 1, sw = 0.75): Item[] {
  return boxFaces(o, pal).map((f) => ({ t: "f", points: f.points, fill: f.fill, stroke: f.stroke, sw, op }));
}
function line(p: Pt3[], stroke: string, w: number, op = 1, dash = "0"): Item {
  return { t: "l", points: pts3(p), stroke, w, dash, cap: "butt", op };
}
function ring(p: Pt3[], stroke: string, w: number, op = 1, dash = "0"): Item {
  return line(p.concat([p[0]]), stroke, w, op, dash);
}
function sline(p: { x: number; y: number }[], stroke: string, w: number, op = 1): Item {
  return { t: "l", points: p.map((v) => `${v.x.toFixed(2)},${v.y.toFixed(2)}`).join(" "), stroke, w, dash: "0", cap: "round", op };
}
/* Rectangles standing on a façade: `onY` faces the pool, `onX` faces right. */
const onY = (y: number, a: number, b: number, c: number, e: number): Pt3[] => [[a, y, c], [b, y, c], [b, y, e], [a, y, e]];
const onX = (x: number, a: number, b: number, c: number, e: number): Pt3[] => [[x, a, c], [x, b, c], [x, b, e], [x, a, e]];
const flat = (z: number, x0: number, x1: number, y0: number, y1: number): Pt3[] => [[x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z]];
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* ── scene pieces ─────────────────────────────────────── */

function site(op: number): Item[] {
  return [
    ring(flat(0, -0.7, 4.7, -0.7, 4.7), PALE, 1, op, "5 4"),
    ring(flat(0, 0, 4, 0, 4), MID, 1.4, op),
  ];
}

/* Podium: lobby and restaurant behind glass, the entrance under a canopy. */
function podium(P: Record<string, number>): Item[] {
  const out: Item[] = box([0, 0, 0, 4, 4, TZ], BLUE, P.mass);
  const glass: Pt3[][] = [
    onY(4, 0.4, 1.2, 0.22, 0.6), onY(4, 1.4, 2.2, 0.22, 0.6), onY(4, 2.4, 3.2, 0.22, 0.6),
    onX(4, 0.35, 1.0, 0.22, 0.6), onX(4, 1.2, 1.85, 0.22, 0.6),
    onX(4, 2.6, 3.2, 0, 0.44), // the door
  ];
  glass.forEach((g, i) => {
    out.push(quad(g, i < 3 ? "#1B3350" : DEEP, P.win, 0.5));
    out.push(quad(g, LIT, P.win * P.open, 0.5));
  });
  out.push(...box([4, 2.3, 0.5, 0.55, 1.2, 0.07], BLUE, P.tower));
  out.push(line([[4.5, 2.35, 0], [4.5, 2.35, 0.5]], INK, 0.8, P.tower));
  out.push(line([[4.5, 3.45, 0], [4.5, 3.45, 0.5]], INK, 0.8, P.tower));
  return out;
}

/* Concept: the room tower is still an envelope to fit the brand into. */
function ghostTower(op: number): Item[] {
  const out: Item[] = box([0, 0, TZ, 4, TD, TOP - TZ], BLUE, op * 0.16, 0);
  out.push(ring(flat(TOP, 0, 4, 0, TD), MID, 1, op, "4 3"));
  out.push(ring(flat(TZ, 0, 4, 0, TD), MID, 1, op, "4 3"));
  for (const [x, y] of [[0, 0], [4, 0], [4, TD], [0, TD]]) out.push(line([[x, y, TZ], [x, y, TOP]], MID, 1, op, "4 3"));
  return out;
}

/* A bed seen from above: mattress, pillow and blanket. */
function bed(x: number, y: number, z: number, op: number): Item[] {
  const h = 0.09;
  return [
    ...box([x, y, z, 0.42, 0.78, h], SAND, op, 0.5),
    quad(flat(z + h, x + 0.05, x + 0.37, y + 0.05, y + 0.2), "#FFFFFF", op, 0.4),
    quad(flat(z + h, x, x + 0.42, y + 0.3, y + 0.78), PALE, op, 0.5),
  ];
}

/* The top floor with its lid off: corridor, room partitions and the beds. */
function openFloor(P: Record<string, number>): Item[] {
  const op = P.tower;
  const z0 = CUT;
  const z1 = CUT + WALL;
  const out: Item[] = [
    quad(flat(z0, 0, 4, 0, TD), BEIGE, op),
    quad(onY(0, 0, 4, z0, z1), BLUE.left, op, 0.5),
    quad(onX(0, 0, TD, z0, z1), BLUE.right, op, 0.5),
  ];
  // Corridor wall, with a door gap per room.
  for (let k = 0; k < NB; k++) out.push(quad(onY(0.42, k * BAY + 0.28, (k + 1) * BAY, z0, z1), BLUE.left, op, 0.5));
  // Back to front: each partition, then the bed of the room in front of it.
  for (let k = 0; k < NB; k++) {
    if (k > 0) out.push(quad(onX(k * BAY, 0.42, TD, z0, z1), BLUE.right, op, 0.5));
    const p = clamp01(P.lift * 1.7 - k * 0.14);
    if (p > 0.02) out.push(...bed(k * BAY + 0.2, 0.7, z0 + (1 - p) * (1 - p) * 1.1, op * p));
  }
  out.push(quad(onY(TD, 0, 4, z0, z1), BLUE.left, op));
  out.push(quad(onX(4, 0, TD, z0, z1), BLUE.right, op));
  return out;
}

function tower(P: Record<string, number>, t: number): Item[] {
  const op = P.tower;
  const lift = P.lift * 1.5;
  const cut = lift > 0.01;
  const out: Item[] = [];

  if (!cut) {
    out.push(...box([0, 0, TZ, 4, TD, TOP - TZ], BLUE, op));
  } else {
    out.push(...box([0, 0, TZ, 4, TD, CUT - TZ], BLUE, op));
    out.push(...openFloor(P));
    for (const [x, y] of [[4, 0], [4, TD], [0, TD]]) {
      out.push(line([[x, y, CUT + WALL], [x, y, CUT + WALL + lift]], MID, 0.8, op, "3 3"));
    }
    out.push(...box([0, 0, CUT + WALL + lift, 4, TD, FH - WALL], BLUE, op));
  }

  // Room windows: one per bay on the long façade, two per floor on the end.
  if (P.win > 0.02) {
    let i = 0;
    for (let f = 0; f < (cut ? NF - 1 : NF); f++) {
      const c = TZ + f * FH + 0.14;
      const e = c + 0.26;
      const row: [Pt3[], string][] = [];
      for (let k = 0; k < NB; k++) row.push([onY(TD, k * BAY + 0.2, k * BAY + 0.6, c, e), "#1B3350"]);
      for (let j = 0; j < 2; j++) row.push([onX(4, 0.25 + j * 0.8, 0.65 + j * 0.8, c, e), DEEP]);
      for (const [g, dark] of row) {
        i++;
        const on = Math.sin(t * 0.9 + i * 2.399) + 0.7 * Math.sin(t * 0.41 + i * 1.13) > -0.55;
        out.push(quad(g, dark, P.win, 0.5));
        if (on) out.push(quad(g, LIT, P.win * P.open, 0.5));
      }
    }
  }

  // Technical design: every bay and every floor drawn on the façades.
  if (P.tech > 0.02) {
    const g = (p: Pt3[]) => out.push(line(p, PALE, 0.5, P.tech));
    for (let k = 1; k < NB; k++) g([[k * BAY, TD, TZ], [k * BAY, TD, TOP]]);
    for (let f = 1; f < NF; f++) {
      const z = TZ + f * FH;
      g([[0, TD, z], [4, TD, z]]);
      g([[4, 0, z], [4, TD, z]]);
    }
    g([[4, TD / 2, TZ], [4, TD / 2, TOP]]);
    for (let k = 1; k < 5; k++) {
      g([[k * BAY, 4, 0], [k * BAY, 4, TZ]]);
      g([[4, k * BAY, 0], [4, k * BAY, TZ]]);
    }
  }

  // Rooftop sign: a placeholder while the brand reviews, the letters at opening.
  const z = TOP + 0.1;
  if (P.mod > 0.02) out.push(ring(onY(TD, 1.0, 3.0, z, z + 0.42), BEIGE, 0.8, P.mod, "3 3"));
  if (P.open > 0.02) {
    out.push(line([[1.0, TD, z], [3.0, TD, z]], LIT, 0.9, P.open));
    out.push(line([[1.2, TD, TOP], [1.2, TD, z]], LIT, 0.9, P.open));
    out.push(line([[2.8, TD, TOP], [2.8, TD, z]], LIT, 0.9, P.open));
    const p = isoXY(1.0, TD, z + 0.04);
    out.push({ t: "x", x: p.x, y: p.y, text: "HOTEL", op: P.open });
  }
  return out;
}

/* Construction: scaffolding standing in front of the long façade. */
function scaffold(op: number): Item[] {
  const y = TD + 0.14;
  const out: Item[] = [];
  for (let k = 0; k <= NB; k++) out.push(line([[k * BAY, y, TZ], [k * BAY, y, TOP + 0.14]], BEIGE, 0.6, op));
  for (let f = 1; f <= NF; f++) out.push(line([[0, y, TZ + f * FH], [4, y, TZ + f * FH]], BEIGE, 0.6, op));
  for (let f = 0; f < NF; f++) {
    const k = f % 2 === 0 ? 1 : 3;
    const z = TZ + f * FH;
    out.push(line([[k * BAY, y, z], [(k + 1) * BAY, y, z + FH]], BEIGE, 0.5, op));
    out.push(line([[(k + 1) * BAY, y, z], [k * BAY, y, z + FH]], BEIGE, 0.5, op));
  }
  return out;
}

/* Construction: a tower crane beside the building, slewing with a load. */
function crane(op: number, t: number): Item[] {
  const bx = 4.75;
  const by = -0.55;
  const jz = 4.45;
  const out: Item[] = [];
  const base = isoXY(bx, by, 0);
  const head = isoXY(bx, by, jz + 0.5);
  // Lattice mast.
  out.push(sline([{ x: base.x - 1.6, y: base.y }, { x: base.x - 1.6, y: head.y + 12 }], DEEP, 0.8, op));
  out.push(sline([{ x: base.x + 1.6, y: base.y }, { x: base.x + 1.6, y: head.y + 12 }], DEEP, 0.8, op));
  const zig: { x: number; y: number }[] = [];
  for (let y = base.y, s = 1; y > head.y + 12; y -= 6, s = -s) zig.push({ x: base.x + s * 1.6, y });
  out.push(sline(zig, DEEP, 0.5, op));
  out.push(sline([{ x: base.x, y: head.y + 12 }, head], DEEP, 0.9, op));

  const a = Math.atan2(0.42, -1) + 0.3 * Math.sin(t * 0.35);
  const dx = Math.cos(a);
  const dy = Math.sin(a);
  const at = (d: number, z: number): Pt3 => [bx + dx * d, by + dy * d, z];
  out.push(line([at(-1.1, jz), at(4.2, jz)], DEEP, 1.2, op));
  out.push(line([at(-1.1, jz), at(-0.7, jz)], DEEP, 3, op)); // counterweight
  out.push(line([at(-1.1, jz), [bx, by, jz + 0.5], at(3.1, jz)], DEEP, 0.6, op));

  // Trolley, cable and a pallet on the hook.
  const d = 4.2 * (0.5 + 0.22 * Math.sin(t * 0.45));
  const hz = 3.95 + 0.12 * Math.sin(t * 0.8);
  const [hx, hy] = at(d, jz);
  out.push(line([[hx, hy, jz], [hx, hy, hz]], DEEP, 0.6, op));
  out.push(...box([hx - 0.18, hy - 0.18, hz - 0.26, 0.36, 0.36, 0.26], SAND, op, 0.5));
  return out;
}

/* The terrace on the podium: the pool, then loungers and parasols. */
function terrace(P: Record<string, number>, t: number): Item[] {
  const z = TZ;
  const pool = flat(z, 0.45, 2.5, 2.2, 3.5);
  const out: Item[] = [];
  if (P.open > 0.02) {
    out.push(quad(pool, PALE, P.open, 0.6));
    const s = (t * 0.12) % 1;
    for (const [x, y] of [[0.7 + s * 0.5, 2.55], [1.4 - s * 0.4, 3.0], [1.0 + s * 0.6, 3.3]]) {
      out.push(line([[x, y, z], [x + 0.45, y, z]], BEIGE, 0.6, P.open * 0.8));
    }
  }
  out.push(ring(pool, BEIGE, 0.7, P.deck * (1 - P.open)));
  if (P.open > 0.02) {
    for (const x of [2.95, 3.3, 3.65]) out.push(...box([x, 2.2, z, 0.2, 0.55, 0.07], SAND, P.open, 0.5));
    for (const [px, py] of [[3.12, 3.3], [3.62, 3.3]]) {
      const r = 0.3;
      const zc = z + 0.5;
      const apex: Pt3 = [px, py, zc + 0.16];
      const c: Pt3[] = [[px - r, py - r, zc], [px - r, py + r, zc], [px + r, py + r, zc], [px + r, py - r, zc]];
      out.push(line([[px, py, z], [px, py, zc]], INK, 0.7, P.open));
      out.push(quad([c[0], c[1], apex], SAND.top, P.open, 0.5));
      out.push(quad([c[3], c[0], apex], SAND.top, P.open, 0.5));
      out.push(quad([c[1], c[2], apex], SAND.left, P.open, 0.5));
      out.push(quad([c[2], c[3], apex], SAND.right, P.open, 0.5));
    }
  }
  return out;
}

/* Brand approval: one standard room pulled out of the façade for review. */
function roomModule(amount: number): Item[] {
  const op = clamp01(amount * 3);
  const pull = amount * 1.15;
  const x0 = 2 * BAY;
  const x1 = 3 * BAY;
  const z0 = TZ + 2 * FH;
  const z1 = z0 + FH;
  const out: Item[] = [quad(onY(TD, x0, x1, z0, z1), DEEP, op, 0.6)];
  for (const x of [x0, x1]) for (const z of [z0, z1]) out.push(line([[x, TD, z], [x, TD + pull, z]], BEIGE, 0.7, op, "3 3"));
  out.push(...box([x0, TD + pull, z0, BAY, 0.9, FH], SAND, op));
  out.push(quad(onY(TD + pull + 0.9, x0 + 0.2, x0 + 0.6, z0 + 0.14, z0 + 0.4), PALE, op, 0.5));
  return out;
}

/* Technical design: dimension lines, one tick per bay and per floor. */
function dims(op: number): Item[] {
  const out: Item[] = [];
  const d = (p: Pt3[]) => out.push(line(p, MID, 0.6, op));
  d([[0, 4.4, 0], [4, 4.4, 0]]);
  for (let k = 0; k <= 5; k++) d([[k * BAY, 4.28, 0], [k * BAY, 4.52, 0]]);
  d([[4.4, 0, 0], [4.4, 4, 0]]);
  for (const y of [0, TD, 4]) d([[4.28, y, 0], [4.52, y, 0]]);
  d([[-0.45, TD, TZ], [-0.45, TD, TOP]]);
  for (let f = 0; f <= NF; f++) d([[-0.57, TD, TZ + f * FH], [-0.33, TD, TZ + f * FH]]);
  return out;
}

function hotel(P: Record<string, number>, t: number): Item[] {
  let items: Item[] = [];
  if (P.site > 0.02) items = items.concat(site(P.site));
  items = items.concat(podium(P));
  if (P.ghost > 0.02) items = items.concat(ghostTower(P.ghost));
  if (P.tower > 0.02) items = items.concat(tower(P, t));
  if (P.works > 0.02) items = items.concat(scaffold(P.works));
  if (P.deck > 0.02) items = items.concat(terrace(P, t));
  if (P.mod > 0.02) items = items.concat(roomModule(P.mod));
  if (P.tech > 0.02) items = items.concat(dims(P.tech));
  if (P.works > 0.02) items = items.concat(crane(P.works, t));
  return items.filter((it) => it.op > 0.02);
}

export default function PhasesAnimation({
  steps,
  header,
}: {
  steps: { label: string; text: string }[];
  /** Section heading, held inside the pin so it stays on screen while the phases play. */
  header?: React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [stageT, setStageT] = useState(0);
  const [flick, setFlick] = useState(0);
  // The loop's clock lives in refs so a tapped phase can steer it.
  const tRef = useRef(0);
  const targetRef = useRef<number | null>(null);
  const holdUntilRef = useRef(0);

  useEffect(() => {
    const compact = window.matchMedia(COMPACT_MQ);
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    let visible = true;

    const setT = (t: number) => {
      if (t === tRef.current) return;
      tRef.current = t;
      setStageT(t);
    };

    // Reduced motion on a compact screen: rest on the finished hotel.
    if (still && compact.matches) setT(phaseTime(5));

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (visible) {
        if (!still) setFlick((f) => f + dt);
        if (compact.matches) {
          let t = tRef.current;
          const target = targetRef.current;
          if (target !== null) {
            // Glide to the tapped phase (or jump, with reduced motion), then hold it.
            const d = target - t;
            const step = still ? Math.abs(d) : dt * 2.5;
            t = Math.abs(d) <= step ? target : t + Math.sign(d) * step;
            if (t === target) {
              targetRef.current = null;
              holdUntilRef.current = now + TAP_HOLD_MS;
            }
          } else if (!still && now > holdUntilRef.current) {
            t = (t + dt) % MOBILE_LOOP_T;
          }
          setT(t);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onScroll = () => {
      if (compact.matches) return;
      const track = trackRef.current;
      if (!track) return;
      const span = Math.max(1, track.offsetHeight - window.innerHeight);
      const y = Math.min(span, Math.max(0, -track.getBoundingClientRect().top));
      setT((y / span) * SCROLL_MAX_T);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Rotating a phone or resizing a window can switch between the two modes.
    compact.addEventListener("change", onScroll);
    onScroll();

    // Stop the clock while the section is off-screen.
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { visible = e.isIntersecting; }));
    if (rootRef.current) io.observe(rootRef.current);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      compact.removeEventListener("change", onScroll);
      io.disconnect();
    };
  }, []);

  const goTo = (i: number) => {
    targetRef.current = phaseTime(i);
  };

  const P = paramsAt(stageT);
  const items = hotel(P, flick);

  const cur = Math.min(steps.length - 1, Math.max(0, Math.round(P.stagePos)));
  const num = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <div ref={rootRef}>
      <div ref={trackRef} className={styles.track}>
        <div className={styles.pin}>
          {header && <div className={styles.header}>{header}</div>}
          <div className={styles.row}>
          <ol className={styles.stages}>
            {steps.map((s, i) => (
              <li key={s.label} className={styles.stage} data-active={i === cur}>
                <span className={styles.num}>{num(i)}</span>
                <div>
                  <strong>{s.label}</strong>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className={styles.canvas}>
            <svg viewBox="0 0 300 300" width="100%" height="100%" role="img" aria-label={steps[cur]?.label}>
              {items.map((it, i) => {
                if (it.t === "f") {
                  return (
                    <polygon key={i} points={it.points} fill={it.fill} stroke={it.sw > 0 ? it.stroke : "none"} strokeWidth={it.sw} strokeLinejoin="round" opacity={it.op} />
                  );
                }
                if (it.t === "l") {
                  return (
                    <polyline key={i} points={it.points} fill="none" stroke={it.stroke} strokeWidth={it.w} strokeDasharray={it.dash} strokeLinecap={it.cap} strokeLinejoin="round" opacity={it.op} />
                  );
                }
                // Lettering laid on the façade plane: sheared to the isometric x axis.
                return (
                  <text key={i} className={styles.sign} transform={`matrix(0.866 0.5 0 1 ${it.x.toFixed(2)} ${it.y.toFixed(2)})`} textLength="48" lengthAdjust="spacing" opacity={it.op}>
                    {it.text}
                  </text>
                );
              })}
            </svg>
          </div>
          <div className={styles.caption}>
            <span className={styles.num}>{num(cur)}</span>
            <strong>{steps[cur]?.label}</strong>
            <p>{steps[cur]?.text}</p>
            <div className={styles.dots}>
              {steps.map((s, i) => (
                <button
                  key={s.label}
                  type="button"
                  className={styles.dot}
                  data-active={i === cur}
                  aria-label={`${num(i)} ${s.label}`}
                  aria-current={i === cur ? "step" : undefined}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
