import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BlogFilteredResults } from "../blog-filtered-results";

// Mock dependencies
vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className, onClick, asButton }: { children: React.ReactNode; href?: string; className?: string; onClick?: () => void; asButton?: boolean }) => (
    <a href={href} className={className} onClick={onClick} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, size }: { name: string; size: number }) => (
    <span data-testid="mock-icon" data-name={name} data-size={size}>icon</span>
  ),
}));

describe("BlogFilteredResults", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<BlogFilteredResults />);
    expect(screen.getByText("Best Blog Articles")).toBeInTheDocument();
    expect(screen.getByText("All Blogs")).toBeInTheDocument();
  });

  it("renders custom title and description", () => {
    render(
      <BlogFilteredResults
        title="Custom Title"
        description="Custom description"
      />
    );
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders breadcrumb navigation", () => {
    render(<BlogFilteredResults />);
    expect(screen.getByText("Resources")).toBeInTheDocument();
    expect(screen.getByText("Blogs")).toBeInTheDocument();
  });

  it("renders custom breadcrumbs", () => {
    const customBreadcrumb = [
      { label: "Home", link: "/" },
      { label: "Articles", link: "/articles" },
    ];

    render(<BlogFilteredResults breadcrumb={customBreadcrumb} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Articles")).toBeInTheDocument();
  });

  it("renders primary post", () => {
    render(<BlogFilteredResults />);
    expect(screen.getByText("How AI is Transforming Frontend Development")).toBeInTheDocument();
  });

  it("renders filter categories", () => {
    render(<BlogFilteredResults />);
    // Categories may appear multiple times (in filter and in posts)
    expect(screen.getAllByText("All").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Productivity").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Accessibility").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Performance").length).toBeGreaterThan(0);
  });

  it("renders blog posts grid", () => {
    render(<BlogFilteredResults />);
    expect(screen.getByText("5 VS Code Extensions That Will Save You Hours")).toBeInTheDocument();
    expect(screen.getByText("Time Management for Developers: What Really Works")).toBeInTheDocument();
  });

  it("renders load more button when there are more posts", () => {
    render(<BlogFilteredResults postsPerPage={2} />);
    expect(screen.getByText("Load More")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<BlogFilteredResults className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<BlogFilteredResults />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("pb-32");
  });

  it("renders images for posts", () => {
    render(<BlogFilteredResults />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders custom all blogs title", () => {
    render(<BlogFilteredResults allBlogsTitle="All Articles" />);
    expect(screen.getByText("All Articles")).toBeInTheDocument();
  });

  it("renders custom load more text", () => {
    render(<BlogFilteredResults loadMoreText="Show More" postsPerPage={2} />);
    expect(screen.getByText("Show More")).toBeInTheDocument();
  });

  it("handles empty posts array", () => {
    render(<BlogFilteredResults posts={[]} />);
    expect(screen.getByText("Best Blog Articles")).toBeInTheDocument();
    expect(screen.getByText("All Blogs")).toBeInTheDocument();
  });
});

