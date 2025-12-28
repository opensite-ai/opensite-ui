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

  it("renders badge component", () => {
    render(<HeroAnnouncementBadge />);
    expect(screen.getByTestId("mock-badge")).toBeInTheDocument();
  });

  it("renders CTA buttons", () => {
    render(<HeroAnnouncementBadge />);
    expect(screen.getByText("Get a demo")).toBeInTheDocument();
    expect(screen.getByText("Watch video")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroAnnouncementBadge className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<HeroAnnouncementBadge />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-32");
  });
});
