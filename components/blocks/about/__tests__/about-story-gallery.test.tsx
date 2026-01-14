import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutStoryGallery } from "../about-story-gallery";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("AboutStoryGallery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(
      <AboutStoryGallery
        title="Test Title"
        description="Test Description"
      />
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<AboutStoryGallery title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<AboutStoryGallery description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders images when provided", () => {
    const images = [
      { src: "https://example.com/image1.jpg", alt: "Image 1" },
      { src: "https://example.com/image2.jpg", alt: "Image 2" },
    ];
    render(<AboutStoryGallery images={images} />);
    const imgs = screen.getAllByTestId("mock-img");
    expect(imgs.length).toBe(2);
  });

  it("applies custom className", () => {
    const { container } = render(<AboutStoryGallery className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
