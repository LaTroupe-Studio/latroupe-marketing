import { Locale } from "@/lib/i18n";

/**
 * Copy for the latroupe(tech) page. It lives apart from SiteContent, like the
 * bim-consultancy landing, because no other page reads it.
 *
 * The specbook screens are real captures from the product. The [specto] and
 * design tracker rows are example data: they only exist so the animated
 * mock-ups read as a working screen until real captures replace them.
 */


/** A point on a screenshot, in % of its width and height, with its note. */
export interface Callout { x: number; y: number; title: string; text: string }

export interface Screen { src: string; tab: string; path: string; callouts: Callout[] }

/** One item of a feature list; `from` is the demo frame it switches to. */
export interface Feature { title: string; text: string; from: number; tag?: string }

/** Text of the recreated [specto] screen (there are no captures of it yet). */
export interface SpectoDemoCopy {
  crumb: string;
  tabs: [string, string, string];
  validate: string;
  doc: string;
  cols: { rules: [string, string, string, string]; checks: [string, string, string] };
  rules: { id: string; text: string; cat: string; page: string }[];
  extracting: string;
  checks: { label: string; count: number; issues: number }[];
  ok: string;
  issues: (n: number) => string;
  checking: string;
  waiting: string;
  compliance: string;
  report: { title: string; meta: string; signed: string };
  agent: string;
  connect: string;
  notes: Callout[];
}

interface ToolHead { eyebrow: string; headline: string; intro: string }

export interface TechContent {
  meta: { title: string; description: string };
  hero: {
    rotatingWords: string[];
    suffix: string;
    description: string;
    demo: string;
    /** Real specbook screens cycled behind the hero text. */
    screens: { src: string; label: string }[];
  };
  /** Label of the demo buttons and links. */
  requestDemo: string;
  /** Short introduction under the hero, with an index of the products. */
  intro: {
    eyebrow: string;
    /** Headline; the wordmark is drawn after it, so it ends on "de" / "of". */
    headline: string;
    text: string;
  };
  /** One real screen per feature, in the same order. */
  specbook: ToolHead & { features: Feature[]; screens: Screen[] };
  specto: ToolHead & { features: Feature[]; demo: SpectoDemoCopy };
  /** One real screen per feature, in the same order. */
  tracker: ToolHead & { features: Feature[]; screens: Screen[] };
  /** "Coming soon" teaser for specbook procurement. */
  soon: { eyebrow: string; headline: string; text: string; points: string[]; badge: string; src: string; path: string };
  /** AI manifesto: how latroupe() works with AI, technology and training. */
  manifesto: {
    eyebrow: string;
    headline: string;
    intro: string;
    blocks: { title: string; text: string }[];
    never: { title: string; items: string[] };
    /** Closing line under the manifesto. */
    partner: string;
  };
}

const IMG = "/images/tech/specbook";

const heroScreens = [
  { src: `${IMG}/gallery.webp`, label: "specbook" },
  { src: `${IMG}/revit-review.webp`, label: "specbook" },
  { src: `${IMG}/schedule.webp`, label: "specbook" },
  { src: `${IMG}/budget.webp`, label: "specbook" },
];

