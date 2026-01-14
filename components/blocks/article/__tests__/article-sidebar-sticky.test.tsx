import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArticleSidebarSticky } from "../article-sidebar-sticky";

// Mock the Img component from @page-speed/img
vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

// Mock the DynamicIcon component
vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, size }: { name: string; size: number }) => (
    <span data-testid={`icon-${name}`} data-size={size} />
  ),
}));

describe("ArticleSidebarSticky", () => {

  it("renders custom title", () => {
    render(<ArticleSidebarSticky title="Custom Article Title" />);
    expect(screen.getByText("Custom Article Title")).toBeInTheDocument();
  });
});

