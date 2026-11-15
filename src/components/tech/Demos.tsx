"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import LogoText from "../LogoText";
import type { Callout, Screen, SpectoDemoCopy } from "./content";
import { useDemoStep } from "./useDemoStep";
import styles from "./Tech.module.css";

/**
 * Product visuals for the tech page.
 *
 * - ScreenPlayer: real specbook captures cross-faded behind the hero.
 * - ShotStage: real captures (specbook, design tracker) in a browser frame,
 *   with notes pinned to the features they describe.
 * - SpectoApp: [specto] has no captures yet, so its screen is rebuilt at the
 *   real app's size (1200×750) with the same chrome as the captures, then
 *   scaled to fit. Example data only.
 */

export function BrowserFrame({ path, children }: { path: string; children: React.ReactNode }) {
  return (
    <div className={styles.browser}>
      <div className={styles.browserBar}>
        <span className={styles.browserDots} aria-hidden="true"><i /><i /><i /></span>
        <span className={styles.browserUrl}>latroupeapps.com / {path}</span>
      </div>
      <div className={styles.browserBody}>{children}</div>
    </div>
  );
}

/** Pins with floating notes, positioned in % of the screen underneath. */
function Notes({ callouts, id }: { callouts: Callout[]; id: string | number }) {
  return (
    <>
      {callouts.map((c, i) => (
        <div
          key={`${id}-${i}`}
          className={styles.note}
          data-side={c.x < 50 ? "right" : "left"}
          style={{ left: `${c.x}%`, top: `${c.y}%`, animationDelay: `${0.25 + i * 0.35}s` }}
        >
          <span className={styles.pin} aria-hidden="true" />
          <div className={styles.noteCard}>
            <strong>{c.title}</strong>
            <span>{c.text}</span>
          </div>
        </div>
      ))}
    </>
  );
}

/** On phones the floating notes don't fit: list them under the frame. */
function NotesList({ callouts }: { callouts: Callout[] }) {
  return (
    <ul className={styles.notesList}>
      {callouts.map((c) => (
        <li key={c.title}><strong>{c.title}</strong> {c.text}</li>
      ))}
    </ul>
  );
}

