import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BlogFeaturedPopular } from "../blog-featured-popular";

// Mock dependencies
vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

describe("BlogFeaturedPopular", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom heading and description", () => {
    render(
      <BlogFeaturedPopular
        heading="Custom Blog Heading"
        description="Custom blog description"
      />
    );
    expect(screen.getByText("Custom Blog Heading")).toBeInTheDocument();
    expect(screen.getByText("Custom blog description")).toBeInTheDocument();
  });

  it("renders custom posts", () => {
    const customPosts = [
      {
        title: "Featured Post",
        category: "Featured Category",
        description: "Featured description",
        image: "/featured.jpg",
      },
      {
        title: "Popular Post 1",
        category: "Category 1",
        description: "Popular description 1",
        image: "/popular1.jpg",
      },
    ];

    render(<BlogFeaturedPopular posts={customPosts} />);
    expect(screen.getByText("Featured Post")).toBeInTheDocument();
    expect(screen.getByText("Popular Post 1")).toBeInTheDocument();
  });

  it("handles empty posts array", () => {
    render(
      <BlogFeaturedPopular
        heading="Test Heading"
        description="Test Description"
        posts={[]}
      />
    );
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("handles single post (featured only)", () => {
    const singlePost = [
      {
        title: "Only Featured",
        category: "Solo",
        description: "Only featured post",
        image: "/solo.jpg",
      },
    ];

    render(<BlogFeaturedPopular posts={singlePost} />);
    expect(screen.getByText("Only Featured")).toBeInTheDocument();
  });
});

