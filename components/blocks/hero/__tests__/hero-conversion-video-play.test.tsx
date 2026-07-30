import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroConversionVideoPlay } from "../hero-conversion-video-play";

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
  }: {
    name?: React.ReactNode | string;
    className?: string;
  }) =>
    typeof name === "string" ? (
      <span data-testid="mock-icon" data-name={name} className={className}>
        icon
      </span>
    ) : (
      <>{name}</>
    ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("HeroConversionVideoPlay", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<HeroConversionVideoPlay heading="Test Heading" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroConversionVideoPlay heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroConversionVideoPlay description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders primary action when provided", () => {
    const primaryAction = { label: "Get Started", href: "/start", variant: "default" as const };
    render(<HeroConversionVideoPlay primaryAction={primaryAction} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("renders primary action icon names through DynamicIcon without exposing raw text", () => {
    render(
      <HeroConversionVideoPlay
        primaryAction={{
          label: "Get Started",
          icon: "lucide/rocket",
          iconAfter: "lucide/arrow-right",
        }}
      />,
    );

    expect(
      screen.getAllByTestId("mock-icon").map((icon) =>
        icon.getAttribute("data-name"),
      ),
    ).toEqual(["lucide/rocket", "lucide/arrow-right"]);
    expect(screen.queryByText("lucide/rocket")).not.toBeInTheDocument();
    expect(screen.queryByText("lucide/arrow-right")).not.toBeInTheDocument();
  });

  it("preserves custom primary action icon elements", () => {
    render(
      <HeroConversionVideoPlay
        primaryAction={{
          label: "Get Started",
          icon: <span data-testid="custom-leading-icon">leading</span>,
          iconAfter: <span data-testid="custom-trailing-icon">trailing</span>,
        }}
      />,
    );

    expect(screen.getByTestId("custom-leading-icon")).toHaveTextContent("leading");
    expect(screen.getByTestId("custom-trailing-icon")).toHaveTextContent("trailing");
  });

  it("preserves empty, false, zero, and children action semantics", () => {
    const { container, rerender } = render(
      <HeroConversionVideoPlay
        primaryAction={{ label: "Empty Icons", icon: "", iconAfter: "" }}
      />,
    );

    expect(
      container.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();

    rerender(
      <HeroConversionVideoPlay
        primaryAction={{ label: "Falsy Icons", icon: false, iconAfter: 0 }}
      />,
    );
    const falsyAction = Array.from(
      container.querySelectorAll(
        '[data-slot="button"], [data-testid="mock-pressable"]',
      ),
    ).find((action) => action.textContent?.includes("Falsy Icons"));
    expect(falsyAction).toHaveTextContent("Falsy Icons0");

    rerender(
      <HeroConversionVideoPlay
        primaryAction={{
          label: "Generated Action Label",
          icon: "lucide/rocket",
          iconAfter: "lucide/arrow-right",
          children: <span data-testid="replacement-action">Replacement</span>,
        }}
      />,
    );
    expect(screen.getByTestId("replacement-action")).toBeInTheDocument();
    expect(
      screen.queryByText("Generated Action Label"),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroConversionVideoPlay heading="Test Heading" className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
