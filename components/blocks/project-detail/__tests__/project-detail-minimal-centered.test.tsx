import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailMinimalCentered } from "../project-detail-minimal-centered";

describe("ProjectDetailMinimalCentered", () => {
  const defaultProps = {
    title: "Quiet Moments",
    subtitle: "A meditation on stillness",
    description: "A photographic series exploring moments of peace in everyday life.",
    images: [
      { src: "/hero.jpg", alt: "Quiet scene" },
      { src: "/gallery1.jpg", alt: "Moment 1" },
      { src: "/gallery2.jpg", alt: "Moment 2" },
    ],
  };

  it("renders title correctly", () => {
    render(<ProjectDetailMinimalCentered {...defaultProps} />);
    expect(screen.getByText("Quiet Moments")).toBeInTheDocument();
  });

  it("renders subtitle", () => {
    render(<ProjectDetailMinimalCentered {...defaultProps} />);
    expect(screen.getByText("A meditation on stillness")).toBeInTheDocument();
  });

  it("renders images", () => {
    render(<ProjectDetailMinimalCentered {...defaultProps} />);
    expect(screen.getByAltText("Quiet scene")).toBeInTheDocument();
    expect(screen.getByAltText("Moment 1")).toBeInTheDocument();
    expect(screen.getByAltText("Moment 2")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<ProjectDetailMinimalCentered {...defaultProps} />);
    expect(screen.getByText("A photographic series exploring moments of peace in everyday life.")).toBeInTheDocument();
  });

  it("applies centered text alignment", () => {
    const { container } = render(<ProjectDetailMinimalCentered {...defaultProps} />);
    const centeredElement = container.querySelector(".text-center");
    expect(centeredElement).toBeInTheDocument();
  });

  it("renders with empty images", () => {
    const props = { ...defaultProps, images: [] };
    const { container } = render(<ProjectDetailMinimalCentered {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProjectDetailMinimalCentered {...defaultProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders back button when backHref is provided", () => {
    render(<ProjectDetailMinimalCentered {...defaultProps} backHref="/projects" />);
    const backLink = screen.getByRole("link", { name: /back/i });
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
