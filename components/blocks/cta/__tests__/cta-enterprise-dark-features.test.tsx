import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaEnterpriseDarkFeatures } from "../cta-enterprise-dark-features";

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

describe("CtaEnterpriseDarkFeatures", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<CtaEnterpriseDarkFeatures heading="Test Heading" description="Test Description" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaEnterpriseDarkFeatures heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaEnterpriseDarkFeatures description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Contact Sales", href: "/contact", variant: "secondary" as const },
      { label: "View Pricing", href: "/pricing", variant: "outline" as const },
    ];
    render(<CtaEnterpriseDarkFeatures actions={actions} />);
    expect(screen.getByText("Contact Sales")).toBeInTheDocument();
    expect(screen.getByText("View Pricing")).toBeInTheDocument();
  });

  it("renders features when provided", () => {
    const features = [
      { iconName: "lucide/shield-check", text: "Enterprise security" },
      { iconName: "lucide/check", text: "99.9% uptime SLA" },
    ];
    render(<CtaEnterpriseDarkFeatures features={features} />);
    expect(screen.getByText("Enterprise security")).toBeInTheDocument();
    expect(screen.getByText("99.9% uptime SLA")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaEnterpriseDarkFeatures className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
