import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailFullscreenHero } from "../project-detail-fullscreen-hero";

describe("ProjectDetailFullscreenHero", () => {
  const defaultProps = {
    title: "Mountain Expedition",
    category: "Adventure Photography",
    year: "2024",
    heroImage: { src: "/hero.jpg", alt: "Mountain landscape" },
    sections: [
      { title: "The Journey", content: "A 30-day expedition" },
    ],
  };

  it("renders title correctly", () => {
    render(<ProjectDetailFullscreenHero {...defaultProps} />);
    expect(screen.getByText("Mountain Expedition")).toBeInTheDocument();
  });

  it("renders metadata", () => {
    render(<ProjectDetailFullscreenHero {...defaultProps} />);
    expect(screen.getByText("Adventure Photography")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("renders hero image", () => {
    render(<ProjectDetailFullscreenHero {...defaultProps} />);
    expect(screen.getByAltText("Mountain landscape")).toBeInTheDocument();
  });

  it("renders content sections", () => {
    render(<ProjectDetailFullscreenHero {...defaultProps} />);
    expect(screen.getByText("The Journey")).toBeInTheDocument();
    expect(screen.getByText("A 30-day expedition")).toBeInTheDocument();
  });

  it("renders section content", () => {
    render(<ProjectDetailFullscreenHero {...defaultProps} />);
    expect(screen.getByText("A 30-day expedition")).toBeInTheDocument();
  });

  it("applies fullscreen hero styling", () => {
    const { container } = render(<ProjectDetailFullscreenHero {...defaultProps} />);
    const heroSection = container.querySelector(".min-h-screen, .h-screen");
    expect(heroSection).toBeInTheDocument();
  });

  it("renders with empty sections", () => {
    const props = { ...defaultProps, sections: [] };
    const { container } = render(<ProjectDetailFullscreenHero {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProjectDetailFullscreenHero {...defaultProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders back button when backHref is provided", () => {
    render(<ProjectDetailFullscreenHero {...defaultProps} backHref="/projects" />);
    const backLink = screen.getByRole("link", { name: /back/i });
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