const es: TechContent = {
  meta: {
    title: "latroupe(tech) · Herramientas para estudios de arquitectura e interiorismo",
    description:
      "[specbook], [specto] y design tracker: las herramientas que usamos en nuestros proyectos, ahora para tu estudio.",
  },
  hero: {
    rotatingWords: ["verifica", "especifica", "automatiza", "construye"],
    suffix: "para tu estudio",
    description: "Las herramientas que usamos en nuestros proyectos, ahora para tu equipo.",
    demo: "solicitar una demo",
    screens: heroScreens,
  },
  requestDemo: "solicitar una demo",
  intro: {
    eyebrow: "latroupe(tech)",
    headline: "el área de producto de",
    text: "Usamos la tecnología, y la IA, donde de verdad aporta: en las tareas que nos quitaban horas en cada proyecto sin añadir valor. De ahí nacen nuestras herramientas. Las probamos primero en nuestros proyectos y ahora las ponemos al alcance de todos.",
  },
  specbook: {
    eyebrow: "[specbook]",
    headline: "la especificación, viva en el modelo",
    intro: "FF&E, materiales y OS&E por área y habitación, conectados a Revit sin scripts.",
    features: [
      { title: "especifica", text: "Todas las specs del proyecto, con imagen, código y estado.", from: 0 },
      { title: "rellena con IA", tag: "Claude", text: "Pegas la URL del fabricante y la IA lee su web y la ficha técnica: referencia, medidas, acabados, precio e imágenes. Tú solo revisas y apruebas.", from: 1 },
      { title: "aplica a Revit", text: "Revisas los cambios y se escriben en el modelo, sin scripts.", from: 4 },
      { title: "presupuesta", text: "El presupuesto se suma solo a partir de las specs.", from: 5 },
    ],
    screens: [
      {
        src: `${IMG}/gallery.webp`, tab: "galería", path: "specbook / schedule",
        callouts: [
          { x: 8.5, y: 41.6, title: "fichas con imagen", text: "Cada spec con su código, su estado y su foto." },
        ],
      },
      {
        src: `${IMG}/url-filled.webp`, tab: "IA", path: "specbook / new spec",
        callouts: [
          { x: 50, y: 54, title: "pegas la URL", text: "Solo el enlace del producto en la web del fabricante." },
        ],
      },
      {
        src: `${IMG}/extracting.webp`, tab: "IA", path: "specbook / schedule",
        callouts: [
          { x: 50, y: 51, title: "la IA lee", text: "La web del fabricante y la ficha técnica en PDF, en menos de un minuto." },
        ],
      },
      {
        src: `${IMG}/spec.webp`, tab: "ficha", path: "specbook / spec",
        callouts: [
          { x: 75, y: 67, title: "ficha completa", text: "Referencia, medidas, acabados, precio e imágenes, listos para revisar." },
        ],
      },
      {
        src: `${IMG}/revit-review.webp`, tab: "Revit", path: "specbook / apply to revit",
        callouts: [
          { x: 74.8, y: 92, title: "tú decides", text: "Revisas y aplicas solo lo que quieres." },
        ],
      },
      {
        src: `${IMG}/budget.webp`, tab: "presupuesto", path: "specbook / budget",
        callouts: [
          { x: 6.5, y: 23.5, title: "presupuesto", text: "Se suma solo a partir de las specs." },
        ],
      },
    ],
  },
  specto: {
    eyebrow: "[specto]",
    headline: "tu modelo, revisado contra el estándar",
    intro: "Convierte normativas, brand books y BEP en comprobaciones automáticas sobre Revit o IFC.",
    features: [
      { title: "analiza", text: "Sube el PDF y la IA extrae las reglas que se pueden comprobar.", from: 0 },
      { title: "verifica", text: "Las reglas se comprueban sobre el modelo y los fallos quedan marcados.", from: 2 },
      { title: "certifica", text: "Un reporte firmado con la versión del estándar y la fase del proyecto.", from: 4 },
    ],
    demo: {
      crumb: "Herramientas",
      tabs: ["reglas", "validación", "reportes"],
      validate: "validar modelo",
      doc: "brand_standards_v3.2.pdf",
      cols: { rules: ["ID", "Regla", "Categoría", "Fuente"], checks: ["Categoría", "Checks", "Resultado"] },
      rules: [
        { id: "R-01", text: "Altura libre mínima en habitación de 2,60 m", cat: "geometría", page: "p. 12" },
        { id: "R-02", text: "Solo familias de puerta del catálogo autorizado", cat: "componentes", page: "p. 18" },
        { id: "R-03", text: "Acabados FF&E según el catálogo de marca", cat: "materiales", page: "p. 24" },
        { id: "R-04", text: "Nomenclatura de vistas según el BEP", cat: "anotación", page: "p. 31" },
        { id: "R-05", text: "Paso libre de 90 cm en puertas accesibles", cat: "compliance", page: "p. 40" },
      ],
      extracting: "extrayendo reglas",
      checks: [
        { label: "Geometría", count: 42, issues: 0 },
        { label: "Componentes", count: 18, issues: 3 },
        { label: "Materiales", count: 128, issues: 0 },
        { label: "Anotación", count: 96, issues: 0 },
      ],
      ok: "ok",
      issues: (n) => (n === 1 ? "1 excepción" : `${n} excepciones`),
      checking: "comprobando",
      waiting: "en cola",
      compliance: "cumplimiento",
      report: { title: "Reporte de validación", meta: "v3.2 · diseño básico · 22 nov 2026", signed: "firmado por [specto]" },
      agent: "agente online",
      connect: "conectar revit",
      notes: [
        { x: 78, y: 46.5, title: "reglas del PDF", text: "Cada regla con su categoría y la página de donde sale." },
        { x: 83, y: 55, title: "excepciones", text: "Lo que no cumple, marcado en el modelo." },
        { x: 82, y: 45, title: "reporte firmado", text: "Con la versión del estándar y la fase." },
      ],
    },
  },
  tracker: {
    eyebrow: "design tracker",
    headline: "cada pregunta, con responsable y fecha",
    intro: "Las design queries del proyecto en un registro, y un portal para cada empresa.",
    features: [
      { title: "registra", text: "Cada pregunta con capítulo, responsable y fecha límite.", from: 0 },
      { title: "responde", text: "Contestan directamente desde el correo y la respuesta se sincroniza en el registro.", from: 1 },
      { title: "publica", text: "Cada empresa ve solo sus preguntas en su propio portal.", from: 2 },
    ],
    screens: [
      {
        src: "/images/tech/tracker/tracker-register.webp", tab: "registro", path: "design-tracker",
        callouts: [
          { x: 73.2, y: 38.7, title: "fechas límite", text: "Lo atrasado se ve al momento." },
        ],
      },
      {
        src: "/images/tech/tracker/tracker-item.webp", tab: "consulta", path: "design-tracker",
        callouts: [
          { x: 34, y: 46.4, title: "desde el correo", text: "Cada respuesta queda en el histórico, firmada y con fecha." },
        ],
      },
      {
        src: "/images/tech/tracker/tracker-portal.webp", tab: "portal", path: "portal",
        callouts: [
          { x: 30, y: 42.4, title: "solo lo suyo", text: "Cada empresa ve únicamente sus preguntas." },
        ],
      },
    ],
  },
  soon: {
    eyebrow: "próximamente",
    headline: "[specbook] procurement",
    text: "Las compras del proyecto, desde las mismas specs.",
    points: [
      "Pedidos a cada proveedor con su hoja de pedido y dirección de entrega.",
      "Entregas parciales e incidencias, controladas pieza a pieza.",
      "Toda la conversación con el proveedor junto al pedido.",
    ],
    badge: "en desarrollo",
    src: `${IMG}/deliveries.webp`,
    path: "specbook / procurement",
  },
  manifesto: {
    eyebrow: "nuestro manifiesto de IA",
    headline: "trabajamos con IA, decidimos con personas",
    intro:
      "Para nosotros la tecnología es un vehículo que atraviesa todas las capas de latroupe(): los proyectos, los procesos y la forma de gestionar el estudio. Por eso investigamos producto nuevo constantemente y desarrollamos nuestras propias herramientas, financiadas por el estudio, porque es nuestra forma de aportar más valor.",
    blocks: [
      {
        title: "cómo usamos la IA",
        text: "En todas las fases: lectura de normativa y pliegos, especificación, documentación técnica, revisión de modelos y gestión. Cada entregable lo revisa una persona del equipo antes de llegar al cliente.",
      },
      {
        title: "formación continua",
        text: "Todo el equipo está al día en Claude, Autodesk y Forma. La formación forma parte de cómo trabajamos y la financia el estudio.",
      },
      {
        title: "nuestro compromiso",
        text: "Cada proceso asistido por IA tiene un responsable con nombre. Trabajamos con puntos de control, no con cajas negras, y explicamos cómo lo hacemos.",
      },
    ],
    never: {
      title: "lo que no hacemos",
      items: [
        "No introducimos datos confidenciales de clientes en modelos públicos sin su consentimiento.",
        "No entregamos propuestas, estimaciones ni planos sin validación humana.",
        "No prometemos resultados que no podemos medir.",
      ],
    },
    partner: "latroupe() es Partner oficial de Anthropic.",
  },
};

