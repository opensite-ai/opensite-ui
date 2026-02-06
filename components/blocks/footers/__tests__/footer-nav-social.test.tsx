import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FooterNavSocial } from "../footer-nav-social";

vi.mock("../../../lib/Pressable", () => ({
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

describe("FooterNavSocial", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders sections when provided", () => {
    const sections = [
      { title: "Products", links: [{ name: "Feature 1", href: "/feature1" }] },
    ];
    render(<FooterNavSocial sections={sections} />);
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<FooterNavSocial className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
