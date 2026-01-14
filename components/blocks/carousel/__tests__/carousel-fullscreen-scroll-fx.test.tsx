import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CarouselFullscreenScrollFx } from "../carousel-fullscreen-scroll-fx";

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

// Mock scrollIntoView for jsdom
Element.prototype.scrollIntoView = vi.fn();

describe("CarouselFullscreenScrollFx", () => {

  it("renders custom slides", () => {
    const customSlides = [
      {
        id: "slide-1",
        title: "Custom Title 1",
        subtitle: "Custom Subtitle 1",
        description: "Custom Description 1",
        image: "custom1.jpg",
      },
      {
        id: "slide-2",
        title: "Custom Title 2",
        subtitle: "Custom Subtitle 2",
        description: "Custom Description 2",
        image: "custom2.jpg",
      },
    ];
    render(<CarouselFullscreenScrollFx slides={customSlides} />);
    expect(screen.getByText("Custom Title 1")).toBeInTheDocument();
    expect(screen.getByText("Custom Title 2")).toBeInTheDocument();
  });

  it("renders slide subtitles", () => {
    const slides = [
      {
        id: "slide-1",
        title: "Title",
        subtitle: "Test Subtitle",
        description: "Description",
        image: "img.jpg",
      },
    ];
    render(<CarouselFullscreenScrollFx slides={slides} />);
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
  });

  it("renders slide descriptions", () => {
    const slides = [
      {
        id: "slide-1",
        title: "Title",
        subtitle: "Subtitle",
        description: "Test Description",
        image: "img.jpg",
      },
    ];
    render(<CarouselFullscreenScrollFx slides={slides} />);
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders navigation dots", () => {
    const slides = [
      { id: "s1", title: "Slide 1", subtitle: "Sub 1", description: "Desc 1", image: "img1.jpg" },
      { id: "s2", title: "Slide 2", subtitle: "Sub 2", description: "Desc 2", image: "img2.jpg" },
    ];
    render(<CarouselFullscreenScrollFx slides={slides} />);
    const dots = screen.getAllByRole("button");
    expect(dots.length).toBe(2);
  });

  it("handles navigation dot click", () => {
    const slides = [
      { id: "s1", title: "Slide 1", subtitle: "Sub 1", description: "Desc 1", image: "img1.jpg" },
      { id: "s2", title: "Slide 2", subtitle: "Sub 2", description: "Desc 2", image: "img2.jpg" },
    ];
    const { container } = render(<CarouselFullscreenScrollFx slides={slides} />);
    const dots = screen.getAllByRole("button");
    fireEvent.click(dots[1]);
    // Should not throw error
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders slide counter", () => {
    const slides = [
      { id: "s1", title: "Slide 1", subtitle: "Sub 1", description: "Desc 1", image: "img1.jpg" },
      { id: "s2", title: "Slide 2", subtitle: "Sub 2", description: "Desc 2", image: "img2.jpg" },
    ];
    render(<CarouselFullscreenScrollFx slides={slides} />);
    expect(screen.getByText("01 / 02")).toBeInTheDocument();
  });

  it("renders scroll indicator on non-last slides", () => {
    const slides = [
      { id: "s1", title: "Slide 1", subtitle: "Sub 1", description: "Desc 1", image: "img1.jpg" },
      { id: "s2", title: "Slide 2", subtitle: "Sub 2", description: "Desc 2", image: "img2.jpg" },
    ];
    render(<CarouselFullscreenScrollFx slides={slides} />);
    expect(screen.getByText("Scroll")).toBeInTheDocument();
  });

  it("renders with custom overlay color", () => {
    const slides = [
      {
        id: "slide-1",
        title: "Title",
        subtitle: "Subtitle",
        description: "Description",
        image: "img.jpg",
        overlayColor: "rgba(255, 0, 0, 0.5)",
      },
    ];
    const { container } = render(<CarouselFullscreenScrollFx slides={slides} />);
    // Component should render without errors
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders slides with IDs for scroll navigation", () => {
    const slides = [
      { id: "test-slide", title: "Title", subtitle: "Sub", description: "Desc", image: "img.jpg" },
    ];
    const { container } = render(<CarouselFullscreenScrollFx slides={slides} />);
    const slideElement = container.querySelector("#fullscreen-test-slide");
    expect(slideElement).toBeInTheDocument();
  });
});

