import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailPhotographyBreadcrumb } from "../project-detail-photography-breadcrumb";

describe("ProjectDetailPhotographyBreadcrumb", () => {
  const defaultProps = {
    title: "Street Photography",
    subtitle: "Urban life in motion",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Photography", href: "/photography" },
      { label: "Street" },
    ],
    year: "2024",
    category: "Photography",
    photographer: "John Doe",
    description: "Capturing the energy and diversity of city streets.",
    heroImage: { src: "/hero.jpg", alt: "Street scene" },
    galleryImages: [
      { src: "/gallery1.jpg", alt: "Photo 1" },
      { src: "/gallery2.jpg", alt: "Photo 2" },
    ],
  };
});
