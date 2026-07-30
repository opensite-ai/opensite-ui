import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroDashedBorderFeatures } from "../hero-dashed-border-features";

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

describe("HeroDashedBorderFeatures", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<HeroDashedBorderFeatures heading="Test Heading" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroDashedBorderFeatures heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroDashedBorderFeatures description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [{ label: "Get Started", href: "/start", variant: "default" as const }];
    render(<HeroDashedBorderFeatures actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("renders action icon names through DynamicIcon without exposing raw text", () => {
    render(
      <HeroDashedBorderFeatures
        actions={[
          {
            label: "Get Started",
            icon: "lucide/rocket",
            iconAfter: "lucide/arrow-right",
          },
        ]}
      />,
    );

    expect(screen.getByTestId("mock-icon-lucide/rocket")).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/arrow-right"),
    ).toBeInTheDocument();
    expect(screen.queryByText("lucide/rocket")).not.toBeInTheDocument();
    expect(screen.queryByText("lucide/arrow-right")).not.toBeInTheDocument();
  });

  it("preserves custom action icon elements", () => {
    render(
      <HeroDashedBorderFeatures
        actions={[
          {
            label: "Get Started",
            icon: <span data-testid="custom-leading-icon" />,
            iconAfter: <span data-testid="custom-trailing-icon" />,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-trailing-icon")).toBeInTheDocument();
  });

  it("preserves empty, false, zero, and children action semantics", () => {
    const { container, rerender } = render(
      <HeroDashedBorderFeatures
        actions={[
          { label: "Empty Icons", icon: "", iconAfter: "" },
          { label: "Falsy Icons", icon: false, iconAfter: 0 },
        ]}
      />,
    );

    expect(screen.queryByTestId("mock-icon-")).not.toBeInTheDocument();
    const falsyAction = Array.from(
      container.querySelectorAll(
        '[data-slot="button"], [data-testid="mock-pressable"]',
      ),
    ).find((action) => action.textContent?.includes("Falsy Icons"));
    expect(falsyAction).toHaveTextContent("Falsy Icons0");

    rerender(
      <HeroDashedBorderFeatures
        actions={[
          {
            label: "Generated Action Label",
            icon: "lucide/rocket",
            iconAfter: "lucide/arrow-right",
            children: <span data-testid="replacement-action">Replacement</span>,
          },
        ]}
      />,
    );
    expect(screen.getByTestId("replacement-action")).toBeInTheDocument();
    expect(
      screen.queryByText("Generated Action Label"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/rocket"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/arrow-right"),
    ).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroDashedBorderFeatures heading="Test Heading" className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
