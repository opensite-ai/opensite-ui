import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
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

vi.mock("@page-speed/pdf-viewer", () => ({
  PDFViewer: ({ url, height }: { url: string; height: string | number }) => (
    <div data-testid="mock-pdf-viewer" data-url={url} data-height={height} />
  ),
}));

describe("ResourceDetailWhitepaperSidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders sidebar with resource type", () => {
    render(<ResourceDetailWhitepaperSidebar sidebar={{ resourceType: "Whitepaper" }} />);
    expect(screen.getByText("Whitepaper")).toBeInTheDocument();
  });

  it("renders sidebar with resource title", () => {
    render(<ResourceDetailWhitepaperSidebar sidebar={{ resourceTitle: "The Complete Guide" }} />);
    expect(screen.getByText("The Complete Guide")).toBeInTheDocument();
  });

  it("renders download options title", () => {
    render(<ResourceDetailWhitepaperSidebar sidebar={{ downloadOptionsTitle: "Download Options" }} />);
    expect(screen.getByText("Download Options")).toBeInTheDocument();
  });

  it("renders download description", () => {
    render(<ResourceDetailWhitepaperSidebar sidebar={{ downloadDescription: "Download for offline reading" }} />);
    expect(screen.getByText("Download for offline reading")).toBeInTheDocument();
  });

  it("renders read time", () => {
    render(<ResourceDetailWhitepaperSidebar sidebar={{ readTime: "5 minutes" }} />);
    expect(screen.getByText(/5 minutes/)).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ResourceDetailWhitepaperSidebar className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
