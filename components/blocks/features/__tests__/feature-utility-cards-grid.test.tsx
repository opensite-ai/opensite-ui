import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureUtilityCardsGrid } from "../feature-utility-cards-grid";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("FeatureUtilityCardsGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
});
