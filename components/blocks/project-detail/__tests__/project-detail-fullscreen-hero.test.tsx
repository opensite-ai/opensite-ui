import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailFullscreenHero } from "../project-detail-fullscreen-hero";

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

describe("ProjectDetailFullscreenHero", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailFullscreenHero title="Mountain Expedition" />);
    expect(screen.getByText("Mountain Expedition")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailFullscreenHero subtitle="A journey through the peaks" />);
    expect(screen.getByText("A journey through the peaks")).toBeInTheDocument();
  });

  it("renders category, year, and client", () => {
    render(<ProjectDetailFullscreenHero category="Adventure Photography" year="2024" client="National Geographic" />);
    expect(screen.getByText("Adventure Photography")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("National Geographic")).toBeInTheDocument();
  });

  it("renders content sections", () => {
    const sections = [
      { id: "journey", title: "The Journey", content: "A 30-day expedition" },
    ];
    render(<ProjectDetailFullscreenHero sections={sections} />);
    expect(screen.getByText("The Journey")).toBeInTheDocument();
    expect(screen.getByText("A 30-day expedition")).toBeInTheDocument();
  });

  it("applies custom className to article", () => {
    const { container } = render(<ProjectDetailFullscreenHero className="custom-class" />);
    expect(container.querySelector("article")).toHaveClass("custom-class");
  });

  it("renders back action when provided", () => {
    render(<ProjectDetailFullscreenHero backAction={{ label: "Back to Projects", href: "/projects" }} />);
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });
});
