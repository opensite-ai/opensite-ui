import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComparisonAiModels } from "../comparison-ai-models";

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

describe("ComparisonAiModels", () => {
  it("renders with default props", () => {
    render(<ComparisonAiModels />);

    // Check for default model names (use getAllByText since names appear multiple times)
    expect(screen.getAllByText("GPT-4o").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Claude 3.5").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Gemini Pro 1.5").length).toBeGreaterThan(0);
  });

  it("renders default comparison data", () => {
    render(<ComparisonAiModels />);

    // Check for default metrics
    expect(screen.getByText("Context Window")).toBeInTheDocument();
    expect(screen.getByText("Response Speed")).toBeInTheDocument();
    expect(screen.getByText("Code Generation")).toBeInTheDocument();
  });

  it("renders custom models", () => {
    const customModels = {
      modelA: {
        name: "Custom Model A",
        icon: "/icon-a.png",
        iconAlt: "Model A",
        summary: ["Feature 1", "Feature 2"],
        hoverColor: "blue",
      },
      modelB: {
        name: "Custom Model B",
        icon: "/icon-b.png",
        iconAlt: "Model B",
        summary: ["Feature 3", "Feature 4"],
        hoverColor: "green",
      },
      modelC: {
        name: "Custom Model C",
        icon: "/icon-c.png",
        iconAlt: "Model C",
        summary: ["Feature 5", "Feature 6"],
        hoverColor: "red",
      },
    };

    render(<ComparisonAiModels models={customModels} />);

    // Use getAllByText since model names appear in both header and summary
    expect(screen.getAllByText("Custom Model A").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Custom Model B").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Custom Model C").length).toBeGreaterThan(0);
  });

  it("renders custom comparison data", () => {
    const customComparisonData = [
      {
        metric: "Custom Metric",
        modelA: { value: "Value A", status: "best" as const },
        modelB: { value: "Value B", status: "neutral" as const },
        modelC: { value: "Value C", status: "worst" as const },
      },
    ];

    render(<ComparisonAiModels comparisonData={customComparisonData} />);

    expect(screen.getByText("Custom Metric")).toBeInTheDocument();
    expect(screen.getByText("Value A")).toBeInTheDocument();
    expect(screen.getByText("Value B")).toBeInTheDocument();
    expect(screen.getByText("Value C")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ComparisonAiModels className="custom-class" />
    );

    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders model icons", () => {
    render(<ComparisonAiModels />);

    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders table structure", () => {
    render(<ComparisonAiModels />);

    // Check that table elements exist
    const tables = document.querySelectorAll("table");
    expect(tables.length).toBeGreaterThan(0);
  });
});

