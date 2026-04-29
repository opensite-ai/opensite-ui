import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProcessStepsGrid } from "../process-steps-grid";

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
});
