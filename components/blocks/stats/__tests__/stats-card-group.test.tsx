import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsCardGroup } from "../stats-card-group";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-icon-name={name} className={className}>
      icon
    </span>
  ),
}));

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("StatsCardGroup", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    const { container } = render(<StatsCardGroup stats={[]} />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders stats when provided", () => {
    const stats = [
      { icon: "lucide/users", value: "2,000+", label: "Happy Customers" },
      { icon: "lucide/star", value: "4.9/5", label: "Average Rating" },
    ];
    render(<StatsCardGroup stats={stats} />);
    expect(screen.getByText("2,000+")).toBeInTheDocument();
    expect(screen.getByText("Happy Customers")).toBeInTheDocument();
    expect(screen.getByText("4.9/5")).toBeInTheDocument();
    expect(screen.getByText("Average Rating")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<StatsCardGroup className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
