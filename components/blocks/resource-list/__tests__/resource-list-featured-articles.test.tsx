import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { ResourceListFeaturedArticles } from "../resource-list-featured-articles";

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

vi.mock("../../../ui/badge", () => ({
  Badge: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span className={className} data-testid="mock-badge">{children}</span>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("ResourceListFeaturedArticles", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<ResourceListFeaturedArticles />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ResourceListFeaturedArticles className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<ResourceListFeaturedArticles />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders with custom featured post", () => {
    const { container } = render(
      <ResourceListFeaturedArticles 
        featuredPost={{
          title: "Featured Post Title",
          imageUrl: "https://example.com/image.jpg",
          link: "/featured",
        }}
      />
    );
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders with custom badge and button text", () => {
    const { container } = render(
      <ResourceListFeaturedArticles 
        featuredBadgeText="Custom Badge"
        featuredButtonText="Custom Button"
      />
    );
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders with custom articles title", () => {
    const { container } = render(
      <ResourceListFeaturedArticles 
        articlesTitle="Custom Articles Title"
      />
    );
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders with custom articles", () => {
    const { container } = render(
      <ResourceListFeaturedArticles 
        articles={[
          {
            date: "Jan 02, 2025",
            category: "Tech",
            title: "Test Article",
            link: "/test",
          },
        ]}
      />
    );
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });
});
