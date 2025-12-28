import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailMaskReveal } from "../project-detail-mask-reveal";

describe("ProjectDetailMaskReveal", () => {
  const defaultProps = {
    title: "Visual Journey",
    heroImage: { src: "/hero.jpg", alt: "Journey" },
    revealImages: [
      { src: "/reveal1.jpg", alt: "Scene 1", caption: "The beginning" },
      { src: "/reveal2.jpg", alt: "Scene 2", caption: "The middle" },
      { src: "/reveal3.jpg", alt: "Scene 3", caption: "The end" },
    ],
  };

  it("renders title correctly", () => {
    render(<ProjectDetailMaskReveal {...defaultProps} />);
    expect(screen.getByText("Visual Journey")).toBeInTheDocument();
  });

  it("renders hero image", () => {
    render(<ProjectDetailMaskReveal {...defaultProps} />);
    expect(screen.getByAltText("Journey")).toBeInTheDocument();
  });

  it("renders all reveal images", () => {
    render(<ProjectDetailMaskReveal {...defaultProps} />);
    expect(screen.getByAltText("Scene 1")).toBeInTheDocument();
    expect(screen.getByAltText("Scene 2")).toBeInTheDocument();
    expect(screen.getByAltText("Scene 3")).toBeInTheDocument();
  });

  it("renders image captions", () => {
    render(<ProjectDetailMaskReveal {...defaultProps} />);
    expect(screen.getByText("The beginning")).toBeInTheDocument();
    expect(screen.getByText("The middle")).toBeInTheDocument();
    expect(screen.getByText("The end")).toBeInTheDocument();
  });

  it("renders with empty reveal images", () => {
    const props = { ...defaultProps, revealImages: [] };
    const { container } = render(<ProjectDetailMaskReveal {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProjectDetailMaskReveal {...defaultProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders back button when backHref is provided", () => {
    render(<ProjectDetailMaskReveal {...defaultProps} backHref="/projects" />);
    const backLink = screen.getByRole("link", { name: /back/i });
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
