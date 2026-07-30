"use client";
import { useState } from "react";
import { ConsultancyContent } from "./content";

export default function Faqs({ content }: { content: ConsultancyContent }) {
  const [open, setOpen] = useState(-1);

  return (
    <section id="faqs" className="bimc-faqs">
      <div className="bimc-container bimc-faqs-inner">
        <h2>{content.faqs.title}</h2>
        <div className="bimc-faqs-list">
          {content.faqs.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={`bimc-faq${isOpen ? " bimc-faq--open" : ""}`}>
                <button
                  type="button"
                  className="bimc-faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span>{item.q}</span>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    stroke="#AC6752"
                    strokeWidth="1"
                    strokeLinecap="square"
                    aria-hidden="true"
                  >
                    <line x1="3" y1="11" x2="19" y2="11" />
                    <line x1="11" y1="3" x2="11" y2="19" style={{ opacity: isOpen ? 0 : 1 }} />
                  </svg>
                </button>
                <div className="bimc-faq-a">
                  <div className="bimc-faq-a-clip">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
