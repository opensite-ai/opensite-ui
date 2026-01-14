import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MasonryMotionGrid } from "../masonry-motion-grid";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("MasonryMotionGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<MasonryMotionGrid />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders column 1 images when provided", () => {
    const column1Images = [
      { src: "https://example.com/image1.jpg", alt: "Photo 1", height: "23rem" },
    ];
    render(<MasonryMotionGrid column1Images={column1Images} />);
    expect(screen.getAllByAltText("Photo 1").length).toBeGreaterThan(0);
  });

  it("renders images from multiple columns", () => {
    const column1Images = [{ src: "https://example.com/image1.jpg", alt: "Col 1", height: "23rem" }];
    const column2Images = [{ src: "https://example.com/image2.jpg", alt: "Col 2", height: "13rem" }];
    render(<MasonryMotionGrid column1Images={column1Images} column2Images={column2Images} />);
    expect(screen.getAllByAltText("Col 1").length).toBeGreaterThan(0);
    expect(screen.getAllByAltText("Col 2").length).toBeGreaterThan(0);
  });

  it("applies custom className", () => {
    const { container } = render(<MasonryMotionGrid className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
