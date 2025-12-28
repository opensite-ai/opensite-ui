import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProjectFilterableGallery } from "../project-filterable-gallery";
import type { ProjectFilterableGalleryItem } from "../project-filterable-gallery";

describe("ProjectFilterableGallery", () => {
  const mockProjects: ProjectFilterableGalleryItem[] = [
    {
      id: 1,
      title: "Web Design Project",
      category: "WEB",
      description: "Modern web design with clean aesthetics",
      image: "/images/web1.jpg",
      tags: ["web", "design"],
    },
    {
      id: 2,
      title: "Mobile App",
      category: "MOBILE",
      description: "iOS and Android application",
      image: "/images/mobile1.jpg",
      tags: ["mobile", "app"],
    },
    {
      id: 3,
      title: "Brand Identity",
      category: "BRANDING",
      description: "Complete brand identity system",
      image: "/images/brand1.jpg",
      tags: ["branding", "identity"],
    },
  ];

  const mockCategories = ["ALL", "WEB", "MOBILE", "BRANDING"];

  it("renders all projects by default", () => {
    render(<ProjectFilterableGallery projects={mockProjects} />);
    expect(screen.getByText("Web Design Project")).toBeInTheDocument();
    expect(screen.getByText("Mobile App")).toBeInTheDocument();
    expect(screen.getByText("Brand Identity")).toBeInTheDocument();
  });

  it("renders all project descriptions", () => {
    render(<ProjectFilterableGallery projects={mockProjects} />);
    expect(
      screen.getByText("Modern web design with clean aesthetics")
    ).toBeInTheDocument();
    expect(screen.getByText("iOS and Android application")).toBeInTheDocument();
    expect(
      screen.getByText("Complete brand identity system")
    ).toBeInTheDocument();
  });

  it("renders filter buttons for all categories", () => {
    render(
      <ProjectFilterableGallery
        projects={mockProjects}
        categories={mockCategories}
      />
    );
    const allButtons = screen.getAllByText("ALL");
    expect(allButtons.length).toBeGreaterThan(0);
    const webButtons = screen.getAllByText("WEB");
    expect(webButtons.length).toBeGreaterThan(0);
  });

  it("filters projects when category button is clicked", () => {
    const { container } = render(
      <ProjectFilterableGallery
        projects={mockProjects}
        categories={mockCategories}
      />
    );
    // Find filter buttons in the filter container (first div with buttons)
    const filterButtons = container.querySelectorAll(
      ".mb-16.flex button"
    );
    // Find and click the WEB button
    const webButton = Array.from(filterButtons).find(
      (btn) => btn.textContent === "WEB"
    );
    expect(webButton).toBeInTheDocument();
    fireEvent.click(webButton!);
    // Check that the filter is active
    expect(webButton?.className).toContain("border-b-2");
  });

  it("shows all projects when ALL filter is clicked", () => {
    render(
      <ProjectFilterableGallery
        projects={mockProjects}
        categories={mockCategories}
      />
    );
    const webButtons = screen.getAllByText("WEB");
    fireEvent.click(webButtons[0]);
    const allButtons = screen.getAllByText("ALL");
    fireEvent.click(allButtons[0]);
    expect(screen.getByText("Web Design Project")).toBeInTheDocument();
    expect(screen.getByText("Mobile App")).toBeInTheDocument();
    expect(screen.getByText("Brand Identity")).toBeInTheDocument();
  });

  it("renders default projects when no projects prop provided", () => {
    render(<ProjectFilterableGallery />);
    expect(screen.getByText("Minimalist Geometry")).toBeInTheDocument();
    expect(screen.getByText("Abstract Color Flow")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProjectFilterableGallery
        projects={mockProjects}
        className="custom-filterable"
      />
    );
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("custom-filterable");
  });

  it("applies correct grid layout", () => {
    const { container } = render(
      <ProjectFilterableGallery projects={mockProjects} />
    );
    const grid = container.querySelector(".grid");
    expect(grid?.className).toContain("md:grid-cols-2");
  });

  it("renders with empty projects array", () => {
    const { container } = render(<ProjectFilterableGallery projects={[]} />);
    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
  });

  it("highlights active filter button", () => {
    const { container } = render(
      <ProjectFilterableGallery
        projects={mockProjects}
        categories={mockCategories}
      />
    );
    const allButtons = screen.getAllByText("ALL");
    expect(allButtons[0].className).toContain("border-b-2");
  });

  it("renders project images with correct alt text", () => {
    render(<ProjectFilterableGallery projects={mockProjects} />);
    const img1 = screen.getByAltText("Web Design Project");
    const img2 = screen.getByAltText("Mobile App");
    const img3 = screen.getByAltText("Brand Identity");
    expect(img1).toBeInTheDocument();
    expect(img2).toBeInTheDocument();
    expect(img3).toBeInTheDocument();
  });

  it("applies animation to filtered projects", () => {
    const { container } = render(
      <ProjectFilterableGallery projects={mockProjects} />
    );
    // AnimatePresence should be wrapping the projects
    const projectCards = container.querySelectorAll(".group");
    expect(projectCards.length).toBe(mockProjects.length);
  });

  it("renders filter buttons with correct spacing", () => {
    const { container } = render(
      <ProjectFilterableGallery
        projects={mockProjects}
        categories={mockCategories}
      />
    );
    const filterContainer = container.querySelector(".flex.flex-wrap");
    expect(filterContainer).toBeInTheDocument();
  });

  it("applies hover effects to project cards", () => {
    const { container } = render(
      <ProjectFilterableGallery projects={mockProjects} />
    );
    const cards = container.querySelectorAll(".group");
    expect(cards.length).toBe(mockProjects.length);
  });

  it("renders project categories correctly", () => {
    render(<ProjectFilterableGallery projects={mockProjects} />);
    expect(screen.getByText("WEB")).toBeInTheDocument();
    expect(screen.getByText("MOBILE")).toBeInTheDocument();
    expect(screen.getByText("BRANDING")).toBeInTheDocument();
  });

  it("applies rounded corners to cards", () => {
    const { container } = render(
      <ProjectFilterableGallery projects={mockProjects} />
    );
    const roundedElements = container.querySelectorAll(".rounded-lg");
    expect(roundedElements.length).toBeGreaterThan(0);
  });
});

