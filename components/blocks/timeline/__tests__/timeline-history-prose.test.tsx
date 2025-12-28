import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { TimelineHistoryProse } from "../timeline-history-prose";

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

describe("TimelineHistoryProse", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<TimelineHistoryProse />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <TimelineHistoryProse className="custom-class" />
    );
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders custom heading", () => {
    const { getByText } = render(
      <TimelineHistoryProse heading="Custom Heading" />
    );
    expect(getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders default history entries", () => {
    const { container } = render(<TimelineHistoryProse />);
    const cards = container.querySelectorAll('[data-testid="mock-card"]');
    expect(cards.length).toBeGreaterThan(0);
  });

  it("renders custom entries", () => {
    const customEntries = [
      {
        date: "2020",
        title: "Custom Title",
        content: "Custom content text",
      },
    ];
    const { getByText } = render(
      <TimelineHistoryProse entries={customEntries} />
    );
    expect(getByText("Custom Title")).toBeInTheDocument();
    expect(getByText("2020")).toBeInTheDocument();
  });

  it("renders prose content", () => {
    const { container } = render(<TimelineHistoryProse />);
    const proseElements = container.querySelectorAll(".prose");
    expect(proseElements.length).toBeGreaterThan(0);
  });
});
