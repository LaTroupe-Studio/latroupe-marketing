"use client";

import { useState } from "react";
import Image from "next/image";
import { Project } from "@/content/types";
import { withBasePath } from "@/lib/paths";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  tooltipText: string;
  variant?: 'left' | 'center' | 'right';
}

export default function ProjectCard({ project, onClick, tooltipText, variant = 'left' }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const titleParts = project.title.split("|").map(part => part.trim());
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const variantClass = styles[`variant_${variant}`];

  return (
    <article
      className={`${styles.card} ${variantClass}`}
      onClick={() => onClick(project)}
      onMouseMove={(e) => setPos({ x: e.clientX + 15, y: e.clientY + 15 })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h3 className={styles.title}>
              {titleParts.map((text, index) => (
                <span key={index} className={styles.titleLine}>
                  {text} {index === 0 && "|"}
                </span>
              ))}
            </h3>
      <div className={styles.imageWrapper}>
        <div className={styles.imageInner} style={{ transform: hovered ? "scale(1.03)" : "scale(1)" }}>
          <Image src={withBasePath(project.thumbnail)} alt={project.title} fill sizes="(max-width: 768px) 100vw, 33vw" className={styles.image} />
        </div>
      </div>
      <p className={styles.location}>– {project.location}</p>

      {hovered && <div className={styles.tooltip} style={{ left: pos.x, top: pos.y }}>{tooltipText}</div>}
    </article>
  );
}
