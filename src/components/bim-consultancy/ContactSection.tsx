import ConsultancyForm from "./ConsultancyForm";
import { ConsultancyContent } from "./content";

export default function ContactSection({ content }: { content: ConsultancyContent }) {
  return (
    <section id="contact" className="bimc-contact">
      <div className="bimc-container bimc-contact-inner">
        <div>
          <h2>{content.contact.title}</h2>
          <p className="bimc-contact-text">{content.contact.text}</p>
        </div>
        <ConsultancyForm content={content.contact} variant="big" />
      </div>
    </section>
  );
}
