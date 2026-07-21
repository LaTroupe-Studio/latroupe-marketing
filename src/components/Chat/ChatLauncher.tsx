"use client";

import { useState } from "react";
import { trackChatEvent } from "@/lib/chat/analytics";
import ChatWidget from "./ChatWidget";
import styles from "./ChatWidget.module.css";

export default function ChatLauncher() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    if (next) trackChatEvent("chat_open");
  };

  return (
    <>
      {isOpen && <ChatWidget onClose={() => setIsOpen(false)} />}
      <button className={styles.launcherBtn} onClick={toggle} aria-label="Chat">
        {isOpen ? "×" : "chat"}
      </button>
    </>
  );
}
