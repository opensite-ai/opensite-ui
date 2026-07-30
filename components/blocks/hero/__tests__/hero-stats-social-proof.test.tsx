import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroStatsSocialProof } from "../hero-stats-social-proof";

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

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
  avatarPlaceholders: Array(20).fill("https://placeholder.com/avatar.jpg"),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name }: { name?: React.ReactNode }) =>
    typeof name === "string" ? (
      <span data-testid={`mock-icon-${name}`} />
    ) : (
      <>{name}</>
    ),
}));

describe("HeroStatsSocialProof", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<HeroStatsSocialProof heading="Test Heading" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroStatsSocialProof heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroStatsSocialProof description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders badge icon names through DynamicIcon", () => {
    render(
      <HeroStatsSocialProof badge="Featured" badgeIcon="lucide/shield" />,
    );

    expect(screen.getByTestId("mock-icon-lucide/shield")).toBeInTheDocument();
    expect(screen.queryByText("lucide/shield")).not.toBeInTheDocument();
  });

  it("preserves custom badge icon elements", () => {
    render(
      <HeroStatsSocialProof
        badge="Featured"
        badgeIcon={<span data-testid="custom-badge-icon" />}
      />,
    );

    expect(screen.getByTestId("custom-badge-icon")).toBeInTheDocument();
  });

  it("preserves empty, false, and zero badge icon behavior", () => {
    const { container, rerender } = render(
      <HeroStatsSocialProof badge="Featured" badgeIcon="" />,
    );

    expect(screen.queryByTestId("mock-icon-")).not.toBeInTheDocument();

    rerender(<HeroStatsSocialProof badge="Featured" badgeIcon={false} />);

    expect(screen.queryByTestId("mock-icon-")).not.toBeInTheDocument();

    rerender(<HeroStatsSocialProof badge="Featured" badgeIcon={0} />);

    expect(screen.queryByTestId("mock-icon-")).not.toBeInTheDocument();
    expect(container.textContent).toMatch(/0\s*Featured/);
  });

  it("renders actions when provided", () => {
    const actions = [{ label: "Get Started", href: "/start", variant: "default" as const }];
    render(<HeroStatsSocialProof actions={actions} />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroStatsSocialProof heading="Test Heading" className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
