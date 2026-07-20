"use client";
import { useState } from "react";
import { useContent } from "@/lib/locale-context";
import styles from "./BimFaq.module.css";

export default function BimFaq() {
  const { content } = useContent();
  const { headline, items } = content.bim.faq;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.headline}>{headline}</h2>
        <div className={styles.list}>
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={`${styles.item}${isOpen ? ` ${styles.itemOpen}` : ""}`}>
                <button
                  type="button"
                  className={styles.question}
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    stroke="var(--color-terracota-2)"
                    strokeWidth="1"
                    strokeLinecap="square"
                    aria-hidden="true"
                    className={styles.icon}
                  >
                    <line x1="3" y1="11" x2="19" y2="11" />
                    <line x1="11" y1="3" x2="11" y2="19" style={{ opacity: isOpen ? 0 : 1 }} />
                  </svg>
                </button>
                <div className={styles.answer}>
                  <div className={styles.answerClip}>
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
