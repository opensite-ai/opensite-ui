import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CaseStudiesImageGrid } from "../case-studies-image-grid";

// Mock dependencies
vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, size }: { name: string; size: number }) => (
    <span data-testid="mock-icon" data-name={name} data-size={size}>icon</span>
  ),
}));

describe("CaseStudiesImageGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<CaseStudiesImageGrid />);
    expect(screen.getByText("Discover how our solutions drive business growth")).toBeInTheDocument();
    expect(screen.getByText("Learn how our platform enhances business performance")).toBeInTheDocument();
  });

  it("renders default case study titles", () => {
    render(<CaseStudiesImageGrid />);
    expect(screen.getByText("Discover how our solutions drive business growth")).toBeInTheDocument();
    expect(screen.getByText("Learn how our platform enhances business performance")).toBeInTheDocument();
    expect(screen.getByText("Discover how our tools empower your business for the future")).toBeInTheDocument();
  });

  it("renders custom items", () => {
    const customItems = [
      {
        image: "/custom.jpg",
        logo: "/custom-logo.svg",
        title: "Custom Study Title",
        href: "/custom",
      },
    ];

    render(<CaseStudiesImageGrid items={customItems} />);
    expect(screen.getByText("Custom Study Title")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CaseStudiesImageGrid className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<CaseStudiesImageGrid />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-32");
  });

  it("renders images for case studies", () => {
    render(<CaseStudiesImageGrid />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders all default items", () => {
    render(<CaseStudiesImageGrid />);
    expect(screen.getByText("Explore how our services can benefit your business")).toBeInTheDocument();
    expect(screen.getByText("See how our offerings boost your success in business")).toBeInTheDocument();
    expect(screen.getByText("Learn how our services can elevate your success in business growth")).toBeInTheDocument();
  });

  it("handles empty items array", () => {
    const { container } = render(<CaseStudiesImageGrid items={[]} />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });
});

