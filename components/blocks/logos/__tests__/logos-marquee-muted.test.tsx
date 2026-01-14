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

  it("renders custom heading", () => {
    render(<LogosMarqueeMuted heading="Our Clients" />);
    expect(screen.getByText("Our Clients")).toBeInTheDocument();
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

  it("handles empty logos array with explicit heading", () => {
    render(
      <LogosMarqueeMuted
        heading="Trusted by leading companies"
        logos={[]}
      />
    );
    expect(screen.getByText("Trusted by leading companies")).toBeInTheDocument();
  });
});
