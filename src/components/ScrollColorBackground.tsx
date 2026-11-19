"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollColorBackground() {
  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>("[data-bg-color]");
    if (sections.length === 0) return;

    const body = document.body;
    const header = document.querySelector<HTMLElement>("header");

    // --page-bg mirrors the body colour so the header can take it on phones,
    // where it is too tall to float transparent over the content.
    const initialBg = sections[0].dataset.bgColor;
    const initialText = sections[0].dataset.textColor;
    if (initialBg) gsap.set(body, { backgroundColor: initialBg, "--page-bg": initialBg });
    if (initialText && header) gsap.set(header, { color: initialText });

    const timelines = sections.slice(1).map((section) => {
      const bgColor = section.dataset.bgColor;
      const textColor = section.dataset.textColor;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 55%", end: "top 45%", scrub: true },
        defaults: { ease: "none", immediateRender: false },
      });
      if (bgColor) tl.to(body, { backgroundColor: bgColor, "--page-bg": bgColor }, 0);
      if (textColor && header) tl.to(header, { color: textColor }, 0);
      return tl;
    });

    return () => {
      timelines.forEach((tl) => {
        tl.scrollTrigger?.kill();
        tl.kill();
      });
    };
  }, []);

  return null;
}
