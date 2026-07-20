"use client";
import { useContent } from "@/lib/locale-context";
import { serviceIcons } from "./BimServiceIcons";
import styles from "./BimServices.module.css";

export default function BimServices() {
  const { content } = useContent();
  const { eyebrow, headline, sub, items } = content.bim.services;
  return (
    <section id="services" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.headCard}>
            <span className={styles.eyebrow}>{eyebrow}</span>
            <h2 className={styles.headline}>{headline}</h2>
            <p className={styles.sub}>{sub}</p>
          </div>
          {items.map((item, i) => (
            <div key={item.number} className={styles.card}>
              {serviceIcons[i]}
              <h3 className={styles.cardTitle}>{item.title}</h3>
              {item.paragraphs.map((p, j) => (
                <p key={j} className={styles.cardText}>{p}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
