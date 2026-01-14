import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailArchitectureCarousel } from "../project-detail-architecture-carousel";

describe("ProjectDetailArchitectureCarousel", () => {
  const defaultProps = {
    title: "Modern Residence",
    category: "Architecture",
    year: "2024",
    heroImage: { src: "/hero.jpg", alt: "House exterior" },
    carouselImages: [
      { src: "/slide1.jpg", alt: "Living room" },
      { src: "/slide2.jpg", alt: "Kitchen" },
      { src: "/slide3.jpg", alt: "Bedroom" },
    ],
    sections: [
      { title: "Design Concept", content: "A seamless blend of indoor and outdoor living." },
    ],
    gridImages: [
      { src: "/detail1.jpg", alt: "Detail 1" },
      { src: "/detail2.jpg", alt: "Detail 2" },
    ],
  };
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
