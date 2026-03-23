# Despliegue en Vercel

El proyecto está preparado para **Next.js en modo servidor** (middleware, `next start` en la plataforma de Vercel).

## Pasos (primera vez)

1. Entra en [vercel.com](https://vercel.com) e inicia sesión con GitHub.
2. **Add New Project** → importa **`jaumetorrespous/latroupe-marketing`**.
3. Deja **Framework Preset: Next.js** y **Build Command** `npm run build` (por defecto).
4. **Deploy**. Cada push a la rama conectada (normalmente `main`) generará un nuevo despliegue.

## Dominio personalizado

En el proyecto Vercel: **Settings → Domains** y añade `latroupestudio.com` o un subdominio. Sigue las instrucciones de DNS que Vercel indica (registros A/CNAME).

## Variables de entorno

No son obligatorias para el sitio actual. Si en el futuro usas `NEXT_PUBLIC_*` o secretos de API, configúralos en **Settings → Environment Variables**.

## Diferencia con el hosting estático (Hostinger FTP)

- Aquí corre **Node** y el **middleware** de Next (detección de idioma, cookies).
- **`next/image`** puede optimizar imágenes en Vercel (no hace falta `output: "export"`).
