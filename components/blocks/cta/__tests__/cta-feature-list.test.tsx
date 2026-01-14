import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaFeatureList } from "../cta-feature-list";

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

describe("CtaFeatureList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<CtaFeatureList />);
    expect(screen.getByText("Call to Action")).toBeInTheDocument();
    expect(screen.getByText("Build faster with our collection of pre-built components. Speed up your development and ship features in record time.")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaFeatureList heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaFeatureList description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/signup", variant: "default" as const },
      { label: "Learn More", href: "/learn", variant: "outline" as const },
    ];
    render(<CtaFeatureList actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("renders features when provided", () => {
    const features = [
      { iconName: "lucide/check", text: "Easy Integration" },
      { iconName: "lucide/check", text: "24/7 Support" },
    ];
    render(<CtaFeatureList features={features} />);
    expect(screen.getByText("Easy Integration")).toBeInTheDocument();
    expect(screen.getByText("24/7 Support")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaFeatureList className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
