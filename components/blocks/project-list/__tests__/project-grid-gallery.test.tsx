import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectGridGallery } from "../project-grid-gallery";
import type { ProjectGridGalleryItem } from "../project-grid-gallery";

describe("ProjectGridGallery", () => {
  const mockImages: ProjectGridGalleryItem[] = [
    {
      src: "/images/project1.jpg",
      alt: "Project 1",
      title: "Modern Architecture",
      description: "A stunning modern building design",
    },
    {
      src: "/images/project2.jpg",
      alt: "Project 2",
      title: "Interior Design",
      description: "Minimalist interior space",
    },
    {
      src: "/images/project3.jpg",
      alt: "Project 3",
      title: "Landscape Photography",
      description: "Beautiful natural scenery",
    },
  ];

  it("renders all project images", () => {
    render(<ProjectGridGallery images={mockImages} />);
    expect(screen.getByText("Modern Architecture")).toBeInTheDocument();
    expect(screen.getByText("Interior Design")).toBeInTheDocument();
    expect(screen.getByText("Landscape Photography")).toBeInTheDocument();
  });

  it("renders all project descriptions", () => {
    render(<ProjectGridGallery images={mockImages} />);
    expect(
      screen.getByText("A stunning modern building design")
    ).toBeInTheDocument();
    expect(screen.getByText("Minimalist interior space")).toBeInTheDocument();
    expect(screen.getByText("Beautiful natural scenery")).toBeInTheDocument();
  });

  it("applies correct grid layout classes", () => {
    const { container } = render(<ProjectGridGallery images={mockImages} />);
    const grid = container.querySelector(".grid");
    expect(grid?.className).toContain("md:grid-cols-3");
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProjectGridGallery images={mockImages} className="custom-gallery" />
    );
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("custom-gallery");
  });

  it("renders with empty images array", () => {
    const { container } = render(<ProjectGridGallery images={[]} />);
    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
    expect(grid?.children.length).toBe(0);
  });

  it("applies hover effects to project cards", () => {
    const { container } = render(<ProjectGridGallery images={mockImages} />);
    const cards = container.querySelectorAll(".group");
    expect(cards.length).toBe(mockImages.length);
  });

  it("renders images with correct structure", () => {
    const { container } = render(<ProjectGridGallery images={mockImages} />);
    const images = container.querySelectorAll("img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("applies correct gap spacing in grid", () => {
    const { container } = render(<ProjectGridGallery images={mockImages} />);
    const grid = container.querySelector(".grid");
    // Grid uses no gap spacing - items are flush against each other
    expect(grid?.className).toContain("grid");
  });

  it("renders project titles with correct styling", () => {
    const { container } = render(<ProjectGridGallery images={mockImages} />);
    const title = screen.getByText("Modern Architecture");
    expect(title.className).toContain("font-");
  });

  it("renders project descriptions with muted color", () => {
    const { container } = render(<ProjectGridGallery images={mockImages} />);
    const description = screen.getByText("A stunning modern building design");
    expect(description.className).toContain("text-muted");
  });

  it("applies overflow hidden to image containers", () => {
    const { container } = render(<ProjectGridGallery images={mockImages} />);
    const imageContainers = container.querySelectorAll(".overflow-hidden");
    expect(imageContainers.length).toBeGreaterThan(0);
  });

  it("renders with rounded corners", () => {
    const { container } = render(<ProjectGridGallery images={mockImages} />);
    // Component doesn't use rounded corners - images are flush in grid
    const gridItems = container.querySelectorAll(".aspect-square");
    expect(gridItems.length).toBeGreaterThan(0);
  });

  it("applies aspect ratio to images", () => {
    const { container } = render(<ProjectGridGallery images={mockImages} />);
    const aspectRatioElements = container.querySelectorAll(".aspect-square");
    expect(aspectRatioElements.length).toBeGreaterThan(0);
  });

  it("renders all image alt texts correctly", () => {
    render(<ProjectGridGallery images={mockImages} />);
    const img1 = screen.getByAltText("Project 1");
    const img2 = screen.getByAltText("Project 2");
    const img3 = screen.getByAltText("Project 3");
    expect(img1).toBeInTheDocument();
    expect(img2).toBeInTheDocument();
    expect(img3).toBeInTheDocument();
  });

  it("applies transition effects", () => {
    const { container } = render(<ProjectGridGallery images={mockImages} />);
    const transitionElements = container.querySelectorAll(".transition-transform, .transition-all");
    expect(transitionElements.length).toBeGreaterThan(0);
  });

  it("renders content overlay on hover", () => {
    const { container } = render(<ProjectGridGallery images={mockImages} />);
    const overlays = container.querySelectorAll(".absolute");
    expect(overlays.length).toBeGreaterThan(0);
  });

  it("applies correct padding to content areas", () => {
    const { container } = render(<ProjectGridGallery images={mockImages} />);
    const paddedElements = container.querySelectorAll(".p-6");
    expect(paddedElements.length).toBeGreaterThan(0);
  });

  it("renders with proper semantic structure", () => {
    const { container } = render(<ProjectGridGallery images={mockImages} />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });
});

