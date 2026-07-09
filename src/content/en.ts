import { SiteContent } from "./types";
const en: SiteContent = {
  locale: "en",
  nav: { links: [{label:"projects",id:"proyectos"},{label:"about",id:"por-que-nosotros"}], contact:{label:"contact",id:"contacto"} },
  hero: { prefix:"latroupe", rotatingWords:["designs","technifies","organises","improves","optimises","executes","builds","anticipates"], suffix:"behind the scenes", description:"We expand the capabilities of architecture and interior design studios supporting them throughout every phase of a project." },
  about: { eyebrow:"Really...", headline:"There are few things we cannot do", blocks:["Those who work with latroupe rely on us to expand their teams without compromising on quality.","We support design, planning, technical development, and project management, whenever needed. We integrate in a coordinated way with the team, adapting to their way of working, whatever it may be.","We have the experience and capability to work on all types of projects, regardless of their magnitude and complexity."] },
  projectsSection: { headline:"A selection of recent projects in which we collaborate" },
  projects: [
    { id:"al-ameen", title:"Al Ameen |\nCorporate Offices", location:"Jeddah, KSA", thumbnail:"/images/projects/al-ameen/hero.jpg", type:"Corporate Offices / Workplace", client:"confidential", partner:"BDG", phase:"Stage 3 – Technical Development", status:"Project completed", inDevelopment:false, heroImage:"/images/projects/al-ameen/hero.jpg", shortDesc:"Technical development and BIM coordination for a corporate project in Saudi Arabia.", longDesc:["For the Al Ameen corporate offices project in Jeddah, we joined as BIM support and technical production team during Stage 3.","The main challenge was ensuring technical precision and document consistency in an international environment.","The project was developed in a collaborative BIM environment, centralized in Autodesk Construction Cloud (ACC)."], laborTitle:"Our scope of work included:", labor:["Production and development of Revit models according to project standards.","Generation of technical drawing packages for Stage 3 delivery.","Coordination with architecture, MEP, and other discipline teams.","Clash detection and resolution.","Implementation of document quality control processes (QA/QC).","Continuous support to the design team on adjustments and technical refinements."], closingText:"We ensured consistent technical documentation aligned with client and consultant requirements.", closingText2:"The key differentiator was our ability to bring structure, BIM rigor, and specialized technical reinforcement at a critical project phase.", images:[{src:"/images/projects/al-ameen/render-lobby.jpg",caption:"Lobby render"},{src:"/images/projects/al-ameen/render-main.png",caption:"Lattice view"},{src:"/images/projects/al-ameen/floor-plan.png",caption:"Ground floor double height"},{src:"/images/projects/al-ameen/exploded.png",caption:"Ground floor exploded view"},{src:"/images/projects/al-ameen/moodboard.png",caption:"Moodboard"}] },
    { id:"rochester-row", title:"Rochester Row |\nOffice Refurbishment", location:"London, UK", thumbnail:"/images/projects/rochester-row/hero.jpg", type:"Offices / Workplace", status:"Project completed", inDevelopment:false, heroImage:"/images/projects/rochester-row/hero.jpg", shortDesc:"Office refurbishment in central London.", longDesc:["Project information coming soon."], labor:[], images:[] },
    { id:"oro-hato-rey", title:"ORO Hato Rey |\nHotel Renovation", location:"San Juan, Puerto Rico", thumbnail:"/images/projects/oro-hato-rey/hero.jpg", type:"Hotel / Hospitality", status:"In progress", inDevelopment:false, heroImage:"/images/projects/oro-hato-rey/hero.jpg", shortDesc:"Full renovation of a boutique hotel in San Juan.", longDesc:["Project information coming soon."], labor:[], images:[] },
    { id:"sant-feliu", title:"Sant Feliu de Guíxols |\nResidential Renovation", location:"Girona, Spain", thumbnail:"/images/projects/sant-feliu/hero.jpg", type:"Residential", status:"Ongoing", inDevelopment:true, heroImage:"/images/projects/sant-feliu/hero.jpg", shortDesc:"", longDesc:[], labor:[], images:[] },
    { id:"holbein-gardens", title:"Holbein Gardens |\nCorporate Offices", location:"London, UK", thumbnail:"/images/projects/holbein-gardens/hero.jpg", type:"Offices / Workplace", status:"Ongoing", inDevelopment:true, heroImage:"/images/projects/holbein-gardens/hero.jpg", shortDesc:"", longDesc:[], labor:[], images:[] },
    { id:"andaz-turks", title:"Andaz Turks & Caicos at Grace Bay |\nHotel Renovation", location:"Turks and Caicos Islands", thumbnail:"/images/projects/andaz-turks/hero.jpg", type:"Hotel", status:"Ongoing", inDevelopment:true, heroImage:"/images/projects/andaz-turks/hero.jpg", shortDesc:"", longDesc:[], labor:[], images:[] },
  ],
  trust: { headline:"Trusted by:", logos:[{name:"Accor",src:"/images/logos/blanco/accor-blanco.svg"},{name:"Aena",src:"/images/logos/blanco/aena-blanco.svg"},{name:"Airia",src:"/images/logos/blanco/airia-blanco.svg"},{name:"Amazon",src:"/images/logos/blanco/amazon-blanco.svg"},{name:"BDG",src:"/images/logos/blanco/bdg-blanco.svg"},{name:"BGY",src:"/images/logos/blanco/bgy-blanco.svg"},{name:"Hyatt",src:"/images/logos/blanco/hyatt-blanco.svg"},{name:"Joan Lao",src:"/images/logos/blanco/joanlao-blanco.svg"},{name:"LEGO",src:"/images/logos/blanco/lego-blanco.svg"},{name:"M Gallery",src:"/images/logos/blanco/mgallery-blanco.svg"},{name:"Marriott",src:"/images/logos/blanco/marriott-blanco.svg"},{name:"Modus Operandi",src:"/images/logos/blanco/modusoperandi-blanco.svg"}] },
  methodology: {
    headline:"Experience defines our methodology",
    intro:"Our goal has always been simple: to be genuinely useful to the teams we work with.",
    subtitle:"This shapes how latroupe operates:",
    pillars:[
      {number:"I)",title:"The system adapts to the project,",subtitle:"(not the other way around)",paragraphs:["Well-constructed processes influence both the collaborating teams and the quality of the result.","Our system is flexible and proactive allowing us to work autonomously, without needing constant supervision."]},
      {number:"II)",title:"A hybrid model",subtitle:"(and global talent)",paragraphs:["Our multidisciplinary experience allows us to anticipate project needs and bring in the right talent for each case."]},
      {number:"III)",title:"We solve",subtitle:"(with intention)",paragraphs:["Being aware of our role, we provide more than just extra help.","At latroupe, we actively contribute ideas and solutions, based on our experience, to enrich from within."]},
    ],
  },
  whyUs: { headline:"Why us?", paragraphs:["At latroupe, we've worked across architecture, construction, design, technology, and business.","That is why we can offer a service that adapts to your current needs—and evolves as they change.","Our way of working is simple (but not simplistic) and is based on establishing sustainable, long-term relationships.","If you think we can help, it all starts with a conversation."] },
  contact: { headline:"Let's start a project together", fields:{name:"Name",email:"Email",company:"Message",message:"Write us a message",submit:"Send",sending:"Sending...",sent:"Sent!",error:"Could not send. Please try again."}, legal:"By clicking Send, you accept our data protection policy and agree that we may contact you.", legalLinkPhrase:"data protection policy", legalLinkHref:"/en/legal-notice" },
  footer: { links:[{label:"Privacy",href:"/en/privacy"},{label:"Cookies",href:"/en/cookies"},{label:"Legal notice",href:"/en/legal-notice"}], social:[{label:"Linkedin",href:"https://www.linkedin.com/company/latroupestudio/"},{label:"Instagram",href:"https://www.instagram.com/latroupestudio"},{label:"Pinterest",href:"https://www.pinterest.es/latroupestudio/"}], workWithUs:{label:"Work with us",href:"https://invented-cactus-ce6.notion.site/Trabajar-en-LaTroupe-cd9c990923954418bd2e6a3df58b2500"}, copyright:"Developed by latroupe ( ) 2026 © All rights reserved.", legal:"" },
  cookieBanner: {
    message: "We use first-party and third-party cookies to analyze site usage and improve our services. Non-essential cookies are only installed with your consent.",
    moreInfo: "Learn more",
    accept: "Accept",
    reject: "Reject",
  },
  overlay: { close:"CLOSE", inDevelopment:"Ongoing", comingSoon:"Coming soon" },
  bim: {
    meta: {
      title: "latroupe ( bim ) · BIM management and coordination for architecture studios",
      description: "We manage the coordination, standards and BIM production of your project. We integrate into your team and keep the model ordered, consistent and traceable across every phase. Let's start with a call.",
    },
    nav: {
      links: [{ label: "services", id: "servicios" }, { label: "process", id: "proceso" }],
      contact: { label: "contact", id: "contacto" },
      home: { label: "latroupe", id: "/en" },
    },
    hero: {
      word: "bim",
      suffix: "for your studio",
      description: "We manage the coordination, standards and BIM production of your project so your team can focus on designing. We integrate into your workflow, not the other way around.",
      cta: { label: "let's talk", id: "contacto" },
    },
    intro: {
      eyebrow: "What we do",
      headline: "A well-managed model is one that never slows you down",
      blocks: [
        "BIM management is more than modelling: it is keeping information ordered, consistent and traceable across every phase and between every discipline.",
        "We join you as your coordination and technical production team, with the rigour of the standards each project needs (ISO 19650, BEP, information levels) and the flexibility to adapt to your way of working.",
      ],
    },
    services: {
      headline: "What we manage",
      items: [
        { number:"I)", title:"Model coordination", subtitle:"(multidisciplinary)", paragraphs:["We federate architecture, structure and MEP in a common data environment. We detect and resolve clashes before they reach the site."] },
        { number:"II)", title:"Standards and BEP", subtitle:"(iso 19650)", paragraphs:["We define and maintain the BIM execution plan: folder structure, naming conventions and information levels for every deliverable."] },
        { number:"III)", title:"Technical production", subtitle:"(revit)", paragraphs:["Modelling and documentation to your standards: drawing packages, quantity schedules and models ready for coordination."] },
        { number:"IV)", title:"Quality control", subtitle:"(qa / qc)", paragraphs:["We validate models, check compliance with specifications and ensure document consistency before every milestone."] },
      ],
    },
    process: {
      headline: "How we work",
      intro: "A simple process, in short cycles, designed to integrate into your team without complicating it.",
      steps: [
        { number:"1.", title:"Kick-off", text:"We review your project, define the BEP and set the starting standards." },
        { number:"2.", title:"Integration", text:"We join your common data environment, be it ACC, BIM 360 or whatever you use." },
        { number:"3.", title:"Coordination", text:"Production, federation and clash resolution in short cycles." },
        { number:"4.", title:"Delivery", text:"Validated models and documentation, ready for each project milestone." },
      ],
    },
    banner: {
      text: "shall we coordinate your next project?",
      sub: "A single call is enough to start getting to know each other.",
      cta: { label: "let's talk", id: "contacto" },
    },
  },
};
export default en;
