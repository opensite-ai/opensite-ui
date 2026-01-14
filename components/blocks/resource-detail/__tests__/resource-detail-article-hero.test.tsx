import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ResourceDetailArticleHero } from "../resource-detail-article-hero";

vi.mock("@page-speed/img", () => ({
  Img: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => (
    <img
      src={src}
      alt={alt}
      className={className}
      data-testid="mock-img"
    />
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    size,
    className,
  }: {
    name: string;
    size?: number;
    className?: string;
  }) => (
    <span
      data-testid="mock-dynamic-icon"
      data-name={name}
      data-size={size}
      className={className}
    />
  ),
}));

vi.mock("../../../ui/avatar", () => ({
  Avatar: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div className={className} data-testid="mock-avatar">
      {children}
    </div>
  ),
  AvatarImage: ({ src, alt }: { src: string; alt?: string }) => (
    <img src={src} alt={alt} data-testid="mock-avatar-image" />
  ),
  AvatarFallback: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="mock-avatar-fallback">{children}</span>
  ),
}));

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href?: string;
    className?: string;
  }) => (
    <a href={href} className={className} data-testid="mock-pressable">
      {children}
    </a>
  ),
}));

vi.mock("../../../../lib/blockBrandedIconsAndPlaceholders", () => ({
  blockBrandedIconsAndPlaceholders: {
    avatar1: "https://placeholder.com/avatar1.jpg",
    placeholder2: "https://placeholder.com/placeholder2.jpg",
  },
}));

describe("ResourceDetailArticleHero", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders blog title", () => {
    render(<ResourceDetailArticleHero blog={{ title: "Building Sustainable Web Apps" }} />);
    expect(screen.getByText("Building Sustainable Web Apps")).toBeInTheDocument();
  });

  it("renders blog author", () => {
    render(<ResourceDetailArticleHero blog={{ author: "Sarah Chen" }} />);
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
  });

  it("renders blog date and read time", () => {
    render(<ResourceDetailArticleHero blog={{ date: "December 15, 2024", readTime: "8 min read" }} />);
    expect(screen.getByText(/December 15, 2024/)).toBeInTheDocument();
    expect(screen.getByText(/8 min read/)).toBeInTheDocument();
  });

  it("renders navigation back link", () => {
    render(<ResourceDetailArticleHero navigation={{ backText: "All Articles", backHref: "/blog" }} />);
    expect(screen.getByText("All Articles")).toBeInTheDocument();
  });

  it("renders share heading", () => {
    render(<ResourceDetailArticleHero shareHeading="Share this article" />);
    expect(screen.getAllByText("Share this article").length).toBeGreaterThan(0);
  });

  it("applies custom className", () => {
    const { container } = render(
      <ResourceDetailArticleHero
        className="custom-class"
        blog={{ title: "Test Article" }}
      />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
