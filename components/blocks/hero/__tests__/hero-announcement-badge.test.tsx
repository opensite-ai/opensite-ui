import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroAnnouncementBadge } from "../hero-announcement-badge";

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

describe("HeroAnnouncementBadge", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<HeroAnnouncementBadge heading="Test Heading" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders custom badge", () => {
    render(<HeroAnnouncementBadge badge="Custom Badge Text" />);
    expect(screen.getByText("Custom Badge Text")).toBeInTheDocument();
  });

  it("renders a badge icon name through DynamicIcon without exposing raw text", () => {
    render(
      <HeroAnnouncementBadge
        badge="Secure"
        badgeIcon="lucide/shield-check"
      />,
    );

    expect(screen.getByTestId("mock-icon")).toHaveAttribute(
      "data-name",
      "lucide/shield-check",
    );
    expect(screen.queryByText("lucide/shield-check")).not.toBeInTheDocument();
  });

  it("preserves a custom badge icon element", () => {
    render(
      <HeroAnnouncementBadge
        badge="Secure"
        badgeIcon={<span data-testid="custom-badge-icon">custom icon</span>}
      />,
    );

    expect(screen.getByTestId("custom-badge-icon")).toHaveTextContent(
      "custom icon",
    );
  });

  it("preserves empty, false, and zero badge icon behavior", () => {
    const { container, rerender } = render(
      <HeroAnnouncementBadge badge="Secure" badgeIcon="" />,
    );

    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();

    rerender(<HeroAnnouncementBadge badge="Secure" badgeIcon={false} />);

    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();

    rerender(<HeroAnnouncementBadge badge="Secure" badgeIcon={0} />);

    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
    expect(container.textContent).toMatch(/0\s*Secure/);
  });

  it("renders custom heading", () => {
    render(<HeroAnnouncementBadge heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroAnnouncementBadge description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Get Started", href: "/start", variant: "default" as const },
      { label: "Learn More", href: "/learn", variant: "outline" as const },
    ];
    render(<HeroAnnouncementBadge actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("renders actionsSlot when provided", () => {
    render(<HeroAnnouncementBadge actionsSlot={<button>Custom Action</button>} />);
    expect(screen.getByText("Custom Action")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroAnnouncementBadge heading="Test Heading" className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
