import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
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

  it("routes action icons through DynamicIcon while preserving action composition", () => {
    const { container } = render(
      <CarouselProductFeatureShowcase
        actions={[
          {
            label: "String action",
            href: "/string",
            icon: "lucide/shopping-bag",
            iconAfter: "lucide/arrow-right",
            className: "custom-action",
          },
          {
            label: "Custom action",
            href: "/custom",
            icon: <span data-testid="custom-leading-icon" />,
            iconAfter: <span data-testid="custom-trailing-icon" />,
          },
          {
            label: "Sentinel action",
            href: "/sentinel",
            icon: 0,
            iconAfter: false,
          },
          {
            label: "Empty action",
            href: "/empty",
            icon: "",
            iconAfter: "",
          },
          {
            label: "Hidden label",
            href: "/children",
            icon: "lucide/hidden",
            children: <span data-testid="action-children">Custom children</span>,
          },
        ]}
      />,
    );

    const stringAction = container.querySelector(
      '[href="/string"]',
    ) as HTMLElement;
    expect(
      within(stringAction).getAllByTestId("mock-icon").map((icon) =>
        icon.getAttribute("data-name"),
      ),
    ).toEqual(["lucide/shopping-bag", "lucide/arrow-right"]);
    expect(stringAction).not.toHaveTextContent("lucide/shopping-bag");
    expect(stringAction).not.toHaveTextContent("lucide/arrow-right");
    expect(stringAction).toHaveClass("custom-action");

    const customAction = container.querySelector(
      '[href="/custom"]',
    ) as HTMLElement;
    expect(
      within(customAction).getByTestId("custom-leading-icon"),
    ).toBeInTheDocument();
    expect(
      within(customAction).getByTestId("custom-trailing-icon"),
    ).toBeInTheDocument();

    const sentinelAction = container.querySelector(
      '[href="/sentinel"]',
    ) as HTMLElement;
    expect(sentinelAction).toHaveTextContent("0Sentinel action");
    expect(
      within(sentinelAction).queryByTestId("mock-icon"),
    ).not.toBeInTheDocument();

    const emptyAction = container.querySelector(
      '[href="/empty"]',
    ) as HTMLElement;
    expect(
      within(emptyAction).queryByTestId("mock-icon"),
    ).not.toBeInTheDocument();

    const childrenAction = container.querySelector(
      '[href="/children"]',
    ) as HTMLElement;
    expect(
      within(childrenAction).getByTestId("action-children"),
    ).toBeInTheDocument();
    expect(
      within(childrenAction).queryByTestId("mock-icon"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Hidden label")).not.toBeInTheDocument();
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
