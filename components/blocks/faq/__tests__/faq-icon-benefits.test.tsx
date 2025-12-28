import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  FaqIconBenefits,
  type FaqIconBenefitsProps,
} from "../faq-icon-benefits";

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

describe("FaqIconBenefits", () => {
  it("renders with default props", () => {
    render(<FaqIconBenefits />);

    expect(screen.getByText("Why choose us?")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Discover the benefits of using our platform for your business needs."
      )
    ).toBeInTheDocument();
  });

  it("renders with custom heading and description", () => {
    render(
      <FaqIconBenefits
        heading="Custom Heading"
        description="Custom description"
      />
    );

    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders custom benefits", () => {
    const customBenefits: FaqIconBenefitsProps["benefits"] = [
      {
        icon: "Star",
        title: "Benefit A",
        description: "Description A",
      },
      {
        icon: "Heart",
        title: "Benefit B",
        description: "Description B",
      },
    ];

    render(<FaqIconBenefits benefits={customBenefits} />);

    expect(screen.getByText("Benefit A")).toBeInTheDocument();
    expect(screen.getByText("Benefit B")).toBeInTheDocument();
    expect(screen.getByText("Description A")).toBeInTheDocument();
    expect(screen.getByText("Description B")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FaqIconBenefits className="custom-class" />);

    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders empty benefits array", () => {
    render(<FaqIconBenefits benefits={[]} />);

    expect(screen.getByText("Why choose us?")).toBeInTheDocument();
  });

  it("renders icons for benefits", () => {
    render(<FaqIconBenefits />);

    const icons = screen.getAllByTestId("mock-icon");
    expect(icons.length).toBeGreaterThan(0);
  });

  it("renders multiple benefits", () => {
    const customBenefits: FaqIconBenefitsProps["benefits"] = [
      { icon: "Zap", title: "Fast", description: "Lightning fast" },
      { icon: "Shield", title: "Secure", description: "Bank-level security" },
      { icon: "Clock", title: "24/7", description: "Always available" },
      { icon: "Users", title: "Support", description: "Expert team" },
    ];

    render(<FaqIconBenefits benefits={customBenefits} />);

    expect(screen.getByText("Fast")).toBeInTheDocument();
    expect(screen.getByText("Secure")).toBeInTheDocument();
    expect(screen.getByText("24/7")).toBeInTheDocument();
    expect(screen.getByText("Support")).toBeInTheDocument();
  });
});

