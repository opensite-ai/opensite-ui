import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsImpactGrid } from "../stats-impact-grid";

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-icon-name={name} className={className}>
      icon
    </span>
  ),
}));

vi.mock("../../../ui/badge", () => ({
  Badge: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span data-testid="mock-badge" className={className}>
      {children}
    </span>
  ),
}));

vi.mock("../../../ui/card", () => ({
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="mock-card" className={className}>
      {children}
    </div>
  ),
  CardContent: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="mock-card-content" className={className}>
      {children}
    </div>
  ),
}));

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">
      {children}
    </a>
  ),
}));

describe("StatsImpactGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
});
