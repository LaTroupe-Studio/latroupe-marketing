"use client";
import { useEffect, useRef, useState } from "react";
import Wordmark from "./Wordmark";
import ConsultancyForm from "./ConsultancyForm";
import { ConsultancyContent } from "./content";

/**
 * Fixed transparent header with the "let's talk" popover form.
 * While it overlaps any section marked with [data-header-dark] it switches
 * to its light colourway (bimc-header--dark).
 */
export default function ConsultancyHeader({ content }: { content: ConsultancyContent }) {
  const [formOpen, setFormOpen] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const darks = Array.from(document.querySelectorAll("[data-header-dark]"));
    const onScroll = () => {
      const probe = header.getBoundingClientRect().height * 0.5;
      setOverDark(
        darks.some((s) => {
          const r = s.getBoundingClientRect();
          return r.top <= probe && r.bottom >= probe;
        })
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!formOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFormOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [formOpen]);

  return (
    <header ref={headerRef} className={`bimc-header${overDark ? " bimc-header--dark" : ""}`}>
      <div className="bimc-container bimc-header-row">
        <Wordmark className="bimc-header-logo" />
        <button type="button" className="bimc-cta bimc-header-cta" onClick={() => setFormOpen((o) => !o)}>
          {content.header.cta}
        </button>
      </div>
      {formOpen && (
        <>
          <button
            type="button"
            className="bimc-form-overlay"
            aria-label={content.header.closeLabel}
            onClick={() => setFormOpen(false)}
          />
          <div className="bimc-form-pop">
            <div className="bimc-form-pop-head">
              <button
                type="button"
                className="bimc-form-close"
                aria-label={content.header.closeLabel}
                onClick={() => setFormOpen(false)}
              >
                ×
              </button>
            </div>
            <ConsultancyForm content={content.contact} variant="popover" onSent={() => setFormOpen(false)} />
          </div>
        </>
      )}
    </header>
  );
}
