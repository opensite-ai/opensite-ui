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
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("HeroAnnouncementBadge", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<HeroAnnouncementBadge />);
    expect(screen.getByText("Streamline your workflow experience.")).toBeInTheDocument();
  });

  it("renders custom badge", () => {
    render(<HeroAnnouncementBadge badge="Custom Badge Text" />);
    expect(screen.getByText("Custom Badge Text")).toBeInTheDocument();
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
    const { container } = render(<HeroAnnouncementBadge className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
