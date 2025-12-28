import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { ResourceListNewsUpdates } from "../resource-list-news-updates";

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

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  avatarPlaceholders: Array(20).fill("https://placeholder.com/avatar.jpg"),
}));

describe("ResourceListNewsUpdates", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<ResourceListNewsUpdates />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ResourceListNewsUpdates className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<ResourceListNewsUpdates />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders with custom section label", () => {
    const { container } = render(
      <ResourceListNewsUpdates 
        sectionLabel="Custom Label"
      />
    );
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders with custom title and subtitle", () => {
    const { container } = render(
      <ResourceListNewsUpdates 
        title="Custom Title"
        subtitle="Custom Subtitle"
      />
    );
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders with custom news items", () => {
    const { container } = render(
      <ResourceListNewsUpdates 
        news={[
          {
            title: "Test News Item",
            category: "Partnership",
            avatar: "https://example.com/avatar.jpg",
            date: "June 15, 2024",
            link: "/news/test",
          },
        ]}
      />
    );
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });
});
