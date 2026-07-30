import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ContactFloatingBanner } from "../contact-floating-banner";

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
        data-testid="mock-icon"
        data-name={name}
        data-size={size}
        className={className}
      />
    ) : (
      <>{name}</>
    ),
}));

describe("ContactFloatingBanner", () => {
  it("renders custom button text", () => {
    render(<ContactFloatingBanner buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });

  it("routes the button icon through DynamicIcon and preserves custom nodes", () => {
    const { container, rerender } = render(
      <ContactFloatingBanner
        buttonText="String button"
        buttonHref="/string"
        buttonIcon="lucide/arrow-right"
      />,
    );

    let button = container.querySelector('[data-slot="button"]') as HTMLElement;
    expect(within(button).getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "lucide/arrow-right",
    );
    expect(button).not.toHaveTextContent("lucide/arrow-right");

    rerender(
      <ContactFloatingBanner
        buttonText="Custom button"
        buttonIcon={<span data-testid="custom-button-icon" />}
      />,
    );
    button = container.querySelector('[data-slot="button"]') as HTMLElement;
    expect(
      within(button).getByTestId("custom-button-icon"),
    ).toBeInTheDocument();

    rerender(
      <ContactFloatingBanner buttonText="Sentinel button" buttonIcon={0} />,
    );
    button = container.querySelector('[data-slot="button"]') as HTMLElement;
    expect(button).toHaveTextContent("Sentinel button0");
    expect(
      within(button).queryByTestId("mock-icon"),
    ).not.toBeInTheDocument();

    rerender(
      <ContactFloatingBanner buttonText="Empty button" buttonIcon="" />,
    );
    button = container.querySelector('[data-slot="button"]') as HTMLElement;
    expect(within(button).getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "",
    );
  });

  it("routes action icons through DynamicIcon while preserving ReactNode semantics", () => {
    const { container } = render(
      <ContactFloatingBanner
        actions={[
          {
            label: "String action",
            icon: "lucide/leading",
            iconAfter: "lucide/trailing",
            className: "string-action",
          },
          {
            label: "Custom action",
            icon: <span data-testid="custom-leading-icon" />,
            iconAfter: <span data-testid="custom-trailing-icon" />,
            className: "custom-action",
          },
          {
            label: "Sentinel action",
            icon: 0,
            iconAfter: 0,
            className: "sentinel-action",
          },
          {
            label: "Empty action",
            icon: "",
            iconAfter: false,
            className: "empty-action",
          },
          {
            label: "Hidden label",
            icon: "lucide/hidden",
            children: 0,
            className: "children-action",
          },
        ]}
      />,
    );

    const stringAction = container.querySelector(
      ".string-action",
    ) as HTMLElement;
    expect(
      within(stringAction).getAllByTestId("mock-icon").map((icon) =>
        icon.getAttribute("data-name"),
      ),
    ).toEqual(["lucide/leading", "lucide/trailing"]);
    expect(stringAction).not.toHaveTextContent("lucide/leading");
    expect(stringAction).not.toHaveTextContent("lucide/trailing");

    const customAction = container.querySelector(
      ".custom-action",
    ) as HTMLElement;
    expect(
      within(customAction).getByTestId("custom-leading-icon"),
    ).toBeInTheDocument();
    expect(
      within(customAction).getByTestId("custom-trailing-icon"),
    ).toBeInTheDocument();

    const sentinelAction = container.querySelector(
      ".sentinel-action",
    ) as HTMLElement;
    expect(sentinelAction).toHaveTextContent("0Sentinel action0");
    expect(
      within(sentinelAction).queryByTestId("mock-icon"),
    ).not.toBeInTheDocument();

    const emptyAction = container.querySelector(
      ".empty-action",
    ) as HTMLElement;
    expect(emptyAction).toHaveTextContent("Empty action");
    expect(
      within(emptyAction).queryByTestId("mock-icon"),
    ).not.toBeInTheDocument();

    const childrenAction = container.querySelector(
      ".children-action",
    ) as HTMLElement;
    expect(childrenAction).toHaveTextContent("0");
    expect(childrenAction).not.toHaveTextContent("Hidden label");
    expect(
      within(childrenAction).queryByTestId("mock-icon"),
    ).not.toBeInTheDocument();
  });
});
