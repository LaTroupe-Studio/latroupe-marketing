import { ConsultancyContent } from "./content";

export default function WhatYouGet({ content }: { content: ConsultancyContent }) {
  return (
    <section className="bimc-wyg">
      <div className="bimc-container bimc-wyg-inner">
        <div className="bimc-eyebrow bimc-wyg-eyebrow">{content.deliverables.eyebrow}</div>
        <h2>{content.deliverables.title}</h2>
        <div className="bimc-wyg-grid">
          {content.deliverables.items.map((item, i) => (
            <div key={item.title} className="bimc-wyg-item">
              <div className="bimc-wyg-num">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
