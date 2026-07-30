import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroFeatureCardsGrid } from "../hero-feature-cards-grid";

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
      />
    ) : (
      <>{name}</>
    ),
}));

describe("HeroFeatureCardsGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<HeroFeatureCardsGrid heading="Test Heading" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroFeatureCardsGrid heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroFeatureCardsGrid description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [{ label: "Get Started", href: "/start", variant: "default" as const }];
    render(<HeroFeatureCardsGrid actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("renders custom, named, and default feature icons dynamically", () => {
    render(
      <HeroFeatureCardsGrid
        features={[
          {
            title: "String feature",
            icon: "lucide/sparkles",
            iconName: "lucide/ignored",
          },
          {
            title: "Custom feature",
            icon: <span data-testid="custom-feature-icon" />,
            iconName: "lucide/ignored",
          },
          { title: "Named feature", iconName: "lucide/star" },
          { title: "Default feature" },
        ]}
      />,
    );

    expect(
      screen
        .getAllByTestId("mock-icon")
        .map((icon) => icon.getAttribute("data-name")),
    ).toEqual(["lucide/sparkles", "lucide/star", "lucide/check"]);
    expect(
      screen.getByText("String feature").parentElement,
    ).not.toHaveTextContent("lucide/sparkles");
    expect(screen.getByTestId("custom-feature-icon")).toBeInTheDocument();
  });

  it("suppresses empty and false custom icons while preserving zero", () => {
    render(
      <HeroFeatureCardsGrid
        features={[
          { title: "Empty feature", icon: "", iconName: "lucide/ignored" },
          { title: "False feature", icon: false, iconName: "lucide/ignored" },
          { title: "Zero feature", icon: 0, iconName: "lucide/ignored" },
        ]}
      />,
    );

    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
    expect(screen.getByText("Empty feature").parentElement).toHaveTextContent(
      "Empty feature",
    );
    expect(screen.getByText("False feature").parentElement).toHaveTextContent(
      "False feature",
    );
    expect(screen.getByText("Zero feature").parentElement).toHaveTextContent(
      "0Zero feature",
    );
  });

  it("applies custom className", () => {
    const { container } = render(<HeroFeatureCardsGrid heading="Test Heading" className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
