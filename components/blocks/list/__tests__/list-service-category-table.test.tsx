import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ListServiceCategoryTable } from "../list-service-category-table";
import type { ListServiceCategoryItem } from "../list-service-category-table";

describe("ListServiceCategoryTable", () => {
  const mockItems: ListServiceCategoryItem[] = [
    {
      icon: "lucide/shield",
      category: "Security",
      description: "Enterprise security solution",
      year: 2024,
      offer: "Professional",
      segment: "Business",
    },
    {
      icon: "lucide/cloud",
      category: "Technology",
      description: "Cloud-based platform",
      year: 2023,
      offer: "Free",
      segment: "Enterprise",
    },
  ];

  it("renders custom items correctly", () => {
    render(<ListServiceCategoryTable items={mockItems} />);
    expect(screen.getAllByText("Security").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Technology").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Enterprise security solution").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Cloud-based platform").length).toBeGreaterThan(0);
  });

  it("displays year values correctly", () => {
    render(<ListServiceCategoryTable items={mockItems} />);
    expect(screen.getAllByText("2024").length).toBeGreaterThan(0);
    expect(screen.getAllByText("2023").length).toBeGreaterThan(0);
  });

  it("displays offer types correctly", () => {
    render(<ListServiceCategoryTable items={mockItems} />);
    expect(screen.getByText("Professional")).toBeInTheDocument();
    expect(screen.getByText("Free")).toBeInTheDocument();
  });

  it("displays segment values correctly", () => {
    render(<ListServiceCategoryTable items={mockItems} />);
    expect(screen.getByText("Business")).toBeInTheDocument();
    expect(screen.getByText("Enterprise")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ListServiceCategoryTable items={mockItems} className="custom-class" />
    );
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("custom-class");
  });

  it("applies default padding classes", () => {
    const { container } = render(<ListServiceCategoryTable items={mockItems} />);
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("py-32");
  });

  it("renders table structure correctly", () => {
    const { container } = render(<ListServiceCategoryTable items={mockItems} />);
    expect(container.querySelector("table")).toBeInTheDocument();
    expect(container.querySelector("thead")).toBeInTheDocument();
    expect(container.querySelector("tbody")).toBeInTheDocument();
  });

  it("renders correct number of rows", () => {
    const { container } = render(<ListServiceCategoryTable items={mockItems} />);
    const rows = container.querySelectorAll("tbody tr");
    expect(rows.length).toBe(2);
  });

  it("renders with empty items array", () => {
    const { container } = render(<ListServiceCategoryTable items={[]} />);
    expect(container.firstChild).toBeInTheDocument();
    const rows = container.querySelectorAll("tbody tr");
    expect(rows.length).toBe(0);
  });

  it("renders offer color indicators", () => {
    const { container } = render(<ListServiceCategoryTable items={mockItems} />);
    // Offer indicators now use semantic tokens: bg-accent, bg-primary, bg-secondary
    const accentIndicators = container.querySelectorAll(".bg-accent");
    const primaryIndicators = container.querySelectorAll(".bg-primary");
    expect(accentIndicators.length).toBeGreaterThan(0);
    expect(primaryIndicators.length).toBeGreaterThan(0);
  });

  it("renders items without icons", () => {
    const itemsWithoutIcons: ListServiceCategoryItem[] = [
      {
        category: "Test",
        description: "Test description",
        year: 2024,
        offer: "Free",
        segment: "Business",
      },
    ];
    render(<ListServiceCategoryTable items={itemsWithoutIcons} />);
    expect(screen.getAllByText("Test").length).toBeGreaterThan(0);
  });
});
