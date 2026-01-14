import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CarouselHorizontalCards } from "../carousel-horizontal-cards";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("CarouselHorizontalCards", () => {
  it("renders without crashing", () => {
    const { container } = render(<CarouselHorizontalCards />);
    expect(container).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CarouselHorizontalCards className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
