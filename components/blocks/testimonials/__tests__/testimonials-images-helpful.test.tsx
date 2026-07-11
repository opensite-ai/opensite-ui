import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { TestimonialsImagesHelpful } from "../testimonials-images-helpful";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../ui/card", () => ({
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="mock-card" className={className}>{children}</div>
  ),
  CardContent: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="mock-card-content" className={className}>{children}</div>
  ),
}));

vi.mock("../../../ui/avatar", () => ({
  Avatar: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="mock-avatar" className={className}>{children}</div>
  ),
  AvatarImage: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="mock-avatar-image" />
  ),
  AvatarFallback: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="mock-avatar-fallback">{children}</span>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <button data-testid="mock-pressable" className={className}>{children}</button>
  ),
}));

vi.mock("../../../../lib/blockBrandedIconsAndPlaceholders", () => ({
  blockBrandedIconsAndPlaceholders: {
    avatar1: "https://placeholder.com/avatar1.jpg",
    avatar2: "https://placeholder.com/avatar2.jpg",
  },
}));

vi.mock("../../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("TestimonialsImagesHelpful", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with explicit heading", () => {
    render(<TestimonialsImagesHelpful heading="Test Reviews" writeReviewLabel="Write a Review" />);
    expect(screen.getByText("Test Reviews")).toBeInTheDocument();
    expect(screen.getByText("Write a Review")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<TestimonialsImagesHelpful heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders write review button", () => {
    render(<TestimonialsImagesHelpful heading="Test Reviews" writeReviewLabel="Write a Review" />);
    expect(screen.getByText("Write a Review")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<TestimonialsImagesHelpful heading="Test Reviews" className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  describe("verified indicator (no hardcoded fallback)", () => {
    const review = {
      rating: 5,
      title: "Great experience",
      content: "Wonderful from start to finish.",
      author: "Ann Example",
      date: "Jul 1, 2026",
      verified: true,
    };

    it("renders the supplied verifiedPurchaseLabel with the badge icon", () => {
      const { container } = render(
        <TestimonialsImagesHelpful reviews={[review]} verifiedPurchaseLabel="Verified Diner" />,
      );
      expect(container.textContent).toContain("Verified Diner");
      expect(container.querySelector('[data-name="lucide/badge-check"]')).not.toBeNull();
    });

    it("renders NO indicator when verifiedPurchaseLabel is omitted (never falls back to hardcoded wording)", () => {
      const { container } = render(<TestimonialsImagesHelpful reviews={[review]} />);
      expect(container.textContent).not.toContain("Verified Purchase");
      expect(container.querySelector('[data-name="lucide/badge-check"]')).toBeNull();
    });
  });
});
