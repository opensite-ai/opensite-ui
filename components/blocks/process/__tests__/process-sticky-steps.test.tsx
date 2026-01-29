import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProcessStickySteps } from "../process-sticky-steps";

describe("ProcessStickySteps", () => {
  const mockSteps = [
    {
      step: "01",
      title: "Discovery",
      description: "Understanding your business goals",
    },
    {
      step: "02",
      title: "Planning",
      description: "Creating a strategic roadmap",
    },
    {
      step: "03",
      title: "Execution",
      description: "Implementing the solution",
    },
  ];

  it("renders heading and description", () => {
    render(
      <ProcessStickySteps
        heading="Our Methodology"
        description="A step-by-step approach"
      />
    );
    expect(screen.getByText("Our Methodology")).toBeInTheDocument();
    expect(screen.getByText("A step-by-step approach")).toBeInTheDocument();
  });

  it("renders all provided steps", () => {
    render(<ProcessStickySteps steps={mockSteps} />);
    expect(screen.getByText("Discovery")).toBeInTheDocument();
    expect(screen.getByText("Planning")).toBeInTheDocument();
    expect(screen.getByText("Execution")).toBeInTheDocument();
  });

  it("renders step descriptions", () => {
    render(<ProcessStickySteps steps={mockSteps} />);
    expect(
      screen.getByText("Understanding your business goals")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Creating a strategic roadmap")
    ).toBeInTheDocument();
    expect(screen.getByText("Implementing the solution")).toBeInTheDocument();
  });

  it("renders CTA button when actions provided", () => {
    render(
      <ProcessStickySteps
        actions={[{ label: "Contact Us", href: "/contact" }]}
      />
    );
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("does not render CTA when actions is empty", () => {
    render(<ProcessStickySteps actions={[]} />);
    expect(screen.queryByText("Get in touch")).not.toBeInTheDocument();
  });

  it("does not render CTA when actions is undefined", () => {
    render(<ProcessStickySteps />);
    expect(screen.queryByText("Contact")).not.toBeInTheDocument();
  });

  it("renders step numbers with leading zeros", () => {
    render(<ProcessStickySteps steps={mockSteps} />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
  });

  it("renders with empty steps array", () => {
    const { container } = render(<ProcessStickySteps steps={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders corner illustration SVG for each step", () => {
    const { container } = render(<ProcessStickySteps steps={mockSteps} />);
    const svgs = container.querySelectorAll("svg");
    // Should have corner illustrations plus icons
    expect(svgs.length).toBeGreaterThan(0);
  });

  it("renders steps as list items", () => {
    const { container } = render(<ProcessStickySteps steps={mockSteps} />);
    const listItems = container.querySelectorAll("li");
    expect(listItems.length).toBe(3);
  });

  it("renders CTA as Pressable link", () => {
    render(
      <ProcessStickySteps
        actions={[{ label: "Get Started", href: "/start" }]}
      />
    );
    const link = screen.getByText("Get Started").closest("a");
    expect(link).toHaveAttribute("href", "/start");
  });
});
