import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { BannerPromoCta } from "../banner-promo-cta";

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, size }: { name?: React.ReactNode | string; size?: number }) =>
    typeof name === "string" ? (
      <span data-testid="mock-icon" data-name={name} data-size={size} />
    ) : (
      <>{name}</>
    ),
}));

describe("BannerPromoCta", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with custom props", () => {
    render(
      <BannerPromoCta
        message="Summer Sale"
        discount="Up to 70% off"
        actions={[{ label: "Buy Now", href: "/summer-sale" }]}
      />
    );
    expect(screen.getByText("Summer Sale")).toBeInTheDocument();
    expect(screen.getByText("Up to 70% off")).toBeInTheDocument();
    expect(screen.getByText("Buy Now")).toBeInTheDocument();
  });

  it("routes action icons through DynamicIcon while preserving sentinels and children", () => {
    render(
      <BannerPromoCta
        actions={[
          {
            label: "String action",
            icon: "lucide/before",
            iconAfter: "lucide/after",
          },
          {
            label: "Custom action",
            icon: <span data-testid="custom-before" />,
            iconAfter: <span data-testid="custom-after" />,
          },
          { label: "Sentinel action", icon: 0, iconAfter: false },
          { label: "Empty action", icon: "", iconAfter: "" },
          {
            label: "Hidden label",
            icon: "lucide/ignored-before",
            iconAfter: "lucide/ignored-after",
            children: <span data-testid="custom-children">Custom children</span>,
          },
        ]}
      />,
    );

    const stringAction = screen.getByText("String action").closest("a") as HTMLElement;
    expect(
      stringAction.querySelector('[data-name="lucide/before"]'),
    ).not.toHaveAttribute("data-size");
    expect(
      stringAction.querySelector('[data-name="lucide/after"]'),
    ).toBeInTheDocument();
    expect(stringAction).not.toHaveTextContent("lucide/before");
    expect(stringAction).not.toHaveTextContent("lucide/after");
    expect(screen.getByTestId("custom-before")).toBeInTheDocument();
    expect(screen.getByTestId("custom-after")).toBeInTheDocument();
    const sentinelAction = screen
      .getAllByTestId("mock-pressable")
      .find((element) => element.textContent === "0Sentinel action");
    expect(sentinelAction).toHaveTextContent("0Sentinel action");
    expect(
      within(screen.getByText("Empty action").closest("a") as HTMLElement).queryByTestId(
        "mock-icon",
      ),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("custom-children")).toBeInTheDocument();
    expect(screen.queryByText("Hidden label")).not.toBeInTheDocument();
    expect(
      document.querySelector('[data-name="lucide/ignored-before"]'),
    ).not.toBeInTheDocument();
    expect(
      document.querySelector('[data-name="lucide/ignored-after"]'),
    ).not.toBeInTheDocument();
  });

  it("preserves truthy actionsSlot precedence and falsy-slot fallback", () => {
    const { rerender } = render(
      <BannerPromoCta
        actions={[{ label: "Generated action", icon: "lucide/generated" }]}
        actionsSlot={false}
      />,
    );

    expect(screen.getByText("Generated action")).toBeInTheDocument();
    expect(
      document.querySelector('[data-name="lucide/generated"]'),
    ).toBeInTheDocument();

    rerender(
      <BannerPromoCta
        actions={[{ label: "Generated action", icon: "lucide/generated" }]}
        actionsSlot={<span data-testid="actions-slot">Custom actions</span>}
      />,
    );

    expect(screen.getByTestId("actions-slot")).toBeInTheDocument();
    expect(screen.queryByText("Generated action")).not.toBeInTheDocument();
    expect(
      document.querySelector('[data-name="lucide/generated"]'),
    ).not.toBeInTheDocument();
  });
});
