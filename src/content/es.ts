import { SiteContent } from "./types";
const es: SiteContent = {
  locale: "es",
  nav: { links: [{ label: "proyectos", id: "proyectos" },{ label: "nosotros", id: "por-que-nosotros" }], contact: { label: "contacto", id: "contacto" } },
  hero: {
    prefix: "latroupe",
    rotatingWords: ["diseña","optimiza","produce","ordena","mejora","desarrolla","tecnifica"],
    suffix: "contigo",
    description: "Reforzamos la capacidad de los estudios de arquitectura o interiorismo y les acompañamos en todas las fases de desarrollo de cada proyecto.",
  },
  about: {
    eyebrow: "Realmente...",
    headline: "Hay pocas cosas que no podamos hacer",
    blocks: [
      "Quienes nos eligen saben que con latroupe pueden ampliar el equipo interno manteniendo un nivel de calidad excelente en su trabajo.",
      "Estamos para diseñar, proyectar, tecnificar, gestionar o brindar cualquier apoyo cuando se necesite. Nos integramos de forma coordinada con el equipo adaptándonos a su forma de trabajar, sea cual sea.",
      "Tenemos la experiencia y la capacidad de colaborar en proyectos de todo tipo, sin importar la magnitud ni la complejidad.",
    ],
  },
  projectsSection: { headline: "Una selección de proyectos recientes en los que colaboramos" },
  projects: [
    { id:"al-ameen", title:"Al Ameen | Corporate Offices", location:"Jeddah, KSA", thumbnail:"/images/projects/al-ameen/hero.jpg", type:"Oficinas corporativas / Workplace", client:"confidencial", partner:"BDG", phase:"Stage 3 – Desarrollo técnico", status:"Proyecto completado", inDevelopment:false, heroImage:"/images/projects/al-ameen/hero.jpg", shortDesc:"Desarrollo técnico y coordinación BIM para proyecto corporativo en Arabia Saudí.", longDesc:["Para el proyecto de oficinas corporativas Al Ameen en Jeddah, nos incorporamos como equipo de soporte BIM y producción técnica durante Stage 3.","El reto principal fue garantizar precisión técnica y coherencia documental en un entorno internacional.","El proyecto se desarrolló en entorno colaborativo BIM, centralizado en Autodesk Construction Cloud (ACC)."], laborTitle:"Nuestra labor incluyó:", labor:["Producción y desarrollo de modelos en Revit conforme a los estándares del proyecto.","Generación de paquetes de planos técnicos para entrega en Stage 3.","Coordinación con equipos de arquitectura, MEP y resto de disciplinas.","Revisión y resolución de interferencias.","Implementación de procesos de control de calidad documental (QA/QC).","Soporte continuo al equipo de diseño en ajustes y reducciones técnicas."], closingText:"Se aseguró una documentación técnica consistente y alineada con los requerimientos del cliente.", closingText2:"El valor diferencial fue la capacidad de aportar estructura, rigor BIM y refuerzo técnico especializado.", images:[{src:"/images/projects/al-ameen/render-lobby.jpg",caption:"Render del lobby"},{src:"/images/projects/al-ameen/render-main.png",caption:"Escalonado de celosía"},{src:"/images/projects/al-ameen/floor-plan.png",caption:"Doble nivel de planta baja"},{src:"/images/projects/al-ameen/exploded.png",caption:"Explotado planta baja"},{src:"/images/projects/al-ameen/moodboard.png",caption:"Moodboard"}] },
    { id:"rochester-row", title:"Rochester Row | Office Refurbishment", location:"London, UK", thumbnail:"/images/projects/rochester-row/hero.jpg", type:"Oficinas / Workplace", status:"Proyecto completado", inDevelopment:false, heroImage:"/images/projects/rochester-row/hero.jpg", shortDesc:"Refurbishment de oficinas en el centro de Londres.", longDesc:["Información del proyecto próximamente."], labor:[], images:[] },
    { id:"oro-hato-rey", title:"ORO Hato Rey | Hotel Renovation", location:"San Juan, Puerto Rico", thumbnail:"/images/projects/oro-hato-rey/hero.jpg", type:"Hotel / Hospitality", status:"En desarrollo", inDevelopment:false, heroImage:"/images/projects/oro-hato-rey/hero.jpg", shortDesc:"Renovación integral de hotel boutique en San Juan.", longDesc:["Información del proyecto próximamente."], labor:[], images:[] },
    { id:"lego-london", title:"Lego London HUB | Corporate Offices", location:"London", thumbnail:"/images/projects/al-ameen/hero.jpg", type:"Oficinas / Workplace", status:"En desarrollo", inDevelopment:true, heroImage:"/images/projects/al-ameen/hero.jpg", shortDesc:"", longDesc:[], labor:[], images:[] },
    { id:"holbein-gardens", title:"Holbein Gardens | Corporate Offices", location:"London", thumbnail:"/images/projects/al-ameen/hero.jpg", type:"Oficinas / Workplace", status:"En desarrollo", inDevelopment:true, heroImage:"/images/projects/al-ameen/hero.jpg", shortDesc:"", longDesc:[], labor:[], images:[] },
    { id:"andaz-turks", title:"Andaz Turks & Caicos at Grace Bay | Hotel Renovation", location:"Turks and Caicos Islands", thumbnail:"/images/projects/al-ameen/hero.jpg", type:"Hotel", status:"En desarrollo", inDevelopment:true, heroImage:"/images/projects/al-ameen/hero.jpg", shortDesc:"", longDesc:[], labor:[], images:[] },
    { id:"sant-feliu", title:"Sant Feliu de Guíxols | Residential Renovation", location:"Girona, Spain", thumbnail:"/images/projects/al-ameen/hero.jpg", type:"Residencial", status:"En desarrollo", inDevelopment:true, heroImage:"/images/projects/al-ameen/hero.jpg", shortDesc:"", longDesc:[], labor:[], images:[] },
  ],
  trust: { headline: "Confían en latroupe:", logos: [
    {name:"Accor",src:"/images/logos/accor.png"},{name:"Aena",src:"/images/logos/aena.png"},{name:"Airia",src:"/images/logos/airia.png"},{name:"Amazon",src:"/images/logos/amazon.png"},{name:"BDG",src:"/images/logos/bdg.png"},{name:"BGY",src:"/images/logos/bgy.png"},{name:"Hyatt",src:"/images/logos/hyatt.png"},{name:"Joan Lao",src:"/images/logos/joan-lao.png"},{name:"LEGO",src:"/images/logos/lego.png"},{name:"M Gallery",src:"/images/logos/m-gallery.png"},{name:"Marriott",src:"/images/logos/marriott.png"},{name:"Modus Operandi",src:"/images/logos/modus-operandi.png"},
  ]},
  methodology: {
    headline: "Nuestra experiencia diseña la metodología",
    intro: "Ser una ayuda real para quien cuenta con nosotros es el motivo que nos ha guiado durante años para perfeccionar la forma en la que trabajamos. Estos tres fundamentos dirigen cómo latroupe hace las cosas:",
    subtitle: "",
    pillars: [
      { number:"I)", title:"Nuestro sistema se adapta al proyecto", subtitle:"(no al revés)", paragraphs:["Sabemos que un sistema de trabajo bien construido influye en la capacidad del equipo y en la calidad del resultado.","Por eso podemos resolver con autonomía y anticiparnos a los problemas sin supervisión constante, siempre desde la flexibilidad para integrarnos en las dinámicas internas sin complicarlas."] },
      { number:"II)", title:"Un modelo híbrido", subtitle:"(y de talento global)", paragraphs:["La experiencia acumulada en cada una de las áreas del sector nos permite identificar las necesidades concretas de cada situación y tener siempre disponible el talento específico para los requisitos del proyecto."] },
      { number:"III)", title:"Solucionamos", subtitle:"(con intención)", paragraphs:["Siendo conscientes de nuestro papel, proporcionamos algo más que ayuda extra.","En latroupe, aportamos valor adicional con propuestas, desde la experiencia, para enriquecer desde dentro."] },
    ],
  },
  whyUs: {
    headline: "¿Por qué nosotros?",
    paragraphs: [
      "En latroupe hemos estado en diferentes roles dentro de la construcción, la arquitectura y el diseño, la tecnología o la gestión empresarial. Por eso podemos ofrecer un servicio totalmente moldeable a las necesidades que tengas ahora mismo y que irá evolucionando a medida que estas también lo hagan.",
      "Nuestra forma de trabajar es sencilla (que no simple) y se basa en establecer relaciones sostenibles en el tiempo. Si crees que podemos ayudarte, todo empieza con una videollamada para conocernos.",
    ],
  },
  contact: {
    headline: "Empecemos un proyecto juntos",
    fields: { name:"Nombre", email:"Correo electrónico", company:"Mensaje", message:"Escríbenos tu mensaje", submit:"Enviar", sending:"Enviando...", sent:"¡Enviado!" },
    legal: "Al hacer clic en Enviar, aceptas nuestra política de protección de datos y que podamos ponernos en contacto contigo.",
  },
  footer: {
    links: [{label:"Privacidad",href:"/es/privacidad"},{label:"Cookies",href:"/es/cookies"},{label:"Aviso legal",href:"/es/aviso-legal"}],
    social: [{label:"Linkedin",href:"https://www.linkedin.com/company/latroupestudio"},{label:"Instagram",href:"https://www.instagram.com/latroupestudio"},{label:"Pinterest",href:"https://www.pinterest.es/latroupestudio/"}],
    copyright: "Desarrollado por latroupe ( ) 2026 © Todos los derechos reservados.",
    legal: "",
  },
  overlay: { close:"CERRAR", inDevelopment:"En desarrollo", comingSoon:"Próximamente" },
};
export default es;
