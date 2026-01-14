import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServiceDetailImageHero } from "../service-detail-image-hero";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("ServiceDetailImageHero", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the title", () => {
    render(<ServiceDetailImageHero title="Custom Service Title" />);
    expect(screen.getByText("Custom Service Title")).toBeInTheDocument();
  });
});
