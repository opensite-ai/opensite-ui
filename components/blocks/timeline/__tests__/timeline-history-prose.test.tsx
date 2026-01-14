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

  it("renders custom heading", () => {
    const { getByText } = render(
      <TimelineHistoryProse heading="Custom Heading" />
    );
    expect(getByText("Custom Heading")).toBeInTheDocument();
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
});
