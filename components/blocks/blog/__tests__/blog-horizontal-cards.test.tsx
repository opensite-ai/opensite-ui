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

  it("renders custom badge, heading, and description", () => {
    render(
      <BlogHorizontalCards
        badge="Custom Badge"
        heading="Custom Heading"
        description="Custom description"
      />
    );
    expect(screen.getByText("Custom Badge")).toBeInTheDocument();
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
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

  it("handles empty posts array", () => {
    render(
      <BlogHorizontalCards
        badge="Test Badge"
        heading="Test Heading"
        description="Test Description"
        posts={[]}
      />
    );
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    // Posts container should be empty when no posts are provided
    const postsContainer = document.querySelector(".space-y-12");
    expect(postsContainer?.children.length ?? 0).toBe(0);
  });

  it("renders without any props (all optional)", () => {
    render(<BlogHorizontalCards />);
    // Component should render without errors even with no props
    const section = document.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders with CTA action", () => {
    const ctaAction = {
      label: "View All",
      href: "/blog",
    };

    render(<BlogHorizontalCards ctaAction={ctaAction} />);
    expect(screen.getByText("View All")).toBeInTheDocument();
  });

  it("renders custom CTA slot instead of ctaAction", () => {
    const ctaAction = {
      label: "View All",
      href: "/blog",
    };

    render(
      <BlogHorizontalCards
        ctaAction={ctaAction}
        ctaSlot={<button>Custom CTA</button>}
      />
    );
    expect(screen.getByText("Custom CTA")).toBeInTheDocument();
    expect(screen.queryByText("View All")).not.toBeInTheDocument();
  });

  it("renders custom postsSlot instead of posts array", () => {
    const posts = [
      {
        id: "1",
        title: "Regular Post",
        href: "/post",
      },
    ];

    render(
      <BlogHorizontalCards
        posts={posts}
        postsSlot={<div>Custom Posts Content</div>}
      />
    );
    expect(screen.getByText("Custom Posts Content")).toBeInTheDocument();
    expect(screen.queryByText("Regular Post")).not.toBeInTheDocument();
  });

  it("conditionally renders readMoreText link", () => {
    const posts = [
      {
        id: "1",
        title: "Test Post",
        href: "/post",
      },
    ];

    const { rerender } = render(
      <BlogHorizontalCards posts={posts} readMoreText="Learn More" />
    );
    expect(screen.getByText("Learn More")).toBeInTheDocument();

    // Without readMoreText, the link should not render
    rerender(<BlogHorizontalCards posts={posts} />);
    expect(screen.queryByText("Learn More")).not.toBeInTheDocument();
  });

  it("handles posts without images", () => {
    const posts = [
      {
        id: "1",
        title: "Text Only Post",
        summary: "No image here",
        href: "/post",
      },
    ];

    render(<BlogHorizontalCards posts={posts} />);
    expect(screen.getByText("Text Only Post")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-img")).not.toBeInTheDocument();
  });
});

