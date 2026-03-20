"use client";
import { useState, FormEvent } from "react";
import { useContent } from "@/lib/locale-context";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const { content } = useContent();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle"|"sending"|"sent">("idle");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = async (e?: FormEvent) => {
      if (e) e.preventDefault();
      setStatus("sending");
      await new Promise((r) => setTimeout(r, 1000));
      setStatus("sent");
      setForm({ name:"", email:"", message:"" });
      setAcceptedTerms(false);
      setTimeout(() => setStatus("idle"), 3000);
   };

  const { fields } = content.contact;
  const btnLabel = status === "sending" ? fields.sending : status === "sent" ? fields.sent : fields.submit;

  return (
    <section id="contacto" className={styles.section}>
      <div className="grid-container">
        {/* Headline */}
        <div className={`grid-12 ${styles.headRow}`}>
          <h2 className={styles.headline}>{content.contact.headline}</h2>
        </div>

        {/* Name */}
        <div className={`grid-12 ${styles.fieldRow}`}>
          <label className={styles.label}>{fields.name}</label>
          <input type="text" placeholder={fields.name} value={form.name}
            onChange={(e) => setForm({...form, name: e.target.value})} className={`${styles.input} ${styles.oneLineIinput}`} />
        </div>

        {/* Email */}
        <div className={`grid-12 ${styles.fieldRow}`}>
          <label className={styles.label}>{fields.email}</label>
          <input type="email" placeholder={fields.email} value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})} className={`${styles.input} ${styles.oneLineIinput}`} />
        </div>

        {/* Message */}
        <div className={`grid-12 ${styles.fieldRow}`}>
          <label className={styles.label}>{fields.message}</label>
          <textarea placeholder={fields.message} value={form.message}
            onChange={(e) => setForm({...form, message: e.target.value})} className={`${styles.input} ${styles.textarea}`} />
        </div>

        {/* Legal + Submit */}
        <div className={`grid-12 ${styles.actionRow}`}>
          {content.contact.legal && (
            <div className={styles.legalWrapper}>
              <input
                  type="checkbox"
                  id="legalPolicy"
                  className={styles.checkbox}
                  checked={acceptedTerms} /* <-- Vinculamos el estado */
                  onChange={(e) => setAcceptedTerms(e.target.checked)} /* <-- Actualizamos el estado */
                  required
                />
              <label htmlFor="legalPolicy" className={styles.legalText}>
                {content.contact.legal}
              </label>
            </div>
          )}
          <button type="submit" disabled={status === "sending" || !acceptedTerms} className={styles.submitBtn} onClick={handleSubmit}>
            {btnLabel}
          </button>
        </div>
      </div>
    </section>
  );
}