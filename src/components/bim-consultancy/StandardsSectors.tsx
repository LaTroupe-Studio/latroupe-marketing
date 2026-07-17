import { ConsultancyContent } from "./content";

export default function StandardsSectors({ content }: { content: ConsultancyContent }) {
  const { standards } = content;
  return (
    <section className="bimc-standards" data-header-dark="">
      <div className="bimc-container bimc-standards-inner">
        <div className="bimc-eyebrow bimc-standards-eyebrow">{standards.eyebrow}</div>
        <h2>{standards.title}</h2>
        <div className="bimc-standards-grid">
          {standards.items.map((item) => (
            <div key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <div className="bimc-sectors">
          <div aria-hidden="true" className="bimc-sectors-rule" />
          <div className="bimc-eyebrow bimc-standards-eyebrow">{standards.sectorsEyebrow}</div>
          <h2>{standards.sectorsTitle}</h2>
          <div className="bimc-sectors-chips">
            {standards.sectors.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <p className="bimc-sectors-note">{standards.sectorsNote}</p>
        </div>
      </div>
    </section>
  );
}
