import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaEnterpriseSplit } from "../cta-enterprise-split";

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

describe("CtaEnterpriseSplit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<CtaEnterpriseSplit />);
    expect(screen.getByText("Enterprise Ready")).toBeInTheDocument();
    expect(screen.getByText("Built for scale with enterprise-grade security, compliance, and support. Trusted by Fortune 500 companies worldwide.")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaEnterpriseSplit heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaEnterpriseSplit description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/signup", variant: "default" as const },
      { label: "Contact Sales", href: "/contact", variant: "outline" as const },
    ];
    render(<CtaEnterpriseSplit actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Contact Sales")).toBeInTheDocument();
  });

  it("renders links when provided", () => {
    const links = [
      { iconName: "lucide/file-text", title: "Documentation", description: "Read our docs", href: "/docs" },
      { iconName: "lucide/play", title: "Demo", description: "Try our demo", href: "/demo" },
    ];
    render(<CtaEnterpriseSplit links={links} />);
    expect(screen.getByText("Documentation")).toBeInTheDocument();
    expect(screen.getByText("Read our docs")).toBeInTheDocument();
    expect(screen.getByText("Demo")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaEnterpriseSplit className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
