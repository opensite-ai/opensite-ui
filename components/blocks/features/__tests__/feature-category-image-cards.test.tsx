import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureCategoryImageCards } from "../feature-category-image-cards";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("FeatureCategoryImageCards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<FeatureCategoryImageCards />);
    expect(screen.getByText("Key Features")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureCategoryImageCards title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<FeatureCategoryImageCards description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders badge when provided", () => {
    render(<FeatureCategoryImageCards badge="New Feature" />);
    expect(screen.getByText("New Feature")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureCategoryImageCards className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
