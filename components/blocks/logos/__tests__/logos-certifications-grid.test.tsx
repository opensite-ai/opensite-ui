import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LogosCertificationsGrid } from "../logos-certifications-grid";

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

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

describe("LogosCertificationsGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title and description", () => {
    render(
      <LogosCertificationsGrid
        title="Custom Title"
        description="Custom Description"
      />
    );
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom Description")).toBeInTheDocument();
  });

  it("renders custom button text and url", () => {
    render(
      <LogosCertificationsGrid
        actions={[{ label: "Contact Us", href: "/contact", variant: "default" }]}
      />
    );
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("renders custom logos", () => {
    const customLogos = [
      { id: "cert-1", description: "Certification 1", image: "/cert1.png" },
      { id: "cert-2", description: "Certification 2", image: "/cert2.png" },
    ];
    render(<LogosCertificationsGrid logos={customLogos} />);
    expect(screen.getByAltText("Certification 1")).toBeInTheDocument();
    expect(screen.getByAltText("Certification 2")).toBeInTheDocument();
  });

  it("handles empty logos array", () => {
    render(<LogosCertificationsGrid logos={[]} />);
    expect(screen.getByText("Our certifications say it all.")).toBeInTheDocument();
  });
});
