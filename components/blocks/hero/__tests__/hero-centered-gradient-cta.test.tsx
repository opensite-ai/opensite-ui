import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroCenteredGradientCta } from "../hero-centered-gradient-cta";

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

describe("HeroCenteredGradientCta", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<HeroCenteredGradientCta />);
    expect(screen.getByText("Introducing our new platform")).toBeInTheDocument();
    expect(screen.getByText(/Build something/)).toBeInTheDocument();
  });

  it("renders CTA buttons", () => {
    render(<HeroCenteredGradientCta />);
    expect(screen.getByText("Get started free")).toBeInTheDocument();
    expect(screen.getByText("Watch demo")).toBeInTheDocument();
  });

  it("renders feature highlights", () => {
    render(<HeroCenteredGradientCta />);
    expect(screen.getByText("Free 14-day trial")).toBeInTheDocument();
    expect(screen.getByText("No credit card required")).toBeInTheDocument();
    expect(screen.getByText("Cancel anytime")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroCenteredGradientCta className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<HeroCenteredGradientCta />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });
});
