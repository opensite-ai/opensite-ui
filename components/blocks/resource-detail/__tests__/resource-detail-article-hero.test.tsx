import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
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

  it("renders with default props", () => {
    const { container } = render(<ResourceDetailArticleHero />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ResourceDetailArticleHero className="custom-class" />
    );
    // className is applied to the outer div wrapper, not the section
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("custom-class");
  });

  it("renders hero section with dark background", () => {
    const { container } = render(<ResourceDetailArticleHero />);
    const heroSection = container.querySelector(".bg-primary");
    expect(heroSection).toBeInTheDocument();
  });

  it("renders prose content area", () => {
    const { container } = render(<ResourceDetailArticleHero />);
    const prose = container.querySelector(".prose");
    expect(prose).toBeInTheDocument();
  });

  it("renders with custom navigation props", () => {
    const customNavigation = {
      backText: "Back to Blog",
      backHref: "/blog",
    };
    const { container } = render(
      <ResourceDetailArticleHero navigation={customNavigation} />
    );
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders with custom blog props", () => {
    const customBlog = {
      title: "Custom Article Title",
      author: "Jane Smith",
      date: "January 1, 2025",
      readTime: "5 min read",
      role: "Product Manager",
    };
    const { container } = render(
      <ResourceDetailArticleHero blog={customBlog} />
    );
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders author bio section at bottom", () => {
    const { container } = render(<ResourceDetailArticleHero />);
    const borderSection = container.querySelector(".border-t");
    expect(borderSection).toBeInTheDocument();
  });

  it("renders grid layout in hero", () => {
    const { container } = render(<ResourceDetailArticleHero />);
    const gridContainer = container.querySelector(".grid");
    expect(gridContainer).toBeInTheDocument();
  });
});
