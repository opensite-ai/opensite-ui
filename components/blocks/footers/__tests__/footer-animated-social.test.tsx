import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FooterAnimatedSocial } from "../footer-animated-social";

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

vi.mock("../../../ui/social-link-icon", () => ({
  SocialLinkIcon: ({ href, label }: { href: string; label?: string }) => (
    <a href={href} data-testid="social-link-icon" aria-label={label}>{label || "social-icon"}</a>
  ),
}));

describe("FooterAnimatedSocial", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<FooterAnimatedSocial heading="Test Heading" description="Test Description" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<FooterAnimatedSocial heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<FooterAnimatedSocial description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders CTA button with custom text", () => {
    render(<FooterAnimatedSocial ctaText="Contact Us" ctaUrl="/contact" />);
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("renders social links when provided", () => {
    const socialLinks = [
      { href: "https://twitter.com", label: "Twitter" },
      { href: "https://linkedin.com", label: "LinkedIn" },
    ];
    render(<FooterAnimatedSocial socialLinks={socialLinks} />);
    const socialLinkIcons = screen.getAllByTestId("social-link-icon");
    expect(socialLinkIcons).toHaveLength(2);
    expect(socialLinkIcons[0]).toHaveAttribute("href", "https://twitter.com");
    expect(socialLinkIcons[1]).toHaveAttribute("href", "https://linkedin.com");
  });

  it("applies custom className", () => {
    const { container } = render(<FooterAnimatedSocial className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
