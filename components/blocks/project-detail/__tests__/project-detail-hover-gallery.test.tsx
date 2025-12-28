import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailHoverGallery } from "../project-detail-hover-gallery";

describe("ProjectDetailHoverGallery", () => {
  const defaultProps = {
    title: "Interactive Installations",
    category: "Digital Art",
    year: "2024",
    backHref: "/projects",
    images: [
      { src: "/img1.jpg", alt: "Installation 1", title: "Light Wave", description: "An immersive light experience" },
      { src: "/img2.jpg", alt: "Installation 2", title: "Sound Garden", description: "Interactive sound sculpture" },
    ],
  };

  it("renders title correctly", () => {
    render(<ProjectDetailHoverGallery {...defaultProps} />);
    expect(screen.getByText("Interactive Installations")).toBeInTheDocument();
  });

  it("renders metadata", () => {
    render(<ProjectDetailHoverGallery {...defaultProps} />);
    expect(screen.getByText("Digital Art")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("renders all gallery images", () => {
    render(<ProjectDetailHoverGallery {...defaultProps} />);
    expect(screen.getByAltText("Installation 1")).toBeInTheDocument();
    expect(screen.getByAltText("Installation 2")).toBeInTheDocument();
  });

  it("renders image titles", () => {
    render(<ProjectDetailHoverGallery {...defaultProps} />);
    expect(screen.getByText("Light Wave")).toBeInTheDocument();
    expect(screen.getByText("Sound Garden")).toBeInTheDocument();
  });

  it("renders image descriptions", () => {
    render(<ProjectDetailHoverGallery {...defaultProps} />);
    expect(screen.getByText("An immersive light experience")).toBeInTheDocument();
    expect(screen.getByText("Interactive sound sculpture")).toBeInTheDocument();
  });

  it("renders back button", () => {
    render(<ProjectDetailHoverGallery {...defaultProps} />);
    const backLink = screen.getByRole("link", { name: /back/i });
    expect(backLink).toHaveAttribute("href", "/projects");
  });

  it("applies grid layout", () => {
    const { container } = render(<ProjectDetailHoverGallery {...defaultProps} />);
    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
  });

  it("renders with empty images array", () => {
    const props = { ...defaultProps, images: [] };
    const { container } = render(<ProjectDetailHoverGallery {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProjectDetailHoverGallery {...defaultProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
