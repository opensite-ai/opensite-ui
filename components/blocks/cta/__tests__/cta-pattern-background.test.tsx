import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaPatternBackground } from "../cta-pattern-background";

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

describe("CtaPatternBackground", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<CtaPatternBackground />);
    expect(screen.getByText("Start building your websites faster")).toBeInTheDocument();
    expect(screen.getByText("Try our tools and services to build your website faster. Start with a 14-day free trial. No credit card required. No setup fees. Cancel anytime.")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaPatternBackground heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaPatternBackground description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/start", variant: "default" as const },
      { label: "Learn More", href: "/learn", variant: "outline" as const },
    ];
    render(<CtaPatternBackground actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaPatternBackground className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