const en: TechContent = {
  meta: {
    title: "latroupe(tech) · Software for architecture and interior design studios",
    description:
      "[specbook], [specto] and design tracker: the tools we built for our own projects, now ready for your studio.",
  },
  hero: {
    rotatingWords: ["checks", "specifies", "automates", "builds"],
    suffix: "so you don't have to",
    description: "We built these tools for our own projects. Now your team can use them too.",
    demo: "book a demo",
    screens: heroScreens,
  },
  requestDemo: "book a demo",
  intro: {
    eyebrow: "latroupe(tech)",
    headline: "the product side of",
    text: "We use technology, AI included, where it actually earns its keep: on the jobs that ate up hours on every project and added nothing. That's where our tools come from. We road-test them on our own projects first, and now we're opening them up to everyone.",
  },
  specbook: {
    eyebrow: "[specbook]",
    headline: "your spec, living in the model",
    intro: "FF&E, materials and OS&E by area and room, synced with Revit. No scripts.",
    features: [
      { title: "specify", text: "Every spec on the project in one place, with its image, code and status.", from: 0 },
      { title: "autofill with AI", tag: "Claude", text: "Paste a product link and AI reads the manufacturer's site and data sheet, pulling in the reference, dimensions, finishes, price and images. All you do is check and approve.", from: 1 },
      { title: "push to Revit", text: "Review the changes and they go straight into the model. No scripts.", from: 4 },
      { title: "budget", text: "The budget totals itself up from your specs.", from: 5 },
    ],
    screens: [
      {
        src: `${IMG}/gallery.webp`, tab: "gallery", path: "specbook / schedule",
        callouts: [
          { x: 8.5, y: 41.6, title: "a visual schedule", text: "Each spec with its code, status and photo." },
        ],
      },
      {
        src: `${IMG}/url-filled.webp`, tab: "AI", path: "specbook / new spec",
        callouts: [
          { x: 50, y: 54, title: "paste a link", text: "Just the product page on the manufacturer's site." },
        ],
      },
      {
        src: `${IMG}/extracting.webp`, tab: "AI", path: "specbook / schedule",
        callouts: [
          { x: 50, y: 51, title: "AI does the reading", text: "The manufacturer's site and the PDF data sheet, in under a minute." },
        ],
      },
      {
        src: `${IMG}/spec.webp`, tab: "spec", path: "specbook / spec",
        callouts: [
          { x: 75, y: 67, title: "spec complete", text: "Reference, dimensions, finishes, price and images, ready for review." },
        ],
      },
      {
        src: `${IMG}/revit-review.webp`, tab: "Revit", path: "specbook / apply to revit",
        callouts: [
          { x: 74.8, y: 92, title: "your call", text: "Pick what goes into the model and leave the rest." },
        ],
      },
      {
        src: `${IMG}/budget.webp`, tab: "budget", path: "specbook / budget",
        callouts: [
          { x: 6.5, y: 23.5, title: "budget", text: "Totals itself up from the specs." },
        ],
      },
    ],
  },
  specto: {
    eyebrow: "[specto]",
    headline: "your model, checked against the standards",
    intro: "Turns regulations, brand standards and BEPs into automated checks on Revit or IFC models.",
    features: [
      { title: "analyse", text: "Upload the PDF and AI pulls out every rule that can be checked.", from: 0 },
      { title: "check", text: "The rules run against the model and anything that fails gets flagged.", from: 2 },
      { title: "certify", text: "A signed report stating the version of the standard and the project stage.", from: 4 },
    ],
    demo: {
      crumb: "Tools",
      tabs: ["rules", "validation", "reports"],
      validate: "validate model",
      doc: "brand_standards_v3.2.pdf",
      cols: { rules: ["ID", "Rule", "Category", "Source"], checks: ["Category", "Checks", "Result"] },
      rules: [
        { id: "R-01", text: "Min. guestroom ceiling height of 2600 mm", cat: "geometry", page: "p. 12" },
        { id: "R-02", text: "Door families from the approved catalogue only", cat: "components", page: "p. 18" },
        { id: "R-03", text: "FF&E finishes to brand catalogue", cat: "materials", page: "p. 24" },
        { id: "R-04", text: "View names to follow BEP convention", cat: "annotation", page: "p. 31" },
        { id: "R-05", text: "900 mm clear opening at accessible doors", cat: "compliance", page: "p. 40" },
      ],
      extracting: "extracting rules",
      checks: [
        { label: "Geometry", count: 42, issues: 0 },
        { label: "Components", count: 18, issues: 3 },
        { label: "Materials", count: 128, issues: 0 },
        { label: "Annotation", count: 96, issues: 0 },
      ],
      ok: "ok",
      issues: (n) => (n === 1 ? "1 issue" : `${n} issues`),
      checking: "checking",
      waiting: "queued",
      compliance: "compliance",
      report: { title: "Validation report", meta: "v3.2 · concept design · 22 Nov 2026", signed: "signed by [specto]" },
      agent: "agent online",
      connect: "connect revit",
      notes: [
        { x: 78, y: 46.5, title: "rules from the PDF", text: "Each rule tagged with its category and source page." },
        { x: 83, y: 55, title: "issues", text: "Anything that fails, flagged in the model." },
        { x: 82, y: 45, title: "signed report", text: "Stamped with the standard version and project stage." },
      ],
    },
  },
  tracker: {
    eyebrow: "design tracker",
    headline: "every query has an owner and a deadline",
    intro: "All the project's design queries in one register, with a portal for every firm involved.",
    features: [
      { title: "log", text: "Every query logged with its section, owner and due date.", from: 0 },
      { title: "reply", text: "People answer straight from their inbox and the reply syncs back to the register.", from: 1 },
      { title: "share", text: "Each firm sees only its own queries, in its own portal.", from: 2 },
    ],
    screens: [
      {
        src: "/images/tech/tracker/tracker-register.webp", tab: "register", path: "design-tracker",
        callouts: [
          { x: 73.2, y: 38.7, title: "due dates", text: "Anything overdue jumps out straight away." },
        ],
      },
      {
        src: "/images/tech/tracker/tracker-item.webp", tab: "query", path: "design-tracker",
        callouts: [
          { x: 34, y: 46.4, title: "reply by email", text: "Every answer is kept in the history, signed and dated." },
        ],
      },
      {
        src: "/images/tech/tracker/tracker-portal.webp", tab: "portal", path: "portal",
        callouts: [
          { x: 30, y: 42.4, title: "just theirs", text: "Each firm only sees the queries meant for them." },
        ],
      },
    ],
  },
  soon: {
    eyebrow: "coming soon",
    headline: "[specbook] procurement",
    text: "Purchasing for the whole project, driven by the same specs.",
    points: [
      "Purchase orders for every supplier, each with its own order sheet and delivery address.",
      "Part deliveries and snags, tracked item by item.",
      "The full supplier thread, right next to the order.",
    ],
    badge: "in the works",
    src: `${IMG}/deliveries.webp`,
    path: "specbook / procurement",
  },
  manifesto: {
    eyebrow: "our AI manifesto",
    headline: "we build with AI. people make the call.",
    intro:
      "Technology runs through every layer of latroupe(): our projects, our processes and the way we run the studio. That's why we're always exploring new products and building our own tools, funded by the studio itself. It's how we add more value.",
    blocks: [
      {
        title: "how we use AI",
        text: "Across every stage: reading regulations and tender documents, specification, technical documentation, model review and project management. Nothing reaches a client without someone on the team checking it first.",
      },
      {
        title: "always learning",
        text: "The whole team keeps up to speed with Claude, Autodesk and Forma. Training is built into how we work, and the studio covers the cost.",
      },
      {
        title: "our commitment",
        text: "Every AI-assisted process has a named person responsible for it. We work with checkpoints, not black boxes, and we're open about how we do it.",
      },
    ],
    never: {
      title: "what we won't do",
      items: [
        "Put confidential client data into public models without their consent.",
        "Send out proposals, estimates or drawings that a person hasn't signed off.",
        "Promise results we can't measure.",
      ],
    },
    partner: "latroupe() is an official Anthropic partner.",
  },
};

export function getTechContent(locale: Locale): TechContent {
  return locale === "en" ? en : es;
}
