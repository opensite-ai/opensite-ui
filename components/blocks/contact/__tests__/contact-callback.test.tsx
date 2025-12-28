import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactCallback } from "../contact-callback";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("ContactCallback", () => {
  it("renders with default props", () => {
    const { container } = render(<ContactCallback />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ContactCallback className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

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

  it("renders form with submit button", () => {
    render(<ContactCallback />);
    const submitButton = screen.getByRole("button", { name: /schedule callback/i });
    expect(submitButton).toBeInTheDocument();
  });

  it("renders date input field", () => {
    const { container } = render(<ContactCallback />);
    const dateInput = container.querySelector('input[type="date"]');
    expect(dateInput).toBeInTheDocument();
  });
});
