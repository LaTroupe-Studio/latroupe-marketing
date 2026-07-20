"use client";
import { useContent } from "@/lib/locale-context";
import { useRef } from "react";
import { useGridReveal } from "./useGridReveal";
import styles from "./BimWhy.module.css";

export default function BimWhy() {
  const { content } = useContent();
  const { eyebrow, headline, items } = content.bim.why;
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useGridReveal(sectionRef, canvasRef);

  return (
    <section ref={sectionRef} className={styles.section} data-header-dark="">
      <canvas ref={canvasRef} aria-hidden="true" className={styles.canvas} />
      <div className={styles.container}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2 data-grid-h="" className={styles.headline}>{headline}</h2>
        <div className={styles.list}>
          {items.map((item, i) => (
            <div key={i} data-grid-anchor="" className={styles.item}>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemText}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
