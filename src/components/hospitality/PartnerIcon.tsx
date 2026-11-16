import type { PartnerIconName } from "./content";
import styles from "./PartnerIcon.module.css";

/**
 * Line icons for the three kinds of partner, drawn in currentColor and
 * animated in CSS (PartnerIcon.module.css). They only move while `active`,
 * so the hidden panels of the sequence stay still.
 *
 *   chain   three hotels of a group, their windows lighting up in turn
 *   owner   a room key under a bar chart that grows: the investment per key
 *   studio  a floor plan whose wall a pencil draws, door swing included
 */
export default function PartnerIcon({ name, active }: { name: PartnerIconName; active: boolean }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={styles.icon}
      data-active={active}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {name === "chain" && <Chain />}
      {name === "owner" && <Owner />}
      {name === "studio" && <Studio />}
    </svg>
  );
}

/** Each window gets its own delay, so they light up one after another. */
const WINDOWS: [number, number][] = [
  // left hotel
  [16, 62], [26, 62], [16, 76], [26, 76],
  // centre hotel (tallest)
  [50, 32], [62, 32], [50, 46], [62, 46], [50, 60], [62, 60], [50, 74], [62, 74],
  // right hotel
  [88, 52], [98, 52], [88, 66], [98, 66], [88, 80], [98, 80],
];

function Chain() {
  return (
    <>
      <line x1="6" y1="102" x2="114" y2="102" />
      <rect x="10" y="52" width="26" height="50" />
      <rect x="42" y="20" width="34" height="82" />
      <rect x="82" y="42" width="26" height="60" />
      {/* door of the centre hotel */}
      <path d="M53 102 V90 H65 V102" />
      {WINDOWS.map(([x, y], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width="6"
          height="7"
          className={styles.window}
          style={{ animationDelay: `${(i * 0.37) % 3.6}s` }}
          fill="currentColor"
          stroke="none"
        />
      ))}
    </>
  );
}

function Owner() {
  return (
    <>
      {/* bars growing from the base line: the value of the asset */}
      <line x1="54" y1="58" x2="110" y2="58" />
      <rect x="60" y="40" width="10" height="18" className={styles.bar} style={{ animationDelay: "0s" }} />
      <rect x="76" y="30" width="10" height="28" className={styles.bar} style={{ animationDelay: "0.25s" }} />
      <rect x="92" y="16" width="10" height="42" className={styles.bar} style={{ animationDelay: "0.5s" }} />
      {/* the key, which turns a quarter in the lock */}
      <g className={styles.key}>
        <circle cx="30" cy="84" r="16" />
        <circle cx="30" cy="84" r="5" />
        <path d="M46 84 H106 M90 84 V96 M100 84 V94" />
      </g>
    </>
  );
}

function Studio() {
  return (
    <>
      {/* plan outline, faint, with the wall and door drawn over it */}
      <rect x="12" y="20" width="96" height="80" className={styles.faint} />
      <path d="M12 60 H58 M74 60 H108" className={styles.wall} pathLength={100} />
      <path d="M58 60 A16 16 0 0 1 74 44" className={styles.door} pathLength={100} />
      {/* pencil, travelling along the wall as it is drawn */}
      <g className={styles.pencil}>
        <path d="M0 0 L6 -14 L28 -40 L36 -33 L14 -7 Z" />
        <path d="M0 0 L6 -14 L14 -7 Z" fill="currentColor" />
        <path d="M24 -36 L32 -29" />
      </g>
    </>
  );
}
