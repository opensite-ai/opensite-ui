import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureChecklistThreeColumn } from "../feature-checklist-three-column";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("FeatureChecklistThreeColumn", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
});
