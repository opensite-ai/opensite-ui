import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroMinimalCenteredDark } from "../hero-minimal-centered-dark";

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

describe("HeroMinimalCenteredDark", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<HeroMinimalCenteredDark />);
    expect(screen.getByText("Now available in beta")).toBeInTheDocument();
  });

  it("renders custom badge", () => {
    render(<HeroMinimalCenteredDark badge="Custom Badge" />);
    expect(screen.getByText("Custom Badge")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroMinimalCenteredDark heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroMinimalCenteredDark description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders heading highlight", () => {
    render(<HeroMinimalCenteredDark headingHighlight="teamwork" />);
    expect(screen.getByText("teamwork")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/start", variant: "default" as const },
    ];
    render(<HeroMinimalCenteredDark actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("renders stats when provided", () => {
    const stats = [
      { value: "100+", label: "Users" },
      { value: "50+", label: "Projects" },
    ];
    render(<HeroMinimalCenteredDark stats={stats} />);
    expect(screen.getByText("100+")).toBeInTheDocument();
    expect(screen.getByText("50+")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroMinimalCenteredDark className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
