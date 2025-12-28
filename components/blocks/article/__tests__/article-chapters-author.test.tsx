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
  DynamicIcon: ({ name, size }: { name: string; size: number }) => (
    <span data-testid={`icon-${name}`} data-size={size} />
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

  it("renders with default props", () => {
    render(<ArticleChaptersAuthor />);
    expect(screen.getByText("A Comprehensive Guide to Software Design Patterns")).toBeInTheDocument();
    expect(screen.getByText("Jessica Williams")).toBeInTheDocument();
  });

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

  it("renders chapters navigation", () => {
    render(<ArticleChaptersAuthor chapters={mockChapters} />);
    expect(screen.getByText("Getting Started")).toBeInTheDocument();
    expect(screen.getByText("Advanced Topics")).toBeInTheDocument();
    expect(screen.getByText("Best Practices")).toBeInTheDocument();
  });

  it("renders chapter numbers", () => {
    render(<ArticleChaptersAuthor chapters={mockChapters} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders author information", () => {
    render(<ArticleChaptersAuthor author={mockAuthor} />);
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Senior Developer")).toBeInTheDocument();
    expect(screen.getByText(mockAuthor.bio)).toBeInTheDocument();
  });

  it("renders author social links", () => {
    render(<ArticleChaptersAuthor author={mockAuthor} />);
    expect(screen.getByLabelText("Twitter")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
  });

  it("renders breadcrumb navigation", () => {
    render(
      <ArticleChaptersAuthor
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
        ]}
        currentPage="Design Patterns"
      />
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Guides")).toBeInTheDocument();
    expect(screen.getByText("Design Patterns")).toBeInTheDocument();
  });

  it("renders conclusion section", () => {
    render(
      <ArticleChaptersAuthor
        conclusionTitle="Ready to start?"
        conclusionDescription="Download our resources to get started."
        conclusionButtonText="Download Now"
        conclusionButtonHref="/download"
      />
    );
    expect(screen.getByText("Ready to start?")).toBeInTheDocument();
    expect(screen.getByText("Download our resources to get started.")).toBeInTheDocument();
    expect(screen.getByText("Download Now")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ArticleChaptersAuthor className="custom-class" />
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("custom-class");
  });

  it("renders author avatar with fallback", () => {
    render(<ArticleChaptersAuthor author={{ ...mockAuthor, name: "Alice" }} />);
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("renders with empty chapters array", () => {
    const { container } = render(<ArticleChaptersAuthor chapters={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders article images", () => {
    render(<ArticleChaptersAuthor />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });
});

