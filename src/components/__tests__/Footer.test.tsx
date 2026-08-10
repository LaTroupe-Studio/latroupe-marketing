import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { LocaleProvider } from "@/lib/locale-context";
import Footer from "../Footer";
import type { SiteContent } from "@/content/types";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

// Mock Logo
vi.mock("../Logo", () => ({
  default: ({ color, width }: { color: string; width: number }) => (
    <svg data-testid="logo" data-color={color} data-width={width} />
  ),
}));

const baseContent: SiteContent = {
  locale: "es",
  nav: { links: [], contact: { label: "contacto", id: "contacto" } },
  hero: { prefix: "", rotatingWords: [], suffix: "", description: "" },
  about: { eyebrow: "", headline: "", blocks: [] },
  projectsSection: { headline: "" },
  projectsCollage: [],
  projects: [],
  trust: { headline: "", logos: [] },
  methodology: { headline: "", intro: "", subtitle: "", pillars: [] },
  whyUs: { headline: "", paragraphs: [] },
  contact: {
    headline: "",
    intro: "",
    fields: {
      name: "",
      email: "",
      company: "",
      namePlaceholder: "",
      emailPlaceholder: "",
      message: "",
      submit: "",
      sending: "",
      sent: "",
      error: "",
    },
  },
  footer: {
    links: [
      { label: "Privacidad", href: "/es/privacidad" },
      { label: "Cookies", href: "/es/cookies" },
      { label: "Aviso legal", href: "/es/aviso-legal" },
    ],
    social: [
      { label: "Linkedin", href: "https://www.linkedin.com/company/latroupestudio/" },
      { label: "Instagram", href: "https://www.instagram.com/latroupestudio" },
      { label: "Pinterest", href: "https://www.pinterest.es/latroupestudio/" },
    ],
    workWithUs: {
      label: "Trabaja con nosotros",
      href: "https://invented-cactus-ce6.notion.site/Trabajar-en-LaTroupe-cd9c990923954418bd2e6a3df58b2500",
    },
    copyright: "Desarrollado por latroupe ( ) 2026 ©",
    legal: "",
  },
  cookieBanner: { message: "", moreInfo: "", accept: "", reject: "" },
  overlay: { close: "", inDevelopment: "", comingSoon: "" },
};

function renderFooter(overrideContent?: Partial<SiteContent["footer"]>) {
  const content: SiteContent = {
    ...baseContent,
    footer: { ...baseContent.footer, ...overrideContent },
  };
  return render(
    <LocaleProvider locale="es" content={content}>
      <Footer />
    </LocaleProvider>
  );
}

describe("Footer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Logo", () => {
    it("renderiza el logo", () => {
      renderFooter();
      expect(screen.getByTestId("logo")).toBeInTheDocument();
    });

    it("el logo usa el color terracota-3", () => {
      renderFooter();
      expect(screen.getByTestId("logo")).toHaveAttribute(
        "data-color",
        "var(--color-terracota-3)"
      );
    });

    it("el logo enlaza a la raíz del locale /es", () => {
      renderFooter();
      const logoLink = screen.getByTestId("logo").closest("a");
      expect(logoLink).toHaveAttribute("href", "/es");
    });
  });

  describe("Trabaja con nosotros", () => {
    it("renderiza el enlace Trabaja con nosotros", () => {
      renderFooter();
      expect(screen.getByText("Trabaja con nosotros")).toBeInTheDocument();
    });

    it("el enlace apunta a la URL correcta", () => {
      renderFooter();
      const link = screen.getByText("Trabaja con nosotros");
      expect(link).toHaveAttribute(
        "href",
        "https://invented-cactus-ce6.notion.site/Trabajar-en-LaTroupe-cd9c990923954418bd2e6a3df58b2500"
      );
    });

    it("el enlace abre en nueva pestaña (target=_blank)", () => {
      renderFooter();
      const link = screen.getByText("Trabaja con nosotros");
      expect(link).toHaveAttribute("target", "_blank");
    });

    it("el enlace tiene rel=noopener noreferrer por seguridad", () => {
      renderFooter();
      const link = screen.getByText("Trabaja con nosotros");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("no renderiza el enlace si workWithUs es undefined", () => {
      renderFooter({ workWithUs: undefined });
      expect(screen.queryByText("Trabaja con nosotros")).not.toBeInTheDocument();
    });
  });

  describe("Redes sociales", () => {
    it("renderiza los 3 enlaces sociales", () => {
      renderFooter();
      expect(screen.getByText("Linkedin")).toBeInTheDocument();
      expect(screen.getByText("Instagram")).toBeInTheDocument();
      expect(screen.getByText("Pinterest")).toBeInTheDocument();
    });

    it("Linkedin apunta a la URL correcta", () => {
      renderFooter();
      expect(screen.getByText("Linkedin")).toHaveAttribute(
        "href",
        "https://www.linkedin.com/company/latroupestudio/"
      );
    });

    it("Instagram apunta a la URL correcta", () => {
      renderFooter();
      expect(screen.getByText("Instagram")).toHaveAttribute(
        "href",
        "https://www.instagram.com/latroupestudio"
      );
    });

    it("Pinterest apunta a la URL correcta", () => {
      renderFooter();
      expect(screen.getByText("Pinterest")).toHaveAttribute(
        "href",
        "https://www.pinterest.es/latroupestudio/"
      );
    });

    it("todos los enlaces sociales abren en nueva pestaña", () => {
      renderFooter();
      ["Linkedin", "Instagram", "Pinterest"].forEach((label) => {
        expect(screen.getByText(label)).toHaveAttribute("target", "_blank");
      });
    });

    it("todos los enlaces sociales tienen rel=noopener noreferrer", () => {
      renderFooter();
      ["Linkedin", "Instagram", "Pinterest"].forEach((label) => {
        expect(screen.getByText(label)).toHaveAttribute(
          "rel",
          "noopener noreferrer"
        );
      });
    });

    it("no renderiza social si el array está vacío", () => {
      renderFooter({ social: [] });
      expect(screen.queryByText("Linkedin")).not.toBeInTheDocument();
    });
  });

  describe("Copyright", () => {
    it("muestra el texto de copyright", () => {
      renderFooter();
      expect(
        screen.getByText("Desarrollado por latroupe ( ) 2026 ©")
      ).toBeInTheDocument();
    });
  });

  describe("Enlaces legales", () => {
    it("renderiza los 3 enlaces legales", () => {
      renderFooter();
      expect(screen.getByText("Privacidad")).toBeInTheDocument();
      expect(screen.getByText("Cookies")).toBeInTheDocument();
      expect(screen.getByText("Aviso legal")).toBeInTheDocument();
    });

    it("Privacidad apunta a la ruta correcta", () => {
      renderFooter();
      expect(screen.getByText("Privacidad")).toHaveAttribute(
        "href",
        "/es/privacidad"
      );
    });

    it("Cookies apunta a la ruta correcta", () => {
      renderFooter();
      expect(screen.getByText("Cookies")).toHaveAttribute(
        "href",
        "/es/cookies"
      );
    });

    it("Aviso legal apunta a la ruta correcta", () => {
      renderFooter();
      expect(screen.getByText("Aviso legal")).toHaveAttribute(
        "href",
        "/es/aviso-legal"
      );
    });
  });

  describe("Estructura", () => {
    it("renderiza el elemento footer", () => {
      const { container } = renderFooter();
      expect(container.querySelector("footer")).toBeInTheDocument();
    });
  });
});
