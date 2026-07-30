import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaSplitGradientImage } from "../cta-split-gradient-image";

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
    className,
    size,
  }: {
    name?: React.ReactNode | string;
    className?: string;
    size?: number;
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

describe("CtaSplitGradientImage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<CtaSplitGradientImage heading="Test Heading" label="Test Label" description="Test Description" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaSplitGradientImage heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaSplitGradientImage description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom label", () => {
    render(<CtaSplitGradientImage label="Custom Label" />);
    expect(screen.getByText("Custom Label")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/signup", variant: "default" as const },
      { label: "Learn More", href: "/learn", variant: "outline" as const },
    ];
    render(<CtaSplitGradientImage actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("renders action icon names through DynamicIcon without raw text", () => {
    const { container } = render(
      <CtaSplitGradientImage
        actions={[
          {
            label: "Explore",
            href: "/icons",
            icon: "lucide/arrow-left",
            iconAfter: "lucide/arrow-right",
          },
        ]}
      />,
    );

    expect(
      screen
        .getAllByTestId("mock-icon")
        .map((icon) => icon.getAttribute("data-name")),
    ).toEqual(["lucide/arrow-left", "lucide/arrow-right"]);
    const action = container.querySelector('a[href="/icons"]');
    expect(action).not.toHaveTextContent("lucide/arrow-left");
    expect(action).not.toHaveTextContent("lucide/arrow-right");
  });

  it("preserves custom action icon elements", () => {
    render(
      <CtaSplitGradientImage
        actions={[
          {
            label: "Explore",
            icon: <span data-testid="custom-leading-icon">leading</span>,
            iconAfter: <span data-testid="custom-trailing-icon">trailing</span>,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-leading-icon")).toHaveTextContent(
      "leading",
    );
    expect(screen.getByTestId("custom-trailing-icon")).toHaveTextContent(
      "trailing",
    );
  });

  it("preserves empty, false, zero, and children action semantics", () => {
    const { container, rerender } = render(
      <CtaSplitGradientImage
        actions={[
          {
            label: "Parity action",
            href: "/parity",
            icon: 0,
            iconAfter: false,
          },
        ]}
      />,
    );
    const getAction = () =>
      container.querySelector<HTMLAnchorElement>('a[href="/parity"]')!;

    expect(getAction()).toHaveTextContent("0Parity action");
    expect(
      getAction().querySelector('[data-testid="mock-icon"]'),
    ).not.toBeInTheDocument();

    rerender(
      <CtaSplitGradientImage
        actions={[
          {
            label: "Empty action",
            href: "/parity",
            icon: "",
            iconAfter: "",
          },
        ]}
      />,
    );
    expect(getAction()).toHaveTextContent("Empty action");
    expect(
      getAction().querySelector('[data-testid="mock-icon"]'),
    ).not.toBeInTheDocument();

    rerender(
      <CtaSplitGradientImage
        actions={[
          {
            label: "Generated label",
            href: "/parity",
            icon: "lucide/arrow-left",
            iconAfter: "lucide/arrow-right",
            children: (
              <span data-testid="custom-action-content">Custom action</span>
            ),
          },
        ]}
      />,
    );
    expect(screen.getByTestId("custom-action-content")).toHaveTextContent(
      "Custom action",
    );
    expect(screen.queryByText("Generated label")).not.toBeInTheDocument();
    expect(
      getAction().querySelector('[data-testid="mock-icon"]'),
    ).not.toBeInTheDocument();
  });

  it("preserves actionsSlot and image rendering", () => {
    render(
      <CtaSplitGradientImage
        actions={[{ label: "Generated action", icon: "lucide/rocket" }]}
        actionsSlot={<div data-testid="custom-actions-slot">Custom slot</div>}
        imageSrc="/product.png"
        imageAlt="Product preview"
      />,
    );

    expect(screen.getByTestId("custom-actions-slot")).toHaveTextContent(
      "Custom slot",
    );
    expect(screen.queryByText("Generated action")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
    expect(screen.getByTestId("mock-img")).toHaveAttribute(
      "src",
      "/product.png",
    );
    expect(screen.getByTestId("mock-img")).toHaveAttribute(
      "alt",
      "Product preview",
    );
  });

  it("applies custom className", () => {
    const { container } = render(<CtaSplitGradientImage className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
