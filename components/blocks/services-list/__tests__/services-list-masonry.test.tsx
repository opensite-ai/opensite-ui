import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { ServicesListMasonry } from "../services-list-masonry";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("ServicesListMasonry", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom heading and description", () => {
    const { getByText } = render(
      <ServicesListMasonry
        heading="Custom Heading"
        description="Custom Description"
      />
    );
    expect(getByText("Custom Heading")).toBeInTheDocument();
    expect(getByText("Custom Description")).toBeInTheDocument();
  });
});
