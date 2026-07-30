import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureIconGridBordered } from "../feature-icon-grid-bordered";

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

describe("FeatureIconGridBordered", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<FeatureIconGridBordered label="Test Label" title="Test Title" />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders custom label", () => {
    render(<FeatureIconGridBordered label="Custom Label" />);
    expect(screen.getByText("Custom Label")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureIconGridBordered title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders features when provided", () => {
    const features = [
      { title: "Feature One", description: "Description one" },
      { title: "Feature Two", description: "Description two" },
    ];
    render(<FeatureIconGridBordered features={features} />);
    expect(screen.getByText("Feature One")).toBeInTheDocument();
    expect(screen.getByText("Feature Two")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureIconGridBordered className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("routes truthy raw icons and preserves fallback and wrapper gates", () => {
    render(
      <FeatureIconGridBordered
        features={[
          {
            title: "Raw icon",
            icon: "lucide/raw",
            iconName: "lucide/ignored-raw",
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
    expect(rawIcon).toHaveAttribute("data-size", "20");
    expect(rawIcon).toHaveClass("md:size-6");
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/ignored-raw"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/ignored-custom"),
    ).not.toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/empty-fallback"),
    ).toHaveClass("md:size-6");
    expect(
      screen.getByTestId("mock-icon-lucide/false-fallback"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/zero-fallback"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("mock-icon-lucide/named")).toHaveAttribute(
      "data-size",
      "20",
    );

    const rawCard = screen.getByText("Raw icon").closest("div.relative");
    const noIconCard = screen.getByText("No icon").closest("div.relative");
    expect(rawCard).not.toHaveTextContent("lucide/raw");
    expect(rawCard?.querySelector(".size-10")).toBeInTheDocument();
    expect(noIconCard?.querySelector(".size-10")).not.toBeInTheDocument();
    expect(
      noIconCard?.querySelector('[data-testid^="mock-icon-"]'),
    ).not.toBeInTheDocument();
  });
});
