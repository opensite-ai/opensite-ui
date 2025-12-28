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

  it("renders with default props", () => {
    render(<BannerFloatingOffer />);
    expect(screen.getByText("Limited time offer")).toBeInTheDocument();
    expect(screen.getByText("Get 50% off for your first month")).toBeInTheDocument();
    expect(screen.getByText(/Get started/)).toBeInTheDocument();
  });

  it("renders with custom props", () => {
    render(
      <BannerFloatingOffer
        offerTitle="Black Friday Deal"
        offerDescription="Save 70% on all plans"
        buttonText="Claim Now"
      />
    );
    expect(screen.getByText("Black Friday Deal")).toBeInTheDocument();
    expect(screen.getByText("Save 70% on all plans")).toBeInTheDocument();
    expect(screen.getByText(/Claim Now/)).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<BannerFloatingOffer className="custom-class" />);
    const banner = container.firstChild as HTMLElement;
    expect(banner).toHaveClass("custom-class");
  });

  it("is positioned at bottom with fixed positioning", () => {
    const { container } = render(<BannerFloatingOffer />);
    const banner = container.firstChild as HTMLElement;
    expect(banner).toHaveClass("fixed");
    expect(banner).toHaveClass("bottom-0");
  });

  it("does not show dismiss button by default", () => {
    render(<BannerFloatingOffer />);
    const buttons = screen.getAllByTestId("mock-pressable");
    expect(buttons.length).toBe(1);
  });

  it("shows dismiss button when dismissible is true", () => {
    render(<BannerFloatingOffer dismissible={true} />);
    const buttons = screen.getAllByTestId("mock-pressable");
    expect(buttons.length).toBe(2);
  });

  it("calls onDismiss when dismiss button is clicked", () => {
    const onDismiss = vi.fn();
    render(<BannerFloatingOffer dismissible={true} onDismiss={onDismiss} />);
    const dismissButtons = screen.getAllByTestId("mock-pressable");
    const dismissButton = dismissButtons[dismissButtons.length - 1];
    fireEvent.click(dismissButton);
    expect(onDismiss).toHaveBeenCalled();
  });

  it("hides banner when visible is false", () => {
    const { container } = render(<BannerFloatingOffer visible={false} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders arrow icon", () => {
    render(<BannerFloatingOffer />);
    const icon = screen.getByTestId("mock-icon");
    expect(icon).toHaveAttribute("data-name", "lucide/arrow-right");
  });
});
