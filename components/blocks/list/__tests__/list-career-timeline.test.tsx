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

  it("renders with default section label", () => {
    render(<ListCareerTimeline />);
    expect(screen.getByText("/ CAREER PATH")).toBeInTheDocument();
  });

  it("renders custom section label", () => {
    render(<ListCareerTimeline sectionLabel="/ MY JOURNEY" />);
    expect(screen.getByText("/ MY JOURNEY")).toBeInTheDocument();
  });

  it("renders default heading", () => {
    render(<ListCareerTimeline />);
    expect(screen.getByText(/BUILDING SOLUTIONS/)).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<ListCareerTimeline heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders experience section label", () => {
    render(<ListCareerTimeline />);
    expect(screen.getByText("/ EXPERIENCE")).toBeInTheDocument();
  });

  it("renders custom experience label", () => {
    render(<ListCareerTimeline experienceLabel="/ WORK HISTORY" />);
    expect(screen.getByText("/ WORK HISTORY")).toBeInTheDocument();
  });

  it("renders achievements section label", () => {
    render(<ListCareerTimeline />);
    expect(screen.getByText("/ ACHIEVEMENTS")).toBeInTheDocument();
  });

  it("renders custom achievements label", () => {
    render(<ListCareerTimeline achievementsLabel="/ AWARDS" />);
    expect(screen.getByText("/ AWARDS")).toBeInTheDocument();
  });

  it("renders custom experiences correctly", () => {
    render(<ListCareerTimeline experiences={mockExperiences} />);
    expect(screen.getByText("2019 - PRESENT")).toBeInTheDocument();
    expect(screen.getByText("SENIOR SOFTWARE ENGINEER")).toBeInTheDocument();
    expect(screen.getByText("TECH CORP")).toBeInTheDocument();
    expect(screen.getByText("2017 - 2019")).toBeInTheDocument();
    expect(screen.getByText("SOFTWARE ENGINEER")).toBeInTheDocument();
    expect(screen.getByText("STARTUP INC")).toBeInTheDocument();
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

  it("applies custom className", () => {
    const { container } = render(
      <ListCareerTimeline className="custom-class" />
    );
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("custom-class");
  });

  it("applies default padding classes", () => {
    const { container } = render(<ListCareerTimeline />);
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("py-32");
  });

  it("renders separators between items", () => {
    const { container } = render(
      <ListCareerTimeline experiences={mockExperiences} awards={mockAwards} />
    );
    const separators = container.querySelectorAll("[data-slot='separator']");
    expect(separators.length).toBeGreaterThan(0);
  });

  it("renders with empty experiences array", () => {
    const { container } = render(<ListCareerTimeline experiences={[]} />);
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByText("/ EXPERIENCE")).toBeInTheDocument();
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
