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

  it("renders with default props", () => {
    render(<BlogHorizontalTimeline />);
    expect(screen.getByText("Discover Our Fresh Content")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<BlogHorizontalTimeline heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders default blog posts", () => {
    render(<BlogHorizontalTimeline />);
    expect(screen.getByText("The Future of Web Development")).toBeInTheDocument();
    expect(screen.getByText("Mastering React Performance Optimization")).toBeInTheDocument();
    expect(screen.getByText("UI/UX Design Principles for 2025")).toBeInTheDocument();
  });

  it("renders post dates", () => {
    render(<BlogHorizontalTimeline />);
    expect(screen.getByText("3rd Dec 2024")).toBeInTheDocument();
    expect(screen.getByText("5th Dec 2024")).toBeInTheDocument();
    expect(screen.getByText("10th Dec 2024")).toBeInTheDocument();
  });

  it("renders post descriptions", () => {
    render(<BlogHorizontalTimeline />);
    expect(screen.getByText(/Exploring the latest trends in frontend/)).toBeInTheDocument();
    expect(screen.getByText(/A deep dive into memoization/)).toBeInTheDocument();
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

  it("renders read button with default text", () => {
    render(<BlogHorizontalTimeline />);
    const readButtons = screen.getAllByText("Read");
    expect(readButtons.length).toBeGreaterThan(0);
  });

  it("renders custom read text", () => {
    render(<BlogHorizontalTimeline readText="Learn More" />);
    const readButtons = screen.getAllByText("Learn More");
    expect(readButtons.length).toBeGreaterThan(0);
  });

  it("applies custom className", () => {
    const { container } = render(<BlogHorizontalTimeline className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<BlogHorizontalTimeline />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-32");
  });

  it("renders images for posts", () => {
    render(<BlogHorizontalTimeline />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("handles empty posts array", () => {
    render(<BlogHorizontalTimeline posts={[]} />);
    expect(screen.getByText("Discover Our Fresh Content")).toBeInTheDocument();
  });
});

