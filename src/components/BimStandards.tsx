"use client";
import { useContent } from "@/lib/locale-context";
import styles from "./BimStandards.module.css";

export default function BimStandards() {
  const { content } = useContent();
  const standards = content.bim.standards;
  const sectors = content.bim.sectors;
  return (
    <section id="standards" className={styles.section} data-header-dark="">
      <div className={styles.container}>
        <span className={styles.eyebrow}>{standards.eyebrow}</span>
        <h2 className={styles.headline}>{standards.headline}</h2>
        <p className={styles.sub}>{standards.sub}</p>
        <div className={styles.list}>
          {standards.items.map((item, i) => (
            <div key={i} className={styles.item}>
              <h3 className={styles.code}>{item.code}</h3>
              <p className={styles.description}>{item.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.divider} aria-hidden="true" />

        <span className={styles.eyebrow}>{sectors.eyebrow}</span>
        <h2 className={styles.sectorsHeadline}>{sectors.headline}</h2>
        <div className={styles.tags}>
          {sectors.items.map((item) => (
            <span key={item} className={styles.tag}>{item}</span>
          ))}
        </div>
        <p className={styles.sectorsSub}>{sectors.sub}</p>
      </div>
    </section>
  );
}
