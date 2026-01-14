import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsAnimatedCounter } from "../stats-animated-counter";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-icon-name={name} className={className}>
      icon
    </span>
  ),
}));

describe("StatsAnimatedCounter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
});
