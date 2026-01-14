import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutNetworkSpotlight } from "../about-network-spotlight";

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

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>
      icon
    </span>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(30).fill("https://placeholder.com/image.jpg"),
}));

describe("AboutNetworkSpotlight", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<AboutNetworkSpotlight />);
    expect(screen.getByText("Partner Network")).toBeInTheDocument();
    expect(screen.getByText("Join the OpenSite AI Partner Network")).toBeInTheDocument();
    expect(screen.getByText(/A curated community of independent advisors/)).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<AboutNetworkSpotlight heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<AboutNetworkSpotlight description="Custom description text" />);
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders custom eyebrow", () => {
    render(<AboutNetworkSpotlight eyebrow="Custom Eyebrow" />);
    expect(screen.getByText("Custom Eyebrow")).toBeInTheDocument();
  });

  it("renders highlights when provided", () => {
    const highlights = ["Highlight 1", "Highlight 2"];
    render(<AboutNetworkSpotlight highlights={highlights} />);
    expect(screen.getByText("Highlight 1")).toBeInTheDocument();
    expect(screen.getByText("Highlight 2")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    const actions = [
      { label: "Join Network", href: "/join", variant: "default" as const },
    ];
    render(<AboutNetworkSpotlight actions={actions} />);
    expect(screen.getByText("Join Network")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<AboutNetworkSpotlight className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
