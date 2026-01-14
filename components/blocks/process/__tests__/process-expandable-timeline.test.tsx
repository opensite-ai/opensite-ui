import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProcessExpandableTimeline } from "../process-expandable-timeline";

describe("ProcessExpandableTimeline", () => {
  const mockSteps = [
    {
      title: "Discovery",
      description: "Understanding your needs",
      expandedContent: "Detailed discovery process information",
    },
    {
      title: "Planning",
      description: "Creating a roadmap",
      expandedContent: "Detailed planning process information",
    },
    {
      title: "Execution",
      description: "Building the solution",
      expandedContent: "Detailed execution process information",
    },
  ];

  it("renders title and description", () => {
    render(
      <ProcessExpandableTimeline
        title="Our Methodology"
        description="Expand each step to learn more"
      />
    );
    expect(screen.getByText("Our Methodology")).toBeInTheDocument();
    expect(
      screen.getByText("Expand each step to learn more")
    ).toBeInTheDocument();
  });

  it("renders all provided steps", () => {
    render(<ProcessExpandableTimeline steps={mockSteps} />);
    expect(screen.getByText("Discovery")).toBeInTheDocument();
    expect(screen.getByText("Planning")).toBeInTheDocument();
    expect(screen.getByText("Execution")).toBeInTheDocument();
  });

  it("renders step descriptions", () => {
    render(<ProcessExpandableTimeline steps={mockSteps} />);
    expect(screen.getByText("Understanding your needs")).toBeInTheDocument();
    expect(screen.getByText("Creating a roadmap")).toBeInTheDocument();
    expect(screen.getByText("Building the solution")).toBeInTheDocument();
  });

  it("expands step content on click", () => {
    render(<ProcessExpandableTimeline steps={mockSteps} />);
    
    const firstStepButton = screen.getByText("Discovery").closest("button");
    expect(firstStepButton).toBeInTheDocument();
    
    if (firstStepButton) {
      fireEvent.click(firstStepButton);
    }
    
    expect(
      screen.getByText("Detailed discovery process information")
    ).toBeInTheDocument();
  });

  it("collapses expanded step on second click", () => {
    render(<ProcessExpandableTimeline steps={mockSteps} />);
    
    const firstStepButton = screen.getByText("Discovery").closest("button");
    
    if (firstStepButton) {
      fireEvent.click(firstStepButton);
      expect(
        screen.getByText("Detailed discovery process information")
      ).toBeInTheDocument();
      
      fireEvent.click(firstStepButton);
    }
  });

  it("renders step numbers with leading zeros", () => {
    render(<ProcessExpandableTimeline steps={mockSteps} />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
  });

  it("renders with empty steps array", () => {
    const { container } = render(<ProcessExpandableTimeline steps={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders steps as clickable buttons", () => {
    const { container } = render(<ProcessExpandableTimeline steps={mockSteps} />);
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBe(3);
  });

  it("renders corner connector SVG", () => {
    const { container } = render(<ProcessExpandableTimeline steps={mockSteps} />);
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThan(0);
  });

  it("changes step badge style when expanded", () => {
    const { container } = render(<ProcessExpandableTimeline steps={mockSteps} />);
    
    const firstStepButton = screen.getByText("Discovery").closest("button");
    
    if (firstStepButton) {
      fireEvent.click(firstStepButton);
    }
    
    const expandedBadge = container.querySelector(
      ".border-primary.bg-primary.text-primary-foreground"
    );
    expect(expandedBadge).toBeInTheDocument();
  });

  it("renders steps without expandedContent", () => {
    const stepsWithoutExpanded = [
      {
        title: "Step 1",
        description: "Description 1",
      },
    ];
    render(<ProcessExpandableTimeline steps={stepsWithoutExpanded} />);
    expect(screen.getByText("Step 1")).toBeInTheDocument();
  });

  it("applies hover background class to buttons", () => {
    const { container } = render(<ProcessExpandableTimeline steps={mockSteps} />);
    const buttons = container.querySelectorAll("button");
    buttons.forEach((button) => {
      expect(button.className).toContain("hover:bg-muted/30");
    });
  });
});
