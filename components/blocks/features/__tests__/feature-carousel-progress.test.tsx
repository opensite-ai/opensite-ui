import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { FeatureCarouselProgress } from "../feature-carousel-progress";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../ui/carousel", () => ({
  Carousel: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel">{children}</div>,
  CarouselContent: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-content">{children}</div>,
  CarouselItem: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-item">{children}</div>,
  CarouselNext: () => <button data-testid="carousel-next">Next</button>,
  CarouselPrevious: () => <button data-testid="carousel-prev">Prev</button>,
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    size,
    className,
  }: {
    name?: React.ReactNode;
    size?: number;
    className?: string;
  }) =>
    typeof name === "string" ? (
      <span
        data-testid="mock-icon"
        data-name={name}
        data-size={size}
        className={className}
      >
        icon
      </span>
    ) : (
      <>{name}</>
    ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("FeatureCarouselProgress", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<FeatureCarouselProgress badge="Test Badge" title="Test Title" />);
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders custom badge", () => {
    render(<FeatureCarouselProgress badge="Custom Badge" />);
    expect(screen.getByText("Custom Badge")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureCarouselProgress title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders slides when provided", () => {
    const slides = [
      { title: "Slide One", description: "Description one" },
      { title: "Slide Two", description: "Description two" },
    ];
    render(<FeatureCarouselProgress slides={slides} />);
    expect(screen.getByText("Slide One")).toBeInTheDocument();
    expect(screen.getByText("Slide Two")).toBeInTheDocument();
  });

  it("renders icon prop names dynamically with the original size and wrapper classes", () => {
    render(
      <FeatureCarouselProgress
        slides={[
          {
            icon: "lucide/code",
            iconName: "lucide/fallback",
            iconClassName: "carousel-icon",
            title: "String Icon",
          },
        ]}
      />,
    );

    const icon = screen.getByTestId("mock-icon");
    expect(icon).toHaveAttribute("data-name", "lucide/code");
    expect(icon).toHaveAttribute("data-size", "16");
    expect(icon.parentElement).toHaveClass(
      "size-8",
      "lg:size-10",
      "carousel-icon",
    );
    expect(screen.getByTestId("carousel-item")).not.toHaveTextContent(
      "lucide/code",
    );
  });

  it.each([
    ["empty", ""],
    ["false", false],
    ["zero", 0],
  ])("falls through %s icon values to iconName", (_label, icon) => {
    render(
      <FeatureCarouselProgress
        slides={[{ icon, iconName: "lucide/fallback", title: "Fallback Icon" }]}
      />,
    );

    expect(screen.getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "lucide/fallback",
    );
  });

  it("omits the icon wrapper for a falsy icon without iconName", () => {
    render(<FeatureCarouselProgress slides={[{ icon: 0, title: "No Icon" }]} />);

    const slide = screen.getByTestId("carousel-item");
    expect(within(slide).queryByTestId("mock-icon")).not.toBeInTheDocument();
    expect(slide.querySelector(".size-8")).not.toBeInTheDocument();
    expect(slide).not.toHaveTextContent("0");
  });

  it("preserves custom icon elements", () => {
    render(
      <FeatureCarouselProgress
        slides={[
          {
            icon: <span data-testid="custom-icon" />,
            iconName: "lucide/fallback",
            title: "Custom Icon",
          },
        ]}
      />,
    );

    const customIcon = screen.getByTestId("custom-icon");
    expect(customIcon).toBeInTheDocument();
    expect(customIcon.parentElement).toHaveClass("size-8", "lg:size-10");
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureCarouselProgress className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
