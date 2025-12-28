import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BannerCountdownSale } from "../banner-countdown-sale";

describe("BannerCountdownSale", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders with default props", () => {
    render(<BannerCountdownSale />);
    expect(screen.getByText("Flash Sale Ends In")).toBeInTheDocument();
    expect(screen.getByText("Up to 50% off on selected items")).toBeInTheDocument();
  });

  it("renders with custom props", () => {
    render(
      <BannerCountdownSale
        message="Big Sale Ends In"
        description="Save up to 80%"
      />
    );
    expect(screen.getByText("Big Sale Ends In")).toBeInTheDocument();
    expect(screen.getByText("Save up to 80%")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<BannerCountdownSale className="custom-class" />);
    const banner = container.firstChild as HTMLElement;
    expect(banner).toHaveClass("custom-class");
  });

  it("renders with red background for urgency", () => {
    const { container } = render(<BannerCountdownSale />);
    const banner = container.firstChild as HTMLElement;
    expect(banner).toHaveClass("bg-red-600");
  });

  it("displays countdown timer elements", () => {
    const { container } = render(<BannerCountdownSale />);
    const timerElements = container.querySelectorAll(".bg-red-700");
    expect(timerElements.length).toBe(3);
  });
});
