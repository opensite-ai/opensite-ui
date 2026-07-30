import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PricingServicesCards } from "../pricing-services-cards";

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href?: string;
    className?: string;
  }) => (
    <a href={href} className={className} data-testid="mock-pressable">
      {children}
    </a>
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

describe("PricingServicesCards", () => {
  it("preserves feature precedence, names, size, and classes", () => {
    const { rerender } = render(
      <PricingServicesCards
        featureIcon="lucide/global-raw"
        featureIconName="lucide/global-name"
        featureIconClassName="global-icon-class"
        plans={[
          {
            name: "Service",
            features: [
              {
                text: "Local raw",
                icon: "lucide/local-raw",
                iconName: "lucide/local-name",
                iconClassName: "local-icon-class",
              },
              { text: "Global raw", iconName: "lucide/local-name" },
            ],
          },
        ]}
      />,
    );

    const localRaw = screen.getByTestId("mock-icon-lucide/local-raw");
    expect(localRaw).toHaveAttribute("data-size", "18");
    expect(localRaw).toHaveClass(
      "mt-0.5",
      "shrink-0",
      "text-primary",
      "global-icon-class",
      "local-icon-class",
    );
    expect(
      screen
        .getByText("Global raw")
        .closest("li")
        ?.querySelector('[data-name="lucide/global-raw"]'),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Local raw").closest("li"),
    ).not.toHaveTextContent("lucide/local-raw");
    expect(
      screen.queryByTestId("mock-icon-lucide/local-name"),
    ).not.toBeInTheDocument();

    rerender(
      <PricingServicesCards
        featureIconName="lucide/global-name"
        plans={[
          {
            name: "Service",
            features: [
              { text: "Local name", iconName: "lucide/local-name" },
              { text: "Global name" },
            ],
          },
        ]}
      />,
    );

    expect(screen.getByTestId("mock-icon-lucide/local-name")).toHaveAttribute(
      "data-size",
      "18",
    );
    expect(screen.getByTestId("mock-icon-lucide/global-name")).toBeInTheDocument();
  });

  it("preserves custom, empty, false, and zero feature overrides", () => {
    const { container } = render(
      <PricingServicesCards
        featureIconName="lucide/global-name"
        plans={[
          {
            name: "Service",
            features: [
              {
                text: "Custom",
                icon: <span data-testid="custom-feature-icon" />,
                iconName: "lucide/custom-fallback",
              },
              { text: "Empty", icon: "", iconName: "lucide/empty-fallback" },
              { text: "False", icon: false, iconName: "lucide/false-fallback" },
              { text: "Zero", icon: 0, iconName: "lucide/zero-fallback" },
            ],
          },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-feature-icon")).toBeInTheDocument();
    expect(
      screen
        .getByText("Empty")
        .closest("li")
        ?.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
    expect(
      screen
        .getByText("False")
        .closest("li")
        ?.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Zero").closest("li")).toHaveTextContent("0Zero");
    expect(
      container.querySelector('[data-name*="fallback"]'),
    ).not.toBeInTheDocument();
  });

  it("routes plan icons while preserving the original truthy wrapper", () => {
    const { container } = render(
      <PricingServicesCards
        planIconWrapperClassName="global-wrapper-class"
        plans={[
          {
            name: "Raw",
            icon: "lucide/briefcase",
            iconName: "lucide/raw-fallback",
            iconClassName: "plan-icon-class",
            iconWrapperClassName: "local-wrapper-class",
          },
          { name: "Named", iconName: "lucide/users" },
          {
            name: "Custom",
            icon: <span data-testid="custom-plan-icon" />,
          },
          { name: "Empty", icon: "", iconName: "lucide/empty-fallback" },
          { name: "False", icon: false, iconName: "lucide/false-fallback" },
          { name: "Zero", icon: 0, iconName: "lucide/zero-fallback" },
          { name: "Empty name", iconName: "" },
        ]}
      />,
    );

    const raw = screen.getByTestId("mock-icon-lucide/briefcase");
    expect(raw).toHaveAttribute("data-size", "24");
    expect(raw).toHaveClass("plan-icon-class");
    expect(raw.parentElement).toHaveClass(
      "h-12",
      "w-12",
      "global-wrapper-class",
      "local-wrapper-class",
    );
    expect(
      screen.getByText("Raw").closest(".rounded-2xl"),
    ).not.toHaveTextContent("lucide/briefcase");

    expect(screen.getByTestId("mock-icon-lucide/users")).toHaveAttribute(
      "data-size",
      "24",
    );
    expect(screen.getByTestId("custom-plan-icon").parentElement).toHaveClass(
      "h-12",
      "w-12",
    );

    for (const name of ["Empty", "False", "Zero", "Empty name"]) {
      expect(
        screen
          .getByText(name)
          .closest(".rounded-2xl")
          ?.querySelector(".h-12.w-12"),
      ).not.toBeInTheDocument();
    }
    expect(
      screen.getByText("Zero").closest(".rounded-2xl"),
    ).toHaveTextContent("0Zero");
    expect(
      container.querySelector('[data-name*="fallback"]'),
    ).not.toBeInTheDocument();
  });

  it("routes plan action icons and preserves edges, children, and actionSlot", () => {
    const { container } = render(
      <PricingServicesCards
        plans={[
          {
            name: "Icons",
            action: {
              href: "/icons",
              label: "Action",
              icon: "lucide/rocket",
              iconAfter: "lucide/arrow-right",
            },
          },
          {
            name: "Custom",
            action: {
              href: "/custom",
              label: "Custom",
              icon: <span data-testid="custom-leading" />,
              iconAfter: <span data-testid="custom-trailing" />,
            },
          },
          {
            name: "Falsy",
            action: {
              href: "/falsy",
              label: "Falsy",
              icon: false,
              iconAfter: 0,
            },
          },
          {
            name: "Empty",
            action: {
              href: "/empty",
              label: "Empty",
              icon: "",
              iconAfter: "",
            },
          },
          {
            name: "Children",
            action: {
              href: "/children",
              label: "Hidden label",
              icon: "lucide/hidden-leading",
              iconAfter: "lucide/hidden-trailing",
              children: <span data-testid="action-children">Replacement</span>,
            },
          },
          {
            name: "Slot",
            action: { label: "Hidden action" },
            actionSlot: <span data-testid="action-slot">Slot</span>,
          },
        ]}
      />,
    );

    const action = container.querySelector('a[href="/icons"]')!;
    expect(
      action.querySelector('[data-name="lucide/rocket"]'),
    ).toBeInTheDocument();
    expect(
      action.querySelector('[data-name="lucide/arrow-right"]'),
    ).toBeInTheDocument();
    expect(action).not.toHaveTextContent("lucide/rocket");
    expect(action).not.toHaveTextContent("lucide/arrow-right");

    expect(
      container
        .querySelector('a[href="/custom"]')
        ?.querySelector('[data-testid="custom-leading"]'),
    ).toBeInTheDocument();
    expect(
      container
        .querySelector('a[href="/custom"]')
        ?.querySelector('[data-testid="custom-trailing"]'),
    ).toBeInTheDocument();

    const falsyAction = container.querySelector('a[href="/falsy"]')!;
    expect(falsyAction).toHaveTextContent("Falsy0");
    expect(
      falsyAction.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
    expect(
      container
        .querySelector('a[href="/empty"]')
        ?.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();

    expect(screen.getByTestId("action-children")).toBeInTheDocument();
    expect(screen.queryByText("Hidden label")).not.toBeInTheDocument();
    expect(
      container
        .querySelector('a[href="/children"]')
        ?.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("action-slot")).toBeInTheDocument();
    expect(screen.queryByText("Hidden action")).not.toBeInTheDocument();
  });
});
