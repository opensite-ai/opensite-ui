import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailMinimalCentered } from "../project-detail-minimal-centered";

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

describe("ProjectDetailMinimalCentered", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailMinimalCentered title="Quiet Moments" />);
    expect(screen.getByText("Quiet Moments")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailMinimalCentered subtitle="A meditation on stillness" />);
    expect(screen.getByText("A meditation on stillness")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ProjectDetailMinimalCentered description="A photographic series exploring moments of peace" />);
    expect(screen.getByText("A photographic series exploring moments of peace")).toBeInTheDocument();
  });

  it("renders category, year, and artist", () => {
    render(<ProjectDetailMinimalCentered category="Photography" year="2024" artist="John Doe" />);
    expect(screen.getByText("Photography")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders images", () => {
    const images = [
      { src: "/img1.jpg", alt: "Image 1" },
      { src: "/img2.jpg", alt: "Image 2" },
    ];
    render(<ProjectDetailMinimalCentered images={images} />);
    expect(screen.getByAltText("Image 1")).toBeInTheDocument();
    expect(screen.getByAltText("Image 2")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailMinimalCentered className="custom-class" title="Test Project" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders back action when provided", () => {
    render(<ProjectDetailMinimalCentered backAction={{ label: "Back to Projects", href: "/projects" }} />);
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });
});
