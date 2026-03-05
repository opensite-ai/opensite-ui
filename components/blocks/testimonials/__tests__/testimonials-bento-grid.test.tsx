import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { TestimonialsBentoGrid } from "../testimonials-bento-grid";

vi.mock("../../../ui/card", () => ({
  Card: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="mock-card" className={className}>
      {children}
    </div>
  ),
  CardContent: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="mock-card-content" className={className}>
      {children}
    </div>
  ),
}));

vi.mock("../../../ui/avatar", () => ({
  Avatar: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="mock-avatar" className={className}>
      {children}
    </div>
  ),
  AvatarImage: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="mock-avatar-image" />
  ),
  AvatarFallback: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="mock-avatar-fallback">{children}</span>
  ),
}));

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({
    children,
    className,
    href,
  }: {
    children: React.ReactNode;
    className?: string;
    href?: string;
  }) => (
    <a data-testid="mock-pressable" className={className} href={href}>
      {children}
    </a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>
      icon
    </span>
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

describe("TestimonialsBentoGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom heading", () => {
    const { container } = render(
      <TestimonialsBentoGrid heading="Custom Heading" />,
    );
    expect(container.textContent).toContain("Custom Heading");
  });

  it("renders 1 featured + 5 smaller cards (6 total)", () => {
    const testimonials = [
      {
        quote: "Featured quote",
        author: "Featured Author",
        role: "CEO",
        company: "FeaturedCo",
        featured: true,
      },
      { quote: "Quote 2", author: "Author 2", role: "CTO" },
      { quote: "Quote 3", author: "Author 3", role: "CFO" },
      { quote: "Quote 4", author: "Author 4", role: "COO" },
      { quote: "Quote 5", author: "Author 5", role: "VP" },
      { quote: "Quote 6", author: "Author 6", role: "Lead" },
    ];
    const { container } = render(
      <TestimonialsBentoGrid testimonials={testimonials} />,
    );
    const cards = container.querySelectorAll("[data-testid='mock-card']");
    expect(cards).toHaveLength(6);
  });

  it("renders linkConfig on featured card", () => {
    const testimonials = [
      {
        quote: "Featured quote",
        author: "Alice",
        role: "CEO",
        featured: true,
        linkConfig: {
          label: "Read Review",
          href: "https://example.com/review",
        },
      },
    ];
    const { getAllByTestId } = render(
      <TestimonialsBentoGrid testimonials={testimonials} />,
    );
    const pressables = getAllByTestId("mock-pressable");
    expect(pressables[0]).toHaveTextContent("Read Review");
  });

  it("renders linkConfig on smaller cards", () => {
    const testimonials = [
      { quote: "Featured", author: "A", role: "CEO", featured: true },
      {
        quote: "Small card",
        author: "Bob",
        role: "Dev",
        linkConfig: {
          label: "View on Google",
          href: "https://google.com/review",
        },
      },
    ];
    const { getByTestId } = render(
      <TestimonialsBentoGrid testimonials={testimonials} />,
    );
    expect(getByTestId("mock-pressable")).toHaveTextContent("View on Google");
  });

  it("does not render linkConfig when not provided", () => {
    const testimonials = [
      { quote: "No link", author: "Charlie", role: "PM", featured: true },
    ];
    const { queryByTestId } = render(
      <TestimonialsBentoGrid testimonials={testimonials} />,
    );
    expect(queryByTestId("mock-pressable")).not.toBeInTheDocument();
  });
});
