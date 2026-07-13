"use client";
import { useContent } from "@/lib/locale-context";
import LogoText from "./LogoText";
import styles from "./BimHero.module.css";

export default function BimHero({ onCta }: { onCta?: (id: string) => void }) {
  const { content } = useContent();
  const hero = content.bim.hero;

  const handleCta = () => {
    if (onCta) onCta(hero.cta.id);
    else document.getElementById(hero.cta.id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.hero} data-bg-color="#ECE6E3" data-text-color="#77330B">
      <div className="grid-container">
        <div className={`grid-12 ${styles.content}`}>
          <div className={styles.claimCol}>
            <h1 className={styles.heading}>
              <span className={styles.line1}><LogoText color="#452515" className={styles.logoAsText} /></span>
              <span className={styles.lineIndented}>
                {"( "}<span className={styles.word}>{hero.word}</span>{" )"}
              </span>
              <span className={styles.lineIndented}>{hero.suffix}</span>
            </h1>
          </div>
          <div className={styles.descCol}>
            <p className={styles.description}>{hero.description}</p>
            <button className={styles.cta} onClick={handleCta}>{hero.cta.label}</button>
          </div>
        </div>
      </div>
    </section>
  );
}
