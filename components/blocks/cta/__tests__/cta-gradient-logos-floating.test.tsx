import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaGradientLogosFloating } from "../cta-gradient-logos-floating";

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

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
  logoPlaceholders: Array(20).fill("https://placeholder.com/logo.jpg"),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name }: { name?: React.ReactNode | string }) =>
    name == null ? null : typeof name === "string" ? (
      <span data-testid={`mock-icon-${name || "empty"}`}>icon</span>
    ) : (
      <>{name}</>
    ),
}));

describe("CtaGradientLogosFloating", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<CtaGradientLogosFloating heading="Test Heading" headingGradient="Test Gradient" description="Test Description" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Gradient")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaGradientLogosFloating heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom heading gradient", () => {
    render(<CtaGradientLogosFloating headingGradient="amazing features" />);
    expect(screen.getByText("amazing features")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaGradientLogosFloating description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/signup", variant: "default" as const },
      { label: "Learn More", href: "/learn", variant: "outline" as const },
    ];
    render(<CtaGradientLogosFloating actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("routes action icon names through DynamicIcon and preserves custom elements", () => {
    render(
      <CtaGradientLogosFloating
        actions={[
          {
            label: "Named Icons",
            icon: "lucide/sparkles",
            iconAfter: "lucide/arrow-up-right",
          },
          {
            label: "Custom Icons",
            icon: <span data-testid="custom-leading-icon" />,
            iconAfter: <span data-testid="custom-trailing-icon" />,
          },
        ]}
      />,
    );

    expect(
      screen.getByTestId("mock-icon-lucide/sparkles"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/arrow-up-right"),
    ).toBeInTheDocument();
    expect(screen.queryByText("lucide/sparkles")).not.toBeInTheDocument();
    expect(
      screen.queryByText("lucide/arrow-up-right"),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("custom-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-trailing-icon")).toBeInTheDocument();
  });

  it("preserves the first action trailing-icon default", () => {
    render(
      <CtaGradientLogosFloating actions={[{ label: "Default Trailing" }]} />,
    );

    expect(
      screen.getByTestId("mock-icon-lucide/arrow-right"),
    ).toBeInTheDocument();
  });

  it("keeps an empty trailing icon override ahead of the default", () => {
    render(
      <CtaGradientLogosFloating
        actions={[{ label: "Empty Icons", icon: "", iconAfter: "" }]}
      />,
    );

    expect(screen.queryByTestId("mock-icon-empty")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/arrow-right"),
    ).not.toBeInTheDocument();
  });

  it("preserves false and zero overrides ahead of the trailing-icon default", () => {
    render(
      <CtaGradientLogosFloating
        actions={[{ label: "Falsy Icons", icon: false, iconAfter: 0 }]}
      />,
    );

    expect(
      screen.getByText("Falsy Icons", {
        selector: '[data-slot="button"]',
        exact: false,
      }),
    ).toHaveTextContent("Falsy Icons0");
    expect(
      screen.queryByTestId("mock-icon-lucide/arrow-right"),
    ).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaGradientLogosFloating className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
