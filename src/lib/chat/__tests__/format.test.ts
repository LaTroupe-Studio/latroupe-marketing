import { describe, it, expect } from "vitest";
import { stripMarkdown, sanitizeOptions } from "../format";

describe("stripMarkdown", () => {
  it("removes bold and italic markers but keeps the words", () => {
    expect(stripMarkdown("Somos **BIM** y *rápidos*")).toBe("Somos BIM y rápidos");
  });

  it("removes headings, bullets and inline code", () => {
    expect(stripMarkdown("## Servicios\n- BIM `Revit`")).toBe("Servicios\nBIM Revit");
  });

  it("keeps the latroupe() wordmark and em dashes intact", () => {
    const text = "latroupe() se une a tu equipo — sin fricción.";
    expect(stripMarkdown(text)).toBe(text);
  });
});

describe("sanitizeOptions", () => {
  const fallback = ["See services", "Talk to the team"];
  const contact = "Talk to the team";

  it("drops Spanish options in an English session", () => {
    const options = ["How pricing works", "Que me contactéis", "Your other clients"];
    expect(sanitizeOptions(options, "en", fallback, contact)).toEqual([
      "How pricing works",
      "Your other clients",
      contact,
    ]);
  });

  it("keeps Spanish options in a Spanish session", () => {
    const options = ["Que me contactéis", "Ver servicios"];
    expect(sanitizeOptions(options, "es", fallback, "Hablar con el equipo")).toEqual(options);
  });

  it("falls back when too few options survive", () => {
    expect(sanitizeOptions(["Que me contactéis"], "en", fallback, contact)).toEqual(fallback);
  });

  it("deduplicates and caps at four options", () => {
    const options = ["A", "A", "B", "C", "D", "E"];
    expect(sanitizeOptions(options, "en", fallback, contact)).toEqual(["A", "B", "C", "D"]);
  });

  it("never returns more than four options, contact included", () => {
    const kept = sanitizeOptions(["A", "B", "C", "D", "Que me contactéis"], "en", fallback, contact);

    expect(kept).toHaveLength(4);
    expect(kept).toContain(contact);
  });
});
