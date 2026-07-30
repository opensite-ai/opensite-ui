import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaFeatureList } from "../cta-feature-list";

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

describe("CtaFeatureList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<CtaFeatureList heading="Test Heading" description="Test Description" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaFeatureList heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaFeatureList description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/signup", variant: "default" as const },
      { label: "Learn More", href: "/learn", variant: "outline" as const },
    ];
    render(<CtaFeatureList actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("routes action icon names through DynamicIcon and preserves custom elements", () => {
    render(
      <CtaFeatureList
        actions={[
          {
            label: "Named Icons",
            icon: "lucide/sparkles",
            iconAfter: "lucide/arrow-right",
          },
          {
            label: "Custom Icons",
            icon: <span data-testid="custom-leading-icon" />,
            iconAfter: <span data-testid="custom-trailing-icon" />,
          },
        ]}
      />,
    );

    expect(
      screen.getByTestId("mock-icon-lucide/sparkles"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/arrow-right"),
    ).toBeInTheDocument();
    expect(screen.queryByText("lucide/sparkles")).not.toBeInTheDocument();
    expect(screen.queryByText("lucide/arrow-right")).not.toBeInTheDocument();
    expect(screen.getByTestId("custom-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-trailing-icon")).toBeInTheDocument();
  });

  it("renders no icon DOM for empty action strings and preserves false and zero", () => {
    render(
      <CtaFeatureList
        actions={[
          { label: "Empty Icons", icon: "", iconAfter: "" },
          { label: "Falsy Icons", icon: 0, iconAfter: false },
        ]}
      />,
    );

    expect(screen.queryByTestId("mock-icon-empty")).not.toBeInTheDocument();
    expect(
      screen.getByText("Falsy Icons", {
        selector: '[data-slot="button"]',
        exact: false,
      }),
    ).toHaveTextContent("0Falsy Icons");
  });

  it("renders features when provided", () => {
    const features = [
      { iconName: "lucide/check", text: "Easy Integration" },
      { iconName: "lucide/check", text: "24/7 Support" },
    ];
    render(<CtaFeatureList features={features} />);
    expect(screen.getByText("Easy Integration")).toBeInTheDocument();
    expect(screen.getByText("24/7 Support")).toBeInTheDocument();
    expect(screen.getAllByTestId("mock-icon-lucide/check")).toHaveLength(2);
    expect(screen.queryByText("lucide/check")).not.toBeInTheDocument();
  });

  it("preserves feature icon overrides, custom elements, and empty-name branches", () => {
    render(
      <CtaFeatureList
        features={[
          {
            text: "Named Override",
            icon: "lucide/shield-check",
            iconName: "lucide/check",
          },
          {
            text: "Custom Override",
            icon: <span data-testid="custom-feature-icon" />,
            iconName: "lucide/check",
          },
          { text: "Empty Legacy Name", iconName: "" },
          {
            text: "Empty Override",
            icon: "",
            iconName: "lucide/check",
          },
          {
            text: "Zero Override",
            icon: 0,
            iconName: "lucide/check",
          },
          {
            text: "False Override",
            icon: false,
            iconName: "lucide/check",
          },
        ]}
      />,
    );

    expect(
      screen.getByTestId("mock-icon-lucide/shield-check"),
    ).toBeInTheDocument();
    expect(screen.queryByText("lucide/shield-check")).not.toBeInTheDocument();
    expect(screen.getByTestId("custom-feature-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon-empty")).not.toBeInTheDocument();
    expect(
      screen.getByText("Zero Override").closest("li"),
    ).toHaveTextContent("0Zero Override");
    expect(
      screen.queryByTestId("mock-icon-lucide/check"),
    ).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaFeatureList className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
