import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LogosMarqueeMuted } from "../logos-marquee-muted";

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

describe("LogosMarqueeMuted", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<LogosMarqueeMuted />);
    expect(screen.getByText("Trusted by leading companies")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<LogosMarqueeMuted heading="Our Clients" />);
    expect(screen.getByText("Our Clients")).toBeInTheDocument();
  });

  it("renders default logos", () => {
    render(<LogosMarqueeMuted />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders custom logos", () => {
    const customLogos = [
      { name: "Company X", logo: "/companyX.png" },
      { name: "Company Y", logo: "/companyY.png" },
    ];
    render(<LogosMarqueeMuted logos={customLogos} />);
    const logosX = screen.getAllByAltText("Company X logo");
    const logosY = screen.getAllByAltText("Company Y logo");
    expect(logosX.length).toBeGreaterThan(0);
    expect(logosY.length).toBeGreaterThan(0);
  });

  it("applies custom className", () => {
    const { container } = render(<LogosMarqueeMuted className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with muted background", () => {
    const { container } = render(<LogosMarqueeMuted />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("bg-muted");
  });

  it("renders carousel component", () => {
    render(<LogosMarqueeMuted />);
    expect(screen.getByTestId("carousel")).toBeInTheDocument();
  });

  it("handles empty logos array", () => {
    render(<LogosMarqueeMuted logos={[]} />);
    expect(screen.getByText("Trusted by leading companies")).toBeInTheDocument();
  });
});
