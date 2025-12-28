import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailSidebarSticky } from "../project-detail-sidebar-sticky";

describe("ProjectDetailSidebarSticky", () => {
  const defaultProps = {
    title: "Urban Perspectives",
    subtitle: "A photographic journey",
    category: "Photography",
    year: "2024",
    description: "Exploring urban environments",
    images: [
      { src: "/gallery1.jpg", alt: "Gallery 1" },
      { src: "/gallery2.jpg", alt: "Gallery 2" },
    ],
  };

  it("renders title and subtitle", () => {
    render(<ProjectDetailSidebarSticky {...defaultProps} />);
    expect(screen.getByText("Urban Perspectives")).toBeInTheDocument();
    expect(screen.getByText("A photographic journey")).toBeInTheDocument();
  });

  it("renders metadata in sidebar", () => {
    render(<ProjectDetailSidebarSticky {...defaultProps} />);
    expect(screen.getByText("Photography")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("renders images", () => {
    render(<ProjectDetailSidebarSticky {...defaultProps} />);
    expect(screen.getByAltText("Gallery 1")).toBeInTheDocument();
    expect(screen.getByAltText("Gallery 2")).toBeInTheDocument();
  });

  it("renders all images", () => {
    render(<ProjectDetailSidebarSticky {...defaultProps} />);
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders description", () => {
    render(<ProjectDetailSidebarSticky {...defaultProps} />);
    expect(screen.getByText("Exploring urban environments")).toBeInTheDocument();
  });

  it("applies sticky positioning to sidebar", () => {
    const { container } = render(<ProjectDetailSidebarSticky {...defaultProps} />);
    const stickyElement = container.querySelector(".lg\\:sticky");
    expect(stickyElement).toBeInTheDocument();
  });

  it("renders with empty images", () => {
    const props = { ...defaultProps, images: [] };
    const { container } = render(<ProjectDetailSidebarSticky {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProjectDetailSidebarSticky {...defaultProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
