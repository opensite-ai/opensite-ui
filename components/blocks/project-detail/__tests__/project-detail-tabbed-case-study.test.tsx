import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailTabbedCaseStudy } from "../project-detail-tabbed-case-study";

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

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(100).fill("/placeholder.jpg"),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name }: { name: string }) => <span data-testid="mock-icon">{name}</span>,
}));

describe("ProjectDetailTabbedCaseStudy", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailTabbedCaseStudy title="E-commerce Platform" />);
    expect(screen.getByText("E-commerce Platform")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailTabbedCaseStudy subtitle="A complete redesign" />);
    expect(screen.getByText("A complete redesign")).toBeInTheDocument();
  });

  it("renders tabs navigation", () => {
    const tabs = [
      { id: "overview", label: "Overview", content: "Overview content here" },
      { id: "challenge", label: "Challenge", content: "Challenge content here" },
    ];
    render(<ProjectDetailTabbedCaseStudy tabs={tabs} />);
    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText("Challenge")).toBeInTheDocument();
  });

  it("renders testimonial", () => {
    const testimonial = {
      quote: "The results exceeded our expectations",
      author: "CEO",
      role: "Client Company",
    };
    render(<ProjectDetailTabbedCaseStudy testimonial={testimonial} />);
    expect(screen.getByText(/"The results exceeded our expectations"/)).toBeInTheDocument();
    expect(screen.getByText("CEO")).toBeInTheDocument();
  });

  it("renders tools section", () => {
    const tools = [
      { name: "React", icon: "react" },
      { name: "Node.js", icon: "nodejs" },
    ];
    render(<ProjectDetailTabbedCaseStudy tools={tools} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("Tools & Technologies")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailTabbedCaseStudy className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders back action when provided", () => {
    render(<ProjectDetailTabbedCaseStudy backAction={{ label: "Back to Projects", href: "/projects" }} />);
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });
});
