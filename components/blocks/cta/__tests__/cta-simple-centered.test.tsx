import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaSimpleCentered } from "../cta-simple-centered";

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

describe("CtaSimpleCentered", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
});
