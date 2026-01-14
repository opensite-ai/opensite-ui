import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FooterSimpleCentered } from "../footer-simple-centered";

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

describe("FooterSimpleCentered", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<FooterSimpleCentered />);
    expect(screen.getByText("Components made easy.")).toBeInTheDocument();
  });

  it("renders custom tagline", () => {
    render(<FooterSimpleCentered tagline="Custom tagline" />);
    expect(screen.getByText("Custom tagline")).toBeInTheDocument();
  });

  it("renders sitemap sections when provided", () => {
    const sitemap = [
      { title: "Products", links: [{ label: "Feature 1", href: "/feature1" }] },
    ];
    render(<FooterSimpleCentered sitemap={sitemap} />);
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
  });

  it("renders bottom links when provided", () => {
    const bottomLinks = [
      { text: "Privacy", href: "/privacy" },
      { text: "Terms", href: "/terms" },
    ];
    render(<FooterSimpleCentered bottomLinks={bottomLinks} />);
    expect(screen.getByText("Privacy")).toBeInTheDocument();
    expect(screen.getByText("Terms")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FooterSimpleCentered className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
