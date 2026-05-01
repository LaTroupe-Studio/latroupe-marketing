"use client";
import { useContent } from "@/lib/locale-context";
import { withBasePath } from "@/lib/paths";
import LogoText from "./LogoText";
import styles from "./TrustLogos.module.css";

export default function TrustLogos() {
  const { content } = useContent();
  const logos = [...content.trust.logos, ...content.trust.logos, ...content.trust.logos];
  const headlineParts = content.trust.headline.split("latroupe");
  return (
    <section id="trust-section" className={styles.section} data-bg-color="#AC6752" data-text-color="#ECE6E3">
      <div className="grid-container">
        <h2 className={styles.headline}>
          {headlineParts.length > 1 ? (
            <>
              {headlineParts[0]}
              <LogoText color="#ECE6E3" className={styles.logoInline} />
              {headlineParts[1]}
            </>
          ) : (
            content.trust.headline
          )}
        </h2>
      </div>
      <div className="grid-container">
        <div className={styles.carouselWrapper}>
          <div className={styles.carousel}>
            {logos.map((logo, i) => (
              <div key={`${logo.name}-${i}`} className={styles.logoItem}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={withBasePath(logo.src)} alt={logo.name} className={styles.logoImage} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
