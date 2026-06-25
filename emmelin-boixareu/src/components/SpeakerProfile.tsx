"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { dict, type Lang } from "@/content/dict";

const SPACE = "'Space Grotesk', sans-serif";
const ARCHIVO = "'Archivo', sans-serif";
const ACCENT = "#a9a59c";
const ACTIVE = "#2f4661";

const eyebrow: CSSProperties = {
  fontSize: 11,
  letterSpacing: 2,
  textTransform: "uppercase",
  color: "#8a877f",
};

const sectionPad: CSSProperties = {
  padding: "clamp(56px,9vw,140px) clamp(20px,5vw,72px)",
  borderBottom: "1px solid #e3e3e0",
};

const twoCol: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0,200px) minmax(0,1fr)",
  gap: "clamp(28px,5vw,80px)",
  maxWidth: 1180,
  margin: "0 auto",
};

const fieldStyle: CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid #485970",
  color: "#f4f4f2",
  fontFamily: ARCHIVO,
  fontSize: 15,
  padding: "11px 0",
  outline: "none",
};

const fieldLabel: CSSProperties = {
  fontSize: 10.5,
  letterSpacing: 1.6,
  textTransform: "uppercase",
  color: "#a7b0bd",
  display: "block",
  marginBottom: 6,
};

