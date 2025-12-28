import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutLocationInfoHero } from "../about-location-info-hero";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
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

vi.mock("../../../lib/patternSvgs", () => ({
  patternSvgs: {
    grid1: "https://placeholder.com/pattern.svg",
  },
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(10).fill("https://placeholder.com/image.jpg"),
}));

describe("AboutLocationInfoHero", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders default headline", () => {
    render(<AboutLocationInfoHero />);
    expect(
      screen.getByText("OpenSite AI service center in the heart of the city")
    ).toBeInTheDocument();
  });

  it("renders contact details", () => {
    render(<AboutLocationInfoHero />);
    expect(screen.getByText("975 Mission St, San Francisco, CA")).toBeInTheDocument();
    expect(screen.getByText("+1 (415) 555-0192")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <AboutLocationInfoHero className="custom-class" />
    );
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });
});
