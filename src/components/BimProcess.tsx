"use client";
import { useContent } from "@/lib/locale-context";
import styles from "./BimProcess.module.css";

export default function BimProcess() {
  const { content } = useContent();
  const { headline, intro, steps } = content.bim.process;
  return (
    <section id="proceso" className={styles.section} data-bg-color="#ECE6E3" data-text-color="#77330B">
      <div className="grid-container">
        <div className="grid-12">
          <h2 className={styles.headline}>{headline}</h2>
        </div>
        <div className={`grid-12 ${styles.introRow}`}>
          <p className={styles.intro}>{intro}</p>
        </div>
        <div className={styles.steps}>
          {steps.map((step) => (
            <div key={step.number} className={styles.step}>
              <span className={styles.stepNumber}>{step.number}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
