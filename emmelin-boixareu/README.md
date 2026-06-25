# Emmelin Boixareu — web

Web personal de perfil de ponente (interiorista, formadora y ponente). Proyecto
**independiente** dentro del monorepo `latroupe-marketing`, con su propio
`package.json` y su propio deploy.

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript
- Sin dependencias de UI: estilos inline + `globals.css` (fuentes Space Grotesk + Archivo)
- Trilingüe CA / ES / EN (selector en la barra superior, idioma persistido en `localStorage`)

## Desarrollo

```bash
cd emmelin-boixareu
npm install
npm run dev      # http://localhost:3000
```

Otros scripts: `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`.

## Estructura

```
src/
  app/
    layout.tsx        # metadata + html lang
    page.tsx          # render del componente
    globals.css       # reset, fuentes, responsive, focus/hover
  components/
    SpeakerProfile.tsx # one-pager completo (hero, bio, expertise, temas, docencia, contacto)
  content/
    dict.ts           # textos CA/ES/EN tipados
public/
  images/             # portrait-hero.jpg, speaking.jpg
```

## Pendiente

- **Formulario de contacto**: ahora solo muestra confirmación en cliente, no envía.
  Falta conectar un backend (p. ej. una Lambda como la de `lambda/contact` del
  repo padre, o un servicio tipo Formspree/Resend).
- **LinkedIn**: el enlace apunta a una URL provisional; confirmar la real.
- Imágenes optimizadas a 2400px. Hay material adicional sin usar en el zip original.

## Deploy

Mismo patrón que el repo padre:

- **Vercel** (runtime Node, Image Optimization): build por defecto.
- **Export estático** (S3/CloudFront u hosting simple): `STATIC_EXPORT=1 npm run build` → `out/`.