/* ─── Hero backdrop ─────────────────────────────────────────────────── */
export function ScreenPlayer({
  screens, ms = 3600, className,
}: {
  screens: { src: string; label: string }[];
  ms?: number;
  className?: string;
}) {
  const [ref, step] = useDemoStep(screens.length, ms);
  return (
    <div ref={ref} className={`${styles.player} ${className ?? ""}`}>
      <span className={`${styles.brk} ${styles.brkTl}`} />
      <span className={`${styles.brk} ${styles.brkTr}`} />
      <span className={`${styles.brk} ${styles.brkBl}`} />
      <span className={`${styles.brk} ${styles.brkBr}`} />
      <div className={styles.screen}>
        {screens.map((s, i) => (
          <Image
            key={s.src}
            src={s.src}
            alt=""
            width={2400}
            height={1500}
            // Already-small WebP captures: served as they are and loaded up front,
            // so a pinned frame never shows empty while an optimised copy is made.
            unoptimized
            loading="eager"
            sizes="60vw"
            className={styles.shot}
            data-on={i === step}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Real captures in a frame ──────────────────────────────────────── */
export function ShotStage({ screens, step }: { screens: Screen[]; step: number }) {
  const current = screens[step] ?? screens[0];
  return (
    <>
      <BrowserFrame path={current.path}>
        <div className={styles.showScreen}>
          {screens.map((s, i) => (
            <Image
              key={s.src}
              src={s.src}
              alt={s.tab}
              width={2400}
              height={1500}
              unoptimized
              loading="eager"
              sizes="(max-width: 768px) 100vw, 70vw"
              className={styles.shot}
              data-on={i === step}
            />
          ))}
          <Notes callouts={current.callouts} id={step} />
        </div>
      </BrowserFrame>
      <NotesList callouts={current.callouts} />
    </>
  );
}

/* ─── [specto], rebuilt ─────────────────────────────────────────────── */
const CANVAS_W = 1200;

/** Renders children at 1200×750 and scales them to the available width. */
function AppCanvas({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(0.5);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setK(e.contentRect.width / CANVAS_W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className={styles.canvasBox}>
      <div className={styles.canvas} style={{ transform: `scale(${k})` }}>{children}</div>
    </div>
  );
}

/** Frames 0–1 extract rules, 2–3 run the checks, 4 is the signed report. */
export const SPECTO_FRAMES = 5;

export function SpectoApp({ c, step }: { c: SpectoDemoCopy; step: number }) {
  const tab = step < 2 ? 0 : step < 4 ? 1 : 2;
  const visibleRules = step === 0 ? 3 : c.rules.length;
  const done = step === 2 ? 2 : c.checks.length;
  const total = c.checks.reduce((a, ch) => a + ch.count, 0);
  const failed = c.checks.reduce((a, ch) => a + ch.issues, 0);
  const pct = Math.round(((total - failed) / total) * 100);
  const note = c.notes[tab];

  return (
    <>
      <BrowserFrame path={`specto / ${c.tabs[tab]}`}>
        <div className={styles.showScreen}>
          <AppCanvas>
            <div className={styles.app}>
              <header className={styles.appTop}>
                <LogoText color="#AC6752" className={styles.appLogo} />
                <span className={styles.appCrumb}>
                  {c.crumb} <i>/</i> <b>[specto]</b> <i>/</i> Grand Hotel Riverside
                </span>
                <span className={styles.appLang}><b>ES</b> EN</span>
              </header>

              <div className={styles.appBody}>
                <div className={styles.appTitleRow}>
                  <div>
                    <h3 className={styles.appTitle}>Grand Hotel Riverside</h3>
                    <span className={styles.appDoc}>{c.doc}</span>
                  </div>
                  <span className={styles.appBtn}>{c.validate}</span>
                </div>

                <nav className={styles.appTabs}>
                  {c.tabs.map((t, i) => <span key={t} data-on={i === tab}>{t}</span>)}
                </nav>

                {tab === 0 && (
                  <div className={styles.appCard}>
                    <div className={`${styles.appRow} ${styles.appHead} ${styles.rulesRow}`}>
                      {c.cols.rules.map((h) => <span key={h}>{h}</span>)}
                    </div>
                    {c.rules.slice(0, visibleRules).map((r, i) => (
                      <div key={r.id} className={`${styles.appRow} ${styles.rulesRow}`} data-new={step === 0 && i === visibleRules - 1}>
                        <span className={styles.appId}>{r.id}</span>
                        <span>{r.text}</span>
                        <span><em className={styles.appTag}>{r.cat}</em></span>
                        <span className={styles.appMuted}>{r.page}</span>
                      </div>
                    ))}
                    {step === 0 && <div className={styles.appExtract}>{c.extracting}…</div>}
                  </div>
                )}

                {tab === 1 && (
                  <div className={styles.appCard}>
                    <div className={styles.appSummary}>
                      <b>{step === 3 ? `${pct} %` : "…"}</b> {c.compliance}
                    </div>
                    <div className={`${styles.appRow} ${styles.appHead} ${styles.checksRow}`}>
                      {c.cols.checks.map((h) => <span key={h}>{h}</span>)}
                    </div>
                    {c.checks.map((ch, i) => {
                      const state = i < done ? "done" : i === done ? "run" : "wait";
                      return (
                        <div key={ch.label} className={`${styles.appRow} ${styles.checksRow}`}>
                          <span>{ch.label}</span>
                          <span className={styles.appMuted}>{ch.count}</span>
                          <span>
                            <em className={styles.appPill} data-state={state === "done" ? (ch.issues ? "issue" : "ok") : state}>
                              {state === "done" ? (ch.issues ? c.issues(ch.issues) : c.ok) : state === "run" ? c.checking : c.waiting}
                            </em>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {tab === 2 && (
                  <div className={`${styles.appCard} ${styles.appReport}`}>
                    <div>
                      <span className={styles.appMuted}>{c.report.meta}</span>
                      <h4>{c.report.title}</h4>
                      <ul>
                        {c.checks.map((ch) => (
                          <li key={ch.label}>
                            <span>{ch.label}</span>
                            <em className={styles.appPill} data-state={ch.issues ? "issue" : "ok"}>
                              {ch.issues ? c.issues(ch.issues) : `${ch.count} ${c.ok}`}
                            </em>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.appStamp}>
                      <b>{pct} %</b>
                      <span>{c.report.signed}</span>
                      <code>sha-256 4f7b9e2a 8c1d6f33 a92b4e7c</code>
                    </div>
                  </div>
                )}
              </div>

              <footer className={styles.appStatus}>
                <span>● {c.agent} <i>v0.12.4</i> <i>GHR_Interiors_Central.rvt</i></span>
                <span>{c.connect}</span>
              </footer>
            </div>
          </AppCanvas>
          <Notes callouts={[note]} id={tab} />
        </div>
      </BrowserFrame>
      <NotesList callouts={[note]} />
    </>
  );
}
