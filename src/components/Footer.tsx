"use client";
import Link from "next/link";
import { useContent } from "@/lib/locale-context";
import Logo from "./Logo";
import styles from "./Footer.module.css";

export default function Footer() {
  const { content, locale } = useContent();
  return (
    <footer className={styles.footer}>
      <div className="grid-container">
        {/* Top row: logo + work with us | social links */}
        <div className={`grid-12 ${styles.topRow}`}>
          <div className={styles.leftCol}>
            <Link href={`/${locale}`}><Logo color="var(--color-terracota-3)" width={160} /></Link>
            {content.footer.workWithUs && (
              <a href={content.footer.workWithUs.href} target="_blank" rel="noopener noreferrer" className={styles.workWithUs}>
                {content.footer.workWithUs.label}
              </a>
            )}
          </div>
          <div className={styles.socialCol}>
            {content.footer.social?.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>{s.label}</a>
            ))}
          </div>
        </div>
        {/* Bottom row: copyright | legal links */}
        <div className={`grid-12 ${styles.bottomRow}`}>
          <span className={styles.copyright}>{content.footer.copyright}</span>
          <div className={styles.legalLinks}>
            {content.footer.links.map((l) => (
              <Link key={l.label} href={l.href} className={styles.legalLink}>{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
