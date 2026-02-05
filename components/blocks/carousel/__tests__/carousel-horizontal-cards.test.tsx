import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CarouselHorizontalCards } from "../carousel-horizontal-cards";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("CarouselHorizontalCards", () => {
  const mockItems = [
    { id: 1, imageSrc: "/test1.jpg", title: "Test Card 1", count: "100" },
    { id: 2, imageSrc: "/test2.jpg", title: "Test Card 2", count: "200" },
  ];

  it("renders with required props", () => {
    const { container } = render(<CarouselHorizontalCards items={mockItems} />);
    expect(container).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CarouselHorizontalCards items={mockItems} className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
