import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactWarranty } from "../contact-warranty";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("ContactWarranty", () => {
  it("renders with provided props", () => {
    const { container } = render(
      <ContactWarranty
        heading="Test Heading"
        description="Test Description"
        buttonText="Test Button"
      />
    );
    expect(container).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ContactWarranty className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
