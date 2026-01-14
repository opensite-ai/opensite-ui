import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LinkPageGridCards } from "../link-page-grid-cards";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("LinkPageGridCards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders links as cards", () => {
    const links = [
      { id: "1", label: "Portfolio", href: "https://example.com", description: "View work" },
      { id: "2", label: "Blog", href: "https://example.com/blog" },
    ];
    render(<LinkPageGridCards name="Test" links={links} />);
    expect(screen.getByText("Portfolio")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("View work")).toBeInTheDocument();
  });
});
