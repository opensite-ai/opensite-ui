import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BlogMasonryFeatured } from "../blog-masonry-featured";

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

describe("BlogMasonryFeatured", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<BlogMasonryFeatured />);
    expect(screen.getByText("Latest Tech Blog")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<BlogMasonryFeatured heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders default blog posts", () => {
    render(<BlogMasonryFeatured />);
    expect(screen.getByText("The Future of AI: How Machine Learning is Transforming Industries")).toBeInTheDocument();
    expect(screen.getByText("Principles of Minimalist Design: Less is More in Modern UX/UI")).toBeInTheDocument();
    expect(screen.getByText("Remote Work Revolution: How Companies are Adapting to the New Normal")).toBeInTheDocument();
  });

  it("renders author information", () => {
    render(<BlogMasonryFeatured />);
    expect(screen.getByText("Alex Johnson")).toBeInTheDocument();
    expect(screen.getByText("Maya Patel")).toBeInTheDocument();
    expect(screen.getByText("David Chen")).toBeInTheDocument();
  });

  it("renders publication dates", () => {
    render(<BlogMasonryFeatured />);
    expect(screen.getByText("June 15, 2024")).toBeInTheDocument();
    expect(screen.getByText("June 12, 2024")).toBeInTheDocument();
    expect(screen.getByText("June 10, 2024")).toBeInTheDocument();
  });

  it("renders custom posts", () => {
    const customPosts = [
      {
        date: "January 1, 2025",
        author: "Custom Author",
        title: "Custom Post",
        image: "/custom.jpg",
        link: "/custom",
        description: "Custom description",
      },
    ];

    render(<BlogMasonryFeatured posts={customPosts} />);
    expect(screen.getByText("Custom Post")).toBeInTheDocument();
    expect(screen.getByText("Custom Author")).toBeInTheDocument();
    expect(screen.getByText("January 1, 2025")).toBeInTheDocument();
  });

  it("renders featured post description", () => {
    render(<BlogMasonryFeatured />);
    // Only the featured post (first post) renders its description
    expect(screen.getByText(/Explore how artificial intelligence/)).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<BlogMasonryFeatured className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<BlogMasonryFeatured />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-32");
  });

  it("renders images for posts", () => {
    render(<BlogMasonryFeatured />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("handles empty posts array", () => {
    render(<BlogMasonryFeatured posts={[]} />);
    expect(screen.getByText("Latest Tech Blog")).toBeInTheDocument();
  });
});

