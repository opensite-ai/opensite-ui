import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroSaasDashboardPreview } from "../hero-saas-dashboard-preview";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("HeroSaasDashboardPreview", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<HeroSaasDashboardPreview />);
    expect(screen.getByText("Understand your data like never before")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroSaasDashboardPreview heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<HeroSaasDashboardPreview description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders emailForm when provided", () => {
    const emailForm = { placeholder: "Enter your email", action: { label: "Get Started", href: "/start" } };
    render(<HeroSaasDashboardPreview emailForm={emailForm} />);
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroSaasDashboardPreview className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
