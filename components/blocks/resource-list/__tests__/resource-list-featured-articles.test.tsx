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
