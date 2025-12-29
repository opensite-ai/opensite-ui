import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProcessRoadmapTimeline } from "../process-roadmap-timeline";

describe("ProcessRoadmapTimeline", () => {
  const mockMilestones = [
    {
      title: "Phase 1",
      description: "Initial setup",
      date: "Q1 2024",
      status: "completed" as const,
      features: ["Feature A", "Feature B"],
    },
    {
      title: "Phase 2",
      description: "Core development",
      date: "Q2 2024",
      status: "in-progress" as const,
      features: ["Feature C", "Feature D"],
    },
    {
      title: "Phase 3",
      description: "Final launch",
      date: "Q3 2024",
      status: "upcoming" as const,
      features: ["Feature E", "Feature F"],
    },
  ];

  it("renders with default props", () => {
    render(<ProcessRoadmapTimeline />);
    expect(screen.getByText("Product Roadmap")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Our journey from concept to completion, with clear milestones and deliverables."
      )
    ).toBeInTheDocument();
  });

  it("renders custom title and description", () => {
    render(
      <ProcessRoadmapTimeline
        title="Development Roadmap"
        description="Our planned milestones"
      />
    );
    expect(screen.getByText("Development Roadmap")).toBeInTheDocument();
    expect(screen.getByText("Our planned milestones")).toBeInTheDocument();
  });

  it("renders all provided milestones", () => {
    render(<ProcessRoadmapTimeline milestones={mockMilestones} />);
    expect(screen.getByText("Phase 1")).toBeInTheDocument();
    expect(screen.getByText("Phase 2")).toBeInTheDocument();
    expect(screen.getByText("Phase 3")).toBeInTheDocument();
  });

  it("renders milestone descriptions", () => {
    render(<ProcessRoadmapTimeline milestones={mockMilestones} />);
    expect(screen.getByText("Initial setup")).toBeInTheDocument();
    expect(screen.getByText("Core development")).toBeInTheDocument();
    expect(screen.getByText("Final launch")).toBeInTheDocument();
  });

  it("renders milestone dates", () => {
    render(<ProcessRoadmapTimeline milestones={mockMilestones} />);
    expect(screen.getByText("Q1 2024")).toBeInTheDocument();
    expect(screen.getByText("Q2 2024")).toBeInTheDocument();
    expect(screen.getByText("Q3 2024")).toBeInTheDocument();
  });

  it("renders status badges", () => {
    render(<ProcessRoadmapTimeline milestones={mockMilestones} />);
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Upcoming")).toBeInTheDocument();
  });

  it("renders feature tags", () => {
    render(<ProcessRoadmapTimeline milestones={mockMilestones} />);
    expect(screen.getByText("Feature A")).toBeInTheDocument();
    expect(screen.getByText("Feature B")).toBeInTheDocument();
    expect(screen.getByText("Feature C")).toBeInTheDocument();
    expect(screen.getByText("Feature D")).toBeInTheDocument();
    expect(screen.getByText("Feature E")).toBeInTheDocument();
    expect(screen.getByText("Feature F")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProcessRoadmapTimeline className="custom-class" />
    );
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("custom-class");
  });

  it("applies default section padding", () => {
    const { container } = render(<ProcessRoadmapTimeline />);
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("py-32");
  });

  it("renders timeline line", () => {
    const { container } = render(<ProcessRoadmapTimeline />);
    const timelineLine = container.querySelector(".bg-border.w-px");
    expect(timelineLine).toBeInTheDocument();
  });

  it("renders with empty milestones array", () => {
    const { container } = render(<ProcessRoadmapTimeline milestones={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders default milestones when no milestones prop provided", () => {
    render(<ProcessRoadmapTimeline />);
    expect(screen.getByText("Foundation")).toBeInTheDocument();
    expect(screen.getByText("Core Features")).toBeInTheDocument();
    expect(screen.getByText("Enhancement Phase")).toBeInTheDocument();
    expect(screen.getByText("Scale & Optimize")).toBeInTheDocument();
    expect(screen.getByText("Enterprise Features")).toBeInTheDocument();
  });

  it("renders header section centered", () => {
    const { container } = render(<ProcessRoadmapTimeline />);
    const header = container.querySelector(".text-center");
    expect(header).toBeInTheDocument();
  });

  it("renders container with proper structure", () => {
    const { container } = render(<ProcessRoadmapTimeline />);
    const containerDiv = container.querySelector(".max-w-7xl");
    expect(containerDiv).toBeInTheDocument();
  });

  it("renders milestone cards with border and shadow", () => {
    const { container } = render(
      <ProcessRoadmapTimeline milestones={mockMilestones} />
    );
    const cards = container.querySelectorAll(".rounded-lg.border.bg-card");
    expect(cards.length).toBe(3);
  });

  it("applies special border to in-progress milestone", () => {
    const { container } = render(
      <ProcessRoadmapTimeline milestones={mockMilestones} />
    );
    const inProgressCard = container.querySelector(".border-primary\\/50");
    expect(inProgressCard).toBeInTheDocument();
  });

  it("renders check icon for completed milestones", () => {
    const { container } = render(
      <ProcessRoadmapTimeline milestones={mockMilestones} />
    );
    const completedBadge = container.querySelector(".border-green-500.bg-green-500");
    expect(completedBadge).toBeInTheDocument();
  });

  it("renders number for non-completed milestones", () => {
    render(<ProcessRoadmapTimeline milestones={mockMilestones} />);
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders milestones without date", () => {
    const milestonesWithoutDate = [
      {
        title: "Milestone 1",
        description: "Description 1",
        status: "completed" as const,
      },
    ];
    render(<ProcessRoadmapTimeline milestones={milestonesWithoutDate} />);
    expect(screen.getByText("Milestone 1")).toBeInTheDocument();
  });

  it("renders milestones without features", () => {
    const milestonesWithoutFeatures = [
      {
        title: "Milestone 1",
        description: "Description 1",
        status: "completed" as const,
      },
    ];
    render(<ProcessRoadmapTimeline milestones={milestonesWithoutFeatures} />);
    expect(screen.getByText("Milestone 1")).toBeInTheDocument();
  });

  it("renders max width container for timeline", () => {
    const { container } = render(<ProcessRoadmapTimeline />);
    const maxWidthContainer = container.querySelector(".max-w-4xl");
    expect(maxWidthContainer).toBeInTheDocument();
  });
});
