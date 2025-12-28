import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailGridGallery } from "../project-detail-grid-gallery";

describe("ProjectDetailGridGallery", () => {
  const defaultProps = {
    title: "Summer Collection",
    category: "Fashion",
    year: "2024",
    description: "Our latest summer fashion collection.",
    images: [
      { src: "/img1.jpg", alt: "Look 1", caption: "Sunset dress" },
      { src: "/img2.jpg", alt: "Look 2", caption: "Ocean breeze top" },
      { src: "/img3.jpg", alt: "Look 3" },
    ],
  };

  it("renders title correctly", () => {
    render(<ProjectDetailGridGallery {...defaultProps} />);
    expect(screen.getByText("Summer Collection")).toBeInTheDocument();
  });

  it("renders metadata", () => {
    render(<ProjectDetailGridGallery {...defaultProps} />);
    expect(screen.getByText("Fashion")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<ProjectDetailGridGallery {...defaultProps} />);
    expect(screen.getByText("Our latest summer fashion collection.")).toBeInTheDocument();
  });

  it("renders all gallery images", () => {
    render(<ProjectDetailGridGallery {...defaultProps} />);
    expect(screen.getByAltText("Look 1")).toBeInTheDocument();
    expect(screen.getByAltText("Look 2")).toBeInTheDocument();
    expect(screen.getByAltText("Look 3")).toBeInTheDocument();
  });

  it("renders image captions", () => {
    render(<ProjectDetailGridGallery {...defaultProps} />);
    expect(screen.getByText("Sunset dress")).toBeInTheDocument();
    expect(screen.getByText("Ocean breeze top")).toBeInTheDocument();
  });

  it("applies grid layout", () => {
    const { container } = render(<ProjectDetailGridGallery {...defaultProps} />);
    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
  });

  it("renders with empty images array", () => {
    const props = { ...defaultProps, images: [] };
    const { container } = render(<ProjectDetailGridGallery {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProjectDetailGridGallery {...defaultProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders back button when backHref is provided", () => {
    render(<ProjectDetailGridGallery {...defaultProps} backHref="/projects" />);
    const backLink = screen.getByRole("link", { name: /back/i });
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
