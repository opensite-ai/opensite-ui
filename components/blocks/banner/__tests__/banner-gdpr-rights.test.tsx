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

  it("renders with default props", () => {
    render(<BannerGdprRights />);
    expect(screen.getByText("Your Privacy Rights")).toBeInTheDocument();
    expect(screen.getByText(/Under GDPR/)).toBeInTheDocument();
  });

  it("renders with custom props", () => {
    render(
      <BannerGdprRights
        title="Data Privacy Notice"
        description="You have the right to manage your data."
        linkText="Manage Settings"
      />
    );
    expect(screen.getByText("Data Privacy Notice")).toBeInTheDocument();
    expect(screen.getByText("You have the right to manage your data.")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<BannerGdprRights className="custom-class" />);
    const banner = container.firstChild as HTMLElement;
    expect(banner).toHaveClass("custom-class");
  });

  it("is positioned at bottom with fixed positioning", () => {
    const { container } = render(<BannerGdprRights />);
    const banner = container.firstChild as HTMLElement;
    expect(banner).toHaveClass("fixed");
    expect(banner).toHaveClass("bottom-0");
  });

  it("calls onDismiss when dismiss button is clicked", () => {
    const onDismiss = vi.fn();
    render(<BannerGdprRights onDismiss={onDismiss} />);
    const dismissButtons = screen.getAllByTestId("mock-pressable");
    const dismissButton = dismissButtons[dismissButtons.length - 1];
    fireEvent.click(dismissButton);
    expect(onDismiss).toHaveBeenCalled();
  });

  it("renders globe icon", () => {
    render(<BannerGdprRights />);
    const icons = screen.getAllByTestId("mock-icon");
    const globeIcon = icons.find(icon => icon.getAttribute("data-name") === "mynaui/globe");
    expect(globeIcon).toBeInTheDocument();
  });
});
