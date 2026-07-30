import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { AutoScrollCarousel } from "../auto-scroll-carousel";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("embla-carousel-auto-scroll", () => ({
  default: () => ({}),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    size,
    className,
  }: {
    name?: React.ReactNode | string;
    size?: number;
    className?: string;
  }) =>
    typeof name === "string" ? (
      <span
        data-testid="mock-icon"
        data-name={name}
        data-size={size}
        className={className}
      />
    ) : (
      <>{name}</>
    ),
}));

vi.mock("../../../ui/carousel", () => ({
  Carousel: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel">{children}</div>,
  CarouselContent: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-content">{children}</div>,
  CarouselItem: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-item">{children}</div>,
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("AutoScrollCarousel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with required props", () => {
    render(<AutoScrollCarousel heading="Test Heading" description="Test description" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<AutoScrollCarousel heading="Custom Heading" description="Test description" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<AutoScrollCarousel heading="Test Heading" description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders images when provided", () => {
    const images = [
      { src: "https://example.com/image1.jpg", alt: "Team photo 1" },
      { src: "https://example.com/image2.jpg", alt: "Team photo 2" },
    ];
    render(<AutoScrollCarousel images={images} />);
    expect(screen.getByAltText("Team photo 1")).toBeInTheDocument();
    expect(screen.getByAltText("Team photo 2")).toBeInTheDocument();
  });

  it("routes action icons through DynamicIcon while preserving ReactNode semantics", () => {
    const { container, rerender } = render(
      <AutoScrollCarousel
        action={{
          label: "String action",
          href: "/string",
          icon: "lucide/leading",
          iconAfter: "lucide/trailing",
        }}
      />,
    );

    let action = container.querySelector('[href="/string"]') as HTMLElement;
    expect(
      within(action).getAllByTestId("mock-icon").map((icon) =>
        icon.getAttribute("data-name"),
      ),
    ).toEqual(["lucide/leading", "lucide/trailing"]);
    expect(action).not.toHaveTextContent("lucide/leading");
    expect(action).not.toHaveTextContent("lucide/trailing");

    rerender(
      <AutoScrollCarousel
        action={{
          label: "Custom action",
          href: "/custom",
          icon: <span data-testid="custom-leading-icon" />,
          iconAfter: <span data-testid="custom-trailing-icon" />,
        }}
      />,
    );
    action = container.querySelector('[href="/custom"]') as HTMLElement;
    expect(
      within(action).getByTestId("custom-leading-icon"),
    ).toBeInTheDocument();
    expect(
      within(action).getByTestId("custom-trailing-icon"),
    ).toBeInTheDocument();

    rerender(
      <AutoScrollCarousel
        action={{
          label: "Sentinel action",
          href: "/sentinel",
          icon: 0,
          iconAfter: 0,
        }}
      />,
    );
    action = container.querySelector('[href="/sentinel"]') as HTMLElement;
    expect(action).toHaveTextContent("0Sentinel action0");
    expect(
      within(action).queryByTestId("mock-icon"),
    ).not.toBeInTheDocument();

    rerender(
      <AutoScrollCarousel
        action={{
          label: "Empty action",
          href: "/empty",
          icon: "",
          iconAfter: false,
        }}
      />,
    );
    action = container.querySelector('[href="/empty"]') as HTMLElement;
    expect(action).toHaveTextContent("Empty action");
    expect(
      within(action).queryByTestId("mock-icon"),
    ).not.toBeInTheDocument();

    rerender(
      <AutoScrollCarousel
        action={{
          label: "Hidden label",
          href: "/children",
          icon: "lucide/hidden",
          children: 0,
        }}
      />,
    );
    action = container.querySelector('[href="/children"]') as HTMLElement;
    expect(action).toHaveTextContent("0");
    expect(action).not.toHaveTextContent("Hidden label");
    expect(
      within(action).queryByTestId("mock-icon"),
    ).not.toBeInTheDocument();

    rerender(
      <AutoScrollCarousel
        action={{ label: "Default trailing", href: "/default" }}
      />,
    );
    action = container.querySelector('[href="/default"]') as HTMLElement;
    expect(within(action).getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "lucide/arrow-up-right",
    );
  });

  it("applies custom className", () => {
    const { container } = render(<AutoScrollCarousel className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
