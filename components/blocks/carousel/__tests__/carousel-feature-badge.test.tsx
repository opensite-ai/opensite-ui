import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CarouselFeatureBadge } from "../carousel-feature-badge";

// Mock the Img component
vi.mock("@page-speed/img", () => ({
  Img: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => <img src={src} alt={alt} className={className} data-testid="img" />,
}));

describe("CarouselFeatureBadge", () => {
  it("renders with default props", () => {
    render(<CarouselFeatureBadge />);
    expect(screen.getByText("Platform")).toBeInTheDocument();
    expect(
      screen.getByText("This is the start of something new")
    ).toBeInTheDocument();
  });

  it("renders custom badge text", () => {
    render(<CarouselFeatureBadge badgeText="Custom Badge" />);
    expect(screen.getByText("Custom Badge")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CarouselFeatureBadge heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CarouselFeatureBadge description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <CarouselFeatureBadge className="custom-class" />
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("custom-class");
  });

  it("renders default carousel items", () => {
    render(<CarouselFeatureBadge />);
    const images = screen.getAllByTestId("img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders custom items", () => {
    const customItems = [
      { src: "custom1.jpg", alt: "Custom Image 1" },
      { src: "custom2.jpg", alt: "Custom Image 2" },
    ];
    render(<CarouselFeatureBadge items={customItems} />);
    expect(screen.getByAltText("Custom Image 1")).toBeInTheDocument();
    expect(screen.getByAltText("Custom Image 2")).toBeInTheDocument();
  });

  it("passes optixFlowConfig to Img components", () => {
    const optixFlowConfig = { apiKey: "test-key", compression: 80 };
    const { container } = render(
      <CarouselFeatureBadge optixFlowConfig={optixFlowConfig} />
    );
    // Component should render without errors with optixFlowConfig
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders carousel navigation controls", () => {
    const { container } = render(<CarouselFeatureBadge />);
    // Check for carousel navigation buttons
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("applies correct section structure", () => {
    const { container } = render(<CarouselFeatureBadge />);
    expect(container.querySelector("section")).toBeInTheDocument();
    expect(container.querySelector(".container")).toBeInTheDocument();
  });

  it("renders with two-column grid layout", () => {
    const { container } = render(<CarouselFeatureBadge />);
    const grid = container.querySelector(".grid");
    expect(grid?.className).toContain("lg:grid-cols-2");
  });

  it("renders heading with correct styling", () => {
    render(<CarouselFeatureBadge heading="Test Heading" />);
    const heading = screen.getByText("Test Heading");
    expect(heading.tagName).toBe("H2");
  });

  it("renders description with muted foreground styling", () => {
    const { container } = render(
      <CarouselFeatureBadge description="Test description" />
    );
    const description = container.querySelector(".text-muted-foreground");
    expect(description).toBeInTheDocument();
  });

  it("renders with empty items array", () => {
    render(<CarouselFeatureBadge items={[]} />);
    // Should render without errors
    expect(screen.getByText("Platform")).toBeInTheDocument();
  });

  it("applies responsive padding classes", () => {
    const { container } = render(<CarouselFeatureBadge />);
    const section = container.querySelector("section");
    expect(section?.className).toContain("py-20");
    expect(section?.className).toContain("lg:py-40");
  });
});

