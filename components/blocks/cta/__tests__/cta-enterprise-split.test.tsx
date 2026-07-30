import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaEnterpriseSplit } from "../cta-enterprise-split";

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

describe("CtaEnterpriseSplit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<CtaEnterpriseSplit heading="Test Heading" description="Test Description" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaEnterpriseSplit heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaEnterpriseSplit description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/signup", variant: "default" as const },
      { label: "Contact Sales", href: "/contact", variant: "outline" as const },
    ];
    render(<CtaEnterpriseSplit actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Contact Sales")).toBeInTheDocument();
  });

  it("renders action icon names dynamically without exposing raw text", () => {
    render(
      <CtaEnterpriseSplit
        actions={[
          {
            label: "Get Started",
            icon: "lucide/rocket",
            iconAfter: "lucide/external-link",
          },
        ]}
      />,
    );

    expect(screen.getByTestId("mock-icon-lucide/rocket")).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/external-link"),
    ).toBeInTheDocument();
    expect(screen.queryByText("lucide/rocket")).not.toBeInTheDocument();
    expect(screen.queryByText("lucide/external-link")).not.toBeInTheDocument();
  });

  it("preserves custom action icon elements", () => {
    render(
      <CtaEnterpriseSplit
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

  it("lets action children replace the complete generated action composition", () => {
    render(
      <CtaEnterpriseSplit
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
      <CtaEnterpriseSplit
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
      <CtaEnterpriseSplit actions={[{ label: "Get Started" }]} />,
    );

    const defaultArrow = screen.getByTestId("mock-icon-lucide/arrow-right");
    expect(defaultArrow).toBeInTheDocument();
    expect(defaultArrow).toHaveAttribute("data-size", "16");
    expect(defaultArrow).toHaveClass("ml-2");

    rerender(
      <CtaEnterpriseSplit
        actions={[
          {
            label: "Get Started",
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
      <CtaEnterpriseSplit
        actions={[{ label: "Get Started", icon: "", iconAfter: "" }]}
      />,
    );

    expect(screen.queryByTestId("mock-icon-")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/arrow-right"),
    ).not.toBeInTheDocument();
  });

  it("renders links when provided", () => {
    const links = [
      { iconName: "lucide/file-text", title: "Documentation", description: "Read our docs", href: "/docs" },
      { iconName: "lucide/play", title: "Demo", description: "Try our demo", href: "/demo" },
    ];
    render(<CtaEnterpriseSplit links={links} />);
    expect(screen.getByText("Documentation")).toBeInTheDocument();
    expect(screen.getByText("Read our docs")).toBeInTheDocument();
    expect(screen.getByText("Demo")).toBeInTheDocument();
  });

  it("preserves link icon override, fallback, custom, and empty-name behavior", () => {
    render(
      <CtaEnterpriseSplit
        links={[
          {
            title: "Override",
            icon: "lucide/file-check",
            iconName: "lucide/legacy-file",
          },
          {
            title: "Fallback",
            iconName: "lucide/book-copy",
          },
          {
            title: "Custom",
            icon: <span data-testid="custom-link-icon" />,
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

    expect(
      screen.getByTestId("mock-icon-lucide/file-check"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/book-copy"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("custom-link-icon")).toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/legacy-file"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/legacy-custom"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/suppressed-fallback"),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon-")).not.toBeInTheDocument();
    expect(screen.queryByText("lucide/file-check")).not.toBeInTheDocument();
    expect(screen.queryByText("lucide/book-copy")).not.toBeInTheDocument();
    expect(
      screen.getAllByTestId("mock-icon-lucide/arrow-right"),
    ).toHaveLength(5);
  });

  it("applies custom className", () => {
    const { container } = render(<CtaEnterpriseSplit className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
