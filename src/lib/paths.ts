/**
 * Rutas de assets en `public/` deben incluir basePath en export estático
 * (p. ej. /beta/images/... en producción).
 */
export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}
