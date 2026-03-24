"use client";
import { useContent } from "@/lib/locale-context";
import styles from "./WhyUs.module.css";

export default function WhyUs() {
  const { content } = useContent();
  const p = content.whyUs.paragraphs;
  return (
    <section id="por-que-nosotros" className={styles.section}>
      <div className="grid-container">
        <div className={`grid-12 ${styles.headRow}`}>
          <h2 className={styles.headline}>{content.whyUs.headline}</h2>
        </div>
        {/* Group 1: paragraphs 0,1 at col 6 */}
        {p[0] && <div className={`grid-12 ${styles.textRow}`}><p className={`${styles.bodyText} ${styles.text1}`}>{p[0]}</p></div>}
        {p[1] && <div className={`grid-12 ${styles.textRow}`}><p className={`${styles.bodyText} ${styles.text1}`}>{p[1]}</p></div>}
        {/* Group 2: paragraphs 2,3 at col 7 with extra top space */}
        {p[2] && <div className={`grid-12 ${styles.textRowGap}`}><p className={`${styles.bodyText} ${styles.text2}`}>{p[2]}</p></div>}
        {p[3] && <div className={`grid-12 ${styles.textRow}`}><p className={`${styles.bodyText} ${styles.text2}`}>{p[3]}</p></div>}
      </div>
    </section>
  );
}
