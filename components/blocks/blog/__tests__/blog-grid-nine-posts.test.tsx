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

  it("renders with default props", () => {
    render(<BlogGridNinePosts />);
    expect(screen.getByText("Blog")).toBeInTheDocument();
  });

  it("renders custom title and description", () => {
    render(
      <BlogGridNinePosts
        title="Custom Title"
        description="Custom description"
      />
    );
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders default blog posts", () => {
    render(<BlogGridNinePosts />);
    expect(screen.getByText("The Future of Web Development: What's Next in 2024")).toBeInTheDocument();
    expect(screen.getByText("Building Scalable APIs with Modern Architecture Patterns")).toBeInTheDocument();
    expect(screen.getByText("Design Systems: Creating Consistency at Scale")).toBeInTheDocument();
  });

  it("renders author information", () => {
    render(<BlogGridNinePosts />);
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
    expect(screen.getByText("Marcus Rodriguez")).toBeInTheDocument();
    expect(screen.getByText("Emma Thompson")).toBeInTheDocument();
  });

  it("renders publication dates", () => {
    render(<BlogGridNinePosts />);
    expect(screen.getByText("15 Jan 2024")).toBeInTheDocument();
    expect(screen.getByText("12 Jan 2024")).toBeInTheDocument();
    expect(screen.getByText("10 Jan 2024")).toBeInTheDocument();
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

  it("renders category badges", () => {
    render(<BlogGridNinePosts />);
    expect(screen.getByText("Web Development")).toBeInTheDocument();
    expect(screen.getByText("Backend")).toBeInTheDocument();
    expect(screen.getByText("Design")).toBeInTheDocument();
  });

  it("renders CTA button with default text", () => {
    render(<BlogGridNinePosts />);
    expect(screen.getByText("View all posts")).toBeInTheDocument();
  });

  it("renders custom CTA text", () => {
    render(<BlogGridNinePosts ctaText="See More" ctaHref="/more" />);
    expect(screen.getByText("See More")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<BlogGridNinePosts className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<BlogGridNinePosts />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-32");
  });

  it("renders images for posts", () => {
    render(<BlogGridNinePosts />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("handles empty posts array", () => {
    render(<BlogGridNinePosts posts={[]} />);
    expect(screen.getByText("Blog")).toBeInTheDocument();
  });
});

