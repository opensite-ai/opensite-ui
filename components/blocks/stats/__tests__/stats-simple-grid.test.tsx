import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { StatsSimpleGrid } from "../stats-simple-grid";

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">
      {children}
    </a>
  ),
}));

describe("StatsSimpleGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<StatsSimpleGrid />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<StatsSimpleGrid className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders stats grid", () => {
    const { container } = render(<StatsSimpleGrid />);
    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
  });
});
