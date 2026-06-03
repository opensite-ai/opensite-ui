import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CarouselSidebarResources } from "../carousel-sidebar-resources";

vi.mock("@page-speed/img", () => ({
  Img: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href?: string;
    className?: string;
  }) => (
    <a href={href} className={className} data-testid="mock-pressable">
      {children}
    </a>
  ),
}));

vi.mock("../../../ui/carousel", () => ({
  Carousel: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="carousel">{children}</div>
  ),
  CarouselContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="carousel-content">{children}</div>
  ),
  CarouselItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="carousel-item">{children}</div>
  ),
  CarouselNext: () => <button data-testid="carousel-next">Next</button>,
  CarouselPrevious: () => <button data-testid="carousel-prev">Prev</button>,
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("CarouselSidebarResources", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with required props", () => {
    render(
      <CarouselSidebarResources
        heading="Test Heading"
        viewAllText="View all resources"
        viewAllHref="#"
      />,
    );
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("View all resources")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CarouselSidebarResources heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders resources when provided", () => {
    const resources = [
      {
        title: "Getting Started Guide",
        category: "guide",
        link: "/docs/getting-started",
        image: "https://example.com/guide.jpg",
      },
    ];
    render(<CarouselSidebarResources resources={resources} />);
    expect(screen.getAllByText("Getting Started Guide").length).toBeGreaterThan(
      0,
    );
    expect(screen.getAllByText("guide").length).toBeGreaterThan(0);
  });

  it("renders custom view all text", () => {
    render(<CarouselSidebarResources viewAllText="See all" viewAllHref="#" />);
    expect(screen.getByText("See all")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <CarouselSidebarResources className="custom-class" />,
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
