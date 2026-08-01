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
      {/* Headline */}
      <div className="grid-container">
        <div className="grid-12">
          <h2 className={styles.headline}>{content.contact.headline}</h2>
        </div>
      </div>
      {/* Separator */}
      <div className={styles.separator} />
      {/* Form on grid */}
      <div className="grid-container">
        {/* Name */}
        <div className={`grid-12 ${styles.fieldRow}`}>
          <label className={styles.label}>{fields.name}</label>
          <input type="text" placeholder={fields.name} value={form.name}
            onChange={(e) => setForm({...form, name: e.target.value})} className={styles.input} />
        </div>
        {/* Email */}
        <div className={`grid-12 ${styles.fieldRow}`}>
          <label className={styles.label}>{fields.email}</label>
          <input type="email" placeholder={fields.email} value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})} className={styles.input} />
        </div>
        {/* Message */}
        <div className={`grid-12 ${styles.fieldRow}`}>
          <label className={styles.label}>{fields.company}</label>
          <textarea placeholder={fields.message} value={form.message}
            onChange={(e) => setForm({...form, message: e.target.value})} className={`${styles.input} ${styles.textarea}`} />
        </div>
        {/* Legal + Submit */}
        <div className={`grid-12 ${styles.actionRow}`}>
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
          <button type="button" className={styles.submitBtn} disabled={status==="sending" || !accepted} onClick={handleSubmit}>
            {btnLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
