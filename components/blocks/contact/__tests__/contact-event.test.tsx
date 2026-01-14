import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactEvent } from "../contact-event";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("ContactEvent", () => {
  it("renders with provided props", () => {
    const { container } = render(
      <ContactEvent
        heading="Test Heading"
        description="Test Description"
        buttonText="Test Button"
      />
    );
    expect(container).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ContactEvent className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
