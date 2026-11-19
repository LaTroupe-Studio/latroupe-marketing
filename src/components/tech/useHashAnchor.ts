"use client";
import { useEffect } from "react";

/**
 * Lands on the section named in the URL hash (/tech#procurement) once the page
 * has settled.
 *
 * The browser jumps to the anchor as soon as the page renders, but the tool
 * bands pin right after mounting and grow several screens taller (see
 * useScrollStep), so that first jump falls short: a link to procurement ended
 * on design tracker. Here the anchor is re-aligned every time the page height
 * changes during the first moments, and left alone as soon as the visitor
 * scrolls on their own.
 */
export function useHashAnchor() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;

    const align = () => {
      const target = document.getElementById(id);
      if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY, behavior: "instant" });
    };

    const observer = new ResizeObserver(align);
    observer.observe(document.body);
    const stop = () => {
      observer.disconnect();
      window.clearTimeout(timer);
      for (const e of USER_SCROLL) window.removeEventListener(e, stop);
    };
    const timer = window.setTimeout(stop, 2500);
    for (const e of USER_SCROLL) window.addEventListener(e, stop, { passive: true });
    align();
    return stop;
  }, []);
}

/** Inputs that mean the visitor is scrolling by hand, so we stop steering. */
const USER_SCROLL = ["wheel", "touchstart", "keydown", "mousedown"] as const;
