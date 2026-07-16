"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Scroll-driven isometric building animation for the "RIBA stages" section.
 * Port of the "RIBA Animation" design component: on desktop the sticky scene
 * advances through the 8 RIBA stages as the 320vh track scrolls; on mobile
 * (≤760px) it auto-advances in a loop and the stage list collapses into a
 * caption under the drawing.
 */

const SCROLL_MAX_T = 8.4;
const MOBILE_LOOP_T = 10.4;

/* ── isometric projection ─────────────────────────────── */
const S = 24;
function isoXY(x: number, y: number, z: number) {
  return { x: (x - y) * 0.8660254 * S + 150, y: (x + y) * 0.5 * S - z * S + 152 };
}
function iso(x: number, y: number, z: number) {
  const p = isoXY(x, y, z);
  return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
}

interface Face {
  points: string;
  fill: string;
  opacity: number;
  stroke: string;
  key: number;
}
interface Outline {
  points: string;
  stroke: string;
  width: number;
  dash: string;
  cap: string;
  opacity: number;
}
type Pal = { top: string; left: string; right: string; stroke: string };
type Pt3 = [number, number, number];

function boxFaces(o: number[], pal: Pal, op = 1): Face[] {
  const [ox, oy, oz, w, d, h] = o;
  const top = [iso(ox, oy, oz + h), iso(ox + w, oy, oz + h), iso(ox + w, oy + d, oz + h), iso(ox, oy + d, oz + h)].join(" ");
  const left = [iso(ox, oy + d, oz), iso(ox + w, oy + d, oz), iso(ox + w, oy + d, oz + h), iso(ox, oy + d, oz + h)].join(" ");
  const right = [iso(ox + w, oy, oz), iso(ox + w, oy + d, oz), iso(ox + w, oy + d, oz + h), iso(ox + w, oy, oz + h)].join(" ");
  return [
    { points: top, fill: pal.top, stroke: pal.stroke, opacity: op, key: ox + w / 2 + (oy + d / 2) + (oz + h) },
    { points: left, fill: pal.left, stroke: pal.stroke, opacity: op, key: ox + w / 2 + (oy + d) + (oz + h / 2) },
    { points: right, fill: pal.right, stroke: pal.stroke, opacity: op, key: ox + w + (oy + d / 2) + (oz + h / 2) },
  ];
}
function openRight(xf: number, a: number, b: number, c: number, e: number, pal: { fill: string; stroke: string }, op = 1): Face {
  return {
    points: [iso(xf, a, c), iso(xf, b, c), iso(xf, b, e), iso(xf, a, e)].join(" "),
    fill: pal.fill,
    stroke: pal.stroke,
    opacity: op,
    key: xf + (a + b) / 2 + (c + e) / 2 + 0.2,
  };
}
function openLeft(yf: number, a: number, b: number, c: number, e: number, pal: { fill: string; stroke: string }, op = 1): Face {
  return {
    points: [iso(a, yf, c), iso(b, yf, c), iso(b, yf, e), iso(a, yf, e)].join(" "),
    fill: pal.fill,
    stroke: pal.stroke,
    opacity: op,
    key: (a + b) / 2 + yf + (c + e) / 2 + 0.2,
  };
}
function oline(pts: Pt3[], stroke: string, width: number, dash = "0", cap = "butt", opacity = 1): Outline {
  return { points: pts.map((p) => iso(p[0], p[1], p[2])).join(" "), stroke, width, dash, cap, opacity };
}
function loop(pts: Pt3[], stroke: string, width: number, dash = "0", opacity = 1): Outline {
  return oline(pts.concat([pts[0]]), stroke, width, dash, "butt", opacity);
}
function osline(pts: { x: number; y: number }[], stroke: string, width: number, opacity = 1): Outline {
  return { points: pts.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" "), stroke, width, dash: "0", cap: "round", opacity };
}
function fineStar(anchor: Pt3, r: number, dy: number, stroke: string, w: number, op: number): Outline[] {
  const c = isoXY(anchor[0], anchor[1], anchor[2]);
  c.y += dy || 0;
  return [
    osline([{ x: c.x - r, y: c.y }, { x: c.x + r, y: c.y }], stroke, w, op),
    osline([{ x: c.x, y: c.y - r }, { x: c.x, y: c.y + r }], stroke, w, op),
  ];
}
function scene(boxes: { o: number[]; pal: Pal; op?: number }[], extras: Face[]): Face[] {
  let faces: Face[] = [];
  boxes.forEach((b) => {
    faces = faces.concat(boxFaces(b.o, b.pal, b.op));
  });
  faces = faces.concat(extras);
  faces.sort((a, b) => a.key - b.key);
  return faces;
}

