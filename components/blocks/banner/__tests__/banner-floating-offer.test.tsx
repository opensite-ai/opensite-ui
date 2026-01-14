import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BannerFloatingOffer } from "../banner-floating-offer";

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({ children, onClick, href, className }: { children: React.ReactNode; onClick?: () => void; href?: string; className?: string }) => (
    <button onClick={onClick} data-href={href} className={className} data-testid="mock-pressable">{children}</button>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, size }: { name: string; size?: number }) => (
    <span data-testid="mock-icon" data-name={name} data-size={size} />
  ),
}));

describe("BannerFloatingOffer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with custom props", () => {
    render(
      <BannerFloatingOffer
        offerTitle="Black Friday Deal"
        offerDescription="Save 70% on all plans"
        actions={[{ label: "Claim Now", href: "#" }]}
      />
    );
    expect(screen.getByText("Black Friday Deal")).toBeInTheDocument();
    expect(screen.getByText("Save 70% on all plans")).toBeInTheDocument();
    expect(screen.getByText(/Claim Now/)).toBeInTheDocument();
  });
});
