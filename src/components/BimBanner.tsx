"use client";
import { useContent } from "@/lib/locale-context";
import styles from "./BimBanner.module.css";

export default function BimBanner({ onCta }: { onCta?: (id: string) => void }) {
  const { content } = useContent();
  const banner = content.bim.banner;

  const handleCta = () => {
    if (onCta) onCta(banner.cta.id);
    else document.getElementById(banner.cta.id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.section} data-bg-color="#AC6752" data-text-color="#ECE6E3">
      <div className="grid-container">
        <div className={`grid-12 ${styles.row}`}>
          <div className={styles.inner}>
            <h2 className={styles.text}>{banner.text}</h2>
            <p className={styles.sub}>{banner.sub}</p>
            <button className={styles.cta} onClick={handleCta}>{banner.cta.label}</button>
          </div>
        </div>
      </div>
    </section>
  );
}
