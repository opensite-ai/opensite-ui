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

  it("renders with default props", () => {
    render(<BannerSocialFollow />);
    expect(screen.getByText(/Follow us on social media/)).toBeInTheDocument();
    expect(screen.getByText("Follow Us")).toBeInTheDocument();
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

  it("applies custom className", () => {
    const { container } = render(<BannerSocialFollow className="custom-class" />);
    const banner = container.firstChild as HTMLElement;
    expect(banner).toHaveClass("custom-class");
  });

  it("has gradient background", () => {
    const { container } = render(<BannerSocialFollow />);
    const banner = container.firstChild as HTMLElement;
    expect(banner).toHaveClass("bg-gradient-to-r");
    expect(banner).toHaveClass("from-pink-500");
    expect(banner).toHaveClass("to-rose-500");
  });

  it("calls onDismiss when dismiss button is clicked", () => {
    const onDismiss = vi.fn();
    render(<BannerSocialFollow onDismiss={onDismiss} />);
    const dismissButtons = screen.getAllByTestId("mock-pressable");
    const dismissButton = dismissButtons[dismissButtons.length - 1];
    fireEvent.click(dismissButton);
    expect(onDismiss).toHaveBeenCalled();
  });

  it("renders users icon", () => {
    render(<BannerSocialFollow />);
    const icons = screen.getAllByTestId("mock-icon");
    const usersIcon = icons.find(icon => icon.getAttribute("data-name") === "mynaui/users");
    expect(usersIcon).toBeInTheDocument();
  });
});
