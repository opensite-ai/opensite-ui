import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaBackgroundIconBadge } from "../cta-background-icon-badge";

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../ui/badge", () => ({
  Badge: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span className={className} data-testid="mock-badge">{children}</span>
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

describe("CtaBackgroundIconBadge", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<CtaBackgroundIconBadge heading="Test Heading" badgeText="Test Badge" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaBackgroundIconBadge heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom badge text", () => {
    render(<CtaBackgroundIconBadge badgeText="Speed" />);
    expect(screen.getByText("Speed")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/start", variant: "secondary" as const },
      { label: "Learn More", href: "/learn", variant: "outline" as const },
    ];
    render(<CtaBackgroundIconBadge actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("renders badge icon", () => {
    render(<CtaBackgroundIconBadge badgeIconName="lucide/zap" />);
    expect(screen.getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "lucide/zap",
    );
  });

  it("renders a badge icon name through DynamicIcon and overrides the legacy name", () => {
    render(
      <CtaBackgroundIconBadge
        badgeIcon="lucide/sparkles"
        badgeIconName="lucide/zap"
        badgeText="Faster"
      />,
    );

    expect(screen.getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "lucide/sparkles",
    );
    expect(screen.getByTestId("mock-icon")).toHaveAttribute("data-size", "28");
    expect(screen.getByTestId("mock-icon")).toHaveClass("h-full");
    expect(screen.queryByText("lucide/sparkles")).not.toBeInTheDocument();
  });

  it("preserves a custom badge icon element", () => {
    render(
      <CtaBackgroundIconBadge
        badgeIcon={<span data-testid="custom-badge-icon">custom badge icon</span>}
        badgeText="Faster"
      />,
    );

    expect(screen.getByTestId("custom-badge-icon")).toHaveTextContent(
      "custom badge icon",
    );
  });

  it("preserves an empty custom badge icon as an override of the legacy name", () => {
    render(
      <CtaBackgroundIconBadge
        badgeIcon=""
        badgeIconName="lucide/zap"
        badgeText="Faster"
      />,
    );

    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("keeps an empty legacy badge icon name from rendering an icon", () => {
    render(
      <CtaBackgroundIconBadge badgeIconName="" badgeText="Faster" />,
    );

    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("renders action icon names through DynamicIcon without exposing raw text", () => {
    render(
      <CtaBackgroundIconBadge
        actions={[
          {
            label: "Explore",
            icon: "lucide/arrow-left",
            iconAfter: "lucide/arrow-right",
          },
        ]}
      />,
    );

    expect(
      screen
        .getAllByTestId("mock-icon")
        .map((icon) => icon.getAttribute("data-name")),
    ).toEqual(["lucide/arrow-left", "lucide/arrow-right"]);
    expect(screen.queryByText("lucide/arrow-left")).not.toBeInTheDocument();
    expect(screen.queryByText("lucide/arrow-right")).not.toBeInTheDocument();
  });

  it("preserves custom action icon elements", () => {
    render(
      <CtaBackgroundIconBadge
        actions={[
          {
            label: "Explore",
            icon: <span data-testid="custom-leading-icon">leading</span>,
            iconAfter: <span data-testid="custom-trailing-icon">trailing</span>,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("custom-leading-icon")).toHaveTextContent(
      "leading",
    );
    expect(screen.getByTestId("custom-trailing-icon")).toHaveTextContent(
      "trailing",
    );
  });

  it("lets action children replace generated icon and label content", () => {
    render(
      <CtaBackgroundIconBadge
        actions={[
          {
            label: "Generated label",
            icon: "lucide/arrow-left",
            iconAfter: "lucide/arrow-right",
            children: <span>Custom action content</span>,
          },
        ]}
      />,
    );

    expect(screen.getByText("Custom action content")).toBeInTheDocument();
    expect(screen.queryByText("Generated label")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("renders actionsSlot instead of generated actions", () => {
    render(
      <CtaBackgroundIconBadge
        actions={[{ label: "Generated action" }]}
        actionsSlot={<span>Custom actions slot</span>}
      />,
    );

    expect(screen.getByText("Custom actions slot")).toBeInTheDocument();
    expect(screen.queryByText("Generated action")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaBackgroundIconBadge className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
