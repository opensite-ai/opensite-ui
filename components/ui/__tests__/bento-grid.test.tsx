import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BentoGridItem } from "../bento-grid";

vi.mock("../dynamic-icon", () => ({
  DynamicIcon: ({ name }: { name?: ReactNode | string }) =>
    typeof name === "string" ? (
      <span data-testid="mock-dynamic-icon" data-name={name} />
    ) : (
      <>{name}</>
    ),
}));

describe("BentoGridItem", () => {
  it("renders an icon name through DynamicIcon without visible raw text", () => {
    render(
      <BentoGridItem
        title="Automation"
        icon="lucide/workflow"
        description="Connect every step."
      />,
    );

    const item = screen.getByText("Automation").parentElement;

    expect(screen.getByTestId("mock-dynamic-icon")).toHaveAttribute(
      "data-name",
      "lucide/workflow",
    );
    expect(item).not.toHaveTextContent("lucide/workflow");
  });

  it("preserves a custom icon element", () => {
    render(
      <BentoGridItem
        title="Custom"
        icon={<span data-testid="custom-icon" />}
      />,
    );

    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("preserves empty-string, false, and zero React node behavior", () => {
    const { container } = render(
      <>
        <BentoGridItem title="Empty" icon="" />
        <BentoGridItem title="False" icon={false} />
        <BentoGridItem title="Zero" icon={0} />
      </>,
    );

    expect(
      container.querySelector('[data-testid="mock-dynamic-icon"][data-name=""]'),
    ).not.toBeInTheDocument();
    expect(screen.getByText("False").parentElement).not.toHaveTextContent(
      "false",
    );
    expect(screen.getByText("Zero").parentElement).toHaveTextContent("0");
  });
});
