import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LogosPartnerGridSidebar } from "../logos-partner-grid-sidebar";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

describe("LogosPartnerGridSidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom partners", () => {
    const customPartners = [
      { name: "Grid Partner 1", logo: "/grid1.png" },
      { name: "Grid Partner 2", logo: "/grid2.png" },
    ];
    render(<LogosPartnerGridSidebar partners={customPartners} />);
    expect(screen.getByAltText("Grid Partner 1 logo")).toBeInTheDocument();
    expect(screen.getByAltText("Grid Partner 2 logo")).toBeInTheDocument();
  });

  it("handles empty partners array with explicit heading", () => {
    render(<LogosPartnerGridSidebar heading="Our Partners" partners={[]} />);
    expect(screen.getByText("Our Partners")).toBeInTheDocument();
  });
});
