import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailCompactMetadata } from "../project-detail-compact-metadata";

describe("ProjectDetailCompactMetadata", () => {
  const defaultProps = {
    title: "Mobile App Redesign",
    heroImage: { src: "/hero.jpg", alt: "App screens" },
    metadata: [
      { label: "Client", value: "TechCorp" },
      { label: "Year", value: "2024" },
      { label: "Role", value: "Lead Designer" },
    ],
    description: "A complete redesign of the mobile banking experience.",
    galleryImages: [
      { src: "/gallery1.jpg", alt: "Screen 1" },
      { src: "/gallery2.jpg", alt: "Screen 2" },
    ],
  };
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
