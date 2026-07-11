import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { TestimonialsListVerified } from "../testimonials-list-verified";

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

vi.mock("../../../ui/separator", () => ({
  Separator: ({ className }: { className?: string }) => (
    <hr data-testid="mock-separator" className={className} />
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
    avatar4: "https://placeholder.com/avatar4.jpg",
    avatar5: "https://placeholder.com/avatar5.jpg",
  },
}));

describe("TestimonialsListVerified", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom heading", () => {
    const { container } = render(<TestimonialsListVerified heading="Custom Reviews" />);
    expect(container.textContent).toContain("Custom Reviews");
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
        <TestimonialsListVerified reviews={[review]} verifiedPurchaseLabel="Verified Diner" />,
      );
      expect(container.textContent).toContain("Verified Diner");
      expect(container.querySelector('[data-name="lucide/badge-check"]')).not.toBeNull();
    });

    it("renders NO indicator when verifiedPurchaseLabel is omitted (never falls back to hardcoded wording)", () => {
      const { container } = render(<TestimonialsListVerified reviews={[review]} />);
      expect(container.textContent).not.toContain("Verified Purchase");
      expect(container.querySelector('[data-name="lucide/badge-check"]')).toBeNull();
    });
  });
});
