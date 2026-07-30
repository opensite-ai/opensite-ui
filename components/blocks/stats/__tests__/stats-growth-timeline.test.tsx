import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsGrowthTimeline } from "../stats-growth-timeline";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    className,
  }: {
    name?: React.ReactNode;
    className?: string;
  }) =>
    typeof name === "string" ? (
      <span data-testid="mock-icon" data-icon-name={name} className={className}>
        icon
      </span>
    ) : (
      <>{name}</>
    ),
}));

vi.mock("../../../ui/badge", () => ({
  Badge: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span data-testid="mock-badge" className={className}>
      {children}
    </span>
  ),
}));

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">
      {children}
    </a>
  ),
}));

describe("StatsGrowthTimeline", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders badge, heading, and description", () => {
    render(
      <StatsGrowthTimeline
        badge="Our Journey"
        heading="Growing From Startup to Industry Leader"
        description="See our milestones"
      />
    );
    expect(screen.getByText("Our Journey")).toBeInTheDocument();
    expect(screen.getByText("Growing From Startup to Industry Leader")).toBeInTheDocument();
    expect(screen.getByText("See our milestones")).toBeInTheDocument();
  });

  it("routes iconSlot strings dynamically while preserving truthy fallback semantics", () => {
    const { container } = render(
      <StatsGrowthTimeline
        milestones={[
          {
            id: "string-slot",
            year: "2020",
            title: "String slot",
            description: "String icon slot",
            metric: { value: "1", label: "Milestone" },
            iconSlot: "lucide/sparkles",
            icon: "lucide/ignored-string-fallback",
            className: "string-slot-milestone",
          },
          {
            id: "custom-slot",
            year: "2021",
            title: "Custom slot",
            description: "Custom icon slot",
            metric: { value: "2", label: "Milestones" },
            iconSlot: <span data-testid="custom-icon-slot">Custom icon</span>,
            icon: "lucide/ignored-custom-fallback",
            className: "custom-slot-milestone",
          },
          {
            id: "empty-slot",
            year: "2022",
            title: "Empty slot",
            description: "Empty icon slot",
            metric: { value: "3", label: "Milestones" },
            iconSlot: "",
            icon: "lucide/empty-fallback",
            className: "empty-slot-milestone",
          },
          {
            id: "false-slot",
            year: "2023",
            title: "False slot",
            description: "False icon slot",
            metric: { value: "4", label: "Milestones" },
            iconSlot: false,
            icon: "lucide/false-fallback",
            className: "false-slot-milestone",
          },
          {
            id: "zero-slot",
            year: "2024",
            title: "Zero slot",
            description: "Zero icon slot",
            metric: { value: "5", label: "Milestones" },
            iconSlot: 0,
            icon: "lucide/zero-fallback",
            className: "zero-slot-milestone",
          },
        ]}
      />
    );

    const stringIcon = container.querySelector(
      '.string-slot-milestone [data-icon-name="lucide/sparkles"]'
    );
    const customIcon = screen.getByTestId("custom-icon-slot");
    expect(stringIcon).toBeInTheDocument();
    expect(
      container.querySelector(".string-slot-milestone") as HTMLElement
    ).not.toHaveTextContent("lucide/sparkles");
    expect(
      container.querySelector('[data-icon-name="lucide/ignored-string-fallback"]')
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('[data-icon-name="lucide/ignored-custom-fallback"]')
    ).not.toBeInTheDocument();
    expect(stringIcon?.closest(".h-16")).toBeNull();
    expect(customIcon.closest(".h-16")).toBeNull();

    for (const [className, iconName] of [
      ["empty-slot-milestone", "lucide/empty-fallback"],
      ["false-slot-milestone", "lucide/false-fallback"],
      ["zero-slot-milestone", "lucide/zero-fallback"],
    ]) {
      const fallbackIcon = container.querySelector(
        `.${className} [data-icon-name="${iconName}"]`
      );
      expect(fallbackIcon).toBeInTheDocument();
      expect(fallbackIcon?.closest(".h-16")).toBeInTheDocument();
    }
  });

  it("applies custom className", () => {
    const { container } = render(
      <StatsGrowthTimeline
        badge="Test Badge"
        heading="Test Heading"
        description="Test description"
        className="custom-class"
      />
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
