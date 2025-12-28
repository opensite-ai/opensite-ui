import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BlogGridAuthorCards } from "../blog-grid-author-cards";

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

describe("BlogGridAuthorCards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<BlogGridAuthorCards />);
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText(/Insights, tutorials, and thoughts/)).toBeInTheDocument();
  });

  it("renders custom title and description", () => {
    render(
      <BlogGridAuthorCards
        title="Custom Blog"
        description="Custom description"
      />
    );
    expect(screen.getByText("Custom Blog")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders default blog posts", () => {
    render(<BlogGridAuthorCards />);
    expect(screen.getByText("The Future of Web Development: What's Next in 2024")).toBeInTheDocument();
    expect(screen.getByText("Building Scalable APIs with Modern Architecture Patterns")).toBeInTheDocument();
    expect(screen.getByText("Design Systems: Creating Consistency at Scale")).toBeInTheDocument();
  });

  it("renders author information", () => {
    render(<BlogGridAuthorCards />);
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
    expect(screen.getByText("Marcus Rodriguez")).toBeInTheDocument();
    expect(screen.getByText("Emma Thompson")).toBeInTheDocument();
  });

  it("renders publication dates", () => {
    render(<BlogGridAuthorCards />);
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
        authorInitials: "CA",
        published: "1 Jan 2025",
        href: "/custom",
        image: "/custom.jpg",
      },
    ];

    render(<BlogGridAuthorCards posts={customPosts} />);
    expect(screen.getByText("Custom Post")).toBeInTheDocument();
    expect(screen.getByText("Custom Author")).toBeInTheDocument();
    expect(screen.getByText("Custom Label")).toBeInTheDocument();
  });

  it("renders category badges", () => {
    render(<BlogGridAuthorCards />);
    expect(screen.getByText("Web Development")).toBeInTheDocument();
    expect(screen.getByText("Backend")).toBeInTheDocument();
    expect(screen.getByText("Design")).toBeInTheDocument();
  });

  it("renders view all button with default text", () => {
    render(<BlogGridAuthorCards />);
    expect(screen.getByText("View all posts")).toBeInTheDocument();
  });

  it("renders custom view all text", () => {
    render(<BlogGridAuthorCards viewAllText="See More" viewAllHref="/more" />);
    expect(screen.getByText("See More")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<BlogGridAuthorCards className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<BlogGridAuthorCards />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-32");
  });

  it("renders images for posts", () => {
    render(<BlogGridAuthorCards />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("handles empty posts array", () => {
    render(<BlogGridAuthorCards posts={[]} />);
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("View all posts")).toBeInTheDocument();
  });
});

