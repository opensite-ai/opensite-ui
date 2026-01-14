import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaNewsletterFeatures } from "../cta-newsletter-features";

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

describe("CtaNewsletterFeatures", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<CtaNewsletterFeatures />);
    expect(screen.getByText("Newsletter")).toBeInTheDocument();
    expect(screen.getByText("Stay in the loop")).toBeInTheDocument();
    expect(screen.getByText("Get the latest updates, tips, and exclusive content delivered straight to your inbox. Join thousands of subscribers.")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<CtaNewsletterFeatures heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<CtaNewsletterFeatures description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom badge", () => {
    render(<CtaNewsletterFeatures badge="Custom Badge" />);
    expect(screen.getByText("Custom Badge")).toBeInTheDocument();
  });

  it("renders features when provided", () => {
    const features = [
      { iconName: "lucide/check", text: "Weekly insights" },
      { iconName: "lucide/check", text: "Exclusive content" },
    ];
    render(<CtaNewsletterFeatures features={features} />);
    expect(screen.getByText("Weekly insights")).toBeInTheDocument();
    expect(screen.getByText("Exclusive content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaNewsletterFeatures className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
