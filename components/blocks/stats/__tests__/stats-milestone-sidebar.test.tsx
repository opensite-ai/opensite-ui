import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { StatsMilestoneSidebar } from "../stats-milestone-sidebar";

describe("StatsMilestoneSidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<StatsMilestoneSidebar />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<StatsMilestoneSidebar className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders milestones", () => {
    const { container } = render(<StatsMilestoneSidebar />);
    const milestones = container.querySelectorAll(".border-l-2");
    expect(milestones.length).toBeGreaterThan(0);
  });
});
