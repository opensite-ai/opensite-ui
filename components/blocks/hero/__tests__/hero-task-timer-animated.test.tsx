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
  });

  it("renders with default props", () => {
    render(<HeroTaskTimerAnimated />);
    expect(screen.getByText("A simple task timer to power your goals")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroTaskTimerAnimated heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders images when provided", () => {
    const images = [
      { src: "https://example.com/image1.jpg", alt: "Image 1" },
    ];
    const { container } = render(<HeroTaskTimerAnimated images={images} />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [{ label: "Get Started", href: "/start", variant: "default" as const }];
    render(<HeroTaskTimerAnimated actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroTaskTimerAnimated className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
