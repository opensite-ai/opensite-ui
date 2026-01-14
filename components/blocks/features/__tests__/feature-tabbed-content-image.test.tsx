import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureTabbedContentImage } from "../feature-tabbed-content-image";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
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

describe("FeatureTabbedContentImage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<FeatureTabbedContentImage />);
    expect(screen.getByText("Building Better Digital Experiences")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureTabbedContentImage title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<FeatureTabbedContentImage description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders tabs when provided", () => {
    const tabs = [{ title: "Tab 1", content: "Content 1" }];
    render(<FeatureTabbedContentImage tabs={tabs} />);
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureTabbedContentImage className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
