import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureCapabilitiesGrid } from "../feature-capabilities-grid";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, ...props }: React.PropsWithChildren<{ className?: string }>) => (
      <div className={className} data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>
      icon
    </span>
  ),
}));

describe("FeatureCapabilitiesGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<FeatureCapabilitiesGrid />);
    expect(screen.getByText("Models that adapt to your coverage strategy")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<FeatureCapabilitiesGrid heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders eyebrow", () => {
    render(<FeatureCapabilitiesGrid eyebrow="Custom Eyebrow" />);
    expect(screen.getByText("Custom Eyebrow")).toBeInTheDocument();
  });

  it("renders items when provided", () => {
    const items = [{ title: "Capability 1", description: "Description 1" }];
    render(<FeatureCapabilitiesGrid items={items} />);
    expect(screen.getByText("Capability 1")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureCapabilitiesGrid className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
