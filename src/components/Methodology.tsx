"use client";
import { useContent } from "@/lib/locale-context";
import styles from "./Methodology.module.css";

export default function Methodology() {
  const { content } = useContent();
  const p = content.methodology.pillars;
  return (
    <section id="metodologia" className={styles.section}>
      <div className="grid-container">
        {/* Headline: col 3 */}
        <div className="grid-12">
          <h2 className={styles.headline}>{content.methodology.headline}</h2>
        </div>

        {/* Intro: col 1 */}
        <div className={`grid-12 ${styles.introRow}`}>
          <p className={styles.intro}>{content.methodology.intro}</p>
        </div>
        {content.methodology.subtitle && (
          <div className={`grid-12 ${styles.subtitleRow}`}>
            <p className={styles.intro}>{content.methodology.subtitle}</p>
          </div>
        )}

        {/* ── Pillar I ── */}
        {p[0] && <div className={styles.pillarBlock}>
          <div className="grid-12">
            <h3 className={`${styles.pillarTitle} ${styles.p1Title}`}>{p[0].number} {p[0].title}</h3>
          </div>
          <div className={`grid-12 ${styles.subRow}`}>
            <span className={`${styles.pillarSub} ${styles.p1Sub}`}>{p[0].subtitle}</span>
          </div>
          <div className={`grid-12 ${styles.textRow}`}>
            <p className={`${styles.pillarText} ${styles.p1t1}`}>{p[0].paragraphs[0]}</p>
          </div>
          {p[0].paragraphs[1] && <div className={`grid-12 ${styles.textRow}`}>
            <p className={`${styles.pillarText} ${styles.p1t2}`}>{p[0].paragraphs[1]}</p>
          </div>}
        </div>}

        {/* ── Pillar II ── */}
        {p[1] && <div className={styles.pillarBlock}>
          <div className="grid-12">
            <h3 className={`${styles.pillarTitle} ${styles.p2Title}`}>{p[1].number} {p[1].title}</h3>
          </div>
          <div className={`grid-12 ${styles.subRow}`}>
            <span className={`${styles.pillarSub} ${styles.p2Sub}`}>{p[1].subtitle}</span>
          </div>
          <div className={`grid-12 ${styles.textRow}`}>
            <p className={`${styles.pillarText} ${styles.p2t1}`}>{p[1].paragraphs[0]}</p>
          </div>
        </div>}

        {/* ── Pillar III ── */}
        {p[2] && <div className={styles.pillarBlock}>
          <div className="grid-12">
            <h3 className={`${styles.pillarTitle} ${styles.p3Title}`}>{p[2].number} {p[2].title}</h3>
          </div>
          <div className={`grid-12 ${styles.subRow}`}>
            <span className={`${styles.pillarSub} ${styles.p3Sub}`}>{p[2].subtitle}</span>
          </div>
          <div className={`grid-12 ${styles.textRow}`}>
            <p className={`${styles.pillarText} ${styles.p3t1}`}>{p[2].paragraphs[0]}</p>
          </div>
          {p[2].paragraphs[1] && <div className={`grid-12 ${styles.textRow}`}>
            <p className={`${styles.pillarText} ${styles.p3t2}`}>{p[2].paragraphs[1]}</p>
          </div>}
        </div>}
      </div>
    </section>
  );
}
