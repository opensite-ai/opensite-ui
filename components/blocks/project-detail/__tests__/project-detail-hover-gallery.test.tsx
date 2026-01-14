import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailHoverGallery } from "../project-detail-hover-gallery";

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

describe("ProjectDetailHoverGallery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailHoverGallery title="Interactive Installations" />);
    expect(screen.getByText("Interactive Installations")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailHoverGallery subtitle="Digital art experiences" />);
    expect(screen.getByText("Digital art experiences")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ProjectDetailHoverGallery description="A collection of interactive digital installations" />);
    expect(screen.getByText("A collection of interactive digital installations")).toBeInTheDocument();
  });

  it("renders category, year, and artist", () => {
    render(<ProjectDetailHoverGallery category="Digital Art" year="2024" artist="Tech Studio" />);
    expect(screen.getByText("Digital Art")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("Tech Studio")).toBeInTheDocument();
  });

  it("renders images with hover info", () => {
    const images = [
      { src: "/img1.jpg", alt: "Installation 1", title: "Light Wave", description: "An immersive light experience" },
    ];
    render(<ProjectDetailHoverGallery images={images} />);
    expect(screen.getByText("Light Wave")).toBeInTheDocument();
    expect(screen.getByText("An immersive light experience")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailHoverGallery className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders back action when provided", () => {
    render(<ProjectDetailHoverGallery backAction={{ label: "Back to Projects", href: "/projects" }} />);
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });
});
