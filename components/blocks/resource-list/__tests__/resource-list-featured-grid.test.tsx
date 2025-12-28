import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { ResourceListFeaturedGrid } from "../resource-list-featured-grid";

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

vi.mock("../../../ui/avatar", () => ({
  Avatar: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className} data-testid="mock-avatar">{children}</div>
  ),
  AvatarImage: ({ src, alt }: { src: string; alt?: string }) => (
    <img src={src} alt={alt} data-testid="mock-avatar-image" />
  ),
  AvatarFallback: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="mock-avatar-fallback">{children}</span>
  ),
}));

vi.mock("../../../ui/badge", () => ({
  Badge: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span className={className} data-testid="mock-badge">{children}</span>
  ),
}));

vi.mock("../../../ui/tabs", () => ({
  Tabs: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className} data-testid="mock-tabs">{children}</div>
  ),
  TabsList: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className} data-testid="mock-tabs-list">{children}</div>
  ),
  TabsTrigger: ({ children, value }: { children: React.ReactNode; value: string }) => (
    <button data-testid="mock-tabs-trigger" data-value={value}>{children}</button>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
  avatarPlaceholders: Array(20).fill("https://placeholder.com/avatar.jpg"),
}));

describe("ResourceListFeaturedGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<ResourceListFeaturedGrid />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ResourceListFeaturedGrid className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<ResourceListFeaturedGrid />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders with custom title and description", () => {
    const { container } = render(
      <ResourceListFeaturedGrid 
        title="Custom Title" 
        description="Custom Description" 
      />
    );
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders with custom categories", () => {
    const { container } = render(
      <ResourceListFeaturedGrid 
        categories={["All", "Tech", "Design"]}
      />
    );
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders with custom featured article", () => {
    const { container } = render(
      <ResourceListFeaturedGrid 
        featuredArticle={{
          title: "Featured Article",
          imageUrl: "https://example.com/image.jpg",
          date: "Dec 4, 2024",
          authors: ["https://example.com/avatar.jpg"],
          link: "/featured",
          badge: "Featured",
        }}
      />
    );
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders with custom articles", () => {
    const { container } = render(
      <ResourceListFeaturedGrid 
        articles={[
          {
            title: "Test Article",
            category: "Tech",
            date: "Dec 4, 2024",
            author: ["https://example.com/avatar.jpg"],
            link: "/test",
          },
        ]}
      />
    );
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });
});
