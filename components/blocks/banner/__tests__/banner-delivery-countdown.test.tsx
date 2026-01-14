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
});
