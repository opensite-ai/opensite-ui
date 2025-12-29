import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServiceDetailSidebarRelated } from "../service-detail-sidebar-related";

vi.mock("@page-speed/img", () => ({
  Img: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="mock-img" />
  ),
}));

vi.mock("../../../ui/dynamic-icon", () => ({
  DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-name={name} className={className}>
      icon
    </span>
  ),
}));

vi.mock("../../../../lib/Pressable", () => ({
  Pressable: ({ children, href, className }: { children: React.ReactNode; href?: string; className?: string }) => (
    <a href={href} className={className} data-testid="mock-pressable">
      {children}
    </a>
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

describe("ServiceDetailSidebarRelated", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<ServiceDetailSidebarRelated />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ServiceDetailSidebarRelated className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders the title", () => {
    render(<ServiceDetailSidebarRelated title="Custom Service Title" />);
    expect(screen.getByText("Custom Service Title")).toBeInTheDocument();
  });

  it("renders related services", () => {
    render(
      <ServiceDetailSidebarRelated
        relatedServices={[
          {
            iconName: "lucide/code",
            title: "Web Development",
            description: "Custom websites",
            href: "/services/web",
          },
        ]}
      />
    );
    expect(screen.getByText("Web Development")).toBeInTheDocument();
    expect(screen.getByText("Custom websites")).toBeInTheDocument();
  });

  it("renders sidebar stats", () => {
    render(
      <ServiceDetailSidebarRelated
        stats={[
          {
            icon: "/icon.svg",
            title: "Figma",
            description: "Expert",
          },
        ]}
      />
    );
    expect(screen.getByText("Figma")).toBeInTheDocument();
    expect(screen.getByText("Expert")).toBeInTheDocument();
  });

  it("renders content sections", () => {
    render(
      <ServiceDetailSidebarRelated
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

  it("renders services list", () => {
    render(
      <ServiceDetailSidebarRelated
        servicesList={{
          title: "Our Services",
          items: ["Service 1", "Service 2"],
        }}
      />
    );
    expect(screen.getByText("Our Services")).toBeInTheDocument();
    expect(screen.getByText("Service 1")).toBeInTheDocument();
  });
});
