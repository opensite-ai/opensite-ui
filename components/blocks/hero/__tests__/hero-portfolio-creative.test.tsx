import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroPortfolioCreative } from "../hero-portfolio-creative";

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

describe("HeroPortfolioCreative", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<HeroPortfolioCreative heading="Test Heading" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroPortfolioCreative heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroPortfolioCreative description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [{ label: "Get Started", href: "/start", variant: "default" as const }];
    render(<HeroPortfolioCreative actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("renders action icon names through DynamicIcon without exposing raw text", () => {
    render(
      <HeroPortfolioCreative
        actions={[
          {
            label: "Get Started",
            icon: "lucide/briefcase",
            iconAfter: "lucide/arrow-right",
          },
        ]}
      />,
    );

    expect(
      screen.getByTestId("mock-icon-lucide/briefcase"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/arrow-right"),
    ).toBeInTheDocument();
    expect(screen.queryByText("lucide/briefcase")).not.toBeInTheDocument();
    expect(screen.queryByText("lucide/arrow-right")).not.toBeInTheDocument();
  });

  it("preserves custom action icon elements", () => {
    render(
      <HeroPortfolioCreative
        actions={[
          {
            label: "Get Started",
            icon: <span data-testid="custom-leading-icon" />,
            iconAfter: <span data-testid="custom-trailing-icon" />,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-trailing-icon")).toBeInTheDocument();
  });

  it("preserves social icon override and legacy fallback precedence", () => {
    render(
      <HeroPortfolioCreative
        socialLinks={[
          {
            href: "/override",
            icon: "lucide/social-override",
            iconName: "lucide/legacy-social",
          },
          {
            href: "/fallback",
            iconName: "lucide/social-fallback",
          },
        ]}
      />,
    );

    expect(
      screen.getByTestId("mock-icon-lucide/social-override"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/social-fallback"),
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/legacy-social"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("lucide/social-override"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("lucide/social-fallback"),
    ).not.toBeInTheDocument();
  });

  it("preserves a custom social icon ahead of the legacy fallback", () => {
    render(
      <HeroPortfolioCreative
        socialLinks={[
          {
            href: "/custom",
            icon: <span data-testid="custom-social-icon" />,
            iconName: "lucide/legacy-custom-social",
          },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-social-icon")).toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/legacy-custom-social"),
    ).not.toBeInTheDocument();
  });

  it("does not render an empty legacy social icon name", () => {
    render(
      <HeroPortfolioCreative
        socialLinks={[
          {
            href: "/empty",
            iconName: "",
          },
        ]}
      />,
    );

    expect(screen.queryByTestId("mock-icon-")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroPortfolioCreative heading="Test Heading" className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
