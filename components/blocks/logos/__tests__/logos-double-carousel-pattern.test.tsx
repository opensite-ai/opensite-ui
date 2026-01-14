import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LogosDoubleCarouselPattern } from "../logos-double-carousel-pattern";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className, variant }: { children: React.ReactNode; href?: string; className?: string; variant?: string }) => (
    <a href={href} className={className} data-variant={variant} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("embla-carousel-auto-scroll", () => ({
  default: () => ({}),
}));

vi.mock("../../../ui/carousel", () => ({
  Carousel: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel">{children}</div>,
  CarouselContent: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-content">{children}</div>,
  CarouselItem: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-item">{children}</div>,
}));

vi.mock("../../../lib/patternSvgs", () => ({
  patternSvgs: { dots: "data:image/svg+xml,..." },
}));

describe("LogosDoubleCarouselPattern", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title and description", () => {
    render(
      <LogosDoubleCarouselPattern
        title="Custom Title"
        description="Custom Description"
      />
    );
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom Description")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(
      <LogosDoubleCarouselPattern
        actions={[
          { label: "Start Now", href: "#", variant: "default" },
          { label: "Read More", href: "#", variant: "outline" },
        ]}
      />
    );
    expect(screen.getByText("Start Now")).toBeInTheDocument();
    expect(screen.getByText("Read More")).toBeInTheDocument();
  });
});
