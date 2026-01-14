import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BlurVignetteGrid } from "../blur-vignette-grid";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("BlurVignetteGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<BlurVignetteGrid />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders images when provided", () => {
    const images = [
      { src: "https://example.com/image1.jpg", alt: "Photo 1", colSpan: 2, height: "h-82" },
      { src: "https://example.com/image2.jpg", alt: "Photo 2", colSpan: 3, height: "h-82" },
    ];
    render(<BlurVignetteGrid images={images} />);
    expect(screen.getByAltText("Photo 1")).toBeInTheDocument();
    expect(screen.getByAltText("Photo 2")).toBeInTheDocument();
  });

  it("renders with custom grid columns", () => {
    const { container } = render(<BlurVignetteGrid gridColumns={4} />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<BlurVignetteGrid className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
