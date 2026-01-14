import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FooterLinksGrid } from "../footer-links-grid";

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("FooterLinksGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<FooterLinksGrid />);
    expect(screen.getByText("Components made easy.")).toBeInTheDocument();
  });

  it("renders custom tagline", () => {
    render(<FooterLinksGrid tagline="Custom tagline" />);
    expect(screen.getByText("Custom tagline")).toBeInTheDocument();
  });

  it("renders menu items when provided", () => {
    const menuItems = [
      { title: "Products", links: [{ text: "Feature 1", url: "/feature1" }] },
    ];
    render(<FooterLinksGrid menuItems={menuItems} />);
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
  });

  it("renders bottom links when provided", () => {
    const bottomLinks = [
      { text: "Privacy", url: "/privacy" },
      { text: "Terms", url: "/terms" },
    ];
    render(<FooterLinksGrid bottomLinks={bottomLinks} />);
    expect(screen.getByText("Privacy")).toBeInTheDocument();
    expect(screen.getByText("Terms")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FooterLinksGrid className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
