export type Lang = "ca" | "es" | "en";

export interface Dict {
  navPerfil: string;
  navPonencies: string;
  navDocencia: string;
  navContacte: string;
  roleA: string;
  roleB: string;
  tagline: string;
  bioLead: string;
  bioPre: string;
  bioPost: string;
  secExpertesa: string;
  exp1: string;
  exp2: string;
  exp3: string;
  exp4: string;
  secTemes: string;
  tema1: string;
  tag1: string;
  tema2: string;
  tag2: string;
  tema3: string;
  tag3: string;
  tema4: string;
  tag4: string;
  secDocencia: string;
  doc1desc: string;
  doc2desc: string;
  doc3desc: string;
  doc4: string;
  ctaEyebrow: string;
  headPre: string;
  headEmph: string;
  lblNom: string;
  lblEmail: string;
  lblEntitat: string;
  lblTipus: string;
  optXerrada: string;
  optTaller: string;
  optDocencia: string;
  optAltres: string;
  lblMissatge: string;
  btnEnviar: string;
  thanksPre: string;
  confBody: string;
}

export const dict: Record<Lang, Dict> = {
  ca: {
    navPerfil: "Perfil",
    navPonencies: "Ponències",
    navDocencia: "Docència",
    navContacte: "Contacte",
    roleA: "Interiorista i directora de negoci",
    roleB: "Formadora i ponent",
    tagline:
      "Del projecte real a l'aula: gestió, BIM i IA aplicats a l'interiorisme.",
    bioLead: "Una dècada de projectes d'hostaleria de luxe.",
    bioPre:
      "Interiorista i directora de negoci amb més d'una dècada d'experiència en projectes d'hostaleria i residencial de luxe a escala internacional. Fundadora de ",
    bioPost:
      " i de Gigson Solutions. Combina la pràctica professional en actiu amb la docència, impartint formació de gestió de projectes, metodologia BIM i IA aplicada a l'interiorisme. Formada a ELISAVA.",
    secExpertesa: "Àrees d'expertesa",
    exp1: "Gestió de projectes d'interiorisme",
    exp2: "Metodologia BIM i IA aplicada al disseny",
    exp3: "Direcció creativa i producció tècnica",
    exp4: "Hostaleria de luxe internacional",
    secTemes: "Temes de ponència i formació",
    tema1: "Gestió de projectes en estudis d'interiorisme",
    tag1: "Xerrada · Taller",
    tema2: "BIM aplicat a l'interiorisme i l'hostaleria",
    tag2: "Formació · Màster",
    tema3: "La IA en el flux de treball de l'interiorista",
    tag3: "Xerrada · Jornada",
    tema4: "De col·laboradora individual a direcció d'estudi",
    tag4: "Xerrada · Mentoria",
    secDocencia: "Docència i col·laboracions",
    doc1desc: "Docència · Màster en disseny d'interiors (gestió de projectes)",
    doc2desc: "Workshop · 2026",
    doc3desc: "Ponència · Formació",
    doc4: "+ altres fires i entitats del sector",
    ctaEyebrow: "Reservar una xerrada, taller o docència",
    headPre: "Expliquem el teu ",
    headEmph: "projecte",
    lblNom: "Nom i cognoms",
    lblEmail: "Email",
    lblEntitat: "Entitat / organització",
    lblTipus: "Tipus de col·laboració",
    optXerrada: "Xerrada",
    optTaller: "Taller",
    optDocencia: "Docència",
    optAltres: "Altres",
    lblMissatge: "Missatge",
    btnEnviar: "Enviar sol·licitud",
    thanksPre: "Gràcies, ",
    confBody:
      "He rebut la teva sol·licitud. Et respondré personalment a la major brevetat per concretar dates i format.",
  },
  es: {
    navPerfil: "Perfil",
    navPonencies: "Ponencias",
    navDocencia: "Docencia",
    navContacte: "Contacto",
    roleA: "Interiorista y directora de negocio",
    roleB: "Formadora y ponente",
    tagline:
      "Del proyecto real al aula: gestión, BIM e IA aplicados al interiorismo.",
    bioLead: "Una década de proyectos de hostelería de lujo.",
    bioPre:
      "Interiorista y directora de negocio con más de una década de experiencia en proyectos de hostelería y residencial de lujo a escala internacional. Fundadora de ",
    bioPost:
      " y de Gigson Solutions. Combina la práctica profesional en activo con la docencia, impartiendo formación de gestión de proyectos, metodología BIM e IA aplicada al interiorismo. Formada en ELISAVA.",
    secExpertesa: "Áreas de expertise",
    exp1: "Gestión de proyectos de interiorismo",
    exp2: "Metodología BIM e IA aplicada al diseño",
    exp3: "Dirección creativa y producción técnica",
    exp4: "Hostelería de lujo internacional",
    secTemes: "Temas de ponencia y formación",
    tema1: "Gestión de proyectos en estudios de interiorismo",
    tag1: "Charla · Taller",
    tema2: "BIM aplicado al interiorismo y la hostelería",
    tag2: "Formación · Máster",
    tema3: "La IA en el flujo de trabajo del interiorista",
    tag3: "Charla · Jornada",
    tema4: "De colaboradora individual a dirección de estudio",
    tag4: "Charla · Mentoría",
    secDocencia: "Docencia y colaboraciones",
    doc1desc: "Docencia · Máster en diseño de interiores (gestión de proyectos)",
    doc2desc: "Workshop · 2026",
    doc3desc: "Ponencia · Formación",
    doc4: "+ otras ferias y entidades del sector",
    ctaEyebrow: "Reservar una charla, taller o docencia",
    headPre: "Expliquemos tu ",
    headEmph: "proyecto",
    lblNom: "Nombre y apellidos",
    lblEmail: "Email",
    lblEntitat: "Entidad / organización",
    lblTipus: "Tipo de colaboración",
    optXerrada: "Charla",
    optTaller: "Taller",
    optDocencia: "Docencia",
    optAltres: "Otros",
    lblMissatge: "Mensaje",
    btnEnviar: "Enviar solicitud",
    thanksPre: "Gracias, ",
    confBody:
      "He recibido tu solicitud. Te responderé personalmente lo antes posible para concretar fechas y formato.",
  },
  en: {
    navPerfil: "Profile",
    navPonencies: "Talks",
    navDocencia: "Teaching",
    navContacte: "Contact",
    roleA: "Interior designer & business director",
    roleB: "Educator & speaker",
    tagline:
      "From real projects to the classroom: management, BIM and AI for interior design.",
    bioLead: "A decade of luxury hospitality projects.",
    bioPre:
      "Interior designer and business director with over a decade of experience in international luxury hospitality and residential projects. Founder of ",
    bioPost:
      " and Gigson Solutions. She combines active professional practice with teaching, delivering training on project management, BIM methodology and AI applied to interior design. Trained at ELISAVA.",
    secExpertesa: "Areas of expertise",
    exp1: "Interior design project management",
    exp2: "BIM methodology & AI applied to design",
    exp3: "Creative direction & technical production",
    exp4: "International luxury hospitality",
    secTemes: "Talk & training topics",
    tema1: "Project management in interior design studios",
    tag1: "Talk · Workshop",
    tema2: "BIM for interior design & hospitality",
    tag2: "Training · Master's",
    tema3: "AI in the interior designer's workflow",
    tag3: "Talk · Seminar",
    tema4: "From individual contributor to studio leadership",
    tag4: "Talk · Mentoring",
    secDocencia: "Teaching & collaborations",
    doc1desc: "Teaching · Master's in interior design (project management)",
    doc2desc: "Workshop · 2026",
    doc3desc: "Talk · Training",
    doc4: "+ other fairs & sector organizations",
    ctaEyebrow: "Book a talk, workshop or teaching",
    headPre: "Tell me about your ",
    headEmph: "project",
    lblNom: "Full name",
    lblEmail: "Email",
    lblEntitat: "Organization",
    lblTipus: "Type of collaboration",
    optXerrada: "Talk",
    optTaller: "Workshop",
    optDocencia: "Teaching",
    optAltres: "Other",
    lblMissatge: "Message",
    btnEnviar: "Send request",
    thanksPre: "Thank you, ",
    confBody:
      "I've received your request. I'll reply personally as soon as possible to arrange dates and format.",
  },
};
