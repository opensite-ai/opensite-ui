import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LinkTreeBlock } from "../link-tree-block";

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

describe("LinkTreeBlock", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders links when provided", () => {
    const links = [
      { id: "1", label: "Link 1", href: "https://example.com" },
      { id: "2", label: "Link 2", href: "https://example2.com" },
    ];
    render(<LinkTreeBlock brandName="Test" links={links} />);
    expect(screen.getByText("Link 1")).toBeInTheDocument();
    expect(screen.getByText("Link 2")).toBeInTheDocument();
  });

  it("renders brand logos with responsive containment", () => {
    render(
      <LinkTreeBlock
        brandName="Test"
        brandLogo={{ src: "/logo-wide.png", alt: "Test logo" }}
      />,
    );

    expect(screen.getByAltText("Test logo")).toHaveClass(
      "h-auto",
      "max-h-24",
      "w-auto",
      "max-w-full",
      "object-contain",
    );
  });
});
