import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { FeatureIconGridAccent } from "../feature-icon-grid-accent";

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
      >
        icon
      </span>
    ) : (
      <>{name}</>
    ),
}));

describe("FeatureIconGridAccent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<FeatureIconGridAccent label="Test Label" title="Test Title" />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders custom label", () => {
    render(<FeatureIconGridAccent label="Custom Label" />);
    expect(screen.getByText("Custom Label")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureIconGridAccent title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders features when provided", () => {
    const features = [
      { title: "Feature One", description: "Description one" },
      { title: "Feature Two", description: "Description two" },
    ];
    render(<FeatureIconGridAccent features={features} />);
    expect(screen.getByText("Feature One")).toBeInTheDocument();
    expect(screen.getByText("Feature Two")).toBeInTheDocument();
  });

  it("renders selected icon prop names dynamically with the original wrapper", () => {
    render(
      <FeatureIconGridAccent
        features={[
          {
            icon: "lucide/zoom-in",
            iconName: "lucide/fallback",
            iconClassName: "accent-icon",
            title: "String Icon",
          },
        ]}
      />,
    );

    const card = screen
      .getByText("String Icon")
      .closest(".rounded-lg") as HTMLElement;
    const icon = within(card).getByTestId("mock-icon");
    expect(icon).toHaveAttribute("data-name", "lucide/zoom-in");
    expect(icon).toHaveAttribute("data-size", "24");
    expect(icon.parentElement).toHaveClass("size-11", "accent-icon");
    expect(card).not.toHaveTextContent("lucide/zoom-in");
  });

  it("uses iconName when the icon value is nullish", () => {
    render(
      <FeatureIconGridAccent
        features={[
          { icon: null, iconName: "lucide/fallback", title: "Named Fallback" },
        ]}
      />,
    );

    expect(screen.getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "lucide/fallback",
    );
  });

  it("keeps empty, false, and zero selected values ahead of iconName", () => {
    render(
      <FeatureIconGridAccent
        features={[
          { icon: "", iconName: "lucide/ignored", title: "Empty Icon" },
          { icon: false, iconName: "lucide/ignored", title: "False Icon" },
          { icon: 0, iconName: "lucide/ignored", title: "Zero Icon" },
        ]}
      />,
    );

    for (const label of ["Empty Icon", "False Icon", "Zero Icon"]) {
      const card = screen.getByText(label).closest(".rounded-lg") as HTMLElement;
      expect(within(card).queryByTestId("mock-icon")).not.toBeInTheDocument();
      expect(card.querySelector(".size-11")).not.toBeInTheDocument();
    }

    const zeroCard = screen
      .getByText("Zero Icon")
      .closest(".rounded-lg") as HTMLElement;
    expect(within(zeroCard).getByText("0")).toBeInTheDocument();
  });

  it("preserves custom icon elements", () => {
    render(
      <FeatureIconGridAccent
        features={[
          {
            icon: <span data-testid="custom-icon" />,
            iconName: "lucide/fallback",
            title: "Custom Icon",
          },
        ]}
      />,
    );

    const customIcon = screen.getByTestId("custom-icon");
    expect(customIcon).toBeInTheDocument();
    expect(customIcon.parentElement).toHaveClass("size-11");
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("preserves the truthy featuresSlot override", () => {
    render(
      <FeatureIconGridAccent
        features={[{ icon: "lucide/ignored", title: "Ignored" }]}
        featuresSlot={<div data-testid="features-slot">Custom features</div>}
      />,
    );

    expect(screen.getByTestId("features-slot")).toBeInTheDocument();
    expect(screen.queryByText("Ignored")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureIconGridAccent className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
