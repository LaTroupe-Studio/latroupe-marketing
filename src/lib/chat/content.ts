import { Locale } from "@/lib/i18n";

export type ChatPage = "home" | "bim";

export interface ChatContent {
  welcome: Record<ChatPage, string>;
  initialOptions: Record<ChatPage, string[]>;
  /** Chip that leads to the lead form; kept on screen even if others are dropped. */
  contactOption: string;
  placeholder: string;
  send: string;
  typingLabel: string;
  errorMessage: string;
  leadForm: {
    title: string;
    name: string;
    email: string;
    message: string;
    messagePlaceholder: string;
    legal: string;
    legalLinkPhrase: string;
    legalLinkHref: string;
    submit: string;
    sending: string;
    sent: string;
    error: string;
    thankYou: string;
  };
}

const es: ChatContent = {
  welcome: {
    home: "¡Hola! Soy Latty, de latroupe(). ¿En qué te puedo ayudar?",
    bim: "¡Hola! Soy Latty, de latroupe(). ¿Qué te gustaría saber sobre nuestro servicio BIM?",
  },
  initialOptions: {
    home: ["Conocer los servicios", "Tengo un proyecto en marcha", "Hablar con el equipo"],
    bim: ["Ver servicios BIM", "Cómo empezamos", "Hablar con el equipo"],
  },
  contactOption: "Hablar con el equipo",
  placeholder: "Escribe tu mensaje...",
  send: "Enviar",
  typingLabel: "Latty está escribiendo...",
  errorMessage: "Ahora mismo no puedo responder. Prueba de nuevo en un momento.",
  leadForm: {
    title: "Que os contactemos",
    name: "Nombre",
    email: "Correo electrónico",
    message: "Mensaje",
    messagePlaceholder: "Cuéntanos brevemente tu proyecto",
    legal:
      "Al hacer clic en Enviar, aceptas nuestra política de protección de datos y que podamos ponernos en contacto contigo.",
    legalLinkPhrase: "política de protección de datos",
    legalLinkHref: "/es/aviso-legal",
    submit: "Enviar",
    sending: "Enviando...",
    sent: "¡Enviado!",
    error: "No se pudo enviar. Inténtalo de nuevo.",
    thankYou: "Gracias, os contactamos en menos de 1 día laborable.",
  },
};

const en: ChatContent = {
  welcome: {
    home: "Hi, I'm Latty from latroupe(). What can I help you with?",
    bim: "Hi, I'm Latty from latroupe(). What would you like to know about our BIM service?",
  },
  initialOptions: {
    home: ["See services", "I have an ongoing project", "Talk to the team"],
    bim: ["See BIM services", "How we start", "Talk to the team"],
  },
  contactOption: "Talk to the team",
  placeholder: "Type your message...",
  send: "Send",
  typingLabel: "Latty is typing...",
  errorMessage: "I can't reply right now. Please try again in a moment.",
  leadForm: {
    title: "Get in touch",
    name: "Name",
    email: "Email",
    message: "Message",
    messagePlaceholder: "Tell us briefly about your project",
    legal: "By clicking Send, you accept our data protection policy and agree that we may contact you.",
    legalLinkPhrase: "data protection policy",
    legalLinkHref: "/en/legal-notice",
    submit: "Send",
    sending: "Sending...",
    sent: "Sent!",
    error: "Could not send. Please try again.",
    thankYou: "Thanks, we'll get back to you within 1 working day.",
  },
};

const CHAT_CONTENT: Record<Locale, ChatContent> = { es, en };

export function getChatContent(locale: Locale): ChatContent {
  return CHAT_CONTENT[locale] ?? CHAT_CONTENT.es;
}

export function getChatPage(pathname: string): ChatPage {
  return pathname.includes("/bim-consultancy") ? "bim" : "home";
}
