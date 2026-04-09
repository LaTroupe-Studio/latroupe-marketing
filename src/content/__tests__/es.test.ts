import { describe, it, expect } from "vitest";
import es from "../es";

describe("Contenido ES — estructura", () => {
  it("locale es 'es'", () => {
    expect(es.locale).toBe("es");
  });

  it("tiene links de navegación", () => {
    expect(es.nav.links.length).toBeGreaterThan(0);
    es.nav.links.forEach((link) => {
      expect(link.label).toBeTruthy();
      expect(link.id).toBeTruthy();
    });
  });

  it("tiene rotatingWords en el hero", () => {
    expect(es.hero.rotatingWords.length).toBeGreaterThan(0);
  });

  it("tiene proyectos definidos", () => {
    expect(es.projects.length).toBeGreaterThan(0);
  });

  it("cada proyecto tiene id, title, status y heroImage", () => {
    es.projects.forEach((p) => {
      expect(p.id).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.status).toBeTruthy();
      expect(p.heroImage).toBeTruthy();
    });
  });

  it("tiene logos de trust", () => {
    expect(es.trust.logos.length).toBeGreaterThan(0);
  });

  it("cada logo tiene name y src", () => {
    es.trust.logos.forEach((logo) => {
      expect(logo.name).toBeTruthy();
      expect(logo.src).toBeTruthy();
    });
  });
});

describe("Contenido ES — footer", () => {
  it("tiene 3 enlaces legales", () => {
    expect(es.footer.links).toHaveLength(3);
  });

  it("los enlaces legales apuntan a rutas /es/", () => {
    es.footer.links.forEach((link) => {
      expect(link.href).toMatch(/^\/es\//);
      expect(link.label).toBeTruthy();
    });
  });

  it("tiene 3 redes sociales", () => {
    expect(es.footer.social).toHaveLength(3);
  });

  it("las redes sociales tienen label y href válidos", () => {
    es.footer.social?.forEach((s) => {
      expect(s.label).toBeTruthy();
      expect(s.href).toMatch(/^https:\/\//);
    });
  });

  it("workWithUs tiene label y href", () => {
    expect(es.footer.workWithUs?.label).toBeTruthy();
    expect(es.footer.workWithUs?.href).toMatch(/^https:\/\//);
  });

  it("el copyright existe y no está vacío", () => {
    expect(es.footer.copyright).toBeTruthy();
  });

  it("el copyright contiene el año 2026", () => {
    expect(es.footer.copyright).toContain("2026");
  });
});

describe("Contenido ES — metodología", () => {
  it("tiene 3 pilares", () => {
    expect(es.methodology.pillars).toHaveLength(3);
  });

  it("cada pilar tiene number, title, subtitle y paragraphs", () => {
    es.methodology.pillars.forEach((pillar) => {
      expect(pillar.number).toBeTruthy();
      expect(pillar.title).toBeTruthy();
      expect(pillar.subtitle).toBeTruthy();
      expect(pillar.paragraphs.length).toBeGreaterThan(0);
    });
  });
});

describe("Contenido ES — contacto", () => {
  it("tiene todos los campos del formulario", () => {
    const { fields } = es.contact;
    expect(fields.name).toBeTruthy();
    expect(fields.email).toBeTruthy();
    expect(fields.submit).toBeTruthy();
    expect(fields.sending).toBeTruthy();
    expect(fields.sent).toBeTruthy();
    expect(fields.error).toBeTruthy();
  });

  it("legalLinkHref apunta a una ruta /es/", () => {
    expect(es.contact.legalLinkHref).toMatch(/^\/es\//);
  });
});
