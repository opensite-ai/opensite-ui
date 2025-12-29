import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LogosDoubleCarouselPattern } from "../logos-double-carousel-pattern";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className, variant }: { children: React.ReactNode; href?: string; className?: string; variant?: string }) => (
    <a href={href} className={className} data-variant={variant} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("embla-carousel-auto-scroll", () => ({
  default: () => ({}),
}));

vi.mock("../../../ui/carousel", () => ({
  Carousel: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel">{children}</div>,
  CarouselContent: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-content">{children}</div>,
  CarouselItem: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-item">{children}</div>,
}));

vi.mock("../../../lib/patternSvgs", () => ({
  patternSvgs: { dots: "data:image/svg+xml,..." },
}));

describe("LogosDoubleCarouselPattern", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<LogosDoubleCarouselPattern />);
    expect(screen.getByText("Trusted by industry leaders worldwide")).toBeInTheDocument();
    expect(screen.getByText(/Join thousands of companies/)).toBeInTheDocument();
  });

  it("renders custom title and description", () => {
    render(
      <LogosDoubleCarouselPattern
        title="Custom Title"
        description="Custom Description"
      />
    );
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom Description")).toBeInTheDocument();
  });

  it("renders primary and secondary buttons with default text", () => {
    render(<LogosDoubleCarouselPattern />);
    expect(screen.getByText("Get started")).toBeInTheDocument();
    expect(screen.getByText("Learn more")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(
      <LogosDoubleCarouselPattern
        actions={[
          { label: "Start Now", href: "#", variant: "default" },
          { label: "Read More", href: "#", variant: "outline" },
        ]}
      />
    );
    expect(screen.getByText("Start Now")).toBeInTheDocument();
    expect(screen.getByText("Read More")).toBeInTheDocument();
  });

  it("renders two carousels", () => {
    render(<LogosDoubleCarouselPattern />);
    const carousels = screen.getAllByTestId("carousel");
    expect(carousels.length).toBe(2);
  });

  it("renders logos in both rows", () => {
    render(<LogosDoubleCarouselPattern />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders custom logos", () => {
    const customTopLogos = [{ name: "Top Company", logo: "/top.png" }];
    const customBottomLogos = [{ name: "Bottom Company", logo: "/bottom.png" }];
    render(
      <LogosDoubleCarouselPattern
        topRowLogos={customTopLogos}
        bottomRowLogos={customBottomLogos}
      />
    );
    const topLogos = screen.getAllByAltText("Top Company logo");
    const bottomLogos = screen.getAllByAltText("Bottom Company logo");
    expect(topLogos.length).toBeGreaterThan(0);
    expect(bottomLogos.length).toBeGreaterThan(0);
  });

  it("applies custom className", () => {
    const { container } = render(<LogosDoubleCarouselPattern className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<LogosDoubleCarouselPattern />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-32");
  });

  it("handles empty logos arrays", () => {
    render(<LogosDoubleCarouselPattern topRowLogos={[]} bottomRowLogos={[]} />);
    expect(screen.getByText("Trusted by industry leaders worldwide")).toBeInTheDocument();
  });
});
