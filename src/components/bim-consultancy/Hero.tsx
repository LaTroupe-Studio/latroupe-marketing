import { ParenMark } from "./Wordmark";
import { ConsultancyContent } from "./content";

export default function Hero({ content }: { content: ConsultancyContent }) {
  return (
    <section className="bimc-hero">
      <svg
        className="bimc-hero-scroll"
        width="30"
        height="18"
        viewBox="0 0 30 18"
        fill="none"
        stroke="#AC6752"
        strokeWidth="1.5"
        strokeLinecap="square"
        aria-hidden="true"
      >
        <polyline points="2,3 15,15 28,3" />
      </svg>
      <div className="bimc-container bimc-hero-inner">
        <div className="bimc-hero-copy">
          <h1>{content.hero.title}</h1>
          <p>{content.hero.text}</p>
          <div className="bimc-hero-actions">
            <a href="#contact" className="bimc-cta bimc-hero-cta">
              {content.hero.cta}
            </a>
            <span className="bimc-hero-note">{content.hero.note}</span>
          </div>
        </div>
        <ParenMark className="bimc-hero-paren" />
      </div>
    </section>
  );
}
