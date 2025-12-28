import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArticleSidebarSticky } from "../article-sidebar-sticky";

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

describe("ArticleSidebarSticky", () => {
  it("renders with default props", () => {
    render(<ArticleSidebarSticky />);
    expect(screen.getByText("The Art of Modern Web Development")).toBeInTheDocument();
    // Author name may appear multiple times (sidebar and content)
    const authorElements = screen.getAllByText("Sarah Johnson");
    expect(authorElements.length).toBeGreaterThan(0);
    // Date may appear multiple times
    const dateElements = screen.getAllByText("December 15, 2024");
    expect(dateElements.length).toBeGreaterThan(0);
  });

  it("renders custom title", () => {
    render(<ArticleSidebarSticky title="Custom Article Title" />);
    expect(screen.getByText("Custom Article Title")).toBeInTheDocument();
  });

  it("renders custom author information", () => {
    render(
      <ArticleSidebarSticky
        authorName="Jane Smith"
        publishDate="January 10, 2025"
      />
    );
    // Author name may appear multiple times
    const authorElements = screen.getAllByText("Jane Smith");
    expect(authorElements.length).toBeGreaterThan(0);
    // Date may appear multiple times
    const dateElements = screen.getAllByText("January 10, 2025");
    expect(dateElements.length).toBeGreaterThan(0);
  });

  it("renders back navigation link", () => {
    render(
      <ArticleSidebarSticky
        backHref="/blog"
        backText="Back to Articles"
      />
    );
    const backLinks = screen.getAllByText("Back to Articles");
    expect(backLinks.length).toBeGreaterThan(0);
  });

  it("applies custom className", () => {
    const { container } = render(
      <ArticleSidebarSticky className="custom-class" />
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("custom-class");
  });

  it("renders default section styling", () => {
    const { container } = render(<ArticleSidebarSticky />);
    const section = container.querySelector("section");
    expect(section?.className).toContain("py-32");
  });

  it("renders author avatar with fallback", () => {
    render(<ArticleSidebarSticky authorName="Alice Brown" />);
    const fallbacks = screen.getAllByText("A");
    expect(fallbacks.length).toBeGreaterThan(0);
  });

  it("renders article images", () => {
    render(<ArticleSidebarSticky />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders prose content sections", () => {
    render(<ArticleSidebarSticky />);
    expect(screen.getByText("Understanding the Fundamentals")).toBeInTheDocument();
    expect(screen.getByText("The Rise of Component-Based Architecture")).toBeInTheDocument();
    expect(screen.getByText("Performance Optimization")).toBeInTheDocument();
    expect(screen.getByText("Looking Ahead")).toBeInTheDocument();
  });

  it("renders lead paragraph", () => {
    render(<ArticleSidebarSticky />);
    expect(screen.getByText(/In the ever-evolving landscape of web development/)).toBeInTheDocument();
  });

  it("renders blockquote", () => {
    render(<ArticleSidebarSticky />);
    expect(screen.getByText(/The best code is no code at all/)).toBeInTheDocument();
  });

  it("renders grid layout with sidebar", () => {
    const { container } = render(<ArticleSidebarSticky />);
    const gridContainer = container.querySelector(".grid");
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer?.className).toContain("lg:grid-cols-[1fr_minmax(0,2fr)]");
  });

  it("renders with optixFlowConfig", () => {
    const optixConfig = {
      apiKey: "test-api-key",
      compression: 80,
    };
    render(<ArticleSidebarSticky optixFlowConfig={optixConfig} />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders sidebar sticky positioning", () => {
    const { container } = render(<ArticleSidebarSticky />);
    const stickyElement = container.querySelector(".sticky");
    expect(stickyElement).toBeInTheDocument();
  });

  it("renders chevron icon for back navigation", () => {
    render(<ArticleSidebarSticky />);
    const chevronIcons = screen.getAllByTestId("icon-lucide/chevron-left");
    expect(chevronIcons.length).toBeGreaterThan(0);
  });
});

