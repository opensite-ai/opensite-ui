import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailExhibitionSidebar } from "../project-detail-exhibition-sidebar";

describe("ProjectDetailExhibitionSidebar", () => {
  const defaultProps = {
    title: "Reflections",
    category: "Mixed Media",
    year: "2024",
    heroImage: { src: "/hero.jpg", alt: "Artwork" },
    description: "A series exploring identity and self-perception.",
    exhibitions: [
      { title: "Solo Show", venue: "Modern Gallery", date: "Jan 2024" },
      { title: "Group Exhibition", venue: "Art Center", date: "Mar 2024" },
    ],
    galleryImages: [
      { src: "/gallery1.jpg", alt: "Piece 1" },
      { src: "/gallery2.jpg", alt: "Piece 2" },
    ],
  };

  it("renders title correctly", () => {
    render(<ProjectDetailExhibitionSidebar {...defaultProps} />);
    expect(screen.getByText("Reflections")).toBeInTheDocument();
  });

  it("renders metadata", () => {
    render(<ProjectDetailExhibitionSidebar {...defaultProps} />);
    expect(screen.getByText("Mixed Media")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("renders hero image", () => {
    render(<ProjectDetailExhibitionSidebar {...defaultProps} />);
    expect(screen.getByAltText("Artwork")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<ProjectDetailExhibitionSidebar {...defaultProps} />);
    expect(screen.getByText("A series exploring identity and self-perception.")).toBeInTheDocument();
  });

  it("renders all exhibitions", () => {
    render(<ProjectDetailExhibitionSidebar {...defaultProps} />);
    expect(screen.getByText("Solo Show")).toBeInTheDocument();
    expect(screen.getByText("Modern Gallery")).toBeInTheDocument();
    expect(screen.getByText("Jan 2024")).toBeInTheDocument();
    expect(screen.getByText("Group Exhibition")).toBeInTheDocument();
    expect(screen.getByText("Art Center")).toBeInTheDocument();
  });

  it("renders gallery images", () => {
    render(<ProjectDetailExhibitionSidebar {...defaultProps} />);
    expect(screen.getByAltText("Piece 1")).toBeInTheDocument();
    expect(screen.getByAltText("Piece 2")).toBeInTheDocument();
  });

  it("renders with empty exhibitions", () => {
    const props = { ...defaultProps, exhibitions: [] };
    const { container } = render(<ProjectDetailExhibitionSidebar {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with empty gallery", () => {
    const props = { ...defaultProps, galleryImages: [] };
    const { container } = render(<ProjectDetailExhibitionSidebar {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProjectDetailExhibitionSidebar {...defaultProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders back button when backHref is provided", () => {
    render(<ProjectDetailExhibitionSidebar {...defaultProps} backHref="/projects" />);
    const backLink = screen.getByRole("link", { name: /back/i });
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
