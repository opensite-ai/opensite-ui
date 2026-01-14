import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactQuote } from "../contact-quote";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("ContactQuote", () => {
  it("renders without crashing", () => {
    const { container } = render(<ContactQuote />);
    expect(container).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ContactQuote className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
