# Roadmap de visibilidad (SEO / GEO / captación)

Estado a **13 de septiembre de 2026**. Este documento traduce el informe externo
de Holdmin Growth (*LaTroupe Studio · Análisis de Visibilidad + Roadmap*, mayo
2026, enviado por Toni Masero el 1 de junio) a trabajo concreto sobre este repo:
qué está hecho, qué se ha hecho en esta rama, qué falta y qué depende de una
decisión de negocio que no es técnica.

El contenido que hace falta escribir está separado en
[CONTENIDO_PENDIENTE.md](./CONTENIDO_PENDIENTE.md).

---

## 1. De dónde viene esto

El informe de Holdmin diagnosticaba tres problemas: la web no genera tráfico
propio (sin blog ni contenido indexable), LinkedIn no distribuye a audiencias
nuevas, y no hay ningún mecanismo para capturar a quien llega pero no está listo
para contactar. Puntuaba la web en **34/100** de SEO global y proponía un plan de
seis meses (junio → noviembre) con tres pilares: LinkedIn desde perfiles
personales, SEO + blog + casos de estudio, y captación activa.

## 2. Qué se ejecutó del plan (auditoría sobre `main` y sobre producción)

### Bloque 0 — correcciones urgentes (mes 1). Casi completo

| Acción del informe | Estado |
|---|---|
| `/es/mantenimiento` indexada en Google | ✅ devuelve 404 |
| Title tag con keywords | ✅ aplicado literalmente |
| Meta description | ✅ aplicada casi literalmente |
| `llms.txt` | ✅ existe |
| `robots.txt` no bloquea bots de IA | ✅ |
| Schema `Organization` + `Service` | ✅ en `src/app/[locale]/layout.tsx` |
| `hreflang` ES/EN + canonical | ✅ correctos; el dominio sin `www` redirige 308 |
| `sitemap.xml` | ✅ 10 URLs con alternates |
| **H1 con carga semántica** | ⚠️ pendiente hasta esta rama — ver §4 |
| **100-150 palabras por proyecto (×6)** | ❌ **1 de 6** — ver `CONTENIDO_PENDIENTE.md` |

### Pilar 2 — SEO / blog / casos de estudio. Sin ejecutar

- **No existe blog.** El plan pedía un artículo mensual desde julio; deberían
  existir tres.
- **Los dos casos de estudio prioritarios están vacíos.** En `src/content/es.ts`,
  `rochester-row` y `oro-hato-rey` dicen literalmente «Información del proyecto
  próximamente»; `andaz-turks`, `sant-feliu` y `holbein-gardens` tienen
  `shortDesc: ""` y `longDesc: []`. El informe señalaba **Andaz Turks y Rochester
  Row** como los dos casos a publicar en el mes 2.
- No hay página de hospitality, ni página de servicios independiente de la home.
- Los proyectos no tienen URL propia: viven en un overlay dentro de la home, así
  que no hay nada que pueda posicionar por separado.

### Pilar 3 — captación. Parcial

- El chat («Latty») con `LeadMiniForm` captura leads y es más que el formulario
  único que criticaba el informe.
- No hay lead magnet ni newsletter de nurturing.

### Lo que sí se construyó y no estaba en el plan: `/[locale]/bim-consultancy`

| | Home `/es` | Landing BIM |
|---|---|---|
| Palabras visibles | 541 | **1.673** |
| H1 | wordmark + claim | «Consultoría y Servicios de Modelado BIM» |
| Datos estructurados | Organization, Service | **+ FAQPage con 9 preguntas** |
| `x-default` | ES | **EN** (orientada a Reino Unido) |

Es, hoy, el único activo real de SEO/GEO del dominio, y hace justo lo que pedía
el informe (respuesta directa, FAQs con schema, keywords transaccionales), pero
aplicado a otro vertical.

## 3. La decisión pendiente (no es técnica)

Hay dos estrategias en marcha que no se conocen entre sí:

- **Plan Holdmin:** cuña *hospitality premium* (Hyatt / Marriott / Andaz), motor
  LinkedIn orgánico + casos de estudio, y paid solo en el **mes 5, condicional**,
  LinkedIn retargeting, máximo 400-600 €/mes y únicamente con >200 visitas
  orgánicas al mes.
- **Ejecución real:** cuña *BIM consultancy* orientada a UK, motor **Google Ads**
  gestionado por un tercero desde antes de agosto, con una inversión diaria muy
  por encima de ese techo.

Se activó el canal que el informe puntuaba más bajo y se aparcó el que puntuaba
9/10. Puede ser correcto —el paid da señal en semanas y el orgánico en
trimestres— pero mientras no se elija una de las dos, el roadmap ya no describe
el proyecto y el KPI de «+500 visitas orgánicas al mes 6» no se va a cumplir
porque nadie está trabajando en él.

**Las fases 1-3 de §5 están escritas para que sirvan a las dos opciones**, pero
el orden y el contenido cambian según la respuesta. Es la pregunta a resolver
antes de empezar la fase 1.

## 4. Qué entra en esta rama (`feat-seo-quickwins`)

Solo cambios de código que no dependen de contenido nuevo ni de decisiones de
negocio. Todo verificado sobre el HTML que genera `npm run build`.

