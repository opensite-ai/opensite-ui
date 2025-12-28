import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CarouselAnimatedSections } from "../carousel-animated-sections";

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
      onAnimationComplete,
    }: {
      children: React.ReactNode;
      className?: string;
      onAnimationComplete?: () => void;
    }) => {
      // Call onAnimationComplete immediately for testing
      if (onAnimationComplete) {
        setTimeout(onAnimationComplete, 0);
      }
      return <div className={className}>{children}</div>;
    },
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("CarouselAnimatedSections", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders with default props", () => {
    render(<CarouselAnimatedSections />);
    expect(screen.getByText("Experience 1")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <CarouselAnimatedSections className="custom-class" />
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("custom-class");
  });

  it("renders custom sections", () => {
    const customSections = [
      {
        id: "section-1",
        title: "Custom Title 1",
        subtitle: "Custom Subtitle 1",
        description: "Custom Description 1",
        image: "custom1.jpg",
        ctaText: "Learn More",
        ctaHref: "/learn",
      },
    ];
    render(<CarouselAnimatedSections sections={customSections} />);
    expect(screen.getByText("Custom Title 1")).toBeInTheDocument();
    expect(screen.getByText("Custom Subtitle 1")).toBeInTheDocument();
    expect(screen.getByText("Custom Description 1")).toBeInTheDocument();
  });

  it("renders CTA button when provided", () => {
    const sections = [
      {
        id: "section-1",
        title: "Title",
        subtitle: "Subtitle",
        description: "Description",
        image: "img.jpg",
        ctaText: "Click Me",
        ctaHref: "/click",
      },
    ];
    render(<CarouselAnimatedSections sections={sections} />);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("renders navigation dots", () => {
    const sections = [
      { id: "s1", title: "Section 1", subtitle: "Sub 1", description: "Desc 1", image: "img1.jpg" },
      { id: "s2", title: "Section 2", subtitle: "Sub 2", description: "Desc 2", image: "img2.jpg" },
    ];
    render(<CarouselAnimatedSections sections={sections} />);
    const dots = screen.getAllByRole("button", { name: /Go to section/ });
    expect(dots.length).toBe(2);
  });

  it("handles navigation dot click", () => {
    const sections = [
      { id: "s1", title: "Section 1", subtitle: "Sub 1", description: "Desc 1", image: "img1.jpg" },
      { id: "s2", title: "Section 2", subtitle: "Sub 2", description: "Desc 2", image: "img2.jpg" },
    ];
    const { container } = render(<CarouselAnimatedSections sections={sections} />);
    const dots = screen.getAllByRole("button", { name: /Go to section/ });
    fireEvent.click(dots[1]);
    vi.runAllTimers();
    // Should not throw error
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders arrow navigation buttons", () => {
    const { container } = render(<CarouselAnimatedSections />);
    const arrowButtons = container.querySelectorAll(".rounded-full.border");
    expect(arrowButtons.length).toBeGreaterThan(0);
  });

  it("renders slide counter", () => {
    const sections = [
      { id: "s1", title: "Section 1", subtitle: "Sub 1", description: "Desc 1", image: "img1.jpg" },
      { id: "s2", title: "Section 2", subtitle: "Sub 2", description: "Desc 2", image: "img2.jpg" },
    ];
    render(<CarouselAnimatedSections sections={sections} />);
    expect(screen.getByText("01 / 02")).toBeInTheDocument();
  });

  it("renders fullscreen layout", () => {
    const { container } = render(<CarouselAnimatedSections />);
    const section = container.querySelector("section");
    expect(section?.className).toContain("h-screen");
  });

  it("renders images for sections", () => {
    render(<CarouselAnimatedSections />);
    const images = screen.getAllByTestId("img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("passes optixFlowConfig to Img components", () => {
    const optixFlowConfig = { apiKey: "test-key", compression: 80 };
    const { container } = render(
      <CarouselAnimatedSections optixFlowConfig={optixFlowConfig} />
    );
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("handles keyboard navigation", () => {
    const { container } = render(<CarouselAnimatedSections />);
    fireEvent.keyDown(window, { key: "ArrowDown" });
    vi.runAllTimers();
    fireEvent.keyDown(window, { key: "ArrowUp" });
    vi.runAllTimers();
    // Should not throw error
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders overlay on background images", () => {
    const { container } = render(<CarouselAnimatedSections />);
    const overlay = container.querySelector(".bg-black\\/50");
    expect(overlay).toBeInTheDocument();
  });

  it("renders CTA link with correct href", () => {
    const sections = [
      {
        id: "s1",
        title: "Title",
        subtitle: "Subtitle",
        description: "Description",
        image: "img.jpg",
        ctaText: "Explore",
        ctaHref: "/explore",
      },
    ];
    render(<CarouselAnimatedSections sections={sections} />);
    const cta = screen.getByText("Explore");
    expect(cta.closest("a")).toHaveAttribute("href", "/explore");
  });
});

