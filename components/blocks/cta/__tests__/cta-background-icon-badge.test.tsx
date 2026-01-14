import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaBackgroundIconBadge } from "../cta-background-icon-badge";

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../ui/badge", () => ({
  Badge: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span className={className} data-testid="mock-badge">{children}</span>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("CtaBackgroundIconBadge", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<CtaBackgroundIconBadge heading="Test Heading" badgeText="Test Badge" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaBackgroundIconBadge heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom badge text", () => {
    render(<CtaBackgroundIconBadge badgeText="Speed" />);
    expect(screen.getByText("Speed")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/start", variant: "secondary" as const },
      { label: "Learn More", href: "/learn", variant: "outline" as const },
    ];
    render(<CtaBackgroundIconBadge actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("renders badge icon", () => {
    render(<CtaBackgroundIconBadge badgeIconName="lucide/zap" />);
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaBackgroundIconBadge className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
