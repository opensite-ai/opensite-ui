import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailCardHeader } from "../project-detail-card-header";

describe("ProjectDetailCardHeader", () => {
  const defaultProps = {
    title: "Dashboard Redesign",
    category: "UI/UX",
    year: "2024",
    artist: "Design Team",
    heroImage: { src: "/hero.jpg", alt: "Dashboard" },
    description: "A complete overhaul of the analytics dashboard.",
    galleryImages: [
      { src: "/gallery1.jpg", alt: "Screen 1" },
      { src: "/gallery2.jpg", alt: "Screen 2" },
    ],
  };

  it("renders title correctly", () => {
    render(<ProjectDetailCardHeader {...defaultProps} />);
    expect(screen.getByText("Dashboard Redesign")).toBeInTheDocument();
  });

  it("renders metadata badges", () => {
    render(<ProjectDetailCardHeader {...defaultProps} />);
    expect(screen.getByText("UI/UX")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("Design Team")).toBeInTheDocument();
  });

  it("renders hero image", () => {
    render(<ProjectDetailCardHeader {...defaultProps} />);
    expect(screen.getByAltText("Dashboard")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<ProjectDetailCardHeader {...defaultProps} />);
    expect(screen.getByText("A complete overhaul of the analytics dashboard.")).toBeInTheDocument();
  });

  it("renders gallery images", () => {
    render(<ProjectDetailCardHeader {...defaultProps} />);
    expect(screen.getByAltText("Screen 1")).toBeInTheDocument();
    expect(screen.getByAltText("Screen 2")).toBeInTheDocument();
  });

  it("applies card styling with rounded corners", () => {
    const { container } = render(<ProjectDetailCardHeader {...defaultProps} />);
    const roundedElement = container.querySelector(".rounded-lg, .rounded-xl, .rounded-2xl");
    expect(roundedElement).toBeInTheDocument();
  });

  it("renders with empty gallery", () => {
    const props = { ...defaultProps, galleryImages: [] };
    const { container } = render(<ProjectDetailCardHeader {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProjectDetailCardHeader {...defaultProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders back button when backHref is provided", () => {
    render(<ProjectDetailCardHeader {...defaultProps} backHref="/projects" />);
    const backLink = screen.getByRole("link", { name: /back/i });
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
