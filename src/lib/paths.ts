/**
 * Prefijo opcional para assets en `public/` (p. ej. si NEXT_PUBLIC_BASE_PATH está definido).
 * En Vercel por defecto va vacío.
 */
export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}

/**
 * Texto alternativo descriptivo para imágenes de proyecto, orientado a SEO:
 * "[Nombre del proyecto] · [tipo de espacio] · LaTroupe Studio".
 */
export function projectAlt(project: {
  title: string;
  type?: string;
  location: string;
}): string {
  const name = project.title.split("|")[0].replace(/\s+/g, " ").trim();
  const descriptor = project.type ?? "architecture & interior design";
  return `${name} · ${descriptor} · LaTroupe Studio`;
}
