import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ServicesListTimeline } from "../services-list-timeline";

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

describe("ServicesListTimeline", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom heading and description", () => {
    const { getByText } = render(
      <ServicesListTimeline
        heading="Custom Heading"
        description="Custom Description"
      />
    );
    expect(getByText("Custom Heading")).toBeInTheDocument();
    expect(getByText("Custom Description")).toBeInTheDocument();
  });

  it("preserves custom icon precedence, fallbacks, sentinels, and timeline dots", () => {
    const { container } = render(
      <ServicesListTimeline
        services={[
          {
            title: "String icon",
            icon: "lucide/custom-timeline",
            iconName: "lucide/ignored-timeline",
            deliverables: ["Audit"],
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
    const stringRow = stringCard.parentElement?.parentElement as HTMLElement;
    const stringIcon = stringRow.querySelector(
      '[data-name="lucide/custom-timeline"]',
    );
    expect(stringIcon).toHaveClass("h-4", "w-4", "text-primary");
    expect(
      stringRow.querySelector('[data-name="lucide/ignored-timeline"]'),
    ).not.toBeInTheDocument();
    expect(
      within(stringRow).queryByText("lucide/custom-timeline"),
    ).not.toBeInTheDocument();
    expect(
      stringCard.querySelector('[data-name="lucide/check"]'),
    ).toHaveClass("mr-1", "h-3", "w-3", "text-primary");

    const customCard = container.querySelector(".custom-service") as HTMLElement;
    const customRow = customCard.parentElement?.parentElement as HTMLElement;
    expect(
      within(customRow).getByTestId("custom-service-icon"),
    ).toBeInTheDocument();
    expect(
      customRow.querySelector('[data-name="lucide/ignored-custom"]'),
    ).not.toBeInTheDocument();

    for (const [selector, iconName] of [
      [".empty-service", "lucide/empty-fallback"],
      [".false-service", "lucide/false-fallback"],
      [".zero-service", "lucide/zero-fallback"],
    ]) {
      const card = container.querySelector(selector) as HTMLElement;
      const row = card.parentElement?.parentElement as HTMLElement;
      expect(row.querySelector(`[data-name="${iconName}"]`)).toHaveClass(
        "h-4",
        "w-4",
        "text-primary",
      );
    }

    const noIconCard = container.querySelector(
      ".no-icon-service",
    ) as HTMLElement;
    const noIconRow = noIconCard.parentElement?.parentElement as HTMLElement;
    const timelineDot = noIconRow.firstElementChild as HTMLElement;
    expect(timelineDot).toHaveClass("h-8", "w-8");
    expect(
      within(timelineDot).queryByTestId("mock-icon"),
    ).not.toBeInTheDocument();
  });

  it("preserves action and service slot truthiness and fixed action icons", () => {
    const { container, rerender } = render(
      <ServicesListTimeline
        primaryAction={{ label: "Start", href: "/start" }}
        actionsSlot={false}
        services={[{ title: "Generated service" }]}
        servicesSlot={false}
      />,
    );

    const action = container.querySelector('a[href="/start"]') as HTMLElement;
    expect(action).toHaveAttribute("data-testid", "mock-pressable");
    expect(
      action.querySelector('[data-name="lucide/arrow-right"]'),
    ).toHaveClass("ml-2", "h-4", "w-4");
    expect(screen.getByText("Generated service")).toBeInTheDocument();

    rerender(
      <ServicesListTimeline
        primaryAction={{ label: "Hidden action", href: "/hidden" }}
        actionsSlot={<div>Custom actions slot</div>}
        services={[{ title: "Hidden service" }]}
        servicesSlot={<div>Custom services slot</div>}
      />,
    );
    expect(screen.getByText("Custom actions slot")).toBeInTheDocument();
    expect(screen.getByText("Custom services slot")).toBeInTheDocument();
    expect(container.querySelector('a[href="/hidden"]')).not.toBeInTheDocument();
    expect(screen.queryByText("Hidden service")).not.toBeInTheDocument();
  });
});
