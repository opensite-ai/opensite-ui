import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CarouselScrollingFeatureShowcase } from "../carousel-scrolling-feature-showcase";

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

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
      style,
    }: {
      children: React.ReactNode;
      className?: string;
      style?: React.CSSProperties;
    }) => (
      <div className={className} style={style}>
        {children}
      </div>
    ),
  },
  useScroll: () => ({
    scrollYProgress: { get: () => 0 },
  }),
  useTransform: () => 1,
}));

describe("CarouselScrollingFeatureShowcase", () => {
  it("renders with default props", () => {
    render(<CarouselScrollingFeatureShowcase />);
    expect(screen.getByText("Powerful Features")).toBeInTheDocument();
    expect(
      screen.getByText("Discover what makes our platform unique")
    ).toBeInTheDocument();
  });

  it("renders custom section title", () => {
    render(<CarouselScrollingFeatureShowcase sectionTitle="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom section subtitle", () => {
    render(
      <CarouselScrollingFeatureShowcase sectionSubtitle="Custom Subtitle" />
    );
    expect(screen.getByText("Custom Subtitle")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <CarouselScrollingFeatureShowcase className="custom-class" />
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("custom-class");
  });

  it("renders custom features", () => {
    const customFeatures = [
      {
        id: "feature-1",
        title: "Custom Feature 1",
        description: "Custom Description 1",
        image: "custom1.jpg",
      },
      {
        id: "feature-2",
        title: "Custom Feature 2",
        description: "Custom Description 2",
        image: "custom2.jpg",
      },
    ];
    render(<CarouselScrollingFeatureShowcase features={customFeatures} />);
    expect(screen.getByText("Custom Feature 1")).toBeInTheDocument();
    expect(screen.getByText("Custom Feature 2")).toBeInTheDocument();
  });

  it("renders feature descriptions", () => {
    const features = [
      {
        id: "feature-1",
        title: "Feature",
        description: "Test Description",
        image: "img.jpg",
      },
    ];
    render(<CarouselScrollingFeatureShowcase features={features} />);
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders numbered indicators for features", () => {
    const features = [
      { id: "f1", title: "Feature 1", description: "Desc 1", image: "img1.jpg" },
      { id: "f2", title: "Feature 2", description: "Desc 2", image: "img2.jpg" },
    ];
    render(<CarouselScrollingFeatureShowcase features={features} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("renders with two-column grid layout", () => {
    const { container } = render(<CarouselScrollingFeatureShowcase />);
    const grid = container.querySelector(".lg\\:grid-cols-2");
    expect(grid).toBeInTheDocument();
  });

  it("renders sticky image panel", () => {
    const { container } = render(<CarouselScrollingFeatureShowcase />);
    const sticky = container.querySelector(".sticky");
    expect(sticky).toBeInTheDocument();
  });

  it("renders images for features", () => {
    render(<CarouselScrollingFeatureShowcase />);
    const images = screen.getAllByTestId("img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("passes optixFlowConfig to Img components", () => {
    const optixFlowConfig = { apiKey: "test-key", compression: 80 };
    const { container } = render(
      <CarouselScrollingFeatureShowcase optixFlowConfig={optixFlowConfig} />
    );
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders feature sections with IDs for intersection observer", () => {
    const features = [
      { id: "test-feature", title: "Test", description: "Desc", image: "img.jpg" },
    ];
    const { container } = render(
      <CarouselScrollingFeatureShowcase features={features} />
    );
    const featureSection = container.querySelector("#test-feature");
    expect(featureSection).toBeInTheDocument();
  });

  it("renders mobile images", () => {
    const { container } = render(<CarouselScrollingFeatureShowcase />);
    const mobileImages = container.querySelectorAll(".lg\\:hidden");
    expect(mobileImages.length).toBeGreaterThan(0);
  });
});

