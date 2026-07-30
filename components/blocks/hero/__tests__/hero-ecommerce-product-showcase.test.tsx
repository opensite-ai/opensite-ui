import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroEcommerceProductShowcase } from "../hero-ecommerce-product-showcase";

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
      <span data-testid={`mock-icon-${name}`} />
    ) : (
      <>{name}</>
    ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("HeroEcommerceProductShowcase", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<HeroEcommerceProductShowcase heading="Test Heading" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroEcommerceProductShowcase heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroEcommerceProductShowcase description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [{ label: "Get Started", href: "/start", variant: "default" as const }];
    render(<HeroEcommerceProductShowcase actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("renders stat icon names through DynamicIcon without exposing raw text", () => {
    render(
      <HeroEcommerceProductShowcase
        stats={[
          {
            value: "99%",
            label: "Uptime",
            icon: "lucide/activity",
          },
        ]}
      />,
    );

    expect(screen.getByTestId("mock-icon-lucide/activity")).toBeInTheDocument();
    expect(screen.queryByText("lucide/activity")).not.toBeInTheDocument();
  });

  it("preserves custom stat icon elements", () => {
    render(
      <HeroEcommerceProductShowcase
        stats={[
          {
            value: "99%",
            label: "Uptime",
            icon: <span data-testid="custom-stat-icon" />,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-stat-icon")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroEcommerceProductShowcase heading="Test Heading" className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
