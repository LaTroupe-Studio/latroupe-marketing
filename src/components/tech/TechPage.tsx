"use client";
import Image from "next/image";
import { useTypingAnimation } from "@/lib/hooks";
import { useContent } from "@/lib/locale-context";
import LogoText from "../LogoText";
import Logo from "../Logo";
import heroStyles from "../Hero.module.css";
import { Feature, getTechContent } from "./content";
import { BrowserFrame, ScreenPlayer, ShotStage, SpectoApp, SPECTO_FRAMES } from "./Demos";
import { useScrollStep } from "./useScrollStep";
import styles from "./Tech.module.css";

/**
 * Body of the latroupe(tech) page. The header, contact form and footer are the
 * site's own and are placed by the route.
 *
 * Layout borrows from how Stripe shows product: each tool has a feature list
 * that drives a real screen beside it, with notes pinned to its features. Colours stay in the tech palette (browns and beiges)
 * and are animated by ScrollColorBackground like the home page.
 */

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function TechHero() {
  const { locale } = useContent();
  const t = getTechContent(locale).hero;
  const typedWord = useTypingAnimation(t.rotatingWords);
  return (
    <section className={`${heroStyles.hero} ${styles.hero}`} data-bg-color="#28170E" data-text-color="#ECE6E3">
      {/* A working product screen sits behind the claim, dimmed so the type reads. */}
      <div className={styles.heroBackdrop} aria-hidden="true">
        <ScreenPlayer screens={t.screens} className={styles.heroPlayer} />
      </div>

      <div className={`grid-container ${styles.heroInner}`}>
        <div className={`grid-12 ${heroStyles.content}`}>
          <div className={heroStyles.claimCol}>
            <h1 className={`${heroStyles.heading} ${styles.heroHeading}`}>
              {/* "latroupe" is the wordmark; "tech" is set in the same size beside it. */}
              <span className={styles.logoRow}>
                <LogoText color="#ECE6E3" className={`${heroStyles.logoLine} ${styles.logoMark}`} />
                <span>tech</span>
              </span>
              <span className={heroStyles.wordLine}>
                {"( "}
                <span className={`${heroStyles.rotatingWord} ${styles.word}`}>
                  {typedWord}
                  <span className={`${heroStyles.cursor} ${styles.cursor}`} />
                </span>
                {" )"}
              </span>
              <span className={heroStyles.line}>{t.suffix}</span>
            </h1>
            <p className={styles.heroDesc}>{t.description}</p>
            <div className={styles.ctaRow}>
              <button type="button" className={styles.btn} onClick={() => scrollTo("contacto")}>
                {t.demo}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Where a band's heading sits on the grid, so sections don't all start on column 2. */
type Align = "left" | "right" | "mid";

function Head({ tool, align = "left" }: { tool: { eyebrow: string; headline: string; intro: string }; align?: Align }) {
  return (
    <div className={`grid-12 ${styles.head}`} data-align={align}>
      <p className={styles.eyebrow}>{tool.eyebrow}</p>
      <h2 className={styles.headline}>{tool.headline}</h2>
      <p className={styles.intro}>{tool.intro}</p>
    </div>
  );
}

function DemoLink({ label }: { label: string }) {
  return (
    <button type="button" className={styles.btn} onClick={() => scrollTo("contacto")}>
      {label}
    </button>
  );
}

/**
 * Feature list on one side, the screen it drives on the other. Scrolling
 * through the band walks the frames (the band stays pinned meanwhile);
 * clicking a feature jumps to it.
 */
function FeatureBand({
  id, tool, features, frames, bg, fg, flip, cta, render, ruled = true, align = "left",
}: {
  id: string;
  tool: { eyebrow: string; headline: string; intro: string };
  features: Feature[];
  frames: number;
  bg: string; fg: string;
  flip?: boolean;
  cta: string;
  render: (step: number) => React.ReactNode;
  /** Hairline on top, to separate it from a band of the same colour. */
  ruled?: boolean;
  align?: Align;
}) {
  const { trackRef, step, pinned, goTo } = useScrollStep(frames);
  const active = features.reduce((a, f, i) => (f.from <= step ? i : a), 0);
  return (
    <section
      id={id}
      className={`${styles.band} ${ruled ? styles.ruled : ""}`}
      data-bg-color={bg}
      data-text-color={fg}
      // Buttons fill with the band's text colour on hover and invert their text.
      style={{ color: fg, "--btn-ink": fg, "--btn-ground": bg } as React.CSSProperties}
    >
      <div className="grid-container">
        <Head tool={tool} align={align} />
        {/* Each frame gets ~55% of a screen of scroll. */}
        <div
          ref={trackRef}
          className={styles.track}
          style={pinned ? { height: `calc(100vh + ${frames * 55}vh)` } : undefined}
        >
          <div className={styles.stage} data-pinned={pinned}>
            <div className={`grid-12 ${styles.featureGrid}`} data-flip={flip} data-align={align}>
              <div className={styles.featureCol}>
                <ul className={styles.features}>
                  {features.map((f, i) => (
                    <li key={f.title}>
                      <button
                        type="button"
                        className={styles.feature}
                        data-active={i === active}
                        onClick={() => goTo(f.from)}
                      >
                        <strong>{f.title}{f.tag && <em className={styles.featureTag}>{f.tag}</em>}</strong>
                        <span>{f.text}</span>
                      </button>
                    </li>
                  ))}
                </ul>
                <DemoLink label={cta} />
              </div>
              <div className={styles.featureVisual}>{render(step)}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Short introduction right under the hero, on deep blue. */
export function TechIntro() {
  const { locale } = useContent();
  const t = getTechContent(locale).intro;
  return (
    <section className={styles.introBand} data-bg-color="#0B172C" data-text-color="#F7F6F5" style={{ color: "#F7F6F5" }}>
      <div className="grid-container">
        <div className={`grid-12 ${styles.introGrid}`}>
          <div className={styles.introHead}>
            <p className={styles.introEyebrow}>{t.eyebrow}</p>
            <h2 className={styles.introHeadline}>
              {t.headline}{" "}
              <Logo color="#F7F6F5" className={styles.inlineLogo} />
            </h2>
          </div>
          <p className={styles.introText}>{t.text}</p>
        </div>
      </div>
    </section>
  );
}

/** The three tools share the same dark band; hairlines separate them from each other. */
export function TechTools() {
  const { locale } = useContent();
  const t = getTechContent(locale);
  return (
    <>
      <FeatureBand
        id="specbook" tool={t.specbook} features={t.specbook.features} frames={t.specbook.screens.length}
        bg="#28170E" fg="#ECE6E3" cta={t.requestDemo} ruled={false}
        render={(step) => <ShotStage screens={t.specbook.screens} step={step} />}
      />
      <FeatureBand
        id="specto" tool={t.specto} features={t.specto.features} frames={SPECTO_FRAMES}
        bg="#28170E" fg="#ECE6E3" flip align="right" cta={t.requestDemo}
        render={(step) => <SpectoApp c={t.specto.demo} step={step} />}
      />
      <FeatureBand
        id="design-tracker" tool={t.tracker} features={t.tracker.features} frames={t.tracker.screens.length}
        bg="#28170E" fg="#ECE6E3" align="mid" cta={t.requestDemo}
        render={(step) => <ShotStage screens={t.tracker.screens} step={step} />}
      />
    </>
  );
}

/** Teaser for a feature that is built but not live yet. */
export function TechSoon() {
  const { locale } = useContent();
  const t = getTechContent(locale).soon;
  // "[specbook] procurement": the product name in terracotta, the rest in beige.
  const [product, ...rest] = t.headline.split(" ");
  return (
    <section className={`${styles.band} ${styles.ruled}`} data-bg-color="#28170E" data-text-color="#ECE6E3" style={{ color: "#ECE6E3" }}>
      <div className="grid-container">
        <div className={`grid-12 ${styles.soonGrid}`}>
          <div className={styles.soonCopy}>
            <p className={styles.soonBadge}>
              <b>{t.eyebrow}</b>
              <span>{t.badge}</span>
            </p>
            <h2 className={styles.soonHeadline}>
              <span className={styles.soonProduct}>{product}</span> {rest.join(" ")}
            </h2>
            <p className={styles.soonText}>{t.text}</p>
            <ul className={styles.soonPoints}>
              {t.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
          <div className={styles.soonVisual}>
            <BrowserFrame path={t.path}>
              <div className={styles.showScreen}>
                <Image src={t.src} alt={t.headline} width={2400} height={1500} unoptimized className={styles.soonShot} />
              </div>
            </BrowserFrame>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * How the studio works with AI, technology and training, in terracotta so it
 * reads as a different world from the tools. The opening follows the home
 * page's terracotta band; the four principles are staggered across the grid.
 */
export function TechManifesto() {
  const { locale } = useContent();
  const t = getTechContent(locale).manifesto;
  const items = [...t.blocks, { title: t.never.title, text: t.never.items.join(" ") }];
  return (
    <section
      id="manifiesto"
      className={`${styles.band} ${styles.manifesto}`}
      data-bg-color="#AC6752"
      data-text-color="#F7F6F5"
      style={{ color: "#F7F6F5" }}
    >
      <div className="grid-container">
        <div className={`grid-12 ${styles.mGrid}`}>
          <div className={styles.mHead}>
            <p className={styles.mEyebrow}>{t.eyebrow}</p>
            <h2 className={styles.mHeadline}>{t.headline}</h2>
          </div>
          <p className={styles.mIntro}>{t.intro}</p>
          {items.map((it, i) => (
            <div key={it.title} className={styles.mItem} data-i={i}>
              <span className={styles.mNum}>( {String(i + 1).padStart(2, "0")} )</span>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </div>
          ))}
          <p className={styles.mPartner}>{t.partner}</p>
        </div>
      </div>
    </section>
  );
}
