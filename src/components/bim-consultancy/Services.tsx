import { serviceIcons } from "./ServiceIcons";
import { ConsultancyContent } from "./content";

export default function Services({ content }: { content: ConsultancyContent }) {
  return (
    <section className="bimc-services">
      <div className="bimc-container bimc-services-inner">
        <div className="bimc-svc-grid">
          <div className="bimc-svc-head">
            <div className="bimc-eyebrow bimc-svc-head-eyebrow">{content.services.eyebrow}</div>
            <h2>{content.services.title}</h2>
            <p>{content.services.subtitle}</p>
          </div>
          {content.services.items.map((item, i) => {
            const Icon = serviceIcons[i];
            return (
              <div key={item.title} className="bimc-svc-card">
                {Icon && <Icon />}
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
