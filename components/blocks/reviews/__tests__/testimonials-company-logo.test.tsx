import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { TestimonialsCompanyLogo } from "../testimonials-company-logo";

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

vi.mock("../../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
  logoPlaceholders: {
    light: "https://placeholder.com/logo-light.svg",
    dark: "https://placeholder.com/logo-dark.svg",
  },
}));

describe("TestimonialsCompanyLogo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
});
