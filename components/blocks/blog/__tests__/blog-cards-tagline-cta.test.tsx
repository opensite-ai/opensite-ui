import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BlogCardsTaglineCta } from "../blog-cards-tagline-cta";

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

describe("BlogCardsTaglineCta", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<BlogCardsTaglineCta />);
    expect(screen.getByText("Latest Updates")).toBeInTheDocument();
    expect(screen.getByText("Blog Posts")).toBeInTheDocument();
  });

  it("renders custom badge and heading", () => {
    render(
      <BlogCardsTaglineCta
        badge="Custom Badge"
        heading="Custom Heading"
        description="Custom description"
      />
    );
    expect(screen.getByText("Custom Badge")).toBeInTheDocument();
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders default blog posts", () => {
    render(<BlogCardsTaglineCta />);
    expect(screen.getByText("Getting Started with Opensite AI Components")).toBeInTheDocument();
    expect(screen.getByText("Building Accessible Web Applications")).toBeInTheDocument();
    expect(screen.getByText("Modern Design Systems with Tailwind CSS")).toBeInTheDocument();
  });

  it("renders custom posts", () => {
    const customPosts = [
      {
        id: "custom-1",
        title: "Custom Post",
        summary: "Custom summary",
        label: "Custom Label",
        author: "Custom Author",
        published: "15 Jan 2025",
        url: "/custom",
        image: "/custom.jpg",
      },
    ];

    render(<BlogCardsTaglineCta posts={customPosts} />);
    expect(screen.getByText("Custom Post")).toBeInTheDocument();
    expect(screen.getByText("Custom summary")).toBeInTheDocument();
    // Note: label is not rendered in the component
  });

  it("renders view all button with default text", () => {
    render(<BlogCardsTaglineCta />);
    expect(screen.getByText("View all articles")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<BlogCardsTaglineCta ctaAction={{ label: "See All Posts", href: "/posts" }} />);
    expect(screen.getByText("See All Posts")).toBeInTheDocument();
  });

  it("renders read more links for each post", () => {
    render(<BlogCardsTaglineCta />);
    const readMoreLinks = screen.getAllByText("Read more");
    expect(readMoreLinks.length).toBeGreaterThan(0);
  });

  it("applies custom className", () => {
    const { container } = render(<BlogCardsTaglineCta className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<BlogCardsTaglineCta />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-32");
  });

  it("renders images for each post", () => {
    render(<BlogCardsTaglineCta />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("handles empty posts array", () => {
    render(<BlogCardsTaglineCta posts={[]} />);
    expect(screen.getByText("Latest Updates")).toBeInTheDocument();
    expect(screen.getByText("View all articles")).toBeInTheDocument();
  });
});

