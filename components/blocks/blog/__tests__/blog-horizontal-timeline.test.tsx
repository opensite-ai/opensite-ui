import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BlogHorizontalTimeline } from "../blog-horizontal-timeline";

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

describe("BlogHorizontalTimeline", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom heading", () => {
    render(<BlogHorizontalTimeline heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom posts", () => {
    const customPosts = [
      {
        id: 1,
        title: "Custom Post",
        date: "1st Jan 2025",
        description: "Custom description",
        image: "/custom.jpg",
        imageAlt: "Custom image",
        href: "/custom",
      },
    ];

    render(<BlogHorizontalTimeline posts={customPosts} />);
    expect(screen.getByText("Custom Post")).toBeInTheDocument();
    expect(screen.getByText("1st Jan 2025")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("handles empty posts array", () => {
    render(<BlogHorizontalTimeline posts={[]} />);
    expect(screen.getByText("Discover Our Fresh Content")).toBeInTheDocument();
  });
});

