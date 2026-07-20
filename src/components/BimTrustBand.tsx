"use client";
import { useContent } from "@/lib/locale-context";
import { withBasePath } from "@/lib/paths";
import styles from "./BimTrustBand.module.css";

export default function BimTrustBand() {
  const { content } = useContent();
  const { trustBand } = content.bim;
  const colorLogos = content.trust.logos.map((logo) => ({
    ...logo,
    src: logo.src.replace("/blanco/", "/").replace("-blanco.svg", ".svg"),
  }));
  const logos = [...colorLogos, ...colorLogos];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>{trustBand.eyebrow}</span>
        <div className={styles.carouselWrapper}>
          <div className={styles.carousel}>
            {logos.map((logo, i) => (
              <span
                key={`${logo.name}-${i}`}
                role="img"
                aria-label={i < colorLogos.length ? logo.name : undefined}
                aria-hidden={i >= colorLogos.length}
                className={styles.logoImage}
                style={{ WebkitMaskImage: `url(${withBasePath(logo.src)})`, maskImage: `url(${withBasePath(logo.src)})` }}
              />
            ))}
          </div>
        </div>
        <p className={styles.tagline}>{trustBand.tagline}</p>
      </div>
    </section>
  );
}
