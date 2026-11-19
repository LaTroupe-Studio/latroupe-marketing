import { Locale } from "@/lib/i18n";

/**
 * Copy for the latroupe(hospitality) page: what the studio does as a partner
 * of hotel groups, owners and the design studios that work for them.
 *
 * DRAFT: the copy is a first proposal to be reviewed by the team before the
 * page is linked from the header or added to the sitemap.
 */

export type PartnerIconName = "chain" | "owner" | "studio";

export interface HospitalityContent {
  meta: { title: string; description: string };
  hero: {
    rotatingWords: string[];
    suffix: string;
    description: string;
    cta: string;
  };
  /** Deep blue band right under the hero. */
  intro: { eyebrow: string; headline: string; text: string };
  /** What latroupe() does for a hotel project, staggered across the grid. */
  role: { eyebrow: string; headline: string; intro: string; items: { title: string; text: string }[] };
  /** The three kinds of partner the studio works with. */
  /**
   * The three kinds of partner, shown like the home's methodology: a pinned
   * sequence that steps through them as the page scrolls, each with its own
   * animated icon (see PartnerIcon).
   */
  partners: {
    headline: string;
    /** Small mono line resting above the rule, on the left. */
    lead: string;
    /** Bold statement on the right. */
    intro: string;
    items: { icon: PartnerIconName; title: string; subtitle: string; text: string[] }[];
  };
  /** Where the studio comes in along the life of a hotel. */
  lifecycle: { eyebrow: string; headline: string; intro: string; steps: { label: string; text: string }[] };
  /** How technology protects margins: the argument, then the levers. */
  tech: { eyebrow: string; headline: string; intro: string; levers: { title: string; text: string }[] };
  /** specbook and specbook procurement, with real captures from /images/tech. */
  tools: {
    eyebrow: string;
    headline: string;
    intro: string;
    /** Link to the latroupe(tech) page. */
    more: string;
    /**
     * `anchor` is the tool's section on the latroupe(tech) page, `link` the
     * label of the link that goes there.
     */
    items: { name: string; badge?: string; title: string; text: string; points: string[]; image: string; path: string; anchor: string; link: string }[];
  };
  /** Hotel projects already worked on. */
  projects: {
    eyebrow: string;
    headline: string;
    items: { title: string; brand: string; location: string; image: string }[];
    /** Axonometric drawings from the projects page, set among the photos. */
    drawings: { src: string; alt: string }[];
  };
  /** Hotel brands the studio has worked for (logos already in /images/logos). */
  brands: { headline: string; logos: { name: string; src: string }[] };
}

const LOGOS = [
  { name: "Hyatt", src: "/images/logos/hyatt.svg" },
  { name: "Marriott", src: "/images/logos/marriott.svg" },
  { name: "Accor", src: "/images/logos/accor.svg" },
  { name: "M Gallery", src: "/images/logos/m-gallery.svg" },
  { name: "Radisson Hotels", src: "/images/logos/radisson.svg" },
];

