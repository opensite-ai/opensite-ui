import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BannerPromoCta } from "../banner-promo-cta";

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, size }: { name: string; size?: number }) => (
    <span data-testid="mock-icon" data-name={name} data-size={size} />
  ),
}));

describe("BannerPromoCta", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<BannerPromoCta />);
    expect(screen.getByText("Winter Sale")).toBeInTheDocument();
    expect(screen.getByText("Up to 50% off")).toBeInTheDocument();
    expect(screen.getByText("Shop Now")).toBeInTheDocument();
  });

  it("renders with custom props", () => {
    render(
      <BannerPromoCta
        message="Summer Sale"
        discount="Up to 70% off"
        actions={[{ label: "Buy Now", href: "/summer-sale" }]}
      />
    );
    expect(screen.getByText("Summer Sale")).toBeInTheDocument();
    expect(screen.getByText("Up to 70% off")).toBeInTheDocument();
    expect(screen.getByText("Buy Now")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<BannerPromoCta className="custom-class" />);
    const banner = container.firstChild as HTMLElement;
    expect(banner).toHaveClass("custom-class");
  });

  it("renders with primary background", () => {
    const { container } = render(<BannerPromoCta />);
    const banner = container.firstChild as HTMLElement;
    expect(banner).toHaveClass("bg-primary");
  });
});
