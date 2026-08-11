"use client";
import { useEffect, useRef, useState } from "react";
import { useContent } from "@/lib/locale-context";
import styles from "./Methodology.module.css";

/**
 * The three pillars are stacked in one grid cell and cross-faded as the page
 * scrolls through a tall track. The heading block is inside the sticky pin, so
 * it stays put under the header while the pillars advance — that is what marks
 * the start of the sequence.
 */
export default function Methodology() {
  const { content } = useContent();
  const pillars = content.methodology.pillars;
  const trackRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || pillars.length === 0) return;

    // Respect users who asked for less motion: skip the step-driving scroll
    // listener entirely. Visibility for this case is handled purely in CSS
    // (all pillars are stacked and shown at once, see Methodology.module.css),
    // so we never need `step` to advance past its initial value here.
    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (quieto.matches) return;

    const onScroll = () => {
      const span = Math.max(1, track.offsetHeight - window.innerHeight);
      const y = Math.min(span, Math.max(0, -track.getBoundingClientRect().top));
      const idx = Math.min(pillars.length - 1, Math.floor((y / span) * pillars.length));
      setStep((prev) => (prev === idx ? prev : idx));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pillars.length]);

  return (
    <section id="metodologia" className={styles.section} data-bg-color="#ECE6E3" data-text-color="#77330B">
      <div className="grid-container">
        <div ref={trackRef} className={styles.track}>
          <div className={styles.pin} data-step={step}>
            <div className={`grid-12 ${styles.headRow}`}>
              <h2 className={styles.headline}>{content.methodology.headline}</h2>
            </div>

            <div className={`grid-12 ${styles.introRow}`}>
              {content.methodology.subtitle && (
                <p className={styles.subtitle}>{content.methodology.subtitle}</p>
              )}
              <p className={styles.intro}>{content.methodology.intro}</p>
            </div>

            <div className={styles.panels}>
              {/* Desktop: a fixed "0" with the changing digit rolling beside it */}
              <div className={`grid-12 ${styles.rollerRow}`} aria-hidden="true">
                <div className={styles.roller}>
                  <span>0</span>
                  <span className={styles.rollerWindow}>
                    <span
                      className={styles.rollerTape}
                      style={{ transform: `translateY(${-step * 0.9}em)` }}
                    >
                      {pillars.map((_, i) => (
                        <span key={i}>{i + 1}</span>
                      ))}
                    </span>
                  </span>
                </div>
              </div>

              {pillars.map((pillar, i) => (
                <div key={i} className={`grid-12 ${styles.panel}`} data-active={i === step}>
                  <div className={styles.rowNum} aria-hidden="true">
                    <span>0</span>
                    {i + 1}
                  </div>
                  <div className={styles.pillarHead}>
                    <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                    <div className={styles.pillarSub}>{pillar.subtitle}</div>
                  </div>
                  <p className={styles.pillarText}>{pillar.paragraphs.join("\n\n")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
