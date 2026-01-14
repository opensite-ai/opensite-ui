import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { StatsNumberTicker } from "../stats-number-ticker";

vi.mock("../../../ui/badge", () => ({
  Badge: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span data-testid="mock-badge" className={className}>
      {children}
    </span>
  ),
}));

describe("StatsNumberTicker", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
});
