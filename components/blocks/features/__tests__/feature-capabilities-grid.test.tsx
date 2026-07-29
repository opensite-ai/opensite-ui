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
  DynamicIcon: ({ name, className }: { name?: React.ReactNode; className?: string }) =>
    typeof name === "string" ? (
      <span data-testid="mock-icon" data-name={name} className={className}>
        icon
      </span>
    ) : (
      <>{name}</>
    ),
}));

describe("FeatureCapabilitiesGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<FeatureCapabilitiesGrid eyebrow="Test Eyebrow" heading="Test Heading" />);
    expect(screen.getByText("Test Eyebrow")).toBeInTheDocument();
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders custom eyebrow", () => {
    render(<FeatureCapabilitiesGrid eyebrow="Custom Eyebrow" />);
    expect(screen.getByText("Custom Eyebrow")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<FeatureCapabilitiesGrid heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders items when provided", () => {
    const items = [
      { title: "Item One", description: "Description one" },
      { title: "Item Two", description: "Description two" },
    ];
    render(<FeatureCapabilitiesGrid items={items} />);
    expect(screen.getByText("Item One")).toBeInTheDocument();
    expect(screen.getByText("Item Two")).toBeInTheDocument();
  });

  it("renders icon names supplied through the icon prop with DynamicIcon", () => {
    render(
      <FeatureCapabilitiesGrid
        items={[
          {
            icon: "lucide/layout-template",
            title: "Landing Page Builder",
          },
        ]}
      />,
    );

    expect(screen.getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "lucide/layout-template",
    );
    expect(screen.queryByText("lucide/layout-template")).not.toBeInTheDocument();
  });

  it("preserves custom icon elements supplied through the icon prop", () => {
    render(
      <FeatureCapabilitiesGrid
        items={[
          {
            icon: <span data-testid="custom-icon" />,
            title: "Custom Icon",
          },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureCapabilitiesGrid className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
