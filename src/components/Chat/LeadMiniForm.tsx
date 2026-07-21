"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { ChatContent } from "@/lib/chat/content";
import { trackChatEvent } from "@/lib/chat/analytics";
import { trackLeadConversion } from "@/lib/analytics";
import styles from "./ChatWidget.module.css";

interface ChatHistoryEntry {
  role: "user" | "assistant";
  content: string;
}

export default function LeadMiniForm({
  content,
  history,
  onBack,
  onSent,
}: {
  content: ChatContent["leadForm"];
  history: ChatHistoryEntry[];
  onBack: () => void;
  onSent: () => void;
}) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [accepted, setAccepted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!accepted || !form.name || !form.email || !form.message) return;

    const endpoint = process.env.NEXT_PUBLIC_CONTACT_URL?.trim();
    if (!endpoint) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "chat", transcript: history }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (!res.ok || !data?.ok) throw new Error("submit failed");
      setStatus("sent");
      trackChatEvent("chat_lead_form_submit");
      trackLeadConversion();
      setTimeout(onSent, 1600);
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return <p className={styles.leadFormTitle}>{content.thankYou}</p>;
  }

  return (
    <form className={styles.leadForm} onSubmit={handleSubmit}>
      <button type="button" className={styles.leadFormBack} onClick={onBack}>
        ← {content.title}
      </button>
      <input
        className={styles.input}
        placeholder={content.name}
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className={styles.input}
        type="email"
        placeholder={content.email}
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <textarea
        className={styles.input}
        placeholder={content.messagePlaceholder}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      <label className={styles.legalRow}>
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
        />
        <span className={styles.legalText}>
          {content.legal.split(content.legalLinkPhrase).map((part, i, arr) =>
            i < arr.length - 1 ? (
              <span key={i}>
                {part}
                <Link href={content.legalLinkHref} className={styles.legalLink}>
                  {content.legalLinkPhrase}
                </Link>
              </span>
            ) : (
              part
            ),
          )}
        </span>
      </label>
      <button
        type="submit"
        className={styles.sendBtn}
        disabled={status === "sending" || !accepted || !form.name || !form.email || !form.message}
      >
        {status === "sending" ? content.sending : status === "error" ? content.error : content.submit}
      </button>
    </form>
  );
}
