import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactMap } from "../contact-map";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("ContactMap", () => {
  it("renders with provided props", () => {
    const { container } = render(
      <ContactMap
        heading="Test Heading"
        description="Test Description"
      />
    );
    expect(container).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ContactMap className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
