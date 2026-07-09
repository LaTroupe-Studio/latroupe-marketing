"use client";
import { useContent } from "@/lib/locale-context";
import styles from "./BimServices.module.css";

export default function BimServices() {
  const { content } = useContent();
  const { headline, items } = content.bim.services;
  return (
    <section id="servicios" className={styles.section} data-bg-color="#ECE6E3" data-text-color="#77330B">
      <div className="grid-container">
        <div className="grid-12">
          <h2 className={styles.headline}>{headline}</h2>
        </div>
        {items.map((item, i) => (
          <div
            key={item.number}
            className={`grid-12 ${styles.itemRow}`}
            data-side={i % 2 === 0 ? "left" : "right"}
          >
            <div className={styles.itemInner}>
              <h3 className={styles.itemTitle}>
                <span className={styles.itemNumber}>{item.number}</span> {item.title}
              </h3>
              <span className={styles.itemSub}>{item.subtitle}</span>
              {item.paragraphs.map((p, j) => (
                <p key={j} className={styles.itemText}>{p}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
