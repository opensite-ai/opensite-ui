import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureBadgeGridSix } from "../feature-badge-grid-six";

vi.mock("../../../ui/badge", () => ({
  Badge: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span className={className} data-testid="mock-badge">{children}</span>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("FeatureBadgeGridSix", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
});
