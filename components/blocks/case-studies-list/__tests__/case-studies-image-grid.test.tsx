import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CaseStudiesImageGrid } from "../case-studies-image-grid";

// Mock dependencies
vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, size }: { name: string; size: number }) => (
    <span data-testid="mock-icon" data-name={name} data-size={size}>icon</span>
  ),
}));

describe("CaseStudiesImageGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom items", () => {
    const customItems = [
      {
        image: "/custom.jpg",
        logo: "/custom-logo.svg",
        title: "Custom Study Title",
        href: "/custom",
      },
    ];

    render(<CaseStudiesImageGrid items={customItems} />);
    expect(screen.getByText("Custom Study Title")).toBeInTheDocument();
  });

  it("handles empty items array", () => {
    const { container } = render(<CaseStudiesImageGrid items={[]} />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });
});

