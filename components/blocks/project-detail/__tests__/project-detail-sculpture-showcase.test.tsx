import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailSculptureShowcase } from "../project-detail-sculpture-showcase";

describe("ProjectDetailSculptureShowcase", () => {
  const defaultProps = {
    title: "Metamorphosis",
    artist: "John Doe",
    year: "2024",
    heroImage: { src: "/hero.jpg", alt: "Sculpture" },
    dimensions: "48 x 24 x 36 inches",
    materials: "Bronze, Steel",
    location: "Modern Art Museum",
    description: "A transformative piece exploring change and growth.",
    galleryImages: [
      { src: "/gallery1.jpg", alt: "Detail view 1" },
      { src: "/gallery2.jpg", alt: "Detail view 2" },
    ],
  };
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
