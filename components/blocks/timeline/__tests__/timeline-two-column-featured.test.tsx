import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { TimelineTwoColumnFeatured } from "../timeline-two-column-featured";

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

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href?: string;
    className?: string;
  }) => (
    <a href={href} className={className} data-testid="mock-pressable">
      {children}
    </a>
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

describe("TimelineTwoColumnFeatured", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom heading and description", () => {
    const { getByText } = render(
      <TimelineTwoColumnFeatured
        heading="Custom Heading"
        description="Custom description"
      />
    );
    expect(getByText("Custom Heading")).toBeInTheDocument();
    expect(getByText("Custom description")).toBeInTheDocument();
  });
});
