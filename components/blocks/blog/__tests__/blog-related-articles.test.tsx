import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BlogRelatedArticles } from "../blog-related-articles";

// Mock dependencies
vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className, asButton }: { children: React.ReactNode; href?: string; className?: string; asButton?: boolean }) => (
    asButton ? (
      <button className={className} data-testid="mock-pressable">{children}</button>
    ) : (
      <a href={href} className={className} data-testid="mock-pressable">{children}</a>
    )
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, size }: { name: string; size: number }) => (
    <span data-testid="mock-icon" data-name={name} data-size={size}>icon</span>
  ),
}));

describe("BlogRelatedArticles", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<BlogRelatedArticles />);
    expect(screen.getByText("Related articles")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(
      <BlogRelatedArticles
        heading="Custom Heading"
      />
    );
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders default related articles", () => {
    render(<BlogRelatedArticles />);
    expect(screen.getByText("Getting Started with Modern Web Development")).toBeInTheDocument();
    expect(screen.getByText("Understanding Frontend Design Principles")).toBeInTheDocument();
    expect(screen.getByText("Backend Development Fundamentals Guide")).toBeInTheDocument();
  });

  it("renders article descriptions", () => {
    render(<BlogRelatedArticles />);
    expect(screen.getByText(/Discover the essential tools and frameworks/)).toBeInTheDocument();
    expect(screen.getByText(/Explore fundamental principles of frontend design/)).toBeInTheDocument();
  });

  it("renders publication dates", () => {
    render(<BlogRelatedArticles />);
    expect(screen.getByText("March 15, 2024")).toBeInTheDocument();
    expect(screen.getByText("March 12, 2024")).toBeInTheDocument();
    expect(screen.getByText("March 8, 2024")).toBeInTheDocument();
  });

  it("renders custom articles", () => {
    const customArticles = [
      {
        id: 1,
        title: "Custom Article",
        description: "Custom description",
        date: "January 1, 2025",
        category: "Custom Category",
        link: "/custom",
      },
    ];

    render(<BlogRelatedArticles articles={customArticles} />);
    expect(screen.getByText("Custom Article")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
    expect(screen.getByText("Custom Category")).toBeInTheDocument();
  });

  it("renders category badges", () => {
    render(<BlogRelatedArticles />);
    expect(screen.getByText("Web Development")).toBeInTheDocument();
    expect(screen.getAllByText("Frontend").length).toBeGreaterThan(0);
    expect(screen.getByText("Backend")).toBeInTheDocument();
  });

  it("renders see all button with default text", () => {
    render(<BlogRelatedArticles />);
    expect(screen.getByText("See all articles")).toBeInTheDocument();
  });

  it("renders custom see all text", () => {
    render(<BlogRelatedArticles seeAllAction={{ label: "See More", href: "/more" }} />);
    expect(screen.getByText("See More")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<BlogRelatedArticles className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<BlogRelatedArticles />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-32");
  });

  it("renders clickable article links", () => {
    const { container } = render(<BlogRelatedArticles />);
    // Articles are wrapped in Pressable components which render as anchor tags or buttons
    const links = container.querySelectorAll("a");
    expect(links.length).toBeGreaterThan(0);
  });

  it("handles empty articles array", () => {
    render(<BlogRelatedArticles articles={[]} />);
    expect(screen.getByText("Related articles")).toBeInTheDocument();
    expect(screen.getByText("See all articles")).toBeInTheDocument();
  });
});

