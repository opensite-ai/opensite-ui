import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComparisonTableTwoColumn } from "../comparison-table-two-column";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    size,
  }: {
    name: string;
    size: number;
  }) => (
    <span data-testid="mock-icon" data-name={name} data-size={size}>
      icon
    </span>
  ),
}));

vi.mock("@page-speed/img", () => ({
  Img: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => <img src={src} alt={alt} className={className} data-testid="mock-img" />,
}));

describe("ComparisonTableTwoColumn", () => {

  it("renders with custom heading", () => {
    render(<ComparisonTableTwoColumn heading="Custom Heading" />);

    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });
});

