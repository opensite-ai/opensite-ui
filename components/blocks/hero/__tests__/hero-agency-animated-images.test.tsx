import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroAgencyAnimatedImages } from "../hero-agency-animated-images";

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

vi.mock("../../../ui/aspect-ratio", () => ({
  AspectRatio: ({ children }: { children: React.ReactNode }) => <div data-testid="aspect-ratio">{children}</div>,
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("HeroAgencyAnimatedImages", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<HeroAgencyAnimatedImages />);
    expect(screen.getByText("Revolutionize your business operations")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroAgencyAnimatedImages heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom subheading", () => {
    render(<HeroAgencyAnimatedImages subheading="Custom Subheading" />);
    expect(screen.getByText("Custom Subheading")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [{ label: "Get Started", href: "/start", variant: "default" as const }];
    render(<HeroAgencyAnimatedImages actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroAgencyAnimatedImages className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
