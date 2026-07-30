import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaEnterpriseDarkFeatures } from "../cta-enterprise-dark-features";

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    className,
    size,
  }: {
    name?: React.ReactNode | string;
    className?: string;
    size?: number;
  }) =>
    typeof name === "string" ? (
      <span
        data-testid={`mock-icon-${name}`}
        className={className}
        data-size={size}
      />
    ) : (
      <>{name}</>
    ),
}));

describe("CtaEnterpriseDarkFeatures", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<CtaEnterpriseDarkFeatures heading="Test Heading" description="Test Description" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaEnterpriseDarkFeatures heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaEnterpriseDarkFeatures description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Contact Sales", href: "/contact", variant: "secondary" as const },
      { label: "View Pricing", href: "/pricing", variant: "outline" as const },
    ];
    render(<CtaEnterpriseDarkFeatures actions={actions} />);
    expect(screen.getByText("Contact Sales")).toBeInTheDocument();
    expect(screen.getByText("View Pricing")).toBeInTheDocument();
  });

  it("renders action icon names dynamically without exposing raw text", () => {
    render(
      <CtaEnterpriseDarkFeatures
        actions={[
          {
            label: "Contact Sales",
            icon: "lucide/building-2",
            iconAfter: "lucide/external-link",
          },
        ]}
      />,
    );

    expect(
      screen.getByTestId("mock-icon-lucide/building-2"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/external-link"),
    ).toBeInTheDocument();
    expect(screen.queryByText("lucide/building-2")).not.toBeInTheDocument();
    expect(screen.queryByText("lucide/external-link")).not.toBeInTheDocument();
  });

  it("preserves custom action icon elements", () => {
    render(
      <CtaEnterpriseDarkFeatures
        actions={[
          {
            label: "Contact Sales",
            icon: <span data-testid="custom-leading-icon" />,
            iconAfter: <span data-testid="custom-trailing-icon" />,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-trailing-icon")).toBeInTheDocument();
  });

  it("lets action children replace the complete generated action composition", () => {
    render(
      <CtaEnterpriseDarkFeatures
        actions={[
          {
            label: "Generated label",
            icon: "lucide/generated-leading",
            iconAfter: "lucide/generated-trailing",
            children: <span data-testid="custom-action-children">Custom action</span>,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-action-children")).toBeInTheDocument();
    expect(screen.queryByText("Generated label")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/generated-leading"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/generated-trailing"),
    ).not.toBeInTheDocument();
  });

  it("lets actionsSlot replace generated actions", () => {
    render(
      <CtaEnterpriseDarkFeatures
        actions={[
          {
            label: "Generated action",
            icon: "lucide/generated-leading",
          },
        ]}
        actionsSlot={<div data-testid="custom-actions-slot">Custom actions</div>}
      />,
    );

    expect(screen.getByTestId("custom-actions-slot")).toBeInTheDocument();
    expect(screen.queryByText("Generated action")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/generated-leading"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/arrow-right"),
    ).not.toBeInTheDocument();
  });

  it("preserves the trailing action override, default, and empty-name behavior", () => {
    const { rerender } = render(
      <CtaEnterpriseDarkFeatures actions={[{ label: "Contact Sales" }]} />,
    );

    const defaultArrow = screen.getByTestId("mock-icon-lucide/arrow-right");
    expect(defaultArrow).toBeInTheDocument();
    expect(defaultArrow).toHaveAttribute("data-size", "16");
    expect(defaultArrow).toHaveClass("ml-2");

    rerender(
      <CtaEnterpriseDarkFeatures
        actions={[
          {
            label: "Contact Sales",
            iconAfter: "lucide/circle-arrow-right",
          },
        ]}
      />,
    );

    const customArrow = screen.getByTestId(
      "mock-icon-lucide/circle-arrow-right",
    );
    expect(customArrow).toBeInTheDocument();
    expect(customArrow).toHaveAttribute("data-size", "16");
    expect(customArrow).toHaveClass("ml-2");
    expect(
      screen.queryByTestId("mock-icon-lucide/arrow-right"),
    ).not.toBeInTheDocument();

    rerender(
      <CtaEnterpriseDarkFeatures
        actions={[{ label: "Contact Sales", icon: "", iconAfter: "" }]}
      />,
    );

    expect(screen.queryByTestId("mock-icon-")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/arrow-right"),
    ).not.toBeInTheDocument();
  });

  it("renders features when provided", () => {
    const features = [
      { iconName: "lucide/shield-check", text: "Enterprise security" },
      { iconName: "lucide/check", text: "99.9% uptime SLA" },
    ];
    render(<CtaEnterpriseDarkFeatures features={features} />);
    expect(screen.getByText("Enterprise security")).toBeInTheDocument();
    expect(screen.getByText("99.9% uptime SLA")).toBeInTheDocument();
  });

  it("preserves feature icon override, fallback, custom, and empty-name behavior", () => {
    render(
      <CtaEnterpriseDarkFeatures
        features={[
          {
            text: "Override",
            icon: "lucide/shield-check",
            iconName: "lucide/legacy-shield",
          },
          {
            text: "Fallback",
            iconName: "lucide/badge-check",
          },
          {
            text: "Custom",
            icon: <span data-testid="custom-feature-icon" />,
            iconName: "lucide/legacy-custom",
          },
          {
            text: "Empty override",
            icon: "",
            iconName: "lucide/suppressed-fallback",
          },
          {
            text: "Empty fallback",
            iconName: "",
          },
        ]}
      />,
    );

    expect(
      screen.getByTestId("mock-icon-lucide/shield-check"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/badge-check"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("custom-feature-icon")).toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/legacy-shield"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/legacy-custom"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/suppressed-fallback"),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon-")).not.toBeInTheDocument();
    expect(screen.queryByText("lucide/shield-check")).not.toBeInTheDocument();
    expect(screen.queryByText("lucide/badge-check")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaEnterpriseDarkFeatures className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
