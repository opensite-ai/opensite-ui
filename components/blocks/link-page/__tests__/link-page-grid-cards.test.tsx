import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LinkPageGridCards } from "../link-page-grid-cards";

vi.mock("@page-speed/img", () => ({
  Img: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href?: string;
    className?: string;
  }) => (
    <a href={href} className={className} data-testid="mock-pressable">
      {children}
    </a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>
      icon
    </span>
  ),
}));

vi.mock("../../../ui/social-link-icon", () => ({
  SocialLinkIcon: ({
    href,
    label,
    className,
  }: {
    href: string;
    label?: string;
    className?: string;
  }) => (
    <a
      href={href}
      aria-label={label}
      className={className}
      data-testid="mock-social-link"
    >
      social
    </a>
  ),
}));

describe("LinkPageGridCards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders links as cards", () => {
    const links = [
      {
        id: "1",
        label: "Portfolio",
        href: "https://example.com",
        description: "View work",
      },
      { id: "2", label: "Blog", href: "https://example.com/blog" },
    ];
    render(<LinkPageGridCards name="Test" links={links} />);
    expect(screen.getByText("Portfolio")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("View work")).toBeInTheDocument();
  });

  it("renders avatars with responsive containment", () => {
    render(<LinkPageGridCards name="Test" avatarUrl="/logo-wide.png" />);

    expect(screen.getByAltText("Test")).toHaveClass(
      "h-auto",
      "max-h-20",
      "w-auto",
      "max-w-full",
      "object-contain",
      "sm:max-h-24",
    );
  });
});
