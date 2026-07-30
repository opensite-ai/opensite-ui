import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroCenteredScreenshot } from "../hero-centered-screenshot";

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

describe("HeroCenteredScreenshot", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<HeroCenteredScreenshot heading="Test Heading" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroCenteredScreenshot heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroCenteredScreenshot description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("does not render image when imageSrc is not provided", () => {
    render(<HeroCenteredScreenshot />);
    const img = screen.queryByTestId("mock-img");
    expect(img).not.toBeInTheDocument();
  });

  it("renders image with custom src and alt", () => {
    render(<HeroCenteredScreenshot imageSrc="https://example.com/image.jpg" imageAlt="Custom alt" />);
    const img = screen.getByTestId("mock-img");
    expect(img).toHaveAttribute("src", "https://example.com/image.jpg");
    expect(img).toHaveAttribute("alt", "Custom alt");
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/start", variant: "default" as const },
      { label: "Learn More", href: "/learn", variant: "outline" as const },
    ];
    render(<HeroCenteredScreenshot actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("renders action icon names through DynamicIcon without exposing raw text", () => {
    render(
      <HeroCenteredScreenshot
        actions={[
          {
            label: "Get Started",
            icon: "lucide/rocket",
            iconAfter: "lucide/arrow-right",
          },
        ]}
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

  it("preserves custom action icon elements", () => {
    render(
      <HeroCenteredScreenshot
        actions={[
          {
            label: "Get Started",
            icon: <span data-testid="custom-leading-icon">leading</span>,
            iconAfter: <span data-testid="custom-trailing-icon">trailing</span>,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-leading-icon")).toHaveTextContent("leading");
    expect(screen.getByTestId("custom-trailing-icon")).toHaveTextContent("trailing");
  });

  it("preserves empty, false, zero, and children action semantics", () => {
    const { container, rerender } = render(
      <HeroCenteredScreenshot
        actions={[
          { label: "Empty Icons", icon: "", iconAfter: "" },
          { label: "Falsy Icons", icon: false, iconAfter: 0 },
        ]}
      />,
    );

    expect(
      container.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
    const falsyAction = Array.from(
      container.querySelectorAll(
        '[data-slot="button"], [data-testid="mock-pressable"]',
      ),
    ).find((action) => action.textContent?.includes("Falsy Icons"));
    expect(falsyAction).toHaveTextContent("Falsy Icons0");

    rerender(
      <HeroCenteredScreenshot
        actions={[
          {
            label: "Generated Action Label",
            icon: "lucide/rocket",
            iconAfter: "lucide/arrow-right",
            children: <span data-testid="replacement-action">Replacement</span>,
          },
        ]}
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

  it("renders actionsSlot when provided", () => {
    render(<HeroCenteredScreenshot actionsSlot={<button>Custom Action</button>} />);
    expect(screen.getByText("Custom Action")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroCenteredScreenshot heading="Test Heading" className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
