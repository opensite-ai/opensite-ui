import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FooterBackgroundCard } from "../footer-background-card";

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

describe("FooterBackgroundCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<FooterBackgroundCard />);
    expect(screen.getByText("Let's Connect")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders custom tagline", () => {
    render(<FooterBackgroundCard tagline="Custom Tagline" />);
    expect(screen.getByText("Custom Tagline")).toBeInTheDocument();
  });

  it("renders custom personal message", () => {
    render(<FooterBackgroundCard personalMessage="Custom message" />);
    expect(screen.getByText("Custom message")).toBeInTheDocument();
  });

  it("renders custom CTA text", () => {
    render(<FooterBackgroundCard ctaText="Book a meeting" />);
    expect(screen.getByText("Book a meeting")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FooterBackgroundCard className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
