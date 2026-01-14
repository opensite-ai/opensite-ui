import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LinkPageNewsletterSocial } from "../link-page-newsletter-social";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("LinkPageNewsletterSocial", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders submit button", () => {
    render(<LinkPageNewsletterSocial name="Test" buttonText="Join Now" />);
    expect(screen.getByText("Join Now")).toBeInTheDocument();
  });

  it("renders links when provided", () => {
    const links = [
      { id: "1", label: "Website", href: "https://example.com" },
    ];
    render(<LinkPageNewsletterSocial name="Test" links={links} />);
    expect(screen.getByText("Website")).toBeInTheDocument();
  });
});
