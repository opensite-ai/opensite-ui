import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailExhibitionSidebar } from "../project-detail-exhibition-sidebar";

describe("ProjectDetailExhibitionSidebar", () => {
  const defaultProps = {
    title: "Reflections",
    category: "Mixed Media",
    year: "2024",
    heroImage: { src: "/hero.jpg", alt: "Artwork" },
    description: "A series exploring identity and self-perception.",
    exhibitions: [
      { title: "Solo Show", venue: "Modern Gallery", date: "Jan 2024" },
      { title: "Group Exhibition", venue: "Art Center", date: "Mar 2024" },
    ],
    galleryImages: [
      { src: "/gallery1.jpg", alt: "Piece 1" },
      { src: "/gallery2.jpg", alt: "Piece 2" },
    ],
  };
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
