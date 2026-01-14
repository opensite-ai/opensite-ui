import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FooterSocialNewsletter } from "../footer-social-newsletter";

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

describe("FooterSocialNewsletter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with provided props", () => {
    render(<FooterSocialNewsletter newsletterLabel="Test Newsletter Label" />);
    expect(screen.getByText("Test Newsletter Label")).toBeInTheDocument();
  });

  it("renders custom newsletter label", () => {
    render(<FooterSocialNewsletter newsletterLabel="Join our list" />);
    expect(screen.getByText("Join our list")).toBeInTheDocument();
  });

  it("renders custom newsletter button text", () => {
    render(<FooterSocialNewsletter newsletterButtonText="Sign Up" />);
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  it("renders sections when provided", () => {
    const sections = [
      { title: "Products", links: [{ name: "Feature 1", href: "/feature1" }] },
    ];
    render(<FooterSocialNewsletter sections={sections} />);
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FooterSocialNewsletter className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
