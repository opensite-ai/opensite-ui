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

  it("renders title correctly", () => {
    render(<ProjectDetailHeroMetadata {...defaultProps} />);
    expect(screen.getByText("Test Project")).toBeInTheDocument();
  });

  it("renders metadata", () => {
    render(<ProjectDetailHeroMetadata {...defaultProps} />);
    expect(screen.getByText("Digital Art")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<ProjectDetailHeroMetadata {...defaultProps} />);
    expect(screen.getByText("A test project description")).toBeInTheDocument();
  });

  it("renders hero image", () => {
    render(<ProjectDetailHeroMetadata {...defaultProps} />);
    expect(screen.getByAltText("Hero image")).toBeInTheDocument();
  });

  it("renders CTA link", () => {
    render(<ProjectDetailHeroMetadata {...defaultProps} />);
    expect(screen.getByText("View Project")).toBeInTheDocument();
  });

  it("renders without CTA when not provided", () => {
    const props = { ...defaultProps, action: undefined };
    const { container } = render(<ProjectDetailHeroMetadata {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProjectDetailHeroMetadata {...defaultProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders CTA link with correct href", () => {
    render(<ProjectDetailHeroMetadata {...defaultProps} />);
    const ctaLink = screen.getByRole("link", { name: /view project/i });
    expect(ctaLink).toHaveAttribute("href", "/projects/test");
  });
});
