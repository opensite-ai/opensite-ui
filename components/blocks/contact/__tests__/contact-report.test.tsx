import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactReport } from "../contact-report";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("ContactReport", () => {
  it("renders with provided props", () => {
    const { container } = render(
      <ContactReport
        heading="Test Heading"
        description="Test Description"
      />
    );
    expect(container).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ContactReport className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
