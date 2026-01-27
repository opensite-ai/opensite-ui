import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CaseStudyStatsMetrics } from "../case-study-stats-metrics";

// Mock dependencies
vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, size }: { name: string; size: number }) => (
    <span data-testid="mock-icon" data-name={name} data-size={size}>icon</span>
  ),
}));

describe("CaseStudyStatsMetrics", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title and subtitle", () => {
    render(
      <CaseStudyStatsMetrics
        title="Custom Title"
        subtitle="Custom Subtitle"
      />
    );
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom Subtitle")).toBeInTheDocument();
  });

  it("renders custom stats", () => {
    const customStats = [
      { value: "100%", label: "Custom stat label" },
    ];

    render(<CaseStudyStatsMetrics stats={customStats} />);
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText("Custom stat label")).toBeInTheDocument();
  });

  it("renders learn more link", () => {
    render(
      <CaseStudyStatsMetrics
        ctaLabel="Learn More"
        ctaAction={{ label: "Get Started", href: "/start" }}
      />
    );
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("renders custom content", () => {
    const customContent = <p>Custom content paragraph</p>;
    render(<CaseStudyStatsMetrics content={customContent} />);
    expect(screen.getByText("Custom content paragraph")).toBeInTheDocument();
  });
});

