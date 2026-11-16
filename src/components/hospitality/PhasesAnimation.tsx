"use client";
import { useEffect, useRef, useState } from "react";
import {
  envLines, glintFx, gridFacade, guides, scene, windows,
  type Face, type Outline, type Pal,
} from "../bim-consultancy/RibaAnimation";
import styles from "./PhasesAnimation.module.css";

/**
 * The isometric building of the BIM consultancy RIBA section, re-keyed to the
 * six phases of a hotel. Same drawing helpers; only the sequence changes:
 *
 *   0 concept          the plot and a first low massing
 *   1 brand approval   full massing, one block floating: an option under review
 *   2 technical design the façade gridded with the technical layer
 *   3 FF&E/purchasing  upper floor lifted, room outlines dashed: fitting out
 *   4 construction     back in place, sparkles of the finishing work
 *   5 opening          windows lit: guests inside
 *
 * Desktop: the scene is pinned and scrolling walks the phases; the list on
 * the left marks the current one and shows its line. Phones: it plays in a
 * loop and a caption replaces the list.
 */

/* Keyframed parameters, one value per phase. */
const KF: Record<string, number[]> = {
  lowerH: [0.55, 1.6, 1.6, 1.6, 1.6, 1.6],
  upperH: [0.0, 1.4, 1.4, 1.4, 1.4, 1.4],
  upperZ: [1.6, 1.6, 1.6, 1.9, 1.6, 1.6],
  chunkLift: [0.0, 0.0, 1.7, 1.7, 1.7, 1.7],
  chunkOp: [0.0, 1.0, 0.0, 0.0, 0.0, 0.0],
  massOp: [0.85, 1.0, 1.0, 1.0, 1.0, 1.0],
  envOp: [0.8, 0.0, 0.0, 0.0, 0.0, 0.0],
  terraOp: [0.0, 0.0, 1.0, 0.0, 0.0, 0.0],
  guideOp: [0.0, 0.0, 0.0, 1.0, 0.0, 0.0],
  winOp: [0.0, 0.0, 0.0, 0.0, 0.0, 1.0],
  glintOp: [0.0, 0.0, 0.0, 0.0, 1.0, 0.3],
};
/* [time, phase]: holds at both ends, eased in between. */
const ANCHORS: [number, number][] = [
  [0.0, 0], [0.4, 0], [1.4, 1], [2.4, 2], [3.4, 3], [4.4, 4], [5.4, 5], [7.4, 5],
];
const SCROLL_MAX_T = 5.4;
const MOBILE_LOOP_T = 7.4;

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

/* Blues of the RIBA drawing; the accents move from terracotta to the beiges. */
const BLUE: Pal = { top: "#5B7699", left: "#33506E", right: "#152A44", stroke: "#0E1B30" };
const PALE = "#8CA0BC";
const PLOT = "#2F4868";
const GUIDE = "#2F4868";
const GRID = "#8CA0BC";
const GLINT = "#ECE6E3";
const GLINT_2 = "#2F4868";

export default function PhasesAnimation({ steps }: { steps: { label: string; text: string }[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [stageT, setStageT] = useState(0);
  const [flick, setFlick] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    let visible = true;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (visible && !still) {
        setFlick((f) => f + dt);
        if (mq.matches) setStageT((t) => (t + dt) % MOBILE_LOOP_T);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onScroll = () => {
      if (mq.matches) return;
      const track = trackRef.current;
      if (!track) return;
      const span = Math.max(1, track.offsetHeight - window.innerHeight);
      const y = Math.min(span, Math.max(0, -track.getBoundingClientRect().top));
      setStageT((y / span) * SCROLL_MAX_T);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Stop the clock while the section is off-screen.
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { visible = e.isIntersecting; }));
    if (rootRef.current) io.observe(rootRef.current);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
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
  const faces: Face[] = scene(boxes, P.winOp > 0.02 ? windows(P.winOp, flick) : []);

  let outlines: Outline[] = [];
  if (P.envOp > 0.02) outlines = outlines.concat(envLines(PALE, PLOT, P.envOp));
  if (P.terraOp > 0.02) outlines = outlines.concat(gridFacade(GRID, P.terraOp));
  if (P.guideOp > 0.02) outlines = outlines.concat(guides(GUIDE, P.guideOp, P.upperZ));
  if (P.glintOp > 0.02) outlines = outlines.concat(glintFx(GLINT, GLINT_2, P.glintOp, flick));

  const cur = Math.min(steps.length - 1, Math.max(0, Math.round(P.stagePos)));
  const num = (i: number) => `( ${String(i + 1).padStart(2, "0")} )`;

  return (
    <div ref={rootRef}>
      <div ref={trackRef} className={styles.track}>
        <div className={styles.pin}>
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
              {faces.map((f, i) => (
                <polygon key={i} points={f.points} fill={f.fill} fillOpacity={f.opacity} stroke={f.stroke} strokeWidth="0.75" strokeLinejoin="round" />
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
          <div className={styles.caption}>
            <span className={styles.num}>{num(cur)}</span>
            <strong>{steps[cur]?.label}</strong>
            <p>{steps[cur]?.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
