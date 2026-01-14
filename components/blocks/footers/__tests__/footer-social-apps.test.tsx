import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FooterSocialApps } from "../footer-social-apps";

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

describe("FooterSocialApps", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<FooterSocialApps />);
    expect(screen.getByText("Follow Us")).toBeInTheDocument();
    expect(screen.getByText("Mobile App")).toBeInTheDocument();
  });

  it("renders custom social label", () => {
    render(<FooterSocialApps socialLabel="Connect With Us" />);
    expect(screen.getByText("Connect With Us")).toBeInTheDocument();
  });

  it("renders custom app label", () => {
    render(<FooterSocialApps appLabel="Download App" />);
    expect(screen.getByText("Download App")).toBeInTheDocument();
  });

  it("renders sections when provided", () => {
    const sections = [
      { title: "Products", links: [{ name: "Feature 1", href: "/feature1" }] },
    ];
    render(<FooterSocialApps sections={sections} />);
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FooterSocialApps className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
