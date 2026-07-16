import RibaAnimation from "./RibaAnimation";
import { ConsultancyContent } from "./content";

export default function RibaSection({ content }: { content: ConsultancyContent }) {
  return (
    <section className="bimc-riba">
      <div className="bimc-container bimc-riba-head">
        <div className="bimc-eyebrow bimc-riba-eyebrow">{content.riba.eyebrow}</div>
        <h2>{content.riba.title}</h2>
        <p>{content.riba.text}</p>
      </div>
      <RibaAnimation stages={content.riba.stages} />
    </section>
  );
}