| Cambio | Por qué | Ficheros |
|---|---|---|
| **H1 semántico oculto** en la home | El H1 era el wordmark SVG más un claim animado por JS: Googlebot leía aproximadamente «latroupe ( ) contigo». Ahora el H1 abre con «latroupe · apoyo técnico para estudios de arquitectura e interiorismo» (ES) y su equivalente EN, sin tocar el diseño. El wordmark pasa a `aria-hidden` para que los lectores de pantalla no lo lean dos veces. | `Hero.tsx`, `LogoText.tsx`, `content/{types,es,en}.ts`, `globals.css` |
| **`og:image` + Twitter card** en home y landing BIM | No existía ninguna: cada enlace compartido en LinkedIn o WhatsApp se renderizaba como tarjeta sin imagen. LinkedIn es el canal número 1 del plan. **Es un placeholder**: usa una imagen del portfolio hasta que exista una pieza de marca 1200×630. | `[locale]/layout.tsx`, `bim-consultancy/layout.tsx` |
| **`Organization` enriquecido** | Añade `alternateName`, `image` y `knowsAbout` (BIM, Revit, hospitality, workplace, residencial). Es lo que los motores generativos usan para saber de qué puede hablar la marca. | `[locale]/layout.tsx` |
| **`robots.txt`** | El `Sitemap:` apuntaba al dominio sin `www`, que redirige. Además declara explícitamente GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot y Google-Extended. | `public/robots.txt` |
| **`llms.txt`** | No listaba la landing BIM ni ningún proyecto, y usaba el dominio sin `www`. Ahora incluye ambas landings y ocho proyectos de referencia con sector y ubicación: es el contenido que un LLM puede citar. | `public/llms.txt` |
| **`alt` del hero de proyecto** | Pasa de solo el título a «título · ubicación · latroupe». | `ProjectOverlay.tsx` |

Lo que **no** entra y por qué:

- **FAQPage en la home.** Google exige que el schema refleje FAQs visibles en la
  página, así que requiere una sección nueva de diseño y contenido validado. Va a
  la fase 2.
- **Textos de proyectos y casos de estudio.** Son contenido de marca: los escribe
  latroupe, no el repo. Ver `CONTENIDO_PENDIENTE.md`.
- **Blog.** Es una decisión de arquitectura, no un quick win. Fase 2.

## 5. Fases pendientes

Las estimaciones son de desarrollo e ignoran el tiempo de redacción, que está en
`CONTENIDO_PENDIENTE.md`.

### Fase 1 — Contenido sobre la estructura que ya existe (sin dev)

No requiere ni una línea de código: los campos ya están en `src/content/es.ts` y
`en.ts` y el overlay ya los renderiza en el HTML del servidor.

1. Rellenar los cinco proyectos sin texto siguiendo la plantilla de Al Ameen.
2. Convertir Andaz Turks y Rochester Row en casos de estudio completos (reto,
   proceso de integración, fases, resultado).

Efecto: la home pasa de 541 palabras a un orden de magnitud más, con las
keywords del sector en contexto, sin cambiar el diseño.

### Fase 2 — Estructura indexable (dev)

| Trabajo | Estimación | Nota |
|---|---|---|
| Páginas de proyecto con URL propia (`/[locale]/proyectos/[slug]`) | 1-2 días | Requiere fase 1 hecha, si no son páginas vacías. Añade `CreativeWork`/`Project` schema y entradas al sitemap. |
| Sección FAQ visible en la home + `FAQPage` | 0,5-1 día | Reutilizable el patrón ya construido en `bim-consultancy/Faqs.tsx`. |
| Blog (`/[locale]/blog` + `[slug]`, MDX, sitemap dinámico, RSS) | 2-3 días | Decidir antes si el contenido vive en MDX en el repo o en un CMS. |
| Página de hospitality (activo GEO) | 0,5 día + redacción | Solo tiene sentido si la respuesta a §3 es «hospitality». |

### Fase 3 — Captación y nurturing

| Trabajo | Estimación | Nota |
|---|---|---|
| Lead magnet (landing + descarga + entrega por email) | 1-1,5 días | Reutiliza la Lambda de contacto. |
| Newsletter (alta + doble opt-in + secuencia de bienvenida) | 1 día + alta de proveedor | El informe sugiere Brevo o Beehiiv, gratuitos en volumen inicial. |
| CTA secundario en la home | 0,5 día | Depende de que exista el lead magnet o la newsletter. |

## 6. Cómo medir

El informe fija cuatro KPIs a seis meses: +500 visitas orgánicas/mes, +60 % de
alcance en LinkedIn, 150+ contactos en lista propia y aparecer en respuestas de
ChatGPT y Perplexity para consultas de nicho.

Tres de los cuatro no son medibles desde este repo. Antes de la próxima revisión
conviene tener:

- **Google Search Console** con la propiedad `www.latroupestudio.com` verificada
  y el sitemap enviado, para poder medir el orgánico real en vez de estimarlo.
- Una lista cerrada de **15-20 consultas objetivo** para medir la visibilidad en
  motores generativos, aunque se compruebe a mano al principio.

## 7. Deuda técnica detectada de paso

- **`develop` está por detrás de `main`.** `main` tiene el release v0.9.0 y el fix
  de `Methodology` que `develop` no tiene. Conviene sincronizar antes del próximo
  release para no revertir cosas sin querer.
- **`npx vitest run` falla en `lambda/chat/__tests__/parse.test.mjs`** porque
  `@anthropic-ai/sdk` no está instalado en la raíz. Los 47 tests restantes pasan.
  Es previo a esta rama y no la afecta, pero conviene aislar los tests de
  `lambda/` de la suite del sitio.
