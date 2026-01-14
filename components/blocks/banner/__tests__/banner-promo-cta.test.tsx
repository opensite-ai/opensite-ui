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
});
