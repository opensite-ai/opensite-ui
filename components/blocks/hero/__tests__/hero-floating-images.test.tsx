import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroFloatingImages } from "../hero-floating-images";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(10).fill("https://placeholder.com/image.jpg"),
}));

describe("HeroFloatingImages", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
});
