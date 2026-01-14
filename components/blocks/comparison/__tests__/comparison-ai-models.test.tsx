import { describe, it, expect, vi, beforeEach } from "vitest";
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
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom heading", () => {
    render(<ComparisonAiModels heading="AI Model Comparison" />);
    expect(screen.getByText("AI Model Comparison")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ComparisonAiModels description="Compare the top AI models" />);
    expect(screen.getByText("Compare the top AI models")).toBeInTheDocument();
  });

  it("renders comparison table with models", () => {
    const models = {
      modelA: { name: "GPT-4", summary: ["Fast", "Accurate"], hoverColor: "red" },
      modelB: { name: "Claude", summary: ["Reasoning", "Safe"], hoverColor: "blue" },
      modelC: { name: "Gemini", summary: ["Multimodal", "Fast"], hoverColor: "green" },
    };
    const comparisonData = [
      { metric: "Speed", modelA: { value: "Fast", status: "best" as const }, modelB: { value: "Medium", status: "neutral" as const }, modelC: { value: "Slow", status: "worst" as const } },
    ];
    render(<ComparisonAiModels models={models} comparisonData={comparisonData} />);
    expect(screen.getAllByText("GPT-4").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Claude").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Gemini").length).toBeGreaterThan(0);
    expect(screen.getByText("Speed")).toBeInTheDocument();
  });

  it("renders technical analysis section", () => {
    const models = {
      modelA: { name: "GPT-4", summary: ["Fast response"], hoverColor: "red" },
      modelB: { name: "Claude", summary: ["Great reasoning"], hoverColor: "blue" },
      modelC: { name: "Gemini", summary: ["Best value"], hoverColor: "green" },
    };
    render(<ComparisonAiModels models={models} />);
    expect(screen.getByText("Technical Analysis")).toBeInTheDocument();
    expect(screen.getByText("Performance Summary")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ComparisonAiModels className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});

