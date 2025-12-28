import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  IndustriesTimelineTable,
  type IndustryProject,
} from "../industries-timeline-table";

describe("IndustriesTimelineTable", () => {
  const mockProjects: IndustryProject[] = [
    {
      year: "2024",
      name: "FinTech Platform",
      description: "Complete digital banking transformation",
      imageSrc: "/fintech-project.jpg",
      imageAlt: "FinTech project",
      url: "/projects/fintech",
    },
    {
      year: "2023",
      name: "Healthcare Portal",
      description: "Patient management system redesign",
      imageSrc: "/healthcare-project.jpg",
      imageAlt: "Healthcare project",
      url: "/projects/healthcare",
    },
    {
      year: "2022",
      name: "E-Commerce Suite",
      description: "Multi-channel retail platform",
      imageSrc: "/ecommerce-project.jpg",
      imageAlt: "E-commerce project",
      url: "/projects/ecommerce",
    },
  ];

  it("renders with default props", () => {
    render(<IndustriesTimelineTable />);
    expect(screen.getByText("Year")).toBeInTheDocument();
    expect(screen.getByText("Industry")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  it("renders all project items correctly", () => {
    render(<IndustriesTimelineTable projects={mockProjects} />);
    expect(screen.getByText("FinTech Platform")).toBeInTheDocument();
    expect(screen.getByText("Healthcare Portal")).toBeInTheDocument();
    expect(screen.getByText("E-Commerce Suite")).toBeInTheDocument();
  });

  it("renders project years", () => {
    render(<IndustriesTimelineTable projects={mockProjects} />);
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
    expect(screen.getByText("2022")).toBeInTheDocument();
  });

  it("renders project descriptions", () => {
    render(<IndustriesTimelineTable projects={mockProjects} />);
    expect(
      screen.getByText("Complete digital banking transformation")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Patient management system redesign")
    ).toBeInTheDocument();
  });

  it("renders custom labels", () => {
    render(
      <IndustriesTimelineTable
        projects={mockProjects}
        labels={["Date", "Project", "Details"]}
      />
    );
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Project")).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <IndustriesTimelineTable
        projects={mockProjects}
        className="custom-class"
      />
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("custom-class");
  });

  it("renders links with correct href", () => {
    render(<IndustriesTimelineTable projects={mockProjects} />);
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/projects/fintech");
    expect(links[1]).toHaveAttribute("href", "/projects/healthcare");
  });

  it("renders with empty projects array", () => {
    const { container } = render(<IndustriesTimelineTable projects={[]} />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders section with py-16 spacing", () => {
    const { container } = render(
      <IndustriesTimelineTable projects={mockProjects} />
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("py-16");
  });

  it("renders container class", () => {
    const { container } = render(
      <IndustriesTimelineTable projects={mockProjects} />
    );
    const containerDiv = container.querySelector(".container");
    expect(containerDiv).toBeInTheDocument();
  });

  it("renders header row with labels", () => {
    const { container } = render(
      <IndustriesTimelineTable projects={mockProjects} />
    );
    const headerRow = container.querySelector(".border-b");
    expect(headerRow).toBeInTheDocument();
  });

  it("renders grid layout for rows", () => {
    const { container } = render(
      <IndustriesTimelineTable projects={mockProjects} />
    );
    const grids = container.querySelectorAll(".grid");
    expect(grids.length).toBeGreaterThan(0);
  });

  it("renders with single project item", () => {
    const singleProject: IndustryProject[] = [
      {
        year: "2024",
        name: "AI Platform",
        description: "Machine learning infrastructure",
        imageSrc: "/ai-project.jpg",
        imageAlt: "AI project",
        url: "/projects/ai",
      },
    ];
    render(<IndustriesTimelineTable projects={singleProject} />);
    expect(screen.getByText("AI Platform")).toBeInTheDocument();
    expect(
      screen.getByText("Machine learning infrastructure")
    ).toBeInTheDocument();
  });

  it("renders responsive grid columns", () => {
    const { container } = render(
      <IndustriesTimelineTable projects={mockProjects} />
    );
    const grids = container.querySelectorAll(".md\\:grid-cols-3");
    expect(grids.length).toBeGreaterThan(0);
  });

  it("renders border styling on rows", () => {
    const { container } = render(
      <IndustriesTimelineTable projects={mockProjects} />
    );
    const borderedElements = container.querySelectorAll(".border-b");
    expect(borderedElements.length).toBeGreaterThan(0);
  });

  it("combines all props correctly", () => {
    const { container } = render(
      <IndustriesTimelineTable
        projects={mockProjects}
        labels={["Year", "Name", "Info"]}
        className="custom-section"
      />
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("custom-section");
    expect(screen.getByText("Year")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Info")).toBeInTheDocument();
    expect(screen.getByText("FinTech Platform")).toBeInTheDocument();
  });

  it("renders text styling correctly", () => {
    const { container } = render(
      <IndustriesTimelineTable projects={mockProjects} />
    );
    const textElements = container.querySelectorAll(".text-sm");
    expect(textElements.length).toBeGreaterThan(0);
  });

  it("renders muted foreground text for descriptions", () => {
    const { container } = render(
      <IndustriesTimelineTable projects={mockProjects} />
    );
    const mutedText = container.querySelectorAll(".text-muted-foreground");
    expect(mutedText.length).toBeGreaterThan(0);
  });

  it("renders relative positioning for background images", () => {
    const { container } = render(
      <IndustriesTimelineTable projects={mockProjects} />
    );
    const relativeElements = container.querySelectorAll(".relative");
    expect(relativeElements.length).toBeGreaterThan(0);
  });
});
