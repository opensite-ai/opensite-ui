import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaVideoBackgroundHero } from "../cta-video-background-hero";

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

describe("CtaVideoBackgroundHero", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<CtaVideoBackgroundHero />);
    expect(screen.getByText("Experience the Future")).toBeInTheDocument();
    expect(screen.getByText("See how our platform transforms your workflow. Join thousands of teams already building amazing products.")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaVideoBackgroundHero heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaVideoBackgroundHero description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/start", variant: "secondary" as const },
      { label: "Watch Demo", href: "#", variant: "outline" as const },
    ];
    render(<CtaVideoBackgroundHero actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Watch Demo")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaVideoBackgroundHero className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
