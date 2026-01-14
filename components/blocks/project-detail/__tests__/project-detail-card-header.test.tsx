import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailCardHeader } from "../project-detail-card-header";

describe("ProjectDetailCardHeader", () => {
  const defaultProps = {
    title: "Dashboard Redesign",
    category: "UI/UX",
    year: "2024",
    artist: "Design Team",
    heroImage: { src: "/hero.jpg", alt: "Dashboard" },
    description: "A complete overhaul of the analytics dashboard.",
    galleryImages: [
      { src: "/gallery1.jpg", alt: "Screen 1" },
      { src: "/gallery2.jpg", alt: "Screen 2" },
    ],
  };
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
