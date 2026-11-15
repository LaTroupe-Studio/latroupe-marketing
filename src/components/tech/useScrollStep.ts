"use client";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Scroll-driven steps, like the home page's methodology section: the band
 * pins while you scroll through a tall track and the step follows how far
 * you are into it.
 *
 * Below 769px there is no pin (the list and the screen don't fit one phone
 * screen); the step then only changes when a feature is tapped.
 */
export function useScrollStep(frames: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 769px)");
    const sync = () => setPinned(mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !pinned) return;
    const onScroll = () => {
      const span = Math.max(1, track.offsetHeight - window.innerHeight);
      const y = Math.min(span, Math.max(0, -track.getBoundingClientRect().top));
      const idx = Math.min(frames - 1, Math.floor((y / span) * frames));
      setStep((prev) => (prev === idx ? prev : idx));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [frames, pinned]);

  /** Go to a frame: scroll to its slice of the track, or just switch on phones. */
  const goTo = useCallback(
    (to: number) => {
      const track = trackRef.current;
      if (!track || !pinned) return setStep(to);
      const span = Math.max(1, track.offsetHeight - window.innerHeight);
      const top = track.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + ((to + 0.5) / frames) * span, behavior: "smooth" });
    },
    [frames, pinned],
  );

  return { trackRef, step, pinned, goTo };
}
