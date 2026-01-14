import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArticleTocSidebar } from "../article-toc-sidebar";
import type { ArticleTocSection } from "../article-toc-sidebar";

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

describe("ArticleTocSidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockSections: ArticleTocSection[] = [
    { id: "intro", title: "Introduction" },
    { id: "setup", title: "Setup" },
    { id: "usage", title: "Usage" },
    { id: "conclusion", title: "Conclusion" },
  ];

  it("renders custom title and description", () => {
    render(
      <ArticleTocSidebar
        title="Custom Tutorial Title"
        description="Learn how to build amazing things."
      />
    );
    expect(screen.getByText("Custom Tutorial Title")).toBeInTheDocument();
    expect(screen.getByText("Learn how to build amazing things.")).toBeInTheDocument();
  });

  it("renders table of contents sections", () => {
    render(<ArticleTocSidebar sections={mockSections} />);
    expect(screen.getByText("Table of Contents")).toBeInTheDocument();
    expect(screen.getByText("Setup")).toBeInTheDocument();
    expect(screen.getByText("Usage")).toBeInTheDocument();
  });

  it("renders with empty sections array", () => {
    const { container } = render(<ArticleTocSidebar sections={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

