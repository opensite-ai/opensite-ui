import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaFeatureChecklist } from "../cta-feature-checklist";

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

describe("CtaFeatureChecklist", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<CtaFeatureChecklist heading="Test Heading" description="Test Description" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaFeatureChecklist heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaFeatureChecklist description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/signup", variant: "default" as const },
    ];
    render(<CtaFeatureChecklist actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("renders checklist items when provided", () => {
    const items = ["Easy Integration", "24/7 Support", "Scalable Performance"];
    render(<CtaFeatureChecklist items={items} />);
    expect(screen.getByText("Easy Integration")).toBeInTheDocument();
    expect(screen.getByText("24/7 Support")).toBeInTheDocument();
    expect(screen.getByText("Scalable Performance")).toBeInTheDocument();
  });

  it("routes a checklist icon name through DynamicIcon without exposing raw text", () => {
    render(
      <CtaFeatureChecklist
        items={[
          {
            text: "Protected",
            icon: "lucide/shield-check",
            iconName: "lucide/check",
          },
        ]}
      />,
    );

    expect(
      screen.getByTestId("mock-icon-lucide/shield-check"),
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/check"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("lucide/shield-check")).not.toBeInTheDocument();
  });

  it("preserves a custom checklist icon element", () => {
    render(
      <CtaFeatureChecklist
        items={[
          {
            text: "Custom",
            icon: <span data-testid="custom-checklist-icon" />,
            iconName: "lucide/check",
          },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-checklist-icon")).toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/check"),
    ).not.toBeInTheDocument();
  });

  it("preserves checklist default, empty-string, and falsy override precedence", () => {
    render(
      <CtaFeatureChecklist
        items={[
          "Default",
          { text: "Empty legacy name", iconName: "" },
          {
            text: "Empty override",
            icon: "",
            iconName: "lucide/shield",
          },
          {
            text: "Zero override",
            icon: 0,
            iconName: "lucide/shield",
          },
          {
            text: "False override",
            icon: false,
            iconName: "lucide/shield",
          },
        ]}
      />,
    );

    expect(
      screen.getAllByTestId("mock-icon-lucide/check"),
    ).toHaveLength(2);
    expect(screen.queryByTestId("mock-icon-empty")).not.toBeInTheDocument();
    expect(
      screen.getByText("Zero override", { exact: false }),
    ).toHaveTextContent("0Zero override");
    expect(
      screen.queryByTestId("mock-icon-lucide/shield"),
    ).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaFeatureChecklist className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
