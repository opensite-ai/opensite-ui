import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaSimpleCentered } from "../cta-simple-centered";

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
        data-testid="mock-icon"
        data-name={name}
        data-size={size}
        className={className}
      >
        icon
      </span>
    ) : (
      <>{name}</>
    ),
}));

describe("CtaSimpleCentered", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<CtaSimpleCentered heading="Test Heading" description="Test Description" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaSimpleCentered heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaSimpleCentered description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/signup", variant: "default" as const },
      { label: "Learn More", href: "/about", variant: "outline" as const },
    ];
    render(<CtaSimpleCentered actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("renders explicit action icon names without the default arrow", () => {
    const { container } = render(
      <CtaSimpleCentered
        actions={[
          {
            label: "Explore",
            href: "/icons",
            icon: "lucide/arrow-left",
            iconAfter: "lucide/chevron-right",
          },
        ]}
      />,
    );

    expect(
      screen
        .getAllByTestId("mock-icon")
        .map((icon) => icon.getAttribute("data-name")),
    ).toEqual(["lucide/arrow-left", "lucide/chevron-right"]);
    expect(
      container.querySelector('[data-name="lucide/arrow-right"]'),
    ).not.toBeInTheDocument();
    const action = container.querySelector('a[href="/icons"]');
    expect(action).not.toHaveTextContent("lucide/arrow-left");
    expect(action).not.toHaveTextContent("lucide/chevron-right");
  });

  it("preserves custom action icons and suppresses the default arrow", () => {
    render(
      <CtaSimpleCentered
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
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("keeps the default arrow for empty, false, and zero trailing icons", () => {
    const { container, rerender } = render(
      <CtaSimpleCentered
        actions={[
          {
            label: "Empty trailing",
            href: "/parity",
            icon: 0,
            iconAfter: "",
          },
        ]}
      />,
    );
    const getAction = () =>
      container.querySelector<HTMLAnchorElement>('a[href="/parity"]')!;
    const getArrow = () =>
      getAction().querySelector('[data-name="lucide/arrow-right"]');

    expect(getAction()).toHaveTextContent("0Empty trailing");
    expect(getArrow()).toHaveAttribute("data-size", "16");
    expect(getArrow()).toHaveClass("ml-2");

    rerender(
      <CtaSimpleCentered
        actions={[
          {
            label: "False trailing",
            href: "/parity",
            icon: false,
            iconAfter: false,
          },
        ]}
      />,
    );
    expect(getAction()).toHaveTextContent("False trailing");
    expect(getArrow()).toBeInTheDocument();

    rerender(
      <CtaSimpleCentered
        actions={[
          {
            label: "Zero trailing",
            href: "/parity",
            icon: "",
            iconAfter: 0,
          },
        ]}
      />,
    );
    expect(getAction()).toHaveTextContent("Zero trailing0");
    expect(getArrow()).toBeInTheDocument();
  });

  it("lets children replace icons, label, and the default arrow", () => {
    const { container } = render(
      <CtaSimpleCentered
        actions={[
          {
            label: "Generated label",
            href: "/children",
            icon: "lucide/rocket",
            children: (
              <span data-testid="custom-action-content">Custom action</span>
            ),
          },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-action-content")).toHaveTextContent(
      "Custom action",
    );
    expect(screen.queryByText("Generated label")).not.toBeInTheDocument();
    expect(
      container
        .querySelector('a[href="/children"]')
        ?.querySelector('[data-testid="mock-icon"]'),
    ).not.toBeInTheDocument();
  });

  it("lets actionsSlot replace generated actions", () => {
    render(
      <CtaSimpleCentered
        actions={[{ label: "Generated action", icon: "lucide/rocket" }]}
        actionsSlot={<div data-testid="custom-actions-slot">Custom slot</div>}
      />,
    );

    expect(screen.getByTestId("custom-actions-slot")).toHaveTextContent(
      "Custom slot",
    );
    expect(screen.queryByText("Generated action")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaSimpleCentered className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
