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

  it("renders with default props", () => {
    render(<LogosPartnerGridSidebar />);
    expect(screen.getByText("Our Partners")).toBeInTheDocument();
    expect(screen.getByText(/We've partnered with industry leaders/)).toBeInTheDocument();
  });

  it("renders custom sidebar title and description", () => {
    render(
      <LogosPartnerGridSidebar
        sidebarTitle="Custom Title"
        sidebarDescription="Custom Description"
      />
    );
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom Description")).toBeInTheDocument();
  });

  it("renders default year sections", () => {
    render(<LogosPartnerGridSidebar />);
    expect(screen.getByText("2020")).toBeInTheDocument();
    expect(screen.getByText("2022")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("renders custom year sections", () => {
    const customYearSections = [
      { year: "2021", description: "Custom year description" },
    ];
    render(<LogosPartnerGridSidebar yearSections={customYearSections} />);
    expect(screen.getByText("2021")).toBeInTheDocument();
    expect(screen.getByText("Custom year description")).toBeInTheDocument();
  });

  it("renders default partners", () => {
    render(<LogosPartnerGridSidebar />);
    const images = screen.getAllByTestId("mock-img");
    expect(images.length).toBe(12);
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

  it("applies custom className", () => {
    const { container } = render(<LogosPartnerGridSidebar className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders section element with proper structure", () => {
    const { container } = render(<LogosPartnerGridSidebar />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-24");
  });

  it("renders grid layout", () => {
    const { container } = render(<LogosPartnerGridSidebar />);
    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
  });

  it("handles empty partners array", () => {
    render(<LogosPartnerGridSidebar partners={[]} />);
    expect(screen.getByText("Our Partners")).toBeInTheDocument();
  });

  it("handles empty year sections array", () => {
    render(<LogosPartnerGridSidebar yearSections={[]} />);
    expect(screen.getByText("Our Partners")).toBeInTheDocument();
  });
});
