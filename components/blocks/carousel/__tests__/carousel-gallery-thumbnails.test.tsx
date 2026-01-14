import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CarouselGalleryThumbnails } from "../carousel-gallery-thumbnails";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("CarouselGalleryThumbnails", () => {
  const mockImage = {
    src: "/test.jpg",
    alt: "Test Image",
  };

  it("renders without crashing", () => {
    const { container } = render(<CarouselGalleryThumbnails images={[mockImage]} />);
    expect(container).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CarouselGalleryThumbnails images={[mockImage]} className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
