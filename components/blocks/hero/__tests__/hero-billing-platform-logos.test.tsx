import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroBillingPlatformLogos } from "../hero-billing-platform-logos";

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
  logoPlaceholders: Array(20).fill("https://placeholder.com/logo.png"),
}));

describe("HeroBillingPlatformLogos", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<HeroBillingPlatformLogos heading="Test Heading" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroBillingPlatformLogos heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroBillingPlatformLogos description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [{ label: "Get Started", href: "/start", variant: "default" as const }];
    render(<HeroBillingPlatformLogos actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("renders action icon names in both action layouts without exposing raw text", () => {
    render(
      <HeroBillingPlatformLogos
        actions={[
          {
            label: "Get Started",
            icon: "lucide/rocket",
            iconAfter: "lucide/arrow-right",
          },
          {
            label: "Read Guide",
            icon: "lucide/book-open",
            iconAfter: "lucide/external-link",
          },
        ]}
      />,
    );

    expect(
      screen.getAllByTestId("mock-icon").map((icon) =>
        icon.getAttribute("data-name"),
      ),
    ).toEqual([
      "lucide/rocket",
      "lucide/arrow-right",
      "lucide/book-open",
      "lucide/external-link",
    ]);
    for (const iconName of [
      "lucide/rocket",
      "lucide/arrow-right",
      "lucide/book-open",
      "lucide/external-link",
    ]) {
      expect(screen.queryByText(iconName)).not.toBeInTheDocument();
    }
  });

  it("preserves custom action icon elements in both action layouts", () => {
    render(
      <HeroBillingPlatformLogos
        actions={[
          {
            label: "Get Started",
            icon: <span data-testid="primary-leading-icon">primary leading</span>,
            iconAfter: <span data-testid="primary-trailing-icon">primary trailing</span>,
          },
          {
            label: "Read Guide",
            icon: <span data-testid="guide-leading-icon">guide leading</span>,
            iconAfter: <span data-testid="guide-trailing-icon">guide trailing</span>,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("primary-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("primary-trailing-icon")).toBeInTheDocument();
    expect(screen.getByTestId("guide-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("guide-trailing-icon")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroBillingPlatformLogos heading="Test Heading" className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
