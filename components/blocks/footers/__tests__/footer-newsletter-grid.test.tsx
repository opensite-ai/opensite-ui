import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FooterNewsletterGrid } from "../footer-newsletter-grid";

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

describe("FooterNewsletterGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<FooterNewsletterGrid />);
    expect(screen.getByText("Newsletter")).toBeInTheDocument();
    expect(screen.getByText("A collection of 100+ responsive HTML templates for your startup business or side project.")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<FooterNewsletterGrid description="Custom description" />);
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });

  it("renders custom newsletter title", () => {
    render(<FooterNewsletterGrid newsletterTitle="Subscribe Now" />);
    expect(screen.getByText("Subscribe Now")).toBeInTheDocument();
  });

  it("renders sections when provided", () => {
    const sections = [
      { title: "Products", links: [{ name: "Feature 1", href: "/feature1" }] },
    ];
    render(<FooterNewsletterGrid sections={sections} />);
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FooterNewsletterGrid className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
