import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { ResourceDetailWhitepaperSidebar } from "../resource-detail-whitepaper-sidebar";

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
    integration1: "https://placeholder.com/integration1.svg",
    integration2: "https://placeholder.com/integration2.svg",
    integration3: "https://placeholder.com/integration3.svg",
    integration4: "https://placeholder.com/integration4.svg",
  },
}));

describe("ResourceDetailWhitepaperSidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<ResourceDetailWhitepaperSidebar />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ResourceDetailWhitepaperSidebar className="custom-class" />
    );
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<ResourceDetailWhitepaperSidebar />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-24");
  });

  it("renders sidebar with download options", () => {
    const { container } = render(<ResourceDetailWhitepaperSidebar />);
    const aside = container.querySelector("aside");
    expect(aside).toBeInTheDocument();
  });

  it("renders article content area", () => {
    const { container } = render(<ResourceDetailWhitepaperSidebar />);
    const article = container.querySelector("article");
    expect(article).toBeInTheDocument();
    expect(article).toHaveClass("prose");
  });

  it("renders with custom sidebar props", () => {
    const customSidebar = {
      resourceType: "Guide",
      resourceTitle: "Custom Guide Title",
      downloadDescription: "Custom download description",
      readTime: "10 minutes",
      primaryDownload: {
        text: "Download PDF",
        href: "/custom-download",
      },
    };
    const { container } = render(
      <ResourceDetailWhitepaperSidebar sidebar={customSidebar} />
    );
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders grid layout with two columns", () => {
    const { container } = render(<ResourceDetailWhitepaperSidebar />);
    // Component uses .grid class for layout
    const gridContainer = container.querySelector(".grid");
    expect(gridContainer).toBeInTheDocument();
  });
});
