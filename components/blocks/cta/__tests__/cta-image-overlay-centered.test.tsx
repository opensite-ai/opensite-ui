import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaImageOverlayCentered } from "../cta-image-overlay-centered";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, ...props }: React.PropsWithChildren<{ className?: string }>) => (
      <div className={className} data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">
      {children}
    </a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
  }: {
    name?: React.ReactNode | string;
  }) =>
    typeof name === "string" ? (
      <span data-testid={`mock-icon-${name}`} data-name={name} />
    ) : (
      <>{name}</>
    ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(30).fill("https://placeholder.com/image.jpg"),
}));

describe("CtaImageOverlayCentered", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<CtaImageOverlayCentered heading="Test Heading" description="Test Description" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaImageOverlayCentered heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaImageOverlayCentered description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/start", variant: "default" as const },
      { label: "Learn More", href: "/learn", variant: "outline" as const },
    ];
    render(<CtaImageOverlayCentered actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("renders leading and trailing action icon names without raw text", () => {
    render(
      <CtaImageOverlayCentered
        actions={[
          {
            label: "Launch",
            icon: "lucide/rocket",
            iconAfter: "lucide/arrow-right",
          },
        ]}
      />,
    );

    expect(screen.getByTestId("mock-icon-lucide/rocket")).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/arrow-right"),
    ).toBeInTheDocument();
    const action = screen.getByTestId("mock-icon-lucide/rocket").parentElement!;
    expect(action).not.toHaveTextContent("lucide/rocket");
    expect(action).not.toHaveTextContent("lucide/arrow-right");
  });

  it("preserves custom and falsy icons and lets children replace composition", () => {
    const { container, rerender } = render(
      <CtaImageOverlayCentered
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
      <CtaImageOverlayCentered
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
      <CtaImageOverlayCentered
        actions={[
          {
            label: "Generated Label",
            href: "/children",
            icon: "lucide/rocket",
            iconAfter: "lucide/arrow-right",
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

  it("keeps background media and lets actionsSlot override actions", () => {
    render(
      <CtaImageOverlayCentered
        backgroundImage="/background.jpg"
        backgroundAlt="Background preview"
        actions={[{ label: "Hidden Action" }]}
        actionsSlot={<div data-testid="actions-slot">Actions Slot</div>}
      />,
    );

    expect(screen.getByTestId("mock-img")).toHaveAttribute(
      "src",
      "/background.jpg",
    );
    expect(screen.getByTestId("mock-img")).toHaveAttribute(
      "alt",
      "Background preview",
    );
    expect(screen.getByTestId("actions-slot")).toBeInTheDocument();
    expect(screen.queryByText("Hidden Action")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-/background.jpg"),
    ).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaImageOverlayCentered className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
