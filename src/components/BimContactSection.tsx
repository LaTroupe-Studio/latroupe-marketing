"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { useContent } from "@/lib/locale-context";
import styles from "./BimContactSection.module.css";

export default function BimContactSection() {
  const { content } = useContent();
  const { headline, sub, fields, legal, legalLinkPhrase, legalLinkHref } = content.bim.ctaSection;
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    const endpoint = process.env.NEXT_PUBLIC_CONTACT_URL?.trim();
    if (!endpoint) { setStatus("error"); setTimeout(() => setStatus("idle"), 5000); return; }
    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (!res.ok || !data?.ok) throw new Error("submit failed");
      setStatus("sent");
      setForm({ name: "", email: "", project: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const btnLabel =
    status === "sending" ? fields.sending :
    status === "sent" ? fields.sent :
    status === "error" ? fields.error :
    fields.submit;

  const legalParts = legal.split(legalLinkPhrase);
  const [headlineFirst, headlineSecond] = headline.replace(/\.$/, "").split(" ");

  return (
    <section id="contacto" className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.intro}>
          <h2 className={styles.headline}>{headlineFirst}<br />{headlineSecond}.</h2>
          <p className={styles.sub}>{sub}</p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>{fields.whoLabel}</label>
            <div className={styles.bracketRow}>
              <span className={styles.bracket}>[</span>
              <input
                className={styles.input}
                type="text"
                placeholder={fields.namePlaceholder}
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
              <span className={styles.bracket}>]</span>
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>{fields.reachLabel}</label>
            <div className={styles.bracketRow}>
              <span className={styles.bracket}>[</span>
              <input
                className={styles.input}
                type="email"
                placeholder={fields.emailPlaceholder}
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />
              <span className={styles.bracket}>]</span>
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>{fields.projectLabel}</label>
            <div className={styles.bracketRow}>
              <span className={styles.bracket}>[</span>
              <input
                className={styles.input}
                type="text"
                placeholder={fields.projectPlaceholder}
                value={form.project}
                onChange={e => setForm(f => ({ ...f, project: e.target.value }))}
              />
              <span className={styles.bracket}>]</span>
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>{fields.moreLabel}</label>
            <div className={styles.bracketRow}>
              <span className={styles.bracket}>[</span>
              <input
                className={styles.input}
                type="text"
                placeholder={fields.morePlaceholder}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              />
              <span className={styles.bracket}>]</span>
            </div>
          </div>
          <button type="submit" className={styles.submit} disabled={status === "sending"}>
            {btnLabel}
          </button>
          <p className={styles.legalText}>
            {legalParts[0]}
            <Link href={legalLinkHref} className={styles.legalLink} target="_blank" rel="noopener">{legalLinkPhrase}</Link>
            {legalParts[1]}
          </p>
        </form>
      </div>
    </section>
  );
}
