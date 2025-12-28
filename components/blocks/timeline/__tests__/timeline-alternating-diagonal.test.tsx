import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { TimelineAlternatingDiagonal } from "../timeline-alternating-diagonal";

vi.mock("@page-speed/img", () => ({
  Img: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => (
    <img
      src={src}
      alt={alt}
      className={className}
      data-testid="mock-img"
    />
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, size }: { name: string; size: number }) => (
    <span data-testid="mock-dynamic-icon" data-name={name} data-size={size}>
      {name}
    </span>
  ),
}));

vi.mock("../../../ui/badge", () => ({
  Badge: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <span className={className} data-testid="mock-badge">
      {children}
    </span>
  ),
}));

vi.mock("../../../../lib/blockBrandedIconsAndPlaceholders", () => ({
  blockBrandedIconsAndPlaceholders: {
    placeholder1: "https://placeholder.com/1.jpg",
    placeholder2: "https://placeholder.com/2.jpg",
    placeholder3: "https://placeholder.com/3.jpg",
    placeholder4: "https://placeholder.com/4.jpg",
  },
}));

describe("TimelineAlternatingDiagonal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<TimelineAlternatingDiagonal />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <TimelineAlternatingDiagonal className="custom-class" />
    );
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders custom heading and description", () => {
    const { getByText } = render(
      <TimelineAlternatingDiagonal
        heading="Custom Heading"
        description="Custom description"
      />
    );
    expect(getByText("Custom Heading")).toBeInTheDocument();
    expect(getByText("Custom description")).toBeInTheDocument();
  });

  it("renders badge with icon", () => {
    const { container } = render(<TimelineAlternatingDiagonal />);
    const badge = container.querySelector('[data-testid="mock-badge"]');
    expect(badge).toBeInTheDocument();
  });

  it("renders timeline items with images", () => {
    const { container } = render(<TimelineAlternatingDiagonal />);
    const images = container.querySelectorAll('[data-testid="mock-img"]');
    expect(images.length).toBeGreaterThan(0);
  });
});
