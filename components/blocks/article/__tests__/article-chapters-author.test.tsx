import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArticleChaptersAuthor } from "../article-chapters-author";
import type { ArticleChapter, ArticleAuthor } from "../article-chapters-author";

// Mock the Img component from @page-speed/img
vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

// Mock the DynamicIcon component
vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    size,
  }: {
    name?: React.ReactNode | string;
    size?: number;
  }) =>
    typeof name === "string" ? (
      <span data-testid={`icon-${name}`} data-size={size} />
    ) : (
      <>{name}</>
    ),
}));

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor() {}
}
window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

describe("ArticleChaptersAuthor", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockChapters: ArticleChapter[] = [
    { id: "chapter-1", number: 1, title: "Getting Started" },
    { id: "chapter-2", number: 2, title: "Advanced Topics" },
    { id: "chapter-3", number: 3, title: "Best Practices" },
  ];

  const mockAuthor: ArticleAuthor = {
    name: "Jane Smith",
    role: "Senior Developer",
    image: "https://example.com/avatar.jpg",
    bio: "Jane is an experienced developer with 10 years in the industry.",
    socialLinks: {
      twitter: "https://twitter.com/janesmith",
      linkedin: "https://linkedin.com/in/janesmith",
    },
  };

  it("renders custom title and subtitle", () => {
    render(
      <ArticleChaptersAuthor
        title="Custom Guide Title"
        subtitle="Learn something amazing"
      />
    );
    expect(screen.getByText("Custom Guide Title")).toBeInTheDocument();
    expect(screen.getByText("Learn something amazing")).toBeInTheDocument();
  });

  it("renders author information", () => {
    render(<ArticleChaptersAuthor title="Test Guide" author={mockAuthor} />);
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Senior Developer")).toBeInTheDocument();
    expect(screen.getByText(mockAuthor.bio!)).toBeInTheDocument();
  });

  it("renders author social links", () => {
    render(<ArticleChaptersAuthor title="Test Guide" author={mockAuthor} />);
    expect(screen.getByLabelText("Twitter")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
  });

  it("renders author avatar with fallback", () => {
    render(<ArticleChaptersAuthor title="Test Guide" author={{ ...mockAuthor, name: "Alice" }} />);
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("renders conclusion action icon names dynamically and preserves custom icons", () => {
    const leadingIcon = "lucide/book-open";
    const trailingIcon = "lucide/arrow-right";

    render(
      <ArticleChaptersAuthor
        title="Test Guide"
        conclusionActions={[
          {
            label: "Read guide",
            href: "/guide",
            icon: leadingIcon,
            iconAfter: trailingIcon,
          },
          {
            label: "Custom action",
            href: "/custom",
            icon: <span data-testid="custom-leading-icon" />,
            iconAfter: <span data-testid="custom-trailing-icon" />,
          },
        ]}
      />,
    );

    const stringAction = screen.getByText("Read guide").closest("button, a");
    expect(stringAction).not.toBeNull();
    expect(stringAction).not.toHaveTextContent(leadingIcon);
    expect(stringAction).not.toHaveTextContent(trailingIcon);
    expect(screen.getByTestId(`icon-${leadingIcon}`)).toBeInTheDocument();
    expect(screen.getByTestId(`icon-${trailingIcon}`)).toBeInTheDocument();
    expect(screen.getByTestId("custom-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-trailing-icon")).toBeInTheDocument();
  });
});
