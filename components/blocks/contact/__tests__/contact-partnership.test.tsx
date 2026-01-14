import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactPartnership } from "../contact-partnership";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("ContactPartnership", () => {
  it("renders without crashing", () => {
    const { container } = render(<ContactPartnership />);
    expect(container).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ContactPartnership className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
