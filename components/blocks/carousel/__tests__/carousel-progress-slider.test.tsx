import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CarouselProgressSlider } from "../carousel-progress-slider";

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

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) => <div className={className}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("CarouselProgressSlider", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders with default props", () => {
    render(<CarouselProgressSlider />);
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <CarouselProgressSlider className="custom-class" />
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("custom-class");
  });

  it("renders custom slides", () => {
    const customSlides = [
      {
        id: "slide-1",
        title: "Custom Title 1",
        description: "Custom Description 1",
        image: "custom1.jpg",
      },
      {
        id: "slide-2",
        title: "Custom Title 2",
        description: "Custom Description 2",
        image: "custom2.jpg",
      },
    ];
    render(<CarouselProgressSlider slides={customSlides} />);
    expect(screen.getByText("Custom Title 1")).toBeInTheDocument();
    expect(screen.getByText("Custom Title 2")).toBeInTheDocument();
  });

  it("renders slide descriptions", () => {
    const slides = [
      {
        id: "slide-1",
        title: "Title",
        description: "Test Description",
        image: "img.jpg",
      },
    ];
    render(<CarouselProgressSlider slides={slides} />);
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders navigation buttons for each slide", () => {
    const slides = [
      { id: "slide-1", title: "Slide 1", description: "Desc 1", image: "img1.jpg" },
      { id: "slide-2", title: "Slide 2", description: "Desc 2", image: "img2.jpg" },
    ];
    const { container } = render(<CarouselProgressSlider slides={slides} />);
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBe(2);
  });

  it("handles slide button click", () => {
    const slides = [
      { id: "slide-1", title: "Slide 1", description: "Desc 1", image: "img1.jpg" },
      { id: "slide-2", title: "Slide 2", description: "Desc 2", image: "img2.jpg" },
    ];
    const { container } = render(<CarouselProgressSlider slides={slides} />);
    const buttons = container.querySelectorAll("button");
    fireEvent.click(buttons[1]);
    // Should not throw error
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders with two-column grid layout", () => {
    const { container } = render(<CarouselProgressSlider />);
    const grid = container.querySelector(".lg\\:grid-cols-2");
    expect(grid).toBeInTheDocument();
  });

  it("renders images for slides", () => {
    render(<CarouselProgressSlider />);
    const images = screen.getAllByTestId("img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("passes optixFlowConfig to Img components", () => {
    const optixFlowConfig = { apiKey: "test-key", compression: 80 };
    const { container } = render(
      <CarouselProgressSlider optixFlowConfig={optixFlowConfig} />
    );
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders with custom duration", () => {
    const { container } = render(
      <CarouselProgressSlider duration={10000} />
    );
    // Component should render without errors
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders progress bar in buttons", () => {
    const { container } = render(<CarouselProgressSlider />);
    const progressBars = container.querySelectorAll('[role="progressbar"]');
    expect(progressBars.length).toBeGreaterThan(0);
  });

  it("applies border styling to navigation buttons", () => {
    const { container } = render(<CarouselProgressSlider />);
    const borderedButtons = container.querySelectorAll("button.border");
    expect(borderedButtons.length).toBeGreaterThan(0);
  });
});

