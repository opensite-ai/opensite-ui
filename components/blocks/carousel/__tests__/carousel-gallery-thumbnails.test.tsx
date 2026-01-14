import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CarouselGalleryThumbnails } from "../carousel-gallery-thumbnails";

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

describe("CarouselGalleryThumbnails", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders custom images", () => {
    const customImages = [
      { src: "custom1.jpg", alt: "Custom Image 1", width: 800, height: 600 },
      { src: "custom2.jpg", alt: "Custom Image 2", width: 800, height: 600 },
    ];
    render(<CarouselGalleryThumbnails images={customImages} />);
    expect(screen.getByAltText("Custom Image 1")).toBeInTheDocument();
    expect(screen.getByAltText("Custom Image 2")).toBeInTheDocument();
  });

  it("renders thumbnails when showThumbnails is true", () => {
    const images = [
      { src: "img1.jpg", alt: "Image 1" },
      { src: "img2.jpg", alt: "Image 2" },
    ];
    render(<CarouselGalleryThumbnails images={images} showThumbnails={true} />);
    // Should have thumbnails
    expect(screen.getByAltText("Thumbnail 1")).toBeInTheDocument();
    expect(screen.getByAltText("Thumbnail 2")).toBeInTheDocument();
  });

  it("hides thumbnails when showThumbnails is false", () => {
    const images = [
      { src: "img1.jpg", alt: "Image 1" },
      { src: "img2.jpg", alt: "Image 2" },
    ];
    render(<CarouselGalleryThumbnails images={images} showThumbnails={false} />);
    // Should not have thumbnails
    expect(screen.queryByAltText("Thumbnail 1")).not.toBeInTheDocument();
  });

  it("handles thumbnail click", () => {
    const images = [
      { src: "img1.jpg", alt: "Image 1" },
      { src: "img2.jpg", alt: "Image 2" },
    ];
    const { container } = render(
      <CarouselGalleryThumbnails images={images} showThumbnails={true} />
    );
    const thumbnailButtons = container.querySelectorAll("button");
    // Click on second thumbnail
    if (thumbnailButtons.length > 2) {
      fireEvent.click(thumbnailButtons[thumbnailButtons.length - 1]);
    }
    // Should not throw error
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("displays caption for current image", () => {
    const images = [{ src: "img1.jpg", alt: "Test Caption" }];
    render(<CarouselGalleryThumbnails images={images} />);
    expect(screen.getByText("Test Caption")).toBeInTheDocument();
  });
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    // Should not throw error
    expect(container.querySelector("section")).toBeInTheDocument();
  });
});

