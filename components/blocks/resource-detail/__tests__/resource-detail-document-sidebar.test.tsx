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

  it("renders with default props", () => {
    const { container } = render(<ResourceDetailDocumentSidebar />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ResourceDetailDocumentSidebar className="custom-class" />
    );
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<ResourceDetailDocumentSidebar />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-24");
  });

  it("renders breadcrumb navigation", () => {
    const { getAllByTestId } = render(<ResourceDetailDocumentSidebar />);
    const breadcrumb = getAllByTestId("mock-breadcrumb");
    expect(breadcrumb.length).toBeGreaterThan(0);
  });

  it("renders article content area", () => {
    const { container } = render(<ResourceDetailDocumentSidebar />);
    const article = container.querySelector("article");
    expect(article).toBeInTheDocument();
    expect(article).toHaveClass("prose");
  });

  it("renders with custom breadcrumbs", () => {
    const customBreadcrumbs = [
      { label: "Home", href: "/" },
      { label: "Documents", href: "/documents" },
      { label: "Contract", isCurrentPage: true },
    ];
    const { container } = render(
      <ResourceDetailDocumentSidebar breadcrumbs={customBreadcrumbs} />
    );
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders with custom title", () => {
    const { container } = render(
      <ResourceDetailDocumentSidebar title="Custom Document Title" />
    );
    const heading = container.querySelector("h1");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Custom Document Title");
  });

  it("renders grid layout with two columns", () => {
    const { container } = render(<ResourceDetailDocumentSidebar />);
    const gridContainer = container.querySelector(".grid");
    expect(gridContainer).toBeInTheDocument();
  });

  it("renders sticky sidebar", () => {
    const { container } = render(<ResourceDetailDocumentSidebar />);
    const stickySidebar = container.querySelector(".md\\:sticky");
    expect(stickySidebar).toBeInTheDocument();
  });

  it("renders with custom sidebar props", () => {
    const customSidebar = {
      excerptTitle: "Summary",
      excerptDescription: "Custom description",
      downloadButton: {
        text: "Download Now",
        href: "/download",
      },
      reviewer: {
        name: "Jane Doe",
        role: "Reviewer",
        avatarSrc: "https://example.com/avatar.jpg",
      },
      features: [{ text: "Feature 1" }, { text: "Feature 2" }],
    };
    const { container } = render(
      <ResourceDetailDocumentSidebar sidebar={customSidebar} />
    );
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });
});
