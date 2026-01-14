import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutStoryHero } from "../about-story-hero";

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
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("AboutStoryHero", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(
      <AboutStoryHero
        title="Test Title"
        subtitle="Test Subtitle"
        content="Test Content"
      />
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<AboutStoryHero title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<AboutStoryHero subtitle="Custom subtitle text" />);
    expect(screen.getByText("Custom subtitle text")).toBeInTheDocument();
  });

  it("renders custom content", () => {
    render(<AboutStoryHero content="Custom content text" />);
    expect(screen.getByText("Custom content text")).toBeInTheDocument();
  });

  it("renders team info when provided", () => {
    const teamInfo = { title: "50+ Team Members", description: "Across 10 countries" };
    render(<AboutStoryHero teamInfo={teamInfo} />);
    expect(screen.getByText("50+ Team Members")).toBeInTheDocument();
    expect(screen.getByText("Across 10 countries")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<AboutStoryHero className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
