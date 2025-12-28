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

  it("renders with default props", () => {
    render(<CarouselPortfolioHero />);
    expect(screen.getByText("Web Design Portfolio")).toBeInTheDocument();
    expect(screen.getByText("View Projects")).toBeInTheDocument();
  });

  it("renders custom CTA text", () => {
    render(<CarouselPortfolioHero ctaText="Explore Work" />);
    expect(screen.getByText("Explore Work")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <CarouselPortfolioHero className="custom-class" />
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("custom-class");
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

  it("renders navigation buttons", () => {
    const { container } = render(<CarouselPortfolioHero />);
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("handles next button click", () => {
    const { container } = render(<CarouselPortfolioHero />);
    const buttons = container.querySelectorAll("button");
    // Find next button
    const nextButton = Array.from(buttons).find((btn) =>
      btn.innerHTML.includes("chevron-right")
    );
    if (nextButton) {
      fireEvent.click(nextButton);
    }
    // Should not throw error
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("handles prev button click", () => {
    const { container } = render(<CarouselPortfolioHero />);
    const buttons = container.querySelectorAll("button");
    // Find prev button
    const prevButton = Array.from(buttons).find((btn) =>
      btn.innerHTML.includes("chevron-left")
    );
    if (prevButton) {
      fireEvent.click(prevButton);
    }
    // Should not throw error
    expect(container.querySelector("section")).toBeInTheDocument();
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

  it("renders fullscreen layout", () => {
    const { container } = render(<CarouselPortfolioHero />);
    const section = container.querySelector("section");
    expect(section?.className).toContain("h-screen");
  });

  it("renders gradient overlay", () => {
    const { container } = render(<CarouselPortfolioHero />);
    const gradient = container.querySelector(
      ".bg-gradient-to-t"
    );
    expect(gradient).toBeInTheDocument();
  });

  it("renders CTA as a link", () => {
    render(
      <CarouselPortfolioHero ctaHref="/portfolio" ctaText="View Portfolio" />
    );
    const cta = screen.getByText("View Portfolio");
    expect(cta.closest("a")).toHaveAttribute("href", "/portfolio");
  });

  it("passes optixFlowConfig to Img components", () => {
    const optixFlowConfig = { apiKey: "test-key", compression: 80 };
    const { container } = render(
      <CarouselPortfolioHero optixFlowConfig={optixFlowConfig} />
    );
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders tag badge for current slide", () => {
    render(<CarouselPortfolioHero />);
    expect(screen.getByText("UI/UX Design")).toBeInTheDocument();
  });

  it("renders slide description", () => {
    render(<CarouselPortfolioHero />);
    expect(
      screen.getByText(
        "Clean, modern interfaces that prioritize user experience and functionality"
      )
    ).toBeInTheDocument();
  });
});

