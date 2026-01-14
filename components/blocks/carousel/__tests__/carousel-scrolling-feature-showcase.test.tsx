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

  it("renders custom heading", () => {
    render(<CarouselScrollingFeatureShowcase heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom subheading", () => {
    render(
      <CarouselScrollingFeatureShowcase subheading="Custom Subheading" />
    );
    expect(screen.getByText("Custom Subheading")).toBeInTheDocument();
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
});

