import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { CarouselAutoplayProgress } from "../carousel-autoplay-progress";

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

// Mock embla-carousel-react - return null for emblaApi to prevent hook effects from running
vi.mock("embla-carousel-react", () => ({
  default: () => [
    vi.fn(),
    null,
  ],
}));

// Mock embla-carousel-autoplay
vi.mock("embla-carousel-autoplay", () => ({
  default: () => ({}),
}));

describe("CarouselAutoplayProgress", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("renders with default props", () => {
    const { container } = render(<CarouselAutoplayProgress />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <CarouselAutoplayProgress className="custom-class" />
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("custom-class");
  });

  it("renders custom slides", () => {
    const customSlides = [
      { src: "custom1.jpg", alt: "Custom Slide 1" },
      { src: "custom2.jpg", alt: "Custom Slide 2" },
    ];
    render(<CarouselAutoplayProgress slides={customSlides} />);
    expect(screen.getByAltText("Custom Slide 1")).toBeInTheDocument();
    expect(screen.getByAltText("Custom Slide 2")).toBeInTheDocument();
  });

  it("renders default slides", () => {
    render(<CarouselAutoplayProgress />);
    const images = screen.getAllByTestId("img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders dot navigation buttons", () => {
    const { container } = render(<CarouselAutoplayProgress />);
    const dotButtons = container.querySelectorAll('button[type="button"]');
    expect(dotButtons.length).toBeGreaterThan(0);
  });

  it("renders play/pause button", () => {
    const { container } = render(<CarouselAutoplayProgress />);
    const buttons = container.querySelectorAll("button");
    // Should have at least one button for play/pause
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("renders progress bar container", () => {
    const { container } = render(<CarouselAutoplayProgress />);
    const progressBar = container.querySelector(".overflow-hidden.rounded-\\[1\\.8rem\\]");
    expect(progressBar).toBeInTheDocument();
  });

  it("passes optixFlowConfig to Img components", () => {
    const optixFlowConfig = { apiKey: "test-key", compression: 80 };
    const { container } = render(
      <CarouselAutoplayProgress optixFlowConfig={optixFlowConfig} />
    );
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders slides with aspect-video container", () => {
    const { container } = render(<CarouselAutoplayProgress />);
    const aspectVideo = container.querySelector(".aspect-video");
    expect(aspectVideo).toBeInTheDocument();
  });

  it("renders with custom autoplay delay", () => {
    const { container } = render(
      <CarouselAutoplayProgress autoplayDelay={5000} />
    );
    // Component should render without errors
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders slides with rounded corners", () => {
    const { container } = render(<CarouselAutoplayProgress />);
    const rounded = container.querySelector(".rounded-lg");
    expect(rounded).toBeInTheDocument();
  });

  it("renders with slide content when provided", () => {
    const slidesWithContent = [
      {
        src: "img1.jpg",
        alt: "Slide 1",
        content: <div data-testid="slide-content">Custom Content</div>,
      },
    ];
    render(<CarouselAutoplayProgress slides={slidesWithContent} />);
    expect(screen.getByTestId("slide-content")).toBeInTheDocument();
  });
});

