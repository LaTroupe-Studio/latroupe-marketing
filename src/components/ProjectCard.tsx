"use client";

import { useState } from "react";
import Image from "next/image";
import { Project } from "@/content/types";
import { withBasePath, projectAlt } from "@/lib/paths";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className={styles.card}
      onClick={() => onClick(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.imageWrapper}>
        <div className={styles.imageInner} style={{ transform: hovered ? "scale(1.03)" : "scale(1)" }}>
          <Image src={withBasePath(project.thumbnail)} alt={projectAlt(project)} fill sizes="(max-width: 768px) 100vw, 33vw" className={styles.image} />
        </div>
      </div>
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.location}>– {project.location}</p>
    </article>
  );
}
