/**
 * Prefijo opcional para assets en `public/` (p. ej. si NEXT_PUBLIC_BASE_PATH está definido).
 * En Vercel por defecto va vacío.
 */
export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}
