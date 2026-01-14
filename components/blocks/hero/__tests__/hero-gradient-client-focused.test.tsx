import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroGradientClientFocused } from "../hero-gradient-client-focused";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("HeroGradientClientFocused", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
});
