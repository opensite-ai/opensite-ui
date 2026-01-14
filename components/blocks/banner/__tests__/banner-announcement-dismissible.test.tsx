import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BannerAnnouncementDismissible } from "../banner-announcement-dismissible";

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

describe("BannerAnnouncementDismissible", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with custom props", () => {
    render(
      <BannerAnnouncementDismissible
        message="New feature available!"
        actions={[{ label: "Try Now", href: "#", variant: "secondary", size: "sm" }]}
      />
    );
    expect(screen.getByText("New feature available!")).toBeInTheDocument();
    expect(screen.getByText("Try Now")).toBeInTheDocument();
  });
});
