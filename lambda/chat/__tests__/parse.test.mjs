import { describe, it, expect } from "vitest";
import { parseReply, sanitizeOptions, stripMarkdown } from "../index.mjs";
import { composeSystemPrompt, LEAD_FORM_MARKER } from "../prompt.mjs";

describe("parseReply", () => {
  it("splits the reply, the options and the lead-form marker", () => {
    const raw = `Podemos entrar en cualquier fase.\n${LEAD_FORM_MARKER}\n[OPTIONS: Ver servicios | Que me contactéis]`;
    const parsed = parseReply(raw, "es");

    expect(parsed.text).toBe("Podemos entrar en cualquier fase.");
    expect(parsed.options).toEqual(["Ver servicios", "Que me contactéis"]);
    expect(parsed.shouldOpenLeadForm).toBe(true);
  });

  it("strips markdown that slipped into the reply", () => {
    const parsed = parseReply("Trabajamos con **ISO 19650** y *COBie*.\n[OPTIONS: A | B]", "es");
    expect(parsed.text).toBe("Trabajamos con ISO 19650 y COBie.");
  });

  it("drops a Spanish option from an English reply", () => {
    const raw = "We can join mid-project.\n[OPTIONS: How pricing works | Que me contactéis | Your other clients]";
    expect(parseReply(raw, "en").options).toEqual(["How pricing works", "Your other clients", "Get in touch"]);
  });
});

describe("sanitizeOptions", () => {
  it("keeps a contact option available after dropping one", () => {
    const kept = sanitizeOptions(["How pricing works", "Que me contactéis"], "en");
    expect(kept).toContain("Get in touch");
  });

  it("leaves a correct English set untouched", () => {
    const options = ["See services", "Talk to the team"];
    expect(sanitizeOptions(options, "en")).toEqual(options);
  });

  it("does not touch Spanish options in a Spanish session", () => {
    const options = ["Que me contactéis", "Ver servicios"];
    expect(sanitizeOptions(options, "es")).toEqual(options);
  });

  it("never returns more than four options, contact included", () => {
    const options = ["A", "B", "C", "D", "Que me contactéis"];
    const kept = sanitizeOptions(options, "en");

    expect(kept).toHaveLength(4);
    expect(kept).toContain("Get in touch");
  });
});

describe("stripMarkdown", () => {
  it("keeps the latroupe() wordmark intact", () => {
    expect(stripMarkdown("Somos latroupe() — **BIM** sin fricción.")).toBe(
      "Somos latroupe() — BIM sin fricción.",
    );
  });
});

describe("composeSystemPrompt", () => {
  it("states the session language and gives the contact option in that language", () => {
    const en = composeSystemPrompt({ locale: "en", pagePath: "/en/bim-consultancy" });
    expect(en).toContain("Escribe TODA tu salida en English");
    expect(en).toContain('"Get in touch" or "Talk to the team"');
    expect(en).not.toContain('variante de "Que me contactéis"');
  });

  it("applies the BIM page context on the consultancy landing", () => {
    const en = composeSystemPrompt({ locale: "en", pagePath: "/en/bim-consultancy" });
    expect(en).toContain("landing del servicio BIM");
  });
});
