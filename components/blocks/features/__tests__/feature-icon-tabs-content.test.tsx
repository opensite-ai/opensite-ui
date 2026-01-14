import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureIconTabsContent } from "../feature-icon-tabs-content";

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

describe("FeatureIconTabsContent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<FeatureIconTabsContent />);
    expect(screen.getByText("A Collection of Components Built With Opensite AI & Tailwind")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<FeatureIconTabsContent heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<FeatureIconTabsContent description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders tabs when provided", () => {
    const tabs = [{ title: "Tab 1", content: "Content 1" }];
    render(<FeatureIconTabsContent tabs={tabs} />);
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureIconTabsContent className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
