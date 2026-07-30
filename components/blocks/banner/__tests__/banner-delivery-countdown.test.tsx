import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BannerDeliveryCountdown } from "../banner-delivery-countdown";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({
    name,
    size,
    className,
  }: {
    name?: React.ReactNode | string;
    size?: number;
    className?: string;
  }) =>
    typeof name === "string" ? (
      <span
        data-testid={`mock-icon-${name}`}
        data-name={name}
        data-size={size}
        className={className}
      />
    ) : (
      <>{name}</>
    ),
}));

describe("BannerDeliveryCountdown", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-01-01T00:00:00.000Z"));
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
    const { container } = render(
      <BannerDeliveryCountdown
        icon="lucide/package-check"
        iconName="lucide/gift"
        iconClassName="delivery-icon"
      />,
    );
    const icon = screen.getByTestId("mock-icon-lucide/package-check");
    expect(icon).toHaveAttribute("data-size", "16");
    expect(icon).toHaveClass("delivery-icon");
    expect(container).not.toHaveTextContent("lucide/package-check");
    expect(
      screen.queryByTestId("mock-icon-lucide/gift"),
    ).not.toBeInTheDocument();
  });

  it("preserves custom icons and truthy fallback behavior for falsy values", () => {
    const { rerender } = render(
      <BannerDeliveryCountdown
        icon={<span data-testid="custom-delivery-icon" />}
        iconName="lucide/ignored"
      />,
    );

    expect(screen.getByTestId("custom-delivery-icon")).toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-icon-lucide/ignored"),
    ).not.toBeInTheDocument();

    rerender(
      <BannerDeliveryCountdown
        icon=""
        iconName="lucide/empty-fallback"
      />,
    );
    expect(
      screen.getByTestId("mock-icon-lucide/empty-fallback"),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon-")).not.toBeInTheDocument();

    rerender(
      <BannerDeliveryCountdown
        icon={0}
        iconName="lucide/zero-fallback"
      />,
    );
    expect(
      screen.getByTestId("mock-icon-lucide/zero-fallback"),
    ).toBeInTheDocument();

    rerender(
      <BannerDeliveryCountdown
        icon={false}
        iconName="lucide/false-fallback"
      />,
    );
    expect(
      screen.getByTestId("mock-icon-lucide/false-fallback"),
    ).toBeInTheDocument();
  });

  it("keeps the countdown and delivery message content intact", () => {
    const cutoffTime = new Date("2025-01-01T01:02:03.000Z");
    render(
      <BannerDeliveryCountdown
        prefixText="Order within"
        middleText="for delivery by"
        deliveryDate="Friday"
        cutoffTime={cutoffTime}
      />,
    );

    expect(screen.getByText(/Order within/)).toHaveTextContent(
      "Order within 01:02:03 for delivery by Friday",
    );
  });

  it("preserves truthy timerSlot precedence and falsy slot fallback", () => {
    const renderTimer = vi.fn(() => (
      <span data-testid="rendered-timer">Rendered timer</span>
    ));
    const { rerender } = render(
      <BannerDeliveryCountdown
        cutoffTime={new Date("2025-01-01T01:00:00.000Z")}
        renderTimer={renderTimer}
        timerSlot={<span data-testid="timer-slot">Slot timer</span>}
      />,
    );

    expect(screen.getByTestId("timer-slot")).toBeInTheDocument();
    expect(renderTimer).not.toHaveBeenCalled();

    rerender(
      <BannerDeliveryCountdown
        cutoffTime={new Date("2025-01-01T01:00:00.000Z")}
        renderTimer={renderTimer}
        timerSlot={0}
      />,
    );
    expect(screen.getByTestId("rendered-timer")).toBeInTheDocument();
    expect(renderTimer).toHaveBeenCalled();
  });

  it("applies custom className", () => {
    const { container } = render(
      <BannerDeliveryCountdown className="custom-class" />,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
