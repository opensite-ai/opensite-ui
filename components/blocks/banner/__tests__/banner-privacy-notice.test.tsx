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

  it("renders with default props", () => {
    render(<BannerPrivacyNotice />);
    expect(screen.getByText("Privacy Policy Updated")).toBeInTheDocument();
    expect(screen.getByText(/We've updated our privacy policy/)).toBeInTheDocument();
  });

  it("renders with custom props", () => {
    render(
      <BannerPrivacyNotice
        title="New Privacy Terms"
        description="Please review our updated terms."
        linkText="View Terms"
      />
    );
    expect(screen.getByText("New Privacy Terms")).toBeInTheDocument();
    expect(screen.getByText("Please review our updated terms.")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<BannerPrivacyNotice className="custom-class" />);
    const banner = container.firstChild as HTMLElement;
    expect(banner).toHaveClass("custom-class");
  });

  it("is positioned at bottom with fixed positioning", () => {
    const { container } = render(<BannerPrivacyNotice />);
    const banner = container.firstChild as HTMLElement;
    expect(banner).toHaveClass("fixed");
    expect(banner).toHaveClass("bottom-0");
  });

  it("calls onDismiss when dismiss button is clicked", () => {
    const onDismiss = vi.fn();
    render(<BannerPrivacyNotice onDismiss={onDismiss} />);
    const dismissButtons = screen.getAllByTestId("mock-pressable");
    const dismissButton = dismissButtons[dismissButtons.length - 1];
    fireEvent.click(dismissButton);
    expect(onDismiss).toHaveBeenCalled();
  });

  it("renders shield icon", () => {
    render(<BannerPrivacyNotice />);
    const icons = screen.getAllByTestId("mock-icon");
    const shieldIcon = icons.find(icon => icon.getAttribute("data-name") === "mynaui/shield");
    expect(shieldIcon).toBeInTheDocument();
  });
});
