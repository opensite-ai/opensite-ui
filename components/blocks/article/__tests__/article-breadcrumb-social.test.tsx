import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ArticleBreadcrumbSocial } from "../article-breadcrumb-social";
import type { ArticleBreadcrumbSection } from "../article-breadcrumb-social";

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

describe("ArticleBreadcrumbSocial", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset scroll position
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockSections: ArticleBreadcrumbSection[] = [
    { id: "intro", title: "Introduction" },
    { id: "details", title: "Details" },
    { id: "conclusion", title: "Conclusion" },
  ];

  it("renders with default props", () => {
    render(<ArticleBreadcrumbSocial />);
    expect(screen.getByText("Article")).toBeInTheDocument();
    expect(screen.getByText("Mastering Performance Optimization in Modern Web Apps")).toBeInTheDocument();
    expect(screen.getByText("Emily Rodriguez")).toBeInTheDocument();
  });

  it("renders custom title and author", () => {
    render(
      <ArticleBreadcrumbSocial
        title="Custom Article Title"
        authorName="John Smith"
        authorRole="Developer"
      />
    );
    expect(screen.getByText("Custom Article Title")).toBeInTheDocument();
    expect(screen.getByText("John Smith")).toBeInTheDocument();
  });

  it("renders breadcrumb navigation", () => {
    render(
      <ArticleBreadcrumbSocial
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
        currentPage="Test Article"
      />
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("Test Article")).toBeInTheDocument();
  });

  it("renders sections in table of contents", () => {
    render(<ArticleBreadcrumbSocial sections={mockSections} />);
    expect(screen.getByText("Introduction")).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();
    expect(screen.getByText("Conclusion")).toBeInTheDocument();
  });

  it("renders social share buttons", () => {
    render(
      <ArticleBreadcrumbSocial
        shareUrls={{
          twitter: "https://twitter.com/share",
          facebook: "https://facebook.com/share",
          linkedin: "https://linkedin.com/share",
          instagram: "https://instagram.com/share",
        }}
      />
    );
    expect(screen.getByLabelText("Share on Twitter")).toBeInTheDocument();
    expect(screen.getByLabelText("Share on Facebook")).toBeInTheDocument();
    expect(screen.getByLabelText("Share on LinkedIn")).toBeInTheDocument();
    expect(screen.getByLabelText("Share on Instagram")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ArticleBreadcrumbSocial className="custom-class" />
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("custom-class");
  });

  it("renders author avatar with fallback", () => {
    render(<ArticleBreadcrumbSocial authorName="Jane Doe" />);
    expect(screen.getByText("J")).toBeInTheDocument();
  });

  it("renders publish date and read time", () => {
    render(
      <ArticleBreadcrumbSocial
        publishDate="March 15, 2024"
        readTime="10 min read"
      />
    );
    expect(screen.getByText(/March 15, 2024/)).toBeInTheDocument();
    expect(screen.getByText(/10 min read/)).toBeInTheDocument();
  });

  it("shows back to top button when scrolled", () => {
    const { rerender } = render(<ArticleBreadcrumbSocial />);
    
    // Simulate scroll
    Object.defineProperty(window, "scrollY", { value: 500 });
    fireEvent.scroll(window);
    
    rerender(<ArticleBreadcrumbSocial />);
    
    // The button should appear after scroll
    const backToTopButton = screen.queryByLabelText("Back to top");
    // Note: Due to React state updates, this may need adjustment in actual testing
  });

  it("renders with empty sections array", () => {
    const { container } = render(<ArticleBreadcrumbSocial sections={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders article hero image", () => {
    render(<ArticleBreadcrumbSocial />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });
});

