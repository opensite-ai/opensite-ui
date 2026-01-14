import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailCaseStudyProse } from "../project-detail-case-study-prose";

describe("ProjectDetailCaseStudyProse", () => {
  const defaultProps = {
    title: "Brand Redesign",
    category: "Branding",
    year: "2024",
    heroImage: { src: "/hero.jpg", alt: "Hero image" },
    sections: [
      { title: "The Challenge", content: "Our client needed a fresh identity." },
      { title: "The Solution", content: "We developed a comprehensive brand system." },
    ],
  };
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
