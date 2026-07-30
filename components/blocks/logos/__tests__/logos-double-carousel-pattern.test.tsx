import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { LogosDoubleCarouselPattern } from "../logos-double-carousel-pattern";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    size,
    className,
  }: {
    name?: React.ReactNode | string;
    size?: number;
    className?: string;
  }) =>
    typeof name === "string" ? (
      <span
        data-testid="mock-dynamic-icon"
        data-name={name}
        data-size={size}
        className={className}
      />
    ) : (
      <>{name}</>
    ),
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className, variant }: { children: React.ReactNode; href?: string; className?: string; variant?: string }) => (
    <a href={href} className={className} data-variant={variant} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("embla-carousel-auto-scroll", () => ({
  default: () => ({}),
}));

vi.mock("../../../ui/carousel", () => ({
  Carousel: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel">{children}</div>,
  CarouselContent: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-content">{children}</div>,
  CarouselItem: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-item">{children}</div>,
}));

vi.mock("../../../lib/patternSvgs", () => ({
  patternSvgs: { dots: "data:image/svg+xml,..." },
}));

describe("LogosDoubleCarouselPattern", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title and description", () => {
    render(
      <LogosDoubleCarouselPattern
        title="Custom Title"
        description="Custom Description"
      />
    );
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom Description")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(
      <LogosDoubleCarouselPattern
        actions={[
          { label: "Start Now", href: "#", variant: "default" },
          { label: "Read More", href: "#", variant: "outline" },
        ]}
      />
    );
    expect(screen.getByText("Start Now")).toBeInTheDocument();
    expect(screen.getByText("Read More")).toBeInTheDocument();
  });

  it("routes action icon names while preserving existing action composition", () => {
    const { container } = render(
      <LogosDoubleCarouselPattern
        actions={[
          {
            label: "String action",
            href: "/string",
            icon: "lucide/award",
            iconAfter: "lucide/arrow-right",
            className: "custom-action",
          },
          {
            label: "Custom action",
            href: "/custom",
            icon: <span data-testid="custom-leading-icon" />,
            iconAfter: <span data-testid="custom-trailing-icon" />,
          },
          {
            label: "Sentinel action",
            href: "/sentinel",
            icon: 0,
            iconAfter: false,
          },
          {
            label: "Empty action",
            href: "/empty",
            icon: "",
            iconAfter: "",
          },
          {
            label: "Children stay ignored",
            href: "/children",
            icon: "lucide/check",
            children: <span data-testid="ignored-action-children" />,
          },
        ]}
      />,
    );

    const stringAction = container.querySelector(
      '[href="/string"]',
    ) as HTMLElement;
    expect(
      within(stringAction).getAllByTestId("mock-dynamic-icon").map((icon) =>
        icon.getAttribute("data-name"),
      ),
    ).toEqual(["lucide/award", "lucide/arrow-right"]);
    expect(stringAction).not.toHaveTextContent("lucide/award");
    expect(stringAction).not.toHaveTextContent("lucide/arrow-right");
    expect(stringAction).toHaveClass("custom-action");

    const customAction = container.querySelector(
      '[href="/custom"]',
    ) as HTMLElement;
    expect(
      within(customAction).getByTestId("custom-leading-icon"),
    ).toBeInTheDocument();
    expect(
      within(customAction).getByTestId("custom-trailing-icon"),
    ).toBeInTheDocument();

    const sentinelAction = container.querySelector(
      '[href="/sentinel"]',
    ) as HTMLElement;
    expect(sentinelAction).toHaveTextContent("0Sentinel action");
    expect(
      within(sentinelAction).queryByTestId("mock-dynamic-icon"),
    ).not.toBeInTheDocument();

    const emptyAction = container.querySelector(
      '[href="/empty"]',
    ) as HTMLElement;
    expect(
      within(emptyAction).queryByTestId("mock-dynamic-icon"),
    ).not.toBeInTheDocument();

    const childrenAction = container.querySelector(
      '[href="/children"]',
    ) as HTMLElement;
    expect(
      within(childrenAction).queryByTestId("ignored-action-children"),
    ).not.toBeInTheDocument();
    expect(childrenAction).toHaveTextContent("Children stay ignored");
    expect(
      within(childrenAction).getByTestId("mock-dynamic-icon"),
    ).toHaveAttribute("data-name", "lucide/check");
  });
});
