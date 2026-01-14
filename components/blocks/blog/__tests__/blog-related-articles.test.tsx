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

  it("renders custom heading", () => {
    render(
      <BlogRelatedArticles
        heading="Custom Heading"
      />
    );
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
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

  it("handles empty articles array", () => {
    render(<BlogRelatedArticles articles={[]} />);
    expect(screen.getByText("Related articles")).toBeInTheDocument();
    // Articles container should be empty when no articles are provided
    const articlesContainer = document.querySelector(".grid");
    expect(articlesContainer?.children.length ?? 0).toBe(0);
  });
});

