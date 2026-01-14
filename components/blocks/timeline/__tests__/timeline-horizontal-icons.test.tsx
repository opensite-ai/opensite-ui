import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { TimelineHorizontalIcons } from "../timeline-horizontal-icons";

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

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, size }: { name: string; size: number }) => (
    <span data-testid="mock-dynamic-icon" data-name={name} data-size={size}>
      {name}
    </span>
  ),
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) => <div className={className}>{children}</div>,
  },
}));

describe("TimelineHorizontalIcons", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom heading", () => {
    const { getByText } = render(
      <TimelineHorizontalIcons heading="Custom Heading" />
    );
    expect(getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom phases with icons", () => {
    const customPhases = [
      {
        id: 0,
        date: "January 2025",
        title: "Custom Phase 1",
        description: "Custom description 1",
        icon: "lucide/star",
      },
      {
        id: 1,
        date: "February 2025",
        title: "Custom Phase 2",
        description: "Custom description 2",
        icon: "lucide/heart",
      },
    ];
    const { getByText } = render(
      <TimelineHorizontalIcons phases={customPhases} />
    );
    expect(getByText("Custom Phase 1")).toBeInTheDocument();
    expect(getByText("Custom Phase 2")).toBeInTheDocument();
  });
});
