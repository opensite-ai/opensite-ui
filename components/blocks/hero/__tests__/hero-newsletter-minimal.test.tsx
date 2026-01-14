import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroNewsletterMinimal } from "../hero-newsletter-minimal";

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("HeroNewsletterMinimal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<HeroNewsletterMinimal />);
    expect(screen.getByText("Stay ahead of the curve")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroNewsletterMinimal heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroNewsletterMinimal description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders submitAction when provided", () => {
    const submitAction = { label: "Subscribe", href: "/subscribe" };
    render(<HeroNewsletterMinimal submitAction={submitAction} />);
    expect(screen.getByText("Subscribe")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroNewsletterMinimal className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
