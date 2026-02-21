import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactReservation } from "../contact-reservation";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("ContactReservation", () => {
  it("renders with provided props", () => {
    const { container } = render(
      <ContactReservation
        heading="Test Heading"
        description="Test Description"
      />
    );
    expect(container).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ContactReservation className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
