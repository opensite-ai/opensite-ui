import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ListAchievementsShowcase } from "../list-achievements-showcase";
import type { ListAchievementItem } from "../list-achievements-showcase";

describe("ListAchievementsShowcase", () => {
  const mockItems: ListAchievementItem[] = [
    {
      icon: "lucide/trophy",
      title: "Industry Recognition",
      category: "Achievement",
      description: "Outstanding Performance Award.",
      link: "/achievements/recognition",
    },
    {
      icon: "lucide/award",
      title: "Excellence Award",
      category: "Recognition",
      description: "Best in Category Winner.",
      link: "/achievements/excellence",
    },
  ];

  it("renders with default heading", () => {
    render(<ListAchievementsShowcase />);
    expect(
      screen.getByText("Our Achievements & Recognition")
    ).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<ListAchievementsShowcase heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom items correctly", () => {
    render(<ListAchievementsShowcase items={mockItems} />);
    expect(screen.getByText("Industry Recognition")).toBeInTheDocument();
    expect(screen.getByText("Excellence Award")).toBeInTheDocument();
    expect(screen.getByText("Outstanding Performance Award.")).toBeInTheDocument();
    expect(screen.getByText("Best in Category Winner.")).toBeInTheDocument();
  });

  it("renders category labels", () => {
    render(<ListAchievementsShowcase items={mockItems} />);
    expect(screen.getByText("Achievement")).toBeInTheDocument();
    expect(screen.getByText("Recognition")).toBeInTheDocument();
  });

  it("renders action buttons with correct text", () => {
    render(<ListAchievementsShowcase items={mockItems} buttonText="Learn more" />);
    const buttons = screen.getAllByText("Learn more");
    expect(buttons.length).toBe(2);
  });

  it("renders default button text", () => {
    render(<ListAchievementsShowcase items={mockItems} />);
    const buttons = screen.getAllByText("View project");
    expect(buttons.length).toBe(2);
  });

  it("renders links with correct href", () => {
    render(<ListAchievementsShowcase items={mockItems} />);
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/achievements/recognition");
    expect(links[1]).toHaveAttribute("href", "/achievements/excellence");
  });

  it("applies custom className", () => {
    const { container } = render(
      <ListAchievementsShowcase items={mockItems} className="custom-class" />
    );
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("custom-class");
  });

  it("applies default padding classes", () => {
    const { container } = render(<ListAchievementsShowcase items={mockItems} />);
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("py-32");
  });

  it("renders separators between items", () => {
    const { container } = render(<ListAchievementsShowcase items={mockItems} />);
    const separators = container.querySelectorAll("[data-slot='separator']");
    expect(separators.length).toBeGreaterThan(0);
  });

  it("renders with empty items array", () => {
    const { container } = render(<ListAchievementsShowcase items={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders items without icons", () => {
    const itemsWithoutIcons: ListAchievementItem[] = [
      {
        title: "Test Achievement",
        category: "Test",
        description: "Test description",
        link: "#",
      },
    ];
    render(<ListAchievementsShowcase items={itemsWithoutIcons} />);
    expect(screen.getByText("Test Achievement")).toBeInTheDocument();
  });

  it("renders correct grid layout", () => {
    const { container } = render(<ListAchievementsShowcase items={mockItems} />);
    const gridItems = container.querySelectorAll(".grid.items-center");
    expect(gridItems.length).toBe(2);
  });
});
