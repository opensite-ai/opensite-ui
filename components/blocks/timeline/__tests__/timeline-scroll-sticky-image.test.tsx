import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { TimelineScrollStickyImage } from "../timeline-scroll-sticky-image";

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
    placeholderDark1: "https://placeholder.com/dark1.jpg",
    placeholderDark2: "https://placeholder.com/dark2.jpg",
    placeholderDark3: "https://placeholder.com/dark3.jpg",
    placeholderDark4: "https://placeholder.com/dark4.jpg",
  },
}));

describe("TimelineScrollStickyImage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom heading", () => {
    const { getByText } = render(
      <TimelineScrollStickyImage heading="Custom Heading" />
    );
    expect(getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom sections", () => {
    const customSections = [
      {
        subTitle: "Custom Subtitle",
        title: "Custom Title",
        description: "Custom description",
        image: "https://example.com/image.jpg",
      },
    ];
    const { getByText } = render(
      <TimelineScrollStickyImage sections={customSections} />
    );
    expect(getByText("Custom Title")).toBeInTheDocument();
  });
});
