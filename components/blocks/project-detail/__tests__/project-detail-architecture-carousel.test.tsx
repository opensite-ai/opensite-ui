import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailArchitectureCarousel } from "../project-detail-architecture-carousel";

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

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(100).fill("/placeholder.jpg"),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name }: { name: string }) => <span data-testid="mock-icon">{name}</span>,
}));

vi.mock("@page-speed/lightbox", () => ({
  Lightbox: () => null,
}));

vi.mock("@page-speed/pdf-viewer", () => ({
  PDFViewer: () => null,
}));

describe("ProjectDetailArchitectureCarousel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailArchitectureCarousel title="Modern Residence" />);
    expect(screen.getByText("Modern Residence")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailArchitectureCarousel subtitle="A contemporary home" />);
    expect(screen.getByText("A contemporary home")).toBeInTheDocument();
  });

  it("renders category, year, and location", () => {
    render(<ProjectDetailArchitectureCarousel category="Architecture" year="2024" location="Los Angeles" />);
    expect(screen.getByText("Architecture")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("Los Angeles")).toBeInTheDocument();
  });

  it("renders content sections", () => {
    const sections = [
      { title: "Design Concept", content: "A seamless blend of indoor and outdoor living" },
    ];
    render(<ProjectDetailArchitectureCarousel sections={sections} />);
    expect(screen.getByText("Design Concept")).toBeInTheDocument();
    expect(screen.getByText("A seamless blend of indoor and outdoor living")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailArchitectureCarousel className="custom-class" title="Test Project" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders back action when provided", () => {
    render(<ProjectDetailArchitectureCarousel backAction={{ label: "Back to Projects", href: "/projects" }} />);
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });
});
