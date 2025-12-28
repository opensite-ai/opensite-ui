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

  it("renders with default props", () => {
    render(<ProcessStickySteps />);
    expect(screen.getByText("Our Process")).toBeInTheDocument();
    expect(
      screen.getByText(
        "We follow a proven methodology to deliver exceptional results for every project we undertake."
      )
    ).toBeInTheDocument();
  });

  it("renders custom title and description", () => {
    render(
      <ProcessStickySteps
        title="Our Methodology"
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

  it("renders CTA button when ctaText and ctaUrl provided", () => {
    render(
      <ProcessStickySteps ctaText="Contact Us" ctaUrl="/contact" />
    );
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("renders default CTA button", () => {
    render(<ProcessStickySteps />);
    expect(screen.getByText("Get in touch")).toBeInTheDocument();
  });

  it("does not render CTA when ctaText is missing", () => {
    render(<ProcessStickySteps ctaText="" ctaUrl="/contact" />);
    expect(screen.queryByText("Get in touch")).not.toBeInTheDocument();
  });

  it("does not render CTA when ctaUrl is missing", () => {
    render(<ProcessStickySteps ctaText="Contact" ctaUrl="" />);
    expect(screen.queryByText("Contact")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProcessStickySteps className="custom-class" />
    );
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("custom-class");
  });

  it("applies default section padding", () => {
    const { container } = render(<ProcessStickySteps />);
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("py-32");
  });

  it("renders grid layout with correct columns", () => {
    const { container } = render(<ProcessStickySteps />);
    const grid = container.querySelector(".grid");
    expect(grid?.className).toContain("lg:grid-cols-6");
  });

  it("renders sticky sidebar", () => {
    const { container } = render(<ProcessStickySteps />);
    const stickySidebar = container.querySelector(".lg\\:sticky");
    expect(stickySidebar).toBeInTheDocument();
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

  it("renders default steps when no steps prop provided", () => {
    render(<ProcessStickySteps />);
    expect(screen.getByText("Discover & Research")).toBeInTheDocument();
    expect(screen.getByText("Strategy & Planning")).toBeInTheDocument();
    expect(screen.getByText("Execute & Develop")).toBeInTheDocument();
    expect(screen.getByText("Optimize & Improve")).toBeInTheDocument();
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

  it("renders container with proper structure", () => {
    const { container } = render(<ProcessStickySteps />);
    const containerDiv = container.querySelector(".container");
    expect(containerDiv).toBeInTheDocument();
  });

  it("renders CTA as Pressable link", () => {
    render(<ProcessStickySteps ctaText="Get Started" ctaUrl="/start" />);
    const link = screen.getByText("Get Started").closest("a");
    expect(link).toHaveAttribute("href", "/start");
  });
});
