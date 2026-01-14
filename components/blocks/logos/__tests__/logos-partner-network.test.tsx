import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LogosPartnerNetwork } from "../logos-partner-network";

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

vi.mock("../../../ui/badge", () => ({
  Badge: ({ children, variant, className }: { children: React.ReactNode; variant?: string; className?: string }) => (
    <span data-variant={variant} className={className} data-testid="mock-badge">{children}</span>
  ),
}));

describe("LogosPartnerNetwork", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom badge, title, and description", () => {
    render(
      <LogosPartnerNetwork
        badge="Custom Badge"
        title="Custom Title"
        description="Custom Description"
      />
    );
    expect(screen.getByText("Custom Badge")).toBeInTheDocument();
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom Description")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<LogosPartnerNetwork actions={[{ label: "Join Now", href: "/join", variant: "default" }]} />);
    expect(screen.getByText("Join Now")).toBeInTheDocument();
  });

  it("renders custom logos", () => {
    const customLogos = [
      { name: "Network Partner 1", logo: "/network1.png" },
      { name: "Network Partner 2", logo: "/network2.png" },
    ];
    render(<LogosPartnerNetwork logos={customLogos} />);
    expect(screen.getByAltText("Network Partner 1 logo")).toBeInTheDocument();
    expect(screen.getByAltText("Network Partner 2 logo")).toBeInTheDocument();
  });

  it("handles empty logos array with explicit content", () => {
    render(
      <LogosPartnerNetwork
        title="Trusted by industry leaders"
        description="Join our growing network"
        logos={[]}
      />
    );
    expect(screen.getByText("Trusted by industry leaders")).toBeInTheDocument();
  });
});
