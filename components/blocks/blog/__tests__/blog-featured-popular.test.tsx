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

  it("renders with default props", () => {
    render(<BlogFeaturedPopular />);
    expect(screen.getByText("Insights and Trends Blog")).toBeInTheDocument();
    expect(screen.getByText(/Stay updated with the latest insights/)).toBeInTheDocument();
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

  it("renders featured post (first post)", () => {
    render(<BlogFeaturedPopular />);
    expect(screen.getByText("Exploring the Future of AI in Modern Technology Trends")).toBeInTheDocument();
    expect(screen.getByText("Technology")).toBeInTheDocument();
  });

  it("renders popular posts section", () => {
    render(<BlogFeaturedPopular />);
    expect(screen.getByText("Popular Posts")).toBeInTheDocument();
    expect(screen.getByText("Strategies for Effective Business Growth in 2025")).toBeInTheDocument();
    expect(screen.getByText("Top Wellness Trends to Improve Your Health in 2025")).toBeInTheDocument();
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

  it("renders custom popular heading", () => {
    render(<BlogFeaturedPopular popularHeading="Trending Now" />);
    expect(screen.getByText("Trending Now")).toBeInTheDocument();
  });

  it("renders category badges", () => {
    render(<BlogFeaturedPopular />);
    expect(screen.getByText("Technology")).toBeInTheDocument();
    expect(screen.getByText("Business")).toBeInTheDocument();
    expect(screen.getByText("Health & Wellness")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<BlogFeaturedPopular className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<BlogFeaturedPopular />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-32");
  });

  it("renders images for posts", () => {
    render(<BlogFeaturedPopular />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("handles empty posts array", () => {
    render(<BlogFeaturedPopular posts={[]} />);
    expect(screen.getByText("Insights and Trends Blog")).toBeInTheDocument();
    expect(screen.getByText("Popular Posts")).toBeInTheDocument();
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

