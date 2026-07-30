import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaAccentBackground } from "../cta-accent-background";

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

describe("CtaAccentBackground", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<CtaAccentBackground heading="Test Heading" description="Test Description" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaAccentBackground heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaAccentBackground description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Buy Now", href: "/pricing", variant: "default" as const },
      { label: "Contact Us", href: "/contact", variant: "outline" as const },
    ];
    render(<CtaAccentBackground actions={actions} />);
    expect(screen.getByText("Buy Now")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("renders action icon names through DynamicIcon without exposing raw text", () => {
    render(
      <CtaAccentBackground
        actions={[
          {
            label: "Explore",
            icon: "lucide/arrow-left",
            iconAfter: "lucide/arrow-right",
          },
        ]}
      />,
    );

    expect(
      screen
        .getAllByTestId("mock-icon")
        .map((icon) => icon.getAttribute("data-name")),
    ).toEqual(["lucide/arrow-left", "lucide/arrow-right"]);
    expect(screen.queryByText("lucide/arrow-left")).not.toBeInTheDocument();
    expect(screen.queryByText("lucide/arrow-right")).not.toBeInTheDocument();
  });

  it("preserves custom action icon elements", () => {
    render(
      <CtaAccentBackground
        actions={[
          {
            label: "Explore",
            icon: <span data-testid="custom-leading-icon">leading</span>,
            iconAfter: <span data-testid="custom-trailing-icon">trailing</span>,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-leading-icon")).toHaveTextContent(
      "leading",
    );
    expect(screen.getByTestId("custom-trailing-icon")).toHaveTextContent(
      "trailing",
    );
  });

  it("lets action children replace generated icon and label content", () => {
    render(
      <CtaAccentBackground
        actions={[
          {
            label: "Generated label",
            icon: "lucide/arrow-left",
            iconAfter: "lucide/arrow-right",
            children: <span>Custom action content</span>,
          },
        ]}
      />,
    );

    expect(screen.getByText("Custom action content")).toBeInTheDocument();
    expect(screen.queryByText("Generated label")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("renders actionsSlot instead of generated actions", () => {
    render(
      <CtaAccentBackground
        actions={[{ label: "Generated action" }]}
        actionsSlot={<span>Custom actions slot</span>}
      />,
    );

    expect(screen.getByText("Custom actions slot")).toBeInTheDocument();
    expect(screen.queryByText("Generated action")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaAccentBackground className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
