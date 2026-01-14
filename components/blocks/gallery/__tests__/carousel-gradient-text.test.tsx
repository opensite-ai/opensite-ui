import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CarouselGradientText } from "../carousel-gradient-text";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../ui/carousel", () => ({
  Carousel: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel">{children}</div>,
  CarouselContent: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-content">{children}</div>,
  CarouselItem: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-item">{children}</div>,
  CarouselNext: () => <button data-testid="carousel-next">Next</button>,
  CarouselPrevious: () => <button data-testid="carousel-prev">Prev</button>,
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("CarouselGradientText", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
});
