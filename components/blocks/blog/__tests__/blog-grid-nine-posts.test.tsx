import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BlogGridNinePosts } from "../blog-grid-nine-posts";

// Mock dependencies
vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

describe("BlogGridNinePosts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom heading and description", () => {
    render(
      <BlogGridNinePosts
        heading="Custom Heading"
        description="Custom description"
      />
    );
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders custom posts", () => {
    const customPosts = [
      {
        id: "custom-1",
        title: "Custom Post",
        summary: "Custom summary",
        label: "Custom Label",
        author: "Custom Author",
        published: "1 Jan 2025",
        href: "/custom",
        image: "/custom.jpg",
      },
    ];

    render(<BlogGridNinePosts posts={customPosts} />);
    expect(screen.getByText("Custom Post")).toBeInTheDocument();
    expect(screen.getByText("Custom Author")).toBeInTheDocument();
    expect(screen.getByText("Custom Label")).toBeInTheDocument();
  });

  it("handles empty posts array", () => {
    render(<BlogGridNinePosts posts={[]} />);
    expect(screen.getByText("Blog")).toBeInTheDocument();
  });
});

