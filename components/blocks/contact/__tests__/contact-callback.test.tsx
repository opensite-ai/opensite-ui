import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactCallback } from "../contact-callback";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("ContactCallback", () => {

  it("renders custom heading", () => {
    render(<ContactCallback heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactCallback description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<ContactCallback buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ContactCallback className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
