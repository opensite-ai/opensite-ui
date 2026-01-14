import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FooterNewsletterMinimal } from "../footer-newsletter-minimal";

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

describe("FooterNewsletterMinimal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<FooterNewsletterMinimal heading="Test Heading" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<FooterNewsletterMinimal heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom support email", () => {
    render(<FooterNewsletterMinimal supportEmail="test@example.com" />);
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("renders custom brand text", () => {
    render(<FooterNewsletterMinimal brandText="CUSTOM BRAND" />);
    expect(screen.getByText("CUSTOM BRAND")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FooterNewsletterMinimal className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
