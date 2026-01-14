import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { TimelineScrollHighlight } from "../timeline-scroll-highlight";

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

vi.mock("../../../../lib/blockBrandedIconsAndPlaceholders", () => ({
  blockBrandedIconsAndPlaceholders: {
    placeholder1: "https://placeholder.com/1.jpg",
    placeholder2: "https://placeholder.com/2.jpg",
    placeholder3: "https://placeholder.com/3.jpg",
    placeholder4: "https://placeholder.com/4.jpg",
  },
}));

describe("TimelineScrollHighlight", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom heading", () => {
    const { getByText } = render(
      <TimelineScrollHighlight heading={<span>Custom Heading</span>} />
    );
    expect(getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom items", () => {
    const customItems = [
      {
        title: "Custom Title 1",
        description: "Custom description 1",
        date: "2024",
        image: "https://example.com/1.jpg",
      },
      {
        title: "Custom Title 2",
        description: "Custom description 2",
        date: "2025",
        image: "https://example.com/2.jpg",
      },
    ];
    const { getByText } = render(
      <TimelineScrollHighlight items={customItems} />
    );
    expect(getByText("Custom Title 1")).toBeInTheDocument();
    expect(getByText("Custom Title 2")).toBeInTheDocument();
  });
});
