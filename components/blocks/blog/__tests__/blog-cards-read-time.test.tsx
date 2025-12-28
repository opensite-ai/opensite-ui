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

  it("renders with default props", () => {
    render(<BlogCardsReadTime />);
    expect(screen.getByText("Our Blogs")).toBeInTheDocument();
    expect(screen.getByText("Discover the latest trends")).toBeInTheDocument();
    expect(screen.getByText(/Explore our blog for insightful articles/)).toBeInTheDocument();
  });

  it("renders custom tagline and title", () => {
    render(
      <BlogCardsReadTime
        tagline="Custom Tagline"
        title="Custom Title"
        description="Custom description text"
      />
    );
    expect(screen.getByText("Custom Tagline")).toBeInTheDocument();
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders default blog posts", () => {
    render(<BlogCardsReadTime />);
    expect(screen.getByText("How to build a successful brand and business online in 2024")).toBeInTheDocument();
    expect(screen.getByText("The difference between UI and UX and how to design for both")).toBeInTheDocument();
    expect(screen.getByText("Optimizing your website for SEO and getting more traffic")).toBeInTheDocument();
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

  it("renders author information with avatar", () => {
    render(<BlogCardsReadTime />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("renders read time badges", () => {
    render(<BlogCardsReadTime />);
    expect(screen.getByText("10 Min Read")).toBeInTheDocument();
    expect(screen.getByText("14 Min Read")).toBeInTheDocument();
    expect(screen.getByText("9 Min Read")).toBeInTheDocument();
  });

  it("renders view all button with default text", () => {
    render(<BlogCardsReadTime />);
    expect(screen.getByText("View All Blogs")).toBeInTheDocument();
  });

  it("renders custom view all button text", () => {
    render(<BlogCardsReadTime viewAllText="See More Posts" viewAllHref="/all-posts" />);
    expect(screen.getByText("See More Posts")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<BlogCardsReadTime className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<BlogCardsReadTime />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-32");
  });

  it("renders images for each post", () => {
    render(<BlogCardsReadTime />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders clickable post cards", () => {
    const { container } = render(<BlogCardsReadTime />);
    // Posts are wrapped in Pressable components which render as anchor tags
    const links = container.querySelectorAll("a");
    expect(links.length).toBeGreaterThan(0);
  });

  it("handles empty posts array", () => {
    render(<BlogCardsReadTime posts={[]} />);
    expect(screen.getByText("Our Blogs")).toBeInTheDocument();
    expect(screen.getByText("View All Blogs")).toBeInTheDocument();
  });
});

