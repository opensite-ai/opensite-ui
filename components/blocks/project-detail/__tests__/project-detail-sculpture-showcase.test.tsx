import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailSculptureShowcase } from "../project-detail-sculpture-showcase";

describe("ProjectDetailSculptureShowcase", () => {
  const defaultProps = {
    title: "Metamorphosis",
    artist: "John Doe",
    year: "2024",
    heroImage: { src: "/hero.jpg", alt: "Sculpture" },
    dimensions: "48 x 24 x 36 inches",
    materials: "Bronze, Steel",
    location: "Modern Art Museum",
    description: "A transformative piece exploring change and growth.",
    galleryImages: [
      { src: "/gallery1.jpg", alt: "Detail view 1" },
      { src: "/gallery2.jpg", alt: "Detail view 2" },
    ],
  };

  it("renders title correctly", () => {
    render(<ProjectDetailSculptureShowcase {...defaultProps} />);
    expect(screen.getByText("Metamorphosis")).toBeInTheDocument();
  });

  it("renders artist name", () => {
    render(<ProjectDetailSculptureShowcase {...defaultProps} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders specifications", () => {
    render(<ProjectDetailSculptureShowcase {...defaultProps} />);
    expect(screen.getByText("48 x 24 x 36 inches")).toBeInTheDocument();
    expect(screen.getByText("Bronze, Steel")).toBeInTheDocument();
  });

  it("renders location", () => {
    render(<ProjectDetailSculptureShowcase {...defaultProps} />);
    expect(screen.getByText("Modern Art Museum")).toBeInTheDocument();
  });

  it("renders hero image", () => {
    render(<ProjectDetailSculptureShowcase {...defaultProps} />);
    expect(screen.getByAltText("Sculpture")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<ProjectDetailSculptureShowcase {...defaultProps} />);
    expect(screen.getByText("A transformative piece exploring change and growth.")).toBeInTheDocument();
  });

  it("renders gallery images", () => {
    render(<ProjectDetailSculptureShowcase {...defaultProps} />);
    expect(screen.getByAltText("Detail view 1")).toBeInTheDocument();
    expect(screen.getByAltText("Detail view 2")).toBeInTheDocument();
  });

  it("renders with empty gallery", () => {
    const props = { ...defaultProps, galleryImages: [] };
    const { container } = render(<ProjectDetailSculptureShowcase {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProjectDetailSculptureShowcase {...defaultProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders back button when backHref is provided", () => {
    render(<ProjectDetailSculptureShowcase {...defaultProps} backHref="/projects" />);
    const backLink = screen.getByRole("link", { name: /back/i });
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
