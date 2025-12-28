import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailListRelated } from "../project-detail-list-related";

describe("ProjectDetailListRelated", () => {
  const defaultProps = {
    title: "Brand Identity",
    category: "Branding",
    year: "2024",
    description: "A comprehensive brand identity system.",
    images: [
      { src: "/gallery1.jpg", alt: "Logo" },
      { src: "/gallery2.jpg", alt: "Colors" },
    ],
    relatedProjects: [
      { title: "Website Design", category: "Web", year: "2024", src: "/thumb1.jpg", alt: "Website", href: "/projects/website" },
      { title: "App Design", category: "Mobile", year: "2023", src: "/thumb2.jpg", alt: "App", href: "/projects/app" },
    ],
  };

  it("renders title correctly", () => {
    render(<ProjectDetailListRelated {...defaultProps} />);
    expect(screen.getByText("Brand Identity")).toBeInTheDocument();
  });

  it("renders metadata", () => {
    render(<ProjectDetailListRelated {...defaultProps} />);
    expect(screen.getByText("Branding")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("renders images", () => {
    render(<ProjectDetailListRelated {...defaultProps} />);
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<ProjectDetailListRelated {...defaultProps} />);
    expect(screen.getByText("A comprehensive brand identity system.")).toBeInTheDocument();
  });

  it("renders all images", () => {
    render(<ProjectDetailListRelated {...defaultProps} />);
    expect(screen.getByAltText("Colors")).toBeInTheDocument();
  });

  it("renders related projects", () => {
    render(<ProjectDetailListRelated {...defaultProps} />);
    expect(screen.getByText("Website Design")).toBeInTheDocument();
    expect(screen.getByText("App Design")).toBeInTheDocument();
  });

  it("renders related project thumbnails", () => {
    render(<ProjectDetailListRelated {...defaultProps} />);
    expect(screen.getByAltText("Website")).toBeInTheDocument();
    expect(screen.getByAltText("App")).toBeInTheDocument();
  });

  it("renders related project links", () => {
    render(<ProjectDetailListRelated {...defaultProps} />);
    const links = screen.getAllByRole("link");
    const websiteLink = links.find(link => link.getAttribute("href") === "/projects/website");
    const appLink = links.find(link => link.getAttribute("href") === "/projects/app");
    expect(websiteLink).toBeInTheDocument();
    expect(appLink).toBeInTheDocument();
  });

  it("renders with empty related projects", () => {
    const props = { ...defaultProps, relatedProjects: [] };
    const { container } = render(<ProjectDetailListRelated {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with empty images", () => {
    const props = { ...defaultProps, images: [] };
    const { container } = render(<ProjectDetailListRelated {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProjectDetailListRelated {...defaultProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders back button when backHref is provided", () => {
    render(<ProjectDetailListRelated {...defaultProps} backHref="/projects" />);
    const backLink = screen.getByRole("link", { name: /back/i });
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
