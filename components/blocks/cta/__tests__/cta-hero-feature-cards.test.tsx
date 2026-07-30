import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaHeroFeatureCards } from "../cta-hero-feature-cards";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt?: string; className?: string }) => (
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

describe("CtaHeroFeatureCards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<CtaHeroFeatureCards heading="Test Heading" description="Test Description" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaHeroFeatureCards heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaHeroFeatureCards description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/start", variant: "secondary" as const },
      { label: "Learn More", href: "/learn", variant: "outline" as const },
    ];
    render(<CtaHeroFeatureCards actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("renders feature cards when provided", () => {
    const featureCards = [
      { iconName: "lucide/zap", title: "Fast", description: "Lightning fast performance" },
      { iconName: "lucide/shield", title: "Secure", description: "Enterprise security" },
    ];
    render(<CtaHeroFeatureCards featureCards={featureCards} />);
    expect(screen.getByText("Fast")).toBeInTheDocument();
    expect(screen.getByText("Lightning fast performance")).toBeInTheDocument();
    expect(screen.getByText("Secure")).toBeInTheDocument();
  });

  it("routes action and card icon names while preserving fallbacks and styles", () => {
    const { container } = render(
      <CtaHeroFeatureCards
        actions={[
          {
            label: "Primary",
            href: "/primary",
            icon: "lucide/rocket",
          },
          {
            label: "Secondary",
            href: "/secondary",
            iconAfter: "lucide/external-link",
          },
        ]}
        featureCards={[
          {
            title: "Override",
            href: "/override",
            icon: "lucide/star",
            iconName: "lucide/legacy-star",
          },
          {
            title: "Fallback",
            href: "/fallback",
            iconName: "lucide/zap",
          },
        ]}
      />,
    );

    const primary = container.querySelector('a[href="/primary"]')!;
    expect(
      primary.querySelector('[data-name="lucide/rocket"]'),
    ).toBeInTheDocument();
    expect(
      primary.querySelector('[data-name="lucide/arrow-right"]'),
    ).toHaveAttribute("data-size", "16");
    expect(
      primary.querySelector('[data-name="lucide/arrow-right"]'),
    ).toHaveClass("ml-2");
    expect(
      container.querySelector(
        'a[href="/secondary"] [data-name="lucide/external-link"]',
      ),
    ).toBeInTheDocument();
    expect(
      container.querySelector(
        'a[href="/override"] [data-name="lucide/star"]',
      ),
    ).toBeInTheDocument();
    expect(
      container.querySelector(
        'a[href="/fallback"] [data-name="lucide/zap"]',
      ),
    ).toHaveAttribute("data-size", "24");
    expect(
      container.querySelector(
        'a[href="/fallback"] [data-name="lucide/zap"]',
      ),
    ).toHaveClass("text-primary");
    expect(
      screen.queryByTestId("mock-icon-lucide/legacy-star"),
    ).not.toBeInTheDocument();
    expect(primary).not.toHaveTextContent("lucide/rocket");
    expect(
      container.querySelector('a[href="/fallback"]')!,
    ).not.toHaveTextContent("lucide/zap");
  });

  it("preserves custom and falsy values plus the card wrapper topology", () => {
    const { container, rerender } = render(
      <CtaHeroFeatureCards
        actions={[
          {
            label: "Custom Action",
            icon: <span data-testid="custom-leading-icon" />,
            iconAfter: <span data-testid="custom-trailing-icon" />,
          },
        ]}
        featureCards={[
          {
            title: "Custom Card",
            icon: <span data-testid="custom-card-icon" />,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-trailing-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-card-icon")).toBeInTheDocument();

    rerender(
      <CtaHeroFeatureCards
        actions={[
          {
            label: "Empty Action",
            href: "/empty",
            icon: "",
            iconAfter: "",
          },
          {
            label: "Falsy Action",
            href: "/falsy",
            icon: false,
            iconAfter: 0,
          },
        ]}
        featureCards={[
          {
            title: "Empty Card",
            icon: "",
            iconName: "lucide/legacy-empty",
          },
          {
            title: "False Card",
            icon: false,
            iconName: "lucide/legacy-false",
          },
          {
            title: "Zero Card",
            icon: 0,
            iconName: "lucide/legacy-zero",
          },
          {
            title: "No Wrapper",
            icon: 0,
          },
        ]}
      />,
    );

    const emptyAction = container.querySelector('a[href="/empty"]')!;
    const falsyAction = container.querySelector('a[href="/falsy"]')!;
    expect(
      emptyAction.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
    expect(falsyAction).toHaveTextContent("Falsy Action0");
    expect(
      falsyAction.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('[data-name^="lucide/legacy-"]'),
    ).not.toBeInTheDocument();
    expect(container.querySelectorAll(".h-12.w-12")).toHaveLength(3);
    expect(container).toHaveTextContent("0Zero Card");
  });

  it("lets children and slots replace generated content while keeping hero media", () => {
    const { container, rerender } = render(
      <CtaHeroFeatureCards
        heroImage="/hero.jpg"
        heroImageAlt="Hero preview"
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

    const action = container.querySelector('a[href="/children"]')!;
    expect(screen.getByTestId("action-children")).toBeInTheDocument();
    expect(screen.queryByText("Generated Label")).not.toBeInTheDocument();
    expect(
      action.querySelector('[data-testid^="mock-icon"]'),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("mock-img")).toHaveAttribute("src", "/hero.jpg");
    expect(screen.getByTestId("mock-img")).toHaveAttribute(
      "alt",
      "Hero preview",
    );

    rerender(
      <CtaHeroFeatureCards
        actions={[{ label: "Hidden Action" }]}
        actionsSlot={<div data-testid="actions-slot">Actions Slot</div>}
        featureCards={[{ title: "Hidden Card" }]}
        featureCardsSlot={<div data-testid="cards-slot">Cards Slot</div>}
      />,
    );

    expect(screen.getByTestId("actions-slot")).toBeInTheDocument();
    expect(screen.getByTestId("cards-slot")).toBeInTheDocument();
    expect(screen.queryByText("Hidden Action")).not.toBeInTheDocument();
    expect(screen.queryByText("Hidden Card")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaHeroFeatureCards className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