/* ── keyframed parameters across the 8 RIBA stages ────── */
const ANCHORS: [number, number][] = [
  [0.0, 0], [0.35, 0],
  [1.5, 1], [2.8, 2], [4.0, 3], [5.1, 4], [6.2, 5], [7.3, 6], [8.4, 7],
  [10.4, 7],
  [11.25, 6], [12.1, 5], [12.95, 4], [13.8, 3], [14.5, 2], [15.1, 1], [15.65, 0],
  [16.0, 0],
];
const KF: Record<string, number[]> = {
  lowerH: [0.0, 0.55, 1.6, 1.6, 1.6, 1.6, 1.6, 1.6],
  upperH: [0.0, 0.0, 1.4, 1.4, 1.4, 1.4, 1.4, 1.4],
  upperZ: [1.6, 1.6, 1.6, 1.6, 1.6, 1.9, 1.6, 1.6],
  chunkLift: [0.0, 0.0, 0.0, 1.7, 1.7, 1.7, 1.7, 1.7],
  chunkOp: [0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  massOp: [0.0, 0.85, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
  envOp: [1.0, 0.45, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  terraOp: [0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0],
  guideOp: [0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0],
  winOp: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0],
  glintOp: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.3],
};

function paramsAt(t: number): Record<string, number> {
  let i = 0;
  while (i < ANCHORS.length - 2 && t > ANCHORS[i + 1][0]) i++;
  const a = ANCHORS[i];
  const b = ANCHORS[i + 1];
  const span = Math.max(1e-6, b[0] - a[0]);
  let f = (t - a[0]) / span;
  f = Math.max(0, Math.min(1, f));
  const e = f * f * (3 - 2 * f);
  const sA = a[1];
  const sB = b[1];
  const P: Record<string, number> = { stagePos: sA + (sB - sA) * e };
  for (const k in KF) P[k] = KF[k][sA] + (KF[k][sB] - KF[k][sA]) * e;
  return P;
}

/* ── scene pieces ─────────────────────────────────────── */
const BLUE: Pal = { top: "#5B7699", left: "#33506E", right: "#152A44", stroke: "#0E1B30" };
const TERRA = "#AC6752";
const PALE = "#A9B4C2";
const PLOT = "#5B7699";
const GUIDE = "#C3B7AE";
const GLINT = "#FBF6EE";
const GRID = "#8CA0BC";

function windows(op: number, t: number): Face[] {
  const specs: [string, number, number, number, number][] = [
    ["R", 0.6, 1.1, 0.5, 0.95], ["R", 1.6, 2.1, 0.5, 0.95], ["R", 2.7, 3.2, 0.5, 0.95],
    ["R", 0.6, 1.1, 1.05, 1.5], ["R", 1.6, 2.1, 1.05, 1.5], ["R", 2.7, 3.2, 1.05, 1.5],
    ["L", 0.6, 1.1, 0.5, 0.95], ["L", 1.6, 2.1, 0.5, 0.95], ["L", 2.7, 3.2, 0.5, 0.95],
    ["L", 0.6, 1.1, 1.05, 1.5], ["L", 1.6, 2.1, 1.05, 1.5], ["L", 2.7, 3.2, 1.05, 1.5],
    ["R", 0.7, 1.2, 2.05, 2.5], ["L", 0.7, 1.2, 2.05, 2.5],
  ];
  const lit = { fill: "#F2D79E", stroke: "#0E1B30" };
  const dark = { fill: "#1B3350", stroke: "#0E1B30" };
  return specs.map((s, i) => {
    const phase = Math.sin(t * 0.9 + i * 2.399) + 0.7 * Math.sin(t * 0.41 + i * 1.13);
    const pal = phase > -0.15 ? lit : dark;
    return s[0] === "R" ? openRight(4, s[1], s[2], s[3], s[4], pal, op) : openLeft(4, s[1], s[2], s[3], s[4], pal, op);
  });
}
function gridRight(xf: number, y0: number, y1: number, z0: number, z1: number, step: number, color: string, w: number, op: number): Outline[] {
  const lines: Outline[] = [];
  for (let y = y0; y <= y1 + 1e-6; y += step) lines.push(oline([[xf, y, z0], [xf, y, z1]], color, w, "0", "butt", op));
  for (let z = z0; z <= z1 + 1e-6; z += step) lines.push(oline([[xf, y0, z], [xf, y1, z]], color, w, "0", "butt", op));
  return lines;
}
function gridFacade(col: string, op: number): Outline[] {
  return [...gridRight(4, 0, 4, 0, 1.6, 0.4, col, 0.5, op), ...gridRight(4, 0, 2.2, 1.6, 3.0, 0.4, col, 0.5, op)];
}
function envLines(pale: string, plot: string, op: number): Outline[] {
  return [
    loop([[-0.7, -0.7, 0], [4.7, -0.7, 0], [4.7, 4.7, 0], [-0.7, 4.7, 0]], pale, 1, "5 4", op),
    loop([[0, 0, 0], [4, 0, 0], [4, 4, 0], [0, 4, 0]], plot, 1.4, "0", op),
    oline([[2, 0, 0], [2, 4, 0]], pale, 1, "4 4", "butt", op),
    oline([[0, 2, 0], [4, 2, 0]], pale, 1, "4 4", "butt", op),
  ];
}
function guides(col: string, op: number, uz: number): Outline[] {
  return [
    loop([[0, 0, 1.6], [4, 0, 1.6], [4, 2.2, 1.6], [0, 2.2, 1.6]], col, 1, "4 4", op),
    loop([[0, 2.2, 1.6], [2.2, 2.2, 1.6], [2.2, 4, 1.6], [0, 4, 1.6]], col, 1, "4 4", op),
    oline([[4, 0, 1.6], [4, 0, uz]], col, 1, "4 4", "butt", op),
    oline([[4, 2.2, 1.6], [4, 2.2, uz]], col, 1, "4 4", "butt", op),
    oline([[0, 4, 1.6], [0, 4, uz]], col, 1, "4 4", "butt", op),
  ];
}
function glintFx(col: string, terra: string, op: number, t: number): Outline[] {
  const sh = 0.6 + 0.4 * Math.abs(Math.sin(t * 2.2));
  return [
    ...fineStar([0, 0, 3.0], 9, -9, col, 0.9, op * sh),
    ...fineStar([0.9, 0, 3.0], 4, -3, col, 0.7, op * sh),
    ...fineStar([0, 0, 3.0], 3.5, -22, terra, 0.7, op * (0.5 + 0.5 * sh)),
  ];
}

export default function RibaAnimation({ stages }: { stages: string[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [stageT, setStageT] = useState(0);
  const [flick, setFlick] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width:760px)");
    let raf = 0;
    let last = performance.now();
    let visible = true;

    const loopFn = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (visible) {
        setFlick((f) => f + dt);
        if (mq.matches) {
          // Mobile: auto-advance forward only, 0→7, hold, restart.
          setStageT((t) => (t + dt) % MOBILE_LOOP_T);
        }
      }
      raf = requestAnimationFrame(loopFn);
    };
    raf = requestAnimationFrame(loopFn);

    const onScroll = () => {
      if (mq.matches) return;
      const track = trackRef.current;
      if (!track) return;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const span = Math.max(1, track.offsetHeight - vh);
      const y = Math.min(span, Math.max(0, -track.getBoundingClientRect().top));
      setStageT((y / span) * SCROLL_MAX_T);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Pause the clock while the section is off-screen.
    let io: IntersectionObserver | undefined;
    if (rootRef.current && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          visible = e.isIntersecting;
        });
      });
      io.observe(rootRef.current);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  const P = paramsAt(stageT);

  const boxes: { o: number[]; pal: Pal; op?: number }[] = [];
  if (P.lowerH > 0.02) boxes.push({ o: [0, 0, 0, 4, 4, P.lowerH], pal: BLUE, op: P.massOp });
  if (P.upperH > 0.02) {
    boxes.push({ o: [0, 0, P.upperZ, 4, 2.2, P.upperH], pal: BLUE, op: P.massOp });
    boxes.push({ o: [0, 2.2, P.upperZ, 2.2, 1.8, P.upperH], pal: BLUE, op: P.massOp });
    if (P.chunkOp > 0.02) boxes.push({ o: [2.2, 2.2, P.upperZ + P.chunkLift, 1.8, 1.8, P.upperH], pal: BLUE, op: P.massOp * P.chunkOp });
  }
  const extras = P.winOp > 0.02 ? windows(P.winOp, flick) : [];
  const faces = scene(boxes, extras);

  let outlines: Outline[] = [];
  if (P.envOp > 0.02) outlines = outlines.concat(envLines(PALE, PLOT, P.envOp));
  if (P.terraOp > 0.02) outlines = outlines.concat(gridFacade(GRID, P.terraOp));
  if (P.guideOp > 0.02) outlines = outlines.concat(guides(GUIDE, P.guideOp, P.upperZ));
  if (P.glintOp > 0.02) outlines = outlines.concat(glintFx(GLINT, TERRA, P.glintOp, flick));

  const cur = Math.min(7, Math.max(0, Math.round(P.stagePos)));
  const hintOpacity = stageT / SCROLL_MAX_T > 0.03 ? 0 : 0.7;

  return (
    <div ref={rootRef}>
      <div ref={trackRef} className="bimc-riba-track">
        <div className="bimc-riba-pin">
          <div className="bimc-riba-stages">
            {stages.map((title, i) => (
              <div key={title} className="bimc-riba-stage">
                <span
                  className="bimc-riba-stage-num"
                  style={{ color: i === cur ? "#AC6752" : "rgba(40,23,14,0.35)" }}
                >
                  {i}
                </span>
                <span
                  className="bimc-riba-stage-title"
                  style={{ color: i === cur ? "#28170E" : "rgba(40,23,14,0.45)", fontWeight: i === cur ? 700 : 400 }}
                >
                  {title}
                </span>
              </div>
            ))}
          </div>
          <div className="bimc-riba-canvas">
            <svg viewBox="0 0 300 300" width="100%" height="100%">
              {faces.map((f, i) => (
                <polygon
                  key={i}
                  points={f.points}
                  fill={f.fill}
                  fillOpacity={f.opacity}
                  stroke={f.stroke}
                  strokeWidth="0.75"
                  strokeLinejoin="round"
                />
              ))}
              {outlines.map((ol, i) => (
                <polyline
                  key={i}
                  points={ol.points}
                  fill="none"
                  stroke={ol.stroke}
                  strokeWidth={ol.width}
                  strokeDasharray={ol.dash}
                  strokeLinecap={ol.cap as "butt" | "round" | "square"}
                  strokeLinejoin="round"
                  strokeOpacity={ol.opacity}
                />
              ))}
            </svg>
          </div>
          <div className="bimc-riba-caption">
            <span>
              {cur} — {stages[cur]}
            </span>
          </div>
          <svg
            className="bimc-riba-hint"
            width="30"
            height="18"
            viewBox="0 0 30 18"
            fill="none"
            stroke="#AC6752"
            strokeWidth="1.5"
            strokeLinecap="square"
            aria-hidden="true"
            style={{ opacity: hintOpacity }}
          >
            <polyline points="2,3 15,15 28,3" />
          </svg>
        </div>
      </div>
    </div>
  );
}
