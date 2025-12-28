import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailSidebarNavigation } from "../project-detail-sidebar-navigation";

describe("ProjectDetailSidebarNavigation", () => {
  const defaultProps = {
    title: "Product Launch Campaign",
    subtitle: "A multi-channel marketing initiative",
    heroImage: { src: "/hero.jpg", alt: "Hero image" },
    sections: [
      { id: "overview", title: "Overview", content: "Campaign overview" },
      { id: "strategy", title: "Strategy", content: "Our strategic approach" },
    ],
  };

  it("renders title and subtitle", () => {
    render(<ProjectDetailSidebarNavigation {...defaultProps} />);
    expect(screen.getByText("Product Launch Campaign")).toBeInTheDocument();
    expect(screen.getByText("A multi-channel marketing initiative")).toBeInTheDocument();
  });

  it("renders hero image", () => {
    render(<ProjectDetailSidebarNavigation {...defaultProps} />);
    expect(screen.getByAltText("Hero image")).toBeInTheDocument();
  });

  it("renders navigation links in sidebar", () => {
    render(<ProjectDetailSidebarNavigation {...defaultProps} />);
    expect(screen.getAllByText("Overview").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Strategy").length).toBeGreaterThan(0);
  });

  it("renders section content", () => {
    render(<ProjectDetailSidebarNavigation {...defaultProps} />);
    expect(screen.getByText("Campaign overview")).toBeInTheDocument();
    expect(screen.getByText("Our strategic approach")).toBeInTheDocument();
  });

  it("renders hero image", () => {
    render(<ProjectDetailSidebarNavigation {...defaultProps} />);
    expect(screen.getByAltText("Hero image")).toBeInTheDocument();
  });

  it("renders with empty sections", () => {
    const props = { ...defaultProps, sections: [] };
    const { container } = render(<ProjectDetailSidebarNavigation {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProjectDetailSidebarNavigation {...defaultProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders back button when backHref is provided", () => {
    render(<ProjectDetailSidebarNavigation {...defaultProps} backHref="/projects" backLabel="Back" />);
    const backLink = screen.getByRole("link", { name: /back/i });
    expect(backLink).toHaveAttribute("href", "/projects");
  });
});
