import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactDemo } from "../contact-demo";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>
      icon
    </span>
  ),
}));

describe("ContactDemo", () => {
  it("renders custom heading", () => {
    render(<ContactDemo heading="Custom Heading" />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Custom");
    expect(heading).toHaveTextContent("Heading");
  });

  it("renders custom description", () => {
    render(<ContactDemo description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

});

