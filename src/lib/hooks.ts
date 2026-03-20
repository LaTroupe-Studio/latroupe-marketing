"use client";

import { useState, useEffect } from "react";

/**
 * Hook that creates a typing/deleting animation cycling through words.
 *
 * @param words       - Array of words to cycle through
 * @param typingSpeed - Milliseconds per character when typing
 * @param deleteSpeed - Milliseconds per character when deleting
 * @param pauseMs     - Milliseconds to pause after typing a complete word
 */
export function useTypingAnimation(
  words: string[],
  typingSpeed = 80,
  deleteSpeed = 50,
  pauseMs = 2000
): string {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (text.length < currentWord.length) {
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pauseMs);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length - 1));
        }, deleteSpeed);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deleteSpeed, pauseMs]);

  return text;
}

/**
 * Hook that tracks whether a scroll threshold has been passed.
 * Returns true when scrolled past the given element.
 */
export function useStickyHeader(
  elementRef: React.RefObject<HTMLElement | null>
): boolean {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const bottom = elementRef.current.getBoundingClientRect().bottom;
        setIsSticky(bottom <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [elementRef]);

  return isSticky;
}
