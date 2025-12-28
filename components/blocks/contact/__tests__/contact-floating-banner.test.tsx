import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactFloatingBanner } from "../contact-floating-banner";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("ContactFloatingBanner", () => {
  it("renders with default props", () => {
    const { container } = render(<ContactFloatingBanner />);
    const div = container.querySelector("div");
    expect(div).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ContactFloatingBanner className="custom-class" />);
    const div = container.querySelector("div");
    expect(div).toHaveClass("custom-class");
  });

  it("renders custom button text", () => {
    render(<ContactFloatingBanner buttonText="Custom Button" />);
    expect(screen.getByText("Custom Button")).toBeInTheDocument();
  });

  it("renders button with href", () => {
    render(<ContactFloatingBanner buttonHref="/contact" />);
    const button = screen.getByRole("link");
    expect(button).toHaveAttribute("href", "/contact");
  });

  it("renders icon", () => {
    const { container } = render(<ContactFloatingBanner />);
    const icon = container.querySelector('[data-testid="mock-icon"]');
    expect(icon).toBeInTheDocument();
  });
});
