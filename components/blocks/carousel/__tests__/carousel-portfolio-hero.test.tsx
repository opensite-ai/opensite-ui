import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CarouselPortfolioHero } from "../carousel-portfolio-hero";

// Mock the Img component
vi.mock("@page-speed/img", () => ({
  Img: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => <img src={src} alt={alt} className={className} data-testid="img" />,
}));

describe("CarouselPortfolioHero", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders custom actions", () => {
    render(<CarouselPortfolioHero actions={[{ label: "Explore Work", href: "#" }]} />);
    expect(screen.getByText("Explore Work")).toBeInTheDocument();
  });

  it("renders custom slides", () => {
    const customSlides = [
      {
        id: 1,
        image: "custom.jpg",
        title: "Custom Title",
        description: "Custom Description",
        tag: "Custom Tag",
      },
    ];
    render(<CarouselPortfolioHero slides={customSlides} />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom Description")).toBeInTheDocument();
    expect(screen.getByText("Custom Tag")).toBeInTheDocument();
  });

  it("displays slide counter", () => {
    const slides = [
      {
        id: 1,
        image: "img1.jpg",
        title: "Title 1",
        description: "Desc 1",
        tag: "Tag 1",
      },
      {
        id: 2,
        image: "img2.jpg",
        title: "Title 2",
        description: "Desc 2",
        tag: "Tag 2",
      },
    ];
    render(<CarouselPortfolioHero slides={slides} />);
    expect(screen.getByText("1 / 2")).toBeInTheDocument();
  });

  it("renders CTA as a link", () => {
    render(
      <CarouselPortfolioHero actions={[{ label: "View Portfolio", href: "/portfolio" }]} />
    );
    const cta = screen.getByText("View Portfolio");
    expect(cta.closest("a")).toHaveAttribute("href", "/portfolio");
  });
});

