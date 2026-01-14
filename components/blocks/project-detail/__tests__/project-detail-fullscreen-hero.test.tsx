import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailFullscreenHero } from "../project-detail-fullscreen-hero";

describe("ProjectDetailFullscreenHero", () => {
  const defaultProps = {
    title: "Mountain Expedition",
    category: "Adventure Photography",
    year: "2024",
    heroImage: { src: "/hero.jpg", alt: "Mountain landscape" },
    sections: [
      { title: "The Journey", content: "A 30-day expedition" },
    ],
  };
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
