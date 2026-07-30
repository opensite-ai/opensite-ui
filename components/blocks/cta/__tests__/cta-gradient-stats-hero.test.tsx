import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaGradientStatsHero } from "../cta-gradient-stats-hero";

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    className,
  }: {
    name?: React.ReactNode | string;
    className?: string;
  }) =>
    name == null ? null : typeof name === "string" ? (
      <span
        data-testid={`mock-icon-${name || "empty"}`}
        data-name={name}
        className={className}
      >
        icon
      </span>
    ) : (
      <>{name}</>
    ),
}));

describe("CtaGradientStatsHero", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<CtaGradientStatsHero heading="Test Heading" description="Test Description" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaGradientStatsHero heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaGradientStatsHero description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/start", variant: "secondary" as const },
      { label: "View Pricing", href: "/pricing", variant: "outline" as const },
    ];
    render(<CtaGradientStatsHero actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("View Pricing")).toBeInTheDocument();
  });

  it("routes action icon names through DynamicIcon and preserves custom elements", () => {
    render(
      <CtaGradientStatsHero
        actions={[
          {
            label: "Named Icons",
            icon: "lucide/rocket",
            iconAfter: "lucide/arrow-up-right",
          },
          {
            label: "Custom Icons",
            icon: <span data-testid="custom-leading-icon" />,
            iconAfter: <span data-testid="custom-trailing-icon" />,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("mock-icon-lucide/rocket")).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/arrow-up-right"),
    ).toBeInTheDocument();
    expect(screen.queryByText("lucide/rocket")).not.toBeInTheDocument();
    expect(
      screen.queryByText("lucide/arrow-up-right"),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("custom-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-trailing-icon")).toBeInTheDocument();
  });

  it("preserves the first action trailing-icon default", () => {
    render(<CtaGradientStatsHero actions={[{ label: "Default Trailing" }]} />);

    expect(
      screen.getByTestId("mock-icon-lucide/arrow-right"),
    ).toBeInTheDocument();
  });

  it("keeps an empty trailing icon override ahead of the default", () => {
    render(
      <CtaGradientStatsHero
        actions={[{ label: "Empty Icons", icon: "", iconAfter: "" }]}
      />,
    );

    expect(screen.queryByTestId("mock-icon-empty")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/arrow-right"),
    ).not.toBeInTheDocument();
  });

  it("preserves false and zero overrides ahead of the trailing-icon default", () => {
    render(
      <CtaGradientStatsHero
        actions={[{ label: "Falsy Icons", icon: false, iconAfter: 0 }]}
      />,
    );

    expect(
      screen.getByText("Falsy Icons", {
        selector: '[data-slot="button"]',
        exact: false,
      }),
    ).toHaveTextContent("Falsy Icons0");
    expect(
      screen.queryByTestId("mock-icon-lucide/arrow-right"),
    ).not.toBeInTheDocument();
  });

  it("renders stats when provided", () => {
    const stats = [
      { value: "99.9%", label: "Uptime" },
      { value: "10K+", label: "Customers" },
    ];
    render(<CtaGradientStatsHero stats={stats} />);
    expect(screen.getByText("99.9%")).toBeInTheDocument();
    expect(screen.getByText("Uptime")).toBeInTheDocument();
    expect(screen.getByText("10K+")).toBeInTheDocument();
    expect(screen.getByText("Customers")).toBeInTheDocument();
  });

  it("routes stat icon names through DynamicIcon and preserves custom elements", () => {
    render(
      <CtaGradientStatsHero
        stats={[
          {
            value: "99%",
            label: "Protected",
            icon: "lucide/shield-check",
          },
          {
            value: "24/7",
            label: "Supported",
            icon: <span data-testid="custom-stat-icon" />,
          },
        ]}
      />,
    );

    expect(
      screen.getByTestId("mock-icon-lucide/shield-check"),
    ).toBeInTheDocument();
    expect(screen.queryByText("lucide/shield-check")).not.toBeInTheDocument();
    expect(screen.getByTestId("custom-stat-icon")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaGradientStatsHero className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
