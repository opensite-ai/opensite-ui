import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LogosTwoRowGrid } from "../logos-two-row-grid";

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

describe("LogosTwoRowGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom heading", () => {
    render(<LogosTwoRowGrid heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders custom companies", () => {
    const customCompanies = [
      { name: "Row Company 1", logo: "/row1.png", url: "/company1" },
      { name: "Row Company 2", logo: "/row2.png", url: "/company2" },
    ];
    render(<LogosTwoRowGrid companies={customCompanies} />);
    expect(screen.getByAltText("Row Company 1 logo")).toBeInTheDocument();
    expect(screen.getByAltText("Row Company 2 logo")).toBeInTheDocument();
  });

  it("splits companies into two rows", () => {
    const customCompanies = [
      { name: "Company 1", logo: "/c1.png" },
      { name: "Company 2", logo: "/c2.png" },
      { name: "Company 3", logo: "/c3.png" },
      { name: "Company 4", logo: "/c4.png" },
    ];
    render(<LogosTwoRowGrid companies={customCompanies} />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBe(4);
  });

  it("handles empty companies array with explicit heading", () => {
    render(
      <LogosTwoRowGrid
        heading="Trusted by leading companies worldwide"
        companies={[]}
      />
    );
    expect(screen.getByText("Trusted by leading companies worldwide")).toBeInTheDocument();
  });

  it("handles single company", () => {
    const singleCompany = [{ name: "Single Company", logo: "/single.png" }];
    render(<LogosTwoRowGrid companies={singleCompany} />);
    expect(screen.getByAltText("Single Company logo")).toBeInTheDocument();
  });
});
