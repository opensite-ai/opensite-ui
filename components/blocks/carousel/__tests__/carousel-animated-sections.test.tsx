import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CarouselAnimatedSections } from "../carousel-animated-sections";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("CarouselAnimatedSections", () => {
  const mockSection = {
    id: "1",
    title: "Test Section",
    image: "/test.jpg",
  };

  it("renders without crashing", () => {
    const { container } = render(<CarouselAnimatedSections sections={[mockSection]} />);
    expect(container).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CarouselAnimatedSections sections={[mockSection]} className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
