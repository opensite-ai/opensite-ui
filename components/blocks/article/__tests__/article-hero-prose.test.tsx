import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArticleHeroProse } from "../article-hero-prose";
import type { ArticleHeroProsePost } from "../article-hero-prose";

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

// Mock date-fns format function
vi.mock("date-fns", () => ({
  format: (date: Date, formatStr: string) => {
    // Return format matching "MMMM d, yyyy" pattern
    const month = date.toLocaleString("en-US", { month: "long" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  },
}));

describe("ArticleHeroProse", () => {
  const mockPost: ArticleHeroProsePost = {
    title: "Test Article Title",
    authorName: "Jane Doe",
    image: "https://example.com/image.jpg",
    pubDate: new Date("2024-03-15"),
    description: "This is a test article description.",
    authorImage: "https://example.com/avatar.jpg",
  };

  it("renders with default props", () => {
    const { container } = render(<ArticleHeroProse post={mockPost} />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders post title", () => {
    render(<ArticleHeroProse post={mockPost} />);
    expect(screen.getByText("Test Article Title")).toBeInTheDocument();
  });

  it("renders post description", () => {
    render(<ArticleHeroProse post={mockPost} />);
    expect(screen.getByText("This is a test article description.")).toBeInTheDocument();
  });

  it("renders author name", () => {
    render(<ArticleHeroProse post={mockPost} />);
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  it("renders formatted date", () => {
    render(<ArticleHeroProse post={mockPost} />);
    // Check for the date text (may vary by timezone, so check for March and 2024)
    expect(screen.getByText(/on March \d+, 2024/)).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ArticleHeroProse post={mockPost} className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});

