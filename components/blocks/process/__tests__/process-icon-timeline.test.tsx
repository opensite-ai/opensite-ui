import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ProcessIconTimeline } from "../process-icon-timeline";

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
        data-testid="mock-icon"
        data-name={name}
        data-size={size}
        className={className}
      />
    ) : (
      <>{name}</>
    ),
}));

describe("ProcessIconTimeline", () => {
  const mockSteps = [
    {
      icon: "lucide/lightbulb",
      title: "Discovery",
      description: "Understanding your needs",
      highlights: ["Research", "Analysis"],
    },
    {
      icon: "lucide/pencil-ruler",
      title: "Design",
      description: "Creating solutions",
      highlights: ["UI/UX", "Prototyping"],
    },
    {
      icon: "lucide/code",
      title: "Development",
      description: "Building the product",
      highlights: ["Frontend", "Backend"],
    },
  ];

  it("renders title and description", () => {
    render(
      <ProcessIconTimeline
        heading="Development Timeline"
        description="Our step-by-step approach"
      />
    );
    expect(screen.getByText("Development Timeline")).toBeInTheDocument();
    expect(screen.getByText("Our step-by-step approach")).toBeInTheDocument();
  });

  it("renders all provided steps", () => {
    render(<ProcessIconTimeline steps={mockSteps} />);
    expect(screen.getByText("Discovery")).toBeInTheDocument();
    expect(screen.getByText("Design")).toBeInTheDocument();
    expect(screen.getByText("Development")).toBeInTheDocument();
  });

  it("renders step descriptions", () => {
    render(<ProcessIconTimeline steps={mockSteps} />);
    expect(screen.getByText("Understanding your needs")).toBeInTheDocument();
    expect(screen.getByText("Creating solutions")).toBeInTheDocument();
    expect(screen.getByText("Building the product")).toBeInTheDocument();
  });

  it("renders highlight tags", () => {
    render(<ProcessIconTimeline steps={mockSteps} />);
    expect(screen.getByText("Research")).toBeInTheDocument();
    expect(screen.getByText("Analysis")).toBeInTheDocument();
    expect(screen.getByText("UI/UX")).toBeInTheDocument();
    expect(screen.getByText("Prototyping")).toBeInTheDocument();
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("Backend")).toBeInTheDocument();
  });

  it("routes selected icon values with nullish slot precedence", () => {
    const { container } = render(
      <ProcessIconTimeline
        steps={[
          {
            title: "Named icon",
            icon: "lucide/lightbulb",
          },
          {
            title: "String slot",
            icon: "lucide/ignored-string",
            iconSlot: "lucide/sparkles",
          },
          {
            title: "Custom slot",
            icon: "lucide/ignored-custom",
            iconSlot: <span data-testid="custom-icon-slot" />,
          },
          {
            title: "Empty slot",
            icon: "lucide/ignored-empty",
            iconSlot: "",
          },
          {
            title: "False slot",
            icon: "lucide/ignored-false",
            iconSlot: false,
          },
          {
            title: "Zero slot",
            icon: "lucide/ignored-zero",
            iconSlot: 0,
          },
          {
            title: "Null slot",
            icon: "lucide/null-fallback",
            iconSlot: null,
          },
        ]}
      />,
    );

    const namedRow = screen
      .getByText("Named icon")
      .closest(".relative.flex") as HTMLElement;
    const namedIcon = within(namedRow).getByTestId("mock-icon");
    expect(namedIcon).toHaveAttribute("data-name", "lucide/lightbulb");
    expect(namedIcon).toHaveAttribute("data-size", "24");
    expect(namedRow).not.toHaveTextContent("lucide/lightbulb");

    const stringSlotRow = screen
      .getByText("String slot")
      .closest(".relative.flex") as HTMLElement;
    expect(within(stringSlotRow).getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "lucide/sparkles",
    );
    expect(stringSlotRow).not.toHaveTextContent("lucide/sparkles");
    expect(stringSlotRow).not.toHaveTextContent("lucide/ignored-string");

    expect(screen.getByTestId("custom-icon-slot")).toBeInTheDocument();
    for (const title of ["Empty slot", "False slot"]) {
      const row = screen
        .getByText(title)
        .closest(".relative.flex") as HTMLElement;
      expect(within(row).queryByTestId("mock-icon")).not.toBeInTheDocument();
    }

    const zeroRow = screen
      .getByText("Zero slot")
      .closest(".relative.flex") as HTMLElement;
    const zeroBadge = zeroRow.querySelector(
      ".rounded-full.bg-primary",
    ) as HTMLElement;
    expect(zeroBadge).toHaveTextContent("0");
    expect(within(zeroRow).queryByTestId("mock-icon")).not.toBeInTheDocument();

    const nullRow = screen
      .getByText("Null slot")
      .closest(".relative.flex") as HTMLElement;
    expect(within(nullRow).getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "lucide/null-fallback",
    );
    expect(
      container.querySelector('[data-name^="lucide/ignored-"]'),
    ).not.toBeInTheDocument();
    for (const ignoredName of [
      "lucide/ignored-string",
      "lucide/ignored-custom",
      "lucide/ignored-empty",
      "lucide/ignored-false",
      "lucide/ignored-zero",
    ]) {
      expect(container).not.toHaveTextContent(ignoredName);
    }
    expect(container.querySelector('[data-name=""]')).not.toBeInTheDocument();
  });

  it("preserves truthy and falsy stepsSlot behavior", () => {
    const { rerender } = render(
      <ProcessIconTimeline
        steps={[{ title: "Generated step", icon: "lucide/generated" }]}
        stepsSlot={<div data-testid="steps-slot">Custom steps</div>}
      />,
    );

    expect(screen.getByTestId("steps-slot")).toBeInTheDocument();
    expect(screen.queryByText("Generated step")).not.toBeInTheDocument();

    rerender(
      <ProcessIconTimeline
        steps={[{ title: "Generated step", icon: "lucide/generated" }]}
        stepsSlot={false}
      />,
    );
    expect(screen.getByText("Generated step")).toBeInTheDocument();
    expect(screen.getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "lucide/generated",
    );
  });

  it("renders icon badges with bg-primary", () => {
    const { container } = render(<ProcessIconTimeline steps={mockSteps} />);
    const badges = container.querySelectorAll(".rounded-full.bg-primary");
    expect(badges.length).toBeGreaterThanOrEqual(3);
  });

  it("renders with empty steps array", () => {
    const { container } = render(<ProcessIconTimeline steps={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders steps with alternating layout", () => {
    const { container } = render(<ProcessIconTimeline steps={mockSteps} />);
    const steps = container.querySelectorAll(".relative.flex");
    expect(steps.length).toBeGreaterThan(0);
  });

  it("renders step cards with border and shadow", () => {
    const { container } = render(<ProcessIconTimeline steps={mockSteps} />);
    const cards = container.querySelectorAll(".rounded-lg.border.bg-card");
    expect(cards.length).toBe(3);
  });

  it("renders steps without highlights", () => {
    const stepsWithoutHighlights = [
      {
        icon: "lucide/star",
        title: "Step 1",
        description: "Description 1",
      },
    ];
    render(<ProcessIconTimeline steps={stepsWithoutHighlights} />);
    expect(screen.getByText("Step 1")).toBeInTheDocument();
  });

  it("renders highlight tags with proper styling", () => {
    const { container } = render(<ProcessIconTimeline steps={mockSteps} />);
    const highlightTags = container.querySelectorAll(
      ".rounded-full.bg-primary.px-3.py-1"
    );
    expect(highlightTags.length).toBe(6);
  });
});
