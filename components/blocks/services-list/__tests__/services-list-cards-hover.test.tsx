import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ServicesListCardsHover } from "../services-list-cards-hover";

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

describe("ServicesListCardsHover", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom heading and description", () => {
    const { getByText } = render(
      <ServicesListCardsHover
        heading="Custom Heading"
        description="Custom Description"
      />
    );
    expect(getByText("Custom Heading")).toBeInTheDocument();
    expect(getByText("Custom Description")).toBeInTheDocument();
  });

  it("routes truthy icons through DynamicIcon with conditional wrappers", () => {
    const { container } = render(
      <ServicesListCardsHover
        iconClassName="icon-shell"
        services={[
          {
            title: "Raw",
            icon: "lucide/code",
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
    expect(rawIcon).toHaveAttribute("data-name", "lucide/code");
    expect(rawIcon).toHaveClass("h-7", "w-7");
    expect(within(rawShell).queryByText("lucide/code")).not.toBeInTheDocument();
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

    expect(container.querySelectorAll(".icon-shell")).toHaveLength(5);
    for (const selector of [
      ".empty-service",
      ".false-service",
      ".zero-service",
    ]) {
      expect(
        container.querySelector(`${selector} .icon-shell`),
      ).not.toBeInTheDocument();
    }
  });

  it("preserves truthy service slots and falsy slot fallback", () => {
    const services = [{ title: "Array service", icon: "lucide/array" }];
    const { rerender } = render(
      <ServicesListCardsHover services={services} servicesSlot={false} />,
    );
    expect(screen.getByText("Array service")).toBeInTheDocument();

    rerender(
      <ServicesListCardsHover
        services={services}
        servicesSlot={<div>Custom services slot</div>}
      />,
    );
    expect(screen.getByText("Custom services slot")).toBeInTheDocument();
    expect(screen.queryByText("Array service")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("keeps feature copy and fixed CTA icons on their original paths", () => {
    const { container } = render(
      <ServicesListCardsHover
        services={[
          {
            title: "Boundaries",
            features: ["lucide/feature-copy"],
            ctaText: "lucide/cta-copy",
            ctaUrl: "/details",
            className: "boundary-service",
          },
        ]}
      />,
    );
    const service = container.querySelector(
      ".boundary-service",
    ) as HTMLElement;
    expect(within(service).getByText("lucide/feature-copy")).toBeInTheDocument();
    expect(within(service).getByText("lucide/cta-copy")).toBeInTheDocument();
    expect(
      within(service)
        .getAllByTestId("mock-icon")
        .map((icon) => icon.getAttribute("data-name")),
    ).toEqual(["lucide/check", "lucide/arrow-right"]);
    expect(
      service.querySelector('[data-name="lucide/feature-copy"]'),
    ).not.toBeInTheDocument();
    expect(
      service.querySelector('[data-name="lucide/cta-copy"]'),
    ).not.toBeInTheDocument();
  });
});
