"use client";
import { useContent } from "@/lib/locale-context";
import styles from "./About.module.css";

export default function About() {
  const { content } = useContent();
  return (
    <section id="nosotros" className={styles.section}>
      <div className="grid-container">
        <div className={`grid-12 ${styles.grid}`}>
          <div className={styles.eyebrowCol}><h2 className={styles.eyebrow}>{content.about.eyebrow}</h2></div>
          <div className={styles.headlineCol}><p className={styles.headline}>{content.about.headline}</p></div>
          <div className={styles.text1Col}><p className={styles.bodyText}>{content.about.blocks[0]}</p></div>
          <div className={styles.text2Col}><p className={styles.bodyText}>{content.about.blocks[1]}</p></div>
          <div className={styles.text3Col}><p className={styles.bodyText}>{content.about.blocks[2]}</p></div>
        </div>
      </div>
    </section>
  );
}