const es: HospitalityContent = {
  meta: {
    title: "latroupe() hospitality · Partners técnicos para cadenas hoteleras",
    description:
      "Acompañamos a cadenas hoteleras, propietarios y estudios de diseño en todo el ciclo de un hotel: estándares de marca, desarrollo técnico, BIM, FF&E, procurement y tecnología propia para proteger el margen.",
  },
  hero: {
    rotatingWords: ["tecnifica", "coordina", "equipa", "renueva", "abre"],
    suffix: "tu hotel",
    description:
      "Somos el partner técnico de cadenas hoteleras, propietarios y estudios de diseño. Hacemos que cada hotel llegue a su apertura fiel a la marca, a tiempo y sin sorpresas.",
    cta: "Hablemos de tu hotel",
  },
  intro: {
    eyebrow: "Hospitality",
    headline: "Un hotel es una marca que se puede tocar",
    text:
      "Cada habitación, cada lobby y cada restaurante tienen que contar la misma historia que la marca, cumplir sus estándares y funcionar desde el primer huésped. Ahí es donde entramos: traducimos la visión de la cadena y del diseñador en un proyecto construible, coordinado y medible.",
  },
  role: {
    eyebrow: "Nuestro papel",
    headline: "Lo que aportamos a cada proyecto hotelero",
    intro:
      "Nos integramos en el equipo del proyecto, ya sea del lado de la marca, de la propiedad o del estudio de diseño, y asumimos la parte técnica que hace que el diseño llegue intacto a la obra.",
    items: [
      {
        title: "Estándares de marca",
        text: "Conocemos los brand standards de las grandes cadenas y los aplicamos desde el primer plano: dimensiones, acabados, accesibilidad y requisitos de operación.",
      },
      {
        title: "Desarrollo técnico",
        text: "Llevamos el concepto hasta el proyecto ejecutivo: planos, detalles constructivos y documentación lista para licitar y construir.",
      },
      {
        title: "Coordinación BIM",
        text: "Un único modelo coordinado entre arquitectura, interiorismo e instalaciones. Menos conflictos en obra y decisiones tomadas con datos.",
      },
      {
        title: "FF&E y especificación",
        text: "Especificamos mobiliario, acabados y equipamiento habitación por habitación, con nuestras propias herramientas para que nada se pierda entre versiones.",
      },
    ],
  },
  partners: {
    headline: "Con quién trabajamos",
    lead: "Nos sentamos en cualquier lado de la mesa:",
    intro: "Sea quien sea quien nos llame, el objetivo es el mismo: que el hotel abra como se diseñó, fiel a la marca y dentro del presupuesto.",
    items: [
      {
        icon: "chain",
        title: "Cadenas y operadores",
        subtitle: "(la marca)",
        text: [
          "Velamos por que cada apertura y cada renovación cumplan los estándares de la marca, hotel tras hotel.",
          "Somos un interlocutor técnico que habla su idioma y conoce sus revisiones de diseño.",
        ],
      },
      {
        icon: "owner",
        title: "Propietarios y promotores",
        subtitle: "(la inversión)",
        text: [
          "Protegemos la inversión: un proyecto bien documentado reduce cambios en obra, plazos y costes.",
          "Y facilita la aprobación de la marca, para que cada llave empiece a facturar cuanto antes.",
        ],
      },
      {
        icon: "studio",
        title: "Estudios de diseño",
        subtitle: "(el diseño)",
        text: [
          "Ampliamos la capacidad de tu estudio en proyectos hoteleros.",
          "Tú defines el diseño; nosotros lo tecnificamos, lo coordinamos y lo llevamos hasta la obra sin que pierda su intención.",
        ],
      },
    ],
  },
  lifecycle: {
    eyebrow: "Cuándo entramos",
    headline: "En cualquier momento de la vida de un hotel",
    intro: "Podemos acompañar el proyecto de principio a fin o reforzar solo la fase que lo necesite.",
    steps: [
      { label: "Concepto", text: "Viabilidad, programa y encaje de la marca en el edificio." },
      { label: "Aprobación de marca", text: "Documentación para las revisiones de diseño de la cadena." },
      { label: "Proyecto ejecutivo", text: "Desarrollo técnico, detalles y coordinación BIM." },
      { label: "FF&E y compras", text: "Especificación, mediciones y apoyo en la licitación." },
      { label: "Obra", text: "Seguimiento técnico y resolución de dudas en obra." },
      { label: "Apertura y renovación", text: "Habitaciones modelo, PIPs y reposicionamiento de hoteles existentes." },
    ],
  },
  tech: {
    eyebrow: "Tecnología",
    headline: "En un hotel, el margen se gana antes de abrir",
    intro:
      "La inversión en un hotel se mide por llave, y cada semana de retraso es una semana sin facturar. Por eso no nos basta con dibujar bien: usamos tecnología propia para que especificación, presupuesto y compras vivan en un mismo sitio y cada decisión tenga su coste a la vista.",
    levers: [
      {
        title: "Una sola fuente de verdad",
        text: "FF&E, materiales y OS&E por área y por habitación, conectados al modelo de Revit. Lo que se especifica es lo que se presupuesta y lo que se compra.",
      },
      {
        title: "El coste, siempre a la vista",
        text: "El presupuesto se suma solo a partir de las specs. Un cambio de acabado o de proveedor muestra su impacto antes de aprobarlo, no en la factura.",
      },
      {
        title: "Menos horas sin valor",
        text: "La IA rellena las fichas desde la web del fabricante y el modelo se actualiza sin scripts. El equipo dedica su tiempo a decidir, no a copiar datos.",
      },
    ],
  },
  tools: {
    eyebrow: "Nuestras herramientas",
    headline: "Herramientas que nacen de lo que necesitan nuestros clientes",
    intro: "No partimos de un software genérico. Cada herramienta la hemos desarrollado nosotros para resolver un problema real que nos encontrábamos en los hoteles de nuestros clientes, y la seguimos mejorando con ellos.",
    more: "Conoce latroupe tech",
    items: [
      {
        name: "[specbook]",
        title: "La especificación del hotel, viva en el modelo",
        text: "Todo el FF&E y el OS&E del proyecto, habitación por habitación, con imagen, código, estado y precio.",
        points: [
          "Fichas completas en menos de un minuto: la IA lee la web y la ficha técnica del fabricante.",
          "Los cambios se escriben en Revit después de tu revisión, sin scripts.",
          "El presupuesto se calcula solo a partir de las specs y está siempre al día.",
        ],
        image: "/images/tech/specbook/budget.webp",
        path: "specbook / budget",
        anchor: "specbook",
        link: "Ver [specbook] en detalle",
      },
      {
        name: "[specbook] procurement",
        badge: "en desarrollo",
        title: "Las compras, desde las mismas specs",
        text: "Un hotel se amuebla con cientos de piezas de muchos proveedores distintos. Procurement las ordena sin salir de specbook, para que nada llegue tarde a la apertura.",
        points: [
          "Pedidos a cada proveedor con su hoja de pedido y dirección de entrega.",
          "Entregas parciales e incidencias, controladas pieza a pieza.",
          "Toda la conversación con el proveedor junto al pedido.",
        ],
        image: "/images/tech/specbook/deliveries.webp",
        path: "specbook / procurement",
        anchor: "procurement",
        link: "Ver procurement en detalle",
      },
    ],
  },
  projects: {
    eyebrow: "Proyectos",
    headline: "Algunos hoteles en los que hemos colaborado",
    items: [
      {
        title: "ORO Hato Rey",
        brand: "Marriott Autograph Collection",
        location: "San Juan, Puerto Rico",
        image: "/images/projects/collage/ororender.jpg",
      },
      {
        title: "Andaz Turks & Caicos at Grace Bay",
        brand: "Hyatt",
        location: "Grace Bay, Turks and Caicos",
        image: "/images/projects/collage/vista-celosia-2.jpg",
      },
      {
        title: "Radisson Blu Hamburg",
        brand: "Radisson Blu",
        location: "Hamburgo, Alemania",
        image: "/images/projects/collage/radisson-blu-hamburg.webp",
      },
    ],
    drawings: [
      { src: "/images/projects/collage/axo-bar-lounge.png", alt: "Axonometría de un bar lounge de hotel · latroupe()" },
      { src: "/images/projects/collage/axo-closet.png", alt: "Axonometría de un armario de habitación · latroupe()" },
    ],
  },
  brands: { headline: "Marcas hoteleras con las que hemos trabajado", logos: LOGOS },
};

