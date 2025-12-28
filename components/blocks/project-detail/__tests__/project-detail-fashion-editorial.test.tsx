import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailFashionEditorial } from "../project-detail-fashion-editorial";

describe("ProjectDetailFashionEditorial", () => {
  const defaultProps = {
    title: "AUTUMN COLLECTION",
    heroImage: { src: "/hero.jpg", alt: "Fashion shoot" },
    credits: [
      { role: "Photographer", name: "Jane Doe" },
      { role: "Stylist", name: "John Smith" },
      { role: "Model", name: "Alex Johnson" },
    ],
    galleryImages: [
      { src: "/gallery1.jpg", alt: "Look 1" },
      { src: "/gallery2.jpg", alt: "Look 2" },
    ],
  };

  it("renders title correctly", () => {
    render(<ProjectDetailFashionEditorial {...defaultProps} />);
    expect(screen.getByText("AUTUMN COLLECTION")).toBeInTheDocument();
  });

  it("renders hero image", () => {
    render(<ProjectDetailFashionEditorial {...defaultProps} />);
    expect(screen.getByAltText("Fashion shoot")).toBeInTheDocument();
  });

  it("renders all credits", () => {
    render(<ProjectDetailFashionEditorial {...defaultProps} />);
    expect(screen.getByText("Photographer")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("Stylist")).toBeInTheDocument();
    expect(screen.getByText("John Smith")).toBeInTheDocument();
    expect(screen.getByText("Model")).toBeInTheDocument();
    expect(screen.getByText("Alex Johnson")).toBeInTheDocument();
  });

  it("renders gallery images", () => {
    render(<ProjectDetailFashionEditorial {...defaultProps} />);
    expect(screen.getByAltText("Look 1")).toBeInTheDocument();
    expect(screen.getByAltText("Look 2")).toBeInTheDocument();
  });

  it("renders with empty credits", () => {
    const props = { ...defaultProps, credits: [] };
    const { container } = render(<ProjectDetailFashionEditorial {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with empty gallery", () => {
    const props = { ...defaultProps, galleryImages: [] };
    const { container } = render(<ProjectDetailFashionEditorial {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProjectDetailFashionEditorial {...defaultProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders back button when backHref is provided", () => {
    render(<ProjectDetailFashionEditorial {...defaultProps} backHref="/projects" />);
    const backLink = screen.getByRole("link", { name: /back/i });
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
