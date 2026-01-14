import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LogosNumberedCarousel } from "../logos-numbered-carousel";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
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

describe("LogosNumberedCarousel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom headline", () => {
    render(<LogosNumberedCarousel headline="Custom Headline" />);
    expect(screen.getByText("Custom Headline")).toBeInTheDocument();
  });

  it("renders correct count for custom logos", () => {
    const customLogos = [
      { name: "Company 1", logo: "/c1.png" },
      { name: "Company 2", logo: "/c2.png" },
      { name: "Company 3", logo: "/c3.png" },
    ];
    render(<LogosNumberedCarousel logos={customLogos} />);
    const countElements = screen.getAllByText("03");
    expect(countElements.length).toBeGreaterThan(0);
  });

  it("renders custom logos", () => {
    const customLogos = [
      { name: "Numbered Co 1", logo: "/numbered1.png" },
      { name: "Numbered Co 2", logo: "/numbered2.png" },
    ];
    render(<LogosNumberedCarousel logos={customLogos} />);
    const logos1 = screen.getAllByAltText("Numbered Co 1 logo");
    const logos2 = screen.getAllByAltText("Numbered Co 2 logo");
    expect(logos1.length).toBeGreaterThan(0);
    expect(logos2.length).toBeGreaterThan(0);
  });

  it("handles empty logos array with explicit headline", () => {
    render(
      <LogosNumberedCarousel
        headline="Powering the world's best product teams."
        logos={[]}
      />
    );
    expect(screen.getByText("Powering the world's best product teams.")).toBeInTheDocument();
    expect(screen.getByText("00")).toBeInTheDocument();
  });
});
