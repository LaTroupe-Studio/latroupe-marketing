import Link from "next/link";
import Wordmark from "./Wordmark";
import { ConsultancyContent } from "./content";

const socials = [
  { label: "Linkedin", href: "https://www.linkedin.com/company/latroupestudio/" },
  { label: "Instagram", href: "https://www.instagram.com/latroupestudio" },
  { label: "Pinterest", href: "https://www.pinterest.es/latroupestudio/" },
];

export default function ConsultancyFooter({ content }: { content: ConsultancyContent }) {
  return (
    <footer>
      <div className="bimc-container bimc-footer-inner">
        <div className="bimc-footer-brand">
          <Wordmark className="bimc-footer-logo" />
          <div className="bimc-footer-credit">{content.footer.credit}</div>
        </div>
        <div className="bimc-footer-work">
          <a href={content.footer.workWithUs.href} target="_blank" rel="noopener noreferrer">
            {content.footer.workWithUs.label}
          </a>
        </div>
        <div className="bimc-footer-links">
          <div className="bimc-footer-social">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </div>
          <div className="bimc-footer-legal">
            {content.footer.legal.map((l) => (
              <Link key={l.label} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
