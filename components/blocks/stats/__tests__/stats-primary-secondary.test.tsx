import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsPrimarySecondary } from "../stats-primary-secondary";

vi.mock("../../../ui/badge", () => ({
  Badge: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span data-testid="mock-badge" className={className}>
      {children}
    </span>
  ),
}));

describe("StatsPrimarySecondary", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
});
