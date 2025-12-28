import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LogosMinimalCarousel } from "../logos-minimal-carousel";

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

describe("LogosMinimalCarousel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<LogosMinimalCarousel />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders default logos", () => {
    render(<LogosMinimalCarousel />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders custom logos", () => {
    const customLogos = [
      { name: "Minimal Co 1", logo: "/minimal1.png" },
      { name: "Minimal Co 2", logo: "/minimal2.png" },
    ];
    render(<LogosMinimalCarousel logos={customLogos} />);
    const logos1 = screen.getAllByAltText("Minimal Co 1 logo");
    const logos2 = screen.getAllByAltText("Minimal Co 2 logo");
    expect(logos1.length).toBeGreaterThan(0);
    expect(logos2.length).toBeGreaterThan(0);
  });

  it("applies custom className", () => {
    const { container } = render(<LogosMinimalCarousel className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<LogosMinimalCarousel />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-16");
  });

  it("renders carousel component", () => {
    render(<LogosMinimalCarousel />);
    expect(screen.getByTestId("carousel")).toBeInTheDocument();
  });

  it("renders border container", () => {
    const { container } = render(<LogosMinimalCarousel />);
    const borderDiv = container.querySelector(".border-y");
    expect(borderDiv).toBeInTheDocument();
  });

  it("handles empty logos array", () => {
    const { container } = render(<LogosMinimalCarousel logos={[]} />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });
});
