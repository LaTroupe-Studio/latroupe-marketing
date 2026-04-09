"use client";
import Link from "next/link";
import { useContent } from "@/lib/locale-context";
import Logo from "./Logo";
import styles from "./LegalPage.module.css";

interface Props { title: string; content: string; }

export default function LegalPage({ title, content }: Props) {
  const { locale } = useContent();
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="grid-container">
          <Link href={`/${locale}`} className={styles.logoLink}>
            <Logo color="var(--color-terracota-3)" width={130} />
          </Link>
        </div>
      </header>
      <main className={styles.main}>
        <div className="grid-container">
          <div className="grid-12">
            <div className={styles.contentCol}>
              <h1 className={styles.title}>{title}</h1>
              {content.split("\n\n").map((paragraph, i) => (
                <p key={i} className={styles.paragraph}>{paragraph}</p>
              ))}
              <Link href={`/${locale}`} className={styles.backLink}>
                ← {locale === "es" ? "Volver al inicio" : "Back to home"}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
