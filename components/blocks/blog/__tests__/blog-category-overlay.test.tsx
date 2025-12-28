import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BlogCategoryOverlay } from "../blog-category-overlay";

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

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, size }: { name: string; size: number }) => (
    <span data-testid="mock-icon" data-name={name} data-size={size}>icon</span>
  ),
}));

describe("BlogCategoryOverlay", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<BlogCategoryOverlay />);
    expect(screen.getByText("Articles")).toBeInTheDocument();
    expect(screen.getByText("Discover the latest trends")).toBeInTheDocument();
  });

  it("renders custom badge and heading", () => {
    render(
      <BlogCategoryOverlay
        badge="Custom Badge"
        heading="Custom Heading"
        description="Custom description"
      />
    );
    expect(screen.getByText("Custom Badge")).toBeInTheDocument();
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders default blog posts with categories", () => {
    render(<BlogCategoryOverlay />);
    expect(screen.getByText("How to build a successful brand and business")).toBeInTheDocument();
    expect(screen.getByText("Business")).toBeInTheDocument();
    expect(screen.getByText("The difference between UI and UX")).toBeInTheDocument();
    expect(screen.getByText("Design")).toBeInTheDocument();
  });

  it("renders custom posts", () => {
    const customPosts = [
      {
        id: "custom-1",
        title: "Custom Post",
        category: "Custom Category",
        date: "January 1, 2025",
        href: "/custom",
        image: "/custom.jpg",
      },
    ];

    render(<BlogCategoryOverlay posts={customPosts} />);
    expect(screen.getByText("Custom Post")).toBeInTheDocument();
    expect(screen.getByText("Custom Category")).toBeInTheDocument();
    expect(screen.getByText("January 1, 2025")).toBeInTheDocument();
  });

  it("renders dates for each post", () => {
    render(<BlogCategoryOverlay />);
    expect(screen.getByText("September, 23, 2024")).toBeInTheDocument();
    expect(screen.getByText("April, 07, 2024")).toBeInTheDocument();
  });

  it("renders view all button with default text", () => {
    render(<BlogCategoryOverlay />);
    expect(screen.getByText("View All Blogs")).toBeInTheDocument();
  });

  it("renders custom view all button text", () => {
    render(<BlogCategoryOverlay viewAllAction={{ label: "See More", href: "/more" }} />);
    expect(screen.getByText("See More")).toBeInTheDocument();
  });

  it("renders read more links for each post", () => {
    render(<BlogCategoryOverlay />);
    const readMoreLinks = screen.getAllByText("Read more");
    expect(readMoreLinks.length).toBeGreaterThan(0);
  });

  it("applies custom className", () => {
    const { container } = render(<BlogCategoryOverlay className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<BlogCategoryOverlay />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-32");
  });

  it("renders images for each post", () => {
    render(<BlogCategoryOverlay />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("handles empty posts array", () => {
    render(<BlogCategoryOverlay posts={[]} />);
    expect(screen.getByText("Articles")).toBeInTheDocument();
    expect(screen.getByText("View All Blogs")).toBeInTheDocument();
  });
});

