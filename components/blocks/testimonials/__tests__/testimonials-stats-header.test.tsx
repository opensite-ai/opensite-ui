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
  DynamicIcon: ({
    name,
    className,
  }: {
    name?: React.ReactNode;
    className?: string;
  }) =>
    typeof name === "string" ? (
      <span data-testid="mock-icon" data-name={name} className={className}>
        icon
      </span>
    ) : (
      <>{name}</>
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

  it("routes iconSlot strings while preserving fallbacks, stars, and avatar media", () => {
    const { container } = render(
      <TestimonialsStatsHeader
        stats={[
          {
            id: "string-slot",
            value: "1",
            label: "String slot",
            iconSlot: "lucide/sparkles",
            icon: "lucide/ignored-string-fallback",
            className: "string-slot-stat",
          },
          {
            id: "custom-slot",
            value: "2",
            label: "Custom slot",
            iconSlot: <span data-testid="custom-stat-icon">Custom icon</span>,
            icon: "lucide/ignored-custom-fallback",
            className: "custom-slot-stat",
          },
          {
            id: "empty-slot",
            value: "3",
            label: "Empty slot",
            iconSlot: "",
            icon: "lucide/empty-fallback",
            className: "empty-slot-stat",
          },
          {
            id: "false-slot",
            value: "4",
            label: "False slot",
            iconSlot: false,
            icon: "lucide/false-fallback",
            className: "false-slot-stat",
          },
          {
            id: "zero-slot",
            value: "5",
            label: "Zero slot",
            iconSlot: 0,
            icon: "lucide/zero-fallback",
            className: "zero-slot-stat",
          },
        ]}
        testimonials={[
          {
            quote: "Media boundary testimonial",
            author: "Boundary Author",
            avatarSrc: "lucide/avatar-looking-image",
            rating: 4,
          },
        ]}
      />
    );

    const stringIcon = container.querySelector(
      '.string-slot-stat [data-name="lucide/sparkles"]'
    );
    const customIcon = screen.getByTestId("custom-stat-icon");
    expect(stringIcon).toBeInTheDocument();
    expect(
      container.querySelector(".string-slot-stat") as HTMLElement
    ).not.toHaveTextContent("lucide/sparkles");
    expect(
      container.querySelector('[data-name="lucide/ignored-string-fallback"]')
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('[data-name="lucide/ignored-custom-fallback"]')
    ).not.toBeInTheDocument();
    expect(stringIcon?.closest(".mb-6")).toBeNull();
    expect(customIcon.closest(".mb-6")).toBeNull();

    for (const [className, iconName] of [
      ["empty-slot-stat", "lucide/empty-fallback"],
      ["false-slot-stat", "lucide/false-fallback"],
      ["zero-slot-stat", "lucide/zero-fallback"],
    ]) {
      const fallbackIcon = container.querySelector(
        `.${className} [data-name="${iconName}"]`
      );
      expect(fallbackIcon).toBeInTheDocument();
      expect(fallbackIcon?.closest(".mb-6")).toBeInTheDocument();
    }

    expect(
      container.querySelector('[data-name="icon-park-solid/star"]')
    ).toBeInTheDocument();
    expect(screen.getByTestId("mock-avatar-image")).toHaveAttribute(
      "src",
      "lucide/avatar-looking-image"
    );
    expect(
      container.querySelector('[data-name="lucide/avatar-looking-image"]')
    ).not.toBeInTheDocument();
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
