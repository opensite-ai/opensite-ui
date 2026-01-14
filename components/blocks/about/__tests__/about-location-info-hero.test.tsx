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

  it("renders with default props", () => {
    render(<AboutLocationInfoHero />);
    expect(screen.getByText(/OpenSite AI service center/)).toBeInTheDocument();
    expect(screen.getByText("975 Mission St, San Francisco, CA")).toBeInTheDocument();
    expect(screen.getByText("+1 (415) 555-0192")).toBeInTheDocument();
  });

  it("renders custom headline", () => {
    render(<AboutLocationInfoHero headline="Custom Headline" />);
    expect(screen.getByText("Custom Headline")).toBeInTheDocument();
  });

  it("renders custom address", () => {
    render(<AboutLocationInfoHero address="123 Custom Street" />);
    expect(screen.getByText("123 Custom Street")).toBeInTheDocument();
  });

  it("renders custom phone", () => {
    render(<AboutLocationInfoHero phone="+1 (555) 123-4567" />);
    expect(screen.getByText("+1 (555) 123-4567")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Directions", href: "/directions", variant: "default" as const },
    ];
    render(<AboutLocationInfoHero actions={actions} />);
    expect(screen.getByText("Get Directions")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<AboutLocationInfoHero className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
