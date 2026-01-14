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

  it("renders custom badge", () => {
    render(<CarouselFeatureBadge badge="Custom Badge" />);
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

  it("renders custom items", () => {
    const customItems = [
      { src: "custom1.jpg", alt: "Custom Image 1" },
      { src: "custom2.jpg", alt: "Custom Image 2" },
    ];
    render(<CarouselFeatureBadge items={customItems} />);
    expect(screen.getByAltText("Custom Image 1")).toBeInTheDocument();
    expect(screen.getByAltText("Custom Image 2")).toBeInTheDocument();
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
    render(<CarouselFeatureBadge badge="Test badge" heading="Test heading" description="Test description" items={[]} />);
    expect(screen.getByText("Test heading")).toBeInTheDocument();
  });
});

