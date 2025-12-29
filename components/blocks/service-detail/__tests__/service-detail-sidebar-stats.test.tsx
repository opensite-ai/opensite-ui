import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServiceDetailSidebarStats } from "../service-detail-sidebar-stats";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-dynamic-icon" data-name={name} className={className}>
      icon
    </span>
  ),
}));

vi.mock("../../../../lib/blockBrandedIconsAndPlaceholders", () => ({
  blockBrandedIconsAndPlaceholders: {
    ux: "https://placeholder.com/ux.svg",
    integration1: "https://placeholder.com/integration1.svg",
    integration2: "https://placeholder.com/integration2.svg",
    integration3: "https://placeholder.com/integration3.svg",
  },
}));

describe("ServiceDetailSidebarStats", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<ServiceDetailSidebarStats />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ServiceDetailSidebarStats className="custom-class" />);
    // className is applied to the outer div wrapper, not the section
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("custom-class");
  });

  it("renders the title", () => {
    render(<ServiceDetailSidebarStats title="Custom Service Title" />);
    expect(screen.getByText("Custom Service Title")).toBeInTheDocument();
  });

  it("renders services with icons", () => {
    render(
      <ServiceDetailSidebarStats
        services={[
          { iconName: "lucide/users", title: "User research" },
          { iconName: "lucide/map", title: "Journey mapping" },
        ]}
      />
    );
    expect(screen.getByText("User research")).toBeInTheDocument();
    expect(screen.getByText("Journey mapping")).toBeInTheDocument();
    expect(screen.getAllByTestId("mock-dynamic-icon").length).toBeGreaterThan(0);
  });

  it("renders sidebar stats", () => {
    render(
      <ServiceDetailSidebarStats
        stats={[
          {
            icon: "/icon.svg",
            title: "Figma",
            description: "5+ years",
          },
        ]}
      />
    );
    expect(screen.getByText("Figma")).toBeInTheDocument();
    expect(screen.getByText("5+ years")).toBeInTheDocument();
  });

  it("renders content sections", () => {
    render(
      <ServiceDetailSidebarStats
        contentSections={[
          {
            title: "Section Title",
            paragraphs: ["First paragraph"],
          },
        ]}
      />
    );
    expect(screen.getByText("Section Title")).toBeInTheDocument();
    expect(screen.getByText("First paragraph")).toBeInTheDocument();
  });
});
