import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ServicesListIconGrid } from "../services-list-icon-grid";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    className,
  }: {
    name?: React.ReactNode | string;
    className?: string;
  }) =>
    typeof name === "string" ? (
      <span
        data-testid={`mock-icon-${name}`}
        data-name={name}
        className={className}
      />
    ) : (
      <>{name}</>
    ),
}));

describe("ServicesListIconGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom heading and description", () => {
    render(
      <ServicesListIconGrid
        heading="Custom Heading"
        description="Custom Description"
      />
    );
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
    expect(screen.getByText("Custom Description")).toBeInTheDocument();
  });

  it("routes truthy icons through DynamicIcon and preserves fallback precedence", () => {
    const { container } = render(
      <ServicesListIconGrid
        services={[
          {
            title: "Raw icon",
            icon: "lucide/raw",
            iconName: "lucide/ignored-raw",
            className: "raw-service",
          },
          {
            title: "Custom icon",
            icon: <span data-testid="custom-icon" />,
            iconName: "lucide/ignored-custom",
          },
          {
            title: "Empty fallback",
            icon: "",
            iconName: "lucide/empty-fallback",
          },
          {
            title: "False fallback",
            icon: false,
            iconName: "lucide/false-fallback",
          },
          {
            title: "Zero fallback",
            icon: 0,
            iconName: "lucide/zero-fallback",
          },
          { title: "Named icon", iconName: "lucide/named" },
          { title: "No icon", className: "no-icon-service" },
        ]}
      />,
    );

    const rawIcon = screen.getByTestId("mock-icon-lucide/raw");
    expect(rawIcon).toHaveClass("h-6", "w-6");
    expect(screen.queryByText("lucide/raw")).not.toBeInTheDocument();
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/ignored-raw"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/ignored-custom"),
    ).not.toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/empty-fallback"),
    ).toHaveClass("h-6", "w-6");
    expect(
      screen.getByTestId("mock-icon-lucide/false-fallback"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/zero-fallback"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("mock-icon-lucide/named")).toBeInTheDocument();

    const rawCard = container.querySelector(".raw-service");
    const noIconCard = container.querySelector(".no-icon-service");
    expect(rawCard?.querySelector(".rounded-full.p-3")).toBeInTheDocument();
    expect(noIconCard?.querySelector(".rounded-full.p-3")).toBeInTheDocument();
    expect(
      noIconCard?.querySelector('[data-testid^="mock-icon-"]'),
    ).not.toBeInTheDocument();
  });

  it("lets servicesSlot replace the generated service grid", () => {
    render(
      <ServicesListIconGrid
        services={[{ title: "Hidden service", icon: "lucide/hidden" }]}
        servicesSlot={<div data-testid="services-slot">Custom services</div>}
      />,
    );

    expect(screen.getByTestId("services-slot")).toBeInTheDocument();
    expect(screen.queryByText("Hidden service")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/hidden"),
    ).not.toBeInTheDocument();
  });
});
