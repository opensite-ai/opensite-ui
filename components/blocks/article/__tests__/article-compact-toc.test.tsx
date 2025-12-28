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

  it("renders with default props", () => {
    render(<ArticleCompactToc />);
    expect(screen.getByText("Understanding User Behavior in Modern Web Applications")).toBeInTheDocument();
    expect(screen.getByText("Dr. Michael Chen")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<ArticleCompactToc title="Custom Research Title" />);
    expect(screen.getByText("Custom Research Title")).toBeInTheDocument();
  });

  it("renders author and metadata", () => {
    render(
      <ArticleCompactToc
        authorName="Dr. Jane Smith"
        publishDate="February 20, 2024"
        readTime="12 min read"
      />
    );
    expect(screen.getByText("Dr. Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("February 20, 2024")).toBeInTheDocument();
    expect(screen.getByText("12 min read")).toBeInTheDocument();
  });

  it("renders breadcrumb navigation", () => {
    render(
      <ArticleCompactToc
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Research", href: "/research" },
        ]}
        currentPage="Study"
      />
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Research")).toBeInTheDocument();
    expect(screen.getByText("Study")).toBeInTheDocument();
  });

  it("renders social share buttons", () => {
    render(
      <ArticleCompactToc
        shareUrls={{
          twitter: "https://twitter.com/share",
          facebook: "https://facebook.com/share",
          linkedin: "https://linkedin.com/share",
        }}
      />
    );
    expect(screen.getByLabelText("Share on Twitter")).toBeInTheDocument();
    expect(screen.getByLabelText("Share on Facebook")).toBeInTheDocument();
    expect(screen.getByLabelText("Share on LinkedIn")).toBeInTheDocument();
  });

  it("toggles table of contents on mobile", () => {
    render(<ArticleCompactToc sections={mockSections} />);

    const tocButton = screen.getByText("Table of Contents");
    expect(tocButton).toBeInTheDocument();

    // Click to open TOC
    fireEvent.click(tocButton);

    // Sections should be visible - use getAllByText since there may be duplicates
    const introElements = screen.getAllByText("Introduction");
    expect(introElements.length).toBeGreaterThan(0);
    const methodsElements = screen.getAllByText("Methods");
    expect(methodsElements.length).toBeGreaterThan(0);
    const resultsElements = screen.getAllByText("Results");
    expect(resultsElements.length).toBeGreaterThan(0);
  });

  it("applies custom className", () => {
    const { container } = render(
      <ArticleCompactToc className="custom-class" />
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("custom-class");
  });

  it("renders with empty sections array", () => {
    const { container } = render(<ArticleCompactToc sections={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders article images", () => {
    render(<ArticleCompactToc />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders default sections", () => {
    render(<ArticleCompactToc />);

    // Click to open TOC
    const tocButton = screen.getByText("Table of Contents");
    fireEvent.click(tocButton);

    // Use getAllByText since there may be duplicates in TOC and content
    const introElements = screen.getAllByText("Introduction");
    expect(introElements.length).toBeGreaterThan(0);
    const methodologyElements = screen.getAllByText("Methodology");
    expect(methodologyElements.length).toBeGreaterThan(0);
    const discussionElements = screen.getAllByText("Discussion");
    expect(discussionElements.length).toBeGreaterThan(0);
    const conclusionElements = screen.getAllByText("Conclusion");
    expect(conclusionElements.length).toBeGreaterThan(0);
  });
});

