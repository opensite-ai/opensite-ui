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

  it("renders with default props", () => {
    render(<ProcessStepsGrid />);
    expect(screen.getByText("Our Process")).toBeInTheDocument();
    expect(
      screen.getByText(
        "A systematic approach to delivering exceptional results through careful planning and execution."
      )
    ).toBeInTheDocument();
  });

  it("renders custom title and description", () => {
    render(
      <ProcessStepsGrid
        title="Custom Process"
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

  it("applies custom className", () => {
    const { container } = render(
      <ProcessStepsGrid className="custom-class" />
    );
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("custom-class");
  });

  it("applies default section padding", () => {
    const { container } = render(<ProcessStepsGrid />);
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("py-32");
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
      expect(card.className).toContain("hover:border-primary/50");
      expect(card.className).toContain("hover:shadow-lg");
    });
  });

  it("renders with empty steps array", () => {
    const { container } = render(<ProcessStepsGrid steps={[]} />);
    expect(container.firstChild).toBeInTheDocument();
    const grid = container.querySelector(".grid");
    expect(grid?.children.length).toBe(0);
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

  it("renders default steps when no steps prop provided", () => {
    render(<ProcessStepsGrid />);
    expect(screen.getByText("Research & Discovery")).toBeInTheDocument();
    expect(screen.getByText("Ideation & Strategy")).toBeInTheDocument();
    expect(screen.getByText("Design & Prototype")).toBeInTheDocument();
    expect(screen.getByText("Development")).toBeInTheDocument();
    expect(screen.getByText("Testing & QA")).toBeInTheDocument();
    expect(screen.getByText("Launch & Support")).toBeInTheDocument();
  });

  it("renders container with proper structure", () => {
    const { container } = render(<ProcessStepsGrid />);
    const containerDiv = container.querySelector(".container");
    expect(containerDiv).toBeInTheDocument();
  });

  it("renders header section centered", () => {
    const { container } = render(<ProcessStepsGrid />);
    const header = container.querySelector(".text-center");
    expect(header).toBeInTheDocument();
    expect(header?.className).toContain("mb-16");
  });
});
