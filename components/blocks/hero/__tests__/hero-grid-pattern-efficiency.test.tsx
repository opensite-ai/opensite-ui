import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroGridPatternEfficiency } from "../hero-grid-pattern-efficiency";

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name }: { name?: React.ReactNode | string }) =>
    typeof name === "string" ? (
      <span data-testid={`mock-icon-${name}`} />
    ) : (
      <>{name}</>
    ),
}));

describe("HeroGridPatternEfficiency", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<HeroGridPatternEfficiency heading="Test Heading" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroGridPatternEfficiency heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroGridPatternEfficiency description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders action when provided", () => {
    const action = { label: "Get Started", href: "/start", variant: "default" as const };
    render(<HeroGridPatternEfficiency action={action} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("renders action icon names through DynamicIcon without exposing raw text", () => {
    render(
      <HeroGridPatternEfficiency
        action={{
          label: "Get Started",
          icon: "lucide/zap",
          iconAfter: "lucide/arrow-right",
        }}
      />,
    );

    expect(screen.getByTestId("mock-icon-lucide/zap")).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/arrow-right"),
    ).toBeInTheDocument();
    expect(screen.queryByText("lucide/zap")).not.toBeInTheDocument();
    expect(screen.queryByText("lucide/arrow-right")).not.toBeInTheDocument();
  });

  it("preserves custom action icon elements", () => {
    render(
      <HeroGridPatternEfficiency
        action={{
          label: "Get Started",
          icon: <span data-testid="custom-leading-icon" />,
          iconAfter: <span data-testid="custom-trailing-icon" />,
        }}
      />,
    );

    expect(screen.getByTestId("custom-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-trailing-icon")).toBeInTheDocument();
  });

  it("preserves empty, false, zero, and children action semantics", () => {
    const { container, rerender } = render(
      <HeroGridPatternEfficiency
        action={{ label: "Empty Icons", icon: "", iconAfter: "" }}
      />,
    );

    expect(
      container.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();

    rerender(
      <HeroGridPatternEfficiency
        action={{ label: "Falsy Icons", icon: false, iconAfter: 0 }}
      />,
    );
    const falsyAction = Array.from(
      container.querySelectorAll(
        '[data-slot="button"], [data-testid="mock-pressable"]',
      ),
    ).find((action) => action.textContent?.includes("Falsy Icons"));
    expect(falsyAction).toHaveTextContent("Falsy Icons0");

    rerender(
      <HeroGridPatternEfficiency
        action={{
          label: "Generated Action Label",
          icon: "lucide/zap",
          iconAfter: "lucide/arrow-right",
          children: <span data-testid="replacement-action">Replacement</span>,
        }}
      />,
    );
    expect(screen.getByTestId("replacement-action")).toBeInTheDocument();
    expect(
      screen.queryByText("Generated Action Label"),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroGridPatternEfficiency heading="Test Heading" className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
