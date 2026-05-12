"use client";
import { useTypingAnimation } from "@/lib/hooks";
import { useContent } from "@/lib/locale-context";
import LogoText from "./LogoText";
import styles from "./Hero.module.css";

export default function Hero() {
  const { content } = useContent();
  const typedWord = useTypingAnimation(content.hero.rotatingWords);
  return (
    <section className={styles.hero} data-bg-color="#ECE6E3" data-text-color="#77330B">
      <div className="grid-container">
        <div className={`grid-12 ${styles.content}`}>
          <div className={styles.claimCol}>
            <h1 className={styles.heading}>
              <span className={styles.line1}><LogoText color="#452515" className={styles.logoAsText} /></span>
              <span className={styles.lineIndented}>
                {"( "}<span className={styles.rotatingWord}>{typedWord}<span className={styles.cursor} /></span>{" )"}
              </span>
              <span className={styles.lineIndented}>{content.hero.suffix}</span>
            </h1>
          </div>
          <div className={styles.descCol}>
            <p className={styles.description}>{content.hero.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
