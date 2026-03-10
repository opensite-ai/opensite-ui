import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TestimonialsGridAddReview } from "../testimonials-grid-add-review";
import type { TestimonialItem } from "../../../../src/types";

vi.mock("../../../ui/card", () => ({
  Card: ({
    children,
    className,
    onClick,
  }: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }) => (
    <div data-testid="mock-card" className={className} onClick={onClick}>
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
  AvatarImage: ({ src, alt }: { src?: string; alt?: string }) => (
    <img src={src} alt={alt} data-testid="mock-avatar-image" />
  ),
  AvatarFallback: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="mock-avatar-fallback">{children}</span>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>
      icon
    </span>
  ),
}));

vi.mock("../../../ui/star-rating", () => ({
  StarRating: ({ rating, size }: { rating: number; size?: number }) => (
    <div data-testid="mock-star-rating" data-rating={rating} data-size={size}>
      ★ {rating}
    </div>
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

vi.mock("../../../../lib/blockBrandedIconsAndPlaceholders", () => ({
  blockBrandedIconsAndPlaceholders: {
    avatar1: "https://placeholder.com/avatar1.jpg",
    avatar2: "https://placeholder.com/avatar2.jpg",
    avatar3: "https://placeholder.com/avatar3.jpg",
    avatar4: "https://placeholder.com/avatar4.jpg",
    avatar5: "https://placeholder.com/avatar5.jpg",
  },
}));

const sampleReviews: TestimonialItem[] = [
  {
    quote: "This product changed my workflow entirely.",
    author: "Alice Johnson",
    role: "Engineering Lead",
    avatarSrc: "https://example.com/alice.jpg",
    rating: 5,
  },
  {
    quote: "Outstanding support and great features.",
    author: "Bob Smith",
    role: "Product Manager",
    company: "Acme Corp",
    avatar: {
      src: "https://example.com/bob.jpg",
      alt: "Bob Smith avatar",
    },
    rating: 4,
  },
  {
    quote: "Simple, powerful, and reliable.",
    author: "Carol Davis",
    role: "CTO",
    avatarSrc: "https://example.com/carol.jpg",
    linkConfig: {
      label: "Read full review",
      href: "https://example.com/review/carol",
      className: "text-blue-500",
    },
  },
];

describe("TestimonialsGridAddReview", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // --- Heading ---

  it("renders a string heading as an h2", () => {
    const { container } = render(
      <TestimonialsGridAddReview heading="Customer Reviews" />,
    );
    const h2 = container.querySelector("h2");
    expect(h2).toBeTruthy();
    expect(h2!.textContent).toBe("Customer Reviews");
  });

  it("renders a ReactNode heading directly", () => {
    const { container } = render(
      <TestimonialsGridAddReview
        heading={<span data-testid="custom-heading">Custom JSX</span>}
      />,
    );
    expect(screen.getByTestId("custom-heading")).toBeTruthy();
    expect(container.querySelector("h2")).toBeNull();
  });

  it("does not render heading when not provided", () => {
    const { container } = render(<TestimonialsGridAddReview />);
    expect(container.querySelector("h2")).toBeNull();
  });

  // --- Description ---

  it("renders a string description as a paragraph", () => {
    const { container } = render(
      <TestimonialsGridAddReview description="See what people are saying" />,
    );
    expect(container.textContent).toContain("See what people are saying");
  });

  it("renders a ReactNode description directly", () => {
    render(
      <TestimonialsGridAddReview
        description={<em data-testid="custom-desc">Emphasized description</em>}
      />,
    );
    expect(screen.getByTestId("custom-desc")).toBeTruthy();
  });

  // --- Add Review Card ---

  it("renders the add review card with plus icon", () => {
    render(<TestimonialsGridAddReview reviews={sampleReviews} />);
    const icons = screen.getAllByTestId("mock-icon");
    const plusIcon = icons.find(
      (el) => el.getAttribute("data-name") === "lucide/plus",
    );
    expect(plusIcon).toBeTruthy();
  });

  it("renders addReviewText and addReviewSubtext strings", () => {
    const { container } = render(
      <TestimonialsGridAddReview
        reviews={[]}
        addReviewText="Write a Review"
        addReviewSubtext="Share your experience"
      />,
    );
    expect(container.textContent).toContain("Write a Review");
    expect(container.textContent).toContain("Share your experience");
  });

  it("renders addReviewText and addReviewSubtext as ReactNode", () => {
    render(
      <TestimonialsGridAddReview
        reviews={[]}
        addReviewText={<strong data-testid="review-text-node">Add Now</strong>}
        addReviewSubtext={
          <em data-testid="review-subtext-node">We value your feedback</em>
        }
      />,
    );
    expect(screen.getByTestId("review-text-node")).toBeTruthy();
    expect(screen.getByTestId("review-subtext-node")).toBeTruthy();
  });

  it("calls onAddReview when add review card is clicked", () => {
    const onAddReview = vi.fn();
    render(
      <TestimonialsGridAddReview reviews={[]} onAddReview={onAddReview} />,
    );
    // The add-review card is the first mock-card rendered
    const cards = screen.getAllByTestId("mock-card");
    fireEvent.click(cards[0]);
    expect(onAddReview).toHaveBeenCalledTimes(1);
  });

  // --- Reviews Rendering (TestimonialItem) ---

  it("renders all provided reviews as cards", () => {
    render(<TestimonialsGridAddReview reviews={sampleReviews} />);
    // 1 add-review card + 3 review cards = 4 total
    const cards = screen.getAllByTestId("mock-card");
    expect(cards.length).toBe(4);
  });

  it("renders review quotes wrapped in curly quotes", () => {
    const { container } = render(
      <TestimonialsGridAddReview reviews={sampleReviews} />,
    );
    expect(container.textContent).toContain(
      "\u201CThis product changed my workflow entirely.\u201D",
    );
    expect(container.textContent).toContain(
      "\u201COutstanding support and great features.\u201D",
    );
    expect(container.textContent).toContain(
      "\u201CSimple, powerful, and reliable.\u201D",
    );
  });

  it("renders ReactNode quotes without wrapping", () => {
    const reviews: TestimonialItem[] = [
      {
        quote: <div data-testid="jsx-quote">Custom quote element</div>,
        author: "Test User",
      },
    ];
    render(<TestimonialsGridAddReview reviews={reviews} />);
    expect(screen.getByTestId("jsx-quote")).toBeTruthy();
  });

  it("renders author names", () => {
    const { container } = render(
      <TestimonialsGridAddReview reviews={sampleReviews} />,
    );
    expect(container.textContent).toContain("Alice Johnson");
    expect(container.textContent).toContain("Bob Smith");
    expect(container.textContent).toContain("Carol Davis");
  });

  it("renders ReactNode author directly", () => {
    const reviews: TestimonialItem[] = [
      {
        quote: "Great!",
        author: <span data-testid="jsx-author">Dr. Node</span>,
      },
    ];
    render(<TestimonialsGridAddReview reviews={reviews} />);
    expect(screen.getByTestId("jsx-author")).toBeTruthy();
  });

  it("renders author roles", () => {
    const { container } = render(
      <TestimonialsGridAddReview reviews={sampleReviews} />,
    );
    expect(container.textContent).toContain("Engineering Lead");
    expect(container.textContent).toContain("Product Manager");
    expect(container.textContent).toContain("CTO");
  });

  it("renders ReactNode role directly", () => {
    const reviews: TestimonialItem[] = [
      {
        quote: "Nice!",
        author: "Test",
        role: <em data-testid="jsx-role">VP of Fun</em>,
      },
    ];
    render(<TestimonialsGridAddReview reviews={reviews} />);
    expect(screen.getByTestId("jsx-role")).toBeTruthy();
  });

  // --- Avatar ---

  it("renders avatars with avatarSrc", () => {
    render(<TestimonialsGridAddReview reviews={[sampleReviews[0]]} />);
    const avatarImages = screen.getAllByTestId("mock-avatar-image");
    const aliceAvatar = avatarImages.find(
      (img) => img.getAttribute("src") === "https://example.com/alice.jpg",
    );
    expect(aliceAvatar).toBeTruthy();
  });

  it("renders avatars with avatar.src when avatarSrc is not provided", () => {
    render(<TestimonialsGridAddReview reviews={[sampleReviews[1]]} />);
    const avatarImages = screen.getAllByTestId("mock-avatar-image");
    const bobAvatar = avatarImages.find(
      (img) => img.getAttribute("src") === "https://example.com/bob.jpg",
    );
    expect(bobAvatar).toBeTruthy();
  });

  it("renders avatar fallback with author initials", () => {
    render(<TestimonialsGridAddReview reviews={sampleReviews} />);
    const fallbacks = screen.getAllByTestId("mock-avatar-fallback");
    const fallbackTexts = fallbacks.map((el) => el.textContent);
    expect(fallbackTexts).toContain("AJ");
    expect(fallbackTexts).toContain("BS");
    expect(fallbackTexts).toContain("CD");
  });

  // --- Star Rating ---

  it("renders star ratings for each review", () => {
    render(<TestimonialsGridAddReview reviews={sampleReviews} />);
    const starRatings = screen.getAllByTestId("mock-star-rating");
    // One star rating per review
    expect(starRatings.length).toBe(sampleReviews.length);
  });

  // --- Link Config ---

  it("renders linkConfig when provided on a testimonial", () => {
    render(<TestimonialsGridAddReview reviews={[sampleReviews[2]]} />);
    const link = screen.getByTestId("mock-pressable");
    expect(link).toBeTruthy();
    expect(link.getAttribute("href")).toBe("https://example.com/review/carol");
    expect(link.textContent).toContain("Read full review");
  });

  it("does not render a link when linkConfig is absent", () => {
    render(<TestimonialsGridAddReview reviews={[sampleReviews[0]]} />);
    expect(screen.queryByTestId("mock-pressable")).toBeNull();
  });

  // --- reviewsSlot Override ---

  it("renders reviewsSlot instead of reviews array when provided", () => {
    render(
      <TestimonialsGridAddReview
        reviews={sampleReviews}
        reviewsSlot={<div data-testid="custom-slot">Custom reviews slot</div>}
      />,
    );
    expect(screen.getByTestId("custom-slot")).toBeTruthy();
    // The default grid with add-review card should not be rendered
    expect(screen.queryByTestId("mock-icon")).toBeNull();
  });

  // --- Edge Cases ---

  it("renders without reviews", () => {
    const { container } = render(
      <TestimonialsGridAddReview heading="No Reviews Yet" />,
    );
    expect(container.textContent).toContain("No Reviews Yet");
    // Should still render the add-review card
    const icons = screen.getAllByTestId("mock-icon");
    const plusIcon = icons.find(
      (el) => el.getAttribute("data-name") === "lucide/plus",
    );
    expect(plusIcon).toBeTruthy();
  });

  it("renders with an empty reviews array", () => {
    render(<TestimonialsGridAddReview reviews={[]} />);
    // Only the add-review card
    const cards = screen.getAllByTestId("mock-card");
    expect(cards.length).toBe(1);
  });

  it("handles a review with no author gracefully", () => {
    const reviews: TestimonialItem[] = [
      {
        quote: "Anonymous feedback.",
      },
    ];
    const { container } = render(
      <TestimonialsGridAddReview reviews={reviews} />,
    );
    expect(container.textContent).toContain("Anonymous feedback.");
  });

  it("handles a review with no role gracefully", () => {
    const reviews: TestimonialItem[] = [
      {
        quote: "Just a quote.",
        author: "Someone",
      },
    ];
    const { container } = render(
      <TestimonialsGridAddReview reviews={reviews} />,
    );
    expect(container.textContent).toContain("Just a quote.");
    expect(container.textContent).toContain("Someone");
  });

  // --- Custom ClassNames ---

  it("applies custom cardClassName to review cards", () => {
    render(
      <TestimonialsGridAddReview
        reviews={[sampleReviews[0]]}
        cardClassName="custom-card-class"
      />,
    );
    const cards = screen.getAllByTestId("mock-card");
    // The second card is the review card (first is the add-review card)
    const reviewCard = cards[1];
    expect(reviewCard.className).toContain("custom-card-class");
  });

  it("applies custom addReviewCardClassName to the add review card", () => {
    render(
      <TestimonialsGridAddReview
        reviews={[]}
        addReviewCardClassName="add-review-custom"
      />,
    );
    const cards = screen.getAllByTestId("mock-card");
    expect(cards[0].className).toContain("add-review-custom");
  });
});
