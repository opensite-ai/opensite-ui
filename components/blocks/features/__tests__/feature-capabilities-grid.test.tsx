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

  it("renders default heading", () => {
    render(<FeatureCapabilitiesGrid />);
    expect(
      screen.getByText("Models that adapt to your coverage strategy")
    ).toBeInTheDocument();
  });

  it("renders feature items", () => {
    render(<FeatureCapabilitiesGrid />);
    expect(screen.getByText("Reasoned Guidance")).toBeInTheDocument();
    expect(screen.getByText("Image Generation")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <FeatureCapabilitiesGrid className="custom-class" />
    );
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });
});
