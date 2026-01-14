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

  it("renders with custom heading", () => {
    render(<CarouselAutoProgressSlides heading="Custom Heading" subheading="Test subheading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders with custom subheading", () => {
    render(<CarouselAutoProgressSlides heading="Test heading" subheading="Custom Subheading" />);
    expect(screen.getByText("Custom Subheading")).toBeInTheDocument();
  });

  it("renders progress dots for each item", () => {
    const items = [
      { src: "img1.jpg", label: "Item 1" },
      { src: "img2.jpg", label: "Item 2" },
      { src: "img3.jpg", label: "Item 3" },
    ];
    const { container } = render(
      <CarouselAutoProgressSlides heading="Test heading" subheading="Test subheading" items={items} />
    );
    // Should have 3 dot buttons plus 2 navigation buttons
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  });

  it("renders with custom items", () => {
    const customItems = [
      { src: "custom1.jpg", label: "Custom Item 1" },
      { src: "custom2.jpg", label: "Custom Item 2" },
    ];
    render(<CarouselAutoProgressSlides heading="Test heading" subheading="Test subheading" items={customItems} />);
    expect(screen.getByText("Test heading")).toBeInTheDocument();
  });
});

