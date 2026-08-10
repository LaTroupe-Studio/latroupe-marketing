"use client";
import { useState, Fragment, FormEvent } from "react";
import Link from "next/link";
import { useContent } from "@/lib/locale-context";
import { trackLeadConversion } from "@/lib/analytics";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const { content } = useContent();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [accepted, setAccepted] = useState(false);
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!accepted) return;
    const endpoint = process.env.NEXT_PUBLIC_CONTACT_URL?.trim();
    if (!endpoint) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (!res.ok || !data?.ok) throw new Error("submit failed");
      setStatus("sent");
      trackLeadConversion();
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const { fields } = content.contact;
  const btnLabel =
    status === "sending"
      ? fields.sending
      : status === "sent"
        ? fields.sent
        : status === "error"
          ? fields.error
          : fields.submit;

  return (
    <section id="contacto" className={styles.section} data-bg-color="#ECE6E3" data-text-color="#77330B">
      <div className="grid-container">
        <div className={`grid-12 ${styles.grid}`}>

          {/* Headline + intro, left column */}
          <div className={styles.intro}>
            <h2 className={styles.headline}>{content.contact.headline}</h2>
            <p className={styles.introText}>{content.contact.intro}</p>
          </div>

          {/* Form, right column — top-aligned with the intro paragraph */}
          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className={styles.label} htmlFor="contact-name">{fields.name}</label>
              <div className={styles.field}>
                <span className={styles.bracket} aria-hidden="true">[</span>
                <input id="contact-name" type="text" placeholder={fields.namePlaceholder} value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})} className={styles.input} />
                <span className={styles.bracket} aria-hidden="true">]</span>
              </div>
            </div>
            {/* Email */}
            <div>
              <label className={styles.label} htmlFor="contact-email">{fields.email}</label>
              <div className={styles.field}>
                <span className={styles.bracket} aria-hidden="true">[</span>
                <input id="contact-email" type="email" placeholder={fields.emailPlaceholder} value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})} className={styles.input} />
                <span className={styles.bracket} aria-hidden="true">]</span>
              </div>
            </div>
            {/* Message */}
            <div>
              <label className={styles.label} htmlFor="contact-message">{fields.company}</label>
              <div className={`${styles.field} ${styles.fieldMultiline}`}>
                <span className={styles.bracket} aria-hidden="true">[</span>
                <textarea id="contact-message" rows={1} placeholder={fields.message} value={form.message}
                  onChange={(e) => setForm({...form, message: e.target.value})} className={`${styles.input} ${styles.textarea}`} />
                <span className={styles.bracket} aria-hidden="true">]</span>
              </div>
            </div>
            {/* Legal */}
            {content.contact.legal && (
              <label className={styles.legalRow}>
                <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className={styles.checkbox} />
                <span className={styles.legalText}>
                  {content.contact.legalLinkPhrase && content.contact.legalLinkHref
                    ? content.contact.legal!.split(content.contact.legalLinkPhrase).map((part, i, arr) =>
                        <Fragment key={i}>
                          {part}
                          {i < arr.length - 1 && (
                            <Link href={content.contact.legalLinkHref!} className={styles.legalLink}>{content.contact.legalLinkPhrase}</Link>
                          )}
                        </Fragment>
                      )
                    : content.contact.legal
                  }
                </span>
              </label>
            )}
            <button type="submit" className={styles.submitBtn} disabled={status==="sending" || !accepted}>
              {btnLabel}
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}
