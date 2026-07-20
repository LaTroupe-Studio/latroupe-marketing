"use client";
import { useContent } from "@/lib/locale-context";
import styles from "./BimHero.module.css";

export default function BimHero({ onCta }: { onCta?: (id: string) => void }) {
  const { content } = useContent();
  const hero = content.bim.hero;

  const handleCta = () => {
    if (onCta) onCta(hero.cta.id);
    else document.getElementById(hero.cta.id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.copy}>
          <h1 className={styles.h1}>{hero.h1}</h1>
          <p className={styles.subhead}>{hero.subhead}</p>
          <div className={styles.ctaRow}>
            <button className={styles.cta} onClick={handleCta}>{hero.cta.label}</button>
            <span className={styles.ctaSub}>{hero.ctaSub}</span>
          </div>
        </div>
        <svg
          className={styles.decoIcon}
          viewBox="0 0 93.394 75.330"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M 14.101 75.32 L 22.861 68.52 C 8.481 49.92 8.761 24.95 22.931 6.65 L 14.091 0 C -4.569 19.58 -4.809 55.43 14.091 75.32 L 14.101 75.32 Z M 79.561 75.2 C 84.901 69.18 88.201 63.15 90.571 56.01 C 96.581 37.31 93.051 14.37 79.291 0.02 L 70.481 6.65 C 84.611 24.95 84.931 49.93 70.551 68.48 C 73.461 71.12 76.271 73.23 79.561 75.21 L 79.561 75.2 Z"></path>
        </svg>
      </div>
      <svg
        className={styles.scrollHint}
        width="30"
        height="18"
        viewBox="0 0 30 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        aria-hidden="true"
      >
        <polyline points="2,3 15,15 28,3"></polyline>
      </svg>
    </section>
  );
}
