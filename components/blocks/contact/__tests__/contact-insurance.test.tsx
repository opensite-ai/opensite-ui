import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactInsurance } from "../contact-insurance";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("ContactInsurance", () => {
  it("renders with provided props", () => {
    const { container } = render(
      <ContactInsurance
        heading="Test Heading"
        description="Test Description"
        buttonText="Test Button"
      />
    );
    expect(container).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ContactInsurance className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
