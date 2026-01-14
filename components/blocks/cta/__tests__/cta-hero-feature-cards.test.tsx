import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaHeroFeatureCards } from "../cta-hero-feature-cards";

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

describe("CtaHeroFeatureCards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<CtaHeroFeatureCards />);
    expect(screen.getByText("Build Something Amazing")).toBeInTheDocument();
    expect(screen.getByText("Start building with our powerful tools and comprehensive documentation. Ship faster and scale with confidence.")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaHeroFeatureCards heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaHeroFeatureCards description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/start", variant: "secondary" as const },
      { label: "Learn More", href: "/learn", variant: "outline" as const },
    ];
    render(<CtaHeroFeatureCards actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("renders feature cards when provided", () => {
    const featureCards = [
      { iconName: "lucide/zap", title: "Fast", description: "Lightning fast performance" },
      { iconName: "lucide/shield", title: "Secure", description: "Enterprise security" },
    ];
    render(<CtaHeroFeatureCards featureCards={featureCards} />);
    expect(screen.getByText("Fast")).toBeInTheDocument();
    expect(screen.getByText("Lightning fast performance")).toBeInTheDocument();
    expect(screen.getByText("Secure")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaHeroFeatureCards className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
