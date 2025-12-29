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

  it("renders with default props", () => {
    render(<LogosPartnerNetwork />);
    expect(screen.getByText("Partner Network")).toBeInTheDocument();
    expect(screen.getByText("Trusted by industry leaders")).toBeInTheDocument();
    expect(screen.getByText(/Join thousands of companies/)).toBeInTheDocument();
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

  it("renders button with default text", () => {
    render(<LogosPartnerNetwork />);
    expect(screen.getByText("Become a partner")).toBeInTheDocument();
  });

  it("renders custom button text", () => {
    render(<LogosPartnerNetwork actions={[{ label: "Join Now", href: "/join", variant: "default" }]} />);
    expect(screen.getByText("Join Now")).toBeInTheDocument();
  });

  it("renders default logos", () => {
    render(<LogosPartnerNetwork />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBe(8);
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

  it("applies custom className", () => {
    const { container } = render(<LogosPartnerNetwork className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<LogosPartnerNetwork />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-24");
  });

  it("renders badge component", () => {
    render(<LogosPartnerNetwork />);
    expect(screen.getByTestId("mock-badge")).toBeInTheDocument();
  });

  it("handles empty logos array", () => {
    render(<LogosPartnerNetwork logos={[]} />);
    expect(screen.getByText("Trusted by industry leaders")).toBeInTheDocument();
  });
});
