import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactRetreat } from "../contact-retreat";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("ContactRetreat", () => {
  it("renders with provided props", () => {
    const { container } = render(
      <ContactRetreat
        heading="Test Heading"
        description="Test Description"
        buttonText="Test Button"
      />
    );
    expect(container).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ContactRetreat className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
