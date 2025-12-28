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

  it("renders with default props", () => {
    render(<ProcessScrollImage />);
    expect(screen.getByText("Our Process")).toBeInTheDocument();
    expect(
      screen.getByText(
        "We follow a proven methodology to deliver exceptional results for every project we undertake."
      )
    ).toBeInTheDocument();
  });

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

  it("renders default CTA button", () => {
    render(<ProcessScrollImage />);
    expect(screen.getByText("Get in touch")).toBeInTheDocument();
  });

  it("does not render CTA when ctaText is missing", () => {
    render(<ProcessScrollImage ctaText="" ctaUrl="/contact" />);
    expect(screen.queryByText("Get in touch")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProcessScrollImage className="custom-class" />
    );
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("custom-class");
  });

  it("applies default section padding", () => {
    const { container } = render(<ProcessScrollImage />);
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("py-32");
  });

  it("renders grid layout with correct columns", () => {
    const { container } = render(<ProcessScrollImage />);
    const grid = container.querySelector(".grid");
    expect(grid?.className).toContain("lg:grid-cols-2");
  });

  it("renders sticky sidebar for images", () => {
    const { container } = render(<ProcessScrollImage />);
    const stickySidebar = container.querySelector(".lg\\:sticky");
    expect(stickySidebar).toBeInTheDocument();
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

  it("renders default steps when no steps prop provided", () => {
    render(<ProcessScrollImage />);
    expect(screen.getByText("Discover & Research")).toBeInTheDocument();
    expect(screen.getByText("Strategy & Planning")).toBeInTheDocument();
    expect(screen.getByText("Execute & Develop")).toBeInTheDocument();
    expect(screen.getByText("Optimize & Improve")).toBeInTheDocument();
  });

  it("renders image container with border", () => {
    const { container } = render(<ProcessScrollImage />);
    const imageContainer = container.querySelector(".border.h-90");
    expect(imageContainer).toBeInTheDocument();
  });

  it("renders steps as list items", () => {
    const { container } = render(<ProcessScrollImage steps={mockSteps} />);
    const listItems = container.querySelectorAll("li");
    expect(listItems.length).toBe(3);
  });

  it("renders container with proper structure", () => {
    const { container } = render(<ProcessScrollImage />);
    const containerDiv = container.querySelector(".container");
    expect(containerDiv).toBeInTheDocument();
  });

  it("renders CTA as Pressable link", () => {
    render(<ProcessScrollImage ctaText="Get Started" ctaUrl="/start" />);
    const link = screen.getByText("Get Started").closest("a");
    expect(link).toHaveAttribute("href", "/start");
  });

  it("accepts optixFlowConfig prop", () => {
    const optixConfig = { apiKey: "test-key", compression: 80 };
    const { container } = render(
      <ProcessScrollImage optixFlowConfig={optixConfig} />
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
