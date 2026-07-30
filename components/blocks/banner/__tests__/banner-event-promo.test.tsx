import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { BannerEventPromo } from "../banner-event-promo";

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    size,
    className,
  }: {
    name?: React.ReactNode | string;
    size?: number;
    className?: string;
  }) =>
    typeof name === "string" ? (
      <span
        data-testid={`mock-icon-${name}`}
        data-name={name}
        data-size={size}
        className={className}
      />
    ) : (
      <>{name}</>
    ),
}));

describe("BannerEventPromo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with custom props", () => {
    render(
      <BannerEventPromo
        eventName="TechSummit 2025"
        eventDetails="Join us in San Francisco for the biggest tech event."
        actions={[{ label: "Get Tickets", href: "#", variant: "ghost", size: "sm" }]}
      />
    );
    expect(screen.getByText("TechSummit 2025")).toBeInTheDocument();
    expect(screen.getByText(/Join us in San Francisco/)).toBeInTheDocument();
    expect(screen.getByText(/Get Tickets/)).toBeInTheDocument();
  });

  it("routes action icon names dynamically without exposing raw text", () => {
    render(
      <BannerEventPromo
        eventName="Icon event"
        actions={[
          {
            label: "Register",
            icon: "lucide/calendar",
            iconAfter: "lucide/arrow-right",
          },
        ]}
      />,
    );

    const action = screen
      .getByText("Register")
      .closest('[data-testid="mock-pressable"]') as HTMLElement;
    expect(
      within(action).getByTestId("mock-icon-lucide/calendar"),
    ).toBeInTheDocument();
    expect(
      within(action).getByTestId("mock-icon-lucide/arrow-right"),
    ).toBeInTheDocument();
    expect(action).not.toHaveTextContent("lucide/calendar");
    expect(action).not.toHaveTextContent("lucide/arrow-right");
  });

  it("preserves custom, false, zero, and empty action icon values", () => {
    const { container } = render(
      <BannerEventPromo
        actions={[
          {
            label: "Custom",
            icon: <span data-testid="custom-leading-icon" />,
            iconAfter: <span data-testid="custom-trailing-icon" />,
          },
          { href: "/zero-icon", label: "Zero", icon: 0, iconAfter: "" },
          { label: "False", icon: false, iconAfter: false },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-trailing-icon")).toBeInTheDocument();
    const zeroAction = container.querySelector(
      '[href="/zero-icon"]',
    ) as HTMLElement;
    expect(zeroAction).toHaveTextContent("0Zero");
    expect(within(zeroAction).queryByTestId(/mock-icon-/)).not.toBeInTheDocument();
    const falseAction = screen
      .getByText("False")
      .closest('[data-testid="mock-pressable"]') as HTMLElement;
    expect(within(falseAction).queryByTestId(/mock-icon-/)).not.toBeInTheDocument();
  });

  it("preserves nullish children composition and truthy action slot precedence", () => {
    const { container, rerender } = render(
      <BannerEventPromo
        actions={[
          {
            label: "Generated",
            icon: "lucide/hidden",
            children: <span data-testid="action-children">Replacement</span>,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("action-children")).toBeInTheDocument();
    expect(screen.queryByText("Generated")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/hidden"),
    ).not.toBeInTheDocument();

    rerender(
      <BannerEventPromo
        actions={[
          {
            href: "/zero",
            label: "Hidden by zero",
            icon: "lucide/hidden-zero",
            children: 0,
          },
        ]}
      />,
    );
    const zeroChildrenAction = container.querySelector('[href="/zero"]')!;
    expect(zeroChildrenAction).toHaveTextContent("0");
    expect(zeroChildrenAction).not.toHaveTextContent("Hidden by zero");
    expect(
      screen.queryByTestId("mock-icon-lucide/hidden-zero"),
    ).not.toBeInTheDocument();

    rerender(
      <BannerEventPromo
        actions={[{ label: "Hidden by slot", icon: "lucide/hidden-slot" }]}
        actionsSlot={<span data-testid="actions-slot">Slot action</span>}
      />,
    );
    expect(screen.getByTestId("actions-slot")).toBeInTheDocument();
    expect(screen.queryByText("Hidden by slot")).not.toBeInTheDocument();

    rerender(
      <BannerEventPromo
        actions={[{ label: "Falsy slot fallback" }]}
        actionsSlot={0}
      />,
    );
    expect(screen.getByText("Falsy slot fallback")).toBeInTheDocument();
  });
});
