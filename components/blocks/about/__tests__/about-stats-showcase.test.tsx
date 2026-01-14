import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutStatsShowcase } from "../about-stats-showcase";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("AboutStatsShowcase", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(
      <AboutStatsShowcase
        title="Test Title"
        description="Test Description"
        statsTitle="Test Stats Title"
      />
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Test Stats Title")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<AboutStatsShowcase title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<AboutStatsShowcase description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom stats title", () => {
    render(<AboutStatsShowcase statsTitle="Custom Stats Title" />);
    expect(screen.getByText("Custom Stats Title")).toBeInTheDocument();
  });

  it("renders benefits section when benefits provided", () => {
    const benefits = [{ stat: { value: "100%", label: "Satisfaction" } }];
    render(<AboutStatsShowcase benefits={benefits} benefitsTitle="Custom Benefits" />);
    expect(screen.getByText("Custom Benefits")).toBeInTheDocument();
  });

  it("renders stats when provided", () => {
    const stats = [
      { value: "100+", label: "Customers" },
      { value: "50K", label: "Users" },
    ];
    render(<AboutStatsShowcase stats={stats} />);
    expect(screen.getByText("100+")).toBeInTheDocument();
    expect(screen.getByText("Customers")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<AboutStatsShowcase className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
