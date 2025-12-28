import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LogosCarouselHeading } from "../logos-carousel-heading";

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

describe("LogosCarouselHeading", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<LogosCarouselHeading />);
    expect(screen.getByText("Trusted by these companies")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<LogosCarouselHeading heading="Our Partners" />);
    expect(screen.getByText("Our Partners")).toBeInTheDocument();
  });

  it("renders default logos", () => {
    render(<LogosCarouselHeading />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders custom logos", () => {
    const customLogos = [
      { id: "custom-1", description: "Custom Logo 1", image: "/custom1.png", className: "h-8" },
      { id: "custom-2", description: "Custom Logo 2", image: "/custom2.png", className: "h-8" },
    ];
    render(<LogosCarouselHeading logos={customLogos} />);
    expect(screen.getByAltText("Custom Logo 1")).toBeInTheDocument();
    expect(screen.getByAltText("Custom Logo 2")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<LogosCarouselHeading className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<LogosCarouselHeading />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-64");
  });

  it("renders carousel component", () => {
    render(<LogosCarouselHeading />);
    expect(screen.getByTestId("carousel")).toBeInTheDocument();
  });

  it("handles empty logos array", () => {
    render(<LogosCarouselHeading logos={[]} />);
    expect(screen.getByText("Trusted by these companies")).toBeInTheDocument();
  });
});
