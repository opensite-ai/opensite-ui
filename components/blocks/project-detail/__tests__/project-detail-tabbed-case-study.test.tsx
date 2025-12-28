import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailTabbedCaseStudy } from "../project-detail-tabbed-case-study";

describe("ProjectDetailTabbedCaseStudy", () => {
  const defaultProps = {
    title: "E-commerce Platform",
    heroImage: { src: "/hero.jpg", alt: "Platform" },
    tabs: [
      { id: "overview", label: "Overview", content: "Overview content here" },
      { id: "challenge", label: "Challenge", content: "Challenge content here" },
      { id: "solution", label: "Solution", content: "Solution content here" },
    ],
    contentSections: [
      { title: "Project Goals", content: "Increase conversion rates...", image: { src: "/img1.jpg", alt: "Goals" } },
    ],
    testimonial: {
      quote: "The results exceeded our expectations.",
      author: "CEO",
      role: "Client Company",
      avatar: "/avatar.jpg",
    },
    tools: [
      { name: "React", icon: "react" },
      { name: "Node.js", icon: "nodejs" },
    ],
  };

  it("renders title correctly", () => {
    render(<ProjectDetailTabbedCaseStudy {...defaultProps} />);
    expect(screen.getByText("E-commerce Platform")).toBeInTheDocument();
  });

  it("renders hero image", () => {
    render(<ProjectDetailTabbedCaseStudy {...defaultProps} />);
    expect(screen.getByAltText("Platform")).toBeInTheDocument();
  });

  it("renders tab labels", () => {
    render(<ProjectDetailTabbedCaseStudy {...defaultProps} />);
    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText("Challenge")).toBeInTheDocument();
    expect(screen.getByText("Solution")).toBeInTheDocument();
  });

  it("renders content sections", () => {
    render(<ProjectDetailTabbedCaseStudy {...defaultProps} />);
    expect(screen.getByText("Project Goals")).toBeInTheDocument();
    expect(screen.getByText("Increase conversion rates...")).toBeInTheDocument();
  });

  it("renders testimonial", () => {
    render(<ProjectDetailTabbedCaseStudy {...defaultProps} />);
    expect(screen.getByText(/The results exceeded our expectations/)).toBeInTheDocument();
    expect(screen.getByText("CEO")).toBeInTheDocument();
    expect(screen.getByText("Client Company")).toBeInTheDocument();
  });

  it("renders tools section", () => {
    render(<ProjectDetailTabbedCaseStudy {...defaultProps} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
  });

  it("renders with empty tabs", () => {
    const props = { ...defaultProps, tabs: [] };
    const { container } = render(<ProjectDetailTabbedCaseStudy {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with empty content sections", () => {
    const props = { ...defaultProps, contentSections: [] };
    const { container } = render(<ProjectDetailTabbedCaseStudy {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders without testimonial", () => {
    const props = { ...defaultProps, testimonial: undefined };
    const { container } = render(<ProjectDetailTabbedCaseStudy {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with empty tools", () => {
    const props = { ...defaultProps, tools: [] };
    const { container } = render(<ProjectDetailTabbedCaseStudy {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProjectDetailTabbedCaseStudy {...defaultProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders back button when backHref is provided", () => {
    render(<ProjectDetailTabbedCaseStudy {...defaultProps} backHref="/projects" />);
    const backLink = screen.getByRole("link", { name: /back/i });
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
