"use client";
import { useContent } from "@/lib/locale-context";
import styles from "./About.module.css";

export default function About() {
  const { content } = useContent();
  return (
    <section id="nosotros" className={styles.section} data-bg-color="#AC6752" data-text-color="#F3EEE9">
      <div className="grid-container">
        <div className={`grid-12 ${styles.grid}`}>
          <div className={styles.headCol}>
            <p className={styles.eyebrow}>{content.about.eyebrow}</p>
            <h2 className={styles.headline}>{content.about.headline}</h2>
          </div>
          <div className={styles.copyCol}>
            {content.about.blocks.map((block, i) => (
              <p key={i} className={styles.bodyText}>{block}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
