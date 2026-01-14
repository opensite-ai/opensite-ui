import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { StatsBarComparison } from "../stats-bar-comparison";

vi.mock("../../../ui/badge", () => ({
  Badge: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span data-testid="mock-badge" className={className}>
      {children}
    </span>
  ),
}));

describe("StatsBarComparison", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
});
