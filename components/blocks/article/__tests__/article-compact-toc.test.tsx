import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ArticleCompactToc } from "../article-compact-toc";
import type { ArticleCompactTocSection } from "../article-compact-toc";

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

describe("ArticleCompactToc", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockSections: ArticleCompactTocSection[] = [
    { id: "intro", title: "Introduction" },
    { id: "methods", title: "Methods" },
    { id: "results", title: "Results" },
  ];

  it("renders custom title", () => {
    render(<ArticleCompactToc title="Custom Research Title" />);
    expect(screen.getByText("Custom Research Title")).toBeInTheDocument();
  });

  it("toggles table of contents on mobile", () => {
    render(<ArticleCompactToc title="Test Article" sections={mockSections} />);

    // Find the mobile TOC button (inside the popover trigger)
    const tocButton = screen.getByRole("button", { name: /table of contents/i });
    expect(tocButton).toBeInTheDocument();

    // Click to open TOC popover
    fireEvent.click(tocButton);

    // Sections should be visible - use getAllByText since there may be duplicates (desktop + mobile)
    const introElements = screen.getAllByText("Introduction");
    expect(introElements.length).toBeGreaterThan(0);
    const methodsElements = screen.getAllByText("Methods");
    expect(methodsElements.length).toBeGreaterThan(0);
    const resultsElements = screen.getAllByText("Results");
    expect(resultsElements.length).toBeGreaterThan(0);
  });

  it("renders with empty sections array", () => {
    const { container } = render(<ArticleCompactToc title="Test Article" sections={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

