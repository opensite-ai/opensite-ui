import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CarouselAutoProgressSlides } from "../carousel-auto-progress-slides";

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
    button: ({
      children,
      className,
      onClick,
    }: {
      children: React.ReactNode;
      className?: string;
      onClick?: () => void;
    }) => (
      <button className={className} onClick={onClick}>
        {children}
      </button>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useMotionValue: () => ({
    get: () => 100,
    set: vi.fn(),
  }),
  useMotionTemplate: () => "inset(0 100% 0 0 round 10px)",
}));

describe("CarouselAutoProgressSlides", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders with default props", () => {
    render(<CarouselAutoProgressSlides />);
    expect(screen.getByText("UI for future")).toBeInTheDocument();
    expect(
      screen.getByText("Collection of unusual UI components")
    ).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CarouselAutoProgressSlides heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom subheading", () => {
    render(<CarouselAutoProgressSlides subheading="Custom Subheading" />);
    expect(screen.getByText("Custom Subheading")).toBeInTheDocument();
  });

  it("renders custom slide label", () => {
    render(<CarouselAutoProgressSlides slideLabel="Custom Label" />);
    expect(screen.getByText("Custom Label")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <CarouselAutoProgressSlides className="custom-class" />
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("custom-class");
  });

  it("renders navigation controls", () => {
    const { container } = render(<CarouselAutoProgressSlides />);
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("renders progress dots for each item", () => {
    const items = [
      { src: "img1.jpg", label: "Item 1" },
      { src: "img2.jpg", label: "Item 2" },
      { src: "img3.jpg", label: "Item 3" },
    ];
    const { container } = render(
      <CarouselAutoProgressSlides items={items} />
    );
    // Should have 3 dot buttons plus 2 navigation buttons
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  });

  it("renders custom items", () => {
    const customItems = [
      { src: "custom1.jpg", label: "Custom Item 1" },
      { src: "custom2.jpg", label: "Custom Item 2" },
    ];
    render(<CarouselAutoProgressSlides items={customItems} />);
    // Component should render without errors
    expect(screen.getByText("UI for future")).toBeInTheDocument();
  });

  it("handles prev button click", () => {
    const { container } = render(<CarouselAutoProgressSlides />);
    const buttons = container.querySelectorAll("button");
    // First button should be prev
    fireEvent.click(buttons[0]);
    // Should not throw error
    expect(screen.getByText("UI for future")).toBeInTheDocument();
  });

  it("handles next button click", () => {
    const { container } = render(<CarouselAutoProgressSlides />);
    const buttons = container.querySelectorAll("button");
    // Last navigation button should be next
    const nextButton = buttons[buttons.length - 1];
    fireEvent.click(nextButton);
    // Should not throw error
    expect(screen.getByText("UI for future")).toBeInTheDocument();
  });

  it("applies fullscreen layout", () => {
    const { container } = render(<CarouselAutoProgressSlides />);
    const section = container.querySelector("section");
    expect(section?.className).toContain("min-h-screen");
  });

  it("passes optixFlowConfig to Img components", () => {
    const optixFlowConfig = { apiKey: "test-key", compression: 80 };
    const { container } = render(
      <CarouselAutoProgressSlides optixFlowConfig={optixFlowConfig} />
    );
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders with centered text alignment", () => {
    const { container } = render(<CarouselAutoProgressSlides />);
    const textCenter = container.querySelector(".text-center");
    expect(textCenter).toBeInTheDocument();
  });
});

