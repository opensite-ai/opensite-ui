import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CarouselIconTabs } from "../carousel-icon-tabs";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

vi.mock("../../../ui/carousel", () => ({
  Carousel: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel">{children}</div>,
  CarouselContent: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-content">{children}</div>,
  CarouselItem: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-item">{children}</div>,
  CarouselPrevious: ({ className }: { className?: string }) => <button data-testid="carousel-previous" className={className}>Previous</button>,
  CarouselNext: ({ className }: { className?: string }) => <button data-testid="carousel-next" className={className}>Next</button>,
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("CarouselIconTabs", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
});
