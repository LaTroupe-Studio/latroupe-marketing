"use client";
import { useContent } from "@/lib/locale-context";
import { withBasePath } from "@/lib/paths";
import styles from "./TrustLogos.module.css";

export default function TrustLogos() {
  const { content } = useContent();
  // The track is the list twice over so the -50% keyframe loops seamlessly.
  // The second pass is decorative, so it is hidden from assistive tech.
  const { logos } = content.trust;

  return (
    <section id="trust-section" className={styles.section} data-bg-color="#DED1C9" data-text-color="#77330B">
      <div className="grid-container">
        <p className={styles.eyebrow}>{content.trust.headline}</p>
        <div className={styles.carouselWrapper}>
          <div className={styles.carousel}>
            {[0, 1].map((pass) =>
              logos.map((logo) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={`${pass}-${logo.name}`}
                  src={withBasePath(logo.src)}
                  alt={pass === 0 ? logo.name : ""}
                  aria-hidden={pass === 1 || undefined}
                  className={styles.logoImage}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
