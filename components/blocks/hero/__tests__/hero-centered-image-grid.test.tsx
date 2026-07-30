import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroCenteredImageGrid } from "../hero-centered-image-grid";

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

describe("HeroCenteredImageGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<HeroCenteredImageGrid heading="Test Heading" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroCenteredImageGrid heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroCenteredImageGrid description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [{ label: "Get Started", href: "/start", variant: "default" as const }];
    render(<HeroCenteredImageGrid actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("renders action and overlay icon names through DynamicIcon without exposing raw text", () => {
    render(
      <HeroCenteredImageGrid
        actions={[
          {
            label: "Get Started",
            icon: "lucide/rocket",
            iconAfter: "lucide/arrow-right",
          },
        ]}
        gridImages={[
          { src: "/first.jpg", alt: "First" },
          { src: "/second.jpg", alt: "Second" },
        ]}
        imageOverlayAction={{
          label: "View image",
          icon: "lucide/image",
          iconAfter: "lucide/maximize",
        }}
      />,
    );

    expect(
      screen.getAllByTestId("mock-icon").map((icon) =>
        icon.getAttribute("data-name"),
      ),
    ).toEqual([
      "lucide/rocket",
      "lucide/arrow-right",
      "lucide/image",
      "lucide/maximize",
    ]);
    for (const iconName of [
      "lucide/rocket",
      "lucide/arrow-right",
      "lucide/image",
      "lucide/maximize",
    ]) {
      expect(screen.queryByText(iconName)).not.toBeInTheDocument();
    }
  });

  it("preserves custom action and overlay icon elements", () => {
    render(
      <HeroCenteredImageGrid
        actions={[
          {
            label: "Get Started",
            icon: <span data-testid="action-leading-icon">action leading</span>,
            iconAfter: <span data-testid="action-trailing-icon">action trailing</span>,
          },
        ]}
        gridImages={[
          { src: "/first.jpg", alt: "First" },
          { src: "/second.jpg", alt: "Second" },
        ]}
        imageOverlayAction={{
          label: "View image",
          icon: <span data-testid="overlay-leading-icon">overlay leading</span>,
          iconAfter: <span data-testid="overlay-trailing-icon">overlay trailing</span>,
        }}
      />,
    );

    expect(screen.getByTestId("action-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("action-trailing-icon")).toBeInTheDocument();
    expect(screen.getByTestId("overlay-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("overlay-trailing-icon")).toBeInTheDocument();
  });

  it("preserves edge values and children in action and overlay paths", () => {
    const gridImages = [
      { src: "/first.jpg", alt: "First" },
      { src: "/second.jpg", alt: "Second" },
    ];
    const { container, rerender } = render(
      <HeroCenteredImageGrid
        actions={[{ label: "Empty Icons", icon: "", iconAfter: "" }]}
        gridImages={gridImages}
        imageOverlayAction={{
          label: "Overlay Falsy Icons",
          icon: false,
          iconAfter: 0,
        }}
      />,
    );

    expect(
      container.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
    const overlayAction = Array.from(
      container.querySelectorAll(
        '[data-slot="button"], [data-testid="mock-pressable"]',
      ),
    ).find((action) => action.textContent?.includes("Overlay Falsy Icons"));
    expect(overlayAction).toHaveTextContent("Overlay Falsy Icons0");

    rerender(
      <HeroCenteredImageGrid
        actions={[
          {
            label: "Generated Action Label",
            icon: "lucide/rocket",
            iconAfter: "lucide/arrow-right",
            children: (
              <span data-testid="action-replacement">Action Replacement</span>
            ),
          },
        ]}
        gridImages={gridImages}
        imageOverlayAction={{
          label: "Generated Overlay Label",
          icon: "lucide/image",
          iconAfter: "lucide/maximize",
          children: (
            <span data-testid="overlay-replacement">Overlay Replacement</span>
          ),
        }}
      />,
    );
    expect(screen.getByTestId("action-replacement")).toBeInTheDocument();
    expect(screen.getByTestId("overlay-replacement")).toBeInTheDocument();
    expect(
      screen.queryByText("Generated Action Label"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Generated Overlay Label"),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroCenteredImageGrid heading="Test Heading" className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
