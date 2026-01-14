import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BannerGdprRights } from "../banner-gdpr-rights";

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

describe("BannerGdprRights", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with custom props", () => {
    render(
      <BannerGdprRights
        title="Data Privacy Notice"
        description="You have the right to manage your data."
        actions={[{ label: "Manage Settings", href: "#", variant: "link" }]}
      />
    );
    expect(screen.getByText("Data Privacy Notice")).toBeInTheDocument();
    expect(screen.getByText("You have the right to manage your data.")).toBeInTheDocument();
  });
});
