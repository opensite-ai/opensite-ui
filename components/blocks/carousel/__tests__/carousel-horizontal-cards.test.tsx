import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CarouselHorizontalCards } from "../carousel-horizontal-cards";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("CarouselHorizontalCards", () => {
  const mockCards = [
    { title: "Test Card 1", description: "Description 1", icon: "lucide/star" },
    { title: "Test Card 2", description: "Description 2", icon: "lucide/heart" },
  ];

  it("renders with required props", () => {
    const { container } = render(<CarouselHorizontalCards cards={mockCards} />);
    expect(container).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CarouselHorizontalCards cards={mockCards} className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
