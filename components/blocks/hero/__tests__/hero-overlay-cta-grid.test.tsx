import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroOverlayCtaGrid } from "../hero-overlay-cta-grid";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, ...props }: React.PropsWithChildren<{ className?: string }>) => (
      <div className={className} data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">
      {children}
    </a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>
      icon
    </span>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(5).fill("https://placeholder.com/image.jpg"),
}));

describe("HeroOverlayCtaGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<HeroOverlayCtaGrid />);
    expect(
      screen.getByText("Coverage guidance powered by OpenSite AI")
    ).toBeInTheDocument();
  });

  it("renders CTA cards", () => {
    render(<HeroOverlayCtaGrid />);
    expect(screen.getByText("Personal Coverage")).toBeInTheDocument();
    expect(screen.getByText("Event Protection")).toBeInTheDocument();
    expect(screen.getByText("Commercial Coverage")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <HeroOverlayCtaGrid className="custom-class" />
    );
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });
});
