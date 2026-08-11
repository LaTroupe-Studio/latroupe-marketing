"use client";
import { useState } from "react";
import Image from "next/image";
import { Project } from "@/content/types";
import { useContent } from "@/lib/locale-context";
import { withBasePath } from "@/lib/paths";
import styles from "./ProjectsGrid.module.css";

interface Props { onProjectClick: (project: Project) => void; }

/**
 * Collage layout, ported from the design prototype.
 *
 * Each piece is placed on a tall canvas by column and vertical percentage, so
 * the arrangement keeps its proportions at any width. Columns are counted in
 * grid units — `--u` is one of twelve — which puts every piece on the same
 * retícula as the rest of the page.
 *
 * Names are hidden until the visitor points at an image, so the section reads
 * as a composition first and a list of clients second.
 */

type Piece = {
  /** Matches an id in `content.projectsCollage`; absent on decorative drawings. */
  id?: string;
  /** File under `/images/projects/collage/`, for decorative drawings only. */
  src?: string;
  col: number;
  top: string;
  /** Column span, and how many gutters it swallows. */
  cols: number;
  gutters: number;
  ratio: string;
  fit: "cover" | "contain";
  /** The terracotta wash sits on photographs only — the drawings are line art. */
  tint?: boolean;
  /** Pushes the framing in past the edges of the box. */
  zoom?: number;
};

/** In the prototype's own order, top of the canvas downwards. */
const PIECES: Piece[] = [
  { id: "rochester-row", col: 4, top: "0", cols: 3, gutters: 2, ratio: "326/214", fit: "cover", tint: true },
  { id: "oro-hato-rey", col: 8, top: "3.85%", cols: 3, gutters: 2, ratio: "327/218", fit: "cover", tint: true },
  { id: "al-ameen", col: 0, top: "11.75%", cols: 3, gutters: 2, ratio: "327/213", fit: "cover", tint: true },
  { src: "axo-bar-lounge.png", col: 5, top: "14.68%", cols: 3, gutters: 2, ratio: "2222/1687", fit: "contain" },
  { src: "axo-closet.png", col: 9, top: "23.61%", cols: 2, gutters: 1, ratio: "224/270", fit: "contain" },
  { id: "sant-feliu", col: 1, top: "25.41%", cols: 3, gutters: 2, ratio: "327/220", fit: "cover", tint: true },
  { id: "andaz-turks", col: 5, top: "29.89%", cols: 3, gutters: 2, ratio: "326/223", fit: "cover", tint: true },
  { src: "axo-explotado.png", col: 1, top: "37.17%", cols: 3, gutters: 2, ratio: "393/278", fit: "contain" },
  { id: "holbein-gardens", col: 7, top: "44.25%", cols: 3, gutters: 2, ratio: "325/223", fit: "cover", tint: true },
  { id: "workplace-competition", col: 3, top: "50.74%", cols: 3, gutters: 2, ratio: "326/214", fit: "cover", tint: true },
  { src: "axo-holbein-plan.png", col: 9, top: "57.01%", cols: 3, gutters: 2, ratio: "2336/1524", fit: "contain" },
  { id: "aena-east-lot", col: 0, top: "64.14%", cols: 3, gutters: 2, ratio: "326/214", fit: "cover", tint: true },
  { src: "axo-desk-pod.png", col: 4, top: "67.02%", cols: 2, gutters: 2, ratio: "1276/977", fit: "contain" },
  { id: "llavaneres", col: 7, top: "72.80%", cols: 3, gutters: 2, ratio: "327/220", fit: "cover", tint: true },
  { id: "lego-london-hub", col: 2, top: "81.95%", cols: 3, gutters: 2, ratio: "326/214", fit: "cover", tint: true, zoom: 1.18 },
  { id: "amazon-aws-hq", col: 9, top: "84.84%", cols: 3, gutters: 2, ratio: "2506/1658", fit: "contain" },
];

const G = "var(--grid-gutter)";
const leftOf = (col: number) => (col === 0 ? "0" : `calc(${col} * (var(--u) + ${G}))`);
const widthOf = (cols: number, gutters: number) => `calc(${cols} * var(--u) + ${gutters} * ${G})`;

/** Three of twelve columns of a 1509px canvas, halved on the small-screen grid. */
const SIZES = "(max-width: 768px) 50vw, 25vw";

export default function ProjectsGrid({ onProjectClick: _onProjectClick }: Props) {
  const { content } = useContent();
  const [hovered, setHovered] = useState<string | null>(null);
  const byId = new Map(content.projectsCollage.map((p) => [p.id, p]));

  return (
    <section id="proyectos" className={styles.section} data-bg-color="#ECE6E3" data-text-color="#77330B">
      <div className={`grid-container grid-12 ${styles.layout}`}>
        <h2 className={styles.headline}>{content.projectsSection.headline}</h2>

        <div className={styles.collage}>
          {PIECES.map((piece) => {
            const item = piece.id ? byId.get(piece.id) : undefined;
            // A labelled piece whose content entry is missing would render an
            // anonymous image; drop it instead.
            if (piece.id && !item) return null;

            const key = piece.id ?? piece.src!;
            const src = item ? item.image : `/images/projects/collage/${piece.src}`;
            const on = hovered === key;

            return (
              <div
                key={key}
                className={styles.piece}
                data-decorative={item ? undefined : true}
                style={{
                  left: leftOf(piece.col),
                  top: piece.top,
                  width: widthOf(piece.cols, piece.gutters),
                }}
                onMouseEnter={item ? () => setHovered(key) : undefined}
                onMouseLeave={item ? () => setHovered((h) => (h === key ? null : h)) : undefined}
              >
                <div className={styles.frame} style={{ aspectRatio: piece.ratio }}>
                  <Image
                    src={withBasePath(src)}
                    alt={item ? `${item.title} · ${item.location} · LaTroupe Studio` : ""}
                    aria-hidden={item ? undefined : true}
                    fill
                    sizes={SIZES}
                    className={styles.img}
                    style={{
                      objectFit: piece.fit,
                      transform: piece.zoom ? `scale(${piece.zoom})` : undefined,
                    }}
                  />
                  {piece.tint && <div className={styles.tint} aria-hidden="true" />}
                </div>
                {item && (
                  <div className={styles.label} data-on={on}>
                    <b>{item.title}</b>
                    <i>{item.location}</i>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
