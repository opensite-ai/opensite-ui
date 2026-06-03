import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroTaskTimerAnimated } from "../hero-task-timer-animated";

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

describe("HeroTaskTimerAnimated", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  it("renders with provided props", () => {
    render(<HeroTaskTimerAnimated heading="Test Heading" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroTaskTimerAnimated heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders the countdown timer display", () => {
    render(<HeroTaskTimerAnimated heading="Timer" timerMinutes={10} timerSeconds={30} />);
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  it("renders task items when provided", () => {
    const taskItems = ["Design mockups", "Code review", "Ship feature"];
    render(<HeroTaskTimerAnimated heading="Timer" taskItems={taskItems} />);
    expect(screen.getAllByText("Design mockups").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Code review").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Ship feature").length).toBeGreaterThanOrEqual(1);
  });

  it("renders actions when provided", () => {
    const actions = [{ label: "Get Started", href: "/start", variant: "default" as const }];
    render(<HeroTaskTimerAnimated actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroTaskTimerAnimated heading="Test Heading" className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders SVG progress ring", () => {
    const { container } = render(<HeroTaskTimerAnimated heading="Timer" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(container.querySelectorAll("circle").length).toBe(2);
  });

  it("defaults to 25-minute Pomodoro timer", () => {
    render(<HeroTaskTimerAnimated heading="Timer" />);
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("00")).toBeInTheDocument();
  });
});
