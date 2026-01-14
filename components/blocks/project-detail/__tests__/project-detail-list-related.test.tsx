import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailListRelated } from "../project-detail-list-related";

describe("ProjectDetailListRelated", () => {
  const defaultProps = {
    title: "Brand Identity",
    category: "Branding",
    year: "2024",
    description: "A comprehensive brand identity system.",
    images: [
      { src: "/gallery1.jpg", alt: "Logo" },
      { src: "/gallery2.jpg", alt: "Colors" },
    ],
    relatedProjects: [
      { title: "Website Design", category: "Web", year: "2024", src: "/thumb1.jpg", alt: "Website", href: "/projects/website" },
      { title: "App Design", category: "Mobile", year: "2023", src: "/thumb2.jpg", alt: "App", href: "/projects/app" },
    ],
  };
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
