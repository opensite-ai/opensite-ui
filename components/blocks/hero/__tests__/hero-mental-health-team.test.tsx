import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroMentalHealthTeam } from "../hero-mental-health-team";

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
  avatarPlaceholders: Array(20).fill("https://placeholder.com/avatar.jpg"),
}));

describe("HeroMentalHealthTeam", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<HeroMentalHealthTeam />);
    expect(screen.getByText("Experienced Professionals Committed to Your Mental Health")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroMentalHealthTeam heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<HeroMentalHealthTeam subtitle="Custom subtitle text" />);
    expect(screen.getByText("Custom subtitle text")).toBeInTheDocument();
  });

  it("renders team images when provided", () => {
    const teamImages = [
      { src: "https://example.com/team1.jpg", alt: "Team Member 1" },
      { src: "https://example.com/team2.jpg", alt: "Team Member 2" },
    ];
    render(<HeroMentalHealthTeam teamImages={teamImages} />);
    const renderedImages = screen.getAllByTestId("mock-img");
    expect(renderedImages.length).toBeGreaterThan(0);
  });

  it("applies custom className", () => {
    const { container } = render(<HeroMentalHealthTeam className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
