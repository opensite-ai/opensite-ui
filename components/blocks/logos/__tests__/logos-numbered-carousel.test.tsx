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

  it("renders with default props", () => {
    render(<LogosNumberedCarousel />);
    expect(screen.getByText("Powering the world's best product teams.")).toBeInTheDocument();
  });

  it("renders custom headline", () => {
    render(<LogosNumberedCarousel headline="Custom Headline" />);
    expect(screen.getByText("Custom Headline")).toBeInTheDocument();
  });

  it("renders company count", () => {
    render(<LogosNumberedCarousel />);
    const countElements = screen.getAllByText("08");
    expect(countElements.length).toBeGreaterThan(0);
    expect(screen.getByText("companies trust us")).toBeInTheDocument();
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

  it("renders default logos", () => {
    render(<LogosNumberedCarousel />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
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

  it("applies custom className", () => {
    const { container } = render(<LogosNumberedCarousel className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<LogosNumberedCarousel />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-32");
  });

  it("renders carousel component", () => {
    render(<LogosNumberedCarousel />);
    expect(screen.getByTestId("carousel")).toBeInTheDocument();
  });

  it("handles empty logos array", () => {
    render(<LogosNumberedCarousel logos={[]} />);
    expect(screen.getByText("Powering the world's best product teams.")).toBeInTheDocument();
    expect(screen.getByText("00")).toBeInTheDocument();
  });
});
