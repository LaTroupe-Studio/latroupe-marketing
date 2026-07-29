/**
 * Bilingual copy for the BIM Consultancy landing (/[locale]/bim-consultancy).
 * Kept local to the landing instead of the global dictionary so the page
 * stays self-contained and easy to iterate on.
 */

import { Locale } from "@/lib/i18n";

export interface ConsultancyContent {
  meta: { title: string; description: string };
  header: { cta: string; closeLabel: string };
  hero: { title: string; text: string; cta: string; note: string };
  trust: { eyebrow: string; text: string };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { title: string; text: string }[];
  };
  deliverables: {
    eyebrow: string;
    title: string;
    items: { title: string; text: string }[];
  };
  adapt: {
    title: string;
    subtitle: string;
    items: { title: string; text: string }[];
  };
  riba: {
    eyebrow: string;
    title: string;
    text: string;
    stages: string[];
  };
  standards: {
    eyebrow: string;
    title: string;
    items: { title: string; text: string }[];
    sectorsEyebrow: string;
    sectorsTitle: string;
    sectors: string[];
    sectorsNote: string;
  };
  why: {
    eyebrow: string;
    title: string;
    items: { title: string; text: string }[];
  };
  tools: {
    eyebrow: string;
    title: string;
    text: string;
    items: { name: string; tag: string; img: string }[];
  };
  caseStudy: {
    eyebrow: string;
    title: string;
    imageAlt: string;
    imageCredit: string;
    facts: { label: string; value: string }[];
    intro: string;
    standardsLabel: string;
    standardsList: string;
    whatWeDid: string;
    managementLabel: string;
    management: string[];
    modellingLabel: string;
    modelling: string[];
    resultLabel: string;
    result: string;
  };
  faqs: { title: string; items: { q: string; a: string }[] };
  contact: {
    title: string;
    text: string;
    fields: {
      name: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      project: { label: string; placeholder: string };
      more: { label: string; placeholder: string };
    };
    submit: string;
    sending: string;
    sent: string;
    error: string;
    privacyPre: string;
    privacyLink: string;
    privacyHref: string;
    privacyPost: string;
    privacyExtra: string;
  };
  footer: {
    credit: string;
    workWithUs: { label: string; href: string };
    legal: { label: string; href: string }[];
  };
}

