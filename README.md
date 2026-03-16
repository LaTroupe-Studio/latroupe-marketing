# latroupe-marketing

Web de marketing de LaTroupe Studio. Next.js 15+ con App Router, TypeScript y Tailwind. Diseñado para desplegar en Vercel.

## Stack

- Next.js 15+ (App Router)
- TypeScript
- Tailwind CSS
- Vercel (deploy)

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Estructura

```
src/
├── app/
│   ├── layout.tsx    # Layout raíz + Header + Footer
│   ├── page.tsx      # Inicio
│   ├── servicios/
│   ├── contacto/
│   └── not-found.tsx
└── components/
    ├── Header.tsx
    └── Footer.tsx
```

## Páginas

- **/** – Inicio: hero, intro a LaTroupe, CTA a servicios
- **/servicios** – Servicios (Web, Gráfica, BIM, Craft Journal)
- **/contacto** – Formulario de contacto

Estructura preparada para integrar CMS más adelante.

## GitHub

`LaTroupe-Studio/latroupe-marketing`

## Deploy en Vercel

Conectar el repo en [Vercel](https://vercel.com). Next.js se detecta automáticamente.
