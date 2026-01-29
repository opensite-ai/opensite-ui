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

  it("renders with provided props", () => {
    render(<FeatureImageOverlayBadge badge="Test Badge" title="Test Title" />);
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders custom badge", () => {
    render(<FeatureImageOverlayBadge badge="Custom Badge" />);
    expect(screen.getByText("Custom Badge")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureImageOverlayBadge title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders overlay title", () => {
    render(<FeatureImageOverlayBadge imageSrc="/test.jpg" overlayTitle="Custom Overlay Title" />);
    expect(screen.getByText("Custom Overlay Title")).toBeInTheDocument();
  });

  it("renders avatar badge text", () => {
    render(<FeatureImageOverlayBadge imageSrc="/test.jpg" avatarBadgeText="Custom Avatar Badge" />);
    expect(screen.getByText("Custom Avatar Badge")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureImageOverlayBadge className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
