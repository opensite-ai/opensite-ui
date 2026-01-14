import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServicesListProgressSidebar } from "../services-list-progress-sidebar";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>icon</span>
  ),
}));

vi.mock("../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

vi.mock("../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">{children}</a>
  ),
}));

describe("ServicesListProgressSidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with explicit sidebar content", () => {
    render(
      <ServicesListProgressSidebar
        sidebarHeading="Our Creative Process"
        sidebarDescription="We follow a proven methodology"
      />
    );
    expect(screen.getByText("Our Creative Process")).toBeInTheDocument();
    expect(screen.getByText(/We follow a proven methodology/)).toBeInTheDocument();
  });

  it("renders custom sidebar heading", () => {
    render(<ServicesListProgressSidebar sidebarHeading="Our Methodology" />);
    expect(screen.getByText("Our Methodology")).toBeInTheDocument();
  });

  it("renders custom sidebar description", () => {
    render(<ServicesListProgressSidebar sidebarDescription="A step-by-step approach to success" />);
    expect(screen.getByText("A step-by-step approach to success")).toBeInTheDocument();
  });

  it("renders services with progress", () => {
    const services = [
      { title: "Discovery", description: "Understanding your needs", progress: 100, status: "Complete", iconName: "lucide/lightbulb" },
      { title: "Design", description: "Creating the solution", progress: 50, status: "In Progress", iconName: "lucide/palette" },
    ];
    render(<ServicesListProgressSidebar services={services} />);
    expect(screen.getByText("Discovery")).toBeInTheDocument();
    expect(screen.getByText("Design")).toBeInTheDocument();
    expect(screen.getByText("Complete")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
  });

  it("renders primary action button", () => {
    render(<ServicesListProgressSidebar primaryAction={{ label: "Start Your Project", href: "/start" }} />);
    expect(screen.getByText("Start Your Project")).toBeInTheDocument();
  });

  it("applies custom className to section", () => {
    const { container } = render(
      <ServicesListProgressSidebar
        className="custom-class"
        sidebarHeading="Test Heading"
      />
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });
});
