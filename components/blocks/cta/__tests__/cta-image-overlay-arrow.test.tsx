import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaImageOverlayArrow } from "../cta-image-overlay-arrow";

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
        data-testid={`mock-icon-${name}`}
        data-name={name}
        data-size={size}
        className={className}
      />
    ) : (
      <>{name}</>
    ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("CtaImageOverlayArrow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<CtaImageOverlayArrow heading="Test Heading" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaImageOverlayArrow heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/start", variant: "secondary" as const },
    ];
    render(<CtaImageOverlayArrow actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("renders action icon names and preserves the default arrow styling", () => {
    const { container } = render(
      <CtaImageOverlayArrow
        actions={[
          {
            label: "Default Arrow",
            href: "/default",
            icon: "lucide/rocket",
          },
          {
            label: "Custom Arrow",
            href: "/custom",
            iconAfter: "lucide/external-link",
          },
        ]}
      />,
    );

    const defaultAction = container.querySelector('a[href="/default"]')!;
    expect(
      defaultAction.querySelector('[data-name="lucide/rocket"]'),
    ).toBeInTheDocument();
    expect(
      defaultAction.querySelector('[data-name="lucide/arrow-right"]'),
    ).toHaveAttribute("data-size", "20");
    expect(
      defaultAction.querySelector('[data-name="lucide/arrow-right"]'),
    ).toHaveClass(
      "ml-2",
      "transition-transform",
      "group-hover:translate-x-1",
    );
    expect(
      container.querySelector(
        'a[href="/custom"] [data-name="lucide/external-link"]',
      ),
    ).toBeInTheDocument();
    expect(defaultAction).not.toHaveTextContent("lucide/rocket");
    expect(
      container.querySelector('a[href="/custom"]')!,
    ).not.toHaveTextContent("lucide/external-link");
  });

  it("preserves custom and falsy icons and lets children replace composition", () => {
    const { container, rerender } = render(
      <CtaImageOverlayArrow
        actions={[
          {
            label: "Custom",
            icon: <span data-testid="custom-leading-icon" />,
            iconAfter: <span data-testid="custom-trailing-icon" />,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-trailing-icon")).toBeInTheDocument();

    rerender(
      <CtaImageOverlayArrow
        actions={[
          {
            label: "Empty",
            href: "/empty",
            icon: "",
            iconAfter: "",
          },
          {
            label: "Falsy",
            href: "/falsy",
            icon: false,
            iconAfter: 0,
          },
        ]}
      />,
    );

    const emptyAction = container.querySelector('a[href="/empty"]')!;
    const falsyAction = container.querySelector('a[href="/falsy"]')!;
    expect(
      emptyAction.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
    expect(falsyAction).toHaveTextContent("Falsy0");
    expect(
      falsyAction.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();

    rerender(
      <CtaImageOverlayArrow
        actions={[
          {
            label: "Generated Label",
            href: "/children",
            icon: "lucide/rocket",
            children: <span data-testid="action-children">Replacement</span>,
          },
        ]}
      />,
    );

    const childAction = container.querySelector('a[href="/children"]')!;
    expect(screen.getByTestId("action-children")).toBeInTheDocument();
    expect(screen.queryByText("Generated Label")).not.toBeInTheDocument();
    expect(
      childAction.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
  });

  it("keeps the background image boundary and action slot override", () => {
    const { container } = render(
      <CtaImageOverlayArrow
        backgroundImage="/overlay.jpg"
        actions={[{ label: "Hidden Action" }]}
        actionsSlot={<div data-testid="actions-slot">Actions Slot</div>}
      />,
    );

    expect(
      container.querySelector('[style*="overlay.jpg"]'),
    ).toBeInTheDocument();
    expect(screen.getByTestId("actions-slot")).toBeInTheDocument();
    expect(screen.queryByText("Hidden Action")).not.toBeInTheDocument();
    expect(
      container.querySelector('[data-name="/overlay.jpg"]'),
    ).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaImageOverlayArrow className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
