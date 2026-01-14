import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ListCareerTimeline } from "../list-career-timeline";
import type { ListExperienceItem, ListAwardItem } from "../list-career-timeline";

describe("ListCareerTimeline", () => {
  const mockExperiences: ListExperienceItem[] = [
    {
      year: "2019 - PRESENT",
      role: "SENIOR SOFTWARE ENGINEER",
      company: "TECH CORP",
    },
    {
      year: "2017 - 2019",
      role: "SOFTWARE ENGINEER",
      company: "STARTUP INC",
    },
  ];

  const mockAwards: ListAwardItem[] = [
    {
      year: "2023",
      title: "BEST SOFTWARE ENGINEER",
      organization: "TECH AWARDS",
    },
    {
      year: "2022",
      title: "INNOVATION AWARD",
      organization: "INDUSTRY COUNCIL",
    },
  ];

  it("renders custom heading", () => {
    render(<ListCareerTimeline heading="Custom Heading" awards={[]} />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom awards correctly", () => {
    render(<ListCareerTimeline awards={mockAwards} />);
    expect(screen.getByText("2023")).toBeInTheDocument();
    expect(screen.getByText("BEST SOFTWARE ENGINEER")).toBeInTheDocument();
    expect(screen.getByText("TECH AWARDS")).toBeInTheDocument();
    expect(screen.getByText("2022")).toBeInTheDocument();
    expect(screen.getByText("INNOVATION AWARD")).toBeInTheDocument();
    expect(screen.getByText("INDUSTRY COUNCIL")).toBeInTheDocument();
  });

  it("renders separators between items", () => {
    const { container } = render(
      <ListCareerTimeline experiences={mockExperiences} awards={mockAwards} />
    );
    const separators = container.querySelectorAll("[data-slot='separator']");
    expect(separators.length).toBeGreaterThan(0);
  });

  it("renders with empty awards array", () => {
    const { container } = render(<ListCareerTimeline awards={[]} />);
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByText("/ ACHIEVEMENTS")).toBeInTheDocument();
  });

  it("renders grid layout for items", () => {
    const { container } = render(
      <ListCareerTimeline experiences={mockExperiences} awards={mockAwards} />
    );
    const gridItems = container.querySelectorAll(".grid.gap-2\\.5");
    expect(gridItems.length).toBe(4);
  });
});
