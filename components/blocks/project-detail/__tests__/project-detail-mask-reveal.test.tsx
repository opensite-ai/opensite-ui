import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailMaskReveal } from "../project-detail-mask-reveal";

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

describe("ProjectDetailMaskReveal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailMaskReveal title="Visual Journey" />);
    expect(screen.getByText("Visual Journey")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailMaskReveal subtitle="A photographic exploration" />);
    expect(screen.getByText("A photographic exploration")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ProjectDetailMaskReveal description="This is a custom description" />);
    expect(screen.getByText("This is a custom description")).toBeInTheDocument();
  });

  it("renders category and year", () => {
    render(<ProjectDetailMaskReveal category="Photography" year="2024" />);
    expect(screen.getByText("Photography")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("renders reveal images with captions", () => {
    const revealImages = [
      { src: "/reveal1.jpg", alt: "Scene 1", caption: "The beginning" },
      { src: "/reveal2.jpg", alt: "Scene 2", caption: "The middle" },
    ];
    render(<ProjectDetailMaskReveal revealImages={revealImages} />);
    expect(screen.getByText("The beginning")).toBeInTheDocument();
    expect(screen.getByText("The middle")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailMaskReveal className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders back action when provided", () => {
    render(<ProjectDetailMaskReveal backAction={{ label: "Back to Projects", href: "/projects" }} />);
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });
});
