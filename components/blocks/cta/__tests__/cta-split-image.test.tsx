import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaSplitImage } from "../cta-split-image";

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
  DynamicIcon: ({ name }: { name?: React.ReactNode | string }) =>
    typeof name === "string" ? (
      <span data-testid="mock-icon" data-name={name}>
        icon
      </span>
    ) : (
      <>{name}</>
    ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("CtaSplitImage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<CtaSplitImage heading="Test Heading" description="Test Description" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaSplitImage heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaSplitImage description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/start", variant: "default" as const },
      { label: "Learn More", href: "/learn", variant: "outline" as const },
    ];
    render(<CtaSplitImage actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("renders string and custom action icons through DynamicIcon", () => {
    const { container } = render(
      <CtaSplitImage
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

  it("preserves empty, false, zero, and children action semantics", () => {
    const { container, rerender } = render(
      <CtaSplitImage
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
      <CtaSplitImage
        actions={[
          {
            label: "Generated Label",
            href: "/children",
            icon: "lucide/rocket",
            iconAfter: "lucide/send",
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
    expect(childrenAction).not.toHaveTextContent("lucide/send");
  });

  it("preserves the actions slot override", () => {
    render(
      <CtaSplitImage
        actions={[{ label: "Generated Action" }]}
        actionsSlot={<span>Custom Actions</span>}
      />,
    );

    expect(screen.getByText("Custom Actions")).toBeInTheDocument();
    expect(screen.queryByText("Generated Action")).not.toBeInTheDocument();
  });

  it("renders image with correct alt text", () => {
    render(<CtaSplitImage imageSrc="/test-image.jpg" imageAlt="Custom alt text" />);
    expect(screen.getByAltText("Custom alt text")).toHaveAttribute(
      "src",
      "/test-image.jpg",
    );
  });

  it("applies custom className", () => {
    const { container } = render(<CtaSplitImage className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
