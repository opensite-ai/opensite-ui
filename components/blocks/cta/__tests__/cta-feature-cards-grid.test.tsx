import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaFeatureCardsGrid } from "../cta-feature-cards-grid";

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
      <span data-testid={`mock-icon-${name}`} className={className} />
    ) : (
      <>{name}</>
    ),
}));

describe("CtaFeatureCardsGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<CtaFeatureCardsGrid heading="Test Heading" description="Test Description" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaFeatureCardsGrid heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaFeatureCardsGrid description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/signup", variant: "default" as const },
      { label: "Learn More", href: "/about", variant: "outline" as const },
    ];
    render(<CtaFeatureCardsGrid actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("renders action icon names dynamically without exposing raw text", () => {
    render(
      <CtaFeatureCardsGrid
        actions={[
          {
            label: "Get Started",
            icon: "lucide/rocket",
            iconAfter: "lucide/arrow-up-right",
          },
        ]}
      />,
    );

    expect(screen.getByTestId("mock-icon-lucide/rocket")).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/arrow-up-right"),
    ).toBeInTheDocument();
    expect(screen.queryByText("lucide/rocket")).not.toBeInTheDocument();
    expect(screen.queryByText("lucide/arrow-up-right")).not.toBeInTheDocument();
  });

  it("preserves custom and empty action icon behavior", () => {
    render(
      <CtaFeatureCardsGrid
        actions={[
          {
            label: "Custom",
            icon: <span data-testid="custom-leading-icon" />,
            iconAfter: <span data-testid="custom-trailing-icon" />,
          },
          {
            label: "Empty",
            icon: "",
            iconAfter: "",
          },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-trailing-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon-")).not.toBeInTheDocument();
  });

  it("renders features when provided", () => {
    const features = [
      { iconName: "lucide/zap", title: "Fast", description: "Lightning fast performance" },
      { iconName: "lucide/shield", title: "Secure", description: "Enterprise security" },
    ];
    render(<CtaFeatureCardsGrid features={features} />);
    expect(screen.getByText("Fast")).toBeInTheDocument();
    expect(screen.getByText("Lightning fast performance")).toBeInTheDocument();
    expect(screen.getByText("Secure")).toBeInTheDocument();
  });

  it("preserves feature icon override, fallback, custom, and empty-name behavior", () => {
    render(
      <CtaFeatureCardsGrid
        features={[
          {
            title: "Override",
            icon: "lucide/zap",
            iconName: "lucide/legacy-zap",
          },
          {
            title: "Fallback",
            iconName: "lucide/shield",
          },
          {
            title: "Custom",
            icon: <span data-testid="custom-feature-icon" />,
            iconName: "lucide/legacy-custom",
          },
          {
            title: "Empty override",
            icon: "",
            iconName: "lucide/suppressed-fallback",
          },
          {
            title: "Empty fallback",
            iconName: "",
          },
        ]}
      />,
    );

    expect(screen.getByTestId("mock-icon-lucide/zap")).toBeInTheDocument();
    expect(screen.getByTestId("mock-icon-lucide/shield")).toBeInTheDocument();
    expect(screen.getByTestId("custom-feature-icon")).toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/legacy-zap"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/legacy-custom"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/suppressed-fallback"),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon-")).not.toBeInTheDocument();
    expect(screen.queryByText("lucide/zap")).not.toBeInTheDocument();
    expect(screen.queryByText("lucide/shield")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaFeatureCardsGrid className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
