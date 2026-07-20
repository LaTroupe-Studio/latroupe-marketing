"use client";
import { useEffect, useRef, useState, FormEvent } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { useContent } from "@/lib/locale-context";
import styles from "./BimHeader.module.css";

export default function BimHeader() {
  const { content } = useContent();
  const nav = content.bim.nav;
  const popup = content.bim.header.popup;
  const headerRef = useRef<HTMLElement>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [overDark, setOverDark] = useState(false);

  useEffect(() => {
    if (!formOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setFormOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [formOpen]);

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

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    const endpoint = process.env.NEXT_PUBLIC_CONTACT_URL?.trim();
    if (!endpoint) { setStatus("error"); setTimeout(() => setStatus("idle"), 5000); return; }
    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "bim-header-popup" }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (!res.ok || !data?.ok) throw new Error("submit failed");
      setStatus("sent");
      setForm({ name: "", email: "", project: "", message: "" });
      setTimeout(() => { setStatus("idle"); setFormOpen(false); }, 1500);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const legalParts = popup.legal.split(popup.legalLinkPhrase);
  const submitLabel =
    status === "sending" ? "…" :
    status === "sent" ? "✓" :
    status === "error" ? "!" :
    popup.submit;

  return (
    <header ref={headerRef} className={`${styles.header}${overDark ? ` ${styles.headerDark}` : ""}`}>
      <div className={styles.bar}>
        <Link href={nav.home.id} className={styles.logoButton} aria-label="latroupe">
          <Logo color="currentColor" width={140} />
        </Link>
        <div className={styles.right}>
          <button type="button" className={styles.cta} onClick={() => setFormOpen((v) => !v)}>
            {nav.contact.label}
          </button>
        </div>
      </div>

      {formOpen && (
        <>
          <div className={styles.backdrop} onClick={() => setFormOpen(false)} />
          <div className={styles.formPop}>
            <div className={styles.formPopHead}>
              <button type="button" onClick={() => setFormOpen(false)} aria-label={popup.closeAriaLabel} className={styles.closeBtn}>×</button>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label className={styles.label}>{popup.whoLabel}</label>
                <div className={styles.bracketRow}>
                  <span className={styles.bracket}>[</span>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder={popup.namePlaceholder}
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                  />
                  <span className={styles.bracket}>]</span>
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>{popup.reachLabel}</label>
                <div className={styles.bracketRow}>
                  <span className={styles.bracket}>[</span>
                  <input
                    className={styles.input}
                    type="email"
                    placeholder={popup.emailPlaceholder}
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    required
                  />
                  <span className={styles.bracket}>]</span>
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>{popup.projectLabel}</label>
                <div className={styles.bracketRow}>
                  <span className={styles.bracket}>[</span>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder={popup.projectPlaceholder}
                    value={form.project}
                    onChange={(e) => setForm((f) => ({ ...f, project: e.target.value }))}
                  />
                  <span className={styles.bracket}>]</span>
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>{popup.moreLabel}</label>
                <div className={styles.bracketRow}>
                  <span className={styles.bracket}>[</span>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder={popup.morePlaceholder}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  />
                  <span className={styles.bracket}>]</span>
                </div>
              </div>
              <button type="submit" className={styles.submit} disabled={status === "sending"}>
                {submitLabel}
              </button>
              <p className={styles.legalText}>
                {legalParts[0]}
                <Link href={popup.legalLinkHref} className={styles.legalLink} target="_blank" rel="noopener">{popup.legalLinkPhrase}</Link>
                {legalParts[1]}
              </p>
            </form>
          </div>
        </>
      )}
    </header>
  );
}
