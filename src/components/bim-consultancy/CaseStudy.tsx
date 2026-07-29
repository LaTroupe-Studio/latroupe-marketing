import { withBasePath } from "@/lib/paths";
import { ParenMark } from "./Wordmark";
import { ConsultancyContent } from "./content";

/** Renders **bold** spans from the content strings. */
function RichText({ text }: { text: string }) {
  const parts = text.split("**");
  return (
    <>
      {parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}
    </>
  );
}

export default function CaseStudy({ content }: { content: ConsultancyContent }) {
  const cs = content.caseStudy;
  return (
    <section className="bimc-case" data-header-dark="">
      <div className="bimc-case-hero">
        <img
          src={withBasePath("/images/bim-consultancy/lego-southbank.jpg")}
          alt={cs.imageAlt}
          width={1920}
          height={1234}
          loading="lazy"
          decoding="async"
        />
        <div className="bimc-case-hero-shade" />
        <div className="bimc-case-credit">{cs.imageCredit}</div>
        <div className="bimc-container bimc-case-hero-inner">
          <div className="bimc-eyebrow bimc-case-eyebrow">{cs.eyebrow}</div>
          <h2>{cs.title}</h2>
          <div className="bimc-case-facts">
            {cs.facts.map((f) => (
              <div key={f.label}>
                <div className="bimc-case-fact-label">{f.label}</div>
                <div className="bimc-case-fact-value">{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bimc-container bimc-case-body">
        <div className="bimc-case-intro">
          <p className="bimc-case-copy">{cs.intro}</p>
          <div className="bimc-case-standards">
            <div className="bimc-case-standards-label">{cs.standardsLabel}</div>
            <div className="bimc-case-standards-list">{cs.standardsList}</div>
          </div>
        </div>

        <h3>{cs.whatWeDid}</h3>
        <div className="bimc-case-cols">
          <div>
            <div className="bimc-case-col-label">{cs.managementLabel}</div>
            <div className="bimc-case-col">
              {cs.management.map((item, i) => (
                <p key={i}>
                  <RichText text={item} />
                </p>
              ))}
            </div>
          </div>
          <div>
            <div className="bimc-case-col-label">{cs.modellingLabel}</div>
            <div className="bimc-case-col bimc-case-col--list">
              {cs.modelling.map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="bimc-case-result">
          <ParenMark className="bimc-case-result-paren" />
          <div style={{ width: "100%" }}>
            <div className="bimc-case-result-label">{cs.resultLabel}</div>
            <p>{cs.result}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
