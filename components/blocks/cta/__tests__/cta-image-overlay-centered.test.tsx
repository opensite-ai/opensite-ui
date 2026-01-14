import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaImageOverlayCentered } from "../cta-image-overlay-centered";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, ...props }: React.PropsWithChildren<{ className?: string }>) => (
      <div className={className} data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">
      {children}
    </a>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(30).fill("https://placeholder.com/image.jpg"),
}));

describe("CtaImageOverlayCentered", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
});
