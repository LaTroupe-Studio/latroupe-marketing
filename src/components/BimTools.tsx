"use client";
import { useContent } from "@/lib/locale-context";
import { useRef } from "react";
import { withBasePath } from "@/lib/paths";
import { useGridReveal } from "./useGridReveal";
import styles from "./BimTools.module.css";

export default function BimTools() {
  const { content } = useContent();
  const { eyebrow, headline, sub, items } = content.bim.tools;
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useGridReveal(sectionRef, canvasRef);

  return (
    <section ref={sectionRef} className={styles.section}>
      <canvas ref={canvasRef} aria-hidden="true" className={styles.canvas} />
      <div className={styles.container}>
        <div className={styles.head}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 data-grid-h="" className={styles.headline}>{headline}</h2>
          <p data-grid-top="" className={styles.sub}>{sub}</p>
        </div>
        <div className={styles.grid}>
          {items.map((tool) => (
            <div key={tool.name} data-grid-anchor="" className={styles.tool}>
              <div className={styles.toolImg}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={withBasePath(tool.img)} alt={tool.name} />
              </div>
              <span className={styles.toolName}>
                <span className={styles.bracket}>[</span>
                {tool.name}
                <span className={styles.bracket}>]</span>
              </span>
              <span className={styles.toolDesc}>{tool.description}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
