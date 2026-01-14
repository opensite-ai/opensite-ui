import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactFitness } from "../contact-fitness";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("ContactFitness", () => {
  it("renders without crashing", () => {
    const { container } = render(<ContactFitness />);
    expect(container).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ContactFitness className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
