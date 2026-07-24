"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useContent } from "@/lib/locale-context";
import { getChatContent, getChatPage } from "@/lib/chat/content";
import { trackChatEvent } from "@/lib/chat/analytics";
import LeadMiniForm from "./LeadMiniForm";
import styles from "./ChatWidget.module.css";

interface DisplayMessage {
  role: "user" | "assistant";
  text: string;
  options?: string[];
}

interface HistoryEntry {
  role: "user" | "assistant";
  content: string;
}

interface StoredChat {
  locale: string;
  display: DisplayMessage[];
  history: HistoryEntry[];
}

const STORAGE_KEY = "lt_chat_v1";

export default function ChatWidget({ onClose }: { onClose: () => void }) {
  const { locale } = useContent();
  const pathname = usePathname();
  const page = getChatPage(pathname);
  const content = getChatContent(locale);

  const [display, setDisplay] = useState<DisplayMessage[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const stored = JSON.parse(raw) as StoredChat;
        if (stored.locale === locale && stored.display?.length) {
          setDisplay(stored.display);
          setHistory(stored.history ?? []);
          return;
        }
      } catch {
        // ignore corrupt storage
      }
    }
    setDisplay([{ role: "assistant", text: content.welcome[page], options: content.initialOptions[page] }]);
    setHistory([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  useEffect(() => {
    if (!display.length) return;
    const stored: StoredChat = { locale, display, history };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  }, [display, history, locale]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [display, isTyping, showLeadForm]);

  const send = async (text: string, fromOption: boolean) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    setDisplay((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setIsTyping(true);
    trackChatEvent(fromOption ? "chat_option_click" : "chat_message_sent", { page });

    const endpoint = process.env.NEXT_PUBLIC_CHAT_URL?.trim();
    if (!endpoint) {
      setDisplay((prev) => [
        ...prev,
        { role: "assistant", text: content.errorMessage, options: content.initialOptions[page] },
      ]);
      setIsTyping(false);
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history, locale, pagePath: pathname }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        reply: string;
        options: string[];
        shouldOpenLeadForm: boolean;
      };

      setDisplay((prev) => [...prev, { role: "assistant", text: data.reply, options: data.options }]);
      setHistory((prev) => [
        ...prev,
        { role: "user", content: trimmed },
        { role: "assistant", content: data.reply },
      ]);

      if (data.shouldOpenLeadForm) {
        setShowLeadForm(true);
        trackChatEvent("chat_lead_form_open", { page });
      }
    } catch {
      setDisplay((prev) => [
        ...prev,
        { role: "assistant", text: content.errorMessage, options: content.initialOptions[page] },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const lastOptions = !showLeadForm ? display[display.length - 1]?.options : undefined;

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.headerTitle}>Latty · latroupe()</span>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close chat">
          ×
        </button>
      </div>

      <div className={styles.messages}>
        {display.map((m, i) => (
          <div
            key={i}
            className={`${styles.bubble} ${m.role === "user" ? styles.bubbleUser : styles.bubbleAssistant}`}
          >
            {m.text}
          </div>
        ))}
        {isTyping && <div className={styles.typing}>{content.typingLabel}</div>}
        <div ref={messagesEndRef} />
      </div>

      {lastOptions && lastOptions.length > 0 && (
        <div className={styles.options}>
          {lastOptions.map((opt) => (
            <button key={opt} className={styles.optionBtn} onClick={() => send(opt, true)}>
              {opt}
            </button>
          ))}
        </div>
      )}

      {showLeadForm ? (
        <LeadMiniForm
          content={content.leadForm}
          history={history}
          onBack={() => setShowLeadForm(false)}
          onSent={() => setShowLeadForm(false)}
        />
      ) : (
        <form
          className={styles.inputRow}
          onSubmit={(e) => {
            e.preventDefault();
            send(input, false);
          }}
        >
          <input
            className={styles.input}
            placeholder={content.placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className={styles.sendBtn} disabled={!input.trim() || isTyping}>
            {content.send}
          </button>
        </form>
      )}
    </div>
  );
}
