"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Drives an animated mock-up through `steps` frames while it is on screen.
 *
 * The state starts on the LAST frame, so the server render, a thumbnail and
 * anyone who asked for reduced motion all see the finished screen. The loop
 * only starts once the demo scrolls into view and pauses when it leaves.
 */
export function useDemoStep(steps: number, ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(steps - 1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: number | undefined;
    const stop = () => {
      if (timer !== undefined) window.clearInterval(timer);
      timer = undefined;
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && timer === undefined) {
          setStep(0);
          timer = window.setInterval(() => setStep((s) => (s + 1) % steps), ms);
        } else if (!entry.isIntersecting) {
          stop();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      stop();
    };
  }, [steps, ms]);

  // Jumping to a frame (a click on a feature) restarts the loop from there.
  const jump = (to: number) => setStep(((to % steps) + steps) % steps);

  return [ref, step, jump] as const;
}
