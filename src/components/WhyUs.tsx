"use client";
import { useContent } from "@/lib/locale-context";
import styles from "./WhyUs.module.css";

export default function WhyUs() {
  const { content } = useContent();
  return (
    <section id="por-que-nosotros" className={styles.section}>
      <div className="grid-container">
        <div className={`grid-12 ${styles.headRow}`}>
          <h2 className={styles.headline}>{content.whyUs.headline}</h2>
        </div>
        {content.whyUs.paragraphs.map((p, i) => (
          <div key={i} className={`grid-12 ${styles.textRow}`}>
            <p className={`${styles.bodyText} ${i === 0 ? styles.text1 : styles.text2}`}>{p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
