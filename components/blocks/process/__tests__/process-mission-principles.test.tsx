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
});
