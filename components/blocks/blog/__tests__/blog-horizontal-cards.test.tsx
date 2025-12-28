import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BlogHorizontalCards } from "../blog-horizontal-cards";

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

describe("BlogHorizontalCards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<BlogHorizontalCards />);
    expect(screen.getByText("Latest Updates")).toBeInTheDocument();
    expect(screen.getByText("Blog Posts")).toBeInTheDocument();
    expect(screen.getByText(/Discover the latest trends/)).toBeInTheDocument();
  });

  it("renders custom tagline, heading, and description", () => {
    render(
      <BlogHorizontalCards
        tagline="Custom Tagline"
        heading="Custom Heading"
        description="Custom description"
      />
    );
    expect(screen.getByText("Custom Tagline")).toBeInTheDocument();
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders default blog posts", () => {
    render(<BlogHorizontalCards />);
    expect(screen.getByText("Getting Started with Opensite AI Components")).toBeInTheDocument();
    expect(screen.getByText("Building Accessible Web Applications")).toBeInTheDocument();
    expect(screen.getByText("Modern Design Systems with Tailwind CSS")).toBeInTheDocument();
  });

  it("renders author information", () => {
    render(<BlogHorizontalCards />);
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
    expect(screen.getByText("Marcus Rodriguez")).toBeInTheDocument();
    expect(screen.getByText("Emma Thompson")).toBeInTheDocument();
  });

  it("renders publication dates", () => {
    render(<BlogHorizontalCards />);
    const dates = screen.getAllByText("1 Jan 2024");
    expect(dates.length).toBeGreaterThan(0);
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
        url: "/custom",
        image: "/custom.jpg",
      },
    ];

    render(<BlogHorizontalCards posts={customPosts} />);
    expect(screen.getByText("Custom Post")).toBeInTheDocument();
    expect(screen.getByText("Custom Author")).toBeInTheDocument();
    expect(screen.getByText("Custom Label")).toBeInTheDocument();
  });

  it("renders category badges", () => {
    render(<BlogHorizontalCards />);
    expect(screen.getByText("Tutorial")).toBeInTheDocument();
    expect(screen.getByText("Accessibility")).toBeInTheDocument();
    expect(screen.getByText("Design Systems")).toBeInTheDocument();
  });

  it("renders view all button with default text", () => {
    render(<BlogHorizontalCards />);
    expect(screen.getByText("View all articles")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<BlogHorizontalCards buttonText="See More" buttonUrl="/more" />);
    expect(screen.getByText("See More")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<BlogHorizontalCards className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<BlogHorizontalCards />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-32");
  });

  it("renders images for posts", () => {
    render(<BlogHorizontalCards />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("handles empty posts array", () => {
    render(<BlogHorizontalCards posts={[]} />);
    expect(screen.getByText("Latest Updates")).toBeInTheDocument();
    expect(screen.getByText("View all articles")).toBeInTheDocument();
  });
});

