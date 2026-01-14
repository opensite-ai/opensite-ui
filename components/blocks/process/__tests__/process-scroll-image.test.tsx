import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProcessScrollImage } from "../process-scroll-image";

describe("ProcessScrollImage", () => {
  const mockSteps = [
    {
      step: "01",
      title: "Research Phase",
      image: "https://example.com/image1.jpg",
      description: "Understanding your requirements",
    },
    {
      step: "02",
      title: "Design Phase",
      image: "https://example.com/image2.jpg",
      description: "Creating visual solutions",
    },
    {
      step: "03",
      title: "Build Phase",
      image: "https://example.com/image3.jpg",
      description: "Developing the product",
    },
  ];

  it("renders custom title and description", () => {
    render(
      <ProcessScrollImage
        title="Development Process"
        description="Our approach to building products"
      />
    );
    expect(screen.getByText("Development Process")).toBeInTheDocument();
    expect(
      screen.getByText("Our approach to building products")
    ).toBeInTheDocument();
  });

  it("renders all provided steps", () => {
    render(<ProcessScrollImage steps={mockSteps} />);
    expect(screen.getByText("Research Phase")).toBeInTheDocument();
    expect(screen.getByText("Design Phase")).toBeInTheDocument();
    expect(screen.getByText("Build Phase")).toBeInTheDocument();
  });

  it("renders step descriptions", () => {
    render(<ProcessScrollImage steps={mockSteps} />);
    expect(
      screen.getByText("Understanding your requirements")
    ).toBeInTheDocument();
    expect(screen.getByText("Creating visual solutions")).toBeInTheDocument();
    expect(screen.getByText("Developing the product")).toBeInTheDocument();
  });

  it("renders CTA button when ctaText and ctaUrl provided", () => {
    render(<ProcessScrollImage ctaText="Learn More" ctaUrl="/learn" />);
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("does not render CTA when actions is empty", () => {
    render(<ProcessScrollImage actions={[]} />);
    expect(screen.queryByText("Get in touch")).not.toBeInTheDocument();
  });

  it("renders step numbers with leading zeros", () => {
    render(<ProcessScrollImage steps={mockSteps} />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
  });

  it("renders with empty steps array", () => {
    const { container } = render(<ProcessScrollImage steps={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders steps as list items", () => {
    const { container } = render(<ProcessScrollImage steps={mockSteps} />);
    const listItems = container.querySelectorAll("li");
    expect(listItems.length).toBe(3);
  });

  it("renders CTA as Pressable link", () => {
    render(<ProcessScrollImage ctaText="Get Started" ctaUrl="/start" />);
    const link = screen.getByText("Get Started").closest("a");
    expect(link).toHaveAttribute("href", "/start");
  });
});
