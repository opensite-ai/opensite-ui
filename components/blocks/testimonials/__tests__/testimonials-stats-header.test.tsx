import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { TestimonialsStatsHeader } from "../testimonials-stats-header";
import type { TestimonialItem } from "../../../../src/types";

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

vi.mock("../../../../lib/blockBrandedIconsAndPlaceholders", () => ({
  blockBrandedIconsAndPlaceholders: {
    avatar1: "https://placeholder.com/avatar1.jpg",
    avatar2: "https://placeholder.com/avatar2.jpg",
    avatar3: "https://placeholder.com/avatar3.jpg",
  },
}));

describe("TestimonialsStatsHeader", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom heading", () => {
    const { container } = render(<TestimonialsStatsHeader heading="Custom Heading" />);
    expect(container.textContent).toContain("Custom Heading");
  });

  // Count the "filled" star icons rendered by the real StarRating (via the
  // mocked DynamicIcon): filled stars carry the `fill-primary` class.
  const countFilledStars = () =>
    screen
      .getAllByTestId("mock-icon")
      .filter((el) => el.getAttribute("data-name") === "icon-park-solid/star")
      .filter((el) => (el.getAttribute("class") ?? "").includes("fill-primary"))
      .length;

  it("renders the testimonial's real rating when numeric (feed-driven)", () => {
    const testimonials: TestimonialItem[] = [
      { quote: "Solid three-star experience.", author: "Rev One", rating: 3 },
    ];
    render(<TestimonialsStatsHeader testimonials={testimonials} />);
    // A single testimonial card → one StarRating → 3 of 5 stars filled.
    expect(countFilledStars()).toBe(3);
  });

  it("falls back to 5 filled stars only when rating is absent (no fabricated change)", () => {
    const testimonials: TestimonialItem[] = [
      { quote: "No rating supplied.", author: "Rev None" },
    ];
    render(<TestimonialsStatsHeader testimonials={testimonials} />);
    expect(countFilledStars()).toBe(5);
  });
});
