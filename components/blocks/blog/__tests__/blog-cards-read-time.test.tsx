import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BlogCardsReadTime } from "../blog-cards-read-time";

// Mock dependencies
vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

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

describe("BlogCardsReadTime", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom badge and heading", () => {
    render(
      <BlogCardsReadTime
        badge="Custom Badge"
        heading="Custom Heading"
        description="Custom description text"
      />
    );
    expect(screen.getByText("Custom Badge")).toBeInTheDocument();
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom posts", () => {
    const customPosts = [
      {
        id: "custom-1",
        title: "Custom Post Title",
        summary: "Custom post summary",
        author: "Custom Author",
        readTime: "5 Min Read",
        href: "/custom-post",
        image: "/custom-image.jpg",
      },
    ];

    render(<BlogCardsReadTime posts={customPosts} />);
    expect(screen.getByText("Custom Post Title")).toBeInTheDocument();
    expect(screen.getByText("Custom post summary")).toBeInTheDocument();
    expect(screen.getByText("Custom Author")).toBeInTheDocument();
    expect(screen.getByText("5 Min Read")).toBeInTheDocument();
  });

  it("handles empty posts array", () => {
    render(<BlogCardsReadTime posts={[]} />);
    expect(screen.getByText("Our Blogs")).toBeInTheDocument();
    // Posts container should be empty when no posts are provided
    const postsContainer = document.querySelector(".grid");
    expect(postsContainer?.children.length ?? 0).toBe(0);
  });
});

