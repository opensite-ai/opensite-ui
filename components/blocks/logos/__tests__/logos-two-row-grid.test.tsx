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

  it("renders with default props", () => {
    render(<LogosTwoRowGrid />);
    expect(screen.getByText("Trusted by leading companies worldwide")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<LogosTwoRowGrid heading="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("renders default companies", () => {
    render(<LogosTwoRowGrid />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBe(10);
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

  it("renders clickable company logos", () => {
    const { container } = render(<LogosTwoRowGrid />);
    const links = container.querySelectorAll("a");
    expect(links.length).toBeGreaterThan(0);
  });

  it("applies custom className", () => {
    const { container } = render(<LogosTwoRowGrid className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<LogosTwoRowGrid />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-24");
  });

  it("handles empty companies array", () => {
    render(<LogosTwoRowGrid companies={[]} />);
    expect(screen.getByText("Trusted by leading companies worldwide")).toBeInTheDocument();
  });

  it("handles single company", () => {
    const singleCompany = [{ name: "Single Company", logo: "/single.png" }];
    render(<LogosTwoRowGrid companies={singleCompany} />);
    expect(screen.getByAltText("Single Company logo")).toBeInTheDocument();
  });
});
