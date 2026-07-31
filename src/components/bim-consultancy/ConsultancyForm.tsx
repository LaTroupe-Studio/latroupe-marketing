"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ConsultancyContent } from "./content";
import { trackLeadConversion } from "@/lib/analytics";

interface ConsultancyFormProps {
  content: ConsultancyContent["contact"];
  variant: "popover" | "big";
  onSent?: () => void;
}

/**
 * The "[ field ]" contact form used twice on the landing: inside the header
 * popover and in the closing contact section. Posts to the same endpoint as
 * the main site contact form (NEXT_PUBLIC_CONTACT_URL).
 */
export default function ConsultancyForm({ content, variant, onSent }: ConsultancyFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", project: "", more: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const endpoint = process.env.NEXT_PUBLIC_CONTACT_URL?.trim();
    if (!endpoint) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
      return;
    }
    setStatus("sending");
    try {
      // Include the question label with each answer so the email body shows
      // which answer corresponds to which question, instead of raw pasted text.
      // Only name and email are required, but the endpoint rejects an empty
      // message — so fall back to a placeholder instead of failing the submit.
      const answeredFields = [
        { label: content.fields.project.label, value: form.project.trim() },
        { label: content.fields.more.label, value: form.more.trim() },
      ].filter((f) => f.value);
      const details = answeredFields.map((f) => `${f.label}\n${f.value}`).join("\n\n");

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: details || content.noDetails,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (!res.ok || !data?.ok) throw new Error("submit failed");
      setStatus("sent");
      trackLeadConversion();
      setForm({ name: "", email: "", project: "", more: "" });
      onSent?.();
      router.push(content.thanksHref);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const btnLabel =
    status === "sending"
      ? content.sending
      : status === "sent"
        ? content.sent
        : status === "error"
          ? content.error
          : content.submit;

  const fields = [
    { key: "name" as const, type: "text", ...content.fields.name },
    { key: "email" as const, type: "email", ...content.fields.email },
    { key: "project" as const, type: "text", ...content.fields.project },
    { key: "more" as const, type: "text", ...content.fields.more },
  ];

  return (
    <form className={`bimc-form bimc-form--${variant === "big" ? "big" : "pop"}`} onSubmit={handleSubmit}>
      {fields.map((f) => (
        <div key={f.key}>
          <label className="bimc-field-label" htmlFor={`bimc-${variant}-${f.key}`}>
            {f.label}
          </label>
          <div className="bimc-field-row">
            <span className="bimc-bracket">[</span>
            <input
              id={`bimc-${variant}-${f.key}`}
              className="bimc-input"
              type={f.type}
              placeholder={f.placeholder}
              value={form[f.key]}
              required={f.key === "name" || f.key === "email"}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
            />
            <span className="bimc-bracket">]</span>
          </div>
        </div>
      ))}
      <button type="submit" className="bimc-cta bimc-form-submit" disabled={status === "sending"}>
        {btnLabel}
      </button>
      <p className="bimc-form-legal">
        {content.privacyPre}
        <Link href={content.privacyHref}>{content.privacyLink}</Link>
        {content.privacyPost}
        {variant === "big" && content.privacyExtra}
      </p>
    </form>
  );
}
