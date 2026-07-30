import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { BannerSocialFollow } from "../banner-social-follow";

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({ children, onClick, href, className }: { children: React.ReactNode; onClick?: () => void; href?: string; className?: string }) => (
    <button onClick={onClick} data-href={href} className={className} data-testid="mock-pressable">{children}</button>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, size, className }: { name?: React.ReactNode | string; size?: number; className?: string }) =>
    typeof name === "string" ? (
      <span data-testid="mock-icon" data-name={name} data-size={size} className={className} />
    ) : (
      <>{name}</>
    ),
}));

describe("BannerSocialFollow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with custom props", () => {
    render(
      <BannerSocialFollow
        message="Join our community!"
        actions={[{ label: "Connect Now", href: "#", variant: "secondary", size: "sm" }]}
      />
    );
    expect(screen.getByText("Join our community!")).toBeInTheDocument();
    expect(screen.getByText("Connect Now")).toBeInTheDocument();
  });

  it("routes main and dismiss icons through DynamicIcon with truthy fallbacks", () => {
    const { container, rerender } = render(
      <BannerSocialFollow
        message="Icon banner"
        icon="lucide/social"
        iconName="lucide/ignored"
        iconClassName="custom-icon-class"
        dismissIcon="lucide/dismiss"
      />,
    );

    expect(container.querySelector('[data-name="lucide/social"]')).toHaveAttribute(
      "data-size",
      "20",
    );
    expect(container.querySelector('[data-name="lucide/social"]')).toHaveClass(
      "shrink-0",
      "custom-icon-class",
    );
    expect(container.querySelector('[data-name="lucide/dismiss"]')).toHaveAttribute(
      "data-size",
      "16",
    );
    expect(container.querySelector('[data-name="lucide/ignored"]')).not.toBeInTheDocument();
    const mainIconContainer = screen.getByText("Icon banner").parentElement as HTMLElement;
    const dismissButton = screen
      .getByText("Dismiss banner")
      .closest("button") as HTMLElement;
    expect(mainIconContainer).not.toHaveTextContent("lucide/social");
    expect(dismissButton).not.toHaveTextContent("lucide/dismiss");

    rerender(
      <BannerSocialFollow
        message="Icon banner"
        icon={<span data-testid="custom-main-icon" />}
        iconName="lucide/ignored-custom"
        dismissIcon={<span data-testid="custom-dismiss-icon" />}
      />,
    );
    expect(screen.getByTestId("custom-main-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-dismiss-icon")).toBeInTheDocument();
    expect(
      container.querySelector('[data-name="lucide/ignored-custom"]'),
    ).not.toBeInTheDocument();

    for (const [icon, iconName] of [
      ["", "lucide/empty-fallback"],
      [false, "lucide/false-fallback"],
      [0, "lucide/zero-fallback"],
    ] as const) {
      rerender(
        <BannerSocialFollow
          message="Icon banner"
          icon={icon}
          iconName={iconName}
          dismissIcon={icon}
        />,
      );
      expect(container.querySelector(`[data-name="${iconName}"]`)).toHaveAttribute(
        "data-size",
        "20",
      );
      expect(container.querySelector('[data-name="mynaui/x"]')).toHaveAttribute(
        "data-size",
        "16",
      );
    }
  });

  it("preserves action sentinels, children, slots, and dismissal", () => {
    const onDismiss = vi.fn();
    const { container, rerender } = render(
      <BannerSocialFollow
        message="Actions"
        onDismiss={onDismiss}
        actions={[
          {
            label: "String action",
            icon: "lucide/before",
            iconAfter: "lucide/after",
          },
          { label: "Sentinel action", icon: 0, iconAfter: false },
          { label: "Empty action", icon: "", iconAfter: "" },
          {
            label: "Hidden action",
            icon: "lucide/ignored-before",
            iconAfter: "lucide/ignored-after",
            children: <span data-testid="custom-children">Custom children</span>,
          },
        ]}
        actionsSlot={false}
      />,
    );

    const stringAction = screen.getByText("String action").closest("button") as HTMLElement;
    expect(stringAction.querySelector('[data-name="lucide/before"]')).toBeInTheDocument();
    expect(stringAction.querySelector('[data-name="lucide/after"]')).toBeInTheDocument();
    expect(stringAction).not.toHaveTextContent("lucide/before");
    expect(stringAction).not.toHaveTextContent("lucide/after");
    const sentinelAction = screen
      .getAllByTestId("mock-pressable")
      .find((element) => element.textContent === "0Sentinel action");
    expect(sentinelAction).toHaveTextContent("0Sentinel action");
    expect(
      within(screen.getByText("Empty action").closest("button") as HTMLElement).queryByTestId(
        "mock-icon",
      ),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("custom-children")).toBeInTheDocument();
    expect(screen.queryByText("Hidden action")).not.toBeInTheDocument();
    expect(
      container.querySelector('[data-name="lucide/ignored-before"]'),
    ).not.toBeInTheDocument();

    rerender(
      <BannerSocialFollow
        message="Actions"
        onDismiss={onDismiss}
        actions={[{ label: "Hidden generated", icon: "lucide/hidden" }]}
        actionsSlot={<span data-testid="actions-slot">Custom actions</span>}
      />,
    );
    expect(screen.getByTestId("actions-slot")).toBeInTheDocument();
    expect(screen.queryByText("Hidden generated")).not.toBeInTheDocument();
    expect(container.querySelector('[data-name="lucide/hidden"]')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Dismiss banner").closest("button") as HTMLElement);
    expect(onDismiss).toHaveBeenCalledOnce();
    expect(screen.queryByTestId("actions-slot")).not.toBeInTheDocument();
  });
});
