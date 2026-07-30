import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { FeatureThreeColumnValues } from "../feature-three-column-values";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    className,
    size,
  }: {
    name?: React.ReactNode | string;
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

describe("FeatureThreeColumnValues", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<FeatureThreeColumnValues label="Test Label" title="Test Title" />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders custom label", () => {
    render(<FeatureThreeColumnValues label="Custom Label" />);
    expect(screen.getByText("Custom Label")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureThreeColumnValues title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders values when provided", () => {
    const values = [
      { title: "Value One", description: "Description one" },
      { title: "Value Two", description: "Description two" },
    ];
    render(<FeatureThreeColumnValues values={values} />);
    expect(screen.getByText("Value One")).toBeInTheDocument();
    expect(screen.getByText("Value Two")).toBeInTheDocument();
  });

  it("routes truthy icons through DynamicIcon and preserves the icon wrapper", () => {
    const { container } = render(
      <FeatureThreeColumnValues
        values={[
          {
            title: "Raw icon",
            icon: "lucide/gem",
            iconName: "lucide/ignored",
            iconClassName: "raw-wrapper-class",
          },
          {
            title: "Custom icon",
            icon: <span data-testid="custom-icon">custom</span>,
            iconName: "lucide/ignored-custom",
          },
          { title: "Empty fallback", icon: "", iconName: "lucide/empty" },
          { title: "False fallback", icon: false, iconName: "lucide/false" },
          { title: "Zero fallback", icon: 0, iconName: "lucide/zero" },
          { title: "Empty only", icon: "" },
          { title: "False only", icon: false },
          { title: "Zero only", icon: 0 },
        ]}
      />,
    );

    const rawCard = screen.getByText("Raw icon").closest(".rounded-lg");
    const rawWrapper = (rawCard as HTMLElement).querySelector(".size-fit");
    const rawIcon = within(rawCard as HTMLElement).getByTestId("mock-icon");
    expect(rawWrapper).toHaveClass("raw-wrapper-class");
    expect(rawIcon).toHaveAttribute("data-name", "lucide/gem");
    expect(rawIcon).toHaveAttribute("data-size", "24");
    expect(within(rawCard as HTMLElement).queryByText("lucide/gem")).not.toBeInTheDocument();

    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    expect(
      container.querySelector('[data-name="lucide/ignored-custom"]'),
    ).not.toBeInTheDocument();
    expect(
      screen.getAllByTestId("mock-icon").map((icon) => icon.getAttribute("data-name")),
    ).toEqual(["lucide/gem", "lucide/empty", "lucide/false", "lucide/zero"]);

    for (const title of ["Empty only", "False only", "Zero only"]) {
      const card = screen.getByText(title).closest(".rounded-lg");
      expect((card as HTMLElement).querySelector(".size-fit")).not.toBeInTheDocument();
    }
  });

  it("preserves truthy valuesSlot precedence", () => {
    const values = [{ title: "Array value" }];
    const { rerender } = render(
      <FeatureThreeColumnValues values={values} valuesSlot={false} />,
    );
    expect(screen.getByText("Array value")).toBeInTheDocument();

    rerender(
      <FeatureThreeColumnValues
        values={values}
        valuesSlot={<div>Custom values slot</div>}
      />,
    );
    expect(screen.getByText("Custom values slot")).toBeInTheDocument();
    expect(screen.queryByText("Array value")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureThreeColumnValues className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
