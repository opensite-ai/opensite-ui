import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArticleTocSidebar } from "../article-toc-sidebar";
import type { ArticleTocSection } from "../article-toc-sidebar";

// Mock the Img component from @page-speed/img
vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

// Mock the DynamicIcon component
vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    size,
  }: {
    name?: React.ReactNode | string;
    size?: number;
  }) =>
    typeof name === "string" ? (
      <span data-testid={`icon-${name}`} data-size={size} />
    ) : (
      <>{name}</>
    ),
}));

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor() {}
}
window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

describe("ArticleTocSidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockSections: ArticleTocSection[] = [
    { id: "intro", title: "Introduction" },
    { id: "setup", title: "Setup" },
    { id: "usage", title: "Usage" },
    { id: "conclusion", title: "Conclusion" },
  ];

  it("renders custom title and description", () => {
    render(
      <ArticleTocSidebar
        title="Custom Tutorial Title"
        description="Learn how to build amazing things."
      />
    );
    expect(screen.getByText("Custom Tutorial Title")).toBeInTheDocument();
    expect(screen.getByText("Learn how to build amazing things.")).toBeInTheDocument();
  });

  it("renders table of contents sections", () => {
    render(<ArticleTocSidebar title="Test Tutorial" sections={mockSections} />);
    expect(screen.getByText("Table of Contents")).toBeInTheDocument();
    expect(screen.getByText("Setup")).toBeInTheDocument();
    expect(screen.getByText("Usage")).toBeInTheDocument();
  });

  it("renders with empty sections array", () => {
    const { container } = render(<ArticleTocSidebar title="Test Tutorial" sections={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders CTA icon names dynamically and preserves custom icons", () => {
    const leadingIcon = "lucide/file-text";
    const trailingIcon = "lucide/chevron-right";

    render(
      <ArticleTocSidebar
        title="Test Tutorial"
        ctaActions={[
          {
            label: "Read next",
            href: "/next",
            icon: leadingIcon,
            iconAfter: trailingIcon,
          },
          {
            label: "Custom action",
            href: "/custom",
            icon: <span data-testid="custom-leading-icon" />,
            iconAfter: <span data-testid="custom-trailing-icon" />,
          },
        ]}
      />,
    );

    const stringAction = screen.getByText("Read next").closest("button, a");
    expect(stringAction).not.toBeNull();
    expect(stringAction).not.toHaveTextContent(leadingIcon);
    expect(stringAction).not.toHaveTextContent(trailingIcon);
    expect(screen.getByTestId(`icon-${leadingIcon}`)).toBeInTheDocument();
    expect(screen.getByTestId(`icon-${trailingIcon}`)).toBeInTheDocument();
    expect(screen.getByTestId("custom-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-trailing-icon")).toBeInTheDocument();
  });
});
