import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactConsultation } from "../contact-consultation";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("ContactConsultation", () => {

  it("renders custom heading", () => {
    render(<ContactConsultation heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ContactConsultation description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

});

