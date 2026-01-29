import { describe, it, expect } from "vitest";
import {
  getTextColor,
  getAccentColor,
  getBorderColor,
  type TextColorVariant,
  type BorderColorVariant,
} from "../utils";
import type { SectionBackground } from "../../src/types";

describe("getTextColor", () => {
  describe("on light backgrounds", () => {
    const lightBackgrounds: SectionBackground[] = [
      "default",
      "white",
      "gray",
      "muted",
    ];

    lightBackgrounds.forEach((bg) => {
      it(`should return correct colors for ${bg} background`, () => {
        expect(getTextColor(bg, "default")).toBe("text-foreground");
        expect(getTextColor(bg, "muted")).toBe("text-muted-foreground");
        expect(getTextColor(bg, "subtle")).toBe("text-muted-foreground/70");
        expect(getTextColor(bg, "accent")).toBe("text-primary");
      });
    });
  });

  describe("on dark backgrounds", () => {
    const darkBackgrounds: SectionBackground[] = ["dark", "secondary", "primary"];

    darkBackgrounds.forEach((bg) => {
      it(`should return correct colors for ${bg} background`, () => {
        expect(getTextColor(bg, "default")).toBe("text-foreground");
        expect(getTextColor(bg, "muted")).toBe("text-foreground/80");
        expect(getTextColor(bg, "subtle")).toBe("text-foreground/60");
        expect(getTextColor(bg, "accent")).toBe("text-accent-foreground");
      });
    });
  });

  it("should respect manual override", () => {
    expect(getTextColor("dark", "default", { override: "text-blue-600" })).toBe(
      "text-blue-600",
    );
  });

  it("should handle undefined background", () => {
    expect(getTextColor(undefined, "default")).toBe("text-foreground");
    expect(getTextColor(undefined, "muted")).toBe("text-muted-foreground");
  });
});

describe("getAccentColor", () => {
  it("should return text-primary for light backgrounds", () => {
    expect(getAccentColor("default")).toBe("text-primary");
    expect(getAccentColor("white")).toBe("text-primary");
    expect(getAccentColor("gray")).toBe("text-primary");
    expect(getAccentColor("muted")).toBe("text-primary");
  });

  it("should return text-accent-foreground for dark backgrounds", () => {
    expect(getAccentColor("dark")).toBe("text-accent-foreground");
    expect(getAccentColor("secondary")).toBe("text-accent-foreground");
    expect(getAccentColor("primary")).toBe("text-accent-foreground");
  });

  it("should respect manual override", () => {
    expect(getAccentColor("dark", { override: "text-yellow-500" })).toBe(
      "text-yellow-500",
    );
  });

  it("should handle undefined background", () => {
    expect(getAccentColor(undefined)).toBe("text-primary");
  });
});

describe("getBorderColor", () => {
  describe("on light backgrounds", () => {
    const lightBackgrounds: SectionBackground[] = [
      "default",
      "white",
      "gray",
      "muted",
    ];

    lightBackgrounds.forEach((bg) => {
      it(`should return correct border colors for ${bg} background`, () => {
        expect(getBorderColor(bg, "default")).toBe("border-border");
        expect(getBorderColor(bg, "muted")).toBe("border-muted");
        expect(getBorderColor(bg, "accent")).toBe("border-primary");
      });
    });
  });

  describe("on dark backgrounds", () => {
    const darkBackgrounds: SectionBackground[] = ["dark", "secondary", "primary"];

    darkBackgrounds.forEach((bg) => {
      it(`should return correct border colors for ${bg} background`, () => {
        expect(getBorderColor(bg, "default")).toBe("border-foreground/20");
        expect(getBorderColor(bg, "muted")).toBe("border-foreground/10");
        expect(getBorderColor(bg, "accent")).toBe("border-accent-foreground");
      });
    });
  });

  it("should respect manual override", () => {
    expect(getBorderColor("dark", "default", { override: "border-red-500" })).toBe(
      "border-red-500",
    );
  });

  it("should handle undefined background", () => {
    expect(getBorderColor(undefined, "default")).toBe("border-border");
    expect(getBorderColor(undefined, "muted")).toBe("border-muted");
  });
});

