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

  it("renders custom slides", () => {
    const customSlides = [
      { src: "custom1.jpg", alt: "Custom Slide 1" },
      { src: "custom2.jpg", alt: "Custom Slide 2" },
    ];
    render(<CarouselAutoplayProgress slides={customSlides} />);
    expect(screen.getByAltText("Custom Slide 1")).toBeInTheDocument();
    expect(screen.getByAltText("Custom Slide 2")).toBeInTheDocument();
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

