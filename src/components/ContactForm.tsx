"use client";
import { useState, Fragment, FormEvent } from "react";
import Link from "next/link";
import { useContent } from "@/lib/locale-context";
import { trackLeadConversion } from "@/lib/analytics";
import styles from "./ContactForm.module.css";

const EMPTY = { name: "", surname: "", email: "", organization: "", reason: "", product: "", message: "" };

/**
 * `defaultReason` preselects the "why" dropdown, e.g. "product" on the tech
 * page so visitors land straight on the product choice.
 */
export default function ContactForm({ defaultReason = "" }: { defaultReason?: string }) {
  const initial = { ...EMPTY, reason: defaultReason };
  const { content, locale } = useContent();
  const contact = content.contact;
  const { fields } = contact;
  const [form, setForm] = useState(initial);
  const [accepted, setAccepted] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");

  const set = (key: keyof typeof EMPTY) =>
    (e: { target: { value: string } }) => setForm({ ...form, [key]: e.target.value });

  const isProduct = form.reason === "product";
  const labelOf = (list: { value: string; label: string }[], value: string) =>
    list.find((o) => o.value === value)?.label ?? value;

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

    // The endpoint (lambda/contact) only takes name, email and message, so the
    // extra answers travel inside the message, labelled for whoever reads the
    // email. The marketing line keeps the proof of consent: when it was given
    // and the exact wording the person saw (RGPD art. 7.1).
    const reason = labelOf(contact.reasons, form.reason);
    const lines = [
      `Motivo: ${isProduct ? `${reason} · ${labelOf(contact.products, form.product)}` : reason}`,
      `Empresa: ${form.organization.trim() || "(no indicada)"}`,
      "",
      form.message.trim() || "(sin mensaje)",
      "",
      "---",
      marketing
        ? `Comunicaciones comerciales: SÍ. Aceptadas el ${new Date().toISOString()} (web /${locale}) con el texto: «${contact.marketing}»`
        : "Comunicaciones comerciales: no",
    ];

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.name.trim()} ${form.surname.trim()}`,
          email: form.email.trim(),
          message: lines.join("\n"),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (!res.ok || !data?.ok) throw new Error("submit failed");
      setStatus("sent");
      trackLeadConversion();
      setForm(initial);
      setAccepted(false);
      setMarketing(false);
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const btnLabel =
    status === "sending"
      ? fields.sending
      : status === "sent"
        ? fields.sent
        : status === "error"
          ? fields.error
          : fields.submit;

  const withPrivacyLink = (text: string) =>
    contact.legalLinkPhrase && contact.legalLinkHref
      ? text.split(contact.legalLinkPhrase).map((part, i, arr) =>
          <Fragment key={i}>
            {part}
            {i < arr.length - 1 && (
              <Link href={contact.legalLinkHref!} className={styles.legalLink}>{contact.legalLinkPhrase}</Link>
            )}
          </Fragment>
        )
      : text;

  return (
    <section id="contacto" className={styles.section} data-bg-color="#ECE6E3" data-text-color="#77330B">
      <div className="grid-container">
        <div className={`grid-12 ${styles.grid}`}>

          {/* Headline + intro, left column */}
          <div className={styles.intro}>
            <h2 className={styles.headline}>{contact.headline}</h2>
            <p className={styles.introText}>{contact.intro}</p>
          </div>

          {/* Form, right column */}
          <form className={styles.form} onSubmit={handleSubmit} data-clarity-mask="True">
            <div className={styles.row}>
              <div>
                <label className={styles.label} htmlFor="contact-name">{fields.name}</label>
                <input id="contact-name" type="text" required autoComplete="given-name"
                  placeholder={fields.namePlaceholder}
                  value={form.name} onChange={set("name")} className={styles.input} />
              </div>
              <div>
                <label className={styles.label} htmlFor="contact-surname">{fields.surname}</label>
                <input id="contact-surname" type="text" required autoComplete="family-name"
                  placeholder={fields.surnamePlaceholder}
                  value={form.surname} onChange={set("surname")} className={styles.input} />
              </div>
            </div>
            <div className={styles.row}>
              <div>
                <label className={styles.label} htmlFor="contact-email">{fields.email}</label>
                <input id="contact-email" type="email" required autoComplete="email"
                  placeholder={fields.emailPlaceholder}
                  value={form.email} onChange={set("email")} className={styles.input} />
              </div>
              <div>
                <label className={styles.label} htmlFor="contact-organization">{fields.organization}</label>
                <input id="contact-organization" type="text" autoComplete="organization"
                  placeholder={fields.organizationPlaceholder}
                  value={form.organization} onChange={set("organization")} className={styles.input} />
              </div>
            </div>
            {/* The product dropdown only shows up when the reason is one of our products */}
            <div className={isProduct ? styles.row : undefined}>
              <div>
                <label className={styles.label} htmlFor="contact-reason">{fields.reason}</label>
                <select id="contact-reason" required value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value, product: "" })}
                  className={`${styles.input} ${styles.select}`} data-empty={!form.reason}>
                  <option value="" disabled>{fields.selectPlaceholder}</option>
                  {contact.reasons.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              {isProduct && (
                <div>
                  <label className={styles.label} htmlFor="contact-product">{fields.product}</label>
                  <select id="contact-product" required value={form.product} onChange={set("product")}
                    className={`${styles.input} ${styles.select}`} data-empty={!form.product}>
                    <option value="" disabled>{fields.selectPlaceholder}</option>
                    {contact.products.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              )}
            </div>
            <div>
              <label className={styles.label} htmlFor="contact-message">{fields.company}</label>
              <textarea id="contact-message" rows={1} placeholder={fields.message} value={form.message}
                onChange={set("message")} className={`${styles.input} ${styles.textarea}`} />
            </div>
            {/* Consents: privacy (needed to reply) and marketing (optional, unticked) */}
            <div className={styles.consents}>
              {contact.legal && (
                <label className={styles.legalRow}>
                  <input type="checkbox" required checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className={styles.checkbox} />
                  <span className={styles.legalText}>{withPrivacyLink(contact.legal)}</span>
                </label>
              )}
              <label className={styles.legalRow}>
                <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className={styles.checkbox} />
                <span className={styles.legalText}>{contact.marketing}</span>
              </label>
            </div>
            <button type="submit" className={styles.submitBtn} disabled={status==="sending" || !accepted}>
              {btnLabel}
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}
