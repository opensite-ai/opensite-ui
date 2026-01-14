import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailHeroMetadata } from "../project-detail-hero-metadata";

describe("ProjectDetailHeroMetadata", () => {
  const defaultProps = {
    title: "Test Project",
    category: "Digital Art",
    year: "2024",
    client: "Jane Smith",
    heroImage: { src: "/hero.jpg", alt: "Hero image" },
    description: "A test project description",
    action: { label: "View Project", href: "/projects/test" },
  };
    expect(ctaLink).toHaveAttribute("href", "/projects/test");
  });
});