const en: ConsultancyContent = {
  meta: {
    title: "BIM Consulting & Modelling Services · LaTroupe Studio",
    description:
      "Coordinated, data-rich BIM delivered to your standards and your timeline. BIM modelling, coordination, management and consultancy — we plug into your team at any project stage.",
  },
  header: { cta: "let's talk", closeLabel: "Close" },
  hero: {
    title: "BIM Consulting & Modelling Services",
    text: "Coordinated, data-rich BIM, delivered to your standards, and to your timeline. We plug into your team at any project stage and keep you in control of your information from day one.",
    cta: "book a consultation",
    note: "Tell us about your project,\nwe'll reply within one working day.",
  },
  trust: {
    eyebrow: "trusted by leading studios and brands",
    text: "BIM delivered across the UK, Europe and beyond — for studios, contractors and developers.",
  },
  services: {
    eyebrow: "our bim services",
    title: "End-to-end BIM services",
    subtitle: "Pick the ones you need, or let us run the lot.",
    items: [
      {
        title: "BIM Modelling (Revit)",
        text: "Accurate, data-rich Revit models built to your required level of detail (LOD 200–500). Architectural, structural and MEP BIM services, fully coordinated and ready for delivery.",
      },
      {
        title: "BIM Content Creation",
        text: "Custom Revit families, templates and standards libraries — so your models stay consistent and reusable across every project.",
      },
      {
        title: "BIM Management & Information Management",
        text: "A dedicated BIM manager to lead your information delivery — setting up the CDE, naming, and standards so your data stays clean, ordered and auditable.",
      },
      {
        title: "BIM Execution Plan (BEP)",
        text: "We write and maintain your BIM Execution Plan so the whole team works to one agreed method — aligned with the UK BIM Framework from the start.",
      },
      {
        title: "BIM Coordination & Clash Detection",
        text: "Multidiscipline coordination that catches clashes before they reach site.",
      },
      {
        title: "Embedded BIM Support",
        text: "Senior BIM consultants and Revit specialists who work as part of your studio for the length of a project — a true extension of your team, not a faceless production line.",
      },
      {
        title: "BIM Project & Data Management Consultancy",
        text: "From BIM project management consultancy to BIM data management consultancy and digital twin foundations — we keep the information layer of your project under control.",
      },
    ],
  },
  deliverables: {
    eyebrow: "what you get",
    title: "Clear deliverables, agreed up front — you always know exactly what lands.",
    items: [
      { title: "Coordinated Revit models", text: "To your chosen LOD (200 / 300 / 400 / 500)." },
      { title: "Construction & GA drawings", text: "Plans, sections, schematics and risers." },
      { title: "Clash & coordination reports", text: "Issues found, tracked and resolved." },
      { title: "BOQ / quantities", text: "Schedules pulled straight from the model." },
      { title: "COBie data drops", text: "Structured asset data for handover, aligned to your BEP." },
      { title: "QA reports", text: "Every model checked before it reaches you." },
    ],
  },
  adapt: {
    title: "We adapt\nto you",
    subtitle: "Most providers make you fit their process. We do the opposite.",
    items: [
      {
        title: "We work in your hours",
        text: "Real overlap with your working day — not a model that lands in your inbox overnight with no one to ask.",
      },
      {
        title: "We join your team",
        text: "We plug into your CDE, your naming, your workflow. You don't change how you work; we adapt to it.",
      },
      {
        title: "We start from whatever you have",
        text: "2D PDFs, CAD, an existing Revit model, markups or specs — we work from your inputs, in your formats.",
      },
      {
        title: "You stay in control of your information",
        text: "At every stage you can see exactly what's modelled, what's pending and where the data lives. No black boxes.",
      },
    ],
  },
  riba: {
    eyebrow: "support at any riba stage",
    title: "Whatever stage your project is at, we plug in.",
    text: "Come to us at the start or pick us up mid-project — from BEP and standards, through modelling and coordination, to COBie-ready handover.",
    stages: [
      "Strategic Definition",
      "Preparation & Briefing",
      "Concept Design",
      "Spatial Coordination",
      "Technical Design",
      "Manufacturing & Construction",
      "Handover",
      "Use",
    ],
  },
  standards: {
    eyebrow: "standards & quality, in plain terms",
    title: "Compliance shouldn't feel like an exam. We handle the standards so you don't have to memorise them.",
    items: [
      {
        title: "ISO 19650",
        text: "The international standard for managing information across a project's life cycle.",
      },
      {
        title: "COBie",
        text: "Structured asset data your client can actually use after handover.",
      },
      {
        title: "UK BIM Framework / PAS 1192",
        text: "The UK way of working, built into how we run every job.",
      },
    ],
    sectorsEyebrow: "sectors we work in",
    sectorsTitle: "Generalist by design. We deliver BIM across:",
    sectors: [
      "Residential",
      "Commercial & offices",
      "Hospitality",
      "Retail",
      "Mixed-use",
      "Education",
      "Airports & aviation",
      "Data centres",
      "Interiors & fit-out",
    ],
    sectorsNote: "If it gets designed, built and operated, we can model and manage it.",
  },
  why: {
    eyebrow: "why latroupe()",
    title: "Clarity and control — from the first model to handover.",
    items: [
      {
        title: "Clarity and control",
        text: "You always know what's done, what's next and where your data is.",
      },
      {
        title: "We adapt to your team",
        text: "Your hours, your workflow, your standards.",
      },
      {
        title: "Multi-standard, not single-track",
        text: "ISO 19650, COBie and the UK BIM Framework are day-to-day for us, not a learning curve.",
      },
    ],
  },
  tools: {
    eyebrow: "built in-house",
    title: "We build our own tools",
    text: "We don't just deliver models — we build software to keep BIM data clean and ordered. It's how we guarantee the rigour behind every project we hand over.",
    items: [
      { name: "specto", tag: "model & data inspection", img: "/images/bim-consultancy/tools/specto.png" },
      { name: "modelcleaner", tag: "clean, ordered bim data", img: "/images/bim-consultancy/tools/modelcleaner.png" },
      { name: "pdf comparator", tag: "drawing revision compare", img: "/images/bim-consultancy/tools/pdfcomparator.svg" },
    ],
  },
  caseStudy: {
    eyebrow: "case study",
    title: "LEGO London Hub",
    imageAlt: "LEGO London Hub — BDG architecture + design",
    imageCredit: "Image © LEGO",
    facts: [
      { label: "Author & partner", value: "BDG architecture + design" },
      { label: "End client", value: "LEGO" },
      { label: "Typology / use", value: "Workplace" },
      { label: "Area", value: "20,000 sqm" },
      { label: "Location", value: "London, UK" },
      { label: "Year", value: "2026" },
    ],
    intro:
      "latroupe() joined BDG at Stage 2 as its BIM management and production partner for the LEGO London Hub fit-out. We set up and ran the project's entire BIM information environment and then delivered the Stage 3 model and full drawing package — all inside BDG's secured platforms. The challenge was to stand up a fully ISO 19650-compliant information environment from scratch, align to BDG's in-house BIM 7AA standard, coordinate multiple parties and consultants within a controlled corporate IT environment, and produce a large, multi-package Stage 3 drawing set at pace with full traceability.",
    standardsLabel: "Standards",
    standardsList:
      "ISO 19650 · BDG BIM 7AA standard · CDE (Dalux + Autodesk Construction Cloud) · IFC exchange · RIBA Plan of Work 2020 · UK Building Regulations",
    whatWeDid: "What we did",
    managementLabel: "BIM & information management",
    management: [
      "Authored and maintained the **BIM Execution Plan** (including a Revit-to-Dalux guide), reviewed the EIR and produced the **MIDP, BDG TIDP, Information Responsibility Matrix** and risk register.",
      "Set up the **CDE end-to-end**: Dalux setup and plug-ins, model structure diagram, levels & grids model, model-splitting strategy, IFC export/upload and ACC access & permissions management.",
      "Ran **BIM coordination meetings, clash-detection tests** and successive model uploads (Dalux v01–v04 and Stage 3+), plus BDG model reviews and audits (worksets, FF&E splash page, catering model to BDG ACC).",
      "Wrote the **BIM text and appendices** for the Stage 3 report.",
    ],
    modellingLabel: "BIM modelling & drawing production",
    modelling: [
      "Planning & existing plans",
      "Proposed GA; partitions (AV back-to-back meeting rooms, teapoint bulkheads, conference-room walls); raised-access-floor plans; floor finishes",
      "Elevations; proposed sections",
      "Joinery, stairs / working platform",
      "Detail drawings",
      "Doors and fire strategy; AV modelling",
    ],
    resultLabel: "the result",
    result:
      "A fully governed, ISO 19650-compliant BIM environment and a comprehensive, coordinated Stage 3 model and drawing set — delivered continuously inside BDG's platforms and standards, with latroupe() acting as BDG's embedded BIM management and production team.",
  },
  faqs: {
    title: "FAQs",
    items: [
      {
        q: "Can you join a project that's already underway?",
        a: "Yes. We regularly pick projects up mid-stage — we audit what already exists, set up or clean the information environment, and carry on from there without disrupting your delivery.",
      },
      {
        q: "How do we get started?",
        a: "A short call to understand the project and its stage. We then propose the scope, standards and deliverables — and agree them — before the collaboration begins.",
      },
      {
        q: "Fixed fee or by stage?",
        a: "Both. We scope by stage or by deliverable, and agree the commercial model that fits how you run the project.",
      },
      {
        q: "Can you provide extra BIM capacity for our team?",
        a: "Yes. We can embed senior BIM consultants and Revit specialists in your studio for the length of a project, working as part of your team.",
      },
      {
        q: "Can you work inside our own platforms and standards?",
        a: "Yes. We routinely deliver entirely inside our clients' secured platforms and to their in-house BIM standards, working as part of their environment rather than imposing ours.",
      },
      {
        q: "What is a BIM Execution Plan (BEP)?",
        a: "A document that sets out how BIM will be delivered on your project — roles, standards, software, LOD and data drops — so the whole team works one way. We write and maintain it for you.",
      },
      {
        q: "What does a BIM manager do?",
        a: "A BIM manager leads your information delivery — setting standards, running the CDE and keeping data quality high across every discipline. We can provide one for your project.",
      },
      {
        q: "Which software do you use?",
        a: "Revit is our main modelling platform, but we also work in ArchiCAD and with tools like Dalux and other common BIM platforms. If you have a specific requirement, tell us — chances are we can help.",
      },
      {
        q: "Do you deliver COBie and structured asset data?",
        a: "Yes. We hand over COBie-ready, structured data your client can actually use to operate the building after handover.",
      },
    ],
  },
  contact: {
    title: "Let's\ntalk.",
    text: "Tell us where your project is — start, mid-stage or already on site. We'll map the BIM support you need, to your standards and your timeline. No obligation, and we reply within one working day.",
    fields: {
      name: { label: "( who are you? )", placeholder: "Your name" },
      email: { label: "( how do we reach you? )", placeholder: "Your email" },
      project: { label: "( what's the project? )", placeholder: "Type, stage, location" },
      more: { label: "( tell us more )", placeholder: "A short description of what you need" },
    },
    submit: "Send",
    sending: "Sending…",
    sent: "Sent ✓",
    error: "Error — try again",
    privacyPre: "By submitting this form you agree to our ",
    privacyLink: "privacy policy",
    privacyHref: "/en/privacy",
    privacyPost: ".",
    privacyExtra: " We only use your details to reply to your enquiry — never for anything else.",
  },
  footer: {
    credit: "Developed by latroupe ( ) 2026 ©",
    workWithUs: {
      label: "Work with us",
      href: "https://invented-cactus-ce6.notion.site/Trabajar-en-LaTroupe-cd9c990923954418bd2e6a3df58b2500",
    },
    legal: [
      { label: "Privacy", href: "/en/privacy" },
      { label: "Cookies", href: "/en/cookies" },
      { label: "Legal notice", href: "/en/legal-notice" },
    ],
  },
};

