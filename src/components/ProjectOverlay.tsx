/**
 * PROJECT OVERLAY — Preserved for future use.
 *
 * This component renders a Mesura-style slide-up overlay when a project is clicked.
 * Currently disabled because project content is not ready yet.
 *
 * To re-enable:
 * 1. In page.tsx, import this component and add state management
 * 2. In content files (es.ts/en.ts), set inDevelopment:false on ready projects
 * 3. Pass onProjectClick handler to ProjectsGrid
 */

"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import Image from "next/image";
import { Project } from "@/content/types";
import { useContent } from "@/lib/locale-context";
import { withBasePath } from "@/lib/paths";
import styles from "./ProjectOverlay.module.css";

interface Props { project: Project; onClose: () => void; onNavigate: (p: Project) => void; }

export default function ProjectOverlay({ project, onClose, onNavigate }: Props) {
  const { content } = useContent();
  const [mode, setMode] = useState<"entering"|"peeking"|"full">("entering");
  const [showArrow, setShowArrow] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setMode("peeking"), 50);
    return () => { document.body.style.overflow = ""; clearTimeout(t); };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || mode === "full") return;
    const h = () => { if (el.scrollTop > 10) { setMode("full"); setShowArrow(false); } };
    el.addEventListener("scroll", h, { passive: true });
    return () => el.removeEventListener("scroll", h);
  }, [mode]);

  useEffect(() => {
    if (!showArrow) return;
    const t = setTimeout(() => setShowArrow(false), 4000);
    return () => clearTimeout(t);
  }, [showArrow]);

  const handleKey = useCallback((e: KeyboardEvent) => { if (e.key === "Escape") onClose(); }, [onClose]);
  useEffect(() => { window.addEventListener("keydown", handleKey); return () => window.removeEventListener("keydown", handleKey); }, [handleKey]);

  const topOffset = mode === "entering" ? "100vh" : mode === "peeking" ? "60px" : "0px";
  const otherProjects = content.projects.filter((p) => p.id !== project.id && !p.inDevelopment);

  return (
    <>
      <div className={styles.scrim} onClick={onClose} />
      <div className={styles.overlay} style={{ top: topOffset }} role="dialog" aria-modal="true">
        <button className={styles.closeBtn} onClick={onClose}>{content.overlay.close}</button>
        {showArrow && mode === "peeking" && (
          <div className={styles.scrollArrow}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
          </div>
        )}
        <div className={styles.scrollArea} ref={scrollRef}>
          <div className="grid-container">
            <div className={`grid-12 ${styles.content}`}>
              <div className={styles.titleCol}><h1 className={styles.title}>{project.title}</h1></div>
              <div className={styles.metaCol}>
                <p className={styles.location}>– {project.location}</p>
                <div className={styles.metaList}>
                  {project.type && <span>– {project.type}</span>}
                  {project.client && <span>– Cliente final: {project.client}</span>}
                  {project.partner && <span>– Partner: {project.partner}</span>}
                  {project.phase && <span>– Fase: {project.phase}</span>}
                </div>
                <p className={styles.status}>{project.status}</p>
              </div>
              <div className={styles.heroImageCol}>
                <div className={styles.heroImageWrapper}>
                  <Image src={withBasePath(project.heroImage)} alt={project.title} fill sizes="100vw" className={styles.heroImage} priority />
                </div>
              </div>
              <div className={styles.shortDescCol}><p className={styles.shortDesc}>{project.shortDesc}</p></div>
              <div className={styles.longDescCol}>
                {project.longDesc.map((t, i) => <p key={i} className={styles.bodyText}>{t}</p>)}
              </div>
              {project.images.length > 0 && (
                <div className={styles.galleryCol}>
                  <div className={styles.gallery}>
                    {project.images.map((img, i) => (
                      <figure key={i} className={styles.galleryItem}>
                        <div className={styles.galleryImageWrapper}>
                          <Image src={withBasePath(img.src)} alt={img.caption} fill sizes="50vw" className={styles.galleryImage} />
                        </div>
                        <figcaption className={styles.galleryCaption}>{i + 1}.<span className={styles.captionText}>{img.caption}</span></figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              )}
              {project.labor.length > 0 && (
                <div className={styles.laborCol}>
                  <h3 className={styles.laborTitle}>{project.laborTitle}</h3>
                  <ul className={styles.laborList}>
                    {project.labor.map((item, i) => <li key={i} className={styles.laborItem}>{item}</li>)}
                  </ul>
                </div>
              )}
              {project.closingText && (
                <div className={styles.closingCol}>
                  <p className={styles.closingText}>{project.closingText}</p>
                  {project.closingText2 && <p className={styles.closingText}>{project.closingText2}</p>}
                </div>
              )}
            </div>
          </div>
          {/* Other projects strip */}
          <div className={styles.otherProjects}>
            <div className="grid-container">
              <div className={styles.otherScroll}>
                {otherProjects.map((p) => (
                  <button key={p.id} className={styles.otherCard} onClick={() => onNavigate(p)}>
                    <div className={styles.otherThumb}>
                      <Image src={withBasePath(p.thumbnail)} alt={p.title} fill sizes="180px" className={styles.otherImg} />
                    </div>
                    <span className={styles.otherTitle}>{p.title}</span>
                    <span className={styles.otherLoc}>– {p.location}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <footer className={styles.footer}>
            <div className={`grid-container ${styles.footerInner}`}>
              <span className={styles.footerCopy}>{content.footer.copyright}</span>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
