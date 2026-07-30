import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureIconGridMuted } from "../feature-icon-grid-muted";

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

describe("FeatureIconGridMuted", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<FeatureIconGridMuted title="Test Title" description="Test Description" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureIconGridMuted title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<FeatureIconGridMuted description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders features when provided", () => {
    const features = [
      { title: "Feature One", description: "Description one" },
      { title: "Feature Two", description: "Description two" },
    ];
    render(<FeatureIconGridMuted features={features} />);
    expect(screen.getByText("Feature One")).toBeInTheDocument();
    expect(screen.getByText("Feature Two")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureIconGridMuted className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("routes truthy raw icons and preserves fallback and no-icon behavior", () => {
    render(
      <FeatureIconGridMuted
        features={[
          {
            title: "Raw icon",
            icon: "lucide/raw",
            iconName: "lucide/ignored-raw",
            iconClassName: "local-icon-class",
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
          { title: "No icon" },
        ]}
      />,
    );

    const rawIcon = screen.getByTestId("mock-icon-lucide/raw");
    expect(rawIcon).toHaveAttribute("data-size", "24");
    expect(rawIcon).toHaveClass("local-icon-class");
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/ignored-raw"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/ignored-custom"),
    ).not.toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/empty-fallback"),
    ).toHaveAttribute("data-size", "24");
    expect(
      screen.getByTestId("mock-icon-lucide/false-fallback"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/zero-fallback"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("mock-icon-lucide/named")).toBeInTheDocument();

    const rawCard = screen.getByText("Raw icon").closest(".rounded-xl");
    const noIconCard = screen.getByText("No icon").closest(".rounded-xl");
    expect(rawCard).not.toHaveTextContent("lucide/raw");
    expect(
      noIconCard?.querySelector('[data-testid^="mock-icon-"]'),
    ).not.toBeInTheDocument();
  });
});
