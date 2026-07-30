import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ServicesListVerticalTags } from "../services-list-vertical-tags";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    size,
    className,
  }: {
    name?: React.ReactNode;
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

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("ServicesListVerticalTags", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom heading and description", () => {
    const { getByText } = render(
      <ServicesListVerticalTags
        heading="Custom Heading"
        description="Custom Description"
      />
    );
    expect(getByText("Custom Heading")).toBeInTheDocument();
    expect(getByText("Custom Description")).toBeInTheDocument();
  });

  it("preserves custom icon precedence, fallbacks, sentinels, and wrappers", () => {
    const { container } = render(
      <ServicesListVerticalTags
        iconClassName="service-icon-shell"
        services={[
          {
            title: "String icon",
            icon: "lucide/custom-tags",
            iconName: "lucide/ignored-tags",
            className: "string-service",
          },
          {
            title: "Custom icon",
            icon: <span data-testid="custom-service-icon">custom</span>,
            iconName: "lucide/ignored-custom",
            className: "custom-service",
          },
          {
            title: "Empty icon",
            icon: "",
            iconName: "lucide/empty-fallback",
            className: "empty-service",
          },
          {
            title: "False icon",
            icon: false,
            iconName: "lucide/false-fallback",
            className: "false-service",
          },
          {
            title: "Zero icon",
            icon: 0,
            iconName: "lucide/zero-fallback",
            className: "zero-service",
          },
          {
            title: "No icon",
            className: "no-icon-service",
          },
        ]}
      />,
    );

    const stringCard = container.querySelector(".string-service") as HTMLElement;
    expect(
      stringCard.querySelector('[data-name="lucide/custom-tags"]'),
    ).toHaveClass("h-6", "w-6");
    expect(
      stringCard.querySelector('[data-name="lucide/ignored-tags"]'),
    ).not.toBeInTheDocument();
    expect(
      within(stringCard).queryByText("lucide/custom-tags"),
    ).not.toBeInTheDocument();

    const customCard = container.querySelector(".custom-service") as HTMLElement;
    expect(
      within(customCard).getByTestId("custom-service-icon"),
    ).toBeInTheDocument();
    expect(
      customCard.querySelector('[data-name="lucide/ignored-custom"]'),
    ).not.toBeInTheDocument();

    for (const [selector, iconName] of [
      [".empty-service", "lucide/empty-fallback"],
      [".false-service", "lucide/false-fallback"],
      [".zero-service", "lucide/zero-fallback"],
    ]) {
      const card = container.querySelector(selector) as HTMLElement;
      expect(card.querySelector(`[data-name="${iconName}"]`)).toHaveClass(
        "h-6",
        "w-6",
      );
    }

    const noIconCard = container.querySelector(
      ".no-icon-service",
    ) as HTMLElement;
    expect(noIconCard.querySelector(".service-icon-shell")).toBeInTheDocument();
    expect(
      within(noIconCard).queryByTestId("mock-icon"),
    ).not.toBeInTheDocument();
  });

  it("preserves service slot truthiness", () => {
    const { rerender } = render(
      <ServicesListVerticalTags
        services={[{ title: "Generated service" }]}
        servicesSlot={false}
      />,
    );
    expect(screen.getByText("Generated service")).toBeInTheDocument();

    rerender(
      <ServicesListVerticalTags
        services={[{ title: "Hidden service" }]}
        servicesSlot={<div>Custom services slot</div>}
      />,
    );
    expect(screen.getByText("Custom services slot")).toBeInTheDocument();
    expect(screen.queryByText("Hidden service")).not.toBeInTheDocument();
  });
});
