import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsMilestoneSidebar } from "../stats-milestone-sidebar";

describe("StatsMilestoneSidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<StatsMilestoneSidebar />);
    expect(screen.getByText("Our Journey")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<StatsMilestoneSidebar heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<StatsMilestoneSidebar description="Custom description" />);
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders milestones when provided", () => {
    const milestones = [
      { year: "2020", title: "Company Founded", description: "Started our journey" },
      { year: "2021", title: "First Product", description: "Launched our first product" },
    ];
    render(<StatsMilestoneSidebar milestones={milestones} />);
    expect(screen.getByText("2020")).toBeInTheDocument();
    expect(screen.getByText("Company Founded")).toBeInTheDocument();
    expect(screen.getByText("2021")).toBeInTheDocument();
    expect(screen.getByText("First Product")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<StatsMilestoneSidebar className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
