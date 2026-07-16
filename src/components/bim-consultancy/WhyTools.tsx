"use client";
import { useEffect, useRef } from "react";
import { withBasePath } from "@/lib/paths";
import { ConsultancyContent } from "./content";

/**
 * "Why latroupe" + "Our tools" sections. Both draw a shared blueprint-style
 * canvas grid whose lines are anchored to the content ([data-grid-anchor],
 * [data-grid-h], [data-grid-top]) and reveal once when scrolled into view.
 * The tools canvas continues the vertical guides of the why section, as if
 * the grid were one sheet spanning both.
 */
export default function WhyTools({ content }: { content: ConsultancyContent }) {
  const whyRef = useRef<HTMLElement>(null);
  const whyCanvasRef = useRef<HTMLCanvasElement>(null);
  const toolsRef = useRef<HTMLElement>(null);
  const toolsCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    type Grid = { drawFrame: (p: number) => void; ro?: ResizeObserver };
    const grids: Grid[] = [];
    const cleanups: (() => void)[] = [];
    let raf = 0;
    let started = false;
    let done = false;

    const initGrid = (
      section: HTMLElement | null,
      canvas: HTMLCanvasElement | null,
      linkFrom?: HTMLElement | null
    ) => {
      if (!section || !canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const FINAL_ALPHA = 0.16;

      const collect = () => {
        const cr = canvas.getBoundingClientRect();
        const pad = 14;
        const xs: Record<number, 1> = {};
        const ys: Record<number, 1> = {};
        section.querySelectorAll("[data-grid-anchor]").forEach((el) => {
          const r = el.getBoundingClientRect();
          const x = r.left - cr.left;
          const y = r.top - cr.top;
          xs[Math.round(x - pad)] = 1;
          xs[Math.round(x + r.width + pad)] = 1;
          ys[Math.round(y - pad)] = 1;
          ys[Math.round(y + r.height + pad)] = 1;
        });
        section.querySelectorAll("[data-grid-h]").forEach((el) => {
          const r = el.getBoundingClientRect();
          const y = r.top - cr.top;
          ys[Math.round(y - pad)] = 1;
          ys[Math.round(y + r.height + pad)] = 1;
        });
        section.querySelectorAll("[data-grid-top]").forEach((el) => {
          const r = el.getBoundingClientRect();
          const y = r.top - cr.top;
          ys[Math.round(y - pad)] = 1;
        });
        if (linkFrom) {
          linkFrom.querySelectorAll("[data-grid-anchor]").forEach((el) => {
            const r = el.getBoundingClientRect();
            const x = r.left - cr.left;
            xs[Math.round(x - pad)] = 1;
            xs[Math.round(x + r.width + pad)] = 1;
          });
        }
        return { xs: Object.keys(xs).map(Number), ys: Object.keys(ys).map(Number) };
      };

      const drawFrame = (p: number) => {
        const w = canvas.width / dpr;
        const h = canvas.height / dpr;
        ctx.clearRect(0, 0, w, h);
        const ease = p >= 1 ? 1 : 1 - Math.pow(1 - p, 3);
        ctx.strokeStyle = `rgba(172,103,82,${FINAL_ALPHA * ease})`;
        ctx.lineWidth = 1;
        const { xs, ys } = collect();
        xs.forEach((x0) => {
          const x = x0 + 0.5;
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h * ease);
          ctx.stroke();
        });
        ys.forEach((y0) => {
          const y = y0 + 0.5;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w * ease, y);
          ctx.stroke();
        });
      };

      const fit = () => {
        const r = section.getBoundingClientRect();
        canvas.width = Math.round(r.width * dpr);
        canvas.height = Math.round(r.height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        if (done) drawFrame(1);
      };

      const grid: Grid = { drawFrame };
      grids.push(grid);
      fit();
      if (typeof ResizeObserver !== "undefined") {
        grid.ro = new ResizeObserver(fit);
        grid.ro.observe(section);
        cleanups.push(() => grid.ro?.disconnect());
      } else {
        window.addEventListener("resize", fit);
        cleanups.push(() => window.removeEventListener("resize", fit));
      }
    };

    initGrid(whyRef.current, whyCanvasRef.current);
    initGrid(toolsRef.current, toolsCanvasRef.current, whyRef.current);

    // One shared reveal drives both canvases in sync; triggered once.
    const REVEAL = 1300;
    const runAll = () => {
      const t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - t0) / REVEAL, 1);
        grids.forEach((g) => g.drawFrame(p));
        if (p < 1) raf = requestAnimationFrame(step);
        else done = true;
      };
      raf = requestAnimationFrame(step);
    };

    const trigger = whyRef.current || toolsRef.current;
    let io: IntersectionObserver | undefined;
    if (trigger && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting && !started) {
              started = true;
              io?.disconnect();
              runAll();
            }
          });
        },
        { threshold: 0.25 }
      );
      io.observe(trigger);
    } else {
      started = true;
      runAll();
    }

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <>
      <section ref={whyRef} className="bimc-why" data-header-dark="">
        <canvas ref={whyCanvasRef} aria-hidden="true" className="bimc-grid-canvas" />
        <div className="bimc-container bimc-why-inner">
          <div className="bimc-eyebrow bimc-why-eyebrow">{content.why.eyebrow}</div>
          <h2 data-grid-h="">{content.why.title}</h2>
          <div className="bimc-why-grid">
            {content.why.items.map((item) => (
              <div key={item.title} data-grid-anchor="">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={toolsRef} className="bimc-tools">
        <canvas ref={toolsCanvasRef} aria-hidden="true" className="bimc-grid-canvas" />
        <div className="bimc-container bimc-tools-inner">
          <div className="bimc-tools-head" data-grid-h="">
            <div className="bimc-eyebrow bimc-tools-eyebrow">{content.tools.eyebrow}</div>
            <h2>{content.tools.title}</h2>
            <p data-grid-top="">{content.tools.text}</p>
          </div>
          <div className="bimc-tools-grid">
            {content.tools.items.map((tool) => (
              <div key={tool.name} className="bimc-tool" data-grid-anchor="">
                <div className="bimc-tool-img">
                  <img src={withBasePath(tool.img)} alt={tool.name} />
                </div>
                <div>
                  <h3>
                    <span>[</span>
                    {tool.name}
                    <span>]</span>
                  </h3>
                  <div className="bimc-tool-tag">{tool.tag}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
