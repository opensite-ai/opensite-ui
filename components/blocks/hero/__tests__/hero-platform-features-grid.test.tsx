import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroPlatformFeaturesGrid } from "../hero-platform-features-grid";

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

describe("HeroPlatformFeaturesGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<HeroPlatformFeaturesGrid heading="Test Heading" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroPlatformFeaturesGrid heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<HeroPlatformFeaturesGrid subtitle="Custom subtitle text" />);
    expect(screen.getByText("Custom subtitle text")).toBeInTheDocument();
  });

  it("renders action when provided", () => {
    const action = { label: "Get Started", href: "/start", variant: "default" as const };
    render(<HeroPlatformFeaturesGrid action={action} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("renders action icon names through DynamicIcon without exposing raw text", () => {
    render(
      <HeroPlatformFeaturesGrid
        action={{
          label: "Get Started",
          icon: "lucide/layout-grid",
          iconAfter: "lucide/arrow-right",
        }}
      />,
    );

    expect(
      screen.getByTestId("mock-icon-lucide/layout-grid"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/arrow-right"),
    ).toBeInTheDocument();
    expect(screen.queryByText("lucide/layout-grid")).not.toBeInTheDocument();
    expect(screen.queryByText("lucide/arrow-right")).not.toBeInTheDocument();
  });

  it("preserves custom action icon elements", () => {
    render(
      <HeroPlatformFeaturesGrid
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

  it("preserves feature icon override and legacy fallback precedence", () => {
    render(
      <HeroPlatformFeaturesGrid
        features={[
          {
            title: "Override",
            icon: "lucide/feature-override",
            iconName: "lucide/legacy-feature",
          },
          {
            title: "Fallback",
            iconName: "lucide/feature-fallback",
          },
        ]}
      />,
    );

    expect(
      screen.getByTestId("mock-icon-lucide/feature-override"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/feature-fallback"),
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/legacy-feature"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("lucide/feature-override"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("lucide/feature-fallback"),
    ).not.toBeInTheDocument();
  });

  it("preserves a custom feature icon ahead of the legacy fallback", () => {
    render(
      <HeroPlatformFeaturesGrid
        features={[
          {
            title: "Custom",
            icon: <span data-testid="custom-feature-icon" />,
            iconName: "lucide/legacy-custom-feature",
          },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-feature-icon")).toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/legacy-custom-feature"),
    ).not.toBeInTheDocument();
  });

  it("does not render an empty legacy feature icon name", () => {
    render(
      <HeroPlatformFeaturesGrid
        features={[
          {
            title: "Empty legacy icon",
            iconName: "",
          },
        ]}
      />,
    );

    expect(screen.queryByTestId("mock-icon-")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroPlatformFeaturesGrid heading="Test Heading" className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
