"use client";
import { useContent } from "@/lib/locale-context";
import { withBasePath } from "@/lib/paths";
import styles from "./BimCaseStudy.module.css";

export default function BimCaseStudy() {
  const { content } = useContent();
  const cs = content.bim.caseStudy;
  const meta = [
    { label: "Author & partner", value: cs.author },
    { label: "End client", value: cs.endClient },
    { label: "Typology / use", value: cs.typology },
    { label: "Area", value: cs.area },
    { label: "Location", value: cs.location },
    { label: "Year", value: cs.year },
  ];

  return (
    <section id="case-study" className={styles.section} data-header-dark="">
      <div className={styles.heroPhoto}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={withBasePath(cs.heroImage)} alt={cs.headline} className={styles.heroImg} />
        <div className={styles.heroOverlay} />
        <span className={styles.credit}>{cs.imageCredit}</span>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>{cs.eyebrow}</span>
          <h2 className={styles.headline}>{cs.headline}</h2>
          <div className={styles.metaGrid}>
            {meta.map((m) => (
              <div key={m.label} className={styles.metaItem}>
                <div className={styles.metaLabel}>{m.label}</div>
                <div className={styles.metaValue}>{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.introRow}>
          <p className={styles.intro}>{cs.intro}</p>
          <div className={styles.standardsCol}>
            <div className={styles.standardsLabel}>Standards</div>
            <div className={styles.standardsValue}>{cs.standards}</div>
          </div>
        </div>

        <h3 className={styles.whatHeading}>What we did</h3>
        <div className={styles.whatGrid}>
          {cs.whatWeDid.map((section, i) => (
            <div key={i} className={styles.whatBlock}>
              <div className={styles.whatTitle}>{section.title}</div>
              <div className={styles.whatList}>
                {section.items.map((item, j) => (
                  <p key={j} className={styles.whatItem}>{item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.resultPanel}>
          <svg viewBox="0 0 93.394 75.330" fill="currentColor" aria-hidden="true" className={styles.resultIcon}>
            <path d="M 14.101 75.32 L 22.861 68.52 C 8.481 49.92 8.761 24.95 22.931 6.65 L 14.091 0 C -4.569 19.58 -4.809 55.43 14.091 75.32 L 14.101 75.32 Z M 79.561 75.2 C 84.901 69.18 88.201 63.15 90.571 56.01 C 96.581 37.31 93.051 14.37 79.291 0.02 L 70.481 6.65 C 84.611 24.95 84.931 49.93 70.551 68.48 C 73.461 71.12 76.271 73.23 79.561 75.21 L 79.561 75.2 Z"></path>
          </svg>
          <div>
            <div className={styles.resultLabel}>the result</div>
            <p className={styles.result}>{cs.result}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
