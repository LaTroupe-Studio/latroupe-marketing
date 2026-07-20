import styles from "./BimAdapts.module.css";

export const adaptIcons = [
  // We work in your hours
  (
    <svg key="hours" className={styles.adaptIcon} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="20.5" cy="24" r="10" stroke="#77330B" strokeWidth={0.9} />
      <circle cx="27.5" cy="24" r="10" stroke="#77330B" strokeWidth={0.9} />
      <path className={styles.lens} d="M24 14.6 A10 10 0 0 1 24 33.4 A10 10 0 0 1 24 14.6 Z" fill="#AC6752" fillOpacity={0} stroke="#AC6752" strokeWidth={0.8} />
    </svg>
  ),
  // We join your team
  (
    <svg key="team" className={styles.adaptIcon} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M14 14 H34 V34 H14 Z" stroke="#77330B" strokeWidth={0.9} strokeLinejoin="miter" />
      <circle cx="14" cy="14" r="2.4" fill="#F7F6F5" stroke="#77330B" strokeWidth={0.75} />
      <circle cx="34" cy="14" r="2.4" fill="#F7F6F5" stroke="#77330B" strokeWidth={0.75} />
      <circle cx="34" cy="34" r="2.4" fill="#F7F6F5" stroke="#77330B" strokeWidth={0.75} />
      <circle cx="14" cy="34" r="2.4" fill="#F7F6F5" stroke="#77330B" strokeWidth={0.75} />
      <g stroke="#AC6752" strokeWidth={0.7} strokeLinecap="butt">
        <line className={styles.draw} x1="24" y1="24" x2="15.7" y2="15.7" pathLength={1} strokeDasharray={1} />
        <line className={styles.draw} x1="24" y1="24" x2="32.3" y2="15.7" pathLength={1} strokeDasharray={1} />
        <line className={styles.draw} x1="24" y1="24" x2="32.3" y2="32.3" pathLength={1} strokeDasharray={1} />
        <line className={styles.draw} x1="24" y1="24" x2="15.7" y2="32.3" pathLength={1} strokeDasharray={1} />
      </g>
      <circle className={styles.node} cx="24" cy="24" r="2.8" fill="#AC6752" />
    </svg>
  ),
  // We start from whatever you have
  (
    <svg key="whatever" className={styles.adaptIcon} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="12" y="16" width="16" height="20" stroke="#77330B" strokeWidth={0.9} />
      <rect x="16" y="13" width="16" height="20" fill="#F7F6F5" stroke="#77330B" strokeWidth={0.9} />
      <g className={styles.sheet}>
        <rect x="20" y="10" width="16" height="20" fill="#F7F6F5" stroke="#AC6752" strokeWidth={0.9} />
        <line x1="24" y1="16" x2="32" y2="16" stroke="#AC6752" strokeWidth={0.75} strokeLinecap="square" />
        <line x1="24" y1="20" x2="32" y2="20" stroke="#AC6752" strokeWidth={0.75} strokeLinecap="square" />
        <line x1="24" y1="24" x2="29" y2="24" stroke="#AC6752" strokeWidth={0.75} strokeLinecap="square" />
      </g>
    </svg>
  ),
  // You stay in control of your information
  (
    <svg key="control" className={styles.adaptIcon} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="12" y="14" width="24" height="20" stroke="#77330B" strokeWidth={0.9} />
      <line x1="16" y1="20" x2="32" y2="20" stroke="#77330B" strokeWidth={0.75} />
      <line x1="16" y1="24" x2="27" y2="24" stroke="#77330B" strokeWidth={0.75} />
      <line x1="16" y1="28" x2="30" y2="28" stroke="#77330B" strokeWidth={0.75} />
      <line className={styles.scan} x1="11" y1="24" x2="37" y2="24" stroke="#AC6752" strokeWidth={1.0} strokeLinecap="square" />
    </svg>
  ),
];
