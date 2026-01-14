import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailTabbedCaseStudy } from "../project-detail-tabbed-case-study";

describe("ProjectDetailTabbedCaseStudy", () => {
  const defaultProps = {
    title: "E-commerce Platform",
    heroImage: { src: "/hero.jpg", alt: "Platform" },
    tabs: [
      { id: "overview", label: "Overview", content: "Overview content here" },
      { id: "challenge", label: "Challenge", content: "Challenge content here" },
      { id: "solution", label: "Solution", content: "Solution content here" },
    ],
    contentSections: [
      { title: "Project Goals", content: "Increase conversion rates...", image: { src: "/img1.jpg", alt: "Goals" } },
    ],
    testimonial: {
      quote: "The results exceeded our expectations.",
      author: "CEO",
      role: "Client Company",
      avatar: "/avatar.jpg",
    },
    tools: [
      { name: "React", icon: "react" },
      { name: "Node.js", icon: "nodejs" },
    ],
  };
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
