import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BannerDeliveryCountdown } from "../banner-delivery-countdown";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, size }: { name: string; size?: number }) => (
    <span data-testid="mock-icon" data-name={name} data-size={size} />
  ),
}));

describe("BannerDeliveryCountdown", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders with default props", () => {
    render(<BannerDeliveryCountdown />);
    expect(screen.getByText(/Order within/)).toBeInTheDocument();
    expect(screen.getByText(/Dec 24/)).toBeInTheDocument();
  });

  it("renders with custom delivery date", () => {
    render(<BannerDeliveryCountdown deliveryDate="Dec 31" />);
    expect(screen.getByText(/Dec 31/)).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<BannerDeliveryCountdown className="custom-class" />);
    const banner = container.firstChild as HTMLElement;
    expect(banner).toHaveClass("custom-class");
  });

  it("renders with amber background", () => {
    const { container } = render(<BannerDeliveryCountdown />);
    const banner = container.firstChild as HTMLElement;
    expect(banner).toHaveClass("bg-amber-500");
  });

  it("renders gift icon", () => {
    render(<BannerDeliveryCountdown />);
    const icon = screen.getByTestId("mock-icon");
    expect(icon).toHaveAttribute("data-name", "lucide/gift");
  });
});
