"use client";
import { useContent } from "@/lib/locale-context";
import styles from "./TrustLogos.module.css";

export default function TrustLogos() {
  const { content } = useContent();
  const logos = [...content.trust.logos, ...content.trust.logos, ...content.trust.logos];
  return (
    <section id="trust-section" className={styles.section}>
      <div className="grid-container">
        <h2 className={styles.headline}>{content.trust.headline}</h2>
      </div>
      <div className={styles.carouselOuter}>
        <div className={styles.carouselWrapper}>
          <div className={styles.carousel}>
            {logos.map((logo, i) => (
              <div key={`${logo.name}-${i}`} className={styles.logoItem}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo.src} alt={logo.name} className={styles.logoImage} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
