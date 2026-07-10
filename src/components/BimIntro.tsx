"use client";
import { useContent } from "@/lib/locale-context";
import styles from "./BimIntro.module.css";

export default function BimIntro() {
  const { content } = useContent();
  const intro = content.bim.intro;
  return (
    <section className={styles.section} data-bg-color="#ECE6E3" data-text-color="#77330B">
      <div className="grid-container">
        <div className={`grid-12 ${styles.eyebrowRow}`}>
          <span className={styles.eyebrow}>{intro.eyebrow}</span>
        </div>
        <div className={`grid-12 ${styles.headRow}`}>
          <h2 className={styles.headline}>{intro.headline}</h2>
        </div>
        {intro.blocks.map((block, i) => (
          <div key={i} className={`grid-12 ${styles.textRow}`}>
            <p className={styles.bodyText}>{block}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
