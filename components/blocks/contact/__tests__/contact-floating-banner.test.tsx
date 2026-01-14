import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactFloatingBanner } from "../contact-floating-banner";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("ContactFloatingBanner", () => {

  it("renders custom button text", () => {
    render(<ContactFloatingBanner buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });
});
