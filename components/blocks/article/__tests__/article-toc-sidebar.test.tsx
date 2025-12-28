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

  it("renders with default props", () => {
    render(<ArticleTocSidebar />);
    expect(screen.getByText("Building Scalable Applications with Modern Architecture")).toBeInTheDocument();
    expect(screen.getByText("Alex Chen")).toBeInTheDocument();
  });

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

  it("renders author information", () => {
    render(
      <ArticleTocSidebar
        authorName="Jane Smith"
        publishDate="March 10, 2024"
        readTime="15 min read"
      />
    );
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("March 10, 2024 · 15 min read")).toBeInTheDocument();
  });

  it("renders category badge", () => {
    render(<ArticleTocSidebar category="Development" />);
    expect(screen.getByText("Development")).toBeInTheDocument();
  });

  it("renders table of contents sections", () => {
    render(<ArticleTocSidebar sections={mockSections} />);
    expect(screen.getByText("Table of Contents")).toBeInTheDocument();
    expect(screen.getByText("Setup")).toBeInTheDocument();
    expect(screen.getByText("Usage")).toBeInTheDocument();
  });

  it("renders CTA section", () => {
    render(
      <ArticleTocSidebar
        ctaTitle="Get Started Now"
        ctaDescription="Start building your project today."
        ctaButtonText="Start Building"
        ctaButtonHref="/start"
      />
    );
    expect(screen.getByText("Get Started Now")).toBeInTheDocument();
    expect(screen.getByText("Start building your project today.")).toBeInTheDocument();
    expect(screen.getByText("Start Building")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ArticleTocSidebar className="custom-class" />
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("custom-class");
  });

  it("renders author avatar with fallback", () => {
    render(<ArticleTocSidebar authorName="Bob Wilson" />);
    expect(screen.getByText("B")).toBeInTheDocument();
  });

  it("renders article images", () => {
    render(<ArticleTocSidebar />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders alert component in content", () => {
    render(<ArticleTocSidebar />);
    expect(screen.getByText("Pro Tip")).toBeInTheDocument();
  });

  it("renders best practices list", () => {
    render(<ArticleTocSidebar />);
    expect(screen.getByText("Design for failure and implement graceful degradation")).toBeInTheDocument();
  });

  it("renders grid layout with sidebar", () => {
    const { container } = render(<ArticleTocSidebar />);
    const gridContainer = container.querySelector(".grid");
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer?.className).toContain("lg:grid-cols-[minmax(0,1fr)_300px]");
  });

  it("renders with empty sections array", () => {
    const { container } = render(<ArticleTocSidebar sections={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders sticky sidebar", () => {
    const { container } = render(<ArticleTocSidebar />);
    const stickyElement = container.querySelector(".sticky");
    expect(stickyElement).toBeInTheDocument();
  });

  it("renders with optixFlowConfig", () => {
    const optixConfig = {
      apiKey: "test-api-key",
      compression: 80,
    };
    render(<ArticleTocSidebar optixFlowConfig={optixConfig} />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });
});

