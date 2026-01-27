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

  it("renders with provided props", () => {
    const socialLinks = [{ icon: "simple-icons/twitter", href: "/twitter", label: "Twitter" }];
    const appLinks = [{ icon: "simple-icons/android", href: "/android", label: "Android" }];
    render(<FooterSocialApps socialLabel="Test Social Label" appLabel="Test App Label" socialLinks={socialLinks} appLinks={appLinks} />);
    expect(screen.getByText("Test Social Label")).toBeInTheDocument();
    expect(screen.getByText("Test App Label")).toBeInTheDocument();
  });

  it("renders custom social label", () => {
    const socialLinks = [{ icon: "simple-icons/twitter", href: "/twitter", label: "Twitter" }];
    render(<FooterSocialApps socialLabel="Connect With Us" socialLinks={socialLinks} />);
    expect(screen.getByText("Connect With Us")).toBeInTheDocument();
  });

  it("renders custom app label", () => {
    const appLinks = [{ icon: "simple-icons/android", href: "/android", label: "Android" }];
    render(<FooterSocialApps appLabel="Download App" appLinks={appLinks} />);
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