const en: HospitalityContent = {
  meta: {
    title: "latroupe() hospitality · Technical partners for hotel groups",
    description:
      "We support hotel groups, owners and design studios across the whole life of a hotel: brand standards, technical design, BIM, FF&E, procurement and our own technology to protect the margin.",
  },
  hero: {
    rotatingWords: ["details", "coordinates", "fits out", "renovates", "opens"],
    suffix: "your hotel",
    description:
      "We are the technical partner of hotel groups, owners and design studios. We get every hotel to opening day true to the brand, on time and without surprises.",
    cta: "Let's talk about your hotel",
  },
  intro: {
    eyebrow: "Hospitality",
    headline: "A hotel is a brand you can touch",
    text:
      "Every room, lobby and restaurant has to tell the same story as the brand, meet its standards and work from the very first guest. That is where we come in: we turn the vision of the group and the designer into a buildable, coordinated and measurable project.",
  },
  role: {
    eyebrow: "Our role",
    headline: "What we bring to every hotel project",
    intro:
      "We join the project team, whether on the brand's, the owner's or the design studio's side, and take on the technical work that gets the design to site intact.",
    items: [
      {
        title: "Brand standards",
        text: "We know the brand standards of the major groups and apply them from the first drawing: dimensions, finishes, accessibility and operational requirements.",
      },
      {
        title: "Technical design",
        text: "We take the concept through to construction documents: drawings, details and a package ready to tender and build.",
      },
      {
        title: "BIM coordination",
        text: "One model coordinated across architecture, interiors and MEP. Fewer clashes on site and decisions made with data.",
      },
      {
        title: "FF&E and specification",
        text: "We specify furniture, finishes and equipment room by room, with our own tools so nothing gets lost between revisions.",
      },
    ],
  },
  partners: {
    headline: "Who we work with",
    lead: "We sit on any side of the table:",
    intro: "Whoever calls us, the goal is the same: a hotel that opens as it was designed, true to the brand and within budget.",
    items: [
      {
        icon: "chain",
        title: "Hotel groups and operators",
        subtitle: "(the brand)",
        text: [
          "We make sure every opening and every renovation meets the brand standards, hotel after hotel.",
          "We are a technical counterpart who speaks your language and knows your design reviews.",
        ],
      },
      {
        icon: "owner",
        title: "Owners and developers",
        subtitle: "(the investment)",
        text: [
          "We protect the investment: a well documented project means fewer changes on site, tighter programmes and costs.",
          "And an easier brand approval, so every key starts earning as soon as possible.",
        ],
      },
      {
        icon: "studio",
        title: "Design studios",
        subtitle: "(the design)",
        text: [
          "We expand your studio's capacity on hotel projects.",
          "You set the design; we detail it, coordinate it and take it to site without losing its intent.",
        ],
      },
    ],
  },
  lifecycle: {
    eyebrow: "When we come in",
    headline: "At any point in the life of a hotel",
    intro: "We can stay with the project from start to finish, or strengthen just the stage that needs it.",
    steps: [
      { label: "Concept", text: "Feasibility, brief and fitting the brand into the building." },
      { label: "Brand approval", text: "Packages for the group's design reviews." },
      { label: "Technical design", text: "Construction documents, details and BIM coordination." },
      { label: "FF&E and procurement", text: "Specification, schedules and tender support." },
      { label: "Construction", text: "Technical follow-up and answers to site queries." },
      { label: "Opening and renovation", text: "Mock-up rooms, PIPs and repositioning of existing hotels." },
    ],
  },
  tech: {
    eyebrow: "Technology",
    headline: "In a hotel, the margin is won before opening day",
    intro:
      "Hotel investment is measured per key, and every week of delay is a week without revenue. So drawing well is not enough: we use our own technology to keep specification, budget and purchasing in one place, with the cost of every decision in plain sight.",
    levers: [
      {
        title: "One source of truth",
        text: "FF&E, materials and OS&E by area and by room, connected to the Revit model. What gets specified is what gets budgeted and what gets bought.",
      },
      {
        title: "Cost, always in sight",
        text: "The budget adds itself up from the specs. A change of finish or supplier shows its impact before it is approved, not on the invoice.",
      },
      {
        title: "Fewer hours without value",
        text: "AI fills in the specs from the maker's website and the model updates with no scripts. The team spends its time deciding, not copying data.",
      },
    ],
  },
  tools: {
    eyebrow: "Our tools",
    headline: "Tools born from what our clients need",
    intro: "We didn't start from off-the-shelf software. We built each tool ourselves to solve a real problem we kept running into on our clients' hotels, and we keep refining it with them.",
    more: "Discover latroupe tech",
    items: [
      {
        name: "[specbook]",
        title: "The hotel's specification, live in the model",
        text: "All the project's FF&E and OS&E, room by room, with image, code, status and price.",
        points: [
          "Complete specs in under a minute: AI reads the maker's website and data sheet.",
          "Changes are written to Revit after your review, with no scripts.",
          "The budget is calculated from the specs and is always up to date.",
        ],
        image: "/images/tech/specbook/budget.webp",
        path: "specbook / budget",
        anchor: "specbook",
        link: "See [specbook] in detail",
      },
      {
        name: "[specbook] procurement",
        badge: "in development",
        title: "Purchasing, from the same specs",
        text: "A hotel is furnished with hundreds of pieces from many different suppliers. Procurement keeps them in order without leaving specbook, so nothing arrives late for opening.",
        points: [
          "Orders to each supplier with their order sheet and delivery address.",
          "Partial deliveries and issues, tracked piece by piece.",
          "The whole supplier conversation next to the order.",
        ],
        image: "/images/tech/specbook/deliveries.webp",
        path: "specbook / procurement",
        anchor: "procurement",
        link: "See procurement in detail",
      },
    ],
  },
  projects: {
    eyebrow: "Projects",
    headline: "Some of the hotels we have worked on",
    items: [
      {
        title: "ORO Hato Rey",
        brand: "Marriott Autograph Collection",
        location: "San Juan, Puerto Rico",
        image: "/images/projects/collage/ororender.jpg",
      },
      {
        title: "Andaz Turks & Caicos at Grace Bay",
        brand: "Hyatt",
        location: "Grace Bay, Turks and Caicos",
        image: "/images/projects/collage/vista-celosia-2.jpg",
      },
      {
        title: "Radisson Blu Hamburg",
        brand: "Radisson Blu",
        location: "Hamburg, Germany",
        image: "/images/projects/collage/radisson-blu-hamburg.webp",
      },
    ],
    drawings: [
      { src: "/images/projects/collage/axo-bar-lounge.png", alt: "Axonometric of a hotel bar lounge · latroupe()" },
      { src: "/images/projects/collage/axo-closet.png", alt: "Axonometric of a guest room wardrobe · latroupe()" },
    ],
  },
  brands: { headline: "Hotel brands we have worked with", logos: LOGOS },
};

export function getHospitalityContent(locale: Locale): HospitalityContent {
  return locale === "en" ? en : es;
}
