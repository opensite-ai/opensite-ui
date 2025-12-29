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

  it("renders with default props", () => {
    const { container } = render(<LinkPageNewsletterSocial name="Test User" />);
    const wrapper = container.firstChild;
    expect(wrapper).toBeInTheDocument();
  });

  it("renders name", () => {
    render(<LinkPageNewsletterSocial name="Content Creator" />);
    expect(screen.getByText("Content Creator")).toBeInTheDocument();
  });

  it("renders bio when provided", () => {
    render(<LinkPageNewsletterSocial name="Test" bio="My bio text" />);
    expect(screen.getByText("My bio text")).toBeInTheDocument();
  });

  it("renders newsletter heading", () => {
    render(<LinkPageNewsletterSocial name="Test" newsletterHeading="Subscribe Now" />);
    expect(screen.getByText("Subscribe Now")).toBeInTheDocument();
  });

  it("renders newsletter description", () => {
    render(<LinkPageNewsletterSocial name="Test" newsletterDescription="Get updates" />);
    expect(screen.getByText("Get updates")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<LinkPageNewsletterSocial name="Test" className="custom-class" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("custom-class");
  });

  it("renders with light theme by default", () => {
    const { container } = render(<LinkPageNewsletterSocial name="Test" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("bg-linear-to-b");
  });

  it("renders with dark theme", () => {
    const { container } = render(<LinkPageNewsletterSocial name="Test" theme="dark" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("bg-neutral-950");
  });

  it("renders email input", () => {
    render(<LinkPageNewsletterSocial name="Test" emailPlaceholder="Your email" />);
    expect(screen.getByLabelText("Your email")).toBeInTheDocument();
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

  it("renders powered by footer", () => {
    render(<LinkPageNewsletterSocial name="Test" />);
    expect(screen.getByText("Powered by OpenSite")).toBeInTheDocument();
  });
});
