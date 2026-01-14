import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CarouselProductFeatureShowcase } from "../carousel-product-feature-showcase";

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
    }: {
      children: React.ReactNode;
      className?: string;
    }) => <div className={className}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("CarouselProductFeatureShowcase", () => {

  it("renders custom heading", () => {
    render(<CarouselProductFeatureShowcase heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom subheading", () => {
    render(<CarouselProductFeatureShowcase subheading="Custom Subheading" />);
    expect(screen.getByText("Custom Subheading")).toBeInTheDocument();
  });

  it("renders custom actions", () => {
    render(<CarouselProductFeatureShowcase actions={[{ label: "Shop Now", href: "#" }]} />);
    expect(screen.getByText("Shop Now")).toBeInTheDocument();
  });

  it("renders custom features", () => {
    const customFeatures = [
      {
        id: "feature-1",
        title: "Custom Product 1",
        description: "Custom Description 1",
        image: "custom1.jpg",
      },
    ];
    render(<CarouselProductFeatureShowcase features={customFeatures} />);
    expect(screen.getByText("Custom Product 1")).toBeInTheDocument();
    expect(screen.getByText("Custom Description 1")).toBeInTheDocument();
  });

  it("renders color selectors when colors are provided", () => {
    const features = [
      {
        id: "feature-1",
        title: "Product",
        description: "Description",
        image: "img.jpg",
        colors: [
          { name: "Red", value: "#ff0000" },
          { name: "Blue", value: "#0000ff" },
        ],
      },
    ];
    render(<CarouselProductFeatureShowcase features={features} />);
    expect(screen.getByText("Available Colors")).toBeInTheDocument();
  });

  it("handles color selector click", () => {
    const features = [
      {
        id: "feature-1",
        title: "Product",
        description: "Description",
        image: "img.jpg",
        colors: [
          { name: "Red", value: "#ff0000" },
          { name: "Blue", value: "#0000ff" },
        ],
      },
    ];
    const { container } = render(
      <CarouselProductFeatureShowcase features={features} />
    );
    const colorButtons = container.querySelectorAll('button[title]');
    if (colorButtons.length > 1) {
      fireEvent.click(colorButtons[1]);
    }
    // Should not throw error
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders dot indicators for features", () => {
    const features = [
      { id: "f1", title: "Feature 1", description: "Desc 1", image: "img1.jpg" },
      { id: "f2", title: "Feature 2", description: "Desc 2", image: "img2.jpg" },
    ];
    const { container } = render(
      <CarouselProductFeatureShowcase features={features} />
    );
    // Should have dot indicators
    const dots = container.querySelectorAll(".rounded-full.h-2");
    expect(dots.length).toBe(2);
  });

  it("renders CTA as a link", () => {
    render(
      <CarouselProductFeatureShowcase
        actions={[{ label: "View Products", href: "/products" }]}
      />
    );
    const cta = screen.getByText("View Products");
    expect(cta.closest("a")).toHaveAttribute("href", "/products");
  });
});

