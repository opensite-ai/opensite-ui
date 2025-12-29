import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProcessMissionPrinciples } from "../process-mission-principles";

describe("ProcessMissionPrinciples", () => {
  const mockPrinciples = [
    {
      number: "01",
      title: "Innovation",
      description: "We embrace new ideas and technologies",
    },
    {
      number: "02",
      title: "Quality",
      description: "We deliver excellence in everything we do",
    },
    {
      number: "03",
      title: "Integrity",
      description: "We act with honesty and transparency",
    },
  ];

  it("renders with default props", () => {
    render(<ProcessMissionPrinciples />);
    expect(screen.getByText("OUR MISSION")).toBeInTheDocument();
    expect(screen.getByText("Building the Future Together")).toBeInTheDocument();
    expect(screen.getByText("OUR PRINCIPLES")).toBeInTheDocument();
  });

  it("renders custom mission label and title", () => {
    render(
      <ProcessMissionPrinciples
        missionLabel="OUR VISION"
        missionTitle="Creating Tomorrow"
      />
    );
    expect(screen.getByText("OUR VISION")).toBeInTheDocument();
    expect(screen.getByText("Creating Tomorrow")).toBeInTheDocument();
  });

  it("renders custom mission description", () => {
    render(
      <ProcessMissionPrinciples
        missionDescription="Our custom mission statement"
      />
    );
    expect(screen.getByText("Our custom mission statement")).toBeInTheDocument();
  });

  it("renders custom principles label", () => {
    render(<ProcessMissionPrinciples principlesLabel="OUR VALUES" />);
    expect(screen.getByText("OUR VALUES")).toBeInTheDocument();
  });

  it("renders all provided principles", () => {
    render(<ProcessMissionPrinciples principles={mockPrinciples} />);
    expect(screen.getByText("Innovation")).toBeInTheDocument();
    expect(screen.getByText("Quality")).toBeInTheDocument();
    expect(screen.getByText("Integrity")).toBeInTheDocument();
  });

  it("renders principle descriptions", () => {
    render(<ProcessMissionPrinciples principles={mockPrinciples} />);
    expect(
      screen.getByText("We embrace new ideas and technologies")
    ).toBeInTheDocument();
    expect(
      screen.getByText("We deliver excellence in everything we do")
    ).toBeInTheDocument();
    expect(
      screen.getByText("We act with honesty and transparency")
    ).toBeInTheDocument();
  });

  it("renders principle numbers", () => {
    render(<ProcessMissionPrinciples principles={mockPrinciples} />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProcessMissionPrinciples className="custom-class" />
    );
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("custom-class");
  });

  it("applies default section padding", () => {
    const { container } = render(<ProcessMissionPrinciples />);
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("py-32");
  });

  it("renders grid layout for principles", () => {
    const { container } = render(
      <ProcessMissionPrinciples principles={mockPrinciples} />
    );
    const grid = container.querySelector(".grid");
    expect(grid?.className).toContain("md:grid-cols-2");
    expect(grid?.className).toContain("lg:grid-cols-3");
  });

  it("renders with empty principles array", () => {
    const { container } = render(<ProcessMissionPrinciples principles={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders default principles when no principles prop provided", () => {
    render(<ProcessMissionPrinciples />);
    expect(screen.getByText("Customer First")).toBeInTheDocument();
    expect(screen.getByText("Continuous Improvement")).toBeInTheDocument();
    expect(screen.getByText("Transparency")).toBeInTheDocument();
    expect(screen.getByText("Quality Over Speed")).toBeInTheDocument();
    expect(screen.getByText("Collaboration")).toBeInTheDocument();
    expect(screen.getByText("Accountability")).toBeInTheDocument();
  });

  it("renders mission section with max width", () => {
    const { container } = render(<ProcessMissionPrinciples />);
    const missionSection = container.querySelector(".max-w-3xl");
    expect(missionSection).toBeInTheDocument();
  });

  it("renders container with proper structure", () => {
    const { container } = render(<ProcessMissionPrinciples />);
    const containerDiv = container.querySelector(".max-w-7xl");
    expect(containerDiv).toBeInTheDocument();
  });

  it("renders principle cards with border and hover effect", () => {
    const { container } = render(
      <ProcessMissionPrinciples principles={mockPrinciples} />
    );
    const cards = container.querySelectorAll(".rounded-lg.border.bg-card");
    expect(cards.length).toBe(3);
    cards.forEach((card) => {
      expect(card.className).toContain("hover:shadow-md");
    });
  });

  it("renders principle number badges", () => {
    const { container } = render(
      <ProcessMissionPrinciples principles={mockPrinciples} />
    );
    const badges = container.querySelectorAll(
      ".rounded-full.bg-primary.text-primary-foreground"
    );
    expect(badges.length).toBe(3);
  });

  it("renders labels with uppercase styling", () => {
    const { container } = render(<ProcessMissionPrinciples />);
    const labels = container.querySelectorAll(".uppercase.tracking-wider");
    expect(labels.length).toBe(2);
  });

  it("renders labels with primary text color", () => {
    const { container } = render(<ProcessMissionPrinciples />);
    const labels = container.querySelectorAll(".text-primary");
    expect(labels.length).toBeGreaterThan(0);
  });

  it("renders mission description with relaxed leading", () => {
    const { container } = render(<ProcessMissionPrinciples />);
    const description = container.querySelector(".leading-relaxed.text-lg");
    expect(description).toBeInTheDocument();
  });
});
