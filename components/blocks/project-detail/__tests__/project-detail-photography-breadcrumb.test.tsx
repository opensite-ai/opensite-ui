import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailPhotographyBreadcrumb } from "../project-detail-photography-breadcrumb";

describe("ProjectDetailPhotographyBreadcrumb", () => {
  const defaultProps = {
    title: "Street Photography",
    subtitle: "Urban life in motion",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Photography", href: "/photography" },
      { label: "Street" },
    ],
    year: "2024",
    category: "Photography",
    photographer: "John Doe",
    description: "Capturing the energy and diversity of city streets.",
    heroImage: { src: "/hero.jpg", alt: "Street scene" },
    galleryImages: [
      { src: "/gallery1.jpg", alt: "Photo 1" },
      { src: "/gallery2.jpg", alt: "Photo 2" },
    ],
  };

  it("renders title and subtitle", () => {
    render(<ProjectDetailPhotographyBreadcrumb {...defaultProps} />);
    expect(screen.getByText("Street Photography")).toBeInTheDocument();
    expect(screen.getByText("Urban life in motion")).toBeInTheDocument();
  });

  it("renders breadcrumb navigation", () => {
    render(<ProjectDetailPhotographyBreadcrumb {...defaultProps} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getAllByText("Photography").length).toBeGreaterThan(0);
    expect(screen.getByText("Street")).toBeInTheDocument();
  });

  it("renders breadcrumb links", () => {
    render(<ProjectDetailPhotographyBreadcrumb {...defaultProps} />);
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
  });

  it("renders metadata", () => {
    render(<ProjectDetailPhotographyBreadcrumb {...defaultProps} />);
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getAllByText("Photography").length).toBeGreaterThan(0);
    expect(screen.getByText("Year")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<ProjectDetailPhotographyBreadcrumb {...defaultProps} />);
    expect(screen.getByText("Capturing the energy and diversity of city streets.")).toBeInTheDocument();
  });

  it("renders hero image", () => {
    render(<ProjectDetailPhotographyBreadcrumb {...defaultProps} />);
    expect(screen.getByAltText("Street scene")).toBeInTheDocument();
  });

  it("renders gallery images", () => {
    render(<ProjectDetailPhotographyBreadcrumb {...defaultProps} />);
    expect(screen.getByAltText("Photo 1")).toBeInTheDocument();
    expect(screen.getByAltText("Photo 2")).toBeInTheDocument();
  });

  it("renders with empty breadcrumbs", () => {
    const props = { ...defaultProps, breadcrumbs: [] };
    const { container } = render(<ProjectDetailPhotographyBreadcrumb {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders photographer info", () => {
    render(<ProjectDetailPhotographyBreadcrumb {...defaultProps} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProjectDetailPhotographyBreadcrumb {...defaultProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders breadcrumb links correctly", () => {
    render(<ProjectDetailPhotographyBreadcrumb {...defaultProps} />);
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
  });
});
