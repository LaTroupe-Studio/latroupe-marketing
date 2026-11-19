import type { CSSProperties } from "react";
import type { PartnerIconName } from "./content";
import styles from "./PartnerIcon.module.css";

/**
 * Hairline icons for the three kinds of partner, drawn in currentColor with
 * one terracotta accent each and animated in CSS (PartnerIcon.module.css).
 * An icon draws itself once when its panel becomes `active`, then rests.
 *
 *   chain   a grid of identical modules: the brand standard, spreading
 *   owner   the investment curve: it dips, breaks even, and returns
 *   studio  the spark of the idea
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
      strokeWidth={1.25}
      strokeLinecap="butt"
      strokeLinejoin="miter"
    >
      {name === "chain" && <Chain />}
      {name === "owner" && <Owner />}
      {name === "studio" && <Studio />}
    </svg>
  );
}

const CELL = 22;
const CELL_AT = [17, 49, 81];

/** The top-left module is the standard; the rest take it up in a diagonal wave. */
function Chain() {
  return (
    <>
      {CELL_AT.map((y, row) =>
        CELL_AT.map((x, col) => {
          const master = row === 0 && col === 0;
          return (
            <rect
              key={`${row}-${col}`}
              x={x}
              y={y}
              width={CELL}
              height={CELL}
              className={master ? styles.master : styles.cell}
              style={{ "--i": row + col } as CSSProperties}
            />
          );
        }),
      )}
    </>
  );
}

function Owner() {
  return (
    <>
      <path d="M12 20V104" className={styles.faint} />
      <path d="M12 64H108" />
      {/* what is invested before the curve crosses the axis again */}
      <path d="M12 64C30 64 34 96 48 96C55 96 62 82 71 66L72 64Z" className={styles.dip} />
      <path d="M12 64C30 64 34 96 48 96S76 40 106 24" className={styles.draw} pathLength={100} />
      {/* break-even */}
      <circle cx="72" cy="64" r="4" className={styles.point} />
    </>
  );
}

function Studio() {
  return (
    <>
      <path
        d="M56 22Q60 62 100 66Q60 70 56 110Q52 70 12 66Q52 62 56 22Z"
        className={styles.draw}
        pathLength={100}
      />
      <path d="M96 12Q97 25 110 26Q97 27 96 40Q95 27 82 26Q95 25 96 12Z" className={styles.glint} />
    </>
  );
}
