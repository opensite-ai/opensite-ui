import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureImageOverlayBadge } from "../feature-image-overlay-badge";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../ui/badge", () => ({
  Badge: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span className={className} data-testid="mock-badge">{children}</span>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("FeatureImageOverlayBadge", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<FeatureImageOverlayBadge />);
    expect(screen.getByText("Make your site a true standout.")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureImageOverlayBadge title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<FeatureImageOverlayBadge description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders badge when provided", () => {
    render(<FeatureImageOverlayBadge badge="New Feature" />);
    expect(screen.getByText("New Feature")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureImageOverlayBadge className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
