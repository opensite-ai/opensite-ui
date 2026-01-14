import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaFeatureCardsGrid } from "../cta-feature-cards-grid";

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

describe("CtaFeatureCardsGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<CtaFeatureCardsGrid />);
    expect(screen.getByText("Everything you need to build")).toBeInTheDocument();
    expect(screen.getByText("Build faster with our collection of pre-built components. Speed up your development and ship features in record time.")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaFeatureCardsGrid heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaFeatureCardsGrid description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/signup", variant: "default" as const },
      { label: "Learn More", href: "/about", variant: "outline" as const },
    ];
    render(<CtaFeatureCardsGrid actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("renders features when provided", () => {
    const features = [
      { iconName: "lucide/zap", title: "Fast", description: "Lightning fast performance" },
      { iconName: "lucide/shield", title: "Secure", description: "Enterprise security" },
    ];
    render(<CtaFeatureCardsGrid features={features} />);
    expect(screen.getByText("Fast")).toBeInTheDocument();
    expect(screen.getByText("Lightning fast performance")).toBeInTheDocument();
    expect(screen.getByText("Secure")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaFeatureCardsGrid className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
