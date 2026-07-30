import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroPatternLogoTechStack } from "../hero-pattern-logo-tech-stack";

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
  logoPlaceholders: Array(20).fill("https://placeholder.com/logo.png"),
}));

describe("HeroPatternLogoTechStack", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<HeroPatternLogoTechStack heading="Test Heading" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroPatternLogoTechStack heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroPatternLogoTechStack description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [{ label: "Get Started", href: "/start", variant: "default" as const }];
    render(<HeroPatternLogoTechStack actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("renders action icon names through DynamicIcon without exposing raw text", () => {
    render(
      <HeroPatternLogoTechStack
        actions={[
          {
            label: "Get Started",
            icon: "lucide/code",
            iconAfter: "lucide/arrow-right",
          },
        ]}
      />,
    );

    expect(screen.getByTestId("mock-icon-lucide/code")).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-icon-lucide/arrow-right"),
    ).toBeInTheDocument();
    expect(screen.queryByText("lucide/code")).not.toBeInTheDocument();
    expect(screen.queryByText("lucide/arrow-right")).not.toBeInTheDocument();
  });

  it("preserves custom action icon elements", () => {
    render(
      <HeroPatternLogoTechStack
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

  it("preserves empty, false, zero, and children action semantics", () => {
    const { container, rerender } = render(
      <HeroPatternLogoTechStack
        actions={[
          {
            label: "Parity action",
            href: "/parity",
            icon: 0,
            iconAfter: false,
          },
        ]}
      />,
    );
    const getAction = () =>
      container.querySelector<HTMLAnchorElement>('a[href="/parity"]')!;

    expect(getAction()).toHaveTextContent("0Parity action");
    expect(
      getAction().querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();

    rerender(
      <HeroPatternLogoTechStack
        actions={[
          {
            label: "Empty action",
            href: "/parity",
            icon: "",
            iconAfter: "",
          },
        ]}
      />,
    );
    expect(getAction()).toHaveTextContent("Empty action");
    expect(
      getAction().querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();

    rerender(
      <HeroPatternLogoTechStack
        actions={[
          {
            label: "Generated label",
            href: "/parity",
            icon: "lucide/code",
            iconAfter: "lucide/arrow-right",
            children: (
              <span data-testid="custom-action-content">Custom action</span>
            ),
          },
        ]}
      />,
    );
    expect(screen.getByTestId("custom-action-content")).toHaveTextContent(
      "Custom action",
    );
    expect(screen.queryByText("Generated label")).not.toBeInTheDocument();
    expect(
      getAction().querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroPatternLogoTechStack heading="Test Heading" className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
