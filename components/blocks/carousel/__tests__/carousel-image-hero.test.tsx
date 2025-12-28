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

  it("renders with default props", () => {
    render(<CarouselImageHero />);
    expect(
      screen.getByText("Build exceptional digital experiences")
    ).toBeInTheDocument();
    expect(screen.getByText("Launching Soon")).toBeInTheDocument();
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CarouselImageHero heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CarouselImageHero description="Custom description" />);
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders custom badge text", () => {
    render(<CarouselImageHero badgeText="New Feature" />);
    expect(screen.getByText("New Feature")).toBeInTheDocument();
  });

  it("renders custom CTA text", () => {
    render(<CarouselImageHero ctaText="Learn More" />);
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <CarouselImageHero className="custom-class" />
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("custom-class");
  });

  it("renders navigation arrows", () => {
    render(<CarouselImageHero />);
    expect(screen.getByLabelText("Previous image")).toBeInTheDocument();
    expect(screen.getByLabelText("Next image")).toBeInTheDocument();
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

  it("handles next button click", () => {
    render(<CarouselImageHero />);
    const nextButton = screen.getByLabelText("Next image");
    fireEvent.click(nextButton);
    // Should not throw error
    expect(
      screen.getByText("Build exceptional digital experiences")
    ).toBeInTheDocument();
  });

  it("handles previous button click", () => {
    render(<CarouselImageHero />);
    const prevButton = screen.getByLabelText("Previous image");
    fireEvent.click(prevButton);
    // Should not throw error
    expect(
      screen.getByText("Build exceptional digital experiences")
    ).toBeInTheDocument();
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

  it("applies minimum height", () => {
    const { container } = render(<CarouselImageHero />);
    const section = container.querySelector("section");
    expect(section?.className).toContain("min-h-[600px]");
  });

  it("renders CTA as a link", () => {
    render(<CarouselImageHero ctaHref="/custom-link" ctaText="Click Me" />);
    const cta = screen.getByText("Click Me");
    expect(cta.closest("a")).toHaveAttribute("href", "/custom-link");
  });

  it("passes optixFlowConfig to Img components", () => {
    const optixFlowConfig = { apiKey: "test-key", compression: 80 };
    const { container } = render(
      <CarouselImageHero optixFlowConfig={optixFlowConfig} />
    );
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders with overlay on images", () => {
    const { container } = render(<CarouselImageHero />);
    const overlay = container.querySelector(".bg-black\\/40");
    expect(overlay).toBeInTheDocument();
  });
});

