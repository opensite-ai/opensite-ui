import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FooterBrandDescription } from "../footer-brand-description";

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

describe("FooterBrandDescription", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<FooterBrandDescription description="Test Description" />);
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<FooterBrandDescription description="Custom description" />);
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders sections when provided", () => {
    const sections = [
      { title: "Products", links: [{ name: "Feature 1", href: "/feature1" }] },
    ];
    render(<FooterBrandDescription sections={sections} />);
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
  });

  it("renders legal links when provided", () => {
    const legalLinks = [
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
    ];
    render(<FooterBrandDescription legalLinks={legalLinks} />);
    expect(screen.getByText("Privacy")).toBeInTheDocument();
    expect(screen.getByText("Terms")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FooterBrandDescription className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
