import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaMinimalSeparator } from "../cta-minimal-separator";

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

describe("CtaMinimalSeparator", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
});
