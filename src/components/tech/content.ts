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
    title: "latroupe(tech) · Tools for architecture and interior design studios",
    description:
      "[specbook], [specto] and design tracker: the tools we use on our own projects, now for your studio.",
  },
  hero: {
    rotatingWords: ["checks", "specifies", "automates", "builds"],
    suffix: "for your studio",
    description: "The tools we use on our own projects, now for your team.",
    demo: "request a demo",
    screens: heroScreens,
  },
  requestDemo: "request a demo",
  intro: {
    eyebrow: "latroupe(tech)",
    headline: "the product arm of",
    text: "We use technology, and AI, where it really helps: on the tasks that took hours on every project without adding value. That is where our tools come from. We try them on our own projects first and now make them available to everyone.",
  },
  specbook: {
    eyebrow: "[specbook]",
    headline: "the specification, live in the model",
    intro: "FF&E, materials and OS&E by area and room, connected to Revit with no scripts.",
    features: [
      { title: "specify", text: "Every spec in the project, with its image, code and status.", from: 0 },
      { title: "fill with AI", tag: "Claude", text: "Paste the maker's URL and AI reads its website and data sheet: reference, sizes, finishes, price and images. You just review and approve.", from: 1 },
      { title: "apply to Revit", text: "Review the changes and write them to the model, no scripts.", from: 4 },
      { title: "budget", text: "The budget adds itself up from the specs.", from: 5 },
    ],
    screens: [
      {
        src: `${IMG}/gallery.webp`, tab: "gallery", path: "specbook / schedule",
        callouts: [
          { x: 8.5, y: 41.6, title: "cards with images", text: "Every spec with its code, status and photo." },
        ],
      },
      {
        src: `${IMG}/url-filled.webp`, tab: "AI", path: "specbook / new spec",
        callouts: [
          { x: 50, y: 54, title: "paste the URL", text: "Just the product link on the maker's website." },
        ],
      },
      {
        src: `${IMG}/extracting.webp`, tab: "AI", path: "specbook / schedule",
        callouts: [
          { x: 50, y: 51, title: "AI reads it", text: "The maker's website and the PDF data sheet, in under a minute." },
        ],
      },
      {
        src: `${IMG}/spec.webp`, tab: "spec", path: "specbook / spec",
        callouts: [
          { x: 75, y: 67, title: "full spec", text: "Reference, sizes, finishes, price and images, ready to review." },
        ],
      },
      {
        src: `${IMG}/revit-review.webp`, tab: "Revit", path: "specbook / apply to revit",
        callouts: [
          { x: 74.8, y: 92, title: "you decide", text: "Review and apply only what you want." },
        ],
      },
      {
        src: `${IMG}/budget.webp`, tab: "budget", path: "specbook / budget",
        callouts: [
          { x: 6.5, y: 23.5, title: "budget", text: "It adds itself up from the specs." },
        ],
      },
    ],
  },
  specto: {
    eyebrow: "[specto]",
    headline: "your model, checked against the standard",
    intro: "Turns regulations, brand books and BEPs into automatic checks on Revit or IFC.",
    features: [
      { title: "analyse", text: "Upload the PDF and AI extracts the rules that can be checked.", from: 0 },
      { title: "verify", text: "The rules run on the model and failures are flagged.", from: 2 },
      { title: "certify", text: "A signed report with the standard's version and the project stage.", from: 4 },
    ],
    demo: {
      crumb: "Tools",
      tabs: ["rules", "validation", "reports"],
      validate: "validate model",
      doc: "brand_standards_v3.2.pdf",
      cols: { rules: ["ID", "Rule", "Category", "Source"], checks: ["Category", "Checks", "Result"] },
      rules: [
        { id: "R-01", text: "Minimum guestroom clear height of 2.60 m", cat: "geometry", page: "p. 12" },
        { id: "R-02", text: "Door families from the approved catalogue only", cat: "components", page: "p. 18" },
        { id: "R-03", text: "FF&E finishes from the brand catalogue", cat: "materials", page: "p. 24" },
        { id: "R-04", text: "View naming as per the BEP", cat: "annotation", page: "p. 31" },
        { id: "R-05", text: "90 cm clear width at accessible doors", cat: "compliance", page: "p. 40" },
      ],
      extracting: "extracting rules",
      checks: [
        { label: "Geometry", count: 42, issues: 0 },
        { label: "Components", count: 18, issues: 3 },
        { label: "Materials", count: 128, issues: 0 },
        { label: "Annotation", count: 96, issues: 0 },
      ],
      ok: "ok",
      issues: (n) => (n === 1 ? "1 exception" : `${n} exceptions`),
      checking: "checking",
      waiting: "queued",
      compliance: "compliance",
      report: { title: "Validation report", meta: "v3.2 · concept design · 22 Nov 2026", signed: "signed by [specto]" },
      agent: "agent online",
      connect: "connect revit",
      notes: [
        { x: 78, y: 46.5, title: "rules from the PDF", text: "Each rule with its category and the page it comes from." },
        { x: 83, y: 55, title: "exceptions", text: "What fails, flagged in the model." },
        { x: 82, y: 45, title: "signed report", text: "With the standard's version and the stage." },
      ],
    },
  },
  tracker: {
    eyebrow: "design tracker",
    headline: "every query, with an owner and a date",
    intro: "The project's design queries in one register, and a portal for each company.",
    features: [
      { title: "log", text: "Every query with its chapter, owner and due date.", from: 0 },
      { title: "answer", text: "People reply straight from their email and the answer syncs to the register.", from: 1 },
      { title: "publish", text: "Each company sees only its own queries in its own portal.", from: 2 },
    ],
    screens: [
      {
        src: "/images/tech/tracker/tracker-register.webp", tab: "register", path: "design-tracker",
        callouts: [
          { x: 73.2, y: 38.7, title: "due dates", text: "Overdue items stand out at once." },
        ],
      },
      {
        src: "/images/tech/tracker/tracker-item.webp", tab: "query", path: "design-tracker",
        callouts: [
          { x: 34, y: 46.4, title: "from email", text: "Every reply lands in the history, signed and dated." },
        ],
      },
      {
        src: "/images/tech/tracker/tracker-portal.webp", tab: "portal", path: "portal",
        callouts: [
          { x: 30, y: 42.4, title: "only their own", text: "Each company sees only its queries." },
        ],
      },
    ],
  },
  soon: {
    eyebrow: "coming soon",
    headline: "[specbook] procurement",
    text: "The project's purchasing, from the same specs.",
    points: [
      "Orders to each supplier with their order sheet and delivery address.",
      "Partial deliveries and issues, tracked piece by piece.",
      "The whole supplier conversation next to the order.",
    ],
    badge: "in development",
    src: `${IMG}/deliveries.webp`,
    path: "specbook / procurement",
  },
  manifesto: {
    eyebrow: "our AI manifesto",
    headline: "we work with AI, people decide",
    intro:
      "For us technology is a vehicle that runs through every layer of latroupe(): our projects, our processes and the way we run the studio. That is why we keep researching new products and build our own tools, funded by the studio, because it is how we add more value.",
    blocks: [
      {
        title: "how we use AI",
        text: "At every stage: reading regulations and briefs, specification, technical documentation, model review and management. Every deliverable is checked by someone on the team before it reaches the client.",
      },
      {
        title: "ongoing training",
        text: "The whole team stays current with Claude, Autodesk and Forma. Training is part of how we work and the studio pays for it.",
      },
      {
        title: "our commitment",
        text: "Every AI-assisted process has a named owner. We work with checkpoints, not black boxes, and we explain how we do it.",
      },
    ],
    never: {
      title: "what we don't do",
      items: [
        "We don't put confidential client data into public models without consent.",
        "We don't deliver proposals, estimates or drawings without human review.",
        "We don't promise results we cannot measure.",
      ],
    },
    partner: "latroupe() is an official Anthropic partner.",
  },
};

export function getTechContent(locale: Locale): TechContent {
  return locale === "en" ? en : es;
}
