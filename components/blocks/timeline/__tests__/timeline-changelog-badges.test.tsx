import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { TimelineChangelogBadges } from "../timeline-changelog-badges";

vi.mock("../../../ui/badge", () => ({
  Badge: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <span className={className} data-testid="mock-badge">
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
    <div className={className} data-testid="mock-card">
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
    <div className={className} data-testid="mock-card-content">
      {children}
    </div>
  ),
}));

vi.mock("../../../ui/separator", () => ({
  Separator: ({ orientation, className }: { orientation?: string; className?: string }) => (
    <div
      data-testid="mock-separator"
      data-orientation={orientation}
      className={className}
    />
  ),
}));

describe("TimelineChangelogBadges", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<TimelineChangelogBadges />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <TimelineChangelogBadges className="custom-class" />
    );
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders custom heading", () => {
    const { getByText } = render(
      <TimelineChangelogBadges heading="Custom Heading" />
    );
    expect(getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders date badges", () => {
    const { container } = render(<TimelineChangelogBadges />);
    const badges = container.querySelectorAll('[data-testid="mock-badge"]');
    expect(badges.length).toBeGreaterThan(0);
  });

  it("renders custom entries", () => {
    const customEntries = [
      {
        date: "January 1, 2025",
        items: [
          { content: "Custom item 1" },
          { content: "Custom item 2" },
        ],
      },
    ];
    const { getByText } = render(
      <TimelineChangelogBadges entries={customEntries} />
    );
    expect(getByText("January 1, 2025")).toBeInTheDocument();
  });

  it("renders changelog items as list", () => {
    const { container } = render(<TimelineChangelogBadges />);
    const listItems = container.querySelectorAll("li");
    expect(listItems.length).toBeGreaterThan(0);
  });
});
