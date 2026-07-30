import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroEnterpriseSecurity } from "../hero-enterprise-security";

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
    size,
  }: {
    name?: React.ReactNode | string;
    className?: string;
    size?: number;
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
}));

describe("HeroEnterpriseSecurity", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<HeroEnterpriseSecurity heading="Test Heading" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroEnterpriseSecurity heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroEnterpriseSecurity description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [{ label: "Get Started", href: "/start", variant: "default" as const }];
    render(<HeroEnterpriseSecurity actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("renders badge and feature icon names through DynamicIcon without exposing raw text", () => {
    render(
      <HeroEnterpriseSecurity
        badge="Enterprise ready"
        badgeIcon="lucide/shield-check"
        features={[
          {
            title: "Encrypted",
            icon: "lucide/lock-keyhole",
            iconName: "lucide/check",
            iconColorClass: "text-enterprise",
          },
          { title: "Audited", iconName: "lucide/badge-check" },
          { title: "Default", iconName: "" },
        ]}
      />,
    );

    expect(
      screen.getAllByTestId("mock-icon").map((icon) =>
        icon.getAttribute("data-name"),
      ),
    ).toEqual([
      "lucide/shield-check",
      "lucide/lock-keyhole",
      "lucide/badge-check",
      "lucide/check",
    ]);
    expect(screen.queryByText("lucide/lock-keyhole")).not.toBeInTheDocument();
    expect(screen.queryByText("lucide/badge-check")).not.toBeInTheDocument();
    expect(screen.queryByText("lucide/shield-check")).not.toBeInTheDocument();
    const stringOverride = screen
      .getAllByTestId("mock-icon")
      .find(
        (icon) => icon.getAttribute("data-name") === "lucide/lock-keyhole",
      );
    expect(stringOverride).toHaveAttribute("data-size", "24");
    expect(stringOverride).toHaveClass("text-enterprise");
  });

  it("preserves custom badge and feature icon elements", () => {
    render(
      <HeroEnterpriseSecurity
        badge="Enterprise ready"
        badgeIcon={<span data-testid="custom-badge-icon">badge icon</span>}
        features={[
          {
            title: "Encrypted",
            icon: <span data-testid="custom-feature-icon">feature icon</span>,
            iconName: "lucide/check",
          },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-badge-icon")).toHaveTextContent(
      "badge icon",
    );
    expect(screen.getByTestId("custom-feature-icon")).toHaveTextContent(
      "feature icon",
    );
  });

  it("preserves empty, false, and zero badge and feature override behavior", () => {
    const { container, rerender } = render(
      <HeroEnterpriseSecurity
        badge="Enterprise ready"
        badgeIcon=""
        features={[
          {
            title: "Zero feature",
            icon: "",
            iconName: "lucide/suppressed-fallback",
          },
        ]}
      />,
    );

    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();

    rerender(
      <HeroEnterpriseSecurity
        badge="Enterprise ready"
        badgeIcon={false}
        features={[
          {
            title: "Zero feature",
            icon: false,
            iconName: "lucide/suppressed-fallback",
          },
        ]}
      />,
    );

    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();

    rerender(
      <HeroEnterpriseSecurity
        badge="Enterprise ready"
        badgeIcon={0}
        features={[
          {
            title: "Zero feature",
            icon: 0,
            iconName: "lucide/suppressed-fallback",
          },
        ]}
      />,
    );

    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
    expect(container.textContent).toMatch(/0\s*Enterprise ready/);
    expect(container.textContent).toMatch(/0\s*Zero feature/);
  });

  it("applies custom className", () => {
    const { container } = render(<HeroEnterpriseSecurity heading="Test Heading" className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
