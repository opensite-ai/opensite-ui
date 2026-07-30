import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { BannerGdprRights } from "../banner-gdpr-rights";

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

vi.mock("../../../ui/section", () => ({
  Section: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <section className={className} data-testid="mock-section">{children}</section>
  ),
}));

describe("BannerGdprRights", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with custom props", () => {
    render(
      <BannerGdprRights
        title="Data Privacy Notice"
        description="You have the right to manage your data."
        actions={[{ label: "Manage Settings", href: "#", variant: "link" }]}
      />
    );
    expect(screen.getByText("Data Privacy Notice")).toBeInTheDocument();
    expect(screen.getByText("You have the right to manage your data.")).toBeInTheDocument();
    expect(screen.getByText("Manage Settings").closest("button")).toHaveAttribute(
      "data-href",
      "#",
    );
  });

  it("routes main, action, and dismiss icon names without exposing raw text", () => {
    const { container } = render(
      <BannerGdprRights
        icon="lucide/scale"
        iconName="lucide/legacy"
        dismissIcon="lucide/circle-x"
        title="Rights"
        description="Review your rights."
        actions={[
          {
            label: "Manage",
            icon: "lucide/settings",
            iconAfter: "lucide/arrow-right",
          },
        ]}
      />,
    );

    expect(screen.getByTestId("mock-icon-lucide/scale")).toHaveAttribute(
      "data-size",
      "20",
    );
    expect(screen.getByTestId("mock-icon-lucide/circle-x")).toHaveAttribute(
      "data-size",
      "16",
    );
    const action = screen
      .getByText("Manage")
      .closest('[data-testid="mock-pressable"]') as HTMLElement;
    expect(
      within(action).getByTestId("mock-icon-lucide/settings"),
    ).toBeInTheDocument();
    expect(
      within(action).getByTestId("mock-icon-lucide/arrow-right"),
    ).toBeInTheDocument();
    for (const iconName of [
      "lucide/scale",
      "lucide/circle-x",
      "lucide/settings",
      "lucide/arrow-right",
    ]) {
      expect(container).not.toHaveTextContent(iconName);
    }
    expect(
      screen.queryByTestId("mock-icon-lucide/legacy"),
    ).not.toBeInTheDocument();
  });

  it("preserves custom icons and truthy fallback behavior for falsy values", () => {
    const { rerender } = render(
      <BannerGdprRights
        icon={<span data-testid="custom-main-icon" />}
        iconName="lucide/ignored-main"
        dismissIcon={<span data-testid="custom-dismiss-icon" />}
      />,
    );

    expect(screen.getByTestId("custom-main-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-dismiss-icon")).toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/ignored-main"),
    ).not.toBeInTheDocument();

    rerender(
      <BannerGdprRights
        icon=""
        iconName="lucide/empty-fallback"
        dismissIcon=""
      />,
    );
    expect(
      screen.getByTestId("mock-icon-lucide/empty-fallback"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("mock-icon-mynaui/x")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon-")).not.toBeInTheDocument();

    rerender(
      <BannerGdprRights
        icon={0}
        iconName="lucide/zero-fallback"
        dismissIcon={false}
      />,
    );
    expect(
      screen.getByTestId("mock-icon-lucide/zero-fallback"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("mock-icon-mynaui/x")).toBeInTheDocument();

    rerender(
      <BannerGdprRights
        icon={false}
        iconName="lucide/false-fallback"
      />,
    );
    expect(
      screen.getByTestId("mock-icon-lucide/false-fallback"),
    ).toBeInTheDocument();
  });

  it("preserves custom, false, zero, and empty action icon values", () => {
    const { container } = render(
      <BannerGdprRights
        description="Action sentinels"
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
      <BannerGdprRights
        description="Children"
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
      <BannerGdprRights
        description="Zero children"
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
      <BannerGdprRights
        description="Slot"
        actions={[{ label: "Hidden by slot", icon: "lucide/hidden-slot" }]}
        actionsSlot={<span data-testid="actions-slot">Slot action</span>}
      />,
    );
    expect(screen.getByTestId("actions-slot")).toBeInTheDocument();
    expect(screen.queryByText("Hidden by slot")).not.toBeInTheDocument();

    rerender(
      <BannerGdprRights
        description="Falsy slot"
        actions={[{ label: "Falsy slot fallback" }]}
        actionsSlot={0}
      />,
    );
    expect(screen.getByText("Falsy slot fallback")).toBeInTheDocument();
  });

  it("keeps dismiss behavior and callback intact", () => {
    const onDismiss = vi.fn();
    render(
      <BannerGdprRights title="Dismiss rights" onDismiss={onDismiss} />,
    );

    fireEvent.click(screen.getByText("Dismiss banner").closest("button")!);

    expect(onDismiss).toHaveBeenCalledOnce();
    expect(screen.queryByText("Dismiss rights")).not.toBeInTheDocument();
  });
});
