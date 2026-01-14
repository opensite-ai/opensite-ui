import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProcessIconTimeline } from "../process-icon-timeline";

describe("ProcessIconTimeline", () => {
  const mockSteps = [
    {
      icon: "lucide/lightbulb",
      title: "Discovery",
      description: "Understanding your needs",
      highlights: ["Research", "Analysis"],
      badgeColor: "bg-blue-500",
    },
    {
      icon: "lucide/pencil-ruler",
      title: "Design",
      description: "Creating solutions",
      highlights: ["UI/UX", "Prototyping"],
      badgeColor: "bg-purple-500",
    },
    {
      icon: "lucide/code",
      title: "Development",
      description: "Building the product",
      highlights: ["Frontend", "Backend"],
      badgeColor: "bg-green-500",
    },
  ];

  it("renders title and description", () => {
    render(
      <ProcessIconTimeline
        title="Development Timeline"
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

  it("renders icon badges with custom colors", () => {
    const { container } = render(<ProcessIconTimeline steps={mockSteps} />);
    const badges = container.querySelectorAll(".rounded-full.text-white");
    expect(badges.length).toBe(3);
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

  it("renders steps with default badge color when not specified", () => {
    const stepsWithoutBadgeColor = [
      {
        icon: "lucide/star",
        title: "Step 1",
        description: "Description 1",
      },
    ];
    const { container } = render(
      <ProcessIconTimeline steps={stepsWithoutBadgeColor} />
    );
    const badge = container.querySelector(".bg-primary");
    expect(badge).toBeInTheDocument();
  });

  it("renders highlight tags with proper styling", () => {
    const { container } = render(<ProcessIconTimeline steps={mockSteps} />);
    const highlightTags = container.querySelectorAll(
      ".rounded-full.bg-muted.px-3.py-1"
    );
    expect(highlightTags.length).toBe(6);
  });
});
