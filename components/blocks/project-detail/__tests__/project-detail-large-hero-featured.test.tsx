import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailLargeHeroFeatured } from "../project-detail-large-hero-featured";

describe("ProjectDetailLargeHeroFeatured", () => {
  const defaultProps = {
    title: "Epic Journey",
    heroImage: { src: "/hero.jpg", alt: "Journey" },
    details: [
      { label: "Duration", value: "6 months" },
      { label: "Location", value: "Global" },
    ],
    sections: [
      { title: "The Beginning", content: "It all started with a dream..." },
    ],
    galleryImages: [
      { src: "/gallery1.jpg", alt: "Moment 1" },
      { src: "/gallery2.jpg", alt: "Moment 2" },
    ],
  };
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
