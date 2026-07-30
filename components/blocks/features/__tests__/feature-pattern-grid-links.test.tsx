import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { FeaturePatternGridLinks } from "../feature-pattern-grid-links";

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

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

describe("FeaturePatternGridLinks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing with default props", () => {
    const { container } = render(<FeaturePatternGridLinks />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders features when provided", () => {
    const features = [
      { title: "Feature One", description: "Description one" },
      { title: "Feature Two", description: "Description two" },
    ];
    render(<FeaturePatternGridLinks features={features} />);
    expect(screen.getByText("Feature One")).toBeInTheDocument();
    expect(screen.getByText("Feature Two")).toBeInTheDocument();
  });

  it("renders feature links when provided", () => {
    const features = [
      { title: "Feature One", link: "/feature-one", linkLabel: "Learn More" },
    ];
    render(<FeaturePatternGridLinks features={features} />);
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("renders feature description", () => {
    const features = [{ title: "Feature 1", description: "Custom description text" }];
    render(<FeaturePatternGridLinks features={features} />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders learn more links", () => {
    const features = [{ title: "Feature 1", link: "/feature1" }];
    render(<FeaturePatternGridLinks features={features} />);
    expect(screen.getByText("Learn more")).toBeInTheDocument();
  });

  it("routes truthy icon values through DynamicIcon and falls back to iconName", () => {
    const { container } = render(
      <FeaturePatternGridLinks
        features={[
          {
            title: "Raw icon",
            icon: "lucide/sparkles",
            iconName: "lucide/ignored",
            iconClassName: "raw-icon-class",
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
    const rawIcon = within(rawCard as HTMLElement).getByTestId("mock-icon");
    expect(rawIcon).toHaveAttribute("data-name", "lucide/sparkles");
    expect(rawIcon).toHaveAttribute("data-size", "24");
    expect(rawIcon).toHaveClass("raw-icon-class");
    expect(within(rawCard as HTMLElement).queryByText("lucide/sparkles")).not.toBeInTheDocument();

    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    expect(
      container.querySelector('[data-name="lucide/ignored-custom"]'),
    ).not.toBeInTheDocument();
    expect(
      screen.getAllByTestId("mock-icon").map((icon) => icon.getAttribute("data-name")),
    ).toEqual([
      "lucide/sparkles",
      "lucide/empty",
      "lucide/false",
      "lucide/zero",
    ]);

    for (const title of ["Empty only", "False only", "Zero only"]) {
      const card = screen.getByText(title).closest(".rounded-lg");
      expect(within(card as HTMLElement).queryByTestId("mock-icon")).not.toBeInTheDocument();
    }
  });

  it("keeps link labels as content instead of treating them as icons", () => {
    const { container } = render(
      <FeaturePatternGridLinks
        features={[
          {
            title: "Content boundary",
            link: "/boundary",
            linkLabel: "lucide/not-an-icon",
          },
        ]}
      />,
    );

    const link = screen.getByTestId("mock-pressable");
    expect(within(link).getByText("lucide/not-an-icon")).toBeInTheDocument();
    expect(
      container.querySelector('[data-name="lucide/not-an-icon"]'),
    ).not.toBeInTheDocument();
    expect(within(link).getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "lucide/chevron-right",
    );
  });

  it("preserves truthy featuresSlot precedence", () => {
    const features = [{ title: "Array feature" }];
    const { rerender } = render(
      <FeaturePatternGridLinks features={features} featuresSlot={false} />,
    );
    expect(screen.getByText("Array feature")).toBeInTheDocument();

    rerender(
      <FeaturePatternGridLinks
        features={features}
        featuresSlot={<div>Custom features slot</div>}
      />,
    );
    expect(screen.getByText("Custom features slot")).toBeInTheDocument();
    expect(screen.queryByText("Array feature")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeaturePatternGridLinks className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