export default function SpeakerProfile() {
  const [lang, setLang] = useState<Lang>("ca");
  const [sent, setSent] = useState(false);
  const [sentName, setSentName] = useState("");
  const nameRef = useRef<HTMLDivElement>(null);

  // Restore saved language on mount.
  useEffect(() => {
    try {
      const saved = localStorage.getItem("emmelin_lang") as Lang | null;
      if (saved && saved !== lang) setLang(saved);
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reveal the name in the top bar once scrolled past the hero.
  useEffect(() => {
    const onScroll = () => {
      const el = nameRef.current;
      if (!el) return;
      el.style.opacity =
        window.scrollY > window.innerHeight * 0.72 ? "1" : "0";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const changeLang = useCallback((next: Lang) => {
    try {
      localStorage.setItem("emmelin_lang", next);
    } catch {
      /* ignore */
    }
    setLang(next);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nom = (data.get("nom") || "").toString().trim();
    setSentName(nom.split(" ")[0] || "");
    setSent(true);
  };

  const t = dict[lang];
  const langColor = (l: Lang): string => (lang === l ? ACTIVE : ACCENT);

  const langBtn: CSSProperties = {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: ARCHIVO,
    fontSize: 11,
    letterSpacing: 1,
    textTransform: "uppercase",
    padding: 0,
  };

  return (
    <div
      style={{
        fontFamily: ARCHIVO,
        color: "#141414",
        background: "#f4f4f2",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      {/* ===== TOP BAR ===== */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "22px clamp(20px,5vw,72px)",
          borderBottom: "1px solid #e3e3e0",
          position: "sticky",
          top: 0,
          background: "rgba(244,244,242,.9)",
          backdropFilter: "blur(8px)",
          zIndex: 50,
        }}
      >
        <div
          ref={nameRef}
          style={{
            fontFamily: SPACE,
            fontSize: 17,
            fontWeight: 500,
            letterSpacing: "-.2px",
            opacity: 0,
            transition: "opacity .35s ease",
          }}
        >
          Emmelin Boixareu
        </div>
        <nav
          style={{
            display: "flex",
            gap: "clamp(14px,2.4vw,30px)",
            alignItems: "center",
            fontSize: 11,
            letterSpacing: 1.3,
            textTransform: "uppercase",
            color: "#5a5853",
          }}
        >
          <a href="#bio" style={{ color: "inherit", textDecoration: "none" }}>
            {t.navPerfil}
          </a>
          <a href="#temas" style={{ color: "inherit", textDecoration: "none" }}>
            {t.navPonencies}
          </a>
          <a
            href="#docencia"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            {t.navDocencia}
          </a>
          <a
            href="#contacto"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            {t.navContacte}
          </a>
          <span
            style={{ width: 1, height: 13, background: "#cdccc8" }}
            aria-hidden
          />
          <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button
              onClick={() => changeLang("ca")}
              style={{ ...langBtn, color: langColor("ca") }}
            >
              CA
            </button>
            <button
              onClick={() => changeLang("es")}
              style={{ ...langBtn, color: langColor("es") }}
            >
              ES
            </button>
            <button
              onClick={() => changeLang("en")}
              style={{ ...langBtn, color: langColor("en") }}
            >
              EN
            </button>
          </span>
        </nav>
      </header>

      {/* ===== HERO ===== */}
      <section
        className="split-hero"
        style={{
          display: "grid",
          gridTemplateColumns: "1.15fr .85fr",
          minHeight: "calc(100vh - 67px)",
          borderBottom: "1px solid #e3e3e0",
        }}
      >
        <div
          style={{
            padding: "clamp(36px,5.5vw,80px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRight: "1px solid #e3e3e0",
          }}
        >
          <div style={{ height: 8 }} />
          <div style={{ padding: "48px 0 0" }}>
            <div style={{ ...eyebrow, marginBottom: 22 }}>
              {t.roleA}
              <br />
              {t.roleB}
            </div>
            <h1
              style={{
                fontFamily: SPACE,
                fontWeight: 500,
                fontSize: "clamp(48px,8.5vw,118px)",
                lineHeight: 0.92,
                letterSpacing: "-3px",
              }}
            >
              Emmelin
              <br />
              <span style={{ fontWeight: 400, color: "#2f4661" }}>
                Boixareu
              </span>
            </h1>
          </div>
          <div style={{ maxWidth: 520 }}>
            <div
              style={{
                width: 46,
                height: 1,
                background: "#141414",
                marginBottom: 22,
              }}
            />
            <p
              style={{
                fontFamily: SPACE,
                fontSize: "clamp(19px,2vw,26px)",
                lineHeight: 1.32,
                color: "#2c2a26",
              }}
            >
              {t.tagline}
            </p>
          </div>
        </div>
        <div
          className="hero-media"
          style={{ position: "relative", background: "#e9e9e6", overflow: "hidden" }}
        >
          <img
            className="bw"
            src="/images/portrait-hero.jpg"
            alt="Emmelin Boixareu"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 18%",
              display: "block",
            }}
          />
        </div>
      </section>

      {/* ===== BIO ===== */}
      <section id="bio" style={sectionPad}>
        <div className="split-cols" style={twoCol}>
          <div style={eyebrow}>
            <div
              style={{
                fontFamily: SPACE,
                fontSize: 30,
                letterSpacing: 0,
                color: "#141414",
                marginBottom: 8,
              }}
            >
              01
            </div>
            {t.navPerfil}
          </div>
          <div>
            <p
              style={{
                fontFamily: SPACE,
                fontWeight: 400,
                fontSize: "clamp(22px,2.9vw,38px)",
                lineHeight: 1.34,
                letterSpacing: "-.3px",
                maxWidth: "18ch",
                color: "#141414",
              }}
            >
              {t.bioLead}
            </p>
            <p
              style={{
                fontSize: "clamp(15px,1.25vw,17px)",
                lineHeight: 1.75,
                color: "#46443f",
                maxWidth: "62ch",
                marginTop: 36,
              }}
            >
              {t.bioPre}
              <span style={{ color: "#141414", fontWeight: 500 }}>
                latroupe()
              </span>
              {t.bioPost}
            </p>
          </div>
        </div>
      </section>

      {/* ===== EXPERTISE ===== */}
      <section style={sectionPad}>
        <div className="split-cols" style={twoCol}>
          <div style={eyebrow}>
            <div
              style={{
                fontFamily: SPACE,
                fontSize: 30,
                letterSpacing: 0,
                color: "#141414",
                marginBottom: 8,
              }}
            >
              02
            </div>
            {t.secExpertesa}
          </div>
          <ol style={{ listStyle: "none" }}>
            {[t.exp1, t.exp2, t.exp3, t.exp4].map((exp, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  gap: "clamp(16px,3vw,40px)",
                  alignItems: "baseline",
                  padding: "22px 0",
                  borderTop: "1px solid #e3e3e0",
                  ...(i === 3 ? { borderBottom: "1px solid #e3e3e0" } : {}),
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: 1,
                    color: "#a9a59c",
                    minWidth: 30,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontFamily: SPACE,
                    fontSize: "clamp(22px,3vw,34px)",
                    lineHeight: 1.15,
                  }}
                >
                  {exp}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== TEMAS / PONENCIA ===== */}
      <section
        id="temas"
        className="split-temas"
        style={{
          borderBottom: "1px solid #e3e3e0",
          display: "grid",
          gridTemplateColumns: ".92fr 1.08fr",
        }}
      >
        <div
          className="temas-media"
          style={{
            position: "relative",
            background: "#e9e9e6",
            overflow: "hidden",
            minHeight: 520,
            borderRight: "1px solid #e3e3e0",
          }}
        >
          <img
            className="bw"
            src="/images/speaking.jpg"
            alt="Emmelin Boixareu"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 30%",
              display: "block",
              position: "absolute",
              inset: 0,
            }}
          />
        </div>
        <div style={{ padding: "clamp(48px,7vw,110px) clamp(24px,5vw,80px)" }}>
          <div style={{ ...eyebrow, marginBottom: 38 }}>
            <span
              style={{
                fontFamily: SPACE,
                fontSize: 30,
                color: "#141414",
                marginRight: 14,
                verticalAlign: "baseline",
              }}
            >
              03
            </span>
            {t.secTemes}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              { tema: t.tema1, tag: t.tag1 },
              { tema: t.tema2, tag: t.tag2 },
              { tema: t.tema3, tag: t.tag3 },
              { tema: t.tema4, tag: t.tag4 },
            ].map((row, i, arr) => (
              <div
                key={i}
                style={{
                  padding: "24px 0",
                  borderTop: "1px solid #e3e3e0",
                  ...(i === arr.length - 1
                    ? { borderBottom: "1px solid #e3e3e0" }
                    : {}),
                }}
              >
                <div
                  style={{
                    fontFamily: SPACE,
                    fontSize: "clamp(20px,2.3vw,27px)",
                    lineHeight: 1.2,
                    marginBottom: 6,
                  }}
                >
                  {row.tema}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#8a877f",
                    letterSpacing: 0.3,
                  }}
                >
                  {row.tag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DOCENCIA ===== */}
      <section id="docencia" style={sectionPad}>
        <div className="split-cols" style={twoCol}>
          <div style={eyebrow}>
            <div
              style={{
                fontFamily: SPACE,
                fontSize: 30,
                letterSpacing: 0,
                color: "#141414",
                marginBottom: 8,
              }}
            >
              04
            </div>
            {t.secDocencia}
          </div>
          <div>
            <div
              className="doc-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0 clamp(28px,5vw,64px)",
              }}
            >
              {[
                { title: "LABASAD", desc: t.doc1desc, strong: true },
                { title: "Àmbit · InteriHotel", desc: t.doc2desc, strong: true },
                { title: "Juno House", desc: t.doc3desc, strong: false },
                { title: t.doc4, desc: null, strong: false },
              ].map((card, i) => (
                <div
                  key={i}
                  style={{
                    padding: "26px 0",
                    borderTop: card.strong
                      ? "1px solid #141414"
                      : "1px solid #e3e3e0",
                  }}
                >
                  <div
                    style={{
                      fontFamily: SPACE,
                      fontSize: "clamp(20px,2.2vw,26px)",
                      ...(card.desc ? {} : { color: "#8a877f" }),
                    }}
                  >
                    {card.title}
                  </div>
                  {card.desc && (
                    <div
                      style={{
                        fontSize: 13.5,
                        color: "#6a675f",
                        marginTop: 6,
                        lineHeight: 1.5,
                      }}
                    >
                      {card.desc}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA / CONTACT ===== */}
      <section
        id="contacto"
        style={{
          padding: "clamp(44px,6vw,84px) clamp(20px,5vw,72px)",
          background: "#2f4661",
          color: "#f3eee4",
        }}
      >
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div
            className="split-cols"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,.85fr) minmax(0,1.15fr)",
              gap: "clamp(32px,6vw,90px)",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#a7b0bd",
                  marginBottom: 22,
                }}
              >
                {t.ctaEyebrow}
              </div>
              <h2
                style={{
                  fontFamily: SPACE,
                  fontWeight: 400,
                  fontSize: "clamp(26px,3.4vw,42px)",
                  lineHeight: 1.08,
                  letterSpacing: "-1px",
                  maxWidth: "13ch",
                }}
              >
                {t.headPre}
                <span style={{ color: "#ddd2bb" }}>{t.headEmph}</span>.
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  marginTop: 34,
                }}
              >
                <a
                  href="mailto:emmelin@latroupestudio.com"
                  style={{
                    fontFamily: SPACE,
                    fontSize: "clamp(16px,1.6vw,20px)",
                    color: "#f4f4f2",
                    textDecoration: "none",
                    borderBottom: "1px solid #5a6c82",
                    paddingBottom: 3,
                    alignSelf: "flex-start",
                  }}
                >
                  emmelin@latroupestudio.com
                </a>
                <a
                  href="https://www.linkedin.com/in/emmelin-boixareu"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#cfd5de",
                    textDecoration: "none",
                    fontSize: 13,
                    letterSpacing: 0.4,
                    alignSelf: "flex-start",
                  }}
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <div>
              {!sent ? (
                <form
                  className="form-grid"
                  onSubmit={handleSubmit}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "22px 28px",
                  }}
                >
                  <label style={{ display: "block" }}>
                    <span style={fieldLabel}>{t.lblNom}</span>
                    <input
                      className="field"
                      name="nom"
                      type="text"
                      required
                      style={fieldStyle}
                    />
                  </label>
                  <label style={{ display: "block" }}>
                    <span style={fieldLabel}>{t.lblEmail}</span>
                    <input
                      className="field"
                      name="email"
                      type="email"
                      required
                      style={fieldStyle}
                    />
                  </label>
                  <label style={{ display: "block" }}>
                    <span style={fieldLabel}>{t.lblEntitat}</span>
                    <input
                      className="field"
                      name="entitat"
                      type="text"
                      style={fieldStyle}
                    />
                  </label>
                  <label style={{ display: "block" }}>
                    <span style={fieldLabel}>{t.lblTipus}</span>
                    <select
                      className="field"
                      name="tipus"
                      style={{
                        ...fieldStyle,
                        WebkitAppearance: "none",
                        appearance: "none",
                        cursor: "pointer",
                      }}
                    >
                      <option style={{ color: "#141414" }}>{t.optXerrada}</option>
                      <option style={{ color: "#141414" }}>{t.optTaller}</option>
                      <option style={{ color: "#141414" }}>
                        {t.optDocencia}
                      </option>
                      <option style={{ color: "#141414" }}>{t.optAltres}</option>
                    </select>
                  </label>
                  <label style={{ display: "block", gridColumn: "1 / -1" }}>
                    <span style={fieldLabel}>{t.lblMissatge}</span>
                    <textarea
                      className="field"
                      name="missatge"
                      rows={3}
                      style={{ ...fieldStyle, resize: "vertical" }}
                    />
                  </label>
                  <div style={{ gridColumn: "1 / -1", marginTop: 6 }}>
                    <button
                      type="submit"
                      className="submit-btn"
                      style={{
                        background: "#ece5d6",
                        color: "#2f4661",
                        border: "none",
                        fontFamily: SPACE,
                        fontSize: 14,
                        fontWeight: 500,
                        letterSpacing: 0.4,
                        padding: "15px 32px",
                        borderRadius: 999,
                        cursor: "pointer",
                      }}
                    >
                      {t.btnEnviar}
                    </button>
                  </div>
                </form>
              ) : (
                <div
                  style={{
                    border: "1px solid #46586f",
                    borderRadius: 2,
                    padding: "clamp(28px,4vw,48px)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: SPACE,
                      fontSize: "clamp(22px,2.6vw,30px)",
                      letterSpacing: "-.5px",
                      marginBottom: 12,
                    }}
                  >
                    {t.thanksPre}
                    {sentName}.
                  </div>
                  <p
                    style={{
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: "#cfd5de",
                      maxWidth: "42ch",
                    }}
                  >
                    {t.confBody}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginTop: "clamp(34px,5vw,56px)",
              paddingTop: 20,
              borderTop: "1px solid #46586f",
              fontSize: 11,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: "#8e9db0",
            }}
          >
            <span>© 2026 Emmelin Boixareu</span>
            <span>Barcelona</span>
          </div>
        </div>
      </section>
    </div>
  );
}
