import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ArticleBreadcrumbSocial } from "../article-breadcrumb-social";
import type { ArticleBreadcrumbSection } from "../article-breadcrumb-social";

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

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor() {}
}
window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

describe("ArticleBreadcrumbSocial", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset scroll position
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
  });

  it("renders without crashing", () => {
    const { container } = render(<ArticleBreadcrumbSocial />);
    expect(container).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ArticleBreadcrumbSocial className="custom-class" />);
    expect(container.querySelector(".custom-class")).toBeInTheDocument();
  });
});
