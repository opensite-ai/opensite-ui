import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroFloatingImages } from "../hero-floating-images";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(10).fill("https://placeholder.com/image.jpg"),
}));

describe("HeroFloatingImages", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<HeroFloatingImages />);
    expect(screen.getByText("Moments curated with OpenSite AI care")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroFloatingImages heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroFloatingImages description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders images", () => {
    render(<HeroFloatingImages />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("applies custom className", () => {
    const { container } = render(<HeroFloatingImages className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
