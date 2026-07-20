"use client";
import { useContent } from "@/lib/locale-context";
import styles from "./BimDeliverables.module.css";

export default function BimDeliverables() {
  const { content } = useContent();
  const { eyebrow, headline, sub, items } = content.bim.deliverables;
  return (
    <section className={styles.section} data-header-dark="">
      <div className={styles.container}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2 className={styles.headline}>{headline}</h2>
        <p className={styles.sub}>{sub}</p>
        <div className={styles.grid}>
          {items.map((item) => (
            <div key={item.number} className={styles.item}>
              <span className={styles.number}>{item.number}</span>
              <div>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemText}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
