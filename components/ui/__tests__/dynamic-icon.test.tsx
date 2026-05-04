import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { DynamicIcon } from "../dynamic-icon";

vi.mock("@page-speed/icon", () => ({
  Icon: ({
    apiKey,
    className,
    name,
    size,
  }: {
    apiKey: string;
    className?: string;
    name: string;
    size?: number;
  }) => (
    <span
      className={className}
      data-api-key={apiKey}
      data-name={name}
      data-size={size}
      data-testid="page-speed-icon"
    />
  ),
}));

describe("DynamicIcon", () => {
  it("renders @page-speed/icon when name is a string", () => {
    render(<DynamicIcon name="lucide/calendar" size={20} className="size-5" />);

    const icon = screen.getByTestId("page-speed-icon");
    expect(icon).toHaveAttribute("data-name", "lucide/calendar");
    expect(icon).toHaveAttribute("data-size", "20");
    expect(icon).toHaveAttribute(
      "data-api-key",
      "au382bi7fsh96w9h9xlrnat2jglx",
    );
    expect(icon).toHaveClass("size-5");
  });

  it("renders React nodes as-is", () => {
    render(
      <DynamicIcon
        name={<span data-testid="custom-icon">Custom icon</span>}
        size={20}
      />,
    );

    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("page-speed-icon")).not.toBeInTheDocument();
  });

  it("returns null when no name is supplied", () => {
    const { container, rerender } = render(<DynamicIcon />);

    expect(container.firstChild).toBeNull();

    rerender(<DynamicIcon name={null} />);
    expect(container.firstChild).toBeNull();
  });
});
