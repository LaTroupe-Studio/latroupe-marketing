"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTypingAnimation } from "@/lib/hooks";
import { useContent } from "@/lib/locale-context";
import { withBasePath } from "@/lib/paths";
import LogoText from "../LogoText";
import heroStyles from "../Hero.module.css";
import { BrowserFrame } from "../tech/Demos";
import { getHospitalityContent } from "./content";
import PartnerIcon from "./PartnerIcon";
import PhasesAnimation from "./PhasesAnimation";
import styles from "./Hospitality.module.css";

/**
 * Body of the latroupe(hospitality) page. The header, contact form and footer
 * are the site's own and are placed by the route.
 *
 * Palette: beiges and blues only. Bands alternate between light beige with
 * deep blue type and blue with beige type. As on the home and tech pages,
 * sections stay transparent and ScrollColorBackground tweens the body colour
 * from each data-bg-color.
 */

const BEIGE = "#ECE6E3";
const BEIGE_DARK = "#DED1C9";
const BLUE = "#2F4868";
const BLUE_DEEP = "#0B172C";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function useT() {
  const { locale } = useContent();
  return getHospitalityContent(locale);
}

/** Same three-line claim as the home hero, in blue: wordmark / ( word ) / suffix. */
export function HospitalityHero() {
  const t = useT().hero;
  const typedWord = useTypingAnimation(t.rotatingWords);
  return (
    <section className={heroStyles.hero} data-bg-color={BEIGE} data-text-color={BLUE_DEEP}>
      <div className="grid-container">
        <div className={`grid-12 ${heroStyles.content}`}>
          <div className={heroStyles.claimCol}>
            <p className={styles.heroEyebrow}>( hospitality )</p>
            <h1 className={`${heroStyles.heading} ${styles.heroHeading}`}>
              <LogoText color={BLUE_DEEP} className={heroStyles.logoLine} />
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
          </div>
          <div className={heroStyles.descCol}>
            <p className={`${heroStyles.description} ${styles.heroDesc}`}>{t.description}</p>
            <button
              type="button"
              className={`${styles.btn} ${styles.heroBtn}`}
              style={{ "--btn-ink": BLUE_DEEP, "--btn-ground": BEIGE } as React.CSSProperties}
              onClick={() => scrollTo("contacto")}
            >
              {t.cta}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Deep blue statement right under the hero. */
export function HospitalityIntro() {
  const t = useT().intro;
  return (
    <section className={styles.band} data-bg-color={BLUE_DEEP} data-text-color={BEIGE} style={{ color: BEIGE }}>
      <div className="grid-container">
        <div className={`grid-12 ${styles.statementGrid}`}>
          <div className={styles.statementHead}>
            <p className={styles.eyebrow}>{t.eyebrow}</p>
            <h2 className={styles.display}>{t.headline}</h2>
          </div>
          <p className={styles.statementText}>{t.text}</p>
        </div>
      </div>
    </section>
  );
}

/** The four things the studio brings, staggered across the grid like the tech manifesto. */
export function HospitalityRole() {
  const t = useT().role;
  return (
    <section id="papel" className={styles.band} data-bg-color={BEIGE} data-text-color={BLUE_DEEP} style={{ color: BLUE_DEEP }}>
      <div className="grid-container">
        <div className={`grid-12 ${styles.roleGrid}`}>
          <div className={styles.statementHead}>
            <p className={`${styles.eyebrow} ${styles.accent}`}>{t.eyebrow}</p>
            <h2 className={styles.display}>{t.headline}</h2>
          </div>
          <p className={styles.statementText}>{t.intro}</p>
          {t.items.map((it, i) => (
            <div key={it.title} className={styles.roleItem} data-i={i}>
              <span className={`${styles.num} ${styles.accent}`}>( {String(i + 1).padStart(2, "0")} )</span>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Hotel groups, owners and design studios, laid out like the home's
 * methodology: the heading stays pinned while scrolling steps through the
 * three, which cross-fade in one cell. The big number of the home becomes an
 * animated icon. On mid blue, so it still alternates with the beige bands.
 */
export function HospitalityPartners() {
  const t = useT().partners;
  const trackRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const count = t.items.length;

  useEffect(() => {
    const track = trackRef.current;
    if (!track || count === 0) return;
    // Less motion asked for: stay on the first one (phones show all three stacked).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onScroll = () => {
      const span = Math.max(1, track.offsetHeight - window.innerHeight);
      const y = Math.min(span, Math.max(0, -track.getBoundingClientRect().top));
      const idx = Math.min(count - 1, Math.floor((y / span) * count));
      setStep((prev) => (prev === idx ? prev : idx));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count]);

  return (
    <section id="con-quien" className={styles.seq} data-bg-color={BLUE} data-text-color={BEIGE} style={{ color: BEIGE }}>
      <div className="grid-container">
        <div ref={trackRef} className={styles.seqTrack}>
          <div className={styles.seqPin}>
            <div className={`grid-12 ${styles.seqHeadRow}`}>
              <h2 className={styles.seqHeadline}>{t.headline}</h2>
            </div>
            <div className={`grid-12 ${styles.seqIntroRow}`}>
              <p className={styles.seqLead}>{t.lead}</p>
              <p className={styles.seqIntro}>{t.intro}</p>
            </div>
            <div className={styles.seqPanels}>
              {t.items.map((it, i) => (
                <div key={it.title} className={`grid-12 ${styles.seqPanel}`} data-active={i === step}>
                  <div className={styles.seqIcon}>
                    <PartnerIcon name={it.icon} active={i === step} />
                    <span className={styles.num}>( {String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")} )</span>
                  </div>
                  <div className={styles.seqItemHead}>
                    <h3>{it.title}</h3>
                    <p>{it.subtitle}</p>
                  </div>
                  <div className={styles.seqText}>
                    {it.text.map((p) => <p key={p}>{p}</p>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Where the studio comes in along the life of a hotel: the RIBA building of
 * the BIM consultancy page, re-keyed to the six phases of a hotel.
 */
export function HospitalityLifecycle() {
  const t = useT().lifecycle;
  return (
    <section className={styles.lifecycle} data-bg-color={BEIGE_DARK} data-text-color={BLUE_DEEP} style={{ color: BLUE_DEEP }}>
      <div className="grid-container">
        <div className={`grid-12 ${styles.head}`} data-align="mid">
          <p className={`${styles.eyebrow} ${styles.accent}`}>{t.eyebrow}</p>
          <h2 className={styles.headline}>{t.headline}</h2>
          <p className={styles.intro}>{t.intro}</p>
        </div>
      </div>
      <PhasesAnimation steps={t.steps} />
    </section>
  );
}

/**
 * Why technology matters in hospitality (margins and investment), on deep
 * blue, then specbook and specbook procurement with real captures on beige.
 */
export function HospitalityTech() {
  const { locale } = useContent();
  const { tech, tools } = getHospitalityContent(locale);
  return (
    <>
      <section id="tecnologia" className={styles.band} data-bg-color={BLUE_DEEP} data-text-color={BEIGE} style={{ color: BEIGE }}>
        <div className="grid-container">
          <div className={`grid-12 ${styles.statementGrid}`}>
            <div className={styles.statementHead}>
              <p className={styles.eyebrow}>{tech.eyebrow}</p>
              <h2 className={styles.display}>{tech.headline}</h2>
            </div>
            <p className={styles.statementText}>{tech.intro}</p>
          </div>
          <div className={`grid-12 ${styles.partnerGrid} ${styles.levers}`}>
            {tech.levers.map((it, i) => (
              <div key={it.title} className={styles.partner} data-i={i}>
                <span className={styles.num}>( {String(i + 1).padStart(2, "0")} )</span>
                <h3>{it.title}</h3>
                <p>{it.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.band} data-bg-color={BEIGE} data-text-color={BLUE_DEEP} style={{ color: BLUE_DEEP }}>
        <div className="grid-container">
          <div className={`grid-12 ${styles.head}`}>
            <p className={`${styles.eyebrow} ${styles.accent}`}>{tools.eyebrow}</p>
            <h2 className={styles.headline}>{tools.headline}</h2>
          </div>
          {tools.items.map((tool, i) => (
            <div key={tool.name} className={`grid-12 ${styles.tool}`} data-flip={i % 2 === 1}>
              <div className={styles.toolCopy}>
                <p className={styles.toolName}>
                  <span>{tool.name}</span>
                  {tool.badge && <em className={styles.badge}>{tool.badge}</em>}
                </p>
                <h3>{tool.title}</h3>
                <p>{tool.text}</p>
                <ul className={styles.toolPoints}>
                  {tool.points.map((pt) => <li key={pt}>{pt}</li>)}
                </ul>
              </div>
              <div className={styles.toolVisual}>
                <BrowserFrame path={tool.path}>
                  <div className={styles.toolScreen}>
                    <Image src={tool.image} alt={`${tool.name} · ${tool.title}`} width={2400} height={1500} unoptimized />
                  </div>
                </BrowserFrame>
              </div>
            </div>
          ))}
          <div className={`grid-12 ${styles.toolMore}`}>
            <Link
              href={`/${locale}/tech`}
              className={styles.btn}
              style={{ "--btn-ink": BLUE_DEEP, "--btn-ground": BEIGE } as React.CSSProperties}
            >
              {tools.more}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/** Hotel projects on deep blue, then the hotel brands on beige. */
export function HospitalityProjects() {
  const { projects, brands } = useT();
  return (
    <>
      <section className={styles.band} data-bg-color={BLUE_DEEP} data-text-color={BEIGE} style={{ color: BEIGE }}>
        <div className="grid-container">
          <div className={`grid-12 ${styles.head}`} data-align="right">
            <p className={styles.eyebrow}>{projects.eyebrow}</p>
            <h2 className={styles.headline}>{projects.headline}</h2>
          </div>
          <div className={`grid-12 ${styles.projectGrid}`}>
            {projects.items.map((p, i) => (
              <figure key={p.title} className={styles.project} data-i={i}>
                <div className={styles.projectImage}>
                  <Image
                    src={p.image}
                    alt={`${p.title} · ${p.brand} · latroupe()`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <figcaption>
                  <span className={styles.num}>{p.brand}</span>
                  <strong>{p.title}</strong>
                  <span>{p.location} · {p.scope}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.brandsBand} data-bg-color={BEIGE} data-text-color={BLUE_DEEP} style={{ color: BLUE_DEEP }}>
        <div className="grid-container">
          <p className={styles.brandsHeadline}>{brands.headline}</p>
          <ul className={styles.brands}>
            {brands.logos.map((logo) => (
              <li key={logo.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={withBasePath(logo.src)} alt={logo.name} className={styles.brandLogo} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
