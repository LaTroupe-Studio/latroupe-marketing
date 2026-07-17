import { withBasePath } from "@/lib/paths";
import { ConsultancyContent } from "./content";

const logos = [
  { src: "/images/logos/accor.svg", alt: "Accor" },
  { src: "/images/logos/aena.svg", alt: "Aena" },
  { src: "/images/logos/amazon.svg", alt: "Amazon" },
  { src: "/images/logos/hyatt.svg", alt: "Hyatt" },
  { src: "/images/logos/marriott.svg", alt: "Marriott" },
  { src: "/images/logos/m-gallery.svg", alt: "M Gallery" },
  { src: "/images/logos/lego.svg", alt: "LEGO" },
  { src: "/images/logos/bdg.svg", alt: "BDG" },
  { src: "/images/logos/joan-lao.svg", alt: "Joan Lao" },
  { src: "/images/logos/modus-operandi.svg", alt: "Modus Operandi" },
];

export default function TrustBand({ content }: { content: ConsultancyContent }) {
  return (
    <section className="bimc-trust">
      <div className="bimc-container bimc-trust-inner">
        <div className="bimc-eyebrow bimc-trust-eyebrow">{content.trust.eyebrow}</div>
        <div className="bimc-marquee-mask">
          <div className="bimc-marquee">
            {logos.map((l) => (
              <img key={l.alt} src={withBasePath(l.src)} alt={l.alt} />
            ))}
            {/* Duplicated track so the -50% marquee loop is seamless. */}
            {logos.map((l) => (
              <img key={`${l.alt}-dup`} src={withBasePath(l.src)} alt="" aria-hidden="true" />
            ))}
          </div>
        </div>
        <p className="bimc-trust-note">{content.trust.text}</p>
      </div>
    </section>
  );
}
