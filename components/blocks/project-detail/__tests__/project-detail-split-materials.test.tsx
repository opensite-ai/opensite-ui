import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailSplitMaterials } from "../project-detail-split-materials";

describe("ProjectDetailSplitMaterials", () => {
  const defaultProps = {
    title: "Ergonomic Chair",
    category: "Furniture Design",
    year: "2024",
    heroImage: { src: "/hero.jpg", alt: "Chair" },
    description: "A revolutionary ergonomic chair designed for all-day comfort.",
    specifications: [
      { label: "Material", value: "Recycled aluminum, mesh fabric" },
      { label: "Dimensions", value: "28W x 26D x 42H inches" },
      { label: "Weight", value: "35 lbs" },
    ],
    secondaryImage: { src: "/secondary.jpg", alt: "Detail view" },
    materials: ["Aluminum", "Mesh fabric"],
  };

  it("renders title correctly", () => {
    render(<ProjectDetailSplitMaterials {...defaultProps} />);
    expect(screen.getByText("Ergonomic Chair")).toBeInTheDocument();
  });

  it("renders metadata", () => {
    render(<ProjectDetailSplitMaterials {...defaultProps} />);
    expect(screen.getByText("Furniture Design")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("renders hero image", () => {
    render(<ProjectDetailSplitMaterials {...defaultProps} />);
    expect(screen.getByAltText("Chair")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<ProjectDetailSplitMaterials {...defaultProps} />);
    expect(screen.getByText("A revolutionary ergonomic chair designed for all-day comfort.")).toBeInTheDocument();
  });

  it("renders all specifications", () => {
    render(<ProjectDetailSplitMaterials {...defaultProps} />);
    expect(screen.getByText("Material")).toBeInTheDocument();
    expect(screen.getByText("Recycled aluminum, mesh fabric")).toBeInTheDocument();
    expect(screen.getByText("Dimensions")).toBeInTheDocument();
    expect(screen.getByText("28W x 26D x 42H inches")).toBeInTheDocument();
  });

  it("renders secondary image", () => {
    render(<ProjectDetailSplitMaterials {...defaultProps} />);
    expect(screen.getByAltText("Detail view")).toBeInTheDocument();
  });

  it("renders with empty specifications", () => {
    const props = { ...defaultProps, specifications: [] };
    const { container } = render(<ProjectDetailSplitMaterials {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with no secondary image", () => {
    const props = { ...defaultProps, secondaryImage: undefined };
    const { container } = render(<ProjectDetailSplitMaterials {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProjectDetailSplitMaterials {...defaultProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders back button when backHref is provided", () => {
    render(<ProjectDetailSplitMaterials {...defaultProps} backHref="/projects" />);
    const backLink = screen.getByRole("link", { name: /back/i });
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
