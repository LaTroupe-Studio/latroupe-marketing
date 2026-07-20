"use client";
import { useContent } from "@/lib/locale-context";
import { adaptIcons } from "./BimAdaptIcons";
import styles from "./BimAdapts.module.css";

export default function BimAdapts() {
  const { content } = useContent();
  const { headline, sub, items } = content.bim.adapts;
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.panel}>
          <h2 className={styles.headline}>{headline}</h2>
          <p className={styles.sub}>{sub}</p>
        </div>
        <div className={styles.list}>
          {items.map((item, i) => (
            <div key={i} className={styles.item}>
              {adaptIcons[i]}
              <div className={styles.itemInner}>
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
