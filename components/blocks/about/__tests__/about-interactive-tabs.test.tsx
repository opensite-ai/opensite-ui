import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutInteractiveTabs } from "../about-interactive-tabs";

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

describe("AboutInteractiveTabs", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<AboutInteractiveTabs />);
    expect(screen.getByText("Discover Our Story")).toBeInTheDocument();
    expect(screen.getByText("Learn more about who we are and what we do")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<AboutInteractiveTabs title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<AboutInteractiveTabs subtitle="Custom subtitle text" />);
    expect(screen.getByText("Custom subtitle text")).toBeInTheDocument();
  });

  it("renders tabs when provided", () => {
    const tabs = [
      { id: "tab1", label: "Tab 1", content: { title: "Tab 1 Title", description: "Tab 1 Description" } },
      { id: "tab2", label: "Tab 2", content: { title: "Tab 2 Title", description: "Tab 2 Description" } },
    ];
    render(<AboutInteractiveTabs tabs={tabs} />);
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
    expect(screen.getByText("Tab 1 Title")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<AboutInteractiveTabs className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
