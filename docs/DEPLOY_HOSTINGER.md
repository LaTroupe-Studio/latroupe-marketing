# Despliegue en Hostinger (FTP estático) — opcional / legado

> **Despliegue actual:** el proyecto está orientado a **[Vercel](VERCEL.md)** (Next con servidor). Si quieres **solo** subir HTML estático a Hostinger, necesitas **volver a activar** `output: "export"`, `basePath: "/beta"` y `images.unoptimized` en `next.config.js` y volver a generar `out/` (no está en esta rama por defecto).

El siguiente texto describe el flujo **FTP estático** cuando ese modo esté activo en el repo.

## URL prevista

- Sitio en subruta: **`https://latroupestudio.com/beta/`**
- La app está configurada con `basePath: "/beta"` en `next.config.js`. Si más adelante publicas en la raíz del dominio, cambia `basePath` a `""` y vuelve a generar el build.

## Pasos en tu máquina

```bash
cd latroupe-marketing
npm ci
npm run build
```

Se crea la carpeta **`out/`** con `_next/`, `es/`, `en/`, `images/`, `fonts/`, `index.html`, etc.

## Subida a Hostinger

1. Entra en **Administrador de archivos** o **FTP** (FileZilla, etc.).
2. Abre el directorio público del dominio (suele ser **`public_html/`** o **`domains/tudominio.com/public_html/`**).
3. Crea la carpeta **`beta`** si no existe.
4. **Sube todo el contenido de `out/`** dentro de `public_html/beta/` (no subas la carpeta `out` como nombre; el *contenido* de `out` debe quedar como `public_html/beta/index.html`, `public_html/beta/es/`, `public_html/beta/_next/`, …).

Comprueba en el navegador:

- `https://latroupestudio.com/beta/es/`
- `https://latroupestudio.com/beta/en/`

## Alternativas

| Opción | Idea |
|--------|------|
| **[Vercel](VERCEL.md)** (recomendado) | Conectas el repo; despliegue con Node y middleware. |
| **Hostinger VPS** | Instalas Node y ejecutas `next start` si no usas Vercel. |

## Limitaciones del export estático

- **No hay middleware** de Next (redirección por `Accept-Language` en el primer acceso). La raíz `/beta/` redirige al idioma por defecto (ES); el usuario puede cambiar ES/EN en el header.
- **No hay API routes** ni servidor Node: formularios de contacto habría que enviarlos a un servicio externo (Formspree, Getform, etc.) si quieres envío real.
