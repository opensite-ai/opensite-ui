import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroPlatformFeaturesGrid } from "../hero-platform-features-grid";

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

describe("HeroPlatformFeaturesGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<HeroPlatformFeaturesGrid />);
    expect(screen.getByText("Develop, launch, and grow your service with our platform")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroPlatformFeaturesGrid heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroPlatformFeaturesGrid description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders action when provided", () => {
    const action = { label: "Get Started", href: "/start", variant: "default" as const };
    render(<HeroPlatformFeaturesGrid action={action} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroPlatformFeaturesGrid className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
