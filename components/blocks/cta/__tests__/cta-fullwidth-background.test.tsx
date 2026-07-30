import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaFullwidthBackground } from "../cta-fullwidth-background";

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
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name }: { name?: React.ReactNode | string }) =>
    name == null ? null : typeof name === "string" ? (
      <span data-testid={`mock-icon-${name || "empty"}`}>icon</span>
    ) : (
      <>{name}</>
    ),
}));

describe("CtaFullwidthBackground", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<CtaFullwidthBackground heading="Test Heading" description="Test Description" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaFullwidthBackground heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaFullwidthBackground description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/signup", variant: "default" as const },
      { label: "Learn More", href: "/about", variant: "secondary" as const },
    ];
    render(<CtaFullwidthBackground actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("routes action icon names through DynamicIcon and preserves custom elements", () => {
    render(
      <CtaFullwidthBackground
        actions={[
          {
            label: "Named Icons",
            icon: "lucide/play",
            iconAfter: "lucide/arrow-right",
          },
          {
            label: "Custom Icons",
            icon: <span data-testid="custom-leading-icon" />,
            iconAfter: <span data-testid="custom-trailing-icon" />,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("mock-icon-lucide/play")).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/arrow-right"),
    ).toBeInTheDocument();
    expect(screen.queryByText("lucide/play")).not.toBeInTheDocument();
    expect(screen.queryByText("lucide/arrow-right")).not.toBeInTheDocument();
    expect(screen.getByTestId("custom-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-trailing-icon")).toBeInTheDocument();
  });

  it("renders no icon DOM for empty action strings and preserves false and zero", () => {
    render(
      <CtaFullwidthBackground
        actions={[
          { label: "Empty Icons", icon: "", iconAfter: "" },
          { label: "Falsy Icons", icon: false, iconAfter: 0 },
        ]}
      />,
    );

    expect(screen.queryByTestId("mock-icon-empty")).not.toBeInTheDocument();
    expect(
      screen.getByText("Falsy Icons", {
        selector: '[data-slot="button"]',
        exact: false,
      }),
    ).toHaveTextContent("Falsy Icons0");
  });

  it("applies custom className", () => {
    const { container } = render(<CtaFullwidthBackground className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
