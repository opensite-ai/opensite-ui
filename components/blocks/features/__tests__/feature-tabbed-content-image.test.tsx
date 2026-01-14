import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureTabbedContentImage } from "../feature-tabbed-content-image";

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

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("FeatureTabbedContentImage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
});
