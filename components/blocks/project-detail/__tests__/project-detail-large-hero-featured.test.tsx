import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailLargeHeroFeatured } from "../project-detail-large-hero-featured";

describe("ProjectDetailLargeHeroFeatured", () => {
  const defaultProps = {
    title: "Epic Journey",
    heroImage: { src: "/hero.jpg", alt: "Journey" },
    details: [
      { label: "Duration", value: "6 months" },
      { label: "Location", value: "Global" },
    ],
    sections: [
      { title: "The Beginning", content: "It all started with a dream..." },
    ],
    galleryImages: [
      { src: "/gallery1.jpg", alt: "Moment 1" },
      { src: "/gallery2.jpg", alt: "Moment 2" },
    ],
  };

  it("renders title correctly", () => {
    render(<ProjectDetailLargeHeroFeatured {...defaultProps} />);
    expect(screen.getByText("Epic Journey")).toBeInTheDocument();
  });

  it("renders hero image", () => {
    render(<ProjectDetailLargeHeroFeatured {...defaultProps} />);
    expect(screen.getByAltText("Journey")).toBeInTheDocument();
  });

  it("renders details grid", () => {
    render(<ProjectDetailLargeHeroFeatured {...defaultProps} />);
    expect(screen.getByText("Duration")).toBeInTheDocument();
    expect(screen.getByText("6 months")).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("Global")).toBeInTheDocument();
  });

  it("renders content sections", () => {
    render(<ProjectDetailLargeHeroFeatured {...defaultProps} />);
    expect(screen.getByText("The Beginning")).toBeInTheDocument();
    expect(screen.getByText("It all started with a dream...")).toBeInTheDocument();
  });

  it("renders section content", () => {
    render(<ProjectDetailLargeHeroFeatured {...defaultProps} />);
    expect(screen.getByText("It all started with a dream...")).toBeInTheDocument();
  });

  it("renders gallery images", () => {
    render(<ProjectDetailLargeHeroFeatured {...defaultProps} />);
    expect(screen.getByAltText("Moment 1")).toBeInTheDocument();
    expect(screen.getByAltText("Moment 2")).toBeInTheDocument();
  });

  it("renders with empty details", () => {
    const props = { ...defaultProps, details: [] };
    const { container } = render(<ProjectDetailLargeHeroFeatured {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with empty sections", () => {
    const props = { ...defaultProps, sections: [] };
    const { container } = render(<ProjectDetailLargeHeroFeatured {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProjectDetailLargeHeroFeatured {...defaultProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders back button when backHref is provided", () => {
    render(<ProjectDetailLargeHeroFeatured {...defaultProps} backHref="/projects" />);
    const backLink = screen.getByRole("link", { name: /back/i });
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
