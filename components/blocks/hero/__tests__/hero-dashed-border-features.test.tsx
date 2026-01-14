import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroDashedBorderFeatures } from "../hero-dashed-border-features";

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

describe("HeroDashedBorderFeatures", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<HeroDashedBorderFeatures />);
    expect(screen.getByText("Fast websites for startups")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroDashedBorderFeatures heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroDashedBorderFeatures description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [{ label: "Get Started", href: "/start", variant: "default" as const }];
    render(<HeroDashedBorderFeatures actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroDashedBorderFeatures className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
