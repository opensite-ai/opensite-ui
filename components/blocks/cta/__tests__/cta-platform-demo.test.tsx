import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaPlatformDemo } from "../cta-platform-demo";

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

describe("CtaPlatformDemo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<CtaPlatformDemo heading="Test Heading" description="Test Description" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaPlatformDemo heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaPlatformDemo description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Try Demo", href: "/demo", variant: "default" as const },
      { label: "Watch Video", href: "/video", variant: "outline" as const },
    ];
    render(<CtaPlatformDemo actions={actions} />);
    expect(screen.getByText("Try Demo")).toBeInTheDocument();
    expect(screen.getByText("Watch Video")).toBeInTheDocument();
  });

  it("renders explicit action icon names without raw text", () => {
    const { container } = render(
      <CtaPlatformDemo
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
      <CtaPlatformDemo
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

  it("adds the play fallback only for string video labels", () => {
    const { container } = render(
      <CtaPlatformDemo
        actions={[
          { label: "Watch Video", href: "/video" },
          { label: <span>Watch Video</span>, href: "/node-label" },
          { label: "Read Docs", href: "/docs" },
        ]}
      />,
    );

    const videoAction = container.querySelector<HTMLAnchorElement>(
      'a[href="/video"]',
    )!;
    const playIcon = videoAction.querySelector('[data-name="lucide/play"]');
    expect(playIcon).toHaveAttribute("data-size", "16");
    expect(playIcon).toHaveClass("ml-2");
    expect(
      container
        .querySelector('a[href="/node-label"]')
        ?.querySelector('[data-name="lucide/play"]'),
    ).not.toBeInTheDocument();
    expect(
      container
        .querySelector('a[href="/docs"]')
        ?.querySelector('[data-name="lucide/play"]'),
    ).not.toBeInTheDocument();
  });

  it("preserves falsy icon overrides ahead of the play fallback", () => {
    const { container } = render(
      <CtaPlatformDemo
        actions={[
          {
            label: "Empty Video",
            href: "/empty",
            icon: "",
            iconAfter: "",
          },
          {
            label: "False Video",
            href: "/false",
            icon: false,
            iconAfter: false,
          },
          {
            label: "Zero Video",
            href: "/zero",
            icon: 0,
            iconAfter: 0,
          },
        ]}
      />,
    );

    expect(
      container.querySelector('[data-testid="mock-icon"]'),
    ).not.toBeInTheDocument();
    expect(container.querySelector('a[href="/zero"]')).toHaveTextContent(
      "0Zero Video0",
    );
  });

  it("lets children replace icons, label, and the play fallback", () => {
    const { container } = render(
      <CtaPlatformDemo
        actions={[
          {
            label: "Watch Video",
            href: "/children",
            icon: "lucide/video",
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
    expect(screen.queryByText("Watch Video")).not.toBeInTheDocument();
    expect(
      container
        .querySelector('a[href="/children"]')
        ?.querySelector('[data-testid="mock-icon"]'),
    ).not.toBeInTheDocument();
  });

  it("preserves actionsSlot and product media rendering", () => {
    render(
      <CtaPlatformDemo
        actions={[{ label: "Generated action", icon: "lucide/rocket" }]}
        actionsSlot={<div data-testid="custom-actions-slot">Custom slot</div>}
        decorativeImage="/decorative.png"
        productImage="/product.png"
        productImageAlt="Product preview"
      />,
    );

    expect(screen.getByTestId("custom-actions-slot")).toHaveTextContent(
      "Custom slot",
    );
    expect(screen.queryByText("Generated action")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
    expect(
      screen.getAllByTestId("mock-img").map((image) => image.getAttribute("src")),
    ).toEqual(["/decorative.png", "/product.png"]);
    expect(screen.getByAltText("Product preview")).toHaveAttribute(
      "src",
      "/product.png",
    );
  });

  it("applies custom className", () => {
    const { container } = render(<CtaPlatformDemo className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
