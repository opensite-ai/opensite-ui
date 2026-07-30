import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ServicesListCenteredIcons } from "../services-list-centered-icons";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    className,
    size,
  }: {
    name?: React.ReactNode;
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

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("ServicesListCenteredIcons", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom heading and description", () => {
    const { getByText } = render(
      <ServicesListCenteredIcons
        heading="Custom Heading"
        description="Custom Description"
      />
    );
    expect(getByText("Custom Heading")).toBeInTheDocument();
    expect(getByText("Custom Description")).toBeInTheDocument();
  });

  it("routes truthy icons through DynamicIcon and preserves persistent wrappers", () => {
    const { container } = render(
      <ServicesListCenteredIcons
        iconClassName="icon-shell"
        services={[
          {
            title: "Raw",
            icon: "lucide/compass",
            iconName: "lucide/ignored",
            className: "raw-service",
          },
          {
            title: "Custom",
            icon: <span data-testid="custom-icon">custom</span>,
            iconName: "lucide/ignored-custom",
            className: "custom-service",
          },
          {
            title: "Empty fallback",
            icon: "",
            iconName: "lucide/empty-fallback",
            className: "empty-fallback-service",
          },
          {
            title: "False fallback",
            icon: false,
            iconName: "lucide/false-fallback",
            className: "false-fallback-service",
          },
          {
            title: "Zero fallback",
            icon: 0,
            iconName: "lucide/zero-fallback",
            className: "zero-fallback-service",
          },
          { title: "Empty only", icon: "", className: "empty-service" },
          { title: "False only", icon: false, className: "false-service" },
          { title: "Zero only", icon: 0, className: "zero-service" },
        ]}
      />,
    );

    const rawShell = container.querySelector(
      ".raw-service .icon-shell",
    ) as HTMLElement;
    const rawIcon = within(rawShell).getByTestId("mock-icon");
    expect(rawIcon).toHaveAttribute("data-name", "lucide/compass");
    expect(rawIcon).toHaveClass("h-8", "w-8");
    expect(
      within(rawShell).queryByText("lucide/compass"),
    ).not.toBeInTheDocument();
    expect(
      within(
        container.querySelector(".custom-service .icon-shell") as HTMLElement,
      ).getByTestId("custom-icon"),
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-name="lucide/ignored-custom"]'),
    ).not.toBeInTheDocument();

    for (const [selector, name] of [
      [".empty-fallback-service", "lucide/empty-fallback"],
      [".false-fallback-service", "lucide/false-fallback"],
      [".zero-fallback-service", "lucide/zero-fallback"],
    ]) {
      expect(
        within(
          container.querySelector(`${selector} .icon-shell`) as HTMLElement,
        ).getByTestId("mock-icon"),
      ).toHaveAttribute("data-name", name);
    }

    expect(container.querySelectorAll(".icon-shell")).toHaveLength(8);
    for (const selector of [
      ".empty-service",
      ".false-service",
      ".zero-service",
    ]) {
      const shell = container.querySelector(
        `${selector} .icon-shell`,
      ) as HTMLElement;
      expect(shell).toBeEmptyDOMElement();
    }
  });

  it("preserves truthy service slots and falsy slot fallback", () => {
    const services = [{ title: "Array service", icon: "lucide/array" }];
    const { rerender } = render(
      <ServicesListCenteredIcons services={services} servicesSlot={false} />,
    );
    expect(screen.getByText("Array service")).toBeInTheDocument();

    rerender(
      <ServicesListCenteredIcons
        services={services}
        servicesSlot={<div>Custom services slot</div>}
      />,
    );
    expect(screen.getByText("Custom services slot")).toBeInTheDocument();
    expect(screen.queryByText("Array service")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("keeps service items on their content path", () => {
    const { container } = render(
      <ServicesListCenteredIcons
        services={[
          {
            title: "Content boundaries",
            items: ["lucide/item-copy"],
          },
        ]}
      />,
    );
    expect(screen.getByText("lucide/item-copy")).toBeInTheDocument();
    expect(
      container.querySelector('[data-name="lucide/item-copy"]'),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });
});
