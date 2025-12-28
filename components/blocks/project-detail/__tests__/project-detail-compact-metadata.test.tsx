import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailCompactMetadata } from "../project-detail-compact-metadata";

describe("ProjectDetailCompactMetadata", () => {
  const defaultProps = {
    title: "Mobile App Redesign",
    heroImage: { src: "/hero.jpg", alt: "App screens" },
    metadata: [
      { label: "Client", value: "TechCorp" },
      { label: "Year", value: "2024" },
      { label: "Role", value: "Lead Designer" },
    ],
    description: "A complete redesign of the mobile banking experience.",
    galleryImages: [
      { src: "/gallery1.jpg", alt: "Screen 1" },
      { src: "/gallery2.jpg", alt: "Screen 2" },
    ],
  };

  it("renders title correctly", () => {
    render(<ProjectDetailCompactMetadata {...defaultProps} />);
    expect(screen.getByText("Mobile App Redesign")).toBeInTheDocument();
  });

  it("renders hero image", () => {
    render(<ProjectDetailCompactMetadata {...defaultProps} />);
    expect(screen.getByAltText("App screens")).toBeInTheDocument();
  });

  it("renders all metadata items", () => {
    render(<ProjectDetailCompactMetadata {...defaultProps} />);
    expect(screen.getByText("Client")).toBeInTheDocument();
    expect(screen.getByText("TechCorp")).toBeInTheDocument();
    expect(screen.getByText("Year")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("Role")).toBeInTheDocument();
    expect(screen.getByText("Lead Designer")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<ProjectDetailCompactMetadata {...defaultProps} />);
    expect(screen.getByText("A complete redesign of the mobile banking experience.")).toBeInTheDocument();
  });

  it("renders gallery images", () => {
    render(<ProjectDetailCompactMetadata {...defaultProps} />);
    expect(screen.getByAltText("Screen 1")).toBeInTheDocument();
    expect(screen.getByAltText("Screen 2")).toBeInTheDocument();
  });

  it("renders with empty metadata", () => {
    const props = { ...defaultProps, metadata: [] };
    const { container } = render(<ProjectDetailCompactMetadata {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with empty gallery", () => {
    const props = { ...defaultProps, galleryImages: [] };
    const { container } = render(<ProjectDetailCompactMetadata {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProjectDetailCompactMetadata {...defaultProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders back button when backHref is provided", () => {
    render(<ProjectDetailCompactMetadata {...defaultProps} backHref="/projects" />);
    const backLink = screen.getByRole("link", { name: /back/i });
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
