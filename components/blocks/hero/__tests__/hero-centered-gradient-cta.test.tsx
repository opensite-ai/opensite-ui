import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroCenteredGradientCta } from "../hero-centered-gradient-cta";

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
    typeof name === "string" ? (
      <span data-testid="mock-icon" data-name={name} className={className}>
        icon
      </span>
    ) : (
      <>{name}</>
    ),
}));

describe("HeroCenteredGradientCta", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<HeroCenteredGradientCta heading="Test Heading" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroCenteredGradientCta heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroCenteredGradientCta description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [{ label: "Get Started", href: "/start", variant: "default" as const }];
    render(<HeroCenteredGradientCta actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("renders badge and feature icon names through DynamicIcon without exposing raw text", () => {
    render(
      <HeroCenteredGradientCta
        badge="Launch ready"
        badgeIcon="lucide/rocket"
        features={[{ title: "Fast", icon: "lucide/zap" }]}
      />,
    );

    expect(
      screen.getAllByTestId("mock-icon").map((icon) =>
        icon.getAttribute("data-name"),
      ),
    ).toEqual(["lucide/rocket", "lucide/zap"]);
    expect(screen.queryByText("lucide/rocket")).not.toBeInTheDocument();
    expect(screen.queryByText("lucide/zap")).not.toBeInTheDocument();
  });

  it("preserves custom badge and feature icon elements", () => {
    render(
      <HeroCenteredGradientCta
        badge="Launch ready"
        badgeIcon={<span data-testid="custom-badge-icon">badge icon</span>}
        features={[
          {
            title: "Fast",
            icon: <span data-testid="custom-feature-icon">feature icon</span>,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-badge-icon")).toHaveTextContent(
      "badge icon",
    );
    expect(screen.getByTestId("custom-feature-icon")).toHaveTextContent(
      "feature icon",
    );
  });

  it("applies custom className", () => {
    const { container } = render(<HeroCenteredGradientCta heading="Test Heading" className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
