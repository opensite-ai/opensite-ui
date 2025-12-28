import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailArchitectureCarousel } from "../project-detail-architecture-carousel";

describe("ProjectDetailArchitectureCarousel", () => {
  const defaultProps = {
    title: "Modern Residence",
    category: "Architecture",
    year: "2024",
    heroImage: { src: "/hero.jpg", alt: "House exterior" },
    carouselImages: [
      { src: "/slide1.jpg", alt: "Living room" },
      { src: "/slide2.jpg", alt: "Kitchen" },
      { src: "/slide3.jpg", alt: "Bedroom" },
    ],
    sections: [
      { title: "Design Concept", content: "A seamless blend of indoor and outdoor living." },
    ],
    gridImages: [
      { src: "/detail1.jpg", alt: "Detail 1" },
      { src: "/detail2.jpg", alt: "Detail 2" },
    ],
  };

  it("renders title correctly", () => {
    render(<ProjectDetailArchitectureCarousel {...defaultProps} />);
    expect(screen.getByText("Modern Residence")).toBeInTheDocument();
  });

  it("renders metadata", () => {
    render(<ProjectDetailArchitectureCarousel {...defaultProps} />);
    expect(screen.getByText("Architecture")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("renders hero image", () => {
    render(<ProjectDetailArchitectureCarousel {...defaultProps} />);
    expect(screen.getByAltText("House exterior")).toBeInTheDocument();
  });

  it("renders carousel images", () => {
    render(<ProjectDetailArchitectureCarousel {...defaultProps} />);
    expect(screen.getByAltText("Living room")).toBeInTheDocument();
  });

  it("renders content sections", () => {
    render(<ProjectDetailArchitectureCarousel {...defaultProps} />);
    expect(screen.getByText("Design Concept")).toBeInTheDocument();
    expect(screen.getByText("A seamless blend of indoor and outdoor living.")).toBeInTheDocument();
  });

  it("renders detail images", () => {
    render(<ProjectDetailArchitectureCarousel {...defaultProps} />);
    expect(screen.getByAltText("Detail 1")).toBeInTheDocument();
    expect(screen.getByAltText("Detail 2")).toBeInTheDocument();
  });

  it("renders carousel navigation controls", () => {
    const { container } = render(<ProjectDetailArchitectureCarousel {...defaultProps} />);
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("renders with empty carousel images", () => {
    const props = { ...defaultProps, carouselImages: [] };
    const { container } = render(<ProjectDetailArchitectureCarousel {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with empty sections", () => {
    const props = { ...defaultProps, sections: [] };
    const { container } = render(<ProjectDetailArchitectureCarousel {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProjectDetailArchitectureCarousel {...defaultProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders back button when backHref is provided", () => {
    render(<ProjectDetailArchitectureCarousel {...defaultProps} backHref="/projects" />);
    const backLink = screen.getByRole("link", { name: /back/i });
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
