import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { CarouselDemoLink } from "../carousel-demo-link";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
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

vi.mock("../../../ui/carousel", () => ({
  Carousel: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel">{children}</div>,
  CarouselContent: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-content">{children}</div>,
  CarouselItem: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-item">{children}</div>,
  CarouselNext: () => <button data-testid="carousel-next">Next</button>,
  CarouselPrevious: () => <button data-testid="carousel-prev">Prev</button>,
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("CarouselDemoLink", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with required props", () => {
    render(<CarouselDemoLink heading="Test Heading" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CarouselDemoLink heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders demo action when provided", () => {
    const demoAction = { label: "Book a demo", href: "https://calendly.com/demo" };
    render(<CarouselDemoLink demoAction={demoAction} />);
    expect(screen.getByText("Book a demo")).toBeInTheDocument();
  });

  it("renders items when provided", () => {
    const items = [
      {
        id: "1",
        title: "AI Analytics",
        summary: "Transform your data into insights",
        url: "/solutions/analytics",
        image: "https://example.com/image.jpg",
      },
    ];
    render(<CarouselDemoLink items={items} readMoreText="Read more" />);
    expect(screen.getByText("AI Analytics")).toBeInTheDocument();
    expect(screen.getByText("Transform your data into insights")).toBeInTheDocument();
    expect(screen.getByText("Read more")).toBeInTheDocument();
  });

  it("renders custom read more text", () => {
    const items = [
      {
        id: "1",
        title: "Item 1",
        summary: "Summary 1",
        url: "/item-1",
        image: "https://example.com/image.jpg",
      },
    ];
    render(<CarouselDemoLink items={items} readMoreText="Learn more" />);
    expect(screen.getByText("Learn more")).toBeInTheDocument();
  });

  it("routes demo action icons through DynamicIcon while preserving ReactNode semantics", () => {
    const { container, rerender } = render(
      <CarouselDemoLink
        demoAction={{
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
      <CarouselDemoLink
        demoAction={{
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
      <CarouselDemoLink
        demoAction={{
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
      <CarouselDemoLink
        demoAction={{
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
      <CarouselDemoLink
        demoAction={{
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
      <CarouselDemoLink
        demoAction={{ label: "Default trailing", href: "/default" }}
      />,
    );
    action = container.querySelector('[href="/default"]') as HTMLElement;
    expect(within(action).getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "lucide/arrow-up-right",
    );
  });

  it("applies custom className", () => {
    const { container } = render(<CarouselDemoLink className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
