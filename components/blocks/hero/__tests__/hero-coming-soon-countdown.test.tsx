import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroComingSoonCountdown } from "../hero-coming-soon-countdown";

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

describe("HeroComingSoonCountdown", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<HeroComingSoonCountdown />);
    expect(screen.getByText("Something amazing is coming")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroComingSoonCountdown heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroComingSoonCountdown description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders submitAction when provided", () => {
    const submitAction = { label: "Notify Me", href: "/notify" };
    render(<HeroComingSoonCountdown submitAction={submitAction} />);
    expect(screen.getByText("Notify Me")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroComingSoonCountdown className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
