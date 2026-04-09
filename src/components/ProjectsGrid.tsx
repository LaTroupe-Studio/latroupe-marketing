"use client";
import { useState } from "react";
import Image from "next/image";
import { Project } from "@/content/types";
import { useContent } from "@/lib/locale-context";
import { withBasePath } from "@/lib/paths";
import styles from "./ProjectsGrid.module.css";

interface Props { onProjectClick: (project: Project) => void; }

function Entry({ project, className, tooltipText }: {
  project: Project; className: string; tooltipText: string;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);
  return (
    <div className={`${styles.entry} ${className}`}
      onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <h3 className={styles.title}>{project.title}</h3>
      <div className={styles.imageWrap}>
        <Image src={withBasePath(project.thumbnail)} alt={project.title} fill sizes="210px" className={styles.img} />
      </div>
      <span className={styles.location}>– {project.location}</span>
      {show && <div className={styles.tooltip} style={{ left: pos.x, top: pos.y }}>{tooltipText}</div>}
    </div>
  );
}

export default function ProjectsGrid({ onProjectClick: _onProjectClick }: Props) {
  const { content } = useContent();
  const p = content.projects;
  const comingSoon = content.overlay.comingSoon;
  const inDev = content.overlay.inDevelopment;
  const getTooltip = (proj: Project) => proj.inDevelopment ? inDev : comingSoon;

  return (
    <section id="proyectos" className={styles.section}>
      <div className="grid-container">
        <h2 className={styles.headline}>{content.projectsSection.headline}</h2>

        {/* Row 1: Al Ameen, Rochester, ORO */}
        <div className={styles.row}>
          {p[0] && <Entry project={p[0]} className={styles.r1p1} tooltipText={getTooltip(p[0])} />}
          {p[1] && <Entry project={p[1]} className={styles.r1p2} tooltipText={getTooltip(p[1])} />}
          {p[2] && <Entry project={p[2]} className={styles.r1p3} tooltipText={getTooltip(p[2])} />}
        </div>

        {/* Row 2: Sant Feliu, Holbein, Andaz */}
        <div className={styles.row}>
          {p[3] && <Entry project={p[3]} className={styles.r2p1} tooltipText={getTooltip(p[3])} />}
          {p[4] && <Entry project={p[4]} className={styles.r2p2} tooltipText={getTooltip(p[4])} />}
          {p[5] && <Entry project={p[5]} className={styles.r2p3} tooltipText={getTooltip(p[5])} />}
        </div>
      </div>
    </section>
  );
}
