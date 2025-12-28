import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroSplitIconCards } from "../hero-split-icon-cards";

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">
      {children}
    </a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>
      icon
    </span>
  ),
}));

describe("HeroSplitIconCards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders default heading", () => {
    render(<HeroSplitIconCards />);
    expect(
      screen.getByText("A hero layout built to clarify your next steps")
    ).toBeInTheDocument();
  });

  it("renders card items", () => {
    render(<HeroSplitIconCards />);
    expect(screen.getByText("Proactive Reviews")).toBeInTheDocument();
    expect(screen.getByText("Smart Coverage Guidance")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <HeroSplitIconCards className="custom-class" />
    );
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });
});
