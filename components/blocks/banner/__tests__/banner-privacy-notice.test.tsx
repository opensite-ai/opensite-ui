import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BannerPrivacyNotice } from "../banner-privacy-notice";

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

describe("BannerPrivacyNotice", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with custom props", () => {
    render(
      <BannerPrivacyNotice
        title="New Privacy Terms"
        description="Please review our updated terms."
        actions={[{ label: "View Terms", href: "#", variant: "link" }]}
      />
    );
    expect(screen.getByText("New Privacy Terms")).toBeInTheDocument();
    expect(screen.getByText("Please review our updated terms.")).toBeInTheDocument();
  });
});
