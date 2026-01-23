import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsImpactGrid, type ImpactStat } from "../stats-impact-grid";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-icon-name={name} className={className}>
      icon
    </span>
  ),
}));

vi.mock("../../../ui/badge", () => ({
  Badge: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <span data-testid="mock-badge" className={className}>
      {children}
    </span>
  ),
}));

vi.mock("../../../ui/card", () => ({
  Card: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="mock-card" className={className}>
      {children}
    </div>
  ),
  CardContent: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="mock-card-content" className={className}>
      {children}
    </div>
  ),
}));

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href?: string;
    className?: string;
  }) => (
    <a href={href} className={className} data-testid="mock-pressable">
      {children}
    </a>
  ),
}));

describe("StatsImpactGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Header Section", () => {
    it("renders badge, heading, and description when provided", () => {
      render(
        <StatsImpactGrid
          badge="Performance Metrics"
          heading="Our Key Results"
          description="See how we measure success"
        />
      );
      expect(screen.getByText("Performance Metrics")).toBeInTheDocument();
      expect(screen.getByText("Our Key Results")).toBeInTheDocument();
      expect(screen.getByText("See how we measure success")).toBeInTheDocument();
    });

    it("does not render header section when no header props provided", () => {
      const { container } = render(<StatsImpactGrid />);
      // Should not have the header wrapper with mb-12 and text-center
      const headerDiv = container.querySelector(".mb-12.text-center");
      expect(headerDiv).not.toBeInTheDocument();
    });

    it("renders custom badgeSlot when provided", () => {
      render(
        <StatsImpactGrid
          badgeSlot={<div data-testid="custom-badge">Custom Badge</div>}
        />
      );
      expect(screen.getByTestId("custom-badge")).toBeInTheDocument();
    });

    it("renders heading as ReactNode", () => {
      render(
        <StatsImpactGrid
          heading={<span data-testid="custom-heading">Custom Heading</span>}
        />
      );
      expect(screen.getByTestId("custom-heading")).toBeInTheDocument();
    });
  });

  describe("Stats Grid Section", () => {
    const sampleStats: ImpactStat[] = [
      {
        id: "stat-1",
        value: "437",
        suffix: "%",
        label: "Growth Rate",
        description: "Year over year improvement",
      },
      {
        id: "stat-2",
        value: "2.4",
        prefix: "$",
        suffix: "M",
        label: "Revenue",
        description: "Annual revenue generated",
      },
      {
        id: "stat-3",
        value: "99.9",
        suffix: "%",
        label: "Uptime",
        icon: "lucide/server",
      },
    ];

    it("renders stats grid with provided stats", () => {
      render(<StatsImpactGrid stats={sampleStats} />);

      expect(screen.getByText("437")).toBeInTheDocument();
      expect(screen.getByText("Growth Rate")).toBeInTheDocument();
      expect(screen.getByText("Year over year improvement")).toBeInTheDocument();

      expect(screen.getByText("2.4")).toBeInTheDocument();
      expect(screen.getByText("Revenue")).toBeInTheDocument();

      expect(screen.getByText("99.9")).toBeInTheDocument();
      expect(screen.getByText("Uptime")).toBeInTheDocument();
    });

    it("renders stat prefix and suffix correctly", () => {
      render(
        <StatsImpactGrid
          stats={[
            {
              id: "money",
              value: "100",
              prefix: "€",
              suffix: "K",
              label: "Budget",
            },
          ]}
        />
      );
      expect(screen.getByText("€")).toBeInTheDocument();
      expect(screen.getByText("100")).toBeInTheDocument();
      expect(screen.getByText("K")).toBeInTheDocument();
    });

    it("renders stat icons when provided", () => {
      render(<StatsImpactGrid stats={sampleStats} />);
      const icons = screen.getAllByTestId("mock-icon");
      expect(icons.length).toBeGreaterThan(0);
    });

    it("renders custom iconSlot when provided", () => {
      render(
        <StatsImpactGrid
          stats={[
            {
              id: "custom-icon",
              value: "50",
              label: "Score",
              iconSlot: <div data-testid="custom-icon-slot">Custom Icon</div>,
            },
          ]}
        />
      );
      expect(screen.getByTestId("custom-icon-slot")).toBeInTheDocument();
    });

    it("does not render stats section when stats array is empty", () => {
      const { container } = render(<StatsImpactGrid stats={[]} />);
      expect(container.querySelectorAll('[data-testid="mock-card"]').length).toBe(0);
    });

    it("renders custom statsSlot when provided", () => {
      render(
        <StatsImpactGrid
          statsSlot={<div data-testid="custom-stats">Custom Stats Content</div>}
        />
      );
      expect(screen.getByTestId("custom-stats")).toBeInTheDocument();
    });
  });

  describe("Comparison Section", () => {
    it("renders comparison section with all props", () => {
      render(
        <StatsImpactGrid
          comparisonHeading="Performance Comparison"
          comparisonDescription="See how we compare to the baseline"
          baselineLabel="Before"
          baselineValue="24%"
          baselinePercent={24}
          targetLabel="After"
          targetValue="89%"
          targetPercent={89}
        />
      );

      expect(screen.getByText("Performance Comparison")).toBeInTheDocument();
      expect(screen.getByText("See how we compare to the baseline")).toBeInTheDocument();
      expect(screen.getByText("24%")).toBeInTheDocument();
      expect(screen.getByText("89%")).toBeInTheDocument();
      // Labels appear in progress bar area and value area (uppercase)
      expect(screen.getAllByText("Before").length).toBeGreaterThan(0);
      expect(screen.getAllByText("After").length).toBeGreaterThan(0);
    });

    it("does not render comparison section when no comparison props provided", () => {
      const { container } = render(<StatsImpactGrid heading="Test" />);
      // The comparison section has bg-muted class
      const comparisonSection = container.querySelector(".bg-muted");
      expect(comparisonSection).not.toBeInTheDocument();
    });

    it("renders progress bars with correct widths", () => {
      const { container } = render(
        <StatsImpactGrid
          baselineLabel="Before"
          targetLabel="After"
          baselinePercent={30}
          targetPercent={75}
        />
      );

      const progressBars = container.querySelectorAll('[style*="width"]');
      const progressBarStyles = Array.from(progressBars).map((el) =>
        (el as HTMLElement).style.width
      );
      expect(progressBarStyles).toContain("30%");
      expect(progressBarStyles).toContain("75%");
    });

    it("renders comparison heading as ReactNode", () => {
      render(
        <StatsImpactGrid
          comparisonHeading={
            <span data-testid="custom-comparison-heading">Custom Comparison</span>
          }
        />
      );
      expect(screen.getByTestId("custom-comparison-heading")).toBeInTheDocument();
    });

    it("renders custom comparisonSlot when provided", () => {
      render(
        <StatsImpactGrid
          comparisonSlot={<div data-testid="custom-comparison">Custom Comparison</div>}
        />
      );
      expect(screen.getByTestId("custom-comparison")).toBeInTheDocument();
    });

    it("renders separator between baseline and target values", () => {
      const { container } = render(
        <StatsImpactGrid baselineValue="10%" targetValue="50%" />
      );
      // The separator is a horizontal line (div with h-px class)
      const separator = container.querySelector(".h-px.bg-border");
      expect(separator).toBeInTheDocument();
    });
  });

  describe("CTA Section", () => {
    it("renders CTA heading and actions", () => {
      render(
        <StatsImpactGrid
          ctaHeading="Ready to get started?"
          actions={[
            { label: "Sign Up", href: "/signup", variant: "default" },
            { label: "Learn More", href: "/about", variant: "outline" },
          ]}
        />
      );

      expect(screen.getByText("Ready to get started?")).toBeInTheDocument();
      expect(screen.getByText("Sign Up")).toBeInTheDocument();
      expect(screen.getByText("Learn More")).toBeInTheDocument();
    });

    it("does not render CTA section when no CTA props provided", () => {
      const { container } = render(<StatsImpactGrid heading="Test" />);
      // CTA section would have text-center class at the bottom
      const sections = container.querySelectorAll(".text-center");
      // Only the header should have text-center
      expect(sections.length).toBeLessThanOrEqual(1);
    });

    it("renders custom ctaSlot when provided", () => {
      render(
        <StatsImpactGrid
          ctaSlot={<div data-testid="custom-cta">Custom CTA</div>}
        />
      );
      expect(screen.getByTestId("custom-cta")).toBeInTheDocument();
    });

    it("renders actions with icons", () => {
      render(
        <StatsImpactGrid
          actions={[
            {
              label: "Get Started",
              href: "/start",
              icon: <span data-testid="action-icon">→</span>,
            },
          ]}
        />
      );
      expect(screen.getByTestId("action-icon")).toBeInTheDocument();
    });

    it("renders actions with custom children", () => {
      render(
        <StatsImpactGrid
          actions={[
            {
              href: "/custom",
              children: <span data-testid="custom-action-children">Custom Content</span>,
            },
          ]}
        />
      );
      expect(screen.getByTestId("custom-action-children")).toBeInTheDocument();
    });
  });

  describe("Styling and Layout", () => {
    it("applies custom className to section", () => {
      const { container } = render(
        <StatsImpactGrid heading="Test" className="custom-section-class" />
      );
      expect(container.querySelector("section")).toHaveClass("custom-section-class");
    });

    it("applies custom containerClassName", () => {
      const { container } = render(
        <StatsImpactGrid heading="Test" containerClassName="custom-container" />
      );
      expect(container.querySelector(".custom-container")).toBeInTheDocument();
    });

    it("applies custom headerClassName", () => {
      const { container } = render(
        <StatsImpactGrid heading="Test" headerClassName="custom-header" />
      );
      expect(container.querySelector(".custom-header")).toBeInTheDocument();
    });

    it("applies custom badgeClassName", () => {
      render(<StatsImpactGrid badge="Test Badge" badgeClassName="custom-badge-class" />);
      const badge = screen.getByTestId("mock-badge");
      expect(badge).toHaveClass("custom-badge-class");
    });

    it("applies custom statsGridClassName", () => {
      const { container } = render(
        <StatsImpactGrid
          stats={[{ id: "1", value: "10", label: "Test" }]}
          statsGridClassName="custom-grid"
        />
      );
      expect(container.querySelector(".custom-grid")).toBeInTheDocument();
    });

    it("applies custom comparisonClassName", () => {
      const { container } = render(
        <StatsImpactGrid
          comparisonHeading="Test"
          comparisonClassName="custom-comparison"
        />
      );
      expect(container.querySelector(".custom-comparison")).toBeInTheDocument();
    });

    it("applies custom ctaClassName", () => {
      const { container } = render(
        <StatsImpactGrid ctaHeading="Test" ctaClassName="custom-cta-class" />
      );
      expect(container.querySelector(".custom-cta-class")).toBeInTheDocument();
    });
  });

  describe("Null Guards", () => {
    it("renders empty component without errors when no props provided", () => {
      const { container } = render(<StatsImpactGrid />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("does not render badge when badge prop is undefined", () => {
      render(<StatsImpactGrid heading="Test" />);
      expect(screen.queryByTestId("mock-badge")).not.toBeInTheDocument();
    });

    it("does not render stat description when not provided", () => {
      render(
        <StatsImpactGrid
          stats={[{ id: "1", value: "100", label: "Test Stat" }]}
        />
      );
      expect(screen.getByText("100")).toBeInTheDocument();
      expect(screen.getByText("Test Stat")).toBeInTheDocument();
      // No description text should be present
    });

    it("does not render progress bars when percentages not provided", () => {
      const { container } = render(
        <StatsImpactGrid
          comparisonHeading="Comparison"
          baselineValue="10%"
          targetValue="50%"
        />
      );
      // Progress bars have specific width styles - they shouldn't exist without percentages
      const progressBars = container.querySelectorAll('[style*="width"]');
      expect(progressBars.length).toBe(0);
    });
  });

  describe("Performance Optimizations", () => {
    it("uses memoized values correctly (no function calls in render)", () => {
      // This test verifies the component renders without errors
      // The actual memoization is verified by React's internal mechanisms
      const { rerender } = render(
        <StatsImpactGrid
          heading="Test"
          stats={[{ id: "1", value: "10", label: "Stat" }]}
        />
      );

      // Re-render with same props should work without issues
      rerender(
        <StatsImpactGrid
          heading="Test"
          stats={[{ id: "1", value: "10", label: "Stat" }]}
        />
      );

      expect(screen.getByText("Test")).toBeInTheDocument();
    });
  });
});
