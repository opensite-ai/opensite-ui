import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDetailCompactMetadata } from "../project-detail-compact-metadata";

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

describe("ProjectDetailCompactMetadata", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders custom title", () => {
    render(<ProjectDetailCompactMetadata title="Mobile App Redesign" />);
    expect(screen.getByText("Mobile App Redesign")).toBeInTheDocument();
  });

  it("renders custom subtitle", () => {
    render(<ProjectDetailCompactMetadata subtitle="A banking app experience" />);
    expect(screen.getByText("A banking app experience")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(<ProjectDetailCompactMetadata description="A complete redesign of the mobile banking experience" />);
    expect(screen.getByText("A complete redesign of the mobile banking experience")).toBeInTheDocument();
  });

  it("renders metadata details", () => {
    const metadata = [
      { label: "Client", value: "TechCorp" },
      { label: "Year", value: "2024" },
      { label: "Role", value: "Lead Designer" },
    ];
    render(<ProjectDetailCompactMetadata metadata={metadata} />);
    expect(screen.getByText("Details")).toBeInTheDocument();
    expect(screen.getByText("Client")).toBeInTheDocument();
    expect(screen.getByText("TechCorp")).toBeInTheDocument();
    expect(screen.getByText("Lead Designer")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(<ProjectDetailCompactMetadata className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("renders back action when provided", () => {
    render(<ProjectDetailCompactMetadata backAction={{ label: "Back to Projects", href: "/projects" }} />);
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });
});
