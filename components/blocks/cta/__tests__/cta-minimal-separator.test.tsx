import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaMinimalSeparator } from "../cta-minimal-separator";

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
  }: {
    name?: React.ReactNode | string;
  }) =>
    typeof name === "string" ? (
      <span data-testid={`mock-icon-${name}`} data-name={name} />
    ) : (
      <>{name}</>
    ),
}));

describe("CtaMinimalSeparator", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<CtaMinimalSeparator text="Test Text" />);
    expect(screen.getByText("Test Text")).toBeInTheDocument();
  });

  it("renders custom text", () => {
    render(<CtaMinimalSeparator text="Custom text content" />);
    expect(screen.getByText("Custom text content")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Sign Up", href: "/signup", variant: "default" as const },
    ];
    render(<CtaMinimalSeparator actions={actions} />);
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  it("renders leading and trailing action icon names without raw text", () => {
    render(
      <CtaMinimalSeparator
        actions={[
          {
            label: "Sign Up",
            icon: "lucide/user-plus",
            iconAfter: "lucide/arrow-right",
          },
        ]}
      />,
    );

    expect(
      screen.getByTestId("mock-icon-lucide/user-plus"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/arrow-right"),
    ).toBeInTheDocument();
    const action =
      screen.getByTestId("mock-icon-lucide/user-plus").parentElement!;
    expect(action).not.toHaveTextContent("lucide/user-plus");
    expect(action).not.toHaveTextContent("lucide/arrow-right");
  });

  it("preserves custom and falsy icons and lets children replace composition", () => {
    const { container, rerender } = render(
      <CtaMinimalSeparator
        actions={[
          {
            label: "Custom",
            icon: <span data-testid="custom-leading-icon" />,
            iconAfter: <span data-testid="custom-trailing-icon" />,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-trailing-icon")).toBeInTheDocument();

    rerender(
      <CtaMinimalSeparator
        actions={[
          {
            label: "Empty",
            href: "/empty",
            icon: "",
            iconAfter: "",
          },
          {
            label: "Falsy",
            href: "/falsy",
            icon: false,
            iconAfter: 0,
          },
        ]}
      />,
    );

    const emptyAction = container.querySelector('a[href="/empty"]')!;
    const falsyAction = container.querySelector('a[href="/falsy"]')!;
    expect(
      emptyAction.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
    expect(falsyAction).toHaveTextContent("Falsy0");
    expect(
      falsyAction.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();

    rerender(
      <CtaMinimalSeparator
        actions={[
          {
            label: "Generated Label",
            href: "/children",
            icon: "lucide/user-plus",
            iconAfter: "lucide/arrow-right",
            children: <span data-testid="action-children">Replacement</span>,
          },
        ]}
      />,
    );

    const childAction = container.querySelector('a[href="/children"]')!;
    expect(screen.getByTestId("action-children")).toBeInTheDocument();
    expect(screen.queryByText("Generated Label")).not.toBeInTheDocument();
    expect(
      childAction.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
  });

  it("lets actionsSlot replace the generated actions", () => {
    render(
      <CtaMinimalSeparator
        actions={[{ label: "Hidden Action" }]}
        actionsSlot={<div data-testid="actions-slot">Actions Slot</div>}
      />,
    );

    expect(screen.getByTestId("actions-slot")).toBeInTheDocument();
    expect(screen.queryByText("Hidden Action")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaMinimalSeparator className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
