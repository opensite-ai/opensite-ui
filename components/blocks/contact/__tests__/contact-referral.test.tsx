import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactReferral } from "../contact-referral";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("ContactReferral", () => {
  it("renders without crashing", () => {
    const { container } = render(<ContactReferral />);
    expect(container).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ContactReferral className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
