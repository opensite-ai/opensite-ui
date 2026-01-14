import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LogosCenteredSimple } from "../logos-centered-simple";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

describe("LogosCenteredSimple", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title and subtitle", () => {
    render(
      <LogosCenteredSimple
        title="Custom Title"
        subtitle="Custom Subtitle"
      />
    );
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom Subtitle")).toBeInTheDocument();
  });

  it("renders custom logos", () => {
    const customLogos = [
      { name: "Custom Company 1", logo: "/custom1.png" },
      { name: "Custom Company 2", logo: "/custom2.png" },
    ];
    render(<LogosCenteredSimple logos={customLogos} />);
    expect(screen.getByAltText("Custom Company 1 logo")).toBeInTheDocument();
    expect(screen.getByAltText("Custom Company 2 logo")).toBeInTheDocument();
  });

  it("handles empty logos array with explicit title", () => {
    render(
      <LogosCenteredSimple
        title="Trusted by innovative companies"
        subtitle="Industry leaders"
        logos={[]}
      />
    );
    expect(screen.getByText("Trusted by innovative companies")).toBeInTheDocument();
  });
});
