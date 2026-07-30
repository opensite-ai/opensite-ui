import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { FeatureBadgeGridSix } from "../feature-badge-grid-six";

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

vi.mock("../../../ui/badge", () => ({
  Badge: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span className={className} data-testid="mock-badge">{children}</span>
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
      >
        icon
      </span>
    ) : (
      <>{name}</>
    ),
}));

describe("FeatureBadgeGridSix", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<FeatureBadgeGridSix label="Test Label" title="Test Title" />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders custom label", () => {
    render(<FeatureBadgeGridSix label="Custom Label" />);
    expect(screen.getByText("Custom Label")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureBadgeGridSix title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders features when provided", () => {
    const features = [
      { heading: "Feature One", description: "Description one" },
      { heading: "Feature Two", description: "Description two" },
    ];
    render(<FeatureBadgeGridSix features={features} />);
    expect(screen.getByText("Feature One")).toBeInTheDocument();
    expect(screen.getByText("Feature Two")).toBeInTheDocument();
  });

  it("renders icon prop names dynamically with the original size and classes", () => {
    render(
      <FeatureBadgeGridSix
        features={[
          {
            icon: "lucide/git-pull-request",
            iconClassName: "feature-icon",
            heading: "String Icon",
          },
        ]}
      />,
    );

    const card = screen
      .getByText("String Icon")
      .closest(".rounded-lg") as HTMLElement;
    const icon = within(card).getByTestId("mock-icon");

    expect(icon).toHaveAttribute("data-name", "lucide/git-pull-request");
    expect(icon).toHaveAttribute("data-size", "16");
    expect(icon).toHaveClass("md:size-6", "feature-icon");
    expect(icon.parentElement).toHaveClass("size-10", "md:size-12");
    expect(card).not.toHaveTextContent("lucide/git-pull-request");
  });

  it.each([
    ["empty", ""],
    ["false", false],
    ["zero", 0],
  ])("falls through %s icon values to iconName", (_label, icon) => {
    render(
      <FeatureBadgeGridSix
        features={[{ icon, iconName: "lucide/fallback", heading: "Fallback Icon" }]}
      />,
    );

    const card = screen
      .getByText("Fallback Icon")
      .closest(".rounded-lg") as HTMLElement;
    expect(within(card).getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "lucide/fallback",
    );
  });

  it("omits the icon wrapper for a falsy icon without iconName", () => {
    render(<FeatureBadgeGridSix features={[{ icon: 0, heading: "No Icon" }]} />);

    const card = screen.getByText("No Icon").closest(".rounded-lg") as HTMLElement;
    expect(within(card).queryByTestId("mock-icon")).not.toBeInTheDocument();
    expect(card.querySelector(".size-10")).not.toBeInTheDocument();
    expect(card).not.toHaveTextContent("0");
  });

  it("preserves custom icon elements", () => {
    render(
      <FeatureBadgeGridSix
        features={[
          {
            icon: <span data-testid="custom-icon" />,
            iconName: "lucide/fallback",
            heading: "Custom Icon",
          },
        ]}
      />,
    );

    const customIcon = screen.getByTestId("custom-icon");
    expect(customIcon).toBeInTheDocument();
    expect(customIcon.parentElement).toHaveClass("size-10", "md:size-12");
    expect(screen.queryByText("lucide/fallback")).not.toBeInTheDocument();
  });

  it("renders both action icon positions dynamically", () => {
    render(
      <FeatureBadgeGridSix
        action={{
          label: "Start",
          icon: "lucide/play",
          iconAfter: "lucide/arrow-right",
        }}
      />,
    );

    const action = screen.getByTestId("mock-pressable");
    expect(
      within(action)
        .getAllByTestId("mock-icon")
        .map((icon) => icon.getAttribute("data-name")),
    ).toEqual(["lucide/play", "lucide/arrow-right"]);
    expect(action).not.toHaveTextContent("lucide/play");
    expect(action).not.toHaveTextContent("lucide/arrow-right");
  });

  it("preserves truthy action children and actionSlot overrides", () => {
    const { rerender } = render(
      <FeatureBadgeGridSix
        action={{
          label: "Ignored",
          icon: "lucide/ignored",
          children: <span data-testid="action-children">Custom action</span>,
        }}
      />,
    );

    expect(screen.getByTestId("action-children")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();

    rerender(
      <FeatureBadgeGridSix
        action={{ label: "Ignored", icon: "lucide/ignored" }}
        actionSlot={<span data-testid="action-slot">Slot action</span>}
      />,
    );

    expect(screen.getByTestId("action-slot")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-pressable")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureBadgeGridSix className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
