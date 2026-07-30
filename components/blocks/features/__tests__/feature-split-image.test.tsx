import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { FeatureSplitImage } from "../feature-split-image";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../../lib/Pressable", () => ({
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

describe("FeatureSplitImage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<FeatureSplitImage title="Test Title" description="Test Description" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<FeatureSplitImage title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<FeatureSplitImage description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders image with correct alt text", () => {
    render(<FeatureSplitImage imageSrc="test-image.jpg" imageAlt="Custom alt text" />);
    const img = screen.getByTestId("mock-img");
    expect(img).toHaveAttribute("alt", "Custom alt text");
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/start", variant: "default" as const },
      { label: "Learn More", href: "/learn", variant: "outline" as const },
    ];
    render(<FeatureSplitImage actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("routes both action icon positions through DynamicIcon", () => {
    const { container } = render(
      <FeatureSplitImage
        actions={[
          {
            label: "Raw action",
            href: "/raw",
            icon: "lucide/arrow-left",
            iconAfter: "lucide/arrow-right",
          },
          {
            label: "Custom action",
            href: "/custom",
            icon: <span data-testid="custom-before">before</span>,
            iconAfter: <span data-testid="custom-after">after</span>,
          },
        ]}
      />,
    );

    const rawAction = container.querySelector('a[href="/raw"]') as HTMLElement;
    expect(
      within(rawAction)
        .getAllByTestId("mock-icon")
        .map((icon) => icon.getAttribute("data-name")),
    ).toEqual(["lucide/arrow-left", "lucide/arrow-right"]);
    expect(within(rawAction).queryByText("lucide/arrow-left")).not.toBeInTheDocument();
    expect(within(rawAction).queryByText("lucide/arrow-right")).not.toBeInTheDocument();
    expect(screen.getByTestId("custom-before")).toBeInTheDocument();
    expect(screen.getByTestId("custom-after")).toBeInTheDocument();
  });

  it("preserves strict empty guards and nullish children precedence", () => {
    const { container } = render(
      <FeatureSplitImage
        actions={[
          { label: "Empty", href: "/empty", icon: "", iconAfter: "" },
          { label: "Boundary", href: "/boundary", icon: false, iconAfter: 0 },
          {
            label: "Hidden zero",
            href: "/zero-child",
            icon: "lucide/hidden-zero",
            children: 0,
          },
          {
            label: "Hidden false",
            href: "/false-child",
            icon: "lucide/hidden-false",
            children: false,
          },
          {
            label: "Hidden empty",
            href: "/empty-child",
            icon: "lucide/hidden-empty",
            children: "",
          },
        ]}
      />,
    );

    expect(container.querySelector('a[href="/empty"]')).toHaveTextContent("Empty");
    expect(container.querySelector('a[href="/boundary"]')).toHaveTextContent(
      "Boundary0",
    );
    expect(container.querySelector('a[href="/zero-child"]')).toHaveTextContent("0");
    expect(container.querySelector('a[href="/false-child"]')).toBeEmptyDOMElement();
    expect(container.querySelector('a[href="/empty-child"]')).toBeEmptyDOMElement();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
    expect(screen.queryByText("Hidden zero")).not.toBeInTheDocument();
    expect(screen.queryByText("Hidden false")).not.toBeInTheDocument();
    expect(screen.queryByText("Hidden empty")).not.toBeInTheDocument();
  });

  it("preserves truthy actionsSlot precedence", () => {
    const actions = [{ label: "Array action", href: "/array" }];
    const { rerender } = render(
      <FeatureSplitImage actions={actions} actionsSlot={false} />,
    );
    expect(screen.getByText("Array action")).toBeInTheDocument();

    rerender(
      <FeatureSplitImage
        actions={actions}
        actionsSlot={<div>Custom actions slot</div>}
      />,
    );
    expect(screen.getByText("Custom actions slot")).toBeInTheDocument();
    expect(screen.queryByText("Array action")).not.toBeInTheDocument();
  });

  it("keeps image strings in Img and honors truthy image slots", () => {
    const { container, rerender } = render(
      <FeatureSplitImage
        imageSrc="lucide/image-looking-url"
        imageAlt="Image boundary"
        imageSlot={false}
      />,
    );
    expect(screen.getByTestId("mock-img")).toHaveAttribute(
      "src",
      "lucide/image-looking-url",
    );
    expect(
      container.querySelector('[data-name="lucide/image-looking-url"]'),
    ).not.toBeInTheDocument();

    rerender(
      <FeatureSplitImage
        imageSrc="lucide/image-looking-url"
        imageSlot={<div>Custom image slot</div>}
      />,
    );
    expect(screen.getByText("Custom image slot")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-img")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FeatureSplitImage className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
