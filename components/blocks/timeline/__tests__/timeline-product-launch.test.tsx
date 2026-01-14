import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { TimelineProductLaunch } from "../timeline-product-launch";

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

vi.mock("../../../ui/progress", () => ({
  Progress: ({ value, className }: { value: number; className?: string }) => (
    <div
      data-testid="mock-progress"
      data-value={value}
      className={className}
    />
  ),
}));

describe("TimelineProductLaunch", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom heading and description", () => {
    const { getByText } = render(
      <TimelineProductLaunch
        heading="Custom Heading"
        description="Custom description"
      />
    );
    expect(getByText("Custom Heading")).toBeInTheDocument();
    expect(getByText("Custom description")).toBeInTheDocument();
  });

  it("renders custom steps", () => {
    const customSteps = [
      {
        number: "01",
        title: "Custom Step 1",
        heading: "Custom heading 1",
        description: "Custom description 1",
        progress: 50,
        duration: "~1 week",
      },
    ];
    const { getByText } = render(
      <TimelineProductLaunch steps={customSteps} />
    );
    expect(getByText("Custom Step 1")).toBeInTheDocument();
    expect(getByText("Custom heading 1")).toBeInTheDocument();
  });
});
