import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailNumberedSections } from "../project-detail-numbered-sections";

describe("ProjectDetailNumberedSections", () => {
  const defaultProps = {
    title: "Design Process",
    heroImage: { src: "/hero.jpg", alt: "Process" },
    sections: [
      { number: "01", title: "Research", content: "Understanding user needs...", image: { src: "/img1.jpg", alt: "Research" } },
      { number: "02", title: "Design", content: "Creating solutions...", image: { src: "/img2.jpg", alt: "Design" } },
      { number: "03", title: "Develop", content: "Building the product...", image: { src: "/img3.jpg", alt: "Develop" } },
    ],
  };
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
