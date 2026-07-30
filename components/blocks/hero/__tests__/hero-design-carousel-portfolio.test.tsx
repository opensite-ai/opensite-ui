import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroDesignCarouselPortfolio } from "../hero-design-carousel-portfolio";

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

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    size,
  }: {
    name?: React.ReactNode | string;
    size?: number;
  }) =>
    typeof name === "string" ? (
      <span data-testid="mock-icon" data-name={name} data-size={size} />
    ) : (
      <>{name}</>
    ),
}));

vi.mock("embla-carousel-auto-scroll", () => ({
  default: () => ({}),
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
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("HeroDesignCarouselPortfolio", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<HeroDesignCarouselPortfolio heading="Test Heading" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroDesignCarouselPortfolio heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(
      <HeroDesignCarouselPortfolio description="Custom description text" />,
    );
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom, named, and default feature icons dynamically", () => {
    render(
      <HeroDesignCarouselPortfolio
        features={[
          {
            title: "String feature",
            icon: "lucide/sparkles",
            iconName: "lucide/ignored",
          },
          {
            title: "Custom feature",
            icon: <span data-testid="custom-feature-icon" />,
            iconName: "lucide/ignored",
          },
          { title: "Named feature", iconName: "lucide/star" },
          { title: "Default feature" },
        ]}
      />,
    );

    expect(
      screen
        .getAllByTestId("mock-icon")
        .map((icon) => icon.getAttribute("data-name")),
    ).toEqual(["lucide/sparkles", "lucide/star", "lucide/check-circle"]);
    expect(screen.getByText("String feature").parentElement).not.toHaveTextContent(
      "lucide/sparkles",
    );
    expect(screen.getByTestId("custom-feature-icon")).toBeInTheDocument();
  });

  it("suppresses empty and false custom icons while preserving zero", () => {
    render(
      <HeroDesignCarouselPortfolio
        features={[
          { title: "Empty feature", icon: "", iconName: "lucide/ignored" },
          { title: "False feature", icon: false, iconName: "lucide/ignored" },
          { title: "Zero feature", icon: 0, iconName: "lucide/ignored" },
        ]}
      />,
    );

    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
    expect(screen.getByText("Empty feature").parentElement).toHaveTextContent(
      "Empty feature",
    );
    expect(screen.getByText("False feature").parentElement).toHaveTextContent(
      "False feature",
    );
    expect(screen.getByText("Zero feature").parentElement).toHaveTextContent(
      "0Zero feature",
    );
  });

  it("applies custom className", () => {
    const { container } = render(
      <HeroDesignCarouselPortfolio
        heading="Test Heading"
        className="custom-class"
      />,
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
