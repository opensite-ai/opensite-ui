import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaAccentBackground } from "../cta-accent-background";

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

describe("CtaAccentBackground", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<CtaAccentBackground />);
    expect(screen.getByText("Call to Action")).toBeInTheDocument();
    expect(screen.getByText("Build faster with our collection of pre-built blocks. Speed up your development and ship features in record time.")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaAccentBackground heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaAccentBackground description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Buy Now", href: "/pricing", variant: "default" as const },
      { label: "Contact Us", href: "/contact", variant: "outline" as const },
    ];
    render(<CtaAccentBackground actions={actions} />);
    expect(screen.getByText("Buy Now")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaAccentBackground className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
