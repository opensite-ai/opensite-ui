import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FooterCtaBanner } from "../footer-cta-banner";

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

describe("FooterCtaBanner", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<FooterCtaBanner />);
    expect(screen.getByText("Ready to get started?")).toBeInTheDocument();
    expect(screen.getByText("Subscribe to our newsletter")).toBeInTheDocument();
  });

  it("renders custom CTA heading", () => {
    render(<FooterCtaBanner ctaHeading="Custom CTA Heading" />);
    expect(screen.getByText("Custom CTA Heading")).toBeInTheDocument();
  });

  it("renders custom CTA description", () => {
    render(<FooterCtaBanner ctaDescription="Custom CTA description" />);
    expect(screen.getByText("Custom CTA description")).toBeInTheDocument();
  });

  it("renders custom CTA button text", () => {
    render(<FooterCtaBanner ctaButtonText="Start Now" />);
    expect(screen.getByText("Start Now")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FooterCtaBanner className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
