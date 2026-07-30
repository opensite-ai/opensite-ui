import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { BannerFloatingOffer } from "../banner-floating-offer";

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({ children, onClick, href, className }: { children: React.ReactNode; onClick?: () => void; href?: string; className?: string }) => (
    <button onClick={onClick} data-href={href} className={className} data-testid="mock-pressable">{children}</button>
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

describe("BannerFloatingOffer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with custom props", () => {
    render(
      <BannerFloatingOffer
        offerTitle="Black Friday Deal"
        offerDescription="Save 70% on all plans"
        actions={[{ label: "Claim Now", href: "#" }]}
      />
    );
    expect(screen.getByText("Black Friday Deal")).toBeInTheDocument();
    expect(screen.getByText("Save 70% on all plans")).toBeInTheDocument();
    expect(screen.getByText(/Claim Now/)).toBeInTheDocument();
  });

  it("routes action and dismiss icon names without exposing raw text", () => {
    const { container } = render(
      <BannerFloatingOffer
        offerTitle="Icon offer"
        dismissible
        dismissIcon="lucide/circle-x"
        actions={[
          {
            label: "Claim",
            icon: "lucide/gift",
            iconAfter: "lucide/arrow-right",
          },
        ]}
      />,
    );

    const action = screen
      .getByText("Claim")
      .closest('[data-testid="mock-pressable"]') as HTMLElement;
    expect(
      within(action).getByTestId("mock-icon-lucide/gift"),
    ).toBeInTheDocument();
    expect(
      within(action).getByTestId("mock-icon-lucide/arrow-right"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("mock-icon-lucide/circle-x")).toHaveAttribute(
      "data-size",
      "16",
    );
    for (const iconName of [
      "lucide/gift",
      "lucide/arrow-right",
      "lucide/circle-x",
    ]) {
      expect(container).not.toHaveTextContent(iconName);
    }
  });

  it("preserves custom and falsy dismiss icon behavior", () => {
    const { rerender } = render(
      <BannerFloatingOffer
        dismissible
        dismissIcon={<span data-testid="custom-dismiss-icon" />}
      />,
    );

    expect(screen.getByTestId("custom-dismiss-icon")).toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-mynaui/x"),
    ).not.toBeInTheDocument();

    rerender(<BannerFloatingOffer dismissible dismissIcon="" />);
    expect(screen.getByTestId("mock-icon-mynaui/x")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon-")).not.toBeInTheDocument();

    rerender(<BannerFloatingOffer dismissible dismissIcon={0} />);
    expect(screen.getByTestId("mock-icon-mynaui/x")).toBeInTheDocument();

    rerender(<BannerFloatingOffer dismissible dismissIcon={false} />);
    expect(screen.getByTestId("mock-icon-mynaui/x")).toBeInTheDocument();
  });

  it("preserves custom, false, zero, and empty action icon values", () => {
    const { container } = render(
      <BannerFloatingOffer
        actions={[
          {
            label: "Custom",
            icon: <span data-testid="custom-leading-icon" />,
            iconAfter: <span data-testid="custom-trailing-icon" />,
          },
          {
            href: "/zero-icon",
            label: "Zero",
            icon: 0,
            iconAfter: "",
          },
          { label: "False", icon: false, iconAfter: false },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-trailing-icon")).toBeInTheDocument();
    const zeroAction = container.querySelector(
      '[data-href="/zero-icon"]',
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
      <BannerFloatingOffer
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
      <BannerFloatingOffer
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
    const zeroChildrenAction = container.querySelector(
      '[data-href="/zero"]',
    )!;
    expect(zeroChildrenAction).toHaveTextContent("0");
    expect(zeroChildrenAction).not.toHaveTextContent("Hidden by zero");
    expect(
      screen.queryByTestId("mock-icon-lucide/hidden-zero"),
    ).not.toBeInTheDocument();

    rerender(
      <BannerFloatingOffer
        actions={[{ label: "Hidden by slot", icon: "lucide/hidden-slot" }]}
        actionsSlot={<span data-testid="actions-slot">Slot action</span>}
      />,
    );
    expect(screen.getByTestId("actions-slot")).toBeInTheDocument();
    expect(screen.queryByText("Hidden by slot")).not.toBeInTheDocument();

    rerender(
      <BannerFloatingOffer
        actions={[{ label: "Falsy slot fallback" }]}
        actionsSlot={0}
      />,
    );
    expect(screen.getByText("Falsy slot fallback")).toBeInTheDocument();
  });

  it("keeps controlled dismiss visibility and callback behavior intact", () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <BannerFloatingOffer
        offerTitle="Dismiss this offer"
        dismissible
        open
        onOpenChange={onOpenChange}
      />,
    );

    fireEvent.click(screen.getByText("Dismiss banner").closest("button")!);

    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.getByText("Dismiss this offer")).toBeInTheDocument();

    rerender(
      <BannerFloatingOffer
        offerTitle="Dismiss this offer"
        dismissible
        open={false}
        onOpenChange={onOpenChange}
      />,
    );
    expect(screen.queryByText("Dismiss this offer")).not.toBeInTheDocument();
  });
});
