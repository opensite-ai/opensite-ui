import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { TimelineVerticalIconDashed } from "../timeline-vertical-icon-dashed";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, size }: { name: string; size: number }) => (
    <span data-testid="mock-dynamic-icon" data-name={name} data-size={size}>
      {name}
    </span>
  ),
}));

describe("TimelineVerticalIconDashed", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom steps", () => {
    const customSteps = [
      {
        icon: "lucide/star",
        title: "Custom Step 1",
        description: "Custom description 1",
      },
      {
        icon: "lucide/heart",
        title: "Custom Step 2",
        description: "Custom description 2",
      },
    ];
    const { getByText } = render(
      <TimelineVerticalIconDashed steps={customSteps} />
    );
    expect(getByText("Custom Step 1")).toBeInTheDocument();
    expect(getByText("Custom Step 2")).toBeInTheDocument();
  });
});
