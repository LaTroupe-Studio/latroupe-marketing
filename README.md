# latroupe — Website

Sitio web corporativo de latroupe. Construido con **Next.js 15**, **TypeScript** y **CSS Modules**.

---

## Inicio rápido

```bash
# 1. Instala dependencias
npm install

# 2. Arranca el servidor de desarrollo
npm run dev

# 3. Abre http://localhost:3000
```

---

## Despliegue (Vercel)

Producción recomendada: conecta el repo en [Vercel](https://vercel.com) e importa el proyecto (preset Next.js). Pasos detallados en [`docs/VERCEL.md`](docs/VERCEL.md).

---

## Estructura del proyecto

```
latroupe-web/
├── middleware.ts              ← Detección de idioma del navegador
├── public/
│   ├── fonts/                ← Archivos de fuente Roobert (.woff2)
│   └── images/
│       ├── logos/             ← Logos de clientes (trust section)
│       └── projects/
│           ├── al-ameen/      ← Imágenes del proyecto Al Ameen
│           ├── oro-hato-rey/
│           └── rochester-row/
│
├── src/
│   ├── app/
│   │   ├── globals.css        ← Variables CSS, reset, animaciones
│   │   ├── layout.tsx         ← Layout raíz (shell mínimo)
│   │   └── [locale]/
│   │       ├── layout.tsx     ← Layout con idioma (metadata, provider)
│   │       └── page.tsx       ← Página principal (ensambla componentes)
│   │
│   ├── components/            ← Un archivo .tsx + .module.css por componente
│   │   ├── Header.tsx         (incluye botón ES/EN)
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── ProjectsGrid.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectOverlay.tsx
│   │   ├── TrustLogos.tsx
│   │   ├── Methodology.tsx
│   │   ├── WhyUs.tsx
│   │   ├── ContactForm.tsx
│   │   ├── Footer.tsx
│   │   └── Logo.tsx
│   │
│   ├── content/
│   │   ├── es.ts              ← ⭐ TEXTOS EN ESPAÑOL — edita aquí
│   │   ├── en.ts              ← ⭐ TEXTOS EN INGLÉS — edita aquí
│   │   ├── types.ts           ← Interface del contenido
│   │   └── dictionary.ts     ← Cargador de idiomas
│   │
│   └── lib/
│       ├── hooks.ts           ← Custom hooks (typing animation, sticky)
│       ├── i18n.ts            ← Configuración de idiomas
│       ├── locale-context.tsx ← Provider + hook useContent()
│       └── tokens.ts          ← Design tokens (colores, grid, tipografía)
│
├── package.json
├── tsconfig.json
└── next.config.js
```

---

## Cómo editar contenido

### Textos
Hay **dos archivos de contenido**, uno por idioma:
- `src/content/es.ts` — español
- `src/content/en.ts` — inglés

Ambos tienen la misma estructura. Ejemplo:

```ts
// en es.ts
hero: {
  prefix: "latroupe",
  rotatingWords: ["produce", "tecnifica", "ordena"],
  suffix: "contigo",
},

// en en.ts
hero: {
  prefix: "latroupe",
  rotatingWords: ["produces", "engineers", "organizes"],
  suffix: "with you",
},
```

### Cómo funciona el idioma
1. Un usuario entra en latroupe.com
2. El middleware detecta el idioma de su navegador (Accept-Language)
3. Le redirige automáticamente a `/es` o `/en`
4. Si cambia manualmente con el botón ES/EN del header, se guarda una cookie

### Añadir un proyecto nuevo
Añádelo en **ambos archivos** (es.ts y en.ts), en el array `projects`:

```ts
{
  id: "mi-nuevo-proyecto",
  title: "Nombre del Proyecto",
  location: "Ciudad, País",
  thumbnail: "/images/projects/mi-nuevo-proyecto/hero.jpg",
  // ... resto de campos
}
```

Luego crea la carpeta: `public/images/projects/mi-nuevo-proyecto/`

### Imágenes de proyectos
Coloca las imágenes en `public/images/projects/[id-del-proyecto]/`.
Formatos recomendados: `.jpg` para fotos, `.png` para planos y diagramas.

### Logos de clientes
Coloca en `public/images/logos/`. Formato recomendado: `.png` con fondo transparente.

---

## Tipografías

El diseño usa **Roobert** y **Roobert Mono**. Para instalarlas:

1. Obtén los archivos `.woff2` de la fundición
2. Colócalos en `public/fonts/`
3. Descomenta las reglas `@font-face` en `src/app/globals.css`

Mientras tanto, la web usa **DM Sans** y **Space Mono** (Google Fonts) como fallback.

---

## Grid de 12 columnas

El sistema de grid respeta las especificaciones de Figma:

| Propiedad     | Valor   |
|---------------|---------|
| Frame width   | 1509px  |
| Margin        | 65px    |
| Gutter        | 24px    |
| Columnas      | 12      |
| Área de contenido | 1379px |

Las clases CSS utilitarias `grid-container` y `grid-12` están definidas en `globals.css`.

---

## Formulario de contacto

El formulario en `ContactForm.tsx` tiene un placeholder para el envío. Para conectarlo a un backend:

1. **Formspree** (más fácil): Regístrate en formspree.io, crea un form, y actualiza el `handleSubmit`
2. **API Route de Next.js**: Crea `src/app/api/contact/route.ts` con tu lógica
3. **Resend / SendGrid**: Instala el SDK y envía emails desde una API Route

---

## Despliegue

```bash
# Build de producción
npm run build

# Servir localmente
npm start
```

**Vercel** (recomendado para Next.js):
```bash
npx vercel
```

**Exportación estática** (para hosting tradicional):
Descomenta `output: 'export'` en `next.config.js`, luego:
```bash
npm run build
# Los archivos estáticos estarán en /out
```

---

## Para desarrolladores

- **TypeScript strict** habilitado
- **i18n** con middleware de Next.js: detección automática + cookie de preferencia
- **CSS Modules** para scoped styles (sin conflictos)
- **Design tokens** centralizados en `lib/tokens.ts` y CSS variables
- **Componentes desacoplados** del contenido (separación total vía `useContent()`)
- **Hooks personalizados** en `lib/hooks.ts`
- **Barrel exports** en `components/index.ts`
- Responsive con breakpoints: 1024px, 768px, 480px
- URLs: `/es` y `/en` (SEO-friendly, indexables por separado)
