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

        <div className={`grid-12 ${styles.logoRow}`}>
          <div className={styles.logoWrapper}>
             <Link href={`/${locale}`}>
               <Logo color="var(--color-terracota-3)" width={160} />
             </Link>
          </div>
        </div>

        <div className={`grid-12 ${styles.middleRow}`}>
          <a className={styles.workFooter} href={content.footer.work.href}>
            {content.footer.work.label}
          </a>

          <div className={styles.socialCol}>
            {content.footer.social?.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className={`grid-12 ${styles.bottomRow}`}>
          <span className={styles.copyright}>{content.footer.copyright}</span>
          <div className={styles.legalLinks}>
            {content.footer.links.map((l) => (
              <Link key={l.label} href={l.href} className={styles.legalLink}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}