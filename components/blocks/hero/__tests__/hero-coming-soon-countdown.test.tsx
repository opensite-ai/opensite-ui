import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroComingSoonCountdown } from "../hero-coming-soon-countdown";

vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    span: ({ children, ...props }: Record<string, unknown>) => <span {...props}>{children as React.ReactNode}</span>,
  },
}));

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

  it("renders with provided props", () => {
    render(<HeroComingSoonCountdown heading="Test Heading" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
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
    const { container } = render(<HeroComingSoonCountdown heading="Test Heading" className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders countdown when countdownDate is in the future", () => {
    const futureDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000);
    render(<HeroComingSoonCountdown heading="Launch" countdownDate={futureDate} />);
    expect(screen.getByText("Days")).toBeInTheDocument();
    expect(screen.getByText("Hours")).toBeInTheDocument();
    expect(screen.getByText("Minutes")).toBeInTheDocument();
    expect(screen.getByText("Seconds")).toBeInTheDocument();
  });

  it("does not render countdown when countdownDate is in the past", () => {
    const pastDate = new Date(Date.now() - 1000);
    render(<HeroComingSoonCountdown heading="Launch" countdownDate={pastDate} />);
    expect(screen.queryByText("Days")).not.toBeInTheDocument();
  });

  it("does not render countdown when no countdownDate is provided", () => {
    render(<HeroComingSoonCountdown heading="Launch" />);
    expect(screen.queryByText("Days")).not.toBeInTheDocument();
  });
});
