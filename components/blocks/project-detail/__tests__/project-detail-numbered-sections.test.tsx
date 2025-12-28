import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailNumberedSections } from "../project-detail-numbered-sections";

describe("ProjectDetailNumberedSections", () => {
  const defaultProps = {
    title: "Design Process",
    heroImage: { src: "/hero.jpg", alt: "Process" },
    sections: [
      { number: "01", title: "Research", content: "Understanding user needs...", image: { src: "/img1.jpg", alt: "Research" } },
      { number: "02", title: "Design", content: "Creating solutions...", image: { src: "/img2.jpg", alt: "Design" } },
      { number: "03", title: "Develop", content: "Building the product...", image: { src: "/img3.jpg", alt: "Develop" } },
    ],
  };

  it("renders title correctly", () => {
    render(<ProjectDetailNumberedSections {...defaultProps} />);
    expect(screen.getByText("Design Process")).toBeInTheDocument();
  });

  it("renders hero image", () => {
    render(<ProjectDetailNumberedSections {...defaultProps} />);
    expect(screen.getByAltText("Process")).toBeInTheDocument();
  });

  it("renders all numbered sections", () => {
    render(<ProjectDetailNumberedSections {...defaultProps} />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("Research")).toBeInTheDocument();
    expect(screen.getByText("Understanding user needs...")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("Design")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
    expect(screen.getByText("Develop")).toBeInTheDocument();
  });

  it("renders section images", () => {
    render(<ProjectDetailNumberedSections {...defaultProps} />);
    expect(screen.getByAltText("Research")).toBeInTheDocument();
    expect(screen.getByAltText("Design")).toBeInTheDocument();
    expect(screen.getByAltText("Develop")).toBeInTheDocument();
  });

  it("renders with empty sections", () => {
    const props = { ...defaultProps, sections: [] };
    const { container } = render(<ProjectDetailNumberedSections {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProjectDetailNumberedSections {...defaultProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders back button when backHref is provided", () => {
    render(<ProjectDetailNumberedSections {...defaultProps} backHref="/projects" />);
    const backLink = screen.getByRole("link", { name: /back/i });
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
