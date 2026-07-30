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
  DynamicIcon: ({
    name,
    size,
  }: {
    name?: React.ReactNode | string;
    size?: number;
  }) =>
    typeof name === "string" ? (
      <span data-testid={`icon-${name}`} data-size={size} />
    ) : (
      <>{name}</>
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

  it("renders solution and CTA icon names dynamically without raw text", () => {
    const solutionIcon = "lucide/badge-check";
    const leadingIcon = "lucide/rocket";
    const trailingIcon = "lucide/arrow-right";

    render(
      <CaseStudyStatsMetrics
        solutionLabel="Platform solution"
        solutionIcon={solutionIcon}
        solutionHref="/solution"
        ctaAction={{
          label: "Start now",
          href: "/start",
          icon: leadingIcon,
          iconAfter: trailingIcon,
        }}
      />,
    );

    const solutionAction = screen
      .getByText("Platform solution")
      .closest("button, a");
    const ctaAction = screen.getByText("Start now").closest("button, a");
    expect(solutionAction).not.toBeNull();
    expect(solutionAction).not.toHaveTextContent(solutionIcon);
    expect(ctaAction).not.toBeNull();
    expect(ctaAction).not.toHaveTextContent(leadingIcon);
    expect(ctaAction).not.toHaveTextContent(trailingIcon);
    expect(screen.getByTestId(`icon-${solutionIcon}`)).toBeInTheDocument();
    expect(screen.getByTestId(`icon-${leadingIcon}`)).toBeInTheDocument();
    expect(screen.getByTestId(`icon-${trailingIcon}`)).toBeInTheDocument();
  });

  it("preserves custom solution and CTA icon elements", () => {
    render(
      <CaseStudyStatsMetrics
        solutionLabel="Platform solution"
        solutionIcon={<span data-testid="custom-solution-icon" />}
        solutionHref="/solution"
        ctaAction={{
          label: "Start now",
          href: "/start",
          icon: <span data-testid="custom-leading-icon" />,
          iconAfter: <span data-testid="custom-trailing-icon" />,
        }}
      />,
    );

    expect(screen.getByTestId("custom-solution-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-trailing-icon")).toBeInTheDocument();
  });
});
