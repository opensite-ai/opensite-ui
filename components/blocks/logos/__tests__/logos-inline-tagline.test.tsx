import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LogosInlineTagline } from "../logos-inline-tagline";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

describe("LogosInlineTagline", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom tagline", () => {
    render(<LogosInlineTagline tagline="Custom Tagline" />);
    expect(screen.getByText("Custom Tagline")).toBeInTheDocument();
  });

  it("renders custom partners", () => {
    const customPartners = [
      { name: "Partner A", logo: "/partnerA.png" },
      { name: "Partner B", logo: "/partnerB.png" },
    ];
    render(<LogosInlineTagline partners={customPartners} />);
    expect(screen.getByAltText("Partner A logo")).toBeInTheDocument();
    expect(screen.getByAltText("Partner B logo")).toBeInTheDocument();
  });

  it("handles empty partners array", () => {
    render(<LogosInlineTagline partners={[]} />);
    expect(screen.getByText("Used by the world's leading companies")).toBeInTheDocument();
  });
});
