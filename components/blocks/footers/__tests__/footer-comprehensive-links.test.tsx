import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FooterComprehensiveLinks } from "../footer-comprehensive-links";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">
      {children}
    </a>
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>
      icon
    </span>
  ),
}));

vi.mock("../../../lib/patternSvgs", () => ({
  patternSvgs: {
    grid1: "https://placeholder.com/pattern.svg",
  },
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  logoPlaceholders: {
    lightHorizontalLogo: "https://placeholder.com/logo-light.png",
  },
}));

describe("FooterComprehensiveLinks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
});
