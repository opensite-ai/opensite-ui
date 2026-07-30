import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaSplitImageLogos } from "../cta-split-image-logos";

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
    size,
    className,
  }: {
    name?: React.ReactNode | string;
    size?: number;
    className?: string;
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
  logoPlaceholders: Array(20).fill("https://placeholder.com/logo.jpg"),
}));

describe("CtaSplitImageLogos", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<CtaSplitImageLogos heading="Test Heading" description="Test Description" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaSplitImageLogos heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaSplitImageLogos description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/start", variant: "default" as const },
      { label: "Learn More", href: "/learn", variant: "outline" as const },
    ];
    render(<CtaSplitImageLogos actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("renders string and custom action icons through DynamicIcon", () => {
    const { container } = render(
      <CtaSplitImageLogos
        actions={[
          {
            label: "String Icons",
            href: "/string-icons",
            icon: "lucide/rocket",
            iconAfter: "lucide/send",
          },
          {
            label: "Custom Icons",
            icon: <span data-testid="custom-leading-icon">leading</span>,
            iconAfter: <span data-testid="custom-trailing-icon">trailing</span>,
          },
        ]}
      />,
    );

    expect(
      screen.getAllByTestId("mock-icon").map((icon) =>
        icon.getAttribute("data-name"),
      ),
    ).toEqual(["lucide/rocket", "lucide/send"]);
    const stringAction = container.querySelector('a[href="/string-icons"]');
    expect(stringAction).not.toHaveTextContent("lucide/rocket");
    expect(stringAction).not.toHaveTextContent("lucide/send");
    expect(screen.getByTestId("custom-leading-icon")).toHaveTextContent(
      "leading",
    );
    expect(screen.getByTestId("custom-trailing-icon")).toHaveTextContent(
      "trailing",
    );
  });

  it("preserves edge values, the first-action fallback, and children", () => {
    const { container, rerender } = render(
      <CtaSplitImageLogos
        actions={[
          {
            label: "Empty Icons",
            href: "/empty",
            icon: "",
            iconAfter: "",
          },
          {
            label: "Falsy Icons",
            href: "/falsy",
            icon: false,
            iconAfter: 0,
          },
        ]}
      />,
    );

    expect(
      container.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
    expect(container.querySelector('a[href="/empty"]')).toHaveTextContent(
      "Empty Icons",
    );
    expect(container.querySelector('a[href="/falsy"]')).toHaveTextContent(
      "Falsy Icons0",
    );

    rerender(
      <CtaSplitImageLogos
        actions={[{ label: "Default Arrow", href: "/default" }]}
      />,
    );
    const fallback = screen.getByTestId("mock-icon");
    expect(fallback).toHaveAttribute("data-name", "lucide/arrow-right");
    expect(fallback).toHaveAttribute("data-size", "16");
    expect(fallback).toHaveClass("ml-2");

    rerender(
      <CtaSplitImageLogos
        actions={[
          {
            label: "Generated Label",
            href: "/children",
            icon: "lucide/rocket",
            children: (
              <span data-testid="custom-action-content">Custom Action</span>
            ),
          },
        ]}
      />,
    );
    expect(screen.getByTestId("custom-action-content")).toHaveTextContent(
      "Custom Action",
    );
    expect(screen.queryByText("Generated Label")).not.toBeInTheDocument();
    expect(
      container
        .querySelector('a[href="/children"]')
        ?.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
    const childrenAction = container.querySelector('a[href="/children"]');
    expect(childrenAction).not.toHaveTextContent("lucide/rocket");
    expect(childrenAction).not.toHaveTextContent("lucide/arrow-right");
  });

  it("preserves action and logo slot overrides", () => {
    render(
      <CtaSplitImageLogos
        actions={[{ label: "Generated Action" }]}
        actionsSlot={<span>Custom Actions</span>}
        logos={["/generated-logo.png"]}
        logosSlot={<span>Custom Logos</span>}
      />,
    );

    expect(screen.getByText("Custom Actions")).toBeInTheDocument();
    expect(screen.getByText("Custom Logos")).toBeInTheDocument();
    expect(screen.queryByText("Generated Action")).not.toBeInTheDocument();
    expect(screen.queryByAltText("Company logo 1")).not.toBeInTheDocument();
  });

  it("renders logos when provided", () => {
    const logos = ["/logo1.png", "/logo2.png"];
    render(<CtaSplitImageLogos logos={logos} logosLabel="Trusted by leading companies" />);
    expect(screen.getByText("Trusted by leading companies")).toBeInTheDocument();
    const logoImages = screen.getAllByTestId("mock-img");
    expect(logoImages.length).toBeGreaterThanOrEqual(2);
    expect(screen.getByAltText("Company logo 1")).toHaveAttribute(
      "src",
      "/logo1.png",
    );
    expect(screen.getByAltText("Company logo 2")).toHaveAttribute(
      "src",
      "/logo2.png",
    );
  });

  it("applies custom className", () => {
    const { container } = render(<CtaSplitImageLogos className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
