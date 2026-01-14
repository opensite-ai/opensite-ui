import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaMinimalSeparator } from "../cta-minimal-separator";

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

describe("CtaMinimalSeparator", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<CtaMinimalSeparator />);
    expect(screen.getByText("Ready to get started? Sign up for a free trial today.")).toBeInTheDocument();
  });

  it("renders custom text", () => {
    render(<CtaMinimalSeparator text="Custom text content" />);
    expect(screen.getByText("Custom text content")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Sign Up", href: "/signup", variant: "default" as const },
    ];
    render(<CtaMinimalSeparator actions={actions} />);
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CtaMinimalSeparator className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