const es: ConsultancyContent = {
  meta: {
    title: "Consultoría y Modelado BIM · LaTroupe Studio",
    description:
      "BIM coordinado y rico en datos, entregado según tus estándares y tus plazos. Modelado, coordinación, gestión y consultoría BIM — nos integramos en tu equipo en cualquier fase del proyecto.",
  },
  header: { cta: "hablemos", closeLabel: "Cerrar" },
  hero: {
    title: "Consultoría y Servicios de Modelado BIM",
    text: "BIM coordinado y rico en datos, entregado según tus estándares y tus plazos. Nos integramos en tu equipo en cualquier fase del proyecto y te mantenemos en control de tu información desde el primer día.",
    cta: "reserva una consultoría",
    note: "Cuéntanos tu proyecto,\nte respondemos en un día laborable.",
  },
  trust: {
    eyebrow: "confían en nosotros estudios y marcas líderes",
    text: "BIM entregado en Reino Unido, Europa y más allá — para estudios, constructoras y promotoras.",
  },
  services: {
    eyebrow: "nuestros servicios bim",
    title: "Servicios BIM de principio a fin",
    subtitle: "Elige los que necesites, o déjanos llevarlo todo.",
    items: [
      {
        title: "Modelado BIM (Revit)",
        text: "Modelos Revit precisos y ricos en datos, construidos al nivel de detalle que necesites (LOD 200–500). Servicios BIM de arquitectura, estructura y MEP, totalmente coordinados y listos para entrega.",
      },
      {
        title: "Creación de contenido BIM",
        text: "Familias de Revit a medida, plantillas y bibliotecas de estándares — para que tus modelos sean consistentes y reutilizables en todos tus proyectos.",
      },
      {
        title: "BIM Management y gestión de la información",
        text: "Un BIM manager dedicado que lidera la entrega de tu información — configurando el CDE, la nomenclatura y los estándares para que tus datos estén limpios, ordenados y auditables.",
      },
      {
        title: "Plan de Ejecución BIM (BEP)",
        text: "Redactamos y mantenemos tu Plan de Ejecución BIM para que todo el equipo trabaje con un mismo método acordado — alineado con el UK BIM Framework desde el principio.",
      },
      {
        title: "Coordinación BIM y detección de interferencias",
        text: "Coordinación multidisciplinar que detecta las interferencias antes de que lleguen a obra.",
      },
      {
        title: "Soporte BIM integrado",
        text: "Consultores BIM senior y especialistas en Revit que trabajan como parte de tu estudio durante todo el proyecto — una verdadera extensión de tu equipo, no una cadena de producción sin rostro.",
      },
      {
        title: "Consultoría de gestión de proyectos y datos BIM",
        text: "De la consultoría de gestión de proyectos BIM a la gestión de datos BIM y las bases del gemelo digital — mantenemos bajo control la capa de información de tu proyecto.",
      },
    ],
  },
  deliverables: {
    eyebrow: "qué obtienes",
    title: "Entregables claros, acordados desde el inicio — siempre sabes exactamente qué recibes.",
    items: [
      { title: "Modelos Revit coordinados", text: "Al LOD que elijas (200 / 300 / 400 / 500)." },
      { title: "Planos de construcción y GA", text: "Plantas, secciones, esquemas y montantes." },
      { title: "Informes de interferencias y coordinación", text: "Incidencias detectadas, trazadas y resueltas." },
      { title: "Mediciones / BOQ", text: "Tablas de planificación extraídas directamente del modelo." },
      { title: "Entregas de datos COBie", text: "Datos de activos estructurados para la entrega, alineados con tu BEP." },
      { title: "Informes de calidad (QA)", text: "Cada modelo se revisa antes de llegar a ti." },
    ],
  },
  adapt: {
    title: "Nos adaptamos\na ti",
    subtitle: "La mayoría de proveedores te obligan a encajar en su proceso. Nosotros hacemos lo contrario.",
    items: [
      {
        title: "Trabajamos en tu horario",
        text: "Solape real con tu jornada — no un modelo que aparece en tu bandeja de entrada de madrugada sin nadie a quien preguntar.",
      },
      {
        title: "Nos unimos a tu equipo",
        text: "Nos integramos en tu CDE, tu nomenclatura y tu flujo de trabajo. Tú no cambias tu forma de trabajar; nos adaptamos a ella.",
      },
      {
        title: "Partimos de lo que tengas",
        text: "PDFs 2D, CAD, un modelo Revit existente, anotaciones o especificaciones — trabajamos desde tus archivos, en tus formatos.",
      },
      {
        title: "Mantienes el control de tu información",
        text: "En cada fase puedes ver exactamente qué está modelado, qué está pendiente y dónde viven los datos. Sin cajas negras.",
      },
    ],
  },
  riba: {
    eyebrow: "apoyo en cualquier fase riba",
    title: "Esté donde esté tu proyecto, nos incorporamos.",
    text: "Ven al inicio o incorpóranos a mitad de proyecto — del BEP y los estándares, pasando por modelado y coordinación, hasta una entrega lista para COBie.",
    stages: [
      "Definición estratégica",
      "Preparación y briefing",
      "Diseño conceptual",
      "Coordinación espacial",
      "Diseño técnico",
      "Fabricación y construcción",
      "Entrega",
      "Uso",
    ],
  },
  standards: {
    eyebrow: "estándares y calidad, en lenguaje claro",
    title: "Cumplir la normativa no debería parecer un examen. Nosotros dominamos los estándares para que tú no tengas que memorizarlos.",
    items: [
      {
        title: "ISO 19650",
        text: "El estándar internacional para gestionar la información durante todo el ciclo de vida del proyecto.",
      },
      {
        title: "COBie",
        text: "Datos de activos estructurados que tu cliente podrá usar de verdad tras la entrega.",
      },
      {
        title: "UK BIM Framework / PAS 1192",
        text: "La forma de trabajar británica, integrada en cómo gestionamos cada encargo.",
      },
    ],
    sectorsEyebrow: "sectores en los que trabajamos",
    sectorsTitle: "Generalistas por diseño. Entregamos BIM en:",
    sectors: [
      "Residencial",
      "Comercial y oficinas",
      "Hotelero",
      "Retail",
      "Usos mixtos",
      "Educación",
      "Aeropuertos y aviación",
      "Centros de datos",
      "Interiorismo y fit-out",
    ],
    sectorsNote: "Si se diseña, se construye y se opera, podemos modelarlo y gestionarlo.",
  },
  why: {
    eyebrow: "por qué latroupe()",
    title: "Claridad y control — del primer modelo a la entrega.",
    items: [
      {
        title: "Claridad y control",
        text: "Siempre sabes qué está hecho, qué viene después y dónde están tus datos.",
      },
      {
        title: "Nos adaptamos a tu equipo",
        text: "Tu horario, tu flujo de trabajo, tus estándares.",
      },
      {
        title: "Multiestándar, no de vía única",
        text: "ISO 19650, COBie y el UK BIM Framework son nuestro día a día, no una curva de aprendizaje.",
      },
    ],
  },
  tools: {
    eyebrow: "desarrollado en casa",
    title: "Construimos nuestras propias herramientas",
    text: "No solo entregamos modelos — desarrollamos software para mantener los datos BIM limpios y ordenados. Así garantizamos el rigor detrás de cada proyecto que entregamos.",
    items: [
      { name: "specto", tag: "inspección de modelos y datos", img: "/images/bim-consultancy/tools/specto.png" },
      { name: "modelcleaner", tag: "datos bim limpios y ordenados", img: "/images/bim-consultancy/tools/modelcleaner.png" },
      { name: "pdf comparator", tag: "comparación de revisiones de planos", img: "/images/bim-consultancy/tools/pdfcomparator.svg" },
    ],
  },
  caseStudy: {
    eyebrow: "caso de estudio",
    title: "LEGO London Hub",
    imageAlt: "LEGO London Hub — BDG architecture + design",
    imageCredit: "Imagen © LEGO",
    facts: [
      { label: "Autor y partner", value: "BDG architecture + design" },
      { label: "Cliente final", value: "LEGO" },
      { label: "Tipología / uso", value: "Oficinas" },
      { label: "Superficie", value: "20.000 m²" },
      { label: "Ubicación", value: "Londres, Reino Unido" },
      { label: "Año", value: "2026" },
    ],
    intro:
      "latroupe() se incorporó con BDG en la fase 2 como su partner de BIM management y producción para el fit-out del LEGO London Hub. Configuramos y gestionamos todo el entorno de información BIM del proyecto y entregamos el modelo de fase 3 y el paquete completo de planos — todo dentro de las plataformas seguras de BDG. El reto: levantar desde cero un entorno de información totalmente conforme a ISO 19650, alinearse con el estándar interno BIM 7AA de BDG, coordinar a múltiples agentes y consultores dentro de un entorno IT corporativo controlado, y producir un gran paquete de planos de fase 3 a ritmo y con trazabilidad total.",
    standardsLabel: "Estándares",
    standardsList:
      "ISO 19650 · Estándar BIM 7AA de BDG · CDE (Dalux + Autodesk Construction Cloud) · Intercambio IFC · RIBA Plan of Work 2020 · UK Building Regulations",
    whatWeDid: "Qué hicimos",
    managementLabel: "BIM y gestión de la información",
    management: [
      "Redactamos y mantuvimos el **Plan de Ejecución BIM** (incluida una guía Revit-Dalux), revisamos el EIR y elaboramos el **MIDP, el TIDP de BDG, la matriz de responsabilidades de la información** y el registro de riesgos.",
      "Configuramos el **CDE de principio a fin**: puesta en marcha de Dalux y sus plug-ins, diagrama de estructura de modelos, modelo de niveles y rejillas, estrategia de división de modelos, exportación/subida IFC y gestión de accesos y permisos en ACC.",
      "Dirigimos **reuniones de coordinación BIM, tests de detección de interferencias** y sucesivas subidas de modelo (Dalux v01–v04 y fase 3+), además de revisiones y auditorías de modelos de BDG (worksets, splash page de FF&E, modelo de catering a ACC de BDG).",
      "Redactamos el **texto BIM y los anexos** del informe de fase 3.",
    ],
    modellingLabel: "Modelado BIM y producción de planos",
    modelling: [
      "Planeamiento y planos de estado actual",
      "GA propuesto; particiones (salas de reuniones AV back-to-back, falsos techos de teapoints, muros de salas de conferencias); plantas de suelo técnico; acabados de suelo",
      "Alzados; secciones propuestas",
      "Carpintería, escaleras / plataforma de trabajo",
      "Planos de detalle",
      "Puertas y estrategia contra incendios; modelado AV",
    ],
    resultLabel: "el resultado",
    result:
      "Un entorno BIM totalmente gobernado y conforme a ISO 19650, y un modelo y paquete de planos de fase 3 completo y coordinado — entregado en continuo dentro de las plataformas y estándares de BDG, con latroupe() actuando como su equipo integrado de BIM management y producción.",
  },
  faqs: {
    title: "FAQs",
    items: [
      {
        q: "¿Podéis incorporaros a un proyecto ya en marcha?",
        a: "Sí. Nos incorporamos con frecuencia a proyectos a mitad de fase — auditamos lo que ya existe, montamos o limpiamos el entorno de información y continuamos desde ahí sin interrumpir tu entrega.",
      },
      {
        q: "¿Cómo empezamos?",
        a: "Una llamada breve para entender el proyecto y su fase. Después proponemos el alcance, los estándares y los entregables — y los acordamos — antes de empezar la colaboración.",
      },
      {
        q: "¿Precio cerrado o por fase?",
        a: "Ambos. Presupuestamos por fase o por entregable, y acordamos el modelo comercial que encaje con cómo gestionas el proyecto.",
      },
      {
        q: "¿Podéis aportar capacidad BIM extra a nuestro equipo?",
        a: "Sí. Podemos integrar consultores BIM senior y especialistas en Revit en tu estudio durante todo el proyecto, trabajando como parte de tu equipo.",
      },
      {
        q: "¿Podéis trabajar dentro de nuestras plataformas y estándares?",
        a: "Sí. Entregamos habitualmente dentro de las plataformas seguras de nuestros clientes y según sus estándares BIM internos, trabajando en su entorno en lugar de imponer el nuestro.",
      },
      {
        q: "¿Qué es un Plan de Ejecución BIM (BEP)?",
        a: "Un documento que define cómo se entregará el BIM en tu proyecto — roles, estándares, software, LOD y entregas de datos — para que todo el equipo trabaje de una sola manera. Lo redactamos y mantenemos por ti.",
      },
      {
        q: "¿Qué hace un BIM manager?",
        a: "Un BIM manager lidera la entrega de tu información — fija los estándares, gestiona el CDE y mantiene alta la calidad de los datos en todas las disciplinas. Podemos aportar uno a tu proyecto.",
      },
      {
        q: "¿Qué software utilizáis?",
        a: "Revit es nuestra plataforma principal de modelado, pero también trabajamos con ArchiCAD y con herramientas como Dalux y otras plataformas BIM habituales. Si tienes un requisito concreto, cuéntanoslo — es muy probable que podamos ayudarte.",
      },
      {
        q: "¿Entregáis COBie y datos de activos estructurados?",
        a: "Sí. Entregamos datos estructurados y listos para COBie que tu cliente podrá usar de verdad para operar el edificio tras la entrega.",
      },
    ],
  },
  contact: {
    title: "Hablemos.",
    text: "Cuéntanos en qué punto está tu proyecto — al inicio, a mitad de fase o ya en obra. Definiremos el apoyo BIM que necesitas, según tus estándares y tus plazos. Sin compromiso, y respondemos en un día laborable.",
    fields: {
      name: { label: "( ¿quién eres? )", placeholder: "Tu nombre" },
      email: { label: "( ¿cómo te contactamos? )", placeholder: "Tu email" },
      project: { label: "( ¿cuál es el proyecto? )", placeholder: "Tipo, fase, ubicación" },
      more: { label: "( cuéntanos más )", placeholder: "Una breve descripción de lo que necesitas" },
    },
    submit: "Enviar",
    sending: "Enviando…",
    sent: "Enviado ✓",
    error: "Error — inténtalo de nuevo",
    privacyPre: "Al enviar este formulario aceptas nuestra ",
    privacyLink: "política de privacidad",
    privacyHref: "/es/privacidad",
    privacyPost: ".",
    privacyExtra: " Solo usamos tus datos para responder a tu consulta — nunca para otra cosa.",
  },
  footer: {
    credit: "Developed by latroupe ( ) 2026 ©",
    workWithUs: {
      label: "Trabaja con nosotros",
      href: "https://invented-cactus-ce6.notion.site/Trabajar-en-LaTroupe-cd9c990923954418bd2e6a3df58b2500",
    },
    legal: [
      { label: "Privacidad", href: "/es/privacidad" },
      { label: "Cookies", href: "/es/cookies" },
      { label: "Aviso legal", href: "/es/aviso-legal" },
    ],
  },
};

const content: Record<Locale, ConsultancyContent> = { en, es };

export function getConsultancyContent(locale: Locale): ConsultancyContent {
  return content[locale] ?? content.es;
}
