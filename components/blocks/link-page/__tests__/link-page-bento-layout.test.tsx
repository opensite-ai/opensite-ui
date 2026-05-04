import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LinkPageBentoLayout } from "../link-page-bento-layout";

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

describe("LinkPageBentoLayout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders featured links in larger cells", () => {
    const links = [
      {
        id: "1",
        label: "Featured Link",
        href: "https://example.com",
        featured: true,
      },
      { id: "2", label: "Regular Link", href: "https://example.com/regular" },
    ];
    render(<LinkPageBentoLayout name="Test" links={links} />);
    expect(screen.getByText("Featured Link")).toBeInTheDocument();
    expect(screen.getByText("Regular Link")).toBeInTheDocument();
  });

  it("renders link descriptions when provided", () => {
    const links = [
      {
        id: "1",
        label: "Video",
        href: "https://example.com",
        featured: true,
        description: "Watch now",
      },
    ];
    render(<LinkPageBentoLayout name="Test" links={links} />);
    expect(screen.getByText("Watch now")).toBeInTheDocument();
  });

  it("renders avatars with responsive containment", () => {
    render(<LinkPageBentoLayout name="Test" avatarUrl="/logo-wide.png" />);

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
