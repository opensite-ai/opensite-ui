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

  it("renders title correctly", () => {
    render(<ProjectDetailCaseStudyProse {...defaultProps} />);
    expect(screen.getByText("Brand Redesign")).toBeInTheDocument();
  });

  it("renders metadata", () => {
    render(<ProjectDetailCaseStudyProse {...defaultProps} />);
    expect(screen.getByText("Branding")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("renders hero image", () => {
    render(<ProjectDetailCaseStudyProse {...defaultProps} />);
    expect(screen.getByAltText("Hero image")).toBeInTheDocument();
  });

  it("renders all prose sections", () => {
    render(<ProjectDetailCaseStudyProse {...defaultProps} />);
    expect(screen.getByText("The Challenge")).toBeInTheDocument();
    expect(screen.getByText("Our client needed a fresh identity.")).toBeInTheDocument();
    expect(screen.getByText("The Solution")).toBeInTheDocument();
    expect(screen.getByText("We developed a comprehensive brand system.")).toBeInTheDocument();
  });

  it("renders with empty sections", () => {
    const props = { ...defaultProps, sections: [] };
    const { container } = render(<ProjectDetailCaseStudyProse {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProjectDetailCaseStudyProse {...defaultProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders back button when backHref is provided", () => {
    render(<ProjectDetailCaseStudyProse {...defaultProps} backHref="/projects" />);
    const backLink = screen.getByRole("link", { name: /back/i });
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
