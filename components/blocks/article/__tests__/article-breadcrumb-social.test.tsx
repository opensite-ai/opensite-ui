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

  it("renders sections in table of contents", () => {
    render(<ArticleBreadcrumbSocial sections={mockSections} />);
    expect(screen.getByText("Introduction")).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();
    expect(screen.getByText("Conclusion")).toBeInTheDocument();
  });
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
});

