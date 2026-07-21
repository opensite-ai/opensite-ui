import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AboutExpandableValues } from "../about-expandable-values";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name }: { name?: React.ReactNode }) =>
    typeof name === "string" ? (
      <span data-testid={`mock-icon-${name}`} />
    ) : (
      <>{name}</>
    ),
}));

describe("AboutExpandableValues", () => {
  it("renders value icon names through DynamicIcon", () => {
    render(
      <AboutExpandableValues
        values={[
          {
            id: "integrity",
            icon: "lucide/shield",
            title: "Integrity",
          },
        ]}
      />,
    );

    expect(screen.getByTestId("mock-icon-lucide/shield")).toBeInTheDocument();
    expect(screen.queryByText("lucide/shield")).not.toBeInTheDocument();
  });

  it("preserves custom icon elements", () => {
    render(
      <AboutExpandableValues
        values={[
          {
            id: "custom",
            icon: <span data-testid="custom-icon" />,
            title: "Custom",
          },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });
});
