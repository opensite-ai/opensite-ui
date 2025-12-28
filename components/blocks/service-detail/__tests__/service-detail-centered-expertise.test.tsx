import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServiceDetailCenteredExpertise } from "../service-detail-centered-expertise";

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
    integration4: "https://placeholder.com/integration4.svg",
  },
}));

vi.mock("../../../../lib/mediaPlaceholders", () => ({
  imagePlaceholders: Array(50).fill("https://placeholder.com/image.jpg"),
}));

describe("ServiceDetailCenteredExpertise", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default props", () => {
    const { container } = render(<ServiceDetailCenteredExpertise />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<ServiceDetailCenteredExpertise className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("renders the title", () => {
    render(<ServiceDetailCenteredExpertise title="Custom Service Title" />);
    expect(screen.getByText("Custom Service Title")).toBeInTheDocument();
  });

  it("renders expertise grid", () => {
    render(
      <ServiceDetailCenteredExpertise
        expertise={[
          {
            icon: "/icon.svg",
            title: "Figma",
            description: "Expert",
          },
          {
            icon: "/icon2.svg",
            title: "Sketch",
            description: "Advanced",
          },
        ]}
      />
    );
    expect(screen.getByText("Figma")).toBeInTheDocument();
    expect(screen.getByText("Sketch")).toBeInTheDocument();
  });

  it("renders services with icons", () => {
    render(
      <ServiceDetailCenteredExpertise
        services={[
          { icon: "lucide/users", title: "User research" },
          { icon: "lucide/map", title: "Journey mapping" },
        ]}
      />
    );
    expect(screen.getByText("User research")).toBeInTheDocument();
    expect(screen.getByText("Journey mapping")).toBeInTheDocument();
  });

  it("renders related services cards", () => {
    render(
      <ServiceDetailCenteredExpertise
        relatedServices={[
          {
            image: "/image.jpg",
            title: "Web Development",
            description: "Custom websites",
            link: "/services/web",
          },
        ]}
      />
    );
    expect(screen.getByText("Web Development")).toBeInTheDocument();
    expect(screen.getByText("Custom websites")).toBeInTheDocument();
  });

  it("renders content sections", () => {
    render(
      <ServiceDetailCenteredExpertise
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
