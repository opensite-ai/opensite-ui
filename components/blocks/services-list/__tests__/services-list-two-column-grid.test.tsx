import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ServicesListTwoColumnGrid } from "../services-list-two-column-grid";

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

vi.mock("../../../../lib/Pressable", () => ({
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

describe("ServicesListTwoColumnGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom heading and description", () => {
    const { getByText } = render(
      <ServicesListTwoColumnGrid
        heading="Custom Heading"
        description="Custom Description"
      />
    );
    expect(getByText("Custom Heading")).toBeInTheDocument();
    expect(getByText("Custom Description")).toBeInTheDocument();
  });

  it("preserves custom icon precedence, fallbacks, sentinels, and wrappers", () => {
    const { container } = render(
      <ServicesListTwoColumnGrid
        iconClassName="service-icon-shell"
        services={[
          {
            title: "String icon",
            icon: "lucide/custom-grid",
            iconName: "lucide/ignored-grid",
            ctaUrl: "/string-service",
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
    expect(stringCard).toHaveAttribute("href", "/string-service");
    expect(
      stringCard.querySelector('[data-name="lucide/custom-grid"]'),
    ).toHaveClass("h-6", "w-6");
    expect(
      stringCard.querySelector('[data-name="lucide/ignored-grid"]'),
    ).not.toBeInTheDocument();
    expect(
      within(stringCard).queryByText("lucide/custom-grid"),
    ).not.toBeInTheDocument();
    expect(
      stringCard.querySelector('[data-name="lucide/arrow-right"]'),
    ).toHaveClass(
      "ml-1",
      "h-4",
      "w-4",
      "transition-transform",
      "group-hover:translate-x-1",
    );

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
    const iconShell = noIconCard.querySelector(".service-icon-shell");
    expect(iconShell).toBeInTheDocument();
    expect(within(iconShell as HTMLElement).queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("preserves action and service slot truthiness and fixed action icons", () => {
    const { container, rerender } = render(
      <ServicesListTwoColumnGrid
        primaryAction={{ label: "Primary", href: "/primary" }}
        secondaryAction={{ label: "Secondary", href: "/secondary" }}
        actionsSlot={false}
        services={[{ title: "Generated service", ctaUrl: "/service" }]}
        servicesSlot={false}
      />,
    );

    const primaryAction = container.querySelector(
      'a[href="/primary"]',
    ) as HTMLElement;
    expect(
      primaryAction.querySelector('[data-name="lucide/arrow-right"]'),
    ).toHaveClass("ml-2", "h-4", "w-4");
    expect(container.querySelector('a[href="/secondary"]')).toHaveTextContent(
      "Secondary",
    );
    expect(container.querySelector('a[href="/service"]')).toHaveTextContent(
      "Generated service",
    );

    rerender(
      <ServicesListTwoColumnGrid
        primaryAction={{ label: "Hidden primary", href: "/hidden-primary" }}
        secondaryAction={{
          label: "Hidden secondary",
          href: "/hidden-secondary",
        }}
        actionsSlot={<div>Custom actions slot</div>}
        services={[{ title: "Hidden service" }]}
        servicesSlot={<div>Custom services slot</div>}
      />,
    );
    expect(screen.getByText("Custom actions slot")).toBeInTheDocument();
    expect(screen.getByText("Custom services slot")).toBeInTheDocument();
    expect(
      container.querySelector('a[href="/hidden-primary"]'),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('a[href="/hidden-secondary"]'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Hidden service")).not.toBeInTheDocument();
  });
});
