import Link from "next/link";
import Wordmark from "./Wordmark";
import ConsultancyFooter from "./ConsultancyFooter";
import { ConsultancyContent } from "./content";

/**
 * Confirmation page the landing form redirects to after a successful submit.
 * It doubles as the Google Ads conversion destination, so it lives on its own
 * URL and reuses the landing's styles (no header popover, no FAQ block).
 */
export default function ThankYou({
  content,
  landingHref,
}: {
  content: ConsultancyContent;
  landingHref: string;
}) {
  return (
    <main className="bimc-root">
      <div className="bimc-container bimc-thanks-bar">
        <Link href={landingHref} aria-label="latroupe">
          <Wordmark className="bimc-header-logo" />
        </Link>
      </div>
      <section className="bimc-thanks">
        <div className="bimc-container bimc-thanks-inner">
          <p className="bimc-eyebrow bimc-thanks-eyebrow">{content.thanks.eyebrow}</p>
          <h1 className="bimc-thanks-title">{content.thanks.title}</h1>
          <p className="bimc-thanks-text">{content.thanks.text}</p>
          <Link href={landingHref} className="bimc-cta bimc-thanks-cta">
            {content.thanks.back}
          </Link>
        </div>
      </section>
      <ConsultancyFooter content={content} />
    </main>
  );
}
