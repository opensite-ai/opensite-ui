import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactSchedule } from "../contact-schedule";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("ContactSchedule", () => {
  it("renders without crashing", () => {
    const { container } = render(<ContactSchedule />);
    expect(container).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ContactSchedule className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
