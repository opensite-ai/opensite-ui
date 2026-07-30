import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PricingSingleCard } from "../pricing-single-card";

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

describe("PricingSingleCard", () => {
  it("preserves feature precedence, edge values, size, and inherited classes", () => {
    const { container } = render(
      <PricingSingleCard
        featureIcon="lucide/global-raw"
        featureIconName="lucide/legacy-global"
        featureIconClassName="global-icon-class"
        featureGroups={[
          {
            title: "Core",
            features: [
              {
                text: "Local raw",
                icon: "lucide/local-raw",
                iconName: "lucide/ignored-local",
                iconClassName: "local-icon-class",
              },
              {
                text: "Empty",
                icon: "",
                iconName: "lucide/ignored-empty",
              },
              {
                text: "False",
                icon: false,
                iconName: "lucide/ignored-false",
              },
              {
                text: "Zero",
                icon: 0,
                iconName: "lucide/ignored-zero",
              },
              {
                text: "Custom",
                icon: <span data-testid="custom-feature-icon" />,
                iconName: "lucide/ignored-custom",
              },
              { text: "Global raw" },
            ],
          },
        ]}
      />,
    );

    const localRaw = screen.getByTestId("mock-icon-lucide/local-raw");
    expect(localRaw).toHaveAttribute("data-size", "16");
    expect(localRaw).toHaveClass(
      "mt-0.5",
      "shrink-0",
      "text-primary",
      "global-icon-class",
      "local-icon-class",
    );
    expect(screen.getByTestId("mock-icon-lucide/global-raw")).toHaveAttribute(
      "data-size",
      "16",
    );
    expect(screen.getByTestId("custom-feature-icon")).toBeInTheDocument();
    expect(screen.getByText("Local raw").closest("li")).not.toHaveTextContent(
      "lucide/local-raw",
    );
    expect(screen.getByText("Zero").closest("li")).toHaveTextContent("0Zero");
    expect(
      container.querySelector('[data-name^="lucide/ignored-"]'),
    ).not.toBeInTheDocument();
    for (const text of ["Empty", "False"]) {
      expect(
        screen
          .getByText(text)
          .closest("li")
          ?.querySelector('[data-testid^="mock-icon-"]'),
      ).not.toBeInTheDocument();
    }
  });

  it("preserves local, global, and explicit empty named fallbacks", () => {
    const { container, rerender } = render(
      <PricingSingleCard
        featureIconName="lucide/global-name"
        featureGroups={[
          {
            features: [
              { text: "Local named", iconName: "lucide/local-name" },
              { text: "Global named" },
              { text: "Empty local name", iconName: "" },
            ],
          },
        ]}
      />,
    );

    expect(screen.getByTestId("mock-icon-lucide/local-name")).toHaveAttribute(
      "data-size",
      "16",
    );
    expect(screen.getAllByTestId("mock-icon-lucide/global-name")).toHaveLength(
      2,
    );

    rerender(
      <PricingSingleCard
        featureIconName=""
        featureGroups={[
          { features: [{ text: "No named icon", iconName: "" }] },
        ]}
      />,
    );
    expect(
      container.querySelector('[data-testid^="mock-icon-"]'),
    ).not.toBeInTheDocument();
  });

  it("routes both action icons and preserves custom, falsy, and children semantics", () => {
    const { container, rerender } = render(
      <PricingSingleCard
        action={{
          href: "/icons",
          label: "Choose",
          icon: "lucide/rocket",
          iconAfter: "lucide/arrow-right",
        }}
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

    rerender(
      <PricingSingleCard
        action={{
          href: "/custom",
          label: "Custom",
          icon: <span data-testid="custom-leading-icon" />,
          iconAfter: <span data-testid="custom-trailing-icon" />,
        }}
      />,
    );
    expect(screen.getByTestId("custom-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-trailing-icon")).toBeInTheDocument();

    rerender(
      <PricingSingleCard
        action={{
          href: "/falsy",
          label: "Falsy",
          icon: "",
          iconAfter: 0,
        }}
      />,
    );
    const falsyAction = container.querySelector('a[href="/falsy"]')!;
    expect(falsyAction).toHaveTextContent("Falsy0");
    expect(
      falsyAction.querySelector('[data-testid^="mock-icon-"]'),
    ).not.toBeInTheDocument();

    rerender(
      <PricingSingleCard
        action={{
          href: "/children",
          label: "Generated label",
          icon: "lucide/hidden-leading",
          iconAfter: "lucide/hidden-trailing",
          children: <span data-testid="action-children">Replacement</span>,
        }}
      />,
    );
    const childAction = container.querySelector('a[href="/children"]')!;
    expect(screen.getByTestId("action-children")).toBeInTheDocument();
    expect(screen.queryByText("Generated label")).not.toBeInTheDocument();
    expect(
      childAction.querySelector('[data-testid^="mock-icon-"]'),
    ).not.toBeInTheDocument();
  });

  it("preserves action and feature-group slot precedence", () => {
    const { rerender } = render(
      <PricingSingleCard
        action={{ label: "Hidden action" }}
        actionSlot={<span data-testid="action-slot">Action slot</span>}
      />,
    );
    expect(screen.getByTestId("action-slot")).toBeInTheDocument();
    expect(screen.queryByText("Hidden action")).not.toBeInTheDocument();

    rerender(
      <PricingSingleCard
        featureGroups={[
          { title: "Hidden group", features: [{ text: "Hidden feature" }] },
        ]}
        featureGroupsSlot={
          <span data-testid="feature-groups-slot">Feature groups slot</span>
        }
      />,
    );
    expect(screen.getByTestId("feature-groups-slot")).toBeInTheDocument();
    expect(screen.queryByText("Hidden group")).not.toBeInTheDocument();
    expect(screen.queryByText("Hidden feature")).not.toBeInTheDocument();
  });
});
