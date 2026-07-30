import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ProcessStepsGrid } from "../process-steps-grid";

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

describe("ProcessStepsGrid", () => {
  const mockSteps = [
    {
      icon: "lucide/search",
      title: "Research",
      description: "Understanding your needs",
    },
    {
      icon: "lucide/lightbulb",
      title: "Ideation",
      description: "Developing creative solutions",
    },
    {
      icon: "lucide/code-2",
      title: "Development",
      description: "Building robust solutions",
    },
  ];

  it("renders title and description", () => {
    render(
      <ProcessStepsGrid
        heading="Custom Process"
        description="Custom description for our process"
      />
    );
    expect(screen.getByText("Custom Process")).toBeInTheDocument();
    expect(
      screen.getByText("Custom description for our process")
    ).toBeInTheDocument();
  });

  it("renders all provided steps", () => {
    render(<ProcessStepsGrid steps={mockSteps} />);
    expect(screen.getByText("Research")).toBeInTheDocument();
    expect(screen.getByText("Ideation")).toBeInTheDocument();
    expect(screen.getByText("Development")).toBeInTheDocument();
    expect(screen.getByText("Understanding your needs")).toBeInTheDocument();
    expect(
      screen.getByText("Developing creative solutions")
    ).toBeInTheDocument();
    expect(screen.getByText("Building robust solutions")).toBeInTheDocument();
  });

  it("renders step numbers with leading zeros", () => {
    render(<ProcessStepsGrid steps={mockSteps} />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
  });

  it("renders grid layout with correct columns", () => {
    const { container } = render(<ProcessStepsGrid steps={mockSteps} />);
    const grid = container.querySelector(".grid");
    expect(grid?.className).toContain("md:grid-cols-2");
    expect(grid?.className).toContain("lg:grid-cols-3");
  });

  it("renders step cards with hover effects", () => {
    const { container } = render(<ProcessStepsGrid steps={mockSteps} />);
    const cards = container.querySelectorAll(".group");
    expect(cards.length).toBe(3);
    cards.forEach((card) => {
      expect(card.className).toContain("hover:border-primary");
      expect(card.className).toContain("hover:shadow-lg");
    });
  });

  it("renders with empty steps array", () => {
    const { container } = render(<ProcessStepsGrid steps={[]} />);
    expect(container.firstChild).toBeInTheDocument();
    // When steps is empty, the grid is not rendered
    const grid = container.querySelector(".grid");
    expect(grid).toBeNull();
  });

  it("renders steps without icons", () => {
    const stepsWithoutIcons = [
      { title: "Step 1", description: "Description 1" },
      { title: "Step 2", description: "Description 2" },
    ];
    render(<ProcessStepsGrid steps={stepsWithoutIcons} />);
    expect(screen.getByText("Step 1")).toBeInTheDocument();
    expect(screen.getByText("Step 2")).toBeInTheDocument();
  });

  it("routes icon slots through DynamicIcon without changing nullish precedence", () => {
    const steps = [
      {
        title: "String slot",
        icon: "lucide/string-fallback",
        iconSlot: "lucide/string-slot",
      },
      {
        title: "Custom slot",
        icon: "lucide/custom-fallback",
        iconSlot: <span data-testid="custom-icon">Custom icon</span>,
      },
      {
        title: "False slot",
        icon: "lucide/false-fallback",
        iconSlot: false,
      },
      {
        title: "Zero slot",
        icon: "lucide/zero-fallback",
        iconSlot: 0,
      },
      {
        title: "Empty slot",
        icon: "lucide/empty-fallback",
        iconSlot: "",
      },
      {
        title: "Null fallback",
        icon: "lucide/null-fallback",
        iconSlot: null,
      },
    ];
    const { rerender } = render(<ProcessStepsGrid steps={steps} />);
    const cardFor = (title: string) =>
      screen.getByText(title).closest(".group") as HTMLElement;
    const iconBoxFor = (title: string) =>
      cardFor(title).querySelector(".size-14") as HTMLElement;

    const stringCard = cardFor("String slot");
    const stringIcon = within(stringCard).getByTestId("mock-icon");
    expect(stringIcon).toHaveAttribute("data-name", "lucide/string-slot");
    expect(stringIcon).toHaveAttribute("data-size", "28");
    expect(stringCard).not.toHaveTextContent("lucide/string-slot");
    expect(
      stringCard.querySelector('[data-name="lucide/string-fallback"]'),
    ).not.toBeInTheDocument();

    expect(within(cardFor("Custom slot")).getByTestId("custom-icon")).toBeInTheDocument();
    expect(
      cardFor("Custom slot").querySelector(
        '[data-name="lucide/custom-fallback"]',
      ),
    ).not.toBeInTheDocument();

    expect(iconBoxFor("False slot")).toBeEmptyDOMElement();
    expect(iconBoxFor("False slot")).not.toHaveTextContent(
      "lucide/false-fallback",
    );
    expect(iconBoxFor("Zero slot")).toHaveTextContent("0");
    expect(
      iconBoxFor("Zero slot").querySelector(
        '[data-name="lucide/zero-fallback"]',
      ),
    ).not.toBeInTheDocument();
    expect(iconBoxFor("Empty slot")).toBeEmptyDOMElement();
    expect(iconBoxFor("Empty slot")).not.toHaveTextContent(
      "lucide/empty-fallback",
    );
    expect(
      within(cardFor("Null fallback")).getByTestId("mock-icon"),
    ).toHaveAttribute("data-name", "lucide/null-fallback");

    rerender(
      <ProcessStepsGrid
        steps={steps}
        stepsSlot={<div data-testid="steps-slot">Custom steps</div>}
      />,
    );
    expect(screen.getByTestId("steps-slot")).toBeInTheDocument();
    expect(screen.queryByText("String slot")).not.toBeInTheDocument();

    rerender(<ProcessStepsGrid steps={steps} stepsSlot={false} />);
    expect(screen.getByText("String slot")).toBeInTheDocument();
  });
});
