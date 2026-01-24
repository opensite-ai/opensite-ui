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

  it("renders custom prefix text", () => {
    render(<BannerDeliveryCountdown prefixText="Order now within" />);
    expect(screen.getByText(/Order now within/)).toBeInTheDocument();
  });

  it("renders custom middle text", () => {
    render(<BannerDeliveryCountdown middleText="to receive by" />);
    expect(screen.getByText(/to receive by/)).toBeInTheDocument();
  });

  it("renders icon", () => {
    render(<BannerDeliveryCountdown iconName="lucide/gift" />);
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <BannerDeliveryCountdown className="custom-class" />,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
