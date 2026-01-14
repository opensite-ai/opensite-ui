import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { ResourceDetailDocumentSidebar } from "../resource-detail-document-sidebar";

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
}));

vi.mock("../../../ui/breadcrumb", () => ({
  Breadcrumb: ({ children }: { children: React.ReactNode }) => (
    <nav data-testid="mock-breadcrumb">{children}</nav>
  ),
  BreadcrumbList: ({ children }: { children: React.ReactNode }) => (
    <ol data-testid="mock-breadcrumb-list">{children}</ol>
  ),
  BreadcrumbItem: ({ children }: { children: React.ReactNode }) => (
    <li data-testid="mock-breadcrumb-item">{children}</li>
  ),
  BreadcrumbLink: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href?: string;
  }) => (
    <a href={href} data-testid="mock-breadcrumb-link">
      {children}
    </a>
  ),
  BreadcrumbPage: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="mock-breadcrumb-page">{children}</span>
  ),
  BreadcrumbSeparator: () => (
    <span data-testid="mock-breadcrumb-separator">/</span>
  ),
}));

vi.mock("../../../ui/separator", () => ({
  Separator: ({ className }: { className?: string }) => (
    <hr className={className} data-testid="mock-separator" />
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

vi.mock("../../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

vi.mock("../../../../lib/blockBrandedIconsAndPlaceholders", () => ({
  blockBrandedIconsAndPlaceholders: {
    avatar1: "https://placeholder.com/avatar1.jpg",
  },
}));

describe("ResourceDetailDocumentSidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with custom title", () => {
    const { container } = render(
      <ResourceDetailDocumentSidebar title="Custom Document Title" />
    );
    const heading = container.querySelector("h1");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Custom Document Title");
  });
});
