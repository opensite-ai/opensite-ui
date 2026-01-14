import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { TimelineProductivityList } from "../timeline-productivity-list";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, size }: { name: string; size: number }) => (
    <span data-testid="mock-dynamic-icon" data-name={name} data-size={size}>
      {name}
    </span>
  ),
}));

describe("TimelineProductivityList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom heading", () => {
    const { getByText } = render(
      <TimelineProductivityList heading={<span>Custom Heading</span>} />
    );
    expect(getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom productivity items", () => {
    const customItems = [
      {
        icon: "lucide/star",
        title: "Custom Item 1",
        description: "Custom description 1",
      },
      {
        icon: "lucide/heart",
        title: "Custom Item 2",
        description: "Custom description 2",
      },
    ];
    const { getByText } = render(
      <TimelineProductivityList items={customItems} />
    );
    expect(getByText("Custom Item 1")).toBeInTheDocument();
    expect(getByText("Custom Item 2")).toBeInTheDocument();
  });
});
