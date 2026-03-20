"use client";
import { useState } from "react";
import Image from "next/image";
import { Project } from "@/content/types";
import { useContent } from "@/lib/locale-context";
import { withBasePath } from "@/lib/paths";
import styles from "./ProjectsGrid.module.css";
import ProjectCard from "./ProjectCard";

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
        <Image src={withBasePath(project.thumbnail)} alt={project.title} fill sizes="209px" className={styles.img} />
      </div>
      <span className={styles.location}>– {project.location}</span>
      {show && <div className={styles.tooltip} style={{ left: pos.x, top: pos.y }}>{tooltipText}</div>}
    </div>
  );
}

export default function ProjectsGrid({ onProjectClick }: Props) {
  const { content } = useContent();
  const projects = content.projects;
  const comingSoon = content.overlay.comingSoon;
  const inDev = content.overlay.inDevelopment;

  const getTooltip = (proj: Project) => proj.inDevelopment ? inDev : comingSoon;

  const positionClasses = [
      styles.r1p1, styles.r1p2, styles.r1p3,
      styles.r2p1, styles.r2p2, styles.r2p3,
      styles.r3p1
    ];

const layoutConfig = [
    { pos: styles.r1p1, variant: 'left' as const },
    { pos: styles.r1p2, variant: 'center' as const },
    { pos: styles.r1p3, variant: 'right' as const },
    { pos: styles.r2p1, variant: 'right' as const },
    { pos: styles.r2p2, variant: 'left' as const },
    { pos: styles.r2p3, variant: 'center' as const },
  ];

  return (
    <section id="proyectos" className={styles.section}>
      <div className="grid-container">
            <h2 className={styles.headline}>{content.projectsSection.headline}</h2>

            <div className={styles.mainGrid}>
                  {projects.map((project, index) => {
                    const config = layoutConfig[index % layoutConfig.length];
                    return (
                      <div key={project.id || index} className={config.pos}>
                        <ProjectCard
                          project={project}
                          onClick={onProjectClick}
                          variant={config.variant}
                          tooltipText={project.inDevelopment ? inDev : comingSoon}
                        />
                      </div>
                    );
                  })}
            </div>
        </div>
    </section>
  );
}
