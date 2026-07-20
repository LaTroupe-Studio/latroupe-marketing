import { RefObject, useEffect } from "react";

const FINAL_ALPHA = 0.16;
const REVEAL_MS = 1100;
const ACCENT = { r: 0xac, g: 0x67, b: 0x52 };

export function useGridReveal(sectionRef: RefObject<HTMLElement | null>, canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let done = false;
    let raf = 0;

    const fit = () => {
      const r = section.getBoundingClientRect();
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (done) drawFrame(1);
    };

    const collect = () => {
      const cr = canvas.getBoundingClientRect();
      const pad = 14;
      const xs = new Set<number>();
      const ys = new Set<number>();
      section.querySelectorAll<HTMLElement>("[data-grid-anchor]").forEach((el) => {
        const r = el.getBoundingClientRect();
        const x = r.left - cr.left, y = r.top - cr.top;
        xs.add(Math.round(x - pad)); xs.add(Math.round(x + r.width + pad));
        ys.add(Math.round(y - pad)); ys.add(Math.round(y + r.height + pad));
      });
      section.querySelectorAll<HTMLElement>("[data-grid-h]").forEach((el) => {
        const r = el.getBoundingClientRect();
        const y = r.top - cr.top;
        ys.add(Math.round(y - pad)); ys.add(Math.round(y + r.height + pad));
      });
      section.querySelectorAll<HTMLElement>("[data-grid-top]").forEach((el) => {
        const r = el.getBoundingClientRect();
        ys.add(Math.round(r.top - cr.top - pad));
      });
      return { xs: Array.from(xs), ys: Array.from(ys) };
    };

    const drawFrame = (p: number) => {
      const w = canvas.width / dpr, h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);
      const ease = p >= 1 ? 1 : 1 - Math.pow(1 - p, 3);
      ctx.strokeStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${FINAL_ALPHA * ease})`;
      ctx.lineWidth = 1;
      const { xs, ys } = collect();
      xs.forEach((x) => { x += 0.5; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h * ease); ctx.stroke(); });
      ys.forEach((y) => { y += 0.5; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w * ease, y); ctx.stroke(); });
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(section);

    let io: IntersectionObserver | null = null;
    const runAll = () => {
      const t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - t0) / REVEAL_MS, 1);
        drawFrame(p);
        if (p < 1) raf = requestAnimationFrame(step);
        else done = true;
      };
      raf = requestAnimationFrame(step);
    };

    if (window.IntersectionObserver) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            io?.disconnect();
            runAll();
          }
        });
      }, { threshold: 0.25 });
      io.observe(section);
    } else {
      runAll();
    }

    return () => {
      ro.disconnect();
      io?.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [sectionRef, canvasRef]);
}
