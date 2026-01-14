import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BannerSocialFollow } from "../banner-social-follow";

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

describe("BannerSocialFollow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with custom props", () => {
    render(
      <BannerSocialFollow
        message="Join our community!"
        actions={[{ label: "Connect Now", href: "#", variant: "secondary", size: "sm" }]}
      />
    );
    expect(screen.getByText("Join our community!")).toBeInTheDocument();
    expect(screen.getByText("Connect Now")).toBeInTheDocument();
  });
});
