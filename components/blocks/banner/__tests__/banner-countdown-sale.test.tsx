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
});
