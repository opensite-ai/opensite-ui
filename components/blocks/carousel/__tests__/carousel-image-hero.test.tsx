import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CarouselImageHero } from "../carousel-image-hero";

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

describe("CarouselImageHero", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders custom heading", () => {
    render(<CarouselImageHero heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CarouselImageHero description="Custom description" />);
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders custom badge", () => {
    render(<CarouselImageHero badge="New Feature" />);
    expect(screen.getByText("New Feature")).toBeInTheDocument();
  });

  it("renders custom actions", () => {
    render(<CarouselImageHero actions={[{ label: "Learn More", href: "#" }]} />);
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("renders indicator dots for each image", () => {
    const images = [
      { src: "img1.jpg", alt: "Image 1" },
      { src: "img2.jpg", alt: "Image 2" },
      { src: "img3.jpg", alt: "Image 3" },
    ];
    render(<CarouselImageHero images={images} />);
    expect(screen.getByLabelText("Go to image 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to image 2")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to image 3")).toBeInTheDocument();
  });

  it("handles indicator dot click", () => {
    const images = [
      { src: "img1.jpg", alt: "Image 1" },
      { src: "img2.jpg", alt: "Image 2" },
    ];
    render(<CarouselImageHero images={images} />);
    const dot = screen.getByLabelText("Go to image 2");
    fireEvent.click(dot);
    // Should not throw error
    expect(
      screen.getByText("Build exceptional digital experiences")
    ).toBeInTheDocument();
  });

  it("renders custom images", () => {
    const customImages = [
      { src: "custom1.jpg", alt: "Custom Image 1" },
      { src: "custom2.jpg", alt: "Custom Image 2" },
    ];
    render(<CarouselImageHero images={customImages} />);
    expect(screen.getByAltText("Custom Image 1")).toBeInTheDocument();
    expect(screen.getByAltText("Custom Image 2")).toBeInTheDocument();
  });

  it("renders CTA as a link", () => {
    render(<CarouselImageHero actions={[{ label: "Click Me", href: "/custom-link" }]} />);
    const cta = screen.getByText("Click Me");
    expect(cta.closest("a")).toHaveAttribute("href", "/custom-link");
  });
});

